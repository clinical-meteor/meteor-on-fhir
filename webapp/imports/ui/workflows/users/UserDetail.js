import { CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React from 'react';
import ReactMixin from 'react-mixin';

import { Bert } from 'meteor/themeteorchef:bert';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { insertUser, updateUser, removeUserById } from '../../../api/users/methods';


let defaultState = false;

Session.setDefault('userDetailState', defaultState);


export default class UserDetail extends React.Component {
  getMeteorData() {
    let data = {
      userId: false,
      user: {
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
      data.userId = Session.get('selectedUser');

      let selectedUser = Users.findOne({_id: Session.get('selectedUser')});
      if (selectedUser) {
        data.user = {
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

    if (Session.get('userDetailState')) {
      data.user = Session.get('userDetailState');
    }

    return data;
  }


  // this could be a mixin
  changeState(field, value){

    //console.log("changeState", value);

    // by default, assume there's no other data and we're creating a new user
    let userUpdate = {
      id: '',
      username: '',
      gender: '',
      active: '',
      email: '',
      name: '',
      photo: ''
    };

    // if there's an existing user, use them
    if (Session.get('selectedUser')) {
      userUpdate = this.data.user;
    }

    if (typeof Session.get('userDetailState') === 'object') {
      userUpdate = Session.get('userDetailState');
    }

    userUpdate[field] = value;
    //console.log('userUpdate', userUpdate);

    Session.set('userDetailState', userUpdate);
  }
  openTab(index){
    // set which tab is selected
    let state = Session.get('userCardState');
    state['index'] = index;
    Session.set('userCardState', state);
  }

  // this could be a mixin
  handleSaveButton(){
    let userFormData = {
      'active': true,
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
      userFormData.active = true;
    } else {
      userFormData.active = false;
    }

    //console.log("userFormData", userFormData);


    if (Session.get('selectedUser')) {
      //console.log("update practioner");
      //Meteor.users.insert(userFormData);
      updateUser.call(
        {_id: Session.get('selectedUser'), update: userFormData }, (error) => {
          if (error) {
            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert('User updated!', 'success');
            this.openTab(1);
          }
        });
    } else {

      //console.log("create a new user", userFormData);

      //Meteor.users.insert(userFormData);
      insertUser.call(userFormData, (error) => {
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
  determineButtons(userId){
    if (userId) {
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
      <div className="userDetail">
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
            id='userBirthdateInput'
            ref='birthdate'
            name='birthdate'
            type='text'
            floatingLabelText='birthdate'
            value={this.data.user.birthdate}
            onChange={ this.changeState.bind(this, 'birthdate')}
            /><br/>

        </CardText>
        <CardActions>
          { this.determineButtons(this.data.userId) }
        </CardActions>
      </div>
    );
  }
}


UserDetail.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(UserDetail.prototype, ReactMeteorData);
