import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import TextField from 'material-ui/TextField';

import { Row, Col } from 'react-bootstrap';

import { PageContainer } from '/imports/ui/components/PageContainer';
import { MobilePadding } from '/imports/ui/components/MobilePadding';

import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';

import RaisedButton from 'material-ui/RaisedButton';
import { lightBaseTheme, darkBaseTheme } from 'material-ui/styles';

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
          color: darkBaseTheme.palette.textColor
        },
        inputStyle: {
          color: darkBaseTheme.palette.textColor
        },
        errorStyle: {
          color: darkBaseTheme.palette.accent1Color
        },
        hintStyle: {
          color: darkBaseTheme.palette.secondaryTextColor
        },
        underlineStyle: {
          borderColor: darkBaseTheme.palette.secondaryTextColor
        },
        floatingLabelStyle: {
          color: darkBaseTheme.palette.secondaryTextColor
        },
        floatingLabelFocusStyle: {
          color: darkBaseTheme.palette.secondaryTextColor
        }
      }
    };

    if (Meteor.settings && Meteor.settings.theme && Meteor.settings.theme.darkroomTextEnabled ) {
      data.style.textColor.color = lightBaseTheme.palette.textColor;
      data.style.inputStyle.color = lightBaseTheme.palette.textColor;
      data.style.errorStyle.color = lightBaseTheme.palette.accent1Color;
      data.style.hintStyle.color = lightBaseTheme.palette.secondaryTextColor;
      data.style.underlineStyle.color = lightBaseTheme.palette.secondaryTextColor;
      data.style.floatingLabelStyle.color = lightBaseTheme.palette.secondaryTextColor;
      data.style.floatingLabelFocusStyle.color = lightBaseTheme.palette.secondaryTextColor;
    }
    if(process.env.NODE_ENV === "test") console.log("Signup[data]", data);

    return data;
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  loginRoute(){
    browserHistory.push('/login');
  }
  handleTouchTap(){
    //console.log('this', this);

    let newUserData = {
      email: this.refs.emailAddress.input.value,
      password: this.refs.password.input.value,
      profile: {
        name: {
          given: this.refs.firstName.input.value,
          family: this.refs.lastName.input.value,
          text: this.refs.firstName.input.value + ' ' + this.refs.lastName.input.value
        },
        accessCode: this.refs.accessCode.input.value
      }
    };

    Accounts.createUser(newUserData, function(error, result){
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      if (result) {
        console.log("Accounts.createUser[result]", result);
      }
      browserHistory.push('/welcome/patient');
      // browserHistory.push('/');
    });
  }

  render() {
    return (
      <div id='signupPage'>
        <MobilePadding>
          <PageContainer>
                <h4 className='page-header' style={this.data.style.textColor}>Sign Up</h4>
                <form ref='signup' className='signup' onSubmit={ this.handleSubmit }>
                  <Row>
                    <Col xs={ 6 } sm={ 6 }>
                      <TextField
                        id='firstNameInput'
                        name='firstName'
                        ref='firstName'
                        floatingLabelText='First Name'
                        inputStyle={this.data.style.inputStyle}
                        hintStyle={this.data.style.hintStyle}
                        errorStyle={this.data.style.errorStyle}
                        underlineFocusStyle={this.data.style.underlineFocusStyle}
                        floatingLabelStyle={this.data.style.floatingLabelStyle}
                        floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
                        fullWidth
                        /><br/>
                    </Col>
                    <Col xs={ 6 } sm={ 6 }>
                      <TextField
                        id='lastNameInput'
                        ref='lastName'
                        name='lastName'
                        type='text'
                        floatingLabelText='Last Name'
                        inputStyle={this.data.style.inputStyle}
                        hintStyle={this.data.style.hintStyle}
                        errorStyle={this.data.style.errorStyle}
                        underlineFocusStyle={this.data.style.underlineFocusStyle}
                        floatingLabelStyle={this.data.style.floatingLabelStyle}
                        floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
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
                      underlineFocusStyle={this.data.style.underlineFocusStyle}
                      floatingLabelStyle={this.data.style.floatingLabelStyle}
                      floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
                      fullWidth
                      /><br/>
                    <TextField
                      id='passwordInput'
                      ref='password'
                      name='password'
                      type='text'
                      floatingLabelText='Password'
                      inputStyle={this.data.style.inputStyle}
                      errorStyle={this.data.style.errorStyle}
                      hintStyle={this.data.style.hintStyle}
                      underlineFocusStyle={this.data.style.underlineFocusStyle}
                      floatingLabelStyle={this.data.style.floatingLabelStyle}
                      floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
                      fullWidth
                      /><br/>

                    <TextField
                      id='accessCodeInput'
                      ref='accessCode'
                      name='accessCode'
                      type='text'
                      floatingLabelText='Have an access code?'
                      inputStyle={this.data.style.inputStyle}
                      hintStyle={this.data.style.hintStyle}
                      errorStyle={this.data.style.errorStyle}
                      underlineFocusStyle={this.data.style.underlineFocusStyle}
                      floatingLabelStyle={this.data.style.floatingLabelStyle}
                      floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
                      /><br/>

                  <RaisedButton
                    id='signupButton'
                    onTouchTap={this.handleTouchTap.bind(this)}
                    onClick={this.handleTouchTap.bind(this)}
                    label='Sign Up'
                    primary={true} />
                  <RaisedButton
                    id='alreadyHaveAccountButton'
                    onTouchTap={this.loginRoute }
                    onClick={this.loginRoute }
                    label='Already have an account?'
                    style={{marginLeft: '20px'}} />
                </form>

          </PageContainer>
        </MobilePadding>
      </div>
    );
  }
}
ReactMixin(Signup.prototype, ReactMeteorData);
