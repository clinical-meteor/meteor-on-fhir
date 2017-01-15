import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Bert } from 'meteor/themeteorchef:bert';

import { CardText, CardActions } from 'material-ui/Card';

let defaultCondition = {
  "resourceType": "Condition",
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



Session.setDefault('conditionUpsert', false);
Session.setDefault('selectedCondition', false);


export default class ConditionDetail extends React.Component {
  getMeteorData() {
    let data = {
      conditionId: false,
      condition: defaultCondition
    };

    if (Session.get('conditionUpsert')) {
      data.condition = Session.get('conditionUpsert');
    } else {
      if (Session.get('selectedCondition')) {
        data.conditionId = Session.get('selectedCondition');
        console.log("selectedCondition", Session.get('selectedCondition'));

        let selectedCondition = Conditions.findOne({_id: Session.get('selectedCondition')});
        console.log("selectedCondition", selectedCondition);

        if (selectedCondition) {
          data.condition = selectedCondition;
        }
      } else {
        data.condition = defaultCondition;
      }

    }

    return data;
  }

  render() {
    return (
      <div id={this.props.id} className="conditionDetail">
        <CardText>
          <TextField
            id='patientDisplayInput'
            ref='patientDisplay'
            name='patientDisplay'
            floatingLabelText='Patient'
            value={this.data.condition.patient ? this.data.condition.patient.display : ''}
            onChange={ this.changeState.bind(this, 'patientDisplay')}
            fullWidth
            /><br/>
          <TextField
            id='asserterDisplayInput'
            ref='asserterDisplay'
            name='asserterDisplay'
            floatingLabelText='Asserter'
            value={this.data.condition.asserter ? this.data.condition.asserter.display : ''}
            onChange={ this.changeState.bind(this, 'asserterDisplay')}
            fullWidth
            /><br/>
          <TextField
            id='clinicalStatusInput'
            ref='clinicalStatus'
            name='clinicalStatus'
            floatingLabelText='Clinical Status'
            value={this.data.condition.clinicalStatus ? this.data.condition.clinicalStatus : ''}
            onChange={ this.changeState.bind(this, 'clinicalStatus')}
            fullWidth
            /><br/>
          <TextField
            id='snomedCodeInput'
            ref='snomedCode'
            name='snomedCode'
            floatingLabelText='SNOMED Code'
            value={this.data.condition.code.coding[0] ? this.data.condition.code.coding[0].code : ''}
            onChange={ this.changeState.bind(this, 'snomedCode')}
            fullWidth
            /><br/>
          <TextField
            id='snomedDisplayInput'
            ref='snomedDisplay'
            name='snomedDisplay'
            floatingLabelText='SNOMED Display'
            value={this.data.condition.code.coding[0] ? this.data.condition.code.coding[0].display : ''}
            onChange={ this.changeState.bind(this, 'snomedDisplay')}
            fullWidth
            /><br/>
          <TextField
            id='evidenceDisplayInput'
            ref='evidenceDisplay'
            name='evidenceDisplay'
            floatingLabelText='Evidence (Observation)'
            value={this.data.condition.evidence[0].detail[0] ? this.data.condition.evidence[0].detail[0].display : ''}
            onChange={ this.changeState.bind(this, 'evidenceDisplay')}
            fullWidth
            /><br/>




        </CardText>
        <CardActions>
          { this.determineButtons(this.data.conditionId) }
        </CardActions>
      </div>
    );
  }


  determineButtons(conditionId){
    if (conditionId) {
      return (
        <div>
          <RaisedButton id="saveConditionButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
          <RaisedButton id="deleteConditionButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveConditionButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }



  // this could be a mixin
  changeState(field, event, value){
    let conditionUpdate;

    if(process.env.NODE_ENV === "test") console.log("ConditionDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new condition
    if (Session.get('conditionUpsert')) {
      conditionUpdate = Session.get('conditionUpsert');
    } else {
      conditionUpdate = defaultCondition;
    }



    // if there's an existing condition, use them
    if (Session.get('selectedCondition')) {
      conditionUpdate = this.data.condition;
    }

    switch (field) {
      case "patientDisplay":
        conditionUpdate.patient.display = value;
        break;
      case "asserterDisplay":
        conditionUpdate.asserter.display = value;
        break;
      case "clinicalStatus":
        conditionUpdate.clinicalStatus = value;
        break;
      case "snomedCode":
        conditionUpdate.code.coding[0].code = value;
        break;
      case "snomedDisplay":
        conditionUpdate.code.coding[0].display = value;
        break;
      case "evidenceDisplay":
        conditionUpdate.evidence[0].detail[0].display = value;
        break;
      default:

    }

    if(process.env.NODE_ENV === "test") console.log("conditionUpdate", conditionUpdate);
    Session.set('conditionUpsert', conditionUpdate);
  }

  handleSaveButton(){
    let conditionUpdate = Session.get('conditionUpsert', conditionUpdate);

    if(process.env.NODE_ENV === "test") console.log("conditionUpdate", conditionUpdate);


    if (Session.get('selectedCondition')) {
      if(process.env.NODE_ENV === "test") console.log("Updating condition...");
      delete conditionUpdate._id;

      // not sure why we're having to respecify this; fix for a bug elsewhere
      conditionUpdate.resourceType = 'Condition';

      Conditions.update(
        {_id: Session.get('selectedCondition')}, {$set: conditionUpdate }, function(error, result) {
          if (error) {
            console.log("error", error);

            Bert.alert(error.reason, 'danger');
          }
          if (result) {
            HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Conditions", recordId: Session.get('selectedCondition')});
            Session.set('conditionPageTabIndex', 1);
            Session.set('selectedCondition', false);
            Session.set('conditionUpsert', false);
            Bert.alert('Condition updated!', 'success');
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new condition", conditionUpdate);

      Conditions.insert(conditionUpdate, function(error, result) {
        if (error) {
          console.log("error", error);
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Conditions", recordId: result});
          Session.set('conditionPageTabIndex', 1);
          Session.set('selectedCondition', false);
          Session.set('conditionUpsert', false);
          Bert.alert('Condition added!', 'success');
        }
      });
    }
  }

  handleCancelButton(){
    Session.set('conditionPageTabIndex', 1);
  }

  handleDeleteButton(){
    Condition.remove({_id: Session.get('selectedCondition')}, function(error, result){
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Conditions", recordId: Session.get('selectedCondition')});
        Session.set('conditionPageTabIndex', 1);
        Session.set('selectedCondition', false);
        Session.set('conditionUpsert', false);
        Bert.alert('Condition removed!', 'success');
      }
    });
  }
}


ConditionDetail.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(ConditionDetail.prototype, ReactMeteorData);
