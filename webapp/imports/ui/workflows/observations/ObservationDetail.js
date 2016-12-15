import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { CardText, CardActions } from 'material-ui/Card';

import { insertObservation, updateObservation, removeObservationById } from '../../../api/observations/methods';
import { Bert } from 'meteor/themeteorchef:bert';


let defaultState = false;

Session.setDefault('observationDetailState', defaultState);


export default class ObservationDetail extends React.Component {
  getMeteorData() {
    let data = {
      observationId: false,
      observation: {
        observationType: '',
        observationValue: '',
        observationUnits: '',
        observationStatus: '',
        patientId: ''
      }
    };

    if (Session.get('selectedObservation')) {
      data.observationId = Session.get('selectedObservation');

      let selectedObservation = Observations.findOne({
        _id: Session.get('selectedObservation')
      });
      if (selectedObservation) {
        data.observation = {
          id: selectedObservation._id,
          observationType: selectedObservation.observationType,
          observationValue: selectedObservation.observationValue,
          observationUnits: selectedObservation.observationUnits,
          observationStatus: selectedObservation.observationStatus,
          patientId: selectedObservation.patientId
        };
      }
    }

    if (Session.get('observationDetailState')) {
      data.observation = Session.get('observationDetailState');
    }

    //console.log("data", data);

    return data;
  }

  render() {
    if (this.data.observation.patientid) {
      if (process.env.NODE_ENV === "test") console.log("In observationDetail with patientid " + this.data.observation.patientid);

      return (
        <div className="observationDetail">
          <CardText>
            <TextField
              id='patientIdInput'
              ref='patientid'
              name='patientid'
              floatingLabelText='patientid'
              defaultValue={this.data.observation.patientid}
              onChange={ this.changeState.bind(this, 'patientid')}
              fullWidth
              /><br/>
            <TextField
              id='typeInput'
              ref='type'
              name='type'
              floatingLabelText='type'
              defaultValue={this.data.observation.type}
              onChange={ this.changeState.bind(this, 'type')}
              fullWidth
              /><br/>
            <TextField
              id='valueInput'
              ref='value'
              name='value'
              floatingLabelText='value'
              defaultValue={this.data.observation.value}
              onChange={ this.changeState.bind(this, 'value')}
              fullWidth
              /><br/>
            <TextField
              id='unitsInput'
              ref='units'
              name='units'
              floatingLabelText='units'
              defaultValue={this.data.observation.units}
              onChange={ this.changeState.bind(this, 'units')}
              fullWidth
              /><br/>
            <TextField
              id='statusInput'
              ref='status'
              name='status'
              floatingLabelText='status'
              defaultValue={this.data.observation.status}
              onChange={ this.changeState.bind(this, 'status')}
              fullWidth
              /><br/>
            <TextField
              id='sourceInput'
              ref='source'
              name='source'
              floatingLabelText='source'
              defaultValue={this.data.observation.source}
              onChange={ this.changeState.bind(this, 'source')}
              fullWidth
              /><br/>

          </CardText>
          <CardActions>
            { this.determineButtons(this.data.observationId) }
          </CardActions>
        </div>
      );
    } else {
      return (
        <div className="observatonDetail">
          <CardText>
            No observations
          </CardText>
        </div>
      );
    }
  }
  determineButtons(observationId) {
    if (observationId) {
      return (
        <div>
          <RaisedButton label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
          <RaisedButton label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return (
        <RaisedButton label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }

  // this could be a mixin
  changeState(field, value) {

    //console.log("changeState", value);

    // by default, assume there's no other data and we're creating a new observation
    let observationUpdate = {
      id: "",
      observationType: "",
      observationValue: "",
      patientId: "",
    }

    // if there's an existing observation, use them
    if (Session.get('selectedObservation')) {
      observationUpdate = this.data.observation;
    }

    if (typeof Session.get('observationDetailState') === "object") {
      observationUpdate = Session.get('observationDetailState');
    }

    observationUpdate[field] = value;
    if (process.env.NODE_ENV === "test") console.log("observationUpdate", observationUpdate);
    Session.set('observationDetailState', observationUpdate);
  };
  openTab(index) {
    // set which tab is selected
    let state = Session.get('observationCardState');
    state["index"] = index;
    Session.set('observationCardState', state);
  };

  // this could be a mixin
  handleSaveButton() {
    if (process.env.NODE_ENV === "test") console.log("this", this);

    let observationFormData = {
      'observationType': [{
        'text': this.refs.type.refs.input.value
      }],
      'observationValue': [{
        'text': this.refs.value.refs.input.value
      }],
      'observationUnits': [{
        'text': this.refs.units.refs.input.value
      }],
      'observationStatus': [{
        'text': this.refs.status.refs.input.value
      }],
      'observationSource': [{
        'text': this.refs.source.refs.input.value
      }],
      'observationPatientId': [{
        'text': this.refs.patientid.refs.input.value
      }]
    }

    if (this.refs.active.refs.input.value === "true") {
      observationFormData.active = true;
    } else {
      observationFormData.active = false;
    }

    if (process.env.NODE_ENV === "test") console.log("observationFormData", observationFormData);


    if (Session.get('selectedObservation')) {
      if (process.env.NODE_ENV === "test") console.log("update practioner");
      //Meteor.users.insert(observationFormData);
      updateObservation.call({
        _id: Session.get('selectedObservation'),
        update: observationFormData
      }, (error) => {
        if (error) {
          if (process.env.NODE_ENV === "test") console.log("error", error);
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Observation updated!', 'success');
          this.openTab(1);
        }
      });
    } else {

      if (process.env.NODE_ENV === "test") console.log("create a new observation",
        observationFormData);

      //Meteor.users.insert(observationFormData);
      insertObservation.call(observationFormData, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Observation added!', 'success');
          this.openTab(1);
        }
      });
    }
  };

  // this could be a mixin
  handleCancelButton() {
    if (process.env.NODE_ENV === "test") console.log("handleCancelButton");
  }

  handleDeleteButton() {
    removeObservationById.call({
      _id: Session.get('selectedObservation')
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Observation deleted!', 'success');
        this.openTab(1);
      }
    });
  };

}


ObservationDetail.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(ObservationDetail.prototype, ReactMeteorData);
