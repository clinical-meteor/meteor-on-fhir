import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { CardText, CardActions } from 'material-ui/Card';
import { insertPatient, updatePatient, removePatientById } from '/imports/ui/workflows/patients/methods';
import { Bert } from 'meteor/themeteorchef:bert';

let defaultPatient = {
  "resourceType" : "Patient",
  "name" : [{
    "text" : "",
    "resourceType" : "HumanName"
  }],
  "active" : true,
  "gender" : "",
  "birthDate" : null,
  "photo" : [{}],
  "test" : false
};

Session.setDefault('patientUpsert', false);
Session.setDefault('selectedPatient', false);

export default class PatientDetail extends React.Component {
  getMeteorData() {
    let data = {
      patientId: false,
      patient: defaultPatient
    };

    if (Session.get('patientUpsert')) {
      data.patient = Session.get('patientUpsert');
    } else {
      if (Session.get('selectedPatient')) {
        data.patientId = Session.get('selectedPatient');
        console.log("selectedPatient", Session.get('selectedPatient'));

        let selectedPatient = Patients.findOne({_id: Session.get('selectedPatient')});
        console.log("selectedPatient", selectedPatient);

        if (selectedPatient) {
          data.patient = selectedPatient;

          if (typeof selectedPatient.birthDate === "object") {
            data.patient.birthDate = moment(selectedPatient.birthDate).add(1, 'day').format("YYYY-MM-DD");
          }
        }
      } else {
        data.patient = defaultPatient;
      }
    }

    if(process.env.NODE_ENV === "test") console.log("PatientDetail[data]", data);
    return data;
  }

  render() {
    return (
      <div id={this.props.id} className="patientDetail">
        <CardText>
          <TextField
            id='nameInput'
            ref='name'
            name='name'
            floatingLabelText='name'
            value={this.data.patient.name[0] ? this.data.patient.name[0].text : ''}
            onChange={ this.changeState.bind(this, 'name')}
            fullWidth
            /><br/>
          <TextField
            id='genderInput'
            ref='gender'
            name='gender'
            floatingLabelText='gender'
            value={this.data.patient.gender}
            onChange={ this.changeState.bind(this, 'gender')}
            fullWidth
            /><br/>
          <TextField
            id='birthdateInput'
            ref='birthdate'
            name='birthdate'
            floatingLabelText='birthdate'
            value={this.data.patient.birthDate ? this.data.patient.birthDate : ''}
            onChange={ this.changeState.bind(this, 'birthDate')}
            fullWidth
            /><br/>
          <TextField
            id='photoInput'
            ref='photo'
            name='photo'
            floatingLabelText='photo'
            value={this.data.patient.photo[0] ? this.data.patient.photo[0].url : ''}
            onChange={ this.changeState.bind(this, 'photo')}
            fullWidth
            /><br/>
        </CardText>
        <CardActions>
          { this.determineButtons(this.data.patientId) }
        </CardActions>
      </div>
    );
  }
  determineButtons(patientId){
    if (patientId) {
      return (
        <div>
          <RaisedButton id='savePatientButton' className='savePatientButton' label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
          <RaisedButton label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton id='savePatientButton'  className='savePatientButton' label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }

  changeState(field, event, value){
    let patientUpdate;

    if(process.env.NODE_ENV === "test") console.log("patientDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new patient
    if (Session.get('patientUpsert')) {
      patientUpdate = Session.get('patientUpsert');
    } else {
      patientUpdate = defaultPatient;
    }



    // if there's an existing patient, use them
    if (Session.get('selectedPatient')) {
      patientUpdate = this.data.patient;
    }

    switch (field) {
      case "name":
        patientUpdate.name[0].text = value;
        break;
      case "gender":
        patientUpdate.gender = value;
        break;
      case "birthDate":
        patientUpdate.birthDate = value;
        break;
      case "photo":
        patientUpdate.photo[0].url = value;
        break;
      default:

    }
    // patientUpdate[field] = value;
    if(process.env.NODE_ENV === "test") console.log("patientUpdate", patientUpdate);

    Session.set('patientUpsert', patientUpdate);
  }


  // this could be a mixin
  handleSaveButton(){
    let patientUpdate = Session.get('patientUpsert', patientUpdate);


    if (patientUpdate.birthDate) {
      patientUpdate.birthDate = new Date(patientUpdate.birthDate);
    }
    if(process.env.NODE_ENV === "test") console.log("patientUpdate", patientUpdate);

    if (Session.get('selectedPatient')) {
      if(process.env.NODE_ENV === "test") console.log("Updating patient...");

      delete patientUpdate._id;

      // not sure why we're having to respecify this; fix for a bug elsewhere
      patientUpdate.resourceType = 'Patient';

      Patients.update({_id: Session.get('selectedPatient')}, {$set: patientUpdate }, function(error, result){
        if (error) {
          if(process.env.NODE_ENV === "test") console.log("Patients.insert[error]", error);
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Patients", recordId: Session.get('selectedPatient')});
          Session.set('patientUpdate', defaultPatient);
          Session.set('patientUpsert', defaultPatient);
          Session.set('patientPageTabIndex', 1);
          Bert.alert('Patient added!', 'success');
        }
      });
    } else {
      if(process.env.NODE_ENV === "test") console.log("Creating a new patient...", patientUpdate);

      Patients.insert(patientUpdate, function(error, result) {
        if (error) {
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Patients", recordId: result});
          Session.set('patientPageTabIndex', 1);
          Session.set('selectedPatient', false);
          Session.set('patientUpsert', false);
          Bert.alert('Patient added!', 'success');
        }
      });
    }
  }

  handleCancelButton(){
    Session.set('patientPageTabIndex', 1);
  }

  handleDeleteButton(){
    Patients.remove({_id: Session.get('selectedPatient')}, function(error, result){
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Patients", recordId: Session.get('selectedPatient')});
        Session.set('patientUpdate', defaultPatient);
        Session.set('patientUpsert', defaultPatient);
        Session.set('patientPageTabIndex', 1);
        Bert.alert('Patient removed!', 'success');
      }
    });
  }
}


ReactMixin(PatientDetail.prototype, ReactMeteorData);
