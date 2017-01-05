import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Bert } from 'meteor/themeteorchef:bert';

import { CardText, CardActions } from 'material-ui/Card';

let defaultRiskAssessment = {
  resourceType: "RiskAssessment",
  subject: {
    display: "",
    reference: ""
  },
  text: "",
  date: null,
  "condition": {
    "reference": "",
    "display": ""
  },
  encounter: {},
  performer: {
    display: "",
    reference: ""
  },
  basis:[{
    display: "",
    reference: ""
  }],
  prediction: [{
    title: "",
    outcome: {
      text: ""
    },
    probabilityDecimal: 0,
    rational: ""
  }],
  mitigation: ""
};

Session.setDefault('riskAssessmentUpsert', false);
Session.setDefault('selectedRiskAssessment', false);


export default class RiskAssessmentDetail extends React.Component {
  getMeteorData() {
    let data = {
      riskAssessmentId: false,
      riskAssessment: defaultRiskAssessment
    };

    if (Session.get('riskAssessmentUpsert')) {
      data.riskAssessment = Session.get('riskAssessmentUpsert');
    } else {
      if (Session.get('selectedRiskAssessment')) {
        data.riskAssessmentId = Session.get('selectedRiskAssessment');
        console.log("selectedRiskAssessment", Session.get('selectedRiskAssessment'));

        let selectedRiskAssessment = RiskAssessments.findOne({_id: Session.get('selectedRiskAssessment')});
        console.log("selectedRiskAssessment", selectedRiskAssessment);

        if (selectedRiskAssessment) {
          data.riskAssessment = selectedRiskAssessment;
        }
      } else {
        data.riskAssessment = defaultRiskAssessment;
      }

    }

    return data;
  }

  render() {
    return (
      <div id={this.props.id} className="riskAssessmentDetail">
        <CardText>
          <TextField
            id='subjectDisplayInput'
            ref='subjectDisplay'
            name='subjectDisplay'
            floatingLabelText='Subject'
            value={this.data.riskAssessment.subject ? this.data.riskAssessment.subject.display : ''}
            onChange={ this.changeState.bind(this, 'subjectDisplay')}
            fullWidth
            /><br/>
          <TextField
            id='conditionDisplayInput'
            ref='conditionDisplay'
            name='conditionDisplay'
            floatingLabelText='Condition'
            value={this.data.riskAssessment.condition ? this.data.riskAssessment.condition.display : ''}
            onChange={ this.changeState.bind(this, 'conditionDisplay')}
            fullWidth
            /><br/>
          <TextField
            id='performerDisplayInput'
            ref='performerDisplay'
            name='performerDisplay'
            floatingLabelText='Performer'
            value={this.data.riskAssessment.performer ? this.data.riskAssessment.performer.display : ''}
            onChange={ this.changeState.bind(this, 'performerDisplay')}
            fullWidth
            /><br/>
          <TextField
            id='predictionOutcomeInput'
            ref='predictionOutcome'
            name='predictionOutcome'
            floatingLabelText='Performer'
            value={this.data.riskAssessment.prediction[0] ? this.data.riskAssessment.prediction[0].outcome.text : ''}
            onChange={ this.changeState.bind(this, 'predictionOutcome')}
            fullWidth
            /><br/>
          <TextField
            id='probabilityDecimalInput'
            ref='probabilityDecimal'
            name='probabilityDecimal'
            floatingLabelText='Performer'
            value={this.data.riskAssessment.prediction[0] ? this.data.riskAssessment.prediction[0].probabilityDecimal : ''}
            onChange={ this.changeState.bind(this, 'probabilityDecimal')}
            fullWidth
            /><br/>
        </CardText>
        <CardActions>
          { this.determineButtons(this.data.riskAssessmentId) }
        </CardActions>
      </div>
    );
  }


  determineButtons(riskAssessmentId){
    if (riskAssessmentId) {
      return (
        <div>
          <RaisedButton id="saveRiskAssessmentButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
          <RaisedButton id="deleteRiskAssessmentButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveRiskAssessmentButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }



  // this could be a mixin
  changeState(field, event, value){
    let riskAssessmentUpdate;

    if(process.env.NODE_ENV === "test") console.log("RiskAssessmentDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new riskAssessment
    if (Session.get('riskAssessmentUpsert')) {
      riskAssessmentUpdate = Session.get('riskAssessmentUpsert');
    } else {
      riskAssessmentUpdate = defaultRiskAssessment;
    }



    // if there's an existing riskAssessment, use them
    if (Session.get('selectedRiskAssessment')) {
      riskAssessmentUpdate = this.data.riskAssessment;
    }

    switch (field) {
      case "subjectDisplay":
        riskAssessmentUpdate.subject.display = value;
        break;
      case "conditionDisplay":
        riskAssessmentUpdate.condition.display = value;
        break;
      case "performerDisplay":
        riskAssessmentUpdate.performer.display = value;
        break;
      case "predictionOutcome":
        riskAssessmentUpdate.prediction[0].outcome.text = value;
        break;
      case "probabilityDecimal":
        riskAssessmentUpdate.prediction[0].probabilityDecimal = value;
        break;
      default:

    }

    if(process.env.NODE_ENV === "test") console.log("riskAssessmentUpdate", riskAssessmentUpdate);
    Session.set('riskAssessmentUpsert', riskAssessmentUpdate);
  }

  handleSaveButton(){
    let riskAssessmentUpdate = Session.get('riskAssessmentUpsert', riskAssessmentUpdate);

    if(process.env.NODE_ENV === "test") console.log("riskAssessmentUpdate", riskAssessmentUpdate);


    if (Session.get('selectedRiskAssessment')) {
      if(process.env.NODE_ENV === "test") console.log("Updating riskAssessment...");
      delete riskAssessmentUpdate._id;

      // not sure why we're having to respecify this; fix for a bug elsewhere
      riskAssessmentUpdate.resourceType = 'RiskAssessment';

      RiskAssessments.update(
        {_id: Session.get('selectedRiskAssessment')}, {$set: riskAssessmentUpdate }, function(error, result) {
          if (error) {
            console.log("error", error);

            Bert.alert(error.reason, 'danger');
          }
          if (result) {
            HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "RiskAssessments", recordId: Session.get('selectedRiskAssessment')});
            Session.set('riskAssessmentPageTabIndex', 1);
            Session.set('selectedRiskAssessment', false);
            Session.set('riskAssessmentUpsert', false);
            Bert.alert('RiskAssessment updated!', 'success');
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new riskAssessment", riskAssessmentUpdate);

      RiskAssessments.insert(riskAssessmentUpdate, function(error, result) {
        if (error) {
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "RiskAssessments", recordId: result});
          Session.set('riskAssessmentPageTabIndex', 1);
          Session.set('selectedRiskAssessment', false);
          Session.set('riskAssessmentUpsert', false);
          Bert.alert('RiskAssessment added!', 'success');
        }
      });
    }
  }

  handleCancelButton(){
    Session.set('riskAssessmentPageTabIndex', 1);
  }

  handleDeleteButton(){
    RiskAssessment.remove({_id: Session.get('selectedRiskAssessment')}, function(error, result){
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "RiskAssessments", recordId: Session.get('selectedRiskAssessment')});
        Session.set('riskAssessmentPageTabIndex', 1);
        Session.set('selectedRiskAssessment', false);
        Session.set('riskAssessmentUpsert', false);
        Bert.alert('RiskAssessment removed!', 'success');
      }
    });
  }
}


RiskAssessmentDetail.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(RiskAssessmentDetail.prototype, ReactMeteorData);
