import { CardActions, CardText } from 'material-ui/Card';

import { Bert } from 'meteor/themeteorchef:bert';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';

let defaultDiagnosticReport = {
  "resourceType": "DiagnosticReport",
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



Session.setDefault('diagnosticReportUpsert', false);
Session.setDefault('selectedDiagnosticReport', false);


export default class DiagnosticReportDetail extends React.Component {
  getMeteorData() {
    let data = {
      diagnosticReportId: false,
      diagnosticReport: defaultDiagnosticReport
    };

    if (Session.get('diagnosticReportUpsert')) {
      data.diagnosticReport = Session.get('diagnosticReportUpsert');
    } else {
      if (Session.get('selectedDiagnosticReport')) {
        data.diagnosticReportId = Session.get('selectedDiagnosticReport');
        console.log("selectedDiagnosticReport", Session.get('selectedDiagnosticReport'));

        let selectedDiagnosticReport = DiagnosticReports.findOne({_id: Session.get('selectedDiagnosticReport')});
        console.log("selectedDiagnosticReport", selectedDiagnosticReport);

        if (selectedDiagnosticReport) {
          data.diagnosticReport = selectedDiagnosticReport;
        }
      } else {
        data.diagnosticReport = defaultDiagnosticReport;
      }

    }

    return data;
  }

  render() {
    return (
      <div id={this.props.id} className="diagnosticReportDetail">
        <CardText>
          <TextField
            id='patientDisplayInput'
            ref='patientDisplay'
            name='patientDisplay'
            floatingLabelText='Patient'
            value={this.data.diagnosticReport.patient ? this.data.diagnosticReport.patient.display : ''}
            onChange={ this.changeState.bind(this, 'patientDisplay')}
            fullWidth
            /><br/>
          <TextField
            id='asserterDisplayInput'
            ref='asserterDisplay'
            name='asserterDisplay'
            floatingLabelText='Asserter'
            value={this.data.diagnosticReport.asserter ? this.data.diagnosticReport.asserter.display : ''}
            onChange={ this.changeState.bind(this, 'asserterDisplay')}
            fullWidth
            /><br/>
          <TextField
            id='clinicalStatusInput'
            ref='clinicalStatus'
            name='clinicalStatus'
            floatingLabelText='Clinical Status'
            value={this.data.diagnosticReport.clinicalStatus ? this.data.diagnosticReport.clinicalStatus : ''}
            onChange={ this.changeState.bind(this, 'clinicalStatus')}
            fullWidth
            /><br/>
          <TextField
            id='snomedCodeInput'
            ref='snomedCode'
            name='snomedCode'
            floatingLabelText='SNOMED Code'
            value={this.data.diagnosticReport.code.coding[0] ? this.data.diagnosticReport.code.coding[0].code : ''}
            onChange={ this.changeState.bind(this, 'snomedCode')}
            fullWidth
            /><br/>
          <TextField
            id='snomedDisplayInput'
            ref='snomedDisplay'
            name='snomedDisplay'
            floatingLabelText='SNOMED Display'
            value={this.data.diagnosticReport.code.coding[0] ? this.data.diagnosticReport.code.coding[0].display : ''}
            onChange={ this.changeState.bind(this, 'snomedDisplay')}
            fullWidth
            /><br/>
          <TextField
            id='evidenceDisplayInput'
            ref='evidenceDisplay'
            name='evidenceDisplay'
            floatingLabelText='Evidence (Observation)'
            value={this.data.diagnosticReport.evidence[0].detail[0] ? this.data.diagnosticReport.evidence[0].detail[0].display : ''}
            onChange={ this.changeState.bind(this, 'evidenceDisplay')}
            fullWidth
            /><br/>




        </CardText>
        <CardActions>
          { this.determineButtons(this.data.diagnosticReportId) }
        </CardActions>
      </div>
    );
  }


  determineButtons(diagnosticReportId){
    if (diagnosticReportId) {
      return (
        <div>
          <RaisedButton id="saveDiagnosticReportButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
          <RaisedButton id="deleteDiagnosticReportButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveDiagnosticReportButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }



  // this could be a mixin
  changeState(field, event, value){
    let diagnosticReportUpdate;

    if(process.env.NODE_ENV === "test") console.log("DiagnosticReportDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new diagnosticReport
    if (Session.get('diagnosticReportUpsert')) {
      diagnosticReportUpdate = Session.get('diagnosticReportUpsert');
    } else {
      diagnosticReportUpdate = defaultDiagnosticReport;
    }



    // if there's an existing diagnosticReport, use them
    if (Session.get('selectedDiagnosticReport')) {
      diagnosticReportUpdate = this.data.diagnosticReport;
    }

    switch (field) {
      case "patientDisplay":
        diagnosticReportUpdate.patient.display = value;
        break;
      case "asserterDisplay":
        diagnosticReportUpdate.asserter.display = value;
        break;
      case "clinicalStatus":
        diagnosticReportUpdate.clinicalStatus = value;
        break;
      case "snomedCode":
        diagnosticReportUpdate.code.coding[0].code = value;
        break;
      case "snomedDisplay":
        diagnosticReportUpdate.code.coding[0].display = value;
        break;
      case "evidenceDisplay":
        diagnosticReportUpdate.evidence[0].detail[0].display = value;
        break;
      default:

    }

    if(process.env.NODE_ENV === "test") console.log("diagnosticReportUpdate", diagnosticReportUpdate);
    Session.set('diagnosticReportUpsert', diagnosticReportUpdate);
  }

  handleSaveButton(){
    let diagnosticReportUpdate = Session.get('diagnosticReportUpsert', diagnosticReportUpdate);

    if(process.env.NODE_ENV === "test") console.log("diagnosticReportUpdate", diagnosticReportUpdate);


    if (Session.get('selectedDiagnosticReport')) {
      if(process.env.NODE_ENV === "test") console.log("Updating diagnosticReport...");
      delete diagnosticReportUpdate._id;

      // not sure why we're having to respecify this; fix for a bug elsewhere
      diagnosticReportUpdate.resourceType = 'DiagnosticReport';

      DiagnosticReports.update(
        {_id: Session.get('selectedDiagnosticReport')}, {$set: diagnosticReportUpdate }, function(error, result) {
          if (error) {
            console.log("error", error);

            Bert.alert(error.reason, 'danger');
          }
          if (result) {
            HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "DiagnosticReports", recordId: Session.get('selectedDiagnosticReport')});
            Session.set('diagnosticReportPageTabIndex', 1);
            Session.set('selectedDiagnosticReport', false);
            Session.set('diagnosticReportUpsert', false);
            Bert.alert('DiagnosticReport updated!', 'success');
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new diagnosticReport", diagnosticReportUpdate);

      DiagnosticReports.insert(diagnosticReportUpdate, function(error, result) {
        if (error) {
          console.log("error", error);
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "DiagnosticReports", recordId: result});
          Session.set('diagnosticReportPageTabIndex', 1);
          Session.set('selectedDiagnosticReport', false);
          Session.set('diagnosticReportUpsert', false);
          Bert.alert('DiagnosticReport added!', 'success');
        }
      });
    }
  }

  handleCancelButton(){
    Session.set('diagnosticReportPageTabIndex', 1);
  }

  handleDeleteButton(){
    DiagnosticReport.remove({_id: Session.get('selectedDiagnosticReport')}, function(error, result){
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "DiagnosticReports", recordId: Session.get('selectedDiagnosticReport')});
        Session.set('diagnosticReportPageTabIndex', 1);
        Session.set('selectedDiagnosticReport', false);
        Session.set('diagnosticReportUpsert', false);
        Bert.alert('DiagnosticReport removed!', 'success');
      }
    });
  }
}


DiagnosticReportDetail.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(DiagnosticReportDetail.prototype, ReactMeteorData);
