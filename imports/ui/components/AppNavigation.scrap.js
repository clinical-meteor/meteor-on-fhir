import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import { PublicNavigation } from './PublicNavigation';
import { AuthenticatedNavigation } from './AuthenticatedNavigation';

export class AppNavigation extends React.Component {
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
      }
    }

    // this should all be handled by props
    // or a mixin!
    if (Session.get('darkroomEnabled')) {
      data.style.color = "black";
      data.style.background = "white";
    } else {
      data.style.color = "white";
      data.style.background = "black";
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = "blur(3px)";
      data.style.webkitFilter = "blur(3px)";
    }

    return data;
  }

  renderNavigation(hasUser) {
    if (hasUser) {
      return <AuthenticatedNavigation /> ;
    } else {
      return <PublicNavigation /> ;      
    }
  }

  render() {
    return (
      <Navbar style={this.data.style}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Application Name</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          { this.renderNavigation(this.props.hasUser) }
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

AppNavigation.propTypes = {
  hasUser: React.PropTypes.object,
};
ReactMixin(AppNavigation.prototype, ReactMeteorData);
