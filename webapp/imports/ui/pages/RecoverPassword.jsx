import React from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Row, Col, Alert, FormGroup, FormControl, Button } from 'react-bootstrap';
import { handleRecoverPassword } from '/imports/client/entry/handleRecoverPassword';

import { MobilePadding } from '/imports/ui/components/MobilePadding';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Theme from '/imports/api/Theme';
import { lightBaseTheme, darkBaseTheme } from 'material-ui/styles';

import { VerticalCanvas } from 'meteor/clinical:glass-ui';
import { get } from 'lodash';

export class RecoverPassword extends React.Component {
  componentDidMount() {
    handleRecoverPassword({ component: this });
  }
  handleSubmit(event) {
    event.preventDefault();
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

    if(process.env.NODE_ENV === "test") console.log("Signin[data]", data);
    return data;
  }
  recoverPassword(){
    console.log("recoverPassword");
  }

  render() {
    return(
      <div id='recoverPasswordPage'>
        <MobilePadding>
          <VerticalCanvas>
            <h4 className="page-header" style={this.data.style.underlineStyle}>Recover Password</h4>
            <Alert bsStyle="info">
              Enter your email address below to receive a link to reset your password.
            </Alert>
            <form ref="recoverPassword" className="recover-password" onSubmit={ this.handleSubmit }>
              <FormGroup>
                <TextField
                  id='recoverPasswordEmailInput'
                  ref='emailAddress'
                  name='emailAddress'
                  type='email'
                  floatingLabelText='Email Address'
                  inputStyle={this.data.style.inputStyle}
                  hintStyle={this.data.style.hintStyle}
                  errorStyle={this.data.style.errorStyle}
                  underlineStyle={this.data.style.underlineStyle}
                  floatingLabelStyle={this.data.style.floatingLabelStyle}
                  floatingLabelFocusStyle={this.data.style.floatingLabelFocusStyle}
                  fullWidth
                  /><br/>
              </FormGroup>
              <RaisedButton id='recoverPasswordButton' type="submit" onTouchTap={this.recoverPassword } label='Recover Password' primary={true} />

            </form>
          </VerticalCanvas>
        </MobilePadding>
      </div>
    );
  }
}
ReactMixin(RecoverPassword.prototype, ReactMeteorData);

export default RecoverPassword;