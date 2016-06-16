import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData, createContainer } from 'meteor/react-meteor-data';

import style from './appbar';

import AppBar from 'react-toolbox/lib/app_bar';
import Checkbox from 'react-toolbox/lib/checkbox';
import IconButton from 'react-toolbox/lib/button';

import Layout from '../layouts/Layout';
import NavDrawer from '../layouts/NavDrawer';
import Sidebar from '../layouts/Sidebar';
import Panel from '../layouts/Panel';
import { Header } from './Header';
import { Footer } from './Footer';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import User from '../../api/User';

Session.setDefault('backgroundImagePath', 'url(\"images\/ForestInMist.jpg\")');
Session.setDefault('backgroundColor', "#eeeeee");
Session.setDefault('darkroomEnabled', false);
Session.setDefault('glassBlurEnabled', false);
Session.setDefault('backgroundBlurEnabled', false);

Session.setDefault("drawerActive", false);
Session.setDefault("drawerPinned", false);
Session.setDefault("sidebarPinned", false);

export class GlassLayout extends React.Component {
  constructor(props) {
    super(props);
  };
  getMeteorData() {

    var currentUser = new User(Meteor.user());
    //console.log("currentUser", currentUser);
    //console.log("currentUser.fullName()", currentUser.fullName());

    let data = {
      state: {
        drawerActive: Session.get("drawerActive"),
        drawerPinned: Session.get("drawerPinned"),
        sidebarPinned: Session.get("sidebarPinned")
      },
      style: {
        "width": "100%",
        "height": "100%",
        "position": "absolute",
        "backgroundSize": "cover",
        "WebkitBackgroundSize": "cover",
        "MozBackgroundSize": "cover",
        "OBackgroundSize": "cover"
      },
      card: {
        title: "Please log in",
        subtitle: "no data",
        avatar: "https://placeimg.com/80/80/animals"
      }
    }

    if (Meteor.user()) {
      data.card.title = currentUser.fullName();
      if (Meteor.user().profile) {
        data.card.subtitle = Meteor.user().profile.birthdate;
        data.card.avatar = Meteor.user().profile.avatar;
      }
    }

    if (Session.get('backgroundColor')) {
      data.style.background = Session.get('backgroundColor');
    }

    if (Session.get('backgroundImagePath')) {
      data.style.WebkitBackgroundSize = "cover";
      data.style.MozBackgroundSize = "cover";
      data.style.OBackgroundSize = "cover";
      data.style.backgroundSize = "cover";
      data.style.backgroundImagePath = Session.get('backgroundImagePath');
    }

    return data;
  };
  toggleDrawerActive(){
    Session.toggle("drawerPinned")
  };
  toggleSidebar() {
    Session.toggle("sidebarPinned");
  };
  render(){

    return (
      <Layout>
        <NavDrawer active={this.data.state.drawerActive}
          pinned={this.data.state.drawerPinned} permanentAt='xxxl'
          onOverlayClick={ this.toggleDrawerActive }
          >

           <CardTitle
             avatar={this.data.card.avatar}
             title={this.data.card.title}
             subtitle={this.data.card.subtitle}
           />
           <List style={{paddingLeft: "20px", position: "absolute"}}>
             <IndexLinkContainer to="/myprofile" >
                <ListItem eventKey={ 1 } caption='My Profile' href="/myprofile" />
             </IndexLinkContainer>

             <IndexLinkContainer to="/dashboard">
                <ListItem eventKey={ 2 } caption='Dashboard' href="/dashboard" />
             </IndexLinkContainer>

             <IndexLinkContainer to="/weblog">
                <ListItem eventKey={ 3 } caption='Weblog' href="/weblog" />
             </IndexLinkContainer>

             <IndexLinkContainer to="/">
                <ListItem eventKey={ 4 } caption='Index' href="/" />
             </IndexLinkContainer>

             <IndexLinkContainer to="/documents">
                <ListItem eventKey={ 5 } caption='Documents' href="/documents" />
             </IndexLinkContainer>

             <IndexLinkContainer to="/users">
                <ListItem eventKey={ 6 } caption='Users' href="/users" />
             </IndexLinkContainer>

             <IndexLinkContainer to="/patients">
                <ListItem eventKey={ 7 } caption='Patients' href="/patients" />
             </IndexLinkContainer>

             <IndexLinkContainer to="/practitioners">
                <ListItem eventKey={ 8 } caption='Practitioners' href="/practitioners" />
             </IndexLinkContainer>

             <IndexLinkContainer to="/theming">
                <ListItem eventKey={ 9 } caption='Theming' href="/theming" />
             </IndexLinkContainer>

             <IndexLinkContainer to="/about">
                <ListItem eventKey={ 10 } caption='About' href="/about" />
             </IndexLinkContainer>

           </List>

        </NavDrawer>
        <Panel pinned={this.data.state.drawerPinned} >
          <div style={{ flex: 1, overflowY: 'auto', width: '100%' }}>
            {this.props.children}
          </div>
        </Panel>
        <Sidebar pinned={ this.data.state.sidebarPinned } width={ 5 }>
          <div><IconButton icon='close' onClick={ this.toggleSidebar }/></div>
          <div style={{ flex: 1 }}>
            <p>Supplemental content goes here.</p>
          </div>
        </Sidebar>
      </Layout>
    );
  };
}



GlassLayout.propTypes = {};
GlassLayout.defaultProps = {};
ReactMixin(GlassLayout.prototype, ReactMeteorData);
