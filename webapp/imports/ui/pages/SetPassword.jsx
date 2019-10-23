import React from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Row, Col, Alert, FormGroup, FormControl } from 'react-bootstrap';
// import { handleRecoverPassword } from '/imports/client/entry/handleRecoverPassword';

import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/clinical:alert';

import { RaisedButton, TextField, CardTitle, CardText } from 'material-ui';
import Theme from '/imports/api/Theme';
import { lightBaseTheme, darkBaseTheme } from 'material-ui/styles';

import { VerticalCanvas, FullPageCanvas, GlassCard, Glass } from 'meteor/clinical:glass-ui';
import { get } from 'lodash';
import validator from 'validator';

// for convenience
var loginButtonsSession = Accounts._loginButtonsSession;

// since we don't want to pass around the callback that we get from our event
// handlers, we just make it a variable for the whole file
var doneCallback;

Accounts.onResetPasswordLink(function (token, done) {
  console.log('Accounts.onResetPasswordLink', token);
  Session.set('resetPasswordToken', token);

  loginButtonsSession.set("resetPasswordToken", token);
  doneCallback = done;
});

validatePassword = function(input){
  console.log('validatePassword', input)
  return true;
}


Session.setDefault('setPasswordInput', '')
export class SetPassword extends React.Component {
  componentDidMount() {
    //handleSetPassword({ component: this });
  }
  handleSubmit(event, foo) {
    event.preventDefault();    

    console.log('handleSubmit.event', event)
    console.log('handleSubmit.foo', foo)
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
      error: {
        text: ''
      },
      setPassword: Session.get('setPasswordInput') 
    };

    console.log('validator.isAlphanumeric', validator.isAlphanumeric(Session.get('setPasswordInput')))
    if(!validator.isAlphanumeric(Session.get('setPasswordInput'))){
      data.error.text = 'Try to make the password strong.  Or even use a passphrase.'
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


    data.style.pageBackground = Glass.getContextImage();

    console.log("SetPassword[data, params]", data, this);
    return data;
  }

  setPassword(proxy, newPassword, token){
    console.log("setPassword()", proxy, newPassword, token, this);

    let self = this;

    if(typeof newPassword === "undefined"){
      newPassword = Session.get('setPasswordInput')
    }

    console.log('setPasswordInput', Session.get('setPasswordInput'));
    console.log('resetPasswordToken', Session.get('resetPasswordToken'));

    if (validatePassword(newPassword)){
      Accounts.resetPassword(
        Session.get('resetPasswordToken'),
        Session.get('setPasswordInput'),
        function (error) {
          if (error) {
            console.log('Password reset error.', error);
            Bert.alert(error.reason, 'warning');
            // loginButtonsSession.errorMessage(error.reason || "Unknown error");
          } else {
            Bert.alert('Password reset.', 'info');
            console.log('Password reset.');
            if(self.props.history){
              self.props.history.push('/continuity-of-care')
            }
            // loginButtonsSession.set('resetPasswordToken', null);
            // loginButtonsSession.set('justResetPassword', true);
            if (doneCallback)
              doneCallback();
          }
        });  
    }

    // Accounts.forgotPassword({
    //   email: Session.get('setPasswordInput'),
    // }, (error) => {
    //   if (error) {
    //     Bert.alert(error.reason, 'warning');
    //   } else {
    //     Bert.alert('Check your inbox for a reset link!', 'info');
    //   }
    // });
  }
  handleChange(token, event, newPassword ){
    console.log("handleChange", token, newPassword);
    Session.set('setPasswordInput', newPassword);
    Session.set('resetPasswordToken', token);
  }

  render() {
    console.log('SetPassword.render.this', this)
    
    var email = 'janedoe@acme.com';

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
    
    return(
      <div id='setPasswordPage' style={this.data.style.pageBackground}>
          <FullPageCanvas>
            <Row>
              <Col  mdOffset={3} md={ 6 } sm={ 12 }>
                <Row>                    
                  <Col md={12}>
                    <GlassCard backgroundColor={glassColor} style={cardStyle} >
                    <CardTitle title='Change Password' />
                      <CardText>
                          <FormGroup>
                            <TextField
                              id='setPasswordInput'
                              ref='setPassword'
                              name='setPassword'
                              type='password'
                              floatingLabelText='Password'
                              inputStyle={this.data.style.inputStyle}
                              hintStyle={this.data.style.hintStyle}
                              errorText={this.data.error.text}
                              errorStyle={this.data.style.errorStyle}
                              underlineStyle={this.data.style.underlineStyle}
                              floatingLabelStyle={this.data.style.floatingLabelStyle}
                              floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
                              floatingLabelFixed={true} 
                              onChange={this.handleChange.bind(this, get(this, 'props.params.token')) }
                              hintText='**********'
                              fullWidth
                              /><br/>
                          </FormGroup>


                        <RaisedButton primary={true} id='setPasswordButton' type="submit" onClick={this.setPassword } label="Set Password" fullWidth />

                      </CardText>
                    </GlassCard>
                  </Col>
                </Row>
              </Col>
            </Row>
          </FullPageCanvas>
      </div>
    );
  }
}
ReactMixin(SetPassword.prototype, ReactMeteorData);

export default SetPassword;
