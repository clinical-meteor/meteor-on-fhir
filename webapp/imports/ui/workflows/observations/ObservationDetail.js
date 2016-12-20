import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { CardText, CardActions } from 'material-ui/Card';
import { createObservation, updateObservation, removeObservation } from '/imports/api/observations/methods';
import { Bert } from 'meteor/themeteorchef:bert';


let defaultObservation = {
  status: 'preliminary',
  category: {
    text: ''
  },
  effectiveDateTime: '',
  subject: {
    display: '',
    reference: ''
  },
  performer: {
    display: '',
    reference: ''
  },
  device: {
    display: '',
    reference: ''
  },
  valueQuantity: {
    value: '',
    unit: '',
    system: 'http://unitsofmeasure.org'
  }
};
Session.setDefault('observationDetailState', defaultObservation);


export default class ObservationDetail extends React.Component {
  getMeteorData() {
    let data = {
      observationId: false,
      observation: defaultObservation
    };

    if (Session.get('selectedObservation')) {
      data.observationId = Session.get('selectedObservation');

      let selectedObservation = Observations.findOne({
        _id: Session.get('selectedObservation')
      });
      console.log("selectedObservation", selectedObservation);


      if (selectedObservation) {
        data.observation = selectedObservation;

        if (!Session.get('observationDetailState')) {
          Session.set('observationDetailState', selectedObservation);
        }
      }
    }

    if (Session.get('observationDetailState')) {
      data.observation = Session.get('observationDetailState');
    }

    if(process.env.NODE_ENV === "test") console.log("ObservationDetail[data]", data);
    return data;
  }

  render() {

    return (
      <div id={this.props.id} className="observationDetail">
        <CardText>
          <TextField
            id='categoryTextInput'
            ref='category.text'
            name='category.text'
            floatingLabelText='Category'
            value={this.data.observation.category.text}
            onChange={ this.changeCategory.bind(this, 'category.text')}
            fullWidth
            /><br/>
          <TextField
            id='valueQuantityInput'
            ref='valueQuantity.value'
            name='valueQuantity.value'
            floatingLabelText='Value'
            value={this.data.observation.valueQuantity.value}
            onChange={ this.changeQuantityValue.bind(this, 'valueQuantity.value')}
            fullWidth
            /><br/>
          <TextField
            id='valueQuantityUnitInput'
            ref='valueQuantity.unit'
            name='valueQuantity.unit'
            floatingLabelText='Unit'
            value={this.data.observation.valueQuantity.unit}
            onChange={ this.changeQuantityUnit.bind(this, 'valueQuantity.unit')}
            fullWidth
            /><br/>
          <TextField
            id='deviceDisplayInput'
            ref='device.display'
            name='device.display'
            floatingLabelText='Device Name'
            value={this.data.observation.device.display}
            onChange={ this.changeDeviceDisplay.bind(this, 'device.display')}
            fullWidth
            /><br/>
          <TextField
            id='subjectDisplayInput'
            ref='subject.display'
            name='subject.display'
            floatingLabelText='Subject Name'
            value={this.data.observation.subject.display}
            onChange={ this.changeSubjectDisplay.bind(this, 'subject.display')}
            fullWidth
            /><br/>
          <TextField
            id='subjectIdInput'
            ref='subject.reference'
            name='subject.reference'
            floatingLabelText='Subject ID'
            value={this.data.observation.subject.reference}
            onChange={ this.changeSubjectReference.bind(this, 'subject.reference')}
            fullWidth
            /><br/>

        </CardText>
        <CardActions>
          { this.determineButtons(this.data.observationId) }
        </CardActions>
      </div>
    );
  }
  determineButtons(observationId) {
    if (observationId) {
      return (
        <div>
          <RaisedButton id="saveObservationButton" label="Save" className="saveObservationButton" primary={true} onClick={this.handleSaveButton.bind(this)} />
          <RaisedButton id="deleteObservationButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return (
        <RaisedButton id="saveObservationButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }

  getObservation(){
    let observationUpdate = Session.get('observationDetailState');
    if (!observationUpdate) {
      observationUpdate = defaultObservation;
    }
  }

  changeCategory(field, event, value) {
    let observationUpdate = Session.get('observationDetailState');
    observationUpdate.category.text = value;
    Session.set('observationDetailState', observationUpdate);
  }
  changeQuantityValue(field, event, value) {
    let observationUpdate = Session.get('observationDetailState');
    observationUpdate.valueQuantity.value = value;
    Session.set('observationDetailState', observationUpdate);
  }
  changeQuantityUnit(field, event, value) {
    let observationUpdate = Session.get('observationDetailState');
    observationUpdate.valueQuantity.unit = value;
    Session.set('observationDetailState', observationUpdate);
  }
  changeDeviceDisplay(field, event, value) {
    let observationUpdate = Session.get('observationDetailState');
    observationUpdate.device.display = value;
    Session.set('observationDetailState', observationUpdate);
  }
  changeSubjectDisplay(field, event, value) {
    let observationUpdate = Session.get('observationDetailState');
    observationUpdate.subject.display = value;
    Session.set('observationDetailState', observationUpdate);
  }
  changeSubjectReference(field, event, value) {
    let observationUpdate = Session.get('observationDetailState');
    observationUpdate.subject.reference = value;
    Session.set('observationDetailState', observationUpdate);
  }


  openTab(index) {
    // set which tab is selected
    let state = Session.get('observationCardState');
    state["index"] = index;
    Session.set('observationCardState', state);
  }

  // this could be a mixin
  handleSaveButton() {
    if (process.env.NODE_ENV === "test") console.log("this", this);

    let observationFormData = Session.get('observationDetailState');
    observationFormData.valueQuantity.value = Number(observationFormData.valueQuantity.value);

    console.log("observationFormData", observationFormData);

    if (Session.get('selectedObservation')) {


      Observations.update({_id: Session.get('selectedObservation')}, {$set: observationFormData }, function(error, result){
        if (error) {
          if(process.env.NODE_ENV === "test") console.log("Observations.insert[error]", error);
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Observation added!', 'success');
          Session.set('observationFormData', defaultObservation);
          Session.set('observationDetailState', defaultObservation);
          Session.set('observationPageTabIndex', 1);
        }
      });

      // updateObservation.call({
      //   _id: Session.get('selectedObservation'),
      //   update: observationFormData
      // }, function(error, result){
      //   if (error) {
      //     if (process.env.NODE_ENV === "test") console.log("error", error);
      //     Bert.alert(error.reason, 'danger');
      //   } else {
      //     Bert.alert('Observation updated!', 'success');
      //     Session.set('observationFormData', defaultObservation);
      //     Session.set('observationDetailState', defaultObservation);
      //     Session.set('observationPageTabIndex', 1);
      //   }
      //   if (result) {
      //     console.log("result", result);
      //   }
      // });


    } else {

      observationFormData.effectiveDateTime = new Date();
      if (process.env.NODE_ENV === "test") console.log("create a new observation", observationFormData);

      Observations.insert(observationFormData, function(error, result){
        if (error) {
          if(process.env.NODE_ENV === "test") console.log("Observations.insert[error]", error);
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Observation added!', 'success');
          Session.set('observationFormData', defaultObservation);
          Session.set('observationDetailState', defaultObservation);
          Session.set('observationPageTabIndex', 1);
        }
      });

      // createObservation.call(observationFormData, function(error, result) {
      //   if (error) {
      //     Bert.alert(error.reason, 'danger');
      //   } else {
      //     Bert.alert('Observation added!', 'success');
      //     Session.set('observationFormData', defaultObservation);
      //     Session.set('observationDetailState', defaultObservation);
      //     Session.set('observationPageTabIndex', 1);
      //   }
      //   if (result) {
      //     console.log("result", result);
      //   }
      // });
    }
  }

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
  }
}


ObservationDetail.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(ObservationDetail.prototype, ReactMeteorData);
