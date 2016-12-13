import { CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React from 'react';
import ReactMixin from 'react-mixin';

import { Bert } from 'meteor/themeteorchef:bert';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { insertUser, updateUser, removeUserById } from '../../../api/practitioners/methods';


let defaultState = false;

Session.setDefault('practitionerDetailState', defaultState);


export default class UserDetail extends React.Component {
  getMeteorData() {
    let data = {
      practitionerId: false,
      practitioner: {
        id: '',
        username: '',
        gender: '',
        active: '',
        email: '',
        name: '',
        photo: ''
      }
    };

    if (Session.get('selectedUser')) {
      data.practitionerId = Session.get('selectedUser');

      let selectedUser = Users.findOne({_id: Session.get('selectedUser')});
      if (selectedUser) {
        data.practitioner = {
          id: selectedUser._id,
          username: selectedUser.username,
          gender: selectedUser.gender,
          active: selectedUser.active.toString(),
          email: selectedUser.emails ? selectedUser.emails[0].address : '',
          name: selectedUser.name ? selectedUser.name.text : '',
          given: selectedUser.name ? selectedUser.name.given : '',
          family: selectedUser.name ? selectedUser.name.family : ''
        };
      }
    }

    if (Session.get('practitionerDetailState')) {
      data.practitioner = Session.get('practitionerDetailState');
    }

    return data;
  }


  // this could be a mixin
  changeState(field, value){

    //console.log("changeState", value);

    // by default, assume there's no other data and we're creating a new practitioner
    let practitionerUpdate = {
      id: '',
      username: '',
      gender: '',
      active: '',
      email: '',
      name: '',
      photo: ''
    };

    // if there's an existing practitioner, use them
    if (Session.get('selectedUser')) {
      practitionerUpdate = this.data.practitioner;
    }

    if (typeof Session.get('practitionerDetailState') === 'object') {
      practitionerUpdate = Session.get('practitionerDetailState');
    }

    practitionerUpdate[field] = value;
    //console.log('practitionerUpdate', practitionerUpdate);

    Session.set('practitionerDetailState', practitionerUpdate);
  }
  openTab(index){
    // set which tab is selected
    let state = Session.get('practitionerCardState');
    state['index'] = index;
    Session.set('practitionerCardState', state);
  }

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
    };

    if (this.refs.active.refs.input.value === 'true') {
      practitionerFormData.active = true;
    } else {
      practitionerFormData.active = false;
    }

    //console.log("practitionerFormData", practitionerFormData);


    if (Session.get('selectedUser')) {
      //console.log("update practioner");
      //Meteor.users.insert(practitionerFormData);
      updateUser.call(
        {_id: Session.get('selectedUser'), update: practitionerFormData }, (error) => {
          if (error) {
            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert('User updated!', 'success');
            this.openTab(1);
          }
        });
    } else {

      //console.log("create a new practitioner", practitionerFormData);

      //Meteor.users.insert(practitionerFormData);
      insertUser.call(practitionerFormData, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('User added!', 'success');
          this.openTab(1);
        }
      });
    }
  }

  handleDeleteButton(){
    removeUserById.call(
      {_id: Session.get('selectedUser')}, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('User deleted!', 'success');
          this.openTab(1);
        }
      });
  }
  determineButtons(practitionerId){
    if (practitionerId) {
      return (
        <div>
          <RaisedButton label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
          <RaisedButton label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton label="Save" primary={true}onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }

  render() {
    return (
      <div className="practitionerDetail">
        <CardText>
          <TextField
            id='userNameInput'
            ref='name'
            name='name'
            type='text'
            floatingLabelText='name'
            value={this.data.user.name}
            onChange={ this.changeState.bind(this, 'name')}
            /><br/>
          <TextField
            id='userGenderInput'
            ref='gender'
            name='gender'
            type='text'
            floatingLabelText='gender'
            value={this.data.user.gender}
            onChange={ this.changeState.bind(this, 'gender')}
            /><br/>
          <TextField
            id='userPhotoInput'
            ref='photo'
            name='photo'
            type='text'
            floatingLabelText='photo'
            value={this.data.user.photo}
            onChange={ this.changeState.bind(this, 'photo')}
            /><br/>
          <TextField
            id='userActiveInput'
            ref='active'
            name='active'
            type='text'
            floatingLabelText='active'
            value={this.data.user.active}
            onChange={ this.changeState.bind(this, 'active')}
            /><br/>

        </CardText>
        <CardActions>
          { this.determineButtons(this.data.practitionerId) }
        </CardActions>
      </div>
    );
  }
}


UserDetail.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(UserDetail.prototype, ReactMeteorData);
