import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { browserHistory } from 'react-router';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, Navbar } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import {Menu, IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';


Session.get('notificationMenuOpen', true)

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
      },
      state: {
        notificationMenuOpen: Session.get('notificationMenuOpen')
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
  userName() {
    return this.data.user;
  };
  render () {
    return(
      <div>
        <Nav pullRight>

          <NavItem id="authenticatedNavDropdown" eventKey={ 4 } id="authenticatedUsername" onClick={this.toggleNotificationMenu} >
            { this.data.user }
          </NavItem>
        </Nav>
        <Nav id="authenticatedUserMenu" pullRight>
          <IconMenu active={ this.data.state.notificationMenuOpen } eventKey={ 4 } title={ this.data.user } icon='whatshot' position='top-right' menuRipple>
            <List selectable ripple outline className="notificationMenu">
                <ListItem
                  avatar='https://dl.dropboxusercontent.com/u/2247264/assets/m.jpg'
                  caption='Dr. Manhattan'
                  legend="Jonathan 'Jon' Osterman"
                  rightIcon='done block'
                />
                <ListItem
                  avatar='https://dl.dropboxusercontent.com/u/2247264/assets/o.jpg'
                  caption='Ozymandias'
                  legend='Adrian Veidt'
                  rightIcon='done block'
                />
                <ListItem
                  avatar='https://dl.dropboxusercontent.com/u/2247264/assets/r.jpg'
                  caption='Rorschach'
                  legend='Walter Joseph Kovacs'
                  rightIcon='done block'
                />
                <ListDivider />
                <ListItem className="profileMenuItem" leftIcon='face' eventKey={ 4.1 } onClick={ this.handleProfile } caption='Profile' />
                <ListItem id="logoutMenuItem" className="logoutMenuItem" leftIcon='power_settings_new' eventKey={ 4.2 } onClick={ this.handleLogout } caption='Logout' />
              </List>
            </IconMenu>

        </Nav>
      </div>

    );
  };
  handleLogout() {
    Meteor.logout(() => browserHistory.push('/login'));
  };
  handleProfile() {
    browserHistory.push('/myprofile');
  };
  toggleNotificationMenu(){
    if (Session.get('notificationMenuOpen')) {
      Session.set('notificationMenuOpen', false);
    } else {
      Session.set('notificationMenuOpen', true);
    }
    $('#authenticatedUserMenu .material-icons')[0].click()
  };

}
AuthenticatedNavigation.propTypes = {

};
AuthenticatedNavigation.defaultProps = {

};
ReactMixin(AuthenticatedNavigation.prototype, ReactMeteorData);
