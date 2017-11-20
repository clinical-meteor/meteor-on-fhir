import { CardActions, CardText } from 'material-ui/Card';

import { Bert } from 'meteor/themeteorchef:bert';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';
import { get } from 'lodash';
import PropTypes from 'prop-types';

let defaultGoal = {
  "resourceType": "Goal",
  'description': '',
  'priority': {
    'text': ''
  },
  'status': ''
};



Session.setDefault('goalUpsert', false);
Session.setDefault('selectedGoal', false);


export default class GoalDetail extends React.Component {
  getMeteorData() {
    let data = {
      goalId: false,
      goal: defaultGoal
    };

    if (Session.get('goalUpsert')) {
      data.goal = Session.get('goalUpsert');
    } else {
      if (Session.get('selectedGoal')) {
        data.goalId = Session.get('selectedGoal');
        console.log("selectedGoal", Session.get('selectedGoal'));

        let selectedGoal = Goals.findOne({_id: Session.get('selectedGoal')});
        console.log("selectedGoal", selectedGoal);

        if (selectedGoal) {
          data.goal = selectedGoal;
        }
      } else {
        data.goal = defaultGoal;
      }

    }

    return data;
  }

  render() {
    return (
      <div id={this.props.id} className="goalDetail">
        <CardText>
          <TextField
            id='descriptionInput'
            ref='description'
            name='description'
            floatingLabelText='Description'
            value={ get(this, 'data.goal.description') ? get(this, 'data.goal.description') : ''}
            onChange={ this.changeState.bind(this, 'description')}
            fullWidth
            /><br/>
          <TextField
            id='priorityInput'
            ref='priority'
            name='priority'
            floatingLabelText='Priority'
            value={ get(this, 'data.goal.priority.text') ? get(this, 'data.goal.priority.text') : ''}
            onChange={ this.changeState.bind(this, 'priority')}
            fullWidth
            /><br/>
          <TextField
            id='statusInput'
            ref='status'
            name='status'
            floatingLabelText='Status'
            value={ get(this, 'data.goal.status') ? get(this, 'data.goal.status') : ''}
            onChange={ this.changeState.bind(this, 'status')}
            fullWidth
            /><br/>




        </CardText>
        <CardActions>
          { this.determineButtons(this.data.goalId) }
        </CardActions>
      </div>
    );
  }


  determineButtons(goalId){
    if (goalId) {
      return (
        <div>
          <RaisedButton id="saveGoalButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} style={{marginRight: '20px'}} />
          <RaisedButton id="deleteGoalButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveGoalButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }



  // this could be a mixin
  changeState(field, event, value){
    let goalUpdate;

    if(process.env.NODE_ENV === "test") console.log("GoalDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new goal
    if (Session.get('goalUpsert')) {
      goalUpdate = Session.get('goalUpsert');
    } else {
      goalUpdate = defaultGoal;
    }



    // if there's an existing goal, use them
    if (Session.get('selectedGoal')) {
      goalUpdate = this.data.goal;
    }

    switch (field) {
      case "description":
        goalUpdate.description = value;
        break;
      case "priority":
        goalUpdate.priority.text = value;
        break;
      case "status":
        goalUpdate.status = value;
        break;

    }

    if(process.env.NODE_ENV === "test") console.log("goalUpdate", goalUpdate);
    Session.set('goalUpsert', goalUpdate);
  }

  handleSaveButton(){
    let goalUpdate = Session.get('goalUpsert', goalUpdate);

    if(process.env.NODE_ENV === "test") console.log("goalUpdate", goalUpdate);


    if (Session.get('selectedGoal')) {
      if(process.env.NODE_ENV === "test") console.log("Updating goal...");
      delete goalUpdate._id;

      // not sure why we're having to respecify this; fix for a bug elsewhere
      goalUpdate.resourceType = 'Goal';

      Goals.update(
        {_id: Session.get('selectedGoal')}, {$set: goalUpdate }, function(error, result) {
          if (error) {
            console.log("error", error);

            Bert.alert(error.reason, 'danger');
          }
          if (result) {
            HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Goals", recordId: Session.get('selectedGoal')});
            Session.set('goalPageTabIndex', 1);
            Session.set('selectedGoal', false);
            Session.set('goalUpsert', false);
            Bert.alert('Goal updated!', 'success');
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new goal", goalUpdate);

      Goals.insert(goalUpdate, function(error, result) {
        if (error) {
          console.log("error", error);
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Goals", recordId: result});
          Session.set('goalPageTabIndex', 1);
          Session.set('selectedGoal', false);
          Session.set('goalUpsert', false);
          Bert.alert('Goal added!', 'success');
        }
      });
    }
  }

  handleCancelButton(){
    Session.set('goalPageTabIndex', 1);
  }

  handleDeleteButton(){
    Goal.remove({_id: Session.get('selectedGoal')}, function(error, result){
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Goals", recordId: Session.get('selectedGoal')});
        Session.set('goalPageTabIndex', 1);
        Session.set('selectedGoal', false);
        Session.set('goalUpsert', false);
        Bert.alert('Goal removed!', 'success');
      }
    });
  }
}


GoalDetail.propTypes = {
  hasUser: PropTypes.object
};
ReactMixin(GoalDetail.prototype, ReactMeteorData);