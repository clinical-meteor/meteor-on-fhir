import React from 'react';
import { Row, Col, Alert, FormGroup, FormControl, Button } from 'react-bootstrap';
import { handleRecoverPassword } from '/imports/modules/handleRecoverPassword';

import { PageContainer } from '/imports/ui/components/PageContainer';
import { MobilePadding } from '/imports/ui/components/MobilePadding';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export class RecoverPassword extends React.Component {
  componentDidMount() {
    handleRecoverPassword({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  recoverPassword(){
    
  }

  render() {
    return(
      <div id='recoverPasswordPage'>
        <MobilePadding>
          <PageContainer>
            <h4 className="page-header">Recover Password</h4>
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
                  /><br/>
              </FormGroup>
              <RaisedButton id='recoverPasswordButton' type="submit" onTouchTap={this.recoverPassword } label='Recover Password' primary={true} />

            </form>
          </PageContainer>
        </MobilePadding>
      </div>
    );
  }
}
