import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import TextField from 'material-ui/TextField';

import { Row, Col } from 'react-bootstrap';

import { VerticalCanvas, Theme } from 'meteor/clinical:glass-ui';
import { MobilePadding } from '/imports/ui/components/MobilePadding';

import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';

import RaisedButton from 'material-ui/RaisedButton';
import { lightBaseTheme, darkBaseTheme } from 'material-ui/styles';
import { has, get } from 'lodash';

if(process.env.NODE_ENV === "test") console.log("Signup[lightBaseTheme]", lightBaseTheme);
if(process.env.NODE_ENV === "test") console.log("Signup[darkBaseTheme]", darkBaseTheme);

export class Signup extends React.Component {
  componentDidMount() {
    //handleSignup({ component: this });
  }
  getMeteorData() {
    let data = {
      style: {
        textColor: {
          color: lightBaseTheme.palette.textColor
        },
        inputStyle: {
          color: lightBaseTheme.palette.textColor
        },
        errorStyle: {
          color: lightBaseTheme.palette.accent1Color
        },
        hintStyle: {
          color: lightBaseTheme.palette.secondaryTextColor
        },
        underlineStyle: {
          borderColor: lightBaseTheme.palette.textColor
        },
        floatingLabelStyle: {
          color: lightBaseTheme.palette.secondaryTextColor
        },
        floatingLabelFocusStyle: {
          color: lightBaseTheme.palette.secondaryTextColor
        }
      }
    };

    if (get(Meteor, 'settings.public.theme.darkroomTextEnabled')) {
      data.style.textColor.color = darkBaseTheme.palette.textColor;
      data.style.inputStyle.color = darkBaseTheme.palette.textColor;
      data.style.errorStyle.color = darkBaseTheme.palette.accent1Color;
      data.style.hintStyle.color = darkBaseTheme.palette.secondaryTextColor;
      data.style.underlineStyle.color = darkBaseTheme.palette.textColor;
      data.style.floatingLabelStyle.color = darkBaseTheme.palette.secondaryTextColor;
      data.style.floatingLabelFocusStyle.color = darkBaseTheme.palette.secondaryTextColor;
    }
    if(process.env.NODE_ENV === "test") console.log("Signup[data]", data);

    return data;
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  signinRoute(){
    browserHistory.push('/signin');
  }
  handleTouchTap(){
    //console.log('this', this);

    let newUserData = {
      email: this.refs.emailAddress.input.value,
      password: this.refs.password.input.value,
      profile: {
        name: {
          given: this.refs.givenName.input.value,
          family: this.refs.familyName.input.value,
          text: this.refs.givenName.input.value + ' ' + this.refs.familyName.input.value
        },
        accessCode: this.refs.accessCode.input.value
      }
    };

    Accounts.createUser(newUserData, function(error, result){
      if (error) {
        // for some reason, we're getting an "Email already exists!" on signup
        if (!error.reason.includes("Email already exists.")) {
          Bert.alert(error.reason, 'danger');
        }
      }
      if (result) {
        console.log("Accounts.createUser[result]", result);
      }

      // if this is a patient's first visit, we want to send them to a welcome screen
      // where they can fill out HIPAA
      if (Roles.userIsInRole(Meteor.userId(), 'patient') && get(Meteor.user(), 'profile.firstTimeVisit')) {
        browserHistory.push('/welcome/patient');
      } else {
        // otherwise we go to the default route specified in the settings.json file
        if(get(Meteor, 'settings.public.defaults.route')){
          browserHistory.push(get(Meteor, 'settings.public.defaults.route', '/'));
        } else {
          // and if all else fails, just go to the root 
          browserHistory.push('/');      
        }  
      }

    });
  }
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleTouchTap(e);
    }
  }
  render() {
    var acccessCode;
    if(get(Meteor, 'settings.public.defaults.registration.displayAccessCode')){
      acccessCode = <TextField
        id='accessCodeInput'
        ref='accessCode'
        name='accessCode'
        type='text'
        floatingLabelText='Have an access code?'
        inputStyle={this.data.style.inputStyle}
        hintStyle={this.data.style.hintStyle}
        errorStyle={this.data.style.errorStyle}
        underlineStyle={this.data.style.underlineStyle}
        floatingLabelStyle={this.data.style.floatingLabelStyle}
        floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
      />;
    }

    return (
      <div id='signupPage'>
        <MobilePadding>
          <VerticalCanvas>
                <h4 className='page-header' style={this.data.style.underlineStyle}>Sign Up</h4>
                <form ref='signup' className='signup' onSubmit={ this.handleSubmit }>
                  <Row>
                    <Col xs={ 6 } sm={ 6 }>
                      <TextField
                        id='givenNameInput'
                        name='givenName'
                        ref='givenName'
                        floatingLabelText='Given Name'
                        inputStyle={this.data.style.inputStyle}
                        hintStyle={this.data.style.hintStyle}
                        errorStyle={this.data.style.errorStyle}
                        underlineStyle={this.data.style.underlineStyle}
                        floatingLabelStyle={this.data.style.floatingLabelStyle}
                        floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
                        onKeyPress={this.handleKeyPress.bind(this)}
                        fullWidth
                        /><br/>
                    </Col>
                    <Col xs={ 6 } sm={ 6 }>
                      <TextField
                        id='familyNameInput'
                        ref='familyName'
                        name='familyName'
                        type='text'
                        floatingLabelText='Family Name'
                        inputStyle={this.data.style.inputStyle}
                        hintStyle={this.data.style.hintStyle}
                        errorStyle={this.data.style.errorStyle}
                        underlineStyle={this.data.style.underlineStyle}
                        floatingLabelStyle={this.data.style.floatingLabelStyle}
                        floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
                        onKeyPress={this.handleKeyPress.bind(this)}
                        fullWidth
                        /><br/>
                    </Col>
                  </Row>
                    <TextField
                      id='emailAddressInput'
                      ref='emailAddress'
                      name='emailAddress'
                      type='text'
                      floatingLabelText='Email Address'
                      inputStyle={this.data.style.inputStyle}
                      errorStyle={this.data.style.errorStyle}
                      hintStyle={this.data.style.hintStyle}
                      underlineStyle={this.data.style.underlineStyle}
                      floatingLabelStyle={this.data.style.floatingLabelStyle}
                      floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
                      onKeyPress={this.handleKeyPress.bind(this)}
                      fullWidth
                      /><br/>
                    <TextField
                      id='passwordInput'
                      ref='password'
                      name='password'
                      type='password'
                      floatingLabelText='Password'
                      inputStyle={this.data.style.inputStyle}
                      errorStyle={this.data.style.errorStyle}
                      hintStyle={this.data.style.hintStyle}
                      underlineStyle={this.data.style.underlineStyle}
                      floatingLabelStyle={this.data.style.floatingLabelStyle}
                      floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
                      onKeyPress={this.handleKeyPress.bind(this)}
                      fullWidth
                      /><br/>

                    { acccessCode }

                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <RaisedButton
                    id='signupButton'
                    onTouchTap={this.handleTouchTap.bind(this)}
                    onClick={this.handleTouchTap.bind(this)}
                    label='Sign Up'
                    primary={true} />
                  <RaisedButton
                    id='alreadyHaveAccountButton'
                    onTouchTap={this.signinRoute }
                    onClick={this.signinRoute }
                    label='Already have an account?'
                    style={{marginLeft: '20px'}} />
                </form>

          </VerticalCanvas>
        </MobilePadding>
      </div>
    );
  }
}
ReactMixin(Signup.prototype, ReactMeteorData);

export default Signup;