import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { IndexLinkContainer } from 'react-router-bootstrap';
import FlatButton from 'material-ui/FlatButton';

export class PublicNavigation extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        title: {
          color: 'black',
          cursor: 'pointer'
        }
      }
    };

    return data;
  }

  render () {
    return(
      <div id="publicNavigation">
        <IndexLinkContainer to="signup">
          <FlatButton id='loginLink' label="Login" style={this.data.style.title} href='/login' />
        </IndexLinkContainer>
        <IndexLinkContainer to="login">
          <FlatButton id='signupLink' label="Register" style={this.data.style.title} href='/signup' />
        </IndexLinkContainer>
      </div>
    );
  }
}

ReactMixin(PublicNavigation.prototype, ReactMeteorData);
