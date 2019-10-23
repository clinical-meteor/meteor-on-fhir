import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { CardText, CardTitle, TextField, RaisedButton } from 'material-ui';

import { Row, Col, Alert } from 'react-bootstrap';

import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Roles } from 'meteor/alanning:roles';

import { lightBaseTheme, darkBaseTheme } from 'material-ui/styles';
import { blue500, orange500, green500 } from 'material-ui/styles/colors';

import { FullPageCanvas, GlassCard, Glass, DynamicSpacer } from 'meteor/clinical:glass-ui';

import { get, set } from 'lodash';
import validator from 'validator';


// if(process.env.NODE_ENV === "test") console.log("Signup[lightBaseTheme]", lightBaseTheme);
// if(process.env.NODE_ENV === "test") console.log("Signup[darkBaseTheme]", darkBaseTheme);

export class Signup extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      form: {
        familyName: '',
        givenName: '',
        emailAddress: '',
        password: '',
        accessCode: ''
      }
    }
  }
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
        },
        pageBackground: {}
      },
      errorText: {
        accessCode: '',
        givenName: '', 
        familyName: '', 
        emailAddress: '', 
        password: ''
      },
      connected: false
    };

    if(Meteor.status().status === "connected"){
      data.connected = true;
    }

    if (get(Meteor, 'settings.public.theme.darkroomTextEnabled')) {
      data.style.textColor.color = darkBaseTheme.palette.textColor;
      data.style.inputStyle.color = darkBaseTheme.palette.textColor;
      data.style.errorStyle.color = darkBaseTheme.palette.accent1Color;
      data.style.hintStyle.color = darkBaseTheme.palette.secondaryTextColor;
      data.style.underlineStyle.color = darkBaseTheme.palette.textColor;
      data.style.floatingLabelStyle.color = darkBaseTheme.palette.secondaryTextColor;
      data.style.floatingLabelFocusStyle.color = darkBaseTheme.palette.secondaryTextColor;
    }

    // if(get(Meteor, 'settings.public.defaults.registration.background')){
    //   data.style.pageBackground = {
    //     backgroundImage: 'url(' + get(Meteor, 'settings.public.defaults.registration.background') + ')',
    //     WebkitBackgroundSize: 'contain',
    //     MozBackgroundSize: 'contain',
    //     OBackgroundSize: 'contain',
    //     backgroundSize: 'contain',
    //     backgroundPositionY: 'bottom',
    //     backgroundRepeat: 'no-repeat',
    //     backgroundColor: 'white',
    //     position: 'absolute',
    //     height: '100%',
    //     width: '100%'
    //   }
    // }

    data.style.pageBackground = Glass.getContextImage();
    
    switch(Session.get('signUpErrorMessage')) {
      case 'Password may not be empty':
        data.errorText.accessCode = '';
        data.errorText.givenName = '';
        data.errorText.familyName = '';
        data.errorText.emailAddress = '';
        data.errorText.password = 'Password may not be empty';
        break;
      case "Is an email.":
        data.errorText.accessCode = '';
        data.errorText.givenName = '';
        data.errorText.familyName = '';
        data.errorText.emailAddress = "Is an email.";
        data.errorText.password = "";
        break;
      case "This doesn't appear to be an email.":
        data.errorText.accessCode = '';
        data.errorText.givenName = '';
        data.errorText.familyName = '';
        data.errorText.emailAddress = "This doesn't appear to be an email.";
        data.errorText.password = "";
        break;
      case 'Email is already registered.':
        data.errorText.accessCode = '';
        data.errorText.givenName = '';
        data.errorText.familyName = '';
        data.errorText.emailAddress = 'Email already exists.';
        data.errorText.password = '';
        break;
      case 'This email appears to be available!':
        data.errorText.accessCode = '';
        data.errorText.givenName = '';
        data.errorText.familyName = '';
        data.errorText.emailAddress = 'This email appears to be available!';
        data.errorText.password = '';
        data.style.errorStyle.color = green500;
        break;
      default:
        data.errorText.accessCode = '';
        data.errorText.givenName = '';
        data.errorText.familyName = '';
        data.errorText.emailAddress = '';
        data.errorText.password = '';
    }

    // console.log("Signup[data]", data);
    return data;
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  signinRoute(){
    if(this.props.history){
      this.props.history.push('/signin');
    }
  }

  render() {
    let formData = this.state.form;

    var acccessCode;
    if(get(Meteor, 'settings.public.defaults.registration.displayAccessCode')){
      acccessCode = <TextField
        id='accessCodeInput'
        name='accessCode'
        type='text'
        floatingLabelText='Have an access code?'
        inputStyle={this.data.style.inputStyle}
        hintStyle={this.data.style.hintStyle}
        errorText={this.data.errorText.accessCode}
        errorStyle={this.data.style.errorStyle}
        underlineStyle={this.data.style.underlineStyle}
        floatingLabelStyle={this.data.style.floatingLabelStyle}
        floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
        onChange={this.changeState.bind(this, 'accessCode')}
        value={ get(formData, 'accessCode') }
        floatingLabelFixed={true} 
        />;
    }

    let glassColor = 'rgba(128, 128, 128, 0.12)';
    if(get(Meteor, 'settings.public.theme.glassColor')){
      glassColor = get(Meteor, 'settings.public.theme.glassColor');
    }

    let cardStyle = {
      position: 'relative'
    };
    // if(['iPad'].includes(window.navigator.platform)){
    cardStyle.top = (Session.get('appHeight') * 0.1) + 'px'
    // }

    let connectionAlert;
    if(!this.data.connected){
      connectionAlert = <Alert bsStyle="warning">
        <strong>No connection to server.</strong> Please check your internet connection.
      </Alert>;
    }

    return (
      <div id='signupPage' style={this.data.style.pageBackground} >
          <FullPageCanvas>
            <Row>
              <Col mdOffset={3} md={ 6 } sm={ 12 }>
                <Row>                    
                  <Col md={12} >
                    <GlassCard backgroundColor={glassColor} style={cardStyle} >
                      <CardTitle title='Sign Up' />
                      <CardText>
                        <form ref='signup' className='signup' onSubmit={ this.handleSubmit }>
                        <Row>
                          <Col md={6}>
                            <TextField
                              id='givenNameInput'
                              name='givenName'
                              floatingLabelText='Given Name'
                              inputStyle={this.data.style.inputStyle}
                              hintStyle={this.data.style.hintStyle}
                              errorText={this.data.errorText.givenName}
                              errorStyle={this.data.style.errorStyle}
                              underlineStyle={this.data.style.underlineStyle}
                              floatingLabelStyle={this.data.style.floatingLabelStyle}
                              floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
                              onKeyPress={this.handleKeyPress.bind(this)}
                              onChange={this.changeState.bind(this, 'givenName')}
                              value={ get(formData, 'givenName') }
                              hintText='Jane'
                              floatingLabelFixed={true}
                              fullWidth
                              /><br/>
                          </Col>
                          <Col md={6}>
                            <TextField
                              id='familyNameInput'
                              name='familyName'
                              type='text'
                              floatingLabelText='Family Name'
                              inputStyle={this.data.style.inputStyle}
                              hintStyle={this.data.style.hintStyle}
                              errorText={this.data.errorText.familyName}
                              errorStyle={this.data.style.errorStyle}
                              underlineStyle={this.data.style.underlineStyle}
                              floatingLabelStyle={this.data.style.floatingLabelStyle}
                              floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
                              onKeyPress={this.handleKeyPress.bind(this)}
                              onChange={this.changeState.bind(this, 'familyName')}
                              floatingLabelFixed={true}
                              hintText='Doe'
                              value={ get(formData, 'familyName') }
                              fullWidth
                              /><br/>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                            <TextField
                              id='emailAddressInput'
                              name='emailAddress'
                              type='text'
                              floatingLabelText='Email Address'
                              inputStyle={this.data.style.inputStyle}
                              errorText={this.data.errorText.emailAddress}
                              errorStyle={this.data.style.errorStyle}
                              hintStyle={this.data.style.hintStyle}
                              underlineStyle={this.data.style.underlineStyle}
                              floatingLabelStyle={this.data.style.floatingLabelStyle}
                              floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
                              onKeyPress={this.handleKeyPress.bind(this)}
                              onChange={this.changeState.bind(this, 'emailAddress')}
                              value={ get(formData, 'emailAddress') }
                              hintText='janedoe@gmail.com'
                              floatingLabelFixed={true}
                              fullWidth
                              /><br/>
                            <TextField
                              id='passwordInput'
                              name='password'
                              type='password'
                              floatingLabelText='Password'
                              inputStyle={this.data.style.inputStyle}
                              errorText={this.data.errorText.password}
                              errorStyle={this.data.style.errorStyle}
                              hintStyle={this.data.style.hintStyle}
                              underlineStyle={this.data.style.underlineStyle}
                              floatingLabelStyle={this.data.style.floatingLabelStyle}
                              floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
                              onKeyPress={this.handleKeyPress.bind(this)}
                              onChange={this.changeState.bind(this, 'password')}
                              value={ get(formData, 'password') }
                              hintText='**********'
                              floatingLabelFixed={true}
                              fullWidth
                              /><br/>

                            { acccessCode }

                            <RaisedButton
                              id='signupButton'
                              onClick={this.handleTouchTap.bind(this)}
                              label='Sign Up'
                              fullWidth
                              primary={true} />

                            <DynamicSpacer />
                            <RaisedButton
                              id='alreadyHaveAccountButton'
                              onClick={this.signinRoute }
                              label='Already have an account?'
                              fullWidth
                            />

                          </Col>
                        </Row>                    
                      </form>
                      </CardText>
                    </GlassCard>
                    <DynamicSpacer />
                    { connectionAlert }
                  </Col>
                </Row>
              </Col>
            </Row>
          </FullPageCanvas>
      </div>
    );
  }
  updateFormData(formData, field, textValue){
    // if(process.env.NODE_ENV === "test") console.log("ObservationDetail.updateFormData", formData, field, textValue);

    switch (field) {
      case "familyName":
        set(formData, 'familyName', textValue)
        break;
      case "givenName":
        set(formData, 'givenName', textValue)
        break;        
      case "emailAddress":
        set(formData, 'emailAddress', textValue);
        if(validator.isEmail(textValue)){
          //console.log(textValue + " appears to be an email.  Let's see if it's registered.")
          Session.set('signUpErrorMessage', 'This email appears to be available!')

          Meteor.call('checkIfEmailExists', textValue, function(error, result){
            if(result){
              //console.log('checkIfEmailExists', result);
              Session.set('signUpErrorMessage', "Email is already registered.")
            }
            if(error){              
              //onsole.log('checkIfEmailExists', error);
            }
          })  
        } else {
          //console.log(textValue + " isn't an email.")
          Session.set('signUpErrorMessage', "This doesn't appear to be an email.")
        }
        break;        
      case "password":
        set(formData, 'password', textValue)
        break;
      case "accessCode":
        set(formData, 'accessCode', textValue)
        break;
    }

    if(process.env.NODE_ENV === "test") console.log("formData", formData);
    return formData;
  }
  changeState(field, event, textValue){
    // if(process.env.NODE_ENV === "test") console.log("   ");
    //if(process.env.NODE_ENV === "test") console.log("Signup.changeState", field, textValue);
    // console.log("Signup.changeState", field, textValue);
    
    let formData = Object.assign({}, this.state.form);

    formData = this.updateFormData(formData, field, textValue);

    // if(process.env.NODE_ENV === "test") console.log("formData", formData);

    this.setState({form: formData})
  }
  async handleTouchTap(){
    // console.log('handleTouchTap');

    let self = this;

    let newUserData = {
      email: get(this, 'state.form.emailAddress', ''),
      username: get(this, 'state.form.emailAddress', ''),
      password: get(this, 'state.form.password', ''),
      profile: {
        name: {
          given: get(this, 'state.form.givenName', ''),
          family: get(this, 'state.form.familyName', ''),
          text: get(this, 'state.form.givenName','') + ' ' + get(this, 'state.form.familyName', '')
        }
      },
      accessCode: get(this, 'state.form.accessCode', '')
    };

    // console.log('SignUp.handleTouchTap', this);
    // console.log('newUserData', newUserData);
    // if(validator.isEmail(newUserData.username)){
    if(Session.equals('signUpErrorMessage', 'This email appears to be available!')){
      console.log('We think this email is available; so lets try registering it.');
        await Accounts.createUser(newUserData, function(error, result){
        if (error) { 
          // for some reason, we're getting an "Email already exists!" on signup
          if (!error.reason.includes("Email already exists.")) {
            // console.log('Accounts.createUser().error',  error.reason)
            // Meteor.call('debugToServer', 'Accounts.createUser()', error)
    
            Session.set('signUpErrorMessage', error.reason);
 
            // Bert.alert(error.reason, 'danger');
          }
        }
        if (result) {
          // console.log("Accounts.createUser[result]", result);
          // console.log("Accounts.createUser[Meteor.userId()]", Meteor.userId());
          // console.log("Accounts.createUser[Roles.userIsInRole(Meteor.userId()]", Roles.userIsInRole(Meteor.userId()));

          // if(process.env.NODE_ENV === "production"){
            // console.log('Sending verification email...')
            Meteor.call('sendVerificationEmail', Meteor.userId());
          // }
  
          if(self.props.history){
            // if this is a patient's first visit, we want to send them to a welcome screen
            // where they can fill out HIPAA
            if (Roles.userIsInRole(Meteor.userId(), 'patient') && get(Meteor.user(), 'profile.firstTimeVisit')) {
    
              if(get(Meteor, 'settings.public.defaults.routes.patientWelcomePage')){
                console.log('Routing to Meteor.settings.public.defaults.routes.patientWelcomePage')
                self.props.history.push(get(Meteor, 'settings.public.defaults.routes.patientWelcomePage'));  
              } else {
                console.log('Routing to /welcome/patient')
                self.props.history.push('/welcome/patient');  
              }
    
            // and if they're a practitioner, we probably need to collect some credentialing data
            // and inform them about their obligations regarding HIPAA
            } else if (Roles.userIsInRole(Meteor.userId(), 'practitioner') && get(Meteor.user(), 'profile.firstTimeVisit')) {
                console.log('Routing to /welcome/practitioner')
                self.props.history.push('/welcome/practitioner');
            } else if (Roles.userIsInRole(Meteor.userId(), 'sysadmin') && get(Meteor.user(), 'profile.firstTimeVisit')) {
                console.log('Routing to /welcome/sysadmin')
                self.props.history.push('/welcome/sysadmin');
            } else {
              // otherwise we go to the default route specified in the settings.json file
              if(get(Meteor, 'settings.public.defaults.route')){
                console.log('Meteor.settings.public.defaults.route', get(Meteor, 'settings.public.defaults.route', '/'))
                self.props.history.push(get(Meteor, 'settings.public.defaults.route', '/'));
              } else {
                // and if all else fails, just go to the root 
                console.log('Routing to /');
                self.props.history.push('/');      
              }  
            }
          }
        }
      });

    }
  }
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleTouchTap.bind(this);
    }
  }
}
ReactMixin(Signup.prototype, ReactMeteorData);

export default Signup;