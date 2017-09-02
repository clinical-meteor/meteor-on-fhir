import { CardActions, CardText } from 'material-ui/Card';

import { Bert } from 'meteor/themeteorchef:bert';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';

let defaultAllergyIntolerance = {
  "resourceType": "AllergyIntolerance",
  "patient": {
    "reference": "",
    "display": ""
  },
  "asserter": {
    "reference": "",
    "display": ""
  },
  "dateRecorded": "",
  "code": {
    "coding": [
      {
        "system": "http://snomed.info/sct",
        "code": "",
        "display": ""
      }
    ]
  },
  "clinicalStatus": "",
  "verificationStatus": "confirmed",
  "severity": {
    "coding": [
      {
        "system": "http://snomed.info/sct",
        "code": "",
        "display": ""
      }
    ]
  },
  "onsetDateTime": "",
  "evidence": [
    {
      "detail": [
        {
          "reference": "",
          "display": ""
        }
      ]
    }
  ]
};



Session.setDefault('allergyIntoleranceUpsert', false);
Session.setDefault('selectedAllergyIntolerance', false);


export default class AllergyIntoleranceDetail extends React.Component {
  getMeteorData() {
    let data = {
      allergyIntoleranceId: false,
      allergyIntolerance: defaultAllergyIntolerance
    };

    if (Session.get('allergyIntoleranceUpsert')) {
      data.allergyIntolerance = Session.get('allergyIntoleranceUpsert');
    } else {
      if (Session.get('selectedAllergyIntolerance')) {
        data.allergyIntoleranceId = Session.get('selectedAllergyIntolerance');
        console.log("selectedAllergyIntolerance", Session.get('selectedAllergyIntolerance'));

        let selectedAllergyIntolerance = AllergyIntolerances.findOne({_id: Session.get('selectedAllergyIntolerance')});
        console.log("selectedAllergyIntolerance", selectedAllergyIntolerance);

        if (selectedAllergyIntolerance) {
          data.procedure = selectedAllergyIntolerance;
        }
      } else {
        data.procedure = defaultAllergyIntolerance;
      }

    }

    return data;
  }

  render() {
    return (
      <div id={this.props.id} className="procedureDetail">
        <CardText>
          <TextField
            id='patientDisplayInput'
            ref='patientDisplay'
            name='patientDisplay'
            floatingLabelText='Patient'
            value={this.data.procedure.patient ? this.data.procedure.patient.display : ''}
            onChange={ this.changeState.bind(this, 'patientDisplay')}
            fullWidth
            /><br/>
          <TextField
            id='asserterDisplayInput'
            ref='asserterDisplay'
            name='asserterDisplay'
            floatingLabelText='Asserter'
            value={this.data.procedure.asserter ? this.data.procedure.asserter.display : ''}
            onChange={ this.changeState.bind(this, 'asserterDisplay')}
            fullWidth
            /><br/>
          <TextField
            id='clinicalStatusInput'
            ref='clinicalStatus'
            name='clinicalStatus'
            floatingLabelText='Clinical Status'
            value={this.data.procedure.clinicalStatus ? this.data.procedure.clinicalStatus : ''}
            onChange={ this.changeState.bind(this, 'clinicalStatus')}
            fullWidth
            /><br/>
          <TextField
            id='snomedCodeInput'
            ref='snomedCode'
            name='snomedCode'
            floatingLabelText='SNOMED Code'
            value={this.data.procedure.code.coding[0] ? this.data.procedure.code.coding[0].code : ''}
            onChange={ this.changeState.bind(this, 'snomedCode')}
            fullWidth
            /><br/>
          <TextField
            id='snomedDisplayInput'
            ref='snomedDisplay'
            name='snomedDisplay'
            floatingLabelText='SNOMED Display'
            value={this.data.procedure.code.coding[0] ? this.data.procedure.code.coding[0].display : ''}
            onChange={ this.changeState.bind(this, 'snomedDisplay')}
            fullWidth
            /><br/>
          <TextField
            id='evidenceDisplayInput'
            ref='evidenceDisplay'
            name='evidenceDisplay'
            floatingLabelText='Evidence (Observation)'
            value={this.data.procedure.evidence[0].detail[0] ? this.data.procedure.evidence[0].detail[0].display : ''}
            onChange={ this.changeState.bind(this, 'evidenceDisplay')}
            fullWidth
            /><br/>




        </CardText>
        <CardActions>
          { this.determineButtons(this.data.procedureId) }
        </CardActions>
      </div>
    );
  }


  determineButtons(procedureId){
    if (procedureId) {
      return (
        <div>
          <RaisedButton id="saveAllergyIntoleranceButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
          <RaisedButton id="deleteAllergyIntoleranceButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveAllergyIntoleranceButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }



  // this could be a mixin
  changeState(field, event, value){
    let procedureUpdate;

    if(process.env.NODE_ENV === "test") console.log("AllergyIntoleranceDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new procedure
    if (Session.get('procedureUpsert')) {
      procedureUpdate = Session.get('procedureUpsert');
    } else {
      procedureUpdate = defaultAllergyIntolerance;
    }



    // if there's an existing procedure, use them
    if (Session.get('selectedAllergyIntolerance')) {
      procedureUpdate = this.data.procedure;
    }

    switch (field) {
      case "patientDisplay":
        procedureUpdate.patient.display = value;
        break;
      case "asserterDisplay":
        procedureUpdate.asserter.display = value;
        break;
      case "clinicalStatus":
        procedureUpdate.clinicalStatus = value;
        break;
      case "snomedCode":
        procedureUpdate.code.coding[0].code = value;
        break;
      case "snomedDisplay":
        procedureUpdate.code.coding[0].display = value;
        break;
      case "evidenceDisplay":
        procedureUpdate.evidence[0].detail[0].display = value;
        break;
      default:

    }

    if(process.env.NODE_ENV === "test") console.log("procedureUpdate", procedureUpdate);
    Session.set('procedureUpsert', procedureUpdate);
  }

  handleSaveButton(){
    let procedureUpdate = Session.get('procedureUpsert', procedureUpdate);

    if(process.env.NODE_ENV === "test") console.log("procedureUpdate", procedureUpdate);


    if (Session.get('selectedAllergyIntolerance')) {
      if(process.env.NODE_ENV === "test") console.log("Updating allergyIntolerance...");
      delete allergyIntoleranceUpdate._id;

      // not sure why we're having to respecify this; fix for a bug elsewhere
      allergyIntoleranceUpdate.resourceType = 'AllergyIntolerance';

      AllergyIntolerances.update(
        {_id: Session.get('selectedAllergyIntolerance')}, {$set: allergyIntoleranceUpdate }, function(error, result) {
          if (error) {
            console.log("error", error);

            Bert.alert(error.reason, 'danger');
          }
          if (result) {
            HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "AllergyIntolerances", recordId: Session.get('selectedAllergyIntolerance')});
            Session.set('allergyIntolerancePageTabIndex', 1);
            Session.set('selectedAllergyIntolerance', false);
            Session.set('allergyIntoleranceUpsert', false);
            Bert.alert('AllergyIntolerance updated!', 'success');
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new allergyIntolerance", allergyIntoleranceUpdate);

      AllergyIntolerances.insert(allergyIntoleranceUpdate, function(error, result) {
        if (error) {
          console.log("error", error);
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "AllergyIntolerances", recordId: result});
          Session.set('allergyIntolerancePageTabIndex', 1);
          Session.set('selectedAllergyIntolerance', false);
          Session.set('allergyIntoleranceUpsert', false);
          Bert.alert('AllergyIntolerance added!', 'success');
        }
      });
    }
  }

  handleCancelButton(){
    Session.set('allergyIntolerancePageTabIndex', 1);
  }

  handleDeleteButton(){
    AllergyIntolerance.remove({_id: Session.get('selectedAllergyIntolerance')}, function(error, result){
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "AllergyIntolerances", recordId: Session.get('selectedAllergyIntolerance')});
        Session.set('allergyIntolerancePageTabIndex', 1);
        Session.set('selectedAllergyIntolerance', false);
        Session.set('allergyIntoleranceUpsert', false);
        Bert.alert('AllergyIntolerance removed!', 'success');
      }
    });
  }
}


AllergyIntoleranceDetail.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(AllergyIntoleranceDetail.prototype, ReactMeteorData);
