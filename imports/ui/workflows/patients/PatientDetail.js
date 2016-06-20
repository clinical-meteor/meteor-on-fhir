import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';

import { Row, Col } from 'react-bootstrap';
import DocumentsList from '../../containers/documents-list.js';
import { AddDocument } from '../../components/AddDocument.js';

import { PageContainer } from '../../components/PageContainer';
import { GlassCard } from '../../components/GlassCard';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';


import {Tab, Tabs} from 'react-toolbox/lib/tabs';
import PatientTable from '../../workflows/patients/PatientTable';

import { insertPatient, updatePatient, removePatientById } from '../../../api/patients/methods';
import { Bert } from 'meteor/themeteorchef:bert';

import DatePicker from 'react-toolbox/lib/date_picker';
//import { DatePicker, DatePickerDialog, Calendar, CalendarDay, CalendarMonth } from 'react-toolbox/lib/date_picker';

let defaultState = false;

Session.setDefault('patientDetailState', defaultState);


export default class PatientDetail extends React.Component {
  getMeteorData() {
    let data = {
      patientId: false,
      patient: {
        id: "",
        name: "",
        gender: "",
        active: true,
        birthdate: new Date(),
        photo: ""
      }
    }

    if (Session.get('selectedPatient')) {
      data.patientId = Session.get('selectedPatient');

      let selectedPatient = Patients.findOne({_id: Session.get('selectedPatient')});
      if (selectedPatient) {
        data.patient = {
          id: selectedPatient._id,
          birthdate: new Date(moment(selectedPatient.birthdate)),
          gender: selectedPatient.gender,
          active: selectedPatient.active.toString(),
          photo: selectedPatient.photo ? selectedPatient.photo[0].url : "",
          name: selectedPatient.name ? selectedPatient.name[0].text : ""
        }
      }
    }

    if (Session.get('patientDetailState')) {
      data.patient = Session.get('patientDetailState');
    }

    //console.log("data", data);

    return data;
  };

  render() {
    return (
      <div className="patientDetail">
        <CardText>
          <Input ref="name" type='text' label='name' name='name' value={this.data.patient.name} onChange={ this.changeState.bind(this, 'name')} />
          <Input ref="active" type='text' label='active' name='active' value={this.data.patient.active} onChange={ this.changeState.bind(this, 'active')} />
          <Input ref="gender" type='text' label='gender' name='gender' value={this.data.patient.gender} onChange={ this.changeState.bind(this, 'gender')} />
          <Input ref="photo" type='text' label='photo' name='photo' value={this.data.patient.photo} onChange={ this.changeState.bind(this, 'photo')} />
          <DatePicker ref="birthdate" label='birthdate' name='birthdate' value={this.data.patient.birthdate} onChange={ this.changeState.bind(this, 'birthdate')}  />
        </CardText>
        <CardActions>
          { this.determineButtons(this.data.patientId) }
        </CardActions>
      </div>
    );
  }
  determineButtons(patientId){
    if (patientId) {
      return (
        <div>
          <Button label="Save" onClick={this.handleSaveButton.bind(this)} />
          <Button label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <Button label="Save" onClick={this.handleSaveButton.bind(this)} />
      );
    }
  };
  // this could be a mixin
  changeState(field, value){

    //console.log("changeState", value);

    // by default, assume there's no other data and we're creating a new patient
    let patientUpdate = {
      id: "",
      birthdate: new Date(),
      gender: "",
      active: true,
      name: "",
      photo: ""
    }

    // if there's an existing patient, use them
    if (Session.get('selectedPatient')) {
      patientUpdate = this.data.patient;
    }

    if (typeof Session.get('patientDetailState') === "object") {
      patientUpdate = Session.get('patientDetailState');
    }
    // if (field === "birthdate") {
    //   patientUpdate[field] = new Date(value);
    // } else {
    //   patientUpdate[field] = value;
    // }
    patientUpdate[field] = value;

    console.log("patientUpdate", patientUpdate);

    Session.set('patientDetailState', patientUpdate);
  };
  openTab(index){
    // set which tab is selected
    let state = Session.get('patientCardState');
    state["index"] = index;
    Session.set('patientCardState', state);
  };

  // this could be a mixin
  handleSaveButton(){
    console.log("this", this);

      let patientFormData = {
        'name': [{
          'text': this.refs.name.refs.input.value
        }],
        'birthdate': this.refs.birthdate.props.value,
        'gender': this.refs.gender.refs.input.value,
        'photo': [{
          url: this.refs.photo.refs.input.value
        }]
      }

      if (this.refs.active.refs.input.value === "true") {
        patientFormData.active = true;
      } else {
        patientFormData.active = false;
      }

      console.log("patientFormData", patientFormData);


    if (Session.get('selectedPatient')) {
      console.log("update practioner");
      //Meteor.users.insert(patientFormData);
      updatePatient.call(
        {_id: Session.get('selectedPatient'), update: patientFormData }, (error) => {
        if (error) {
          console.log("error", error);
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Patient updated!', 'success');
          this.openTab(1);
        }
      });
    } else {

      console.log("create a new patient", patientFormData);

      //Meteor.users.insert(patientFormData);
      insertPatient.call(patientFormData, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Patient added!', 'success');
          this.openTab(1);
        }
      });
    }
  };

  // this could be a mixin
  handleCancelButton(){
    console.log("handleCancelButton");
  };
  handleDeleteButton(){
    removePatientById.call(
      {_id: Session.get('selectedPatient')}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Patient deleted!', 'success');
        this.openTab(1);
      }
    });
  };

}


PatientDetail.propTypes = {
  hasUser: React.PropTypes.object,
};
ReactMixin(PatientDetail.prototype, ReactMeteorData);
