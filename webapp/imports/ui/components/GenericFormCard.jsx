import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData, createContainer } from 'meteor/react-meteor-data';

import AppBar from 'react-toolbox/lib/app_bar';
import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import Table from 'react-toolbox/lib/table';
import Dialog from 'react-toolbox/lib/dialog';
import Spacer from './Spacer';

// import './style';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import { DatePicker, DatePickerDialog, Calendar, CalendarDay, CalendarMonth } from 'react-toolbox/lib/date_picker';


let defaultState = {
  name: "",
  email: "",
  phone: "",
  hint: "",
  date1: "",
  date2: "",
  date3: ""
}
Session.setDefault('genericFormState', defaultState);


const datetime = new Date(2015, 10, 16);
const min_datetime = new Date(new Date(datetime).setDate(8));
datetime.setHours(17);
datetime.setMinutes(28);


export class GenericFormCard extends React.Component {
  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      state: defaultState
    }

    if (Session.get('genericFormState')) {
      data.state = Session.get('genericFormState');
    }


    if (Session.get('darkroomEnabled')) {
      data.style.color = "black";
      data.style.background = "white";
    } else {
      data.style.color = "white";
      data.style.background = "black";
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = "blur(3px)";
      data.style.webkitFilter = "blur(3px)";
    }

    // this could be another mixin
    if (Session.get('backgroundBlurEnabled')) {
      data.style.backdropFilter = "blur(5px)";
    }

    //console.log("data", data);
    return data;
  };
  handleNameChange(name, value) {
    console.log("handleNameChange", name, value);
    //if (value) {
      this.setState(name, value);
    //}

    // Session.set('genericNameInput', value)
  };
  handleEmailChange(name, value) {
    //if (value) {
      this.setState(name, value);
    //}
    // Session.set('genericEmailInput', value)
  };
  handlePhoneChange(name, value) {
    //if (value) {
      this.setState(name, value);
    //}
    // Session.set('genericPhoneInput', value)
  };
  handleHintChange(name, value) {
    if (value) {
      this.setState(name, value);
    }
    // Session.set('genericHintInput', value)
  };
  handleDateChange(name, value) {
    if (value) {
      this.setState(name, value);
    }
    //Session.set('genericDateInput', value)
  };
  // this could be a mixin, right?
  setState(name, value){
    let state = Session.get('genericFormState');
    state[name] = value;
    Session.set('genericFormState', state);
    //console.log("state", Session.get('genericFormState'));

  };
  render () {
    //console.log("this.data", this.data);

    return(
     <Card style={this.data.style}>
      <CardTitle
        title="Welcome to GlassUI"
      />
      <CardText>
        <Input type='text' label='Name' name='name' value={this.data.state.name} onChange={this.handleNameChange.bind(this, 'name')} style={this.data.style} />
        <Input type='email' label='Email address' icon='email' value={this.data.state.email} onChange={this.handleEmailChange.bind(this, 'email')} style={this.data.style} />
        <Input type='tel' label='Phone' name='phone' icon='phone' value={this.data.state.phone} onChange={this.handlePhoneChange.bind(this, 'phone')} style={this.data.style} />
        <Input type='text' value={this.data.state.hint} label='Required Field' hint='With Hint' required onChange={this.handleHintChange.bind(this, 'hint')} icon={<span>J</span>} style={this.data.style} />
      </CardText>
     </Card>
    );
  }
};


GenericFormCard.propTypes = {};
GenericFormCard.defaultProps = {};
ReactMixin(GenericFormCard.prototype, ReactMeteorData);
