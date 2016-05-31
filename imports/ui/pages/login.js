import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { handleLogin } from '../../modules/Login';

import { PageContainer } from '../components/PageContainer';
import { MobilePadding } from '../components/MobilePadding';


export class Login extends React.Component {
  componentDidMount() {
    handleLogin({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div id="loginPage">
        <MobilePadding>
          <PageContainer>
                <h4 className="page-header">Login</h4>
                <form ref="login" className="login" onSubmit={ this.handleSubmit }>
                  <FormGroup>
                    <ControlLabel>Email Address</ControlLabel>
                    <FormControl
                      type="email"
                      ref="emailAddress"
                      name="emailAddress"
                      placeholder="Email Address"
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>
                      <span className="pull-left">Password</span>
                      <Link className="pull-right" to="/recover-password">Forgot Password?</Link>
                    </ControlLabel>
                    <FormControl
                      type="password"
                      ref="password"
                      name="password"
                      placeholder="Password"
                    />
                  </FormGroup>
                  <Button id="loginButton" type="submit" bsStyle="success">Login</Button>
                </form>

          </PageContainer>
        </MobilePadding>
      </div>
    );
  }
}
