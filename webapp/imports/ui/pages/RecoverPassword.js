import React from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Row, Col, Alert, FormGroup, FormControl, Button } from 'react-bootstrap';
import { handleRecoverPassword } from '/imports/client/entry/handleRecoverPassword';

import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { MobilePadding } from '/imports/ui/components/MobilePadding';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import Theme from '/imports/ui/Theme';

export class RecoverPassword extends React.Component {
  componentDidMount() {
    handleRecoverPassword({ component: this });
  }
  handleSubmit(event) {
    event.preventDefault();
  }
  getMeteorData() {
    let data = {
      style: Theme.palette()
    };

    if(process.env.NODE_ENV === "test") console.log("Login[data]", data);
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
            <h4 className="page-header" style={this.data.style.textColor}>Recover Password</h4>
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
                  underlineFocusStyle={this.data.style.underlineFocusStyle}
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
