import React from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Row, Col, Alert, FormGroup, FormControl } from 'react-bootstrap';
import { handleRecoverPassword } from '/imports/client/entry/handleRecoverPassword';

import { MobilePadding } from '/imports/ui/components/MobilePadding';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/clinical:alert';

import { RaisedButton, TextField, CardTitle, CardText } from 'material-ui';
import Theme from '/imports/api/Theme';
import { lightBaseTheme, darkBaseTheme } from 'material-ui/styles';

import { VerticalCanvas, FullPageCanvas, GlassCard, Glass } from 'meteor/clinical:glass-ui';
import { get } from 'lodash';
import validator from 'validator';



Session.setDefault('recoverPasswordInput', '')
Session.setDefault('recoverPasswordSent', false)
export class RecoverPassword extends React.Component {
  componentDidMount() {
    //handleRecoverPassword({ component: this });
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
      recoverPassword: Session.get('recoverPasswordInput'),
      recoverPasswordSent: Session.get('recoverPasswordSent') 
    };

    console.log('validator.isEmail', validator.isEmail(Session.get('recoverPasswordInput')))
    if(!validator.isEmail(Session.get('recoverPasswordInput'))){
      data.error.text = 'Not an email.  Please check spelling and punctuation.'
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

    if(process.env.NODE_ENV === "test") console.log("Signin[data]", data);
    return data;
  }
  recoverPassword(proxy, value){
    console.log("recoverPasswordInput", value);

    console.log('recoverPasswordInput', Session.get('recoverPasswordInput'));

    Accounts.forgotPassword({
      email: Session.get('recoverPasswordInput'),
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'warning');
      } else {
        // Bert.alert('Check your inbox for a reset link!', 'info');
        Session.set('recoverPasswordSent', true)
      }
    });
  }
  handleChange(event){
    console.log("handleChange", event.target.value);
    Session.set('recoverPasswordInput', event.target.value)
  }

  render() {
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

    let cardContent;
    if(this.data.recoverPasswordSent){
      cardContent = <div>
      <CardTitle title='Check your email.' />
      <CardText>
        We just sent you a password recovery link!  Please continue from your mailbox.  
      </CardText>
    </div>
    } else {
      cardContent = <div>
        <CardTitle title='Recover Password' />
        <CardText>
          <FormGroup>
            <TextField
              id='recoverPasswordEmailInput'
              ref='emailAddress'
              name='emailAddress'
              type='email'
              floatingLabelText='Email Address'
              inputStyle={this.data.style.inputStyle}
              hintStyle={this.data.style.hintStyle}
              errorText={this.data.error.text}
              errorStyle={this.data.style.errorStyle}
              underlineStyle={this.data.style.underlineStyle}
              floatingLabelStyle={this.data.style.floatingLabelStyle}
              floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
              floatingLabelFixed={true} 
              onChange={this.handleChange }
              hintText='janedoe@symptomatic.io'
              fullWidth
              /><br/>
          </FormGroup>
          <RaisedButton primary={true} id='recoverPasswordButton' type="submit" onClick={this.recoverPassword } label="Recover Password" fullWidth />
        </CardText>
      </div>


    }
    
    return(
      <div id='recoverPasswordPage' style={this.data.style.pageBackground}>
          <FullPageCanvas>
            <Row>
              <Col  mdOffset={3} md={ 6 } sm={ 12 }>
                <Row>                    
                  <Col md={12}>
                    <GlassCard backgroundColor={glassColor} style={cardStyle} >                      
                      { cardContent }
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
ReactMixin(RecoverPassword.prototype, ReactMeteorData);

export default RecoverPassword;
