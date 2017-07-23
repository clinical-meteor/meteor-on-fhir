import { CardActions, CardText } from 'material-ui/Card';

import { Bert } from 'meteor/themeteorchef:bert';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';

let defaultProcedure = {
  "resourceType": "Procedure",
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



Session.setDefault('procedureUpsert', false);
Session.setDefault('selectedProcedure', false);


export default class ProcedureDetail extends React.Component {
  getMeteorData() {
    let data = {
      procedureId: false,
      procedure: defaultProcedure
    };

    if (Session.get('procedureUpsert')) {
      data.procedure = Session.get('procedureUpsert');
    } else {
      if (Session.get('selectedProcedure')) {
        data.procedureId = Session.get('selectedProcedure');
        console.log("selectedProcedure", Session.get('selectedProcedure'));

        let selectedProcedure = Procedures.findOne({_id: Session.get('selectedProcedure')});
        console.log("selectedProcedure", selectedProcedure);

        if (selectedProcedure) {
          data.procedure = selectedProcedure;
        }
      } else {
        data.procedure = defaultProcedure;
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
          <RaisedButton id="saveProcedureButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
          <RaisedButton id="deleteProcedureButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveProcedureButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }



  // this could be a mixin
  changeState(field, event, value){
    let procedureUpdate;

    if(process.env.NODE_ENV === "test") console.log("ProcedureDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new procedure
    if (Session.get('procedureUpsert')) {
      procedureUpdate = Session.get('procedureUpsert');
    } else {
      procedureUpdate = defaultProcedure;
    }



    // if there's an existing procedure, use them
    if (Session.get('selectedProcedure')) {
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


    if (Session.get('selectedProcedure')) {
      if(process.env.NODE_ENV === "test") console.log("Updating procedure...");
      delete procedureUpdate._id;

      // not sure why we're having to respecify this; fix for a bug elsewhere
      procedureUpdate.resourceType = 'Procedure';

      Procedures.update(
        {_id: Session.get('selectedProcedure')}, {$set: procedureUpdate }, function(error, result) {
          if (error) {
            console.log("error", error);

            Bert.alert(error.reason, 'danger');
          }
          if (result) {
            HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Procedures", recordId: Session.get('selectedProcedure')});
            Session.set('procedurePageTabIndex', 1);
            Session.set('selectedProcedure', false);
            Session.set('procedureUpsert', false);
            Bert.alert('Procedure updated!', 'success');
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new procedure", procedureUpdate);

      Procedures.insert(procedureUpdate, function(error, result) {
        if (error) {
          console.log("error", error);
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Procedures", recordId: result});
          Session.set('procedurePageTabIndex', 1);
          Session.set('selectedProcedure', false);
          Session.set('procedureUpsert', false);
          Bert.alert('Procedure added!', 'success');
        }
      });
    }
  }

  handleCancelButton(){
    Session.set('procedurePageTabIndex', 1);
  }

  handleDeleteButton(){
    Procedure.remove({_id: Session.get('selectedProcedure')}, function(error, result){
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Procedures", recordId: Session.get('selectedProcedure')});
        Session.set('procedurePageTabIndex', 1);
        Session.set('selectedProcedure', false);
        Session.set('procedureUpsert', false);
        Bert.alert('Procedure removed!', 'success');
      }
    });
  }
}


ProcedureDetail.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(ProcedureDetail.prototype, ReactMeteorData);
