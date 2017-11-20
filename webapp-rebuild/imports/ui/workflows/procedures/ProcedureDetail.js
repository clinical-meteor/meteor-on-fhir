import { CardActions, CardText } from 'material-ui/Card';

import { Bert } from 'meteor/themeteorchef:bert';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';
import { browserHistory } from 'react-router';
import { get } from 'lodash';
import PropTypes from 'prop-types';

let defaultProcedure = {
  'resourceType': 'Procedure',
  'status': 'unknown',
  'identifier': [{
    'use': 'official',
    'value': ''
  }],
  'code': {
    'text': ''
  }
};



Session.setDefault('procedureUpsert', false);
Session.setDefault('selectedProcedure', false);


export default class ProcedureDetail extends React.Component {
  getMeteorData() {
    let data = {
      procedureId: false,
      procedure: defaultProcedure,
      showDatePicker: false
    };

    if(this.props.showDatePicker){
      data.showDatePicker = this.props.showDatePicker
    }

    if (Session.get('procedureUpsert')) {
      data.procedure = Session.get('procedureUpsert');
    } else {
      // if (Session.get('selectedProcedure')) {
      //   data.procedureId = Session.get('selectedProcedure');
        console.log("selectedProcedure", Session.get('selectedProcedure'));

        let selectedProcedure = Procedures.findOne({_id: Session.get('selectedProcedure')});
        console.log("selectedProcedure", selectedProcedure);

        if (selectedProcedure) {
          data.procedure = selectedProcedure;
        }
      // } else {
      //   data.procedure = defaultProcedure;
      // }
    }

    if (Session.get('selectedProcedure')) {
      data.procedureId = Session.get('selectedProcedure');
    }      

    return data;
  }

  renderDatePicker(showDatePicker, datePickerValue){
    if (showDatePicker) {
      return (
        <DatePicker 
          name='performedDateTime'
          hintText="Performed Date/Time" 
          container="inline" 
          mode="landscape"
          value={ datePickerValue ? datePickerValue : ''}    
          onChange={ this.changeState.bind(this, 'performedDateTime')}      
          />
      );
    }
  }

  render() {
    return (
      <div id={this.props.id} className="procedureDetail">
        <CardText>
        <TextField
            id='identifierInput'
            ref='identifier'
            name='identifier'
            floatingLabelText='Identifier'
            value={ get(this, 'data.procedure.identifier[0].value') ? get(this, 'data.procedure.identifier[0].value') : ''}
            onChange={ this.changeState.bind(this, 'identifier')}
            fullWidth
            /><br/>
          <TextField
            id='codeInput'
            ref='code'
            name='code'
            floatingLabelText='Code'
            value={this.data.procedure.code ? this.data.procedure.code.text : ''}
            onChange={ this.changeState.bind(this, 'code')}
            fullWidth
            /><br/>
          <TextField
            id='statusInput'
            ref='status'
            name='status'
            floatingLabelText='Status'
            value={this.data.procedure.status ? this.data.procedure.status : ''}
            onChange={ this.changeState.bind(this, 'status')}
            fullWidth
            /><br/>


            <br/>
          { this.renderDatePicker(this.data.showDatePicker, get(this, 'data.procedure.performedDateTime') ) }
          <br/>

        </CardText>
        <CardActions>
          { this.determineButtons(this.data.procedureId) }
        </CardActions>
      </div>
    );
  }


  addToContinuityOfCareDoc(){
    console.log('addToContinuityOfCareDoc', Session.get('procedureUpsert'));

    var procedureUpsert = Session.get('procedureUpsert');

    var newProcedure = {
      'resourceType': 'Procedure',
      'status': procedureUpsert.status,
      'identifier': procedureUpsert.identifier,
      'code': {
        'text': procedureUpsert.code.text
      },
      'performedDateTime': procedureUpsert.performedDateTime  
    }

    console.log('Lets write this to the profile... ', newProcedure);

    Meteor.users.update({_id: Meteor.userId()}, {$addToSet: {
      'profile.continuityOfCare.procedures': newProcedure
    }}, function(error, result){
      if(error){
        console.log('error', error);
      }
      if(result){
        browserHistory.push('/continuity-of-care');
      }
    });
  }
  determineButtons(procedureId){
    if (procedureId) {
      return (
        <div>
          <RaisedButton id="saveProcedureButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} style={{marginRight: '20px'}}  />
          <RaisedButton id="deleteProcedureButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />

          <RaisedButton id="addProcedureToContinuityCareDoc" label="Add to CCD" primary={true} onClick={this.addToContinuityOfCareDoc.bind(this)} style={{float: 'right'}} />
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
      case "identifier":
        procedureUpdate.identifier = [{
          use: 'official',
          value: value
        }];
        break;
      case "code":
        procedureUpdate.code.text = value;
        break;
      case "status":
        procedureUpdate.status = value;
        break;
      case "performedDateTime":
        procedureUpdate.performedDateTime = value;
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
  hasUser: PropTypes.object
};
ReactMixin(ProcedureDetail.prototype, ReactMeteorData);