import { CardActions, CardText } from 'material-ui/Card';

import { Bert } from 'meteor/themeteorchef:bert';
import { GlassCard } from '/imports/ui/components/GlassCard';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';
import { get } from 'lodash';

let defaultDiagnosticReport = {
  "resourceType": "DiagnosticReport",
  "code": {
    'text': ''
  },
  "status": "final",
  "issued": "",
  "subject": {
    'display': '',
    'reference': ''
  },
  "performer": [{
    "actor": {
      'display': '',
      'reference': ''
    }
  }],
  "identifier": [],
  "category": {
    'coding': []
  },
  "effectiveDateTime": "",
  "conclusion": "",
  "categoryText": "",
  "conclusion": ""
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

    
    if(data.diagnosticReport.category && data.diagnosticReport.category.coding){
      data.diagnosticReport.category.coding.forEach(function(coding){
        data.diagnosticReport.categoryText = coding.code;      
      });
    }

    
    if(get(data, 'diagnosticReport.performer[0].actor.display')){
      data.diagnosticReport.performerDisplay = get(data, 'diagnosticReport.performer[0].actor.display');
    }
    if(get(data, 'diagnosticReport.performer[0].actor.reference')){
      data.diagnosticReport.performerReference = get(data, 'diagnosticReport.performer[0].actor.reference');
    }
    

    console.log('DiagnosticReportDetail[data]', data);
    return data;
  }

  render() {
    return (
      <div id={this.props.id} className="diagnosticReportDetail">
        <CardText>
          <TextField
            id='subjectDisplayInput'
            ref='subjectDisplay'
            name='subjectDisplay'
            floatingLabelText='Subject - Display Text'
            value={this.data.diagnosticReport.subject ? this.data.diagnosticReport.subject.display : ''}
            onChange={ this.changeState.bind(this, 'subjectDisplay')}
            fullWidth
            /><br/>
            <TextField
            id='subjectReferenceInput'
            ref='subjectReference'
            name='subjectReference'
            floatingLabelText='Subject Reference'
            value={this.data.diagnosticReport.subject ? this.data.diagnosticReport.subject.reference : ''}
            onChange={ this.changeState.bind(this, 'subjectReference')}
            fullWidth
            /><br/>
          <TextField
            id='codeInput'
            ref='code'
            name='code'
            floatingLabelText='Code'
            value={this.data.diagnosticReport.code ? this.data.diagnosticReport.code.text : ''}
            onChange={ this.changeState.bind(this, 'code')}
            fullWidth
            /><br/>
          <TextField
            id='statusInput'
            ref='status'
            name='status'
            floatingLabelText='Status'
            value={this.data.diagnosticReport.status ? this.data.diagnosticReport.status : ''}
            onChange={ this.changeState.bind(this, 'status')}
            fullWidth
            /><br/>
          <TextField
            id='issuedInput'
            ref='issued'
            name='issued'
            floatingLabelText='Issued'
            value={this.data.diagnosticReport.issued ? this.data.diagnosticReport.issued : ''}
            onChange={ this.changeState.bind(this, 'issued')}
            fullWidth
            /><br/>
          <TextField
            id='performerDisplayInput'
            ref='performerDisplay'
            name='performerDisplay'
            floatingLabelText='Performer - Display Text'
            value={this.data.diagnosticReport.performerDisplay ? this.data.diagnosticReport.performerDisplay : ''}
            onChange={ this.changeState.bind(this, 'performerDisplay')}
            fullWidth
            /><br/>
            <TextField
            id='performerReferenceInput'
            ref='performerReference'
            name='performerReference'
            floatingLabelText='Performer - Reference'
            value={this.data.diagnosticReport.performerReference ? this.data.diagnosticReport.performerReference : ''}
            onChange={ this.changeState.bind(this, 'performerReference')}
            fullWidth
            /><br/>            
          <TextField
            id='identifierInput'
            ref='identifier'
            name='identifier'
            floatingLabelText='Identifier'
            value={this.data.diagnosticReport.identifier[0] ? this.data.diagnosticReport.identifier[0].value : ''}
            onChange={ this.changeState.bind(this, 'identifier')}
            fullWidth
            /><br/>

          <TextField
            id='categoryInput'
            ref='category'
            name='category'
            floatingLabelText='Category'
            value={this.data.diagnosticReport.categoryText ? this.data.diagnosticReport.categoryText : ''}
            onChange={ this.changeState.bind(this, 'category')}
            fullWidth
            /><br/>
          <TextField
            id='effectiveDateInput'
            ref='effectiveDate'
            name='effectiveDate'
            floatingLabelText='Effective Date'
            value={this.data.diagnosticReport.effectiveDateTime ? moment(this.data.diagnosticReport.effectiveDateTime).format("YYYY-MM-DD") : ''}
            onChange={ this.changeState.bind(this, 'effectiveDate')}
            fullWidth
            /><br/>
          <TextField
            id='conclusionInput'
            ref='conclusion'
            name='conclusion'
            floatingLabelText='Conclusion'
            value={this.data.diagnosticReport.conclusion ? this.data.diagnosticReport.conclusion : ''}
            onChange={ this.changeState.bind(this, 'conclusion')}
            multiLine={true}          
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
          <RaisedButton id="saveDiagnosticReportButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)}  style={{marginRight: '20px'}}  />
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
    let diagnosticReportUpsert;

    if(process.env.NODE_ENV === "test") console.log("DiagnosticReportDetail.changeState", field, value);

    // by default, assume there's no other data and we're creating a new diagnosticReport
    if (Session.get('diagnosticReportUpsert')) {
      diagnosticReportUpsert = Session.get('diagnosticReportUpsert');
    } else {
      diagnosticReportUpsert = defaultDiagnosticReport;
    }

    // if there's an existing diagnosticReport, use them
    if (Session.get('selectedDiagnosticReport')) {
      diagnosticReportUpsert = this.data.diagnosticReport;
    }

    var performer = diagnosticReportUpsert.performer[0];
    switch (field) {
      case "subjectDisplay":
        diagnosticReportUpsert.subject.display = value;
        break;
        case "subjectReference":
        diagnosticReportUpsert.subject.reference = value;
        break;
      case "code":
        diagnosticReportUpsert.code = {
          text: value
        }
        break;
      case "status":
        diagnosticReportUpsert.status = value;
        break;
      case "issued":
        diagnosticReportUpsert.issued = moment(value);
        break;
      case "performerDisplay":
        diagnosticReportUpsert.performer = [{
          actor: {
            display: value,
            reference: performer.actor.reference
          }
        }];        
        break;
      case "performerReference":        
        diagnosticReportUpsert.performer = [{
          actor: {
            display: performer.actor.display,
            reference: value
          }
        }];        
        break;
      case "identifier":
        diagnosticReportUpsert.identifier = [{
          'use': 'official',
          'value': value
        }]
        break;
      case "category":
        diagnosticReportUpsert.category.coding = [{
          code: value
        }];
        break;
      case "effectiveDate":
        diagnosticReportUpsert.effectiveDate = moment(value);
        break;
      case "conclusion":
        diagnosticReportUpsert.conclusion = value;
        break;      
        default:
    }
    
    if(process.env.NODE_ENV === "test") console.log("changeState[end]", diagnosticReportUpsert);
    Session.set('diagnosticReportUpsert', diagnosticReportUpsert);
  }

  handleSaveButton(){
    let diagnosticReportUpsert = Session.get('diagnosticReportUpsert', diagnosticReportUpsert);

    if(process.env.NODE_ENV === "test") console.log("handleSaveButton", diagnosticReportUpsert);


    if (Session.get('selectedDiagnosticReport')) {
      if(process.env.NODE_ENV === "test") console.log("Updating diagnosticReport...");
      delete diagnosticReportUpsert._id;

      // not sure why we're having to respecify this; fix for a bug elsewhere
      diagnosticReportUpsert.resourceType = 'DiagnosticReport';
      diagnosticReportUpsert.issued = new Date();
      
      DiagnosticReports.update(
        {_id: Session.get('selectedDiagnosticReport')}, {$set: diagnosticReportUpsert }, function(error, result) {
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

      if(process.env.NODE_ENV === "test") console.log("create a new diagnosticReport", diagnosticReportUpsert);

      diagnosticReportUpsert.effectiveDateTime = new Date();
      diagnosticReportUpsert.issued = new Date();
      
      DiagnosticReports.insert(diagnosticReportUpsert, function(error, result) {
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
    DiagnosticReports.remove({_id: Session.get('selectedDiagnosticReport')}, function(error, result){
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
