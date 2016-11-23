import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { handleLogin } from '/imports/modules/handleLogin';

import { PageContainer } from '/imports/ui/components/PageContainer';
import { MobilePadding } from '/imports/ui/components/MobilePadding';


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
                <h4 className="page-header" style={{color: "white"}}>Login</h4>
                <form ref="login" className="login" onSubmit={ this.handleSubmit }>
                  <FormGroup>
                    <ControlLabel style={{color: "white"}}>Email Address</ControlLabel>
                    <FormControl
                      type="email"
                      ref="emailAddress"
                      name="emailAddress"
                      placeholder="Email Address"
                    />
                  </FormGroup>
                  <FormGroup>
                    <ControlLabel>
                      <span className="pull-left" style={{color: "white"}}>Password</span>
                      <Link className="pull-right" to="/recover-password" style={{color: "white", marginRight: "10px"}}> ( Forgot )</Link>
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
