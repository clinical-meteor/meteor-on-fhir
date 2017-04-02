import { CardActions, CardText } from 'material-ui/Card';
import { Col, Grid, Row } from 'react-bootstrap';

import {Bert} from 'meteor/themeteorchef:bert';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';

let defaultPractitioner = {
  "resourceType" : "Practitioner",
    "name" : [{
      "resourceType" : "HumanName",
      "text" : ""
    }],
    "telecom" : [{
      "resourceType" : "ContactPoint",
      "system" : "phone",
      "value" : "",
      "use" : "",
      "rank" : 1
    }],
    "qualification" : [{
      "identifier" : [{
        "use" : "certficate",
        "value" : "",
        "period" : {}
      }],
      "issuer" : {
        "display" : "",
        "reference" : ""
      }
  }]
};

Session.setDefault('practitionerUpsert', defaultPractitioner);



export default class PractitionerDetail extends React.Component {
  getMeteorData() {
    let data = {
      practitionerId: false,
      practitioner: defaultPractitioner
    };


    if (Session.get('practitionerUpsert')) {
      data.practitioner = Session.get('practitionerUpsert');
    } else {
      let selectedPractitioner;
      if (Session.get('selectedPractitioner')) {
        data.practitionerId = Session.get('selectedPractitioner');
        selectedPractitioner = Practitioners.findOne({_id: Session.get('selectedPractitioner')});
      } else {
        selectedPractitioner = defaultPractitioner;
      }
        console.log("selectedPractitioner", selectedPractitioner);

        //data.practitioner = {};

        // fhir-1.6.0
        if (selectedPractitioner.name && selectedPractitioner.name[0]) {
          data.practitioner.name = [selectedPractitioner.name[0]];
          // if(selectedPractitioner.name[0].text){
          //   data.practitioner.name = selectedPractitioner.name[0].text;
          // } else if (selectedPractitioner.name[0].given && selectedPractitioner.name[0].family){
          //   data.practitioner.name = selectedPractitioner.name[0].given[0] + ' ' + selectedPractitioner.name[0].family;
          // } 
        } else {
        // fhir-1.0.2
          data.practitioner.name = selectedPractitioner.name.text;        
        }

        if(selectedPractitioner.telecom && selectedPractitioner.telecom[0]){
          data.practitioner.telecom = [{
            value: selectedPractitioner.telecom[0].value,
            use: selectedPractitioner.telecom[0].use
          }];
        } 
        if(selectedPractitioner.qualification){
          var newQualification = {
              issuer: {
                display: ''
              }, 
              identifier: []
            };
          if(selectedPractitioner.qualification[0]){
            newQualification.issuer.display = selectedPractitioner.qualification[0].issuer.display;
          } 
          if(selectedPractitioner.qualification[0] && selectedPractitioner.qualification[0].identifier && selectedPractitioner.qualification[0].identifier[0]){
            newQualification.identifier = [{
              value: selectedPractitioner.qualification[0].identifier[0].value,
              period: {
                start: selectedPractitioner.qualification[0].identifier[0].period.start,
                end: selectedPractitioner.qualification[0].identifier[0].period.end
              }
            }]
          }

          data.practitioner.qualification = [newQualification];

          // if (selectedPractitioner.qualification[0] && selectedPractitioner.qualification[0].identifier && selectedPractitioner.qualification[0].identifier[0] && selectedPractitioner.qualification[0].identifier[0].value ) {
          //   data.practitioner.qualificationId = selectedPractitioner.qualification[0].identifier[0].value;
          // }
          // if (selectedPractitioner.qualification[0] && selectedPractitioner.qualification[0].identifier && selectedPractitioner.qualification[0].identifier[0] && selectedPractitioner.qualification[0].identifier[0].period && selectedPractitioner.qualification[0].identifier[0].period.start ) {
          //   data.practitioner.qualificationStart = selectedPractitioner.qualification[0].identifier[0].period.start;
          // }
          // if (selectedPractitioner.qualification[0] && selectedPractitioner.qualification[0].identifier && selectedPractitioner.qualification[0].identifier[0] && selectedPractitioner.qualification[0].identifier[0].period && selectedPractitioner.qualification[0].identifier[0].period.end) {
          //   data.practitioner.qualificationEnd = selectedPractitioner.qualification[0].identifier[0].period.end;
          // }

        }
          
    };

    if(process.env.NODE_ENV === "test") console.log("PractitionerDetail[data]", data);
    return data;
  }


  render() {
    return (
      <div id={this.props.id} className="practitionerDetail">
        <CardText>
          <Row>
            <Col md={6}>
              <TextField
                id='practitionerNameInput'
                ref='name'
                name='name'
                type='text'
                floatingLabelText='name'
                floatingLabelFixed={true}
                value={ (this.data.practitioner.name && this.data.practitioner.name[0]) ? this.data.practitioner.name[0].text : '' }
                onChange={ this.changeState.bind(this, 'name')}
                fullWidth
                /><br/>
            </Col>
            <Col md={3}>
              <TextField
                id='telecomValueInput'
                ref='telecomValue'
                name='telecomValue'
                type='text'
                floatingLabelText='telecom value'
                floatingLabelFixed={true}
                hintText='701-555-1234'
                value={ (this.data.practitioner.telecom && this.data.practitioner.telecom[0]) ? this.data.practitioner.telecom[0].value : '' }
                onChange={ this.changeState.bind(this, 'telecomValue')}
                fullWidth
                /><br/>
            </Col>
            <Col md={3}>
              <TextField
                id='telecomUseInput'
                ref='telecomUse'
                name='telecomUse'
                type='text'
                floatingLabelText='telecom use'
                floatingLabelFixed={true}
                hintText='work | mobile | home'
                value={ (this.data.practitioner.telecom && this.data.practitioner.telecom[0]) ? this.data.practitioner.telecom[0].use : '' }
                onChange={ this.changeState.bind(this, 'telecomUse')}
                fullWidth
                /><br/>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <TextField
                id='issuerInput'
                ref='issuer'
                name='issuer'
                type='text'
                floatingLabelText='issuer'
                floatingLabelFixed={true}
                value={ (this.data.practitioner.qualification && this.data.practitioner.qualification[0] && this.data.practitioner.qualification[0].issuer) ? this.data.practitioner.qualification[0].issuer.display : ''}
                onChange={ this.changeState.bind(this, 'issuer')}
                fullWidth
                /><br/>
            </Col>
            <Col md={2}>
              <TextField
                id='qualificationIdInput'
                ref='qualificationId'
                name='qualificationId'
                type='text'
                floatingLabelText='qualification ID'
                floatingLabelFixed={true}
                value={this.data.practitioner.qualificationId}
                onChange={ this.changeState.bind(this, 'qualificationId')}
                fullWidth
                /><br/>
            </Col>
            <Col md={3}>
              <TextField
                id='qualificationStartInput'
                ref='qualificationStart'
                name='qualificationStart'
                type='date'
                floatingLabelText='start'
                floatingLabelFixed={true}
                value={this.data.practitioner.qualificationStart}
                onChange={ this.changeState.bind(this, 'qualificationStart')}
                fullWidth
                /><br/>
            </Col>
            <Col md={3}>
              <TextField
                id='qualificationEndInput'
                ref='qualificationEnd'
                name='qualificationEnd'
                type='date'
                floatingLabelText='end'
                floatingLabelFixed={true}
                value={this.data.practitioner.qualificationEnd}
                onChange={ this.changeState.bind(this, 'qualificationEnd')}
                fullWidth
                /><br/>
            </Col>
          </Row>
        </CardText>
        <CardActions>
          { this.determineButtons(this.data.practitionerId) }
        </CardActions>
      </div>
    );
  }
  determineButtons(practitionerId){
    if (practitionerId) {
      return (
        <div>
          <RaisedButton id="savePractitionerButton" className="savePractitionerButton" primary={true} label="Save" onClick={this.handleSaveButton.bind(this)} style={{marginRight: '20px'}} />
          <RaisedButton id="deletePractitionerButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="savePractitionerButton" className="savePractitionerButton" primary={true} label="Save" onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }

  // this could be a mixin
  changeState(field, event, value){

    let practitionerUpdate;

    if(process.env.NODE_ENV === "test") console.log("practitionerDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new practitioner
    if (Session.get('practitionerUpsert')) {
      practitionerUpdate = Session.get('practitionerUpsert');
    } else {
      practitionerUpdate = defaultPractitioner;
    }



    // if there's an existing practitioner, use them
    if (Session.get('selectedPractitioner')) {
      practitionerUpdate = this.data.practitioner;
    }

    switch (field) {
      case "name":
        practitionerUpdate.name = [{
          text: value
        }];
        break;
      case "telecomValue":
        var currentTelecom = practitionerUpdate.telecom[0];
        currentTelecom.value = value;
        practitionerUpdate.telecom = [currentTelecom];
        break;
      case "telecomUse":
        var currentTelecom = practitionerUpdate.telecom[0];
        currentTelecom.use = value;
        practitionerUpdate.telecom = [currentTelecom];
        break;f
      case "issuer":
        var currentIssuer = practitionerUpdate.qualification[0];
        currentIssuer.issuer.display = value;
        practitionerUpdate.qualification = [currentIssuer];
        break;
      case "qualificationId":
        var currentCredential = {};
        if(practitionerUpdate.qualification[0].identifier[0]){
          currentCredential = practitionerUpdate.qualification[0].identifier[0];
        }
        practitionerUpdate.qualification[0].identifier = [currentCredential];
        // practitionerUpdate.qualification[0].identifier[0].value = value;
        break;
      case "qualificationStart":
        var currentCredential = practitionerUpdate.qualification[0].identifier[0];
        currentCredential.period.start = value;
        practitionerUpdate.qualification[0].identifier = [currentCredential];
        // practitionerUpdate.qualification[0].identifier[0].period.start = value;
        break;
      case "qualificationEnd":
        var currentCredential = practitionerUpdate.qualification[0].identifier[0];
        currentCredential.period.end = value;
        practitionerUpdate.qualification[0].identifier = [currentCredential];
        // practitionerUpdate.qualification[0].identifier[0].period.end = value;
        break;
      default:

    }
    // practitionerUpdate[field] = value;
    if(process.env.NODE_ENV === "test") console.log("practitionerUpdate", practitionerUpdate);

    Session.set('practitionerUpsert', practitionerUpdate);
  }



  // this could be a mixin
  handleSaveButton(){
    let practitionerUpdate = Session.get('practitionerUpsert', practitionerUpdate);

    if(process.env.NODE_ENV === "test") console.log("handleSaveButton()");


    if (Session.get('selectedPractitioner')) {
      if(process.env.NODE_ENV === "test") console.log("Updating practitioner...");

      delete practitionerUpdate._id;

      // not sure why we're having to respecify this; fix for a bug elsewhere
      practitionerUpdate.resourceType = 'Practitioner';

      PractitionerSchema.clean(practitionerUpdate);

      if(process.env.NODE_ENV === "test") console.log("practitionerUpdate", practitionerUpdate);

      Practitioners.update({_id: Session.get('selectedPractitioner')}, {$set: practitionerUpdate }, function(error, result){
        if (error) {
          if(process.env.NODE_ENV === "test") console.log("Practitioners.update[error]", error);
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Practitioner added!', 'success');
          Session.set('practitionerUpdate', defaultPractitioner);
          Session.set('practitionerUpsert', defaultPractitioner);
          Session.set('practitionerPageTabIndex', 1);
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Practitioners", recordId: Session.get('selectedPractitioner')});
        }
      });
    } else {
      if(process.env.NODE_ENV === "test") console.log("Creating a new practitioner...", practitionerUpdate);

      Practitioners.insert(practitionerUpdate, function(error, result) {
        if (error) {
          if(process.env.NODE_ENV === "test") console.log("Practitioners.insert[error]", error);
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Practitioner added!', 'success');
          Session.set('practitionerPageTabIndex', 1);
          Session.set('selectedPractitioner', false);
          Session.set('practitionerUpsert', false);
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Practitioners", recordId: result});
        }
      });
    }
  }

  // this could be a mixin
  handleCancelButton(){
    Session.set('practitionerPageTabIndex', 1);
  }

  handleDeleteButton(){
    Practitioners.remove({_id: Session.get('selectedPractitioner')}, function(error, result){
      if (error) {
        if(process.env.NODE_ENV === "test") console.log("Practitioners.insert[error]", error);
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Practitioner removed!', 'success');
        Session.set('practitionerUpdate', defaultPractitioner);
        Session.set('practitionerUpsert', defaultPractitioner);
        Session.set('practitionerPageTabIndex', 1);
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Practitioners", recordId: Session.get('selectedPractitioner')});
      }
    });
  }
}


ReactMixin(PractitionerDetail.prototype, ReactMeteorData);
