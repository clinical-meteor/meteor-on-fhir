import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { Col, Grid, Row } from 'react-bootstrap';
import { get, has, set } from 'lodash';

import { Bert } from 'meteor/themeteorchef:bert';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

let defaultMedicationStatement = {
  "resourceType": "MedicationStatement",
  "partOf": [],
  "status": "",
  "medicationCodeableConcept": {
    "coding": []
  },
  "effectiveDateTime": null,
  "dateAsserted": null,
  "informationSource": {
    "reference": "",
    "display": ""
  },
  "subject": {
    "reference": "",
    "display": ""
  },
  "medicationReference": {
    "reference": "",
    "display": ""
  },
  "taken": "y",
  "reasonCode": [{
    "coding": [{
      "code": "",
      "display": ""
    }]
  }],
  "note": [{
    "text": ''
  }],
  "dosage": []
};

var defaultMedicationStatementForm = {
  basedOn: "",
  effectiveDateTime: "",
  dateAsserted: "",
  informationSourceReference: "",
  informationSourceDisplay: "",
  subjectDisplay: "",
  subjectReference: "",
  taken: "",
  reasonCodeDisplay: "",
  reasonCode: "",
  dosage: "",
  medicationReference: '',
  medicationDisplay: '',
  clinicalNote: ''
};


Session.setDefault('medicationStatementFormUpsert', false);
Session.setDefault('selectedMedicationStatement', false);
Session.setDefault('originalMedicationStatement', false);

export default class MedicationStatementDetail extends React.Component {
  getMeteorData() {
    let data = {
      medicationStatementId: false,
      medicationStatement: defaultMedicationStatement,
      medicationStatementForm: defaultMedicationStatementForm
    };

    if (Session.get('selectedMedicationStatement')) {
      data.medicationStatementId = Session.get('selectedMedicationStatement');
      console.log("selectedMedicationStatement", Session.get('selectedMedicationStatement'));

      data.medicationStatement = MedicationStatements.findOne({_id: Session.get('selectedMedicationStatement')});
      console.log("selectedMedicationStatement", data.medicationStatement);

    } else {
      data.medicationStatementForm = defaultMedicationStatementForm;
      data.medicationStatement = defaultMedicationStatement;
    }    
    

    if(has(data.medicationStatement, 'medicationReference.display')){
      data.medicationStatementForm.medicationDisplay = get(data.medicationStatement, 'medicationReference.display', '');
    } 
    if(has(data.medicationStatement, 'medicationReference.reference')){
      data.medicationStatementForm.medicationReference = get(data.medicationStatement, 'medicationReference.reference', '');
    } 

    if(has(data.medicationStatement, 'identifier[0].value')){
      data.medicationStatementForm.identifier = get(data.medicationStatement, 'identifier[0].value', '');
    }        

    if(has(data.medicationStatement, 'effectiveDateTime')){
      data.medicationStatementForm.effectiveDateTime = moment(get(data.medicationStatement, 'effectiveDateTime')).format("YYYY-MM-DD");
    }        

    if(has(data.medicationStatement, 'dateAsserted')){
      data.medicationStatementForm.dateAsserted = moment(get(data.medicationStatement, 'dateAsserted')).format("YYYY-MM-DD");
    }        

    if(has(data.medicationStatement, 'subject.display')){
      data.medicationStatementForm.subjectDisplay = get(data.medicationStatement, 'subject.display', '');
    }        
    if(has(data.medicationStatement, 'subject.reference')){
      data.medicationStatementForm.subjectReference = get(data.medicationStatement, 'subject.reference', '');
    }        

    if(has(data.medicationStatement, 'informationSource.display')){
      data.medicationStatementForm.informationSourceDisplay = get(data.medicationStatement, 'informationSource.display', '');
    }        
    if(has(data.medicationStatement, 'informationSource.reference')){
      data.medicationStatementForm.informationSourceReference = get(data.medicationStatement, 'informationSource.reference', '');
    }        

    if(has(data.medicationStatement, 'taken')){
      data.medicationStatementForm.taken = get(data.medicationStatement, 'taken', 'y');
    }        

    if(has(data.medicationStatement, 'reasonCode[0].coding[0].display')){
      data.medicationStatementForm.reasonCodeDisplay = get(data.medicationStatement, 'reasonCode[0].coding[0].display', '');
    }  
    if(has(data.medicationStatement, 'reasonCode[0].coding[0].code')){
      data.medicationStatementForm.reasonCode = get(data.medicationStatement, 'reasonCode[0].coding[0].code', '');
    }  
    if(has(data.medicationStatement, 'note[0].text')){
      data.medicationStatementForm.clinicalNote = get(data.medicationStatement, 'note[0].text', '');
    }     
    
    if (Session.get('medicationStatementFormUpsert')) {
      data.medicationStatementForm = Session.get('medicationStatementFormUpsert');
    } 

    console.log('MedicationStatementDetail[data]', data);
    return data;
  }

  render() {
    return (
      <div id={this.props.id} className="medicationStatementDetail">
        <CardText>
          <TextField
              id='dateAssertedInput'
              ref='dateAsserted'
              name='dateAsserted'
              floatingLabelText='Date Asserted'
              value={this.data.medicationStatementForm.dateAsserted ? this.data.medicationStatementForm.dateAsserted : ''}
              onChange={ this.changeState.bind(this, 'dateAsserted')}
              /><br/>   
          <Row> 
            <Col md={8} >
              <TextField
                id='subjectDisplayInput'
                ref='subjectDisplay'
                name='subjectDisplay'
                floatingLabelText='Patient - Display'
                value={this.data.medicationStatementForm.subjectDisplay ? this.data.medicationStatementForm.subjectDisplay : ''}
                onChange={ this.changeState.bind(this, 'subjectDisplay')}
                fullWidth
                /><br/>
            </Col>
            <Col md={4} >
              <TextField
                id='subjectReferenceInput'
                ref='subjectReference'
                name='subjectReference'
                floatingLabelText='Patient - Reference'
                value={this.data.medicationStatementForm.subjectReference ? this.data.medicationStatementForm.subjectReference : ''}
                onChange={ this.changeState.bind(this, 'subjectReference')}
                fullWidth
                /><br/>         
            </Col>
          </Row>
          <Row> 
            <Col md={8} >
              <TextField
                id='informationSourceDisplayInput'
                ref='informationSourceDisplay'
                name='informationSourceDisplay'
                floatingLabelText='Information Source - Display'
                value={this.data.medicationStatementForm.informationSourceDisplay ? this.data.medicationStatementForm.informationSourceDisplay : ''}
                onChange={ this.changeState.bind(this, 'informationSourceDisplay')}
                fullWidth
                /><br/>
            </Col>
            <Col md={4} >
              <TextField
                id='informationSourceReferenceInput'
                ref='informationSourceReference'
                name='informationSourceReference'
                floatingLabelText='Information Source - Reference'
                value={this.data.medicationStatementForm.informationSourceReference ? this.data.medicationStatementForm.informationSourceReference : ''}
                onChange={ this.changeState.bind(this, 'informationSourceReference')}
                fullWidth
                /><br/>   
            </Col>
          </Row>


          <Row> 
            <Col md={8} >
              <TextField
                id='medicationDisplayInput'
                ref='medicationDisplay'
                name='medicationDisplay'
                floatingLabelText='Medication - Display'
                value={this.data.medicationStatementForm.medicationDisplay ? this.data.medicationStatementForm.medicationDisplay : ''}
                onChange={ this.changeState.bind(this, 'medicationDisplay')}
                fullWidth
                /><br/>               
            </Col>
            <Col md={4} >
              <TextField
                id='medicationReferenceInput'
                ref='medicationReference'
                name='medicationReference'
                floatingLabelText='Medication - Reference'
                value={this.data.medicationStatementForm.medicationReference ? this.data.medicationStatementForm.medicationReference : ''}
                onChange={ this.changeState.bind(this, 'medicationReference')}
                fullWidth
                /><br/>     
            </Col>
          </Row> 

          <Row> 
            <Col md={8} >
              <TextField
                id='reasonCodeDisplayInput'
                ref='reasonCodeDisplay'
                name='reasonCodeDisplay'
                floatingLabelText='Reason - Display Text'
                value={this.data.medicationStatementForm.reasonCodeDisplay ? this.data.medicationStatementForm.reasonCodeDisplay : ''}
                onChange={ this.changeState.bind(this, 'reasonCodeDisplay')}
                fullWidth
                /><br/>   
            </Col>
            <Col md={4} >
              <TextField
                id='reasonCodeInput'
                ref='reasonCode'
                name='reasonCode'
                floatingLabelText='Reason - Code Value'
                value={this.data.medicationStatementForm.reasonCode ? this.data.medicationStatementForm.reasonCode : ''}
                onChange={ this.changeState.bind(this, 'reasonCode')}
                fullWidth
                /><br/>   
            </Col>
          </Row>


          <Row> 
            <Col md={2} >
              <TextField
                id='takenInput'
                ref='taken'
                name='taken'
                floatingLabelText='Medication Taken'
                value={this.data.medicationStatementForm.taken ? this.data.medicationStatementForm.taken : ''}
                onChange={ this.changeState.bind(this, 'taken')}
                fullWidth
                /><br/>   
            </Col>
            <Col md={6} >
              <DatePicker
                id='effectiveDateTimeInput'
                ref='effectiveDateTime'
                name='effectiveDateTime'
                floatingLabelText='Effective Date/Time'
                container="inline" 
                mode="landscape"
                value={this.data.medicationStatementForm.effectiveDateTime ? this.data.medicationStatementForm.effectiveDateTime : ''}
                onChange={ this.changeState.bind(this, 'effectiveDateTime')}
                fullWidth
                /><br/>   
            </Col>
          </Row>



          
          <TextField
            id='clinicalNoteInput'
            ref='clinicalNote'
            name='clinicalNote'
            floatingLabelText='Clinical Note'
            value={this.data.medicationStatementForm.clinicalNote ? this.data.medicationStatementForm.clinicalNote : ''}
            onChange={ this.changeState.bind(this, 'clinicalNote')}
            multiLine={true}
            fullWidth
            /><br/>   
        </CardText>
        <CardActions>
          { this.determineButtons(this.data.medicationStatementId) }
        </CardActions>
      </div>
    );
  }


  addToContinuityOfCareDoc(){
    console.log('addToContinuityOfCareDoc', Session.get('medicationStatementFormUpsert'));

    var medicationStatementFormUpsert = Session.get('medicationStatementFormUpsert');


    // medicationStatementStateChange.basedOn
    // medicationStatementStateChange.dosage
    

    var newMedicationStatement = {
      "resourceType": "MedicationStatement",
      "partOf": [],
      "status": "",
      "medicationCodeableConcept": {
        "coding": []
      },
      "effectiveDateTime": medicationStatementFormUpsert.effectiveDateTime,
      "dateAsserted": medicationStatementFormUpsert.dateAsserted,
      "informationSource": {
        "reference": medicationStatementFormUpsert.informationSourceReference,
        "display": medicationStatementFormUpsert.informationSourceDisplay,
      },
      "subject": {
        "reference": medicationStatementFormUpsert.subjectReference,
        "display": medicationStatementFormUpsert.subjectDisplay,
      },
      "medicationReference": {
        "reference": medicationStatementFormUpsert.medicationReference,
        "display": medicationStatementFormUpsert.medicationDisplay,
      },
      "taken": medicationStatementFormUpsert.taken,
      "reasonCode": [{
        "coding": [{
          "code": medicationStatementFormUpsert.reasonCode,
          "display": medicationStatementFormUpsert.reasonCodeDisplay
        }]
      }],
      "note": [{
        "text": medicationStatementFormUpsert.clinicalNote
      }]
    }

    console.log('Lets write this to the profile... ', newMedicationStatement);

    Meteor.users.update({_id: Meteor.userId()}, {$addToSet: {
      'profile.continuityOfCare.medicationStatements': newMedicationStatement
    }}, function(error, result){
      if(error){
        console.log('error', error);
      }
      if(result){
        browserHistory.push('/continuity-of-care');
      }
    });
  }


  determineButtons(medicationStatementId){
    if (medicationStatementId) {
      return (
        <div>
          <RaisedButton id="saveMedicationStatementButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} style={{marginRight: '20px'}}  />
          <RaisedButton id="deleteMedicationStatementButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />

          <RaisedButton id="addMedicationStatementToContinuityCareDoc" label="Add to CCD" primary={true} onClick={this.addToContinuityOfCareDoc.bind(this)} style={{float: 'right'}} />
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
    let medicationStatementStateChange;

    if(process.env.NODE_ENV === "test") console.log("MedicationStatementDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new medicationStatement
    if (Session.get('medicationStatementFormUpsert')) {
      medicationStatementStateChange = Session.get('medicationStatementFormUpsert');
    } else {
      medicationStatementStateChange = defaultMedicationStatementForm;
    }
    

    switch (field) {
      case "medicationDisplay":
        medicationStatementStateChange.medicationDisplay = value;
        break;
      case "medicationReference":
        medicationStatementStateChange.medicationReference = value;
        break;
      case "basedOn":
        medicationStatementStateChange.basedOn = value;
        break;
      case "effectiveDateTime":
        medicationStatementStateChange.effectiveDateTime = value;
        break;
      case "dateAsserted":
        medicationStatementStateChange.dateAsserted = value;
        break;
      case "informationSourceReference":
        medicationStatementStateChange.informationSourceReference = value;
        break;
      case "informationSourceDisplay":
        medicationStatementStateChange.informationSourceDisplay = value;
        break;
      case "subjectDisplay":
        medicationStatementStateChange.subjectDisplay = value;
        break;
      case "subjectReference":
        medicationStatementStateChange.subjectReference = value;
        break;
      case "taken":
        medicationStatementStateChange.taken = value;
        break;
      case "reasonCodeDisplay":
        medicationStatementStateChange.reasonCodeDisplay = value;
        break;
      case "reasonCode":
        medicationStatementStateChange.reasonCode = value;
        break;
      case "dosage":
        medicationStatementStateChange.dosage = value;
        break;
      case "clinicalNote":
        medicationStatementStateChange.clinicalNote = value;
        break;

      default:

    }

    if(process.env.NODE_ENV === "test") console.log("medicationStatementStateChange", medicationStatementStateChange);
    Session.set('medicationStatementFormUpsert', medicationStatementStateChange);
  }

  handleSaveButton(){
    let formUpsert = Session.get('medicationStatementFormUpsert');

    if(process.env.NODE_ENV === "test") console.log("handleSaveButton", formUpsert);

    

    var medicationStatementDiff;
    
    if(this.data.medicationStatement){
      medicationStatementDiff = this.data.medicationStatement;
    } else {
      medicationStatementDiff = defaultMedicationStatement;
    }

    if(process.env.NODE_ENV === "test") console.log("medicationStatementDiff", medicationStatementDiff);

    
    if(formUpsert.effectiveDateTime){
      set(medicationStatementDiff, 'effectiveDateTime', moment(formUpsert.effectiveDateTime).toDate());
    }
    if(formUpsert.dateAsserted){
      set(medicationStatementDiff, 'dateAsserted', moment(formUpsert.dateAsserted).toDate());
    }
    if(formUpsert.informationSourceReference){
      set(medicationStatementDiff, 'informationSource.reference', formUpsert.informationSourceReference);
    }
    if(formUpsert.informationSourceDisplay){
      set(medicationStatementDiff, 'informationSource.display', formUpsert.informationSourceDisplay);
    }
    if(formUpsert.subjectReference){
      set(medicationStatementDiff, 'subject.reference', formUpsert.subjectReference);
    }
    if(formUpsert.subjectDisplay){
      set(medicationStatementDiff, 'subject.display', formUpsert.subjectDisplay);
    }
    if(formUpsert.medicationReference){
      set(medicationStatementDiff, 'medicationReference.reference', formUpsert.medicationReference);
    }
    if(formUpsert.medicationDisplay){
      set(medicationStatementDiff, 'medicationReference.display', formUpsert.medicationDisplay);
    }
    if(formUpsert.taken){
      set(medicationStatementDiff, 'taken', formUpsert.taken);
    }
    if(formUpsert.clinicalNote){
      set(medicationStatementDiff, 'note[0].text', formUpsert.clinicalNote);
    }  
    if(formUpsert.reasonCodeDisplay){
      set(medicationStatementDiff, 'reasonCode[0].coding[0].display', formUpsert.reasonCodeDisplay);
    }
    if(formUpsert.reasonCode){
      set(medicationStatementDiff, 'reasonCode[0].coding[0].code', formUpsert.reasonCode);
    }

    delete medicationStatementDiff._id;
    delete medicationStatementDiff._document;
    
    if(process.env.NODE_ENV === "test") console.log("medicationStatementDiff", medicationStatementDiff);
    
    if (Session.get('selectedMedicationStatement')) {
      if(process.env.NODE_ENV === "test") console.log("Updating medicationStatement...");

      MedicationStatements.update(
        {_id: Session.get('selectedMedicationStatement')}, {$set: medicationStatementDiff }, function(error, result) {
          if (error) {
            console.log("error", error);

            Bert.alert(error.reason, 'danger');
          }
          if (result) {
            HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "MedicationStatements", recordId: Session.get('selectedMedicationStatement')});
            Session.set('medicationStatementPageTabIndex', 1);
            Session.set('selectedMedicationStatement', false);
            Session.set('medicationStatementFormUpsert', false);
            Bert.alert('MedicationStatement updated!', 'success');
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new medicationStatement", medicationStatementDiff);

      MedicationStatements.insert(medicationStatementDiff, function(error, result) {
        if (error) {
          console.log("error", error);
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "MedicationStatements", recordId: result});
          Session.set('medicationStatementPageTabIndex', 1);
          Session.set('selectedMedicationStatement', false);
          Session.set('medicationStatementFormUpsert', false);
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
        Session.set('medicationStatementFormUpsert', false);
        Bert.alert('MedicationStatement removed!', 'success');
      }
    });
  }
}


MedicationStatementDetail.propTypes = {
  hasUser: PropTypes.object
};
ReactMixin(MedicationStatementDetail.prototype, ReactMeteorData);
