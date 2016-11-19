import React from 'react';
import { Link } from 'react-router';
import TextField from 'material-ui/TextField';

import { Row, Col, Button } from 'react-bootstrap';

import { PageContainer } from '../components/PageContainer';
import { MobilePadding } from '../components/MobilePadding';

import { browserHistory } from 'react-router';

import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

export class Login extends React.Component {
  componentDidMount() {
  }

  handleSubmit(event) {
    event.preventDefault();
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
          <PageContainer>
                <h4 className="page-header" style={{color: "black"}}>Login</h4>
                <form ref="login" className="login">
                  <Col xs={ 6 } sm={ 6 }>
                    <Row>
                      <TextField
                        type="email"
                        ref="emailAddress"
                        name="emailAddress"
                        placeholder="Email Address"
                      />
                    </Row>
                    <Row>
                      <TextField
                        type="password"
                        ref="password"
                        name="password"
                        placeholder="Password"
                      />
                    </Row>
                    <Row>
                      <Button id="loginButton" onTouchTap={this.handleTouchTap.bind(this)} bsStyle="success">Login</Button><br/>
                      <Link to="/recover-password" style={{color: "black"}}>Forgot password?</Link>
                    </Row>
                  </Col>
                </form>

          </PageContainer>
        </MobilePadding>
      </div>
    );
  }
}
