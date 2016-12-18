import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { CardText, CardActions } from 'material-ui/Card';


import { insertPatient, updatePatient, removePatientById } from '../../../api/patients/methods';
import { Bert } from 'meteor/themeteorchef:bert';

Session.setDefault('patientDetailState', {
  id: "",
  name: "",
  gender: "",
  active: true,
  birthdate: '',
  photo: ""
});


export default class PatientDetail extends React.Component {
  getMeteorData() {
    let data = {
      patientId: false,
      patient: {
        id: "",
        name: "",
        gender: "",
        active: true,
        birthdate: '',
        photo: ""
      }
    };

    if (Session.get('selectedPatient')) {
      data.patientId = Session.get('selectedPatient');

      let selectedPatient = Patients.findOne({_id: Session.get('selectedPatient')});
      if (selectedPatient) {
        data.patient = {
          id: selectedPatient._id,
          birthdate: moment(selectedPatient.birthDate).format("YYYY-MM-DD"),
          gender: selectedPatient.gender,
          active: selectedPatient.active.toString(),
          photo: "",
          name: ""
        };
        if (selectedPatient.photo && selectedPatient.photo[0] && selectedPatient.photo[0].url) {
          data.patient.photo = selectedPatient.photo[0].url;
        }
        if (selectedPatient.name && selectedPatient.name[0] && selectedPatient.name[0].text) {
          data.patient.name = selectedPatient.name[0].text;
        }
      }
    }

    if (Session.get('patientDetailState')) {
      data.patient = Session.get('patientDetailState');
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
            value={this.data.patient.name}
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
            value={this.data.patient.birthdate}
            onChange={ this.changeState.bind(this, 'birthdate')}
            fullWidth
            /><br/>
          <TextField
            id='photoInput'
            ref='photo'
            name='photo'
            floatingLabelText='photo'
            value={this.data.patient.photo}
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

  // this could be a mixin
  changeState(field, event, value){

    //console.log("changeState", field, value);

    // by default, assume there's no other data and we're creating a new patient
    let patientUpdate = {
      id: "",
      birthdate: '',
      gender: '',
      active: true,
      name: "",
      photo: ''
    };

    // if there's an existing patient, use them
    if (Session.get('selectedPatient')) {
      patientUpdate = this.data.patient;
    }

    if (typeof Session.get('patientDetailState') === "object") {
      patientUpdate = Session.get('patientDetailState');
    }

    patientUpdate[field] = value;

    //console.log("patientUpdate", patientUpdate);
    Session.set('patientDetailState', patientUpdate);
  }

  openTab(index){
    // set which tab is selected
    let state = Session.get('patientFormData');
    state["index"] = index;
    Session.set('patientFormData', state);
  }

  // this could be a mixin
  handleSaveButton(){
    console.log("handleSaveButton", this);

      let patientUpdate = Session.get('patientDetailState');
      console.log("patientUpdate", patientUpdate);

      let patientFormData = {
        'active': true,
        'name': [{
          'text': patientUpdate.name
        }],
        'birthDate': patientUpdate.birthdate,
        'gender': patientUpdate.gender,
        'photo': [{
          url: patientUpdate.photo
        }]
      };

    console.log("patientFormData", patientFormData);

    if (Session.get('selectedPatient')) {
      console.log("Updating patient...");
      updatePatient.call({
          _id: Session.get('selectedPatient'),
          update: patientFormData
        }, function(error, result) {
          if (error) {
            console.log("error", error);
            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert('Patient updated!', 'success');
            Session.set('patientFormData', {
              index: 1,
              id: '',
              username: '',
              email: '',
              given: '',
              family: '',
              gender: ''
            });
            Session.set('patientDetailState', {
              id: "",
              name: "",
              gender: "",
              active: true,
              birthdate: '',
              photo: ""
            });
          }
      });
    } else {
      console.log("Creating a new patient...");
      insertPatient.call(patientFormData, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Patient added!', 'success');
          Session.set('patientFormData', {
            index: 1,
            id: '',
            username: '',
            email: '',
            given: '',
            family: '',
            gender: ''
          });
          Session.set('patientDetailState', {
            id: "",
            name: "",
            gender: "",
            active: true,
            birthdate: '',
            photo: ""
          });
        }
      });
    }
  }

  // this could be a mixin
  handleCancelButton(){
    console.log("handleCancelButton");
  }

  handleDeleteButton(){
    removePatientById.call(
      {_id: Session.get('selectedPatient')}, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Patient deleted!', 'success');
          Session.set('patientFormData', {
            index: 1,
            id: '',
            username: '',
            email: '',
            given: '',
            family: '',
            gender: ''
          });
        }
      });
  }
}


PatientDetail.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(PatientDetail.prototype, ReactMeteorData);
