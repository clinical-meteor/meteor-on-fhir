import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { IndexLinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

export class PublicNavigation extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        position: "fixed",
        top: "0px",
        width: "100%",
        display: "flex",
        // height: "6.4rem",
        alignItems: "center",
        padding: "0 2.4rem",
        opacity: Session.get('globalOpacity')
      },
      listItem: {
        display: "inline-block",
        position: "relative"
      }
    }

    return data;
  };
  render () {
    return(
      <Nav id="publicNavigation" pullRight>
        <IndexLinkContainer to="signup">
          <NavItem id="signupLink" eventKey={ 2 } href="/signup" style={this.data.listItem} >Sign Up</NavItem>
        </IndexLinkContainer>
        <IndexLinkContainer to="login">
          <NavItem id="loginLink" eventKey={ 3 } href="/login" style={this.data.listItem} >Log In</NavItem>
        </IndexLinkContainer>
      </Nav>
    );
  }
}
PublicNavigation.propTypes = {

};
PublicNavigation.defaultProps = {

};
ReactMixin(PublicNavigation.prototype, ReactMeteorData);
