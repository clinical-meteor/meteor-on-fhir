import { CardActions, CardText } from 'material-ui/Card';

import { Bert } from 'meteor/themeteorchef:bert';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';
import { get } from 'lodash';

let defaultImmunization = {
  "resourceType": "Immunization",
  'notGiven': true,
  'identifier': [{
    'use': 'official',
    'type': {
      'text': ''
    }
  }, {
    'use': 'secondary',
    'type': {
      'text': ''
    }
  }],
  'vaccineCode': {
    'text': ''
  }    
};
let defaultImmunizationForm = {
  'identifier': '',
  'vaccine': '',
  'vaccineCode': ''
}


Session.setDefault('immunizationUpsert', false);
Session.setDefault('selectedImmunization', false);


export default class ImmunizationDetail extends React.Component {
  getMeteorData() {
    let data = {
      immunizationId: false,
      immunization: defaultImmunization,
      immunizationForm: defaultImmunizationForm
    };

    if (Session.get('immunizationUpsert')) {
      // data.immunization = Session.get('immunizationUpsert');
      data.immunizationForm = Session.get('immunizationUpsert');
    } else {
      if (Session.get('selectedImmunization')) {
        data.immunizationId = Session.get('selectedImmunization');
        console.log("selectedImmunization", Session.get('selectedImmunization'));

        let selectedImmunization = Immunizations.findOne({_id: Session.get('selectedImmunization')});
        console.log("selectedImmunization", selectedImmunization);

        if (selectedImmunization) {
          data.immunization = selectedImmunization;

          var immunizationForm = defaultImmunizationForm;
          selectedImmunization.identifier.forEach(function(identifier){
            if(identifier.use == 'official'){
              immunizationForm.identifier = identifier.type.text;
            } 
            if(identifier.use == 'secondary'){
              immunizationForm.vaccine = identifier.type.text;              
            } 
          });
          immunizationForm.vaccineCode = selectedImmunization.vaccineCode.text;
          data.immunizationForm = immunizationForm
        }
      } else {
        // data.immunization = defaultImmunization;
        data.immunizationForm = defaultImmunizationForm;
      }

    }

    return data;
  }

  render() {
    return (
      <div id={this.props.id} className="immunizationDetail">
        <CardText>
          <TextField
            id='identifierInput'
            ref='identifier'
            name='identifier'
            floatingLabelText='Identifier'
            value={ get(this, 'data.immunizationForm.identifier') ? get(this, 'data.immunizationForm.identifier') : ''}
            onChange={ this.changeState.bind(this, 'identifier')}
            fullWidth
            /><br/>
          <TextField
            id='vaccineInput'
            ref='vaccine'
            name='vaccine'
            floatingLabelText='Vaccine'
            value={ get(this, 'data.immunizationForm.vaccine') ? get(this, 'data.immunizationForm.vaccine') : ''}
            onChange={ this.changeState.bind(this, 'vaccine')}
            fullWidth4
            /><br/>
          <TextField
            id='vaccineCodeInput'
            ref='vaccineCode'
            name='vaccineCode'
            floatingLabelText='Vaccine Code'
            value={ get(this, 'data.immunizationForm.vaccineCode') ? get(this, 'data.immunizationForm.vaccineCode') : ''}
            onChange={ this.changeState.bind(this, 'vaccineCode')}
            fullWidth
            /><br/>




        </CardText>
        <CardActions>
          { this.determineButtons(this.data.immunizationId) }
        </CardActions>
      </div>
    );
  }


  determineButtons(immunizationId){
    if (immunizationId) {
      return (
        <div>
          <RaisedButton id="saveImmunizationButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
          <RaisedButton id="deleteImmunizationButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveImmunizationButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }



  // this could be a mixin
  changeState(field, event, value){
    let immunizationUpdate;

    if(process.env.NODE_ENV === "test") console.log("ImmunizationDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new immunization
    if (Session.get('immunizationUpsert')) {
      immunizationUpdate = Session.get('immunizationUpsert');
    } else {
      immunizationUpdate = defaultImmunizationForm;
    }



    // if there's an existing immunization, use them
    if (Session.get('selectedImmunization')) {
      immunizationUpdate = this.data.immunizationForm;
    }

    switch (field) {
      case "identifier":
        immunizationUpdate.identifier = value;
        break;
      case "vaccine":
        immunizationUpdate.vaccine = value;
        break;
      case "vaccineCode":
        immunizationUpdate.vaccineCode = value;
        break;
      default:

    }

    if(process.env.NODE_ENV === "test") console.log("immunizationUpdate", immunizationUpdate);
    Session.set('immunizationUpsert', immunizationUpdate);
  }

  handleSaveButton(){
    let immunizationUpdate = Session.get('immunizationUpsert', immunizationUpdate);

    if(process.env.NODE_ENV === "test") console.log("immunizationUpdate", immunizationUpdate);


    if (Session.get('selectedImmunization')) {
      if(process.env.NODE_ENV === "test") console.log("Updating immunization...");
      //delete immunizationUpdate._id;

      // not sure why we're having to respecify this; fix for a bug elsewhere
      //immunizationUpdate.resourceType = 'Immunization';     
      
      var currentImmunization = Immunizations.findOne({_id: Session.get('selectedImmunization')});
      delete currentImmunization._id;     
      delete currentImmunization._document;     
      currentImmunization.resourceType = 'Immunization';     
      currentImmunization.identifier = [];
      currentImmunization.identifier.push({
        'use': 'official',
        'type': {
          'text': immunizationUpdate.identifier
        }
      });
      currentImmunization.identifier.push({
        'use': 'secondary',
        'type': {
          'text': immunizationUpdate.vaccine
        }
      });
      currentImmunization.vaccineCode.text = immunizationUpdate.vaccineCode;

      Immunizations.update(
        {_id: Session.get('selectedImmunization')}, {$set: currentImmunization }, function(error, result) {
          if (error) {
            console.log("error", error);

            Bert.alert(error.reason, 'danger');
          }
          if (result) {
            HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Immunizations", recordId: Session.get('selectedImmunization')});
            Session.set('immunizationPageTabIndex', 1);
            Session.set('selectedImmunization', false);
            Session.set('immunizationUpsert', false);
            Bert.alert('Immunization updated!', 'success');
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new immunization", immunizationUpdate);

      var newImmunization = {
        "resourceType": "Immunization",
        'notGiven': true,
        'identifier': [],
        'vaccineCode': {
          'text': immunizationUpdate.vaccineCode
        }
      };

      newImmunization.identifier.push({
        'use': 'official',
        'type': {
          'text': immunizationUpdate.identifier
        }
      });
      newImmunization.identifier.push({
        'use': 'secondary',
        'type': {
          'text': immunizationUpdate.vaccine
        }
      });

      Immunizations.insert(newImmunization, function(error, result) {
        if (error) {
          console.log("error", error);
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Immunizations", recordId: result});
          Session.set('immunizationPageTabIndex', 1);
          Session.set('selectedImmunization', false);
          Session.set('immunizationUpsert', false);
          Bert.alert('Immunization added!', 'success');
        }
      });
    }
  }

  handleCancelButton(){
    Session.set('immunizationPageTabIndex', 1);
  }

  handleDeleteButton(){
    Immunization.remove({_id: Session.get('selectedImmunization')}, function(error, result){
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Immunizations", recordId: Session.get('selectedImmunization')});
        Session.set('immunizationPageTabIndex', 1);
        Session.set('selectedImmunization', false);
        Session.set('immunizationUpsert', false);
        Bert.alert('Immunization removed!', 'success');
      }
    });
  }
}


ImmunizationDetail.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(ImmunizationDetail.prototype, ReactMeteorData);
