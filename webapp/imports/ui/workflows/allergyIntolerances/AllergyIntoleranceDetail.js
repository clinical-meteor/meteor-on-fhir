import { CardActions, CardText } from 'material-ui/Card';

import { Bert } from 'meteor/themeteorchef:bert';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';
import { get } from 'lodash';

let defaultAllergyIntolerance = {
  "resourceType": "AllergyIntolerance",
    'identifier': [{
      'use': 'oficial',
      'value': ''
    }],
    'clinicalStatus': 'active',
    'verificationStatus': 'confirmed',
    'type': 'allergy',
    'category': ['food'],
    'code': null,
    'patient': null
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
      data.allergy = Session.get('allergyIntoleranceUpsert');
    } else {
      if (Session.get('selectedAllergyIntolerance')) {
        data.allergyIntoleranceId = Session.get('selectedAllergyIntolerance');
        console.log("selectedAllergyIntolerance", Session.get('selectedAllergyIntolerance'));

        let selectedAllergyIntolerance = AllergyIntolerances.findOne({_id: Session.get('selectedAllergyIntolerance')});
        console.log("selectedAllergyIntolerance", selectedAllergyIntolerance);

        if (selectedAllergyIntolerance) {
          data.allergy = selectedAllergyIntolerance;
        }
      } else {
        data.allergy = defaultAllergyIntolerance;
      }

    }

    return data;
  }

  render() {
    return (
      <div id={this.props.id} className="allergyIntoleranceDetail">
        <CardText>
          <TextField
            id='identifierInput'
            ref='identifier'
            name='identifier'
            floatingLabelText='Identifier'            
            value={ get(this, 'data.allergy.identifier[0].value') ? get(this, 'data.allergy.identifier[0].value'): ''}
            onChange={ this.changeState.bind(this, 'identifier')}
            fullWidth
            /><br/>

            <TextField
            id='clinicalStatusInput'
            ref='clinicalStatus'
            name='clinicalStatus'
            floatingLabelText='Clinical Status'
            value={ get(this, 'data.allergy.clinicalStatus') ? get(this, 'data.allergy.clinicalStatus'): ''}
            onChange={ this.changeState.bind(this, 'clinicalStatus')}
            fullWidth
            /><br/>

            <TextField
            id='verificationStatusInput'
            ref='verificationStatus'
            name='verificationStatus'
            floatingLabelText='Verification Status'
            value={ get(this, 'data.allergy.verificationStatus') ? get(this, 'data.allergy.verificationStatus'): ''}
            onChange={ this.changeState.bind(this, 'verificationStatus')}
            fullWidth
            /><br/>            

          <TextField
            id='typeInput'
            ref='type'
            name='type'
            floatingLabelText='Type'
            value={ get(this, 'data.allergy.type') ? get(this, 'data.allergy.type'): ''}
            onChange={ this.changeState.bind(this, 'type')}
            fullWidth
            /><br/>

          <TextField
            id='categoryInput'
            ref='category'
            name='category'
            floatingLabelText='Category'
            value={ get(this, 'data.allergy.category') ? get(this, 'data.allergy.category'): ''}
            onChange={ this.changeState.bind(this, 'category')}
            fullWidth
            /><br/>

          <TextField
            id='patientDisplayInput'
            ref='patientDisplay'
            name='patientDisplay'
            floatingLabelText='Patient'
            value={ get(this, 'data.allergy.patient.display')  ? get(this, 'data.allergy.patient.display')  : ''}
            onChange={ this.changeState.bind(this, 'patientDisplay')}
            fullWidth
            /><br/>

        </CardText>
        <CardActions>
          { this.determineButtons(this.data.allergyIntoleranceId ) }
        </CardActions>
      </div>
    );
  }


  determineButtons(allergyId){
    if (allergyId) {
      return (
        <div>
          <RaisedButton id="saveAllergyIntoleranceButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} style={{marginRight: '20px'}} />
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
    let allergyUpdate;

    if(process.env.NODE_ENV === "test") console.log("AllergyIntoleranceDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new allergy
    if (Session.get('allergyIntoleranceUpsert')) {
      allergyUpdate = Session.get('allergyIntoleranceUpsert');
    } else {
      allergyUpdate = defaultAllergyIntolerance;
    }



    // if there's an existing allergy, use them
    if (Session.get('selectedAllergyIntolerance')) {
      allergyUpdate = this.data.allergy;
    }

    switch (field) {
      case "identifier":
        allergyUpdate.identifier = [{
          use: 'official',
          value: value
        }];
        break;
      case "verificationStatus":
        allergyUpdate.verificationStatus = value;
        break;
      case "clinicalStatus":
        allergyUpdate.clinicalStatus = value;
        break;
      case "type":
        allergyUpdate.type = value;
        break;
      case "category":
        allergyUpdate.category = [value];
        break;
      case "patientDisplay":
        allergyUpdate.patient = {
          display: value
        }
        break;
      default:

    }

    if(process.env.NODE_ENV === "test") console.log("allergyUpdate", allergyUpdate);
    Session.set('allergyIntoleranceUpsert', allergyUpdate);
  }

  handleSaveButton(){
    let allergyIntoleranceUpdate = Session.get('allergyIntoleranceUpsert');

    if(process.env.NODE_ENV === "test") console.log("allergyIntoleranceUpdate", allergyIntoleranceUpdate);


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
    AllergyIntolerances.remove({_id: Session.get('selectedAllergyIntolerance')}, function(error, result){
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
