import { CardTitle } from 'react-toolbox/lib/card';
import { Col, Grid } from 'react-bootstrap';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';
import { browserHistory } from 'react-router';
import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import React from 'react';
import ReactMixin from 'react-mixin';

import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import Spacer from '/imports/ui/components/Spacer';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { PageContainer } from '/imports/ui/components/PageContainer';
import { removeUserById } from '../../api/users/methods';


let defaultState = {
  index: 0,
  hasConfirmedDelete: false,
  wantsToDelete: false,
  increment: 0,
  confirm: '',
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
};
Session.setDefault('myProfileState', defaultState);

export class MyProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      state: {
        index: 0,
        hasConfirmedDelete: false,
        wantsToDelete: false,
        confirmed: '',
        increment: 0,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      user: {
        given: '',
        familiy: '',
        email: '',
        avatar: '',
        zip: '',
        longitude: '',
        latitude: '',
        profileImage: 'thumbnail.png',
        birthdate: ''
      }
    };

    if (Session.get('myProfileState')) {
      data.state = Session.get('myProfileState');
    }

    if (Meteor.user()) {
      data.user = {
        _id: Meteor.userId(),
        email: Meteor.user().emails[0].address,
        avatar: Meteor.user().profile.avatar,
        zip: "",
        longitude: "",
        latitude: "",
        profileImage: Meteor.user().profile.avatar
      }
      if (Meteor.user().profile && Meteor.user().profile.avatar) {
        data.user.profileImage = Meteor.user().profile.avatar;
      } else {
        data.user.profileImage = "thumbnail.png";
      }

      if (Meteor.user() && Meteor.user().profile && Meteor.user().profile.name) {
        data.user.given = Meteor.user().profile.name.given;
        data.user.family = Meteor.user().profile.name.family;
        data.user.fullName = Meteor.user().profile.name.given + " " + Meteor.user().profile.name.family;
      } else {
        data.user.given = "";
        data.user.family = "";
        data.user.fullName = "";
      }
    }

    //console.log("data", data);

    return data;
  };


  render(){
    return(
      <div id="myProfilePage">
        <PageContainer>
          <GlassCard>
            <hr />
            <Grid>
              <Col xs={6} md={4} lg={2}>
                <img id="avatarImage" ref="avatarImage" src={this.data.user.profileImage} onError={this.imgError.bind(this)} responsive style={{width: "100%"}} />
              </Col>
              <Col xs={12} md={8} lg={10}>
                <CardTitle
                  title={this.data.user.fullName}
                  subtitle={this.data.user.email}
                />
                <Tabs index={this.data.state.index} onChange={this.handleTabChange}>

                  <Tab className="demographicsTab" label='Demographics'>
                    <div id="profileDemographicsPane" style={{position: "relative"}}>
                      <Input type='text' label='given name' ref="given" name='given' style={this.data.style} value={this.data.user.given} />
                      <Input type='text' label='family name' ref="family" name='family' style={this.data.style} value={this.data.user.family} />
                      <Input type='text' label='date of birth (yyyy-mm-dd)' ref="birthdate" name='birthdate' style={this.data.style} value={this.data.user.birthdate} />
                      <Input type='text' label='avatar' ref="avatar" name='avatar' style={this.data.style} value={this.data.user.avatar} onChange={ this.handleChangeAvatar.bind(this) } />
                    </div>
                  </Tab>
                  <Tab className="medicalHistoryTab" label='Medical History'>
                    <div style={{position: "relative"}}>
                    </div>

                  </Tab>
                  <Tab className="environmentalTab" label='Environmental' onActive={this.handleActive}>
                    <div id="profileEnvironmentalPane" style={{position: "relative"}} >
                      <Input type='text' label='zipcode' name='zipcode' ref="zipcode" style={this.data.style} value={this.data.user.zip} />
                      <Input type='text' label='latitude' name='latitude' ref="latitude" style={this.data.style} value={this.data.user.latitude} />
                      <Input type='text' label='longitude' name='longitude' ref="longitude" style={this.data.style} value={this.data.user.longitude} />
                    </div>

                  </Tab>
                  <Tab className="passwordTab" label='Password'>
                    <div id="profilePasswordPane" style={{position: "relative"}} >
                      <Input type='text' label='oldPassword' name='oldPassword' ref="oldPassword" style={this.data.style} value={this.data.state.oldPassword} onChange={ this.changeState.bind(this, 'oldPassword') } />
                      <Input type='text' label='newPassword' name='newPassword' ref="newPassword" style={this.data.style} value={this.data.state.newPassword} onChange={ this.changeState.bind(this, 'newPassword') } />
                      <Input type='text' label='confirmPassword' name='confirmPassword' ref="confirmPassword" style={this.data.style} value={this.data.state.confirmPassword} onChange={ this.changeState.bind(this, 'confirmPassword') } />
                      <Button id="changePasswordButton" icon="bookmark" label="Change Password" onClick={this.changePassword.bind(this)} raised primary />
                    </div>

                  </Tab>
                  <Tab className="systemTab" label='System'>
                    <div id="profileSystemPane" style={{position: "relative"}}>
                      <Input disabled type='text' label='symptomatic _id' name='_id' style={this.data.style} value={this.data.user._id} />
                      <Input disabled type='text' label='email' name='email' style={this.data.style} value={this.data.user.email} />

                      { this.renderConfirmDelete(this.data.state.wantsToDelete) }
                    </div>

                  </Tab>
                </Tabs>
              </Col>
            </Grid>
            <Spacer />


          </GlassCard>
        </PageContainer>
      </div>
    );
  }
  imgError() {
    // console.log("img", this.refs);
    this.refs.avatarImage.src = "/noAvatar.png";
  };
  renderConfirmDelete(wantsToDelete){
    if (wantsToDelete) {
      return(
        <div>
          <br />
          <br />
          <Input
            type='text'
            label='confirm email or _id'
            name='confirm'
            ref="confirm"
            style={this.data.style}
            value={this.data.state.confirm}
            onChange={this.handleConfirm.bind(this)}
            floating
            style={{color: "red"}}
            />
          <Button
            id="confirmDeleteUserButton"
            icon="delete"
            label="Confirm Delete"
            onMouseUp={this.confirmDelete.bind(this) }
            raised
            primary
            style={{backgroundColor: "red"}}
            />
        </div>
      )
    } else {
      return(
        <Button id="deleteUserButton" icon="delete" label="Delete User" onClick={this.handleDelete} raised primary />
      )
    }
  };

  changeState(field){
    let state = Session.get('myProfileState');
    state[field] = this.refs[field].refs.input.value;
    Session.set('myProfileState', state);
  };
  handleTabChange(index) {
    let state = Session.get('myProfileState');
    state.index = index;
    Session.set('myProfileState', state);
  };

  handleActive() {
    //console.log('Special one activated');
  };
  handleChangeAvatar() {
    console.log('Lets change the avatar...', this.refs.avatar.refs.input.value);

    Meteor.users.update({  _id: Meteor.userId()}, {$set:{
      'profile.avatar': this.refs.avatar.refs.input.value
    }})
  };
  handleDelete(component) {
    let state = Session.get('myProfileState');
    state.wantsToDelete = true;
    Session.set('myProfileState', state);
  };
  handleConfirm() {
    let state = Session.get('myProfileState');
    state.confirm = this.refs.confirm.refs.input.value;
    Session.set('myProfileState', state);
  };
  confirmDelete() {
    // janky, but it works, i guess
    if ((this.refs.confirm.refs.input.value === Meteor.userId()) || (this.refs.confirm.refs.input.value === Meteor.user().emails[0].address)) {
      console.log('Confirm _id match.  Removing.');

      removeUserById.call({
        _id:  Meteor.userId()
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('User removed!', 'success');
          browserHistory.push('/login');
        }
      });
    } else {
      console.log("Hmmm...  yeah, lets wait a bit and make sure we have the right user.");
    }
  };
  changePassword() {
    if (this.refs.newPassword.refs.input.value === this.refs.confirmPassword.refs.input.value) {
      console.log('Passwords match.  Lets send to the server and make it official.');

      Accounts.changePassword(this.refs.oldPassword.refs.input.value, this.refs.newPassword.refs.input.value, function(error, result){
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Password changed!', 'success');

          let state = Session.get('myProfileState');
          state.newPassword = "";
          state.oldPassword = "";
          state.confirmPassword = "";
          Session.set('myProfileState', state);
        }
      })

    } else {
      console.log("Passwords don't match.  Please try again.");
    }
  };
}


MyProfilePage.propTypes = {};
MyProfilePage.defaultProps = {};
ReactMixin(MyProfilePage.prototype, ReactMeteorData);
