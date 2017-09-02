import { CardActions, CardText } from 'material-ui/Card';

import { Bert } from 'meteor/themeteorchef:bert';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';

let defaultMedicationStatement = {
  "resourceType": "MedicationStatement",
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



Session.setDefault('medicationStatementUpsert', false);
Session.setDefault('selectedMedicationStatement', false);


export default class MedicationStatementDetail extends React.Component {
  getMeteorData() {
    let data = {
      medicationStatementId: false,
      medicationStatement: defaultMedicationStatement
    };

    if (Session.get('medicationStatementUpsert')) {
      data.medicationStatement = Session.get('medicationStatementUpsert');
    } else {
      if (Session.get('selectedMedicationStatement')) {
        data.medicationStatementId = Session.get('selectedMedicationStatement');
        console.log("selectedMedicationStatement", Session.get('selectedMedicationStatement'));

        let selectedMedicationStatement = MedicationStatements.findOne({_id: Session.get('selectedMedicationStatement')});
        console.log("selectedMedicationStatement", selectedMedicationStatement);

        if (selectedMedicationStatement) {
          data.medicationStatement = selectedMedicationStatement;
        }
      } else {
        data.medicationStatement = defaultMedicationStatement;
      }

    }

    return data;
  }

  render() {
    return (
      <div id={this.props.id} className="medicationStatementDetail">
        <CardText>
          <TextField
            id='patientDisplayInput'
            ref='patientDisplay'
            name='patientDisplay'
            floatingLabelText='Patient'
            value={this.data.medicationStatement.patient ? this.data.medicationStatement.patient.display : ''}
            onChange={ this.changeState.bind(this, 'patientDisplay')}
            fullWidth
            /><br/>
          <TextField
            id='asserterDisplayInput'
            ref='asserterDisplay'
            name='asserterDisplay'
            floatingLabelText='Asserter'
            value={this.data.medicationStatement.asserter ? this.data.medicationStatement.asserter.display : ''}
            onChange={ this.changeState.bind(this, 'asserterDisplay')}
            fullWidth
            /><br/>
          <TextField
            id='clinicalStatusInput'
            ref='clinicalStatus'
            name='clinicalStatus'
            floatingLabelText='Clinical Status'
            value={this.data.medicationStatement.clinicalStatus ? this.data.medicationStatement.clinicalStatus : ''}
            onChange={ this.changeState.bind(this, 'clinicalStatus')}
            fullWidth
            /><br/>
          <TextField
            id='snomedCodeInput'
            ref='snomedCode'
            name='snomedCode'
            floatingLabelText='SNOMED Code'
            value={this.data.medicationStatement.code.coding[0] ? this.data.medicationStatement.code.coding[0].code : ''}
            onChange={ this.changeState.bind(this, 'snomedCode')}
            fullWidth
            /><br/>
          <TextField
            id='snomedDisplayInput'
            ref='snomedDisplay'
            name='snomedDisplay'
            floatingLabelText='SNOMED Display'
            value={this.data.medicationStatement.code.coding[0] ? this.data.medicationStatement.code.coding[0].display : ''}
            onChange={ this.changeState.bind(this, 'snomedDisplay')}
            fullWidth
            /><br/>
          <TextField
            id='evidenceDisplayInput'
            ref='evidenceDisplay'
            name='evidenceDisplay'
            floatingLabelText='Evidence (Observation)'
            value={this.data.medicationStatement.evidence[0].detail[0] ? this.data.medicationStatement.evidence[0].detail[0].display : ''}
            onChange={ this.changeState.bind(this, 'evidenceDisplay')}
            fullWidth
            /><br/>




        </CardText>
        <CardActions>
          { this.determineButtons(this.data.medicationStatementId) }
        </CardActions>
      </div>
    );
  }


  determineButtons(medicationStatementId){
    if (medicationStatementId) {
      return (
        <div>
          <RaisedButton id="saveMedicationStatementButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
          <RaisedButton id="deleteMedicationStatementButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveMedicationStatementButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }



  // this could be a mixin
  changeState(field, event, value){
    let medicationStatementUpdate;

    if(process.env.NODE_ENV === "test") console.log("MedicationStatementDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new medicationStatement
    if (Session.get('medicationStatementUpsert')) {
      medicationStatementUpdate = Session.get('medicationStatementUpsert');
    } else {
      medicationStatementUpdate = defaultMedicationStatement;
    }



    // if there's an existing medicationStatement, use them
    if (Session.get('selectedMedicationStatement')) {
      medicationStatementUpdate = this.data.medicationStatement;
    }

    switch (field) {
      case "patientDisplay":
        medicationStatementUpdate.patient.display = value;
        break;
      case "asserterDisplay":
        medicationStatementUpdate.asserter.display = value;
        break;
      case "clinicalStatus":
        medicationStatementUpdate.clinicalStatus = value;
        break;
      case "snomedCode":
        medicationStatementUpdate.code.coding[0].code = value;
        break;
      case "snomedDisplay":
        medicationStatementUpdate.code.coding[0].display = value;
        break;
      case "evidenceDisplay":
        medicationStatementUpdate.evidence[0].detail[0].display = value;
        break;
      default:

    }

    if(process.env.NODE_ENV === "test") console.log("medicationStatementUpdate", medicationStatementUpdate);
    Session.set('medicationStatementUpsert', medicationStatementUpdate);
  }

  handleSaveButton(){
    let medicationStatementUpdate = Session.get('medicationStatementUpsert', medicationStatementUpdate);

    if(process.env.NODE_ENV === "test") console.log("medicationStatementUpdate", medicationStatementUpdate);


    if (Session.get('selectedMedicationStatement')) {
      if(process.env.NODE_ENV === "test") console.log("Updating medicationStatement...");
      delete medicationStatementUpdate._id;

      // not sure why we're having to respecify this; fix for a bug elsewhere
      medicationStatementUpdate.resourceType = 'MedicationStatement';

      MedicationStatements.update(
        {_id: Session.get('selectedMedicationStatement')}, {$set: medicationStatementUpdate }, function(error, result) {
          if (error) {
            console.log("error", error);

            Bert.alert(error.reason, 'danger');
          }
          if (result) {
            HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "MedicationStatements", recordId: Session.get('selectedMedicationStatement')});
            Session.set('medicationStatementPageTabIndex', 1);
            Session.set('selectedMedicationStatement', false);
            Session.set('medicationStatementUpsert', false);
            Bert.alert('MedicationStatement updated!', 'success');
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new medicationStatement", medicationStatementUpdate);

      MedicationStatements.insert(medicationStatementUpdate, function(error, result) {
        if (error) {
          console.log("error", error);
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "MedicationStatements", recordId: result});
          Session.set('medicationStatementPageTabIndex', 1);
          Session.set('selectedMedicationStatement', false);
          Session.set('medicationStatementUpsert', false);
          Bert.alert('MedicationStatement added!', 'success');
        }
      });
    }
  }

  handleCancelButton(){
    Session.set('medicationStatementPageTabIndex', 1);
  }

  handleDeleteButton(){
    MedicationStatement.remove({_id: Session.get('selectedMedicationStatement')}, function(error, result){
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "MedicationStatements", recordId: Session.get('selectedMedicationStatement')});
        Session.set('medicationStatementPageTabIndex', 1);
        Session.set('selectedMedicationStatement', false);
        Session.set('medicationStatementUpsert', false);
        Bert.alert('MedicationStatement removed!', 'success');
      }
    });
  }
}


MedicationStatementDetail.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(MedicationStatementDetail.prototype, ReactMeteorData);
