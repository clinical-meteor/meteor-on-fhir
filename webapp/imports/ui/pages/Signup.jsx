import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import TextField from 'material-ui/TextField';

import { Row, Col } from 'react-bootstrap';

import { MobilePadding } from '/imports/ui/components/MobilePadding';

import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

import RaisedButton from 'material-ui/RaisedButton';
import { lightBaseTheme, darkBaseTheme } from 'material-ui/styles';

import { FullPageCanvas, GlassCard, Glass } from 'meteor/clinical:glass-ui';

import { has, get, set } from 'lodash';

if(process.env.NODE_ENV === "test") console.log("Signup[lightBaseTheme]", lightBaseTheme);
if(process.env.NODE_ENV === "test") console.log("Signup[darkBaseTheme]", darkBaseTheme);

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

    if(get(Meteor, 'settings.public.defaults.registration.background')){
      data.style.pageBackground = {
        backgroundImage: 'url(' + get(Meteor, 'settings.public.defaults.registration.background') + ')',
        WebkitBackgroundSize: 'contain',
        MozBackgroundSize: 'contain',
        OBackgroundSize: 'contain',
        backgroundSize: 'contain',
        backgroundPositionY: 'bottom',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'white',
        position: 'absolute',
        height: '100%',
        width: '100%'
      }
    }
    
    switch(Session.get('signUpErrorMessage')) {
      case 'Password may not be empty':
        data.errorText.accessCode = '';
        data.errorText.givenName = '';
        data.errorText.familyName = '';
        data.errorText.emailAddress = '';
        data.errorText.password = 'Password may not be empty';
        break;
      case 'Email already exists.':
        data.errorText.accessCode = '';
        data.errorText.givenName = '';
        data.errorText.familyName = '';
        data.errorText.emailAddress = 'Email already exists.';
        data.errorText.password = '';
        break;
      default:
        data.errorText.accessCode = '';
        data.errorText.givenName = '';
        data.errorText.familyName = '';
        data.errorText.emailAddress = '';
        data.errorText.password = '';
    }

    // if(process.env.NODE_ENV === "test") console.log("Signup[data]", data);
    return data;
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  signinRoute(){
    browserHistory.push('/signin');
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


    return (
      <div id='signupPage' style={this.data.style.pageBackground} >
        <MobilePadding>
          <FullPageCanvas>
            <Row>
              <Col lg={5} md={ 6 } sm={ 12 }>
                <h4 className='page-header' style={this.data.style.underlineStyle}>Sign Up</h4>
                <form ref='signup' className='signup' onSubmit={ this.handleSubmit }>
                  <Row>
                    <Col mdOffset={2} md={5}>
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
                    <Col md={5}>
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
                    <Col mdOffset={2} md={10}>
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
                        primary={true} />
                      <RaisedButton
                        id='alreadyHaveAccountButton'
                        onClick={this.signinRoute }
                        label='Already have an account?'
                        style={{marginLeft: '20px'}} />

                    </Col>
                  </Row>                    
                </form>

              </Col>
            </Row>
          </FullPageCanvas>
        </MobilePadding>
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
        set(formData, 'emailAddress', textValue)
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
    if(process.env.NODE_ENV === "test") console.log("Signup.changeState", field, textValue);
    // if(process.env.NODE_ENV === "test") console.log("this.state", this.state);

    let formData = Object.assign({}, this.state.form);

    formData = this.updateFormData(formData, field, textValue);

    // if(process.env.NODE_ENV === "test") console.log("formData", formData);

    this.setState({form: formData})
  }
  handleTouchTap(){
    let newUserData = {
      email: get(this, 'state.form.emailAddress', ''),
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

    console.log('SignUp.handleTouchTap', this, newUserData);
    console.log(newUserData);

    Accounts.createUser(newUserData, function(error, result){
      if (error) {
        console.log('Accounts.createUser().error' + error.reason)
        // Meteor.call('debugToServer', 'Accounts.createUser()', error)

        Session.set('signUpErrorMessage', error.reason);

        // for some reason, we're getting an "Email already exists!" on signup
        //if (!error.reason.includes("Email already exists.")) {
        Bert.alert(error.reason, 'danger');
        //}
      }
      if (result) {
        console.log("Accounts.createUser[result]", result);
        console.log("Accounts.createUser[Meteor.userId()]", Meteor.userId());
        console.log("Accounts.createUser[Roles.userIsInRole(Meteor.userId()]", Roles.userIsInRole(Meteor.userId()));

        // if this is a patient's first visit, we want to send them to a welcome screen
        // where they can fill out HIPAA
        if (Roles.userIsInRole(Meteor.userId(), 'patient') && get(Meteor.user(), 'profile.firstTimeVisit')) {

          console.log('Routing to /welcome/patient')
          browserHistory.push('/welcome/patient');

        // and if they're a practitioner, we probably need to collect some credentialing data
        // and inform them about their obligations regarding HIPAA
        } else if (Roles.userIsInRole(Meteor.userId(), 'practitioner') && get(Meteor.user(), 'profile.firstTimeVisit')) {
            console.log('Routing to /welcome/practitioner')
            browserHistory.push('/welcome/practitioner');
        } else if (Roles.userIsInRole(Meteor.userId(), 'sysadmin') && get(Meteor.user(), 'profile.firstTimeVisit')) {
            console.log('Routing to /welcome/sysadmin')
            browserHistory.push('/welcome/sysadmin');
        } else {
          // otherwise we go to the default route specified in the settings.json file
          if(get(Meteor, 'settings.public.defaults.route')){
            console.log('Meteor.settings.public.defaults.route', get(Meteor, 'settings.public.defaults.route', '/'))
            browserHistory.push(get(Meteor, 'settings.public.defaults.route', '/'));
          } else {
            // and if all else fails, just go to the root 
            console.log('Routing to /');
            browserHistory.push('/');      
          }  
        }
      }
    });
  }
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleTouchTap.bind(this);
    }
  }
}
ReactMixin(Signup.prototype, ReactMeteorData);

export default Signup;