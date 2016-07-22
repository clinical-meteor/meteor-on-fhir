import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';

import { Row, Col } from 'react-bootstrap';
import DocumentsList from '../../containers/documents-list.js';
import { AddDocument } from '../../components/AddDocument.js';

import { PageContainer } from '../../components/PageContainer';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';


import {Tab, Tabs} from 'react-toolbox/lib/tabs';
import PractitionerTable from '../../workflows/practitioners/PractitionerTable';

import { insertPractitioner, updatePractitioner, removePractitionerById } from '../../../api/practitioners/methods';
import { Bert } from 'meteor/themeteorchef:bert';


let defaultState = false;

Session.setDefault('practitionerDetailState', defaultState);


export default class PractitionerDetail extends React.Component {
  getMeteorData() {
    let data = {
      practitionerId: false,
      practitioner: {
        id: "",
        username: "",
        gender: "",
        active: "",
        email: "",
        name: "",
        photo: ""
      }
    }

    if (Session.get('selectedPractitioner')) {
      data.practitionerId = Session.get('selectedPractitioner');

      let selectedPractitioner = Practitioners.findOne({_id: Session.get('selectedPractitioner')});
      if (selectedPractitioner) {
        data.practitioner = {
          id: selectedPractitioner._id,
          username: selectedPractitioner.username,
          gender: selectedPractitioner.gender,
          active: selectedPractitioner.active.toString(),
          email: selectedPractitioner.emails ? selectedPractitioner.emails[0].address : "",
          name: selectedPractitioner.name ? selectedPractitioner.name.text : "",
          given: selectedPractitioner.name ? selectedPractitioner.name.given : "",
          family: selectedPractitioner.name ? selectedPractitioner.name.family : ""
        }
      }
    }

    if (Session.get('practitionerDetailState')) {
      data.practitioner = Session.get('practitionerDetailState');
    }

    return data;
  };


  // this could be a mixin
  changeState(field, value){

    console.log("changeState", value);

    // by default, assume there's no other data and we're creating a new practitioner
    let practitionerUpdate = {
      id: "",
      username: "",
      gender: "",
      active: "",
      email: "",
      name: "",
      photo: ""
    }

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
  };
  openTab(index){
    // set which tab is selected
    let state = Session.get('practitionerCardState');
    state["index"] = index;
    Session.set('practitionerCardState', state);
  };

  // this could be a mixin
  handleSaveButton(){
      let practitionerFormData = {
        'name': {
          'text': this.refs.name.refs.input.value
        },
        'identifier': [],
        'gender': this.refs.gender.refs.input.value,
        'photo': [{
          url: this.refs.photo.refs.input.value
        }]
      }

      if (this.refs.active.refs.input.value === "true") {
        practitionerFormData.active = true;
      } else {
        practitionerFormData.active = false;
      }

      console.log("practitionerFormData", practitionerFormData);


    if (Session.get('selectedPractitioner')) {
      console.log("update practioner");
      //Meteor.users.insert(practitionerFormData);
      updatePractitioner.call(
        {_id: Session.get('selectedPractitioner'), update: practitionerFormData }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Practitioner updated!', 'success');
          this.openTab(1);
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
    removePractitionerById.call(
      {_id: Session.get('selectedPractitioner')}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Practitioner deleted!', 'success');
        this.openTab(1);
      }
    });
  };
  determineButtons(practitionerId){
    if (practitionerId) {
      return (
        <div>
          <Button id="savePractitionerButton" label="Save" onClick={this.handleSaveButton.bind(this)} />
          <Button id="deletePractitionerButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <Button id="savePractitionerButton" label="Save" onClick={this.handleSaveButton.bind(this)} />
      );
    }
  };
  render() {
    return (
      <div className="practitionerDetail">
        <CardText>
           <Input type='text' ref='name' label='name' name='name' value={this.data.practitioner.name} onChange={ this.changeState.bind(this, 'name')} />
           <Input type='text' ref='gender' label='gender' name='gender' value={this.data.practitioner.gender} onChange={ this.changeState.bind(this, 'gender')} />
           <Input type='text' ref='photo' label='photo' name='photo' value={this.data.practitioner.photo} onChange={ this.changeState.bind(this, 'photo')} />
           <Input type='text' ref='active' label='active' name='active' value={this.data.practitioner.active} onChange={ this.changeState.bind(this, 'active')} />
        </CardText>
        <CardActions>
          { this.determineButtons(this.data.practitionerId) }
        </CardActions>
      </div>
    );
  }
}


PractitionerDetail.propTypes = {
  hasUser: React.PropTypes.object,
};
ReactMixin(PractitionerDetail.prototype, ReactMeteorData);
