import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { browserHistory } from 'react-router';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

export class AuthenticatedNavigation extends React.Component {
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


    if (Meteor.user()) {
      const user = Meteor.user();
      const name = user && user.profile ? user.profile.name : '';
      data.user = `${name.given} ${name.family}`;
    } else {
      data.user = "";
    }

    return data;
  };
  handleLogout() {
    Meteor.logout(() => browserHistory.push('/login'));
  };
  userName() {
    return this.data.user;
  };
  render () {
    return(
      <div>
        <Nav pullRight>
          <NavDropdown eventKey={ 4 } title={ this.data.user } id="basic-nav-dropdown" style={this.data.listItem} >
            <MenuItem eventKey={ 4.1 } onClick={ this.handleLogout }>Logout</MenuItem>
          </NavDropdown>
        </Nav>
        <Nav pullRight>
          <IndexLinkContainer to="/dashboard">
            <NavItem eventKey={ 1 } href="/dashboard" style={this.data.listItem} >Dashboard</NavItem>
          </IndexLinkContainer>
          <IndexLinkContainer to="/">
            <NavItem eventKey={ 2 } href="/" style={this.data.listItem} >Index</NavItem>
          </IndexLinkContainer>
          <LinkContainer to="/documents">
            <NavItem eventKey={ 3 } href="/documents" style={this.data.listItem} >Documents</NavItem>
          </LinkContainer>
        </Nav>
      </div>

    );
  }
}
AuthenticatedNavigation.propTypes = {

};
AuthenticatedNavigation.defaultProps = {

};
ReactMixin(AuthenticatedNavigation.prototype, ReactMeteorData);
