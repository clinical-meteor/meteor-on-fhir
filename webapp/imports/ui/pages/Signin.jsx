// import { Bert } from 'meteor/clinical:alert';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { MobilePadding } from '/imports/ui/components/MobilePadding';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';

import { FullPageCanvas, GlassCard, Glass, DynamicSpacer } from 'meteor/clinical:glass-ui';
import { CardText, CardActions, CardTitle, TextField, RaisedButton } from 'material-ui'

import { browserHistory } from 'react-router';
import { Row, Col } from 'react-bootstrap';

import { lightBaseTheme, darkBaseTheme } from 'material-ui/styles';
import { get } from 'lodash';

if(Package['symptomatic:smart-on-fhir-client']){
  import { OAuth } from 'meteor/symptomatic:smart-on-fhir-client';
}

Session.setDefault('signinWithSearch', '');

export class Signin extends React.Component {
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
      endpoints: [],
      services: []
    };



    if( Endpoints.find().count() > 0){
      data.endpoints = Endpoints.find({
        'name': {
          $regex: Session.get( 'signinWithSearch' ),
          $options: 'i'
        }
      }).fetch()
    }

    if(Package['symptomatic:smart-on-fhir-client']){
      if(ServiceConfiguration){
        data.services = ServiceConfiguration.configurations.find().fetch()
      }   
    }

    if (get(Meteor, 'settings.theme.darkroomTextEnabled')) {
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

    if(process.env.NODE_ENV === "test") console.log("Signin[data]", data);
    return data;
  }
  handleSubmit(event) {
    event.preventDefault();
  }
  forgotPasswordRoute(){
    browserHistory.push('/recover-password');
  }
  registerRoute(){
    browserHistory.push('/signup');
  }
  signInWith(serviceName, event){
    console.log('Signin.signInWith', serviceName)
    let self = this;

    var options = {
      requestPermissions: [
        'OBSERVATION.READ', 
        'OBSERVATION.SEARCH', 
        'PATIENT.READ', 
        'PATIENT.SEARCH', 
        'PRACTITIONER.READ', 
        'PRACTITIONER.SEARCH',
        'patient/*.read',
        'patient/*.search',
        'openid',
        'profile',
        'user/*.*',
        'launch',
        'online_access'        
      ]
    }

    console.log('Accounts.oauth.serviceNames', Accounts.oauth.serviceNames());

    //console.log('Accounts.oauth.credentialRequestCompleteHandler()');
    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(function(error, result){
      if(error){
        console.log('error', error)
      }

      browserHistory.push(get(Meteor, 'settings.public.defaults.route', '/'));
      console.log('Callback complete!');
    });

    var credentialResult = OAuth.requestCredential(options, credentialRequestCompleteCallback);
    console.log('credentialResult', credentialResult)

    Meteor.call('fetchAccessToken', serviceName, function(err, result){
        if(result){
          console.log('result.accessToken', result.accessToken)
          Session.set('oauthAccessToken', result.accessToken)
        }
    })

  }
  handleTouchTap(event, foo, value){    
    if(process.env.NODE_ENV === "test") {
      console.log('Signin.handleTouchTap', event, foo, value)
      console.log("this", this);
    }

    let self = this;

    Meteor.loginWithPassword(
      this.refs.emailAddress.input.value,
      this.refs.password.input.value,
    function(error) {
      if (error) {
        Bert.alert(error.reason, 'warning');
      } else {
        Bert.alert('Logged in!', 'info');

        // we might have received a custom path to route to
        // depending on which signin component we used
        if (self.props.state && self.props.state.nextPathname) {
          browserHistory.push(location.state.nextPathname);
        } else if (Roles.userIsInRole(Meteor.userId(), 'practitioner') && get(Meteor.user(), 'profile.firstTimeVisit')) {
          browserHistory.push('/welcome/practitioner');
        } else if (Roles.userIsInRole(Meteor.userId(), 'sysadmin') && get(Meteor.user(), 'profile.firstTimeVisit')) {
            browserHistory.push('/welcome/sysadmin');
        } else if(get(Meteor, 'settings.public.defaults.route')){
          // but normally we just use the default route specified in settings.json
          browserHistory.push(get(Meteor, 'settings.public.defaults.route', '/'));
        } else {
          // and fall back to the root if not specified
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
  handleSearch(event, serviceName, foo) {
    console.log('Signin.handleSearch', serviceName)

    Session.set('signinWithSearch', serviceName);
  }
  render() {
    var signinButtons = [];
    var self = this;
    
    if (this.data.services.length > 0){
      this.data.services.forEach(function(service){
        signinButtons.push(
          <div key={service.service}>
            <RaisedButton 
              label={ service.service } 
              id={ service.service + "Button" }
              primary={true}
              onClick={ self.signInWith.bind(this, service.service) }
              fullWidth
              labelStyle={{textTransform: 'capitalize'}}
              />    
              <br />
              <br />
          </div>
        );  
      });
    }

    var buttons = <div>
      { signinButtons }
    </div>

    var signInWith;

    if(Package['symptomatic:smart-on-fhir-client'] && get(Meteor, 'settings.publich.registration.signInWith')){
      signInWith = <Col lgOffset={4} mdOffset={2} lg={2} md={3}>
        <GlassCard zDepth={3} height="auto" >
          <CardTitle
            title="Sign in with..."
            />
          <CardText>
            <TextField
                type="searchSignIns"
                ref="searchSignIns"
                name="searchSignIns"
                floatingLabelText="Search..."
                onKeyPress={this.handleKeyPress.bind(this)}
                onChange={this.handleSearch.bind(this)}
                inputStyle={this.data.style.inputStyle}
                hintStyle={this.data.style.hintStyle}
                errorStyle={this.data.style.errorStyle}
                underlineStyle={this.data.style.underlineStyle}
                floatingLabelStyle={this.data.style.floatingLabelStyle}
                floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
                fullWidth
              />         
          </CardText>
            <CardActions>
              { buttons }
            </CardActions>
          </GlassCard>                  
      </Col>
    }

    let glassColor = 'rgba(128, 128, 128, 0.12)';
    if(get(Meteor, 'settings.public.theme.glassColor')){
      glassColor = get(Meteor, 'settings.public.theme.glassColor');
    }

    return (
      <div id="signinPage" style={this.data.style.pageBackground}>
        {/* <MobilePadding> */}
          <FullPageCanvas >
              <Row>
                <Col md={ 6 } sm={ 12 }>
                  {/* <h4 className="page-header" style={this.data.style.underlineStyle}>Sign In</h4> */}
                  <Row>                    
                    <Col mdOffset={2} md={10}>
                      <GlassCard backgroundColor={glassColor} >
                        <CardTitle title='Sign In' />
                        <CardText>
                          <form ref="signin" className="signin" >
                            <TextField
                              type="email"
                              ref="emailAddress"
                              name="emailAddress"
                              floatingLabelText="Email Address"
                              onKeyPress={this.handleKeyPress.bind(this)}
                              inputStyle={this.data.style.inputStyle}
                              hintStyle={this.data.style.hintStyle}
                              errorStyle={this.data.style.errorStyle}
                              underlineStyle={this.data.style.underlineStyle}
                              floatingLabelStyle={this.data.style.floatingLabelStyle}
                              floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
                              floatingLabelFixed={true} 
                              hintText='jane@acme.com'
                              fullWidth
                            />              
  
                            <TextField
                              type="password"
                              ref="password"
                              name="password"
                              floatingLabelText="Password"
                              onKeyPress={this.handleKeyPress.bind(this)}
                              inputStyle={this.data.style.inputStyle}
                              hintStyle={this.data.style.hintStyle}
                              errorStyle={this.data.style.errorStyle}
                              underlineStyle={this.data.style.underlineStyle}
                              floatingLabelStyle={this.data.style.floatingLabelStyle}
                              floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
                              floatingLabelFixed={true} 
                              hintText='************'
                              fullWidth
                            />
                            <DynamicSpacer />
                            <RaisedButton id="signinButton" onClick={this.handleTouchTap.bind(this)} label="Signin" primary={true} fullWidth />
                            <DynamicSpacer />
                            <Row>
                              <Col xs={8}>
                                <RaisedButton id="forgotPasswordButton" onClick={this.forgotPasswordRoute } label="Forgot password?" fullWidth />
                                <br />
                              </Col>
                              <Col xs={4}>
                                <RaisedButton id="registerButton" onClick={this.registerRoute } label="Register" fullWidth />
                                <br />
                              </Col>
                            </Row>
                          </form>
                        </CardText>
                      </GlassCard>
                    </Col>
                  </Row>
                  <br/>
                  <br/>
                </Col>                
                { signInWith }
              </Row>

          </FullPageCanvas>
        {/* </MobilePadding> */}
      </div>
    );
  }
}
ReactMixin(Signin.prototype, ReactMeteorData);

export default Signin;