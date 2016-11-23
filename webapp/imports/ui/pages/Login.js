import React from 'react';
import { Link } from 'react-router';
import TextField from 'material-ui/TextField';

import { Row, Col, Button } from 'react-bootstrap';

import { PageContainer } from '/imports/ui/components/PageContainer';
import { PhoneContainer } from '/imports/ui/components/PhoneContainer';
import { MobilePadding } from '/imports/ui/components/MobilePadding';

import { browserHistory } from 'react-router';

import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

import RaisedButton from 'material-ui/RaisedButton';

export class Login extends React.Component {
  componentDidMount() {
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  forgotPasswordRoute(){
    browserHistory.push('/recover-password');
  }
  handleTouchTap(){
    if(process.env.NODE_ENV === "test") console.log("this", this);
    let self = this;

    Meteor.loginWithPassword(
      this.refs.emailAddress.input.value,
      this.refs.password.input.value,
    (error) => {
      if (error) {
        Bert.alert(error.reason, 'warning');
      } else {
        Bert.alert('Logged in!', 'success');

        if (self.props.state && self.props.state.nextPathname) {
          browserHistory.push(location.state.nextPathname);
        } else {
          browserHistory.push('/');
        }
      }
    });
  }
  render() {
    return (
      <div id="loginPage">
        <MobilePadding>
          <PhoneContainer>
                <h4 className="page-header" style={{color: "black"}}>Login</h4>
                <form ref="login" className="login">
                      <TextField
                        type="email"
                        ref="emailAddress"
                        name="emailAddress"
                        placeholder="Email Address"
                      />
                      <br/>
                      <TextField
                        type="password"
                        ref="password"
                        name="password"
                        placeholder="Password"
                      />
                      <br/>
                      <RaisedButton id="loginButton" onTouchTap={this.handleTouchTap.bind(this)} label="Login" primary={true} />
                      <RaisedButton id="forgotPasswordButton" onTouchTap={this.forgotPasswordRoute } label="Forgot password?" style={{marginLeft: "20px"}} />
                </form>

          </PhoneContainer>
        </MobilePadding>
      </div>
    );
  }
}
