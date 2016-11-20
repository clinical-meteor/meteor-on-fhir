import React from 'react';
import { Link } from 'react-router';
import TextField from 'material-ui/TextField';

import { Row, Col, Button } from 'react-bootstrap';

import { PageContainer } from '/imports/ui/components/PageContainer';
import { MobilePadding } from '/imports/ui/components/MobilePadding';

import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';

import RaisedButton from 'material-ui/RaisedButton';

export class Signup extends React.Component {
  componentDidMount() {
    //handleSignup({ component: this });
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
      browserHistory.push('/');
      // Meteor.setTimeout(function(){
      //   browserHistory.push('/welcome/patient');
      //   Bert.alert('Welcome!', 'success');
      // }, 1000);
    });
  }

  render() {
    return (
      <div id='signupPage'>
        <MobilePadding>
          <PageContainer>
                <h4 className='page-header' style={{color: 'black'}}>Sign Up</h4>
                <form ref='signup' className='signup' onSubmit={ this.handleSubmit }>
                  <Row>
                    <Col xs={ 6 } sm={ 6 }>
                      <TextField
                        id='firstNameInput'
                        name='firstName'
                        ref='firstName'
                        floatingLabelText='First Name'
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
                      fullWidth
                      /><br/>
                    <TextField
                      id='passwordInput'
                      ref='password'
                      name='password'
                      type='text'
                      floatingLabelText='Password'
                      fullWidth
                      /><br/>

                    <TextField
                      id='accessCodeInput'
                      ref='accessCode'
                      name='accessCode'
                      type='text'
                      floatingLabelText='Have an access code?'
                      /><br/>

                  <RaisedButton id='signupButton' onTouchTap={this.handleTouchTap.bind(this)} label='Sign Up' primary={true} />
                  <RaisedButton id='alreadyHaveAccountButton' onTouchTap={this.loginRoute } label='Already have an account?' style={{marginLeft: '20px'}} />
                </form>

          </PageContainer>
        </MobilePadding>
      </div>
    );
  }
}
