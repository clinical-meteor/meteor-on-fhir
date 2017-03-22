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
    "name" : {
      "resourceType" : "HumanName",
      "text" : ""
    },
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
      if (Session.get('selectedPractitioner')) {
        data.practitionerId = Session.get('selectedPractitioner');
        console.log("selectedPractitioner", Session.get('selectedPractitioner'));

        let selectedPractitioner = Practitioners.findOne({_id: Session.get('selectedPractitioner')});
        console.log("selectedPractitioner", selectedPractitioner);

        if (selectedPractitioner) {
          data.practitioner = selectedPractitioner;


          // fhir-1.6.0
          if (selectedPractitioner.name && selectedPractitioner.name[0]) {
            if(selectedPractitioner.name[0].text){
              data.practitioner.name = selectedPractitioner.name[0].text;
            } else if (selectedPractitioner.name[0].given && selectedPractitioner.name[0].family){
              data.practitioner.name = selectedPractitioner.name[0].given[0] + ' ' + selectedPractitioner.name[0].family[0];
            } 
          } else {
          // fhir-1.0.2
            data.practitioner.name = selectedPractitioner.name.text;        
          }


          if(selectedPractitioner.telecom && selectedPractitioner.telecom[0]){
            data.practitioner.telecomValue = selectedPractitioner.telecom[0].value;
            data.practitioner.telecomUse = selectedPractitioner.telecom[0].use;
          } 
          if(selectedPractitioner.qualification){
            if(selectedPractitioner.qualification[0]){
              data.practitioner.issuerDisplay = selectedPractitioner.qualification[0].issuer.display
            } 
            if (selectedPractitioner.qualification[0] && selectedPractitioner.qualification[0].identifier && selectedPractitioner.qualification[0].identifier[0] && selectedPractitioner.qualification[0].identifier[0].value ) {
              data.practitioner.qualificationId = selectedPractitioner.qualification[0].identifier[0].value;
            }
            if (selectedPractitioner.qualification[0] && selectedPractitioner.qualification[0].identifier && selectedPractitioner.qualification[0].identifier[0] && selectedPractitioner.qualification[0].identifier[0].period && selectedPractitioner.qualification[0].identifier[0].period.start ) {
              data.practitioner.qualificationStart = selectedPractitioner.qualification[0].identifier[0].period.start;
            }
            if (selectedPractitioner.qualification[0] && selectedPractitioner.qualification[0].identifier && selectedPractitioner.qualification[0].identifier[0] && selectedPractitioner.qualification[0].identifier[0].period && selectedPractitioner.qualification[0].identifier[0].period.end) {
              data.practitioner.qualificationEnd = selectedPractitioner.qualification[0].identifier[0].period.end;
            }

          }


        }
      } else {
        data.practitioner = defaultPractitioner;
      }
    }

    // if(process.env.NODE_ENV === "test") console.log("PractitionerDetail[data]", data);
    // return data;
    // if (Session.get('selectedPractitioner')) {
    //   data.practitionerId = Session.get('selectedPractitioner');
    //
    //   let selectedPractitioner = Practitioners.findOne({_id: Session.get('selectedPractitioner')});
    //   console.log("selectedPractitioner", selectedPractitioner);
    //
    //   if (selectedPractitioner) {
    //
    //     if (selectedPractitioner._id) {
    //       data.practitioner._id = selectedPractitioner._id;
    //     }
    //     if (selectedPractitioner.name && selectedPractitioner.name && selectedPractitioner.name.text ) {
    //       data.practitioner.name = selectedPractitioner.name.text;
    //     }
    //     if (selectedPractitioner.telecom && selectedPractitioner.telecom[0] && selectedPractitioner.telecom[0].value ) {
    //       data.practitioner.telecomValue = selectedPractitioner.telecom[0].value;
    //     }
    //     if (selectedPractitioner.telecom && selectedPractitioner.telecom[0] && selectedPractitioner.telecom[0].use ) {
    //       data.practitioner.telecomUse = selectedPractitioner.telecom[0].use;
    //     }
    //
    //     if (selectedPractitioner.qualification && selectedPractitioner.qualification[0] && selectedPractitioner.qualification[0].identifier && selectedPractitioner.qualification[0].identifier[0] && selectedPractitioner.qualification[0].identifier[0].value ) {
    //       data.practitioner.qualificationId = selectedPractitioner.qualification[0].identifier[0].value;
    //     }
    //     if (selectedPractitioner.qualification && selectedPractitioner.qualification[0] && selectedPractitioner.qualification[0].identifier && selectedPractitioner.qualification[0].identifier[0] && selectedPractitioner.qualification[0].identifier[0].period && selectedPractitioner.qualification[0].identifier[0].period.start ) {
    //       data.practitioner.qualificationStart = selectedPractitioner.qualification[0].identifier[0].period.start;
    //     }
    //     if (selectedPractitioner.qualification && selectedPractitioner.qualification[0] && selectedPractitioner.qualification[0].identifier && selectedPractitioner.qualification[0].identifier[0] && selectedPractitioner.qualification[0].identifier[0].period && selectedPractitioner.qualification[0].identifier[0].period.end) {
    //       data.practitioner.qualificationEnd = selectedPractitioner.qualification[0].identifier[0].period.end;
    //     }
    //     if (selectedPractitioner.qualification && selectedPractitioner.qualification[0] && selectedPractitioner.qualification[0].issuer && selectedPractitioner.qualification[0].issuer.display ) {
    //       data.practitioner.issuer = selectedPractitioner.qualification[0].issuer.display;
    //     }
    //   }
    // }
    //
    // if (Session.get('practitionerUpsert')) {
    //   data.practitioner = Session.get('practitionerUpsert');
    // }

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
                value={this.data.practitioner.name }
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
                hintText='701-555-1234'
                value={this.data.practitioner.telecomValue}
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
                hintText='work | mobile | home'
                value={this.data.practitioner.telecomUse}
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
                value={this.data.practitioner.issuerDisplay}
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
        practitionerUpdate.name.text = value;
        break;
      case "telecomValue":
        practitionerUpdate.telecom[0].value = value;
        break;
      case "telecomUse":
        practitionerUpdate.telecom[0].use = value;
        break;
      case "issuer":
        practitionerUpdate.qualification[0].issuer.display = value;
        break;
      case "qualificationId":
        practitionerUpdate.qualification[0].identifier[0].value = value;
        break;
      case "qualificationStart":
        practitionerUpdate.qualification[0].identifier[0].period.start = value;
        break;
      case "qualificationEnd":
        practitionerUpdate.qualification[0].identifier[0].period.end = value;
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

    if(process.env.NODE_ENV === "test") console.log("practitionerUpdate", practitionerUpdate);


    if (Session.get('selectedPractitioner')) {
      if(process.env.NODE_ENV === "test") console.log("Updating practitioner...");

      delete practitionerUpdate._id;

      // not sure why we're having to respecify this; fix for a bug elsewhere
      practitionerUpdate.resourceType = 'Practitioner';

      Practitioners.update({_id: Session.get('selectedPractitioner')}, {$set: practitionerUpdate }, function(error, result){
        if (error) {
          if(process.env.NODE_ENV === "test") console.log("Practitioners.insert[error]", error);
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
