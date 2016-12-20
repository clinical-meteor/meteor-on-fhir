import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { CardText, CardActions } from 'material-ui/Card';
import { insertPractitioner, updatePractitioner, removePractitionerById } from '../../../api/practitioners/methods';
import { Bert } from 'meteor/themeteorchef:bert';


let defaultPractitioner = {
  name: '',
  telecomValue: '',
  telecomUse: '',
  qualificationId: '',
  qualificationStart: '',
  qualificationEnd: '',
  issuer: ''
};

Session.setDefault('practitionerDetailState', defaultPractitioner);


export default class PractitionerDetail extends React.Component {
  getMeteorData() {
    let data = {
      practitionerId: false,
      practitioner: defaultPractitioner
    };

    if (Session.get('selectedPractitioner')) {
      data.practitionerId = Session.get('selectedPractitioner');

      let selectedPractitioner = Practitioners.findOne({_id: Session.get('selectedPractitioner')});
      console.log("selectedPractitioner", selectedPractitioner);

      if (selectedPractitioner) {

        if (selectedPractitioner._id) {
          data.practitioner._id = selectedPractitioner._id;
        }
        if (selectedPractitioner.name && selectedPractitioner.name && selectedPractitioner.name.text ) {
          data.practitioner.name = selectedPractitioner.name.text;
        }
        if (selectedPractitioner.telecom && selectedPractitioner.telecom[0] && selectedPractitioner.telecom[0].value ) {
          data.practitioner.telecomValue = selectedPractitioner.telecom[0].value;
        }
        if (selectedPractitioner.telecom && selectedPractitioner.telecom[0] && selectedPractitioner.telecom[0].use ) {
          data.practitioner.telecomUse = selectedPractitioner.telecom[0].use;
        }

        if (selectedPractitioner.qualification && selectedPractitioner.qualification[0] && selectedPractitioner.qualification[0].identifier && selectedPractitioner.qualification[0].identifier[0] && selectedPractitioner.qualification[0].identifier[0].value ) {
          data.practitioner.qualificationId = selectedPractitioner.qualification[0].identifier[0].value;
        }
        if (selectedPractitioner.qualification && selectedPractitioner.qualification[0] && selectedPractitioner.qualification[0].identifier && selectedPractitioner.qualification[0].identifier[0] && selectedPractitioner.qualification[0].identifier[0].period && selectedPractitioner.qualification[0].identifier[0].period.start ) {
          data.practitioner.qualificationStart = selectedPractitioner.qualification[0].identifier[0].period.start;
        }
        if (selectedPractitioner.qualification && selectedPractitioner.qualification[0] && selectedPractitioner.qualification[0].identifier && selectedPractitioner.qualification[0].identifier[0] && selectedPractitioner.qualification[0].identifier[0].period && selectedPractitioner.qualification[0].identifier[0].period.end) {
          data.practitioner.qualificationEnd = selectedPractitioner.qualification[0].identifier[0].period.end;
        }
        if (selectedPractitioner.qualification && selectedPractitioner.qualification[0] && selectedPractitioner.qualification[0].issuer && selectedPractitioner.qualification[0].issuer.display ) {
          data.practitioner.issuer = selectedPractitioner.qualification[0].issuer.display;
        }
      }
    }

    if (Session.get('practitionerDetailState')) {
      data.practitioner = Session.get('practitionerDetailState');
    }

    if(process.env.NODE_ENV === "test") console.log("PractitionerDetail[data]", data);
    return data;
  }


  render() {
    return (
      <div id={this.props.id} className="practitionerDetail">
        <CardText>
          <TextField
            id='practitionerNameInput'
            ref='name'
            name='name'
            type='text'
            floatingLabelText='name'
            value={this.data.practitioner.name}
            onChange={ this.changeState.bind(this, 'name')}
            fullWidth
            /><br/>
          <TextField
            id='telecomValueInput'
            ref='telecomValue'
            name='telecomValue'
            type='text'
            floatingLabelText='telecom value (701-555-1234)'
            value={this.data.practitioner.telecomValue}
            onChange={ this.changeState.bind(this, 'telecomValue')}
            fullWidth
            /><br/>
          <TextField
            id='telecomUseInput'
            ref='telecomUse'
            name='telecomUse'
            type='text'
            floatingLabelText='telecom use (work | mobile | home)'
            value={this.data.practitioner.telecomUse}
            onChange={ this.changeState.bind(this, 'telecomUse')}
            fullWidth
            /><br/>
          <TextField
            id='issuerInput'
            ref='issuer'
            name='issuer'
            type='text'
            floatingLabelText='issuer'
            value={this.data.practitioner.issuer}
            onChange={ this.changeState.bind(this, 'issuer')}
            fullWidth
            /><br/>
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
          <TextField
            id='qualificationStartInput'
            ref='qualificationStart'
            name='qualificationStart'
            type='text'
            floatingLabelText='start'
            value={this.data.practitioner.qualificationStart}
            onChange={ this.changeState.bind(this, 'qualificationStart')}
            fullWidth
            /><br/>
          <TextField
            id='qualificationEndInput'
            ref='qualificationEnd'
            name='qualificationEnd'
            type='text'
            floatingLabelText='end'
            value={this.data.practitioner.qualificationEnd}
            onChange={ this.changeState.bind(this, 'qualificationEnd')}
            fullWidth
            /><br/>
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
          <RaisedButton id="savePractitionerButton" className="savePractitionerButton" primary={true} label="Save" onClick={this.handleSaveButton.bind(this)} />
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

    console.log("changeState", value);

    // by default, assume there's no other data and we're creating a new practitioner
    let practitionerUpdate = defaultPractitioner;

    // if there's an existing practitioner, use them
    if (Session.get('selectedPractitioner')) {
      practitionerUpdate = this.data.practitioner;
    }

    if (typeof Session.get('practitionerDetailState') === "object") {
      practitionerUpdate = Session.get('practitionerDetailState');
    }

    practitionerUpdate[field] = value;
    console.log("practitionerUpdate", practitionerUpdate);

    Session.set('practitionerDetailState', practitionerUpdate);
  }

  openTab(index){
    // set which tab is selected
    let state = Session.get('practitionerCardState');
    state["index"] = index;
    Session.set('practitionerCardState', state);
  }

  // this could be a mixin
  handleSaveButton(){
    console.log("handleSaveButton", this);

    let practitionerFormData = Session.get('practitionerDetailState');
    console.log("practitionerFormData", practitionerFormData);


    if (Session.get('selectedPractitioner')) {
      console.log("update practioner");

      updatePractitioner.call(
        {_id: Session.get('selectedPractitioner'), update: practitionerFormData }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Practitioner updated!', 'success');
          Session.set('patientFormData', defaultPractitioner);
          Session.set('patientDetailState', defaultPractitioner);
          Session.set('practitionerPageTabIndex', 1);
        }
      });
    } else {

      console.log("create a new practitioner", practitionerFormData);

      //Meteor.users.insert(practitionerFormData);
      insertPractitioner.call(practitionerFormData, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Practitioner added!', 'success');
          Session.set('patientFormData', defaultPractitioner);
          Session.set('patientDetailState', defaultPractitioner);
          Session.set('practitionerPageTabIndex', 1);
        }
      });
    }
  }

  // this could be a mixin
  handleCancelButton(){
    console.log("handleCancelButton");
  }

  handleDeleteButton(){
    removePractitionerById.call(
      {_id: Session.get('selectedPractitioner')}, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Practitioner deleted!', 'success');
          this.openTab(1);
        }
      });
  }
}


PractitionerDetail.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(PractitionerDetail.prototype, ReactMeteorData);
