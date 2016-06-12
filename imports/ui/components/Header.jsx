import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import AppBar from 'react-toolbox/lib/app_bar';
import Button from 'react-toolbox/lib/button';
import Drawer from 'react-toolbox/lib/drawer';
import IconButton from 'react-toolbox/lib/button';
import style from './appbar';

import { Link } from 'react-router';
import { PublicNavigation } from './PublicNavigation';
import { AuthenticatedNavigation } from './AuthenticatedNavigation';


export class Header extends React.Component {
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
        opacity: Session.get('globalOpacity'),
        zIndex: 100
      },
      westStyle: {
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        left: "0px",
        // height: "6.4rem",
        // bottom: "2.4rem"
      },
      eastStyle: {
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        right: "0px",
        height: "6.4rem",
        paddingLeft: "1.2rem",
        paddingRight: "1.2rem",
        paddingTop: "0.6rem"
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

    if (Meteor.user()) {
      data.hasUser = true;
    } else {
      data.hasUser = false;
    }

    return data;
  };
  toggleSidebar() {
    Session.toggle("sidebarPinned");
  };
  clickOnBackdropBlurButton(){
    Session.toggle('backgroundBlurEnabled');
  };
  toggleDrawerActive(){
    //if (Session.get('appWidth') > 1920) {
      Session.toggle("drawerPinned")
    //}
  };
  renderNavigation(hasUser) {
    if (hasUser) {
      return <AuthenticatedNavigation />;
    } else {
      return <PublicNavigation />;
    }
  };
  render () {
    return(
      <header className={style.appbar} flat style={this.data.style}>
        <IconButton icon='menu' floating accent onClick={ this.toggleDrawerActive } style={{zIndex:10000}}/>
        <h1 className={style.title} style={{paddingLeft: "20px"}}>FHIR Demo</h1>
        <div className="eastHeaderElements" style={this.data.eastStyle} >
          { this.renderNavigation(this.data.hasUser) }
        </div>
      </header>
    );
  }
}

Header.propTypes = {

};
Header.defaultProps = {

};
ReactMixin(Header.prototype, ReactMeteorData);
