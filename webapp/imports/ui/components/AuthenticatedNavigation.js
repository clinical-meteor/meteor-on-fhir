import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import {ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import { CardText} from 'material-ui/Card';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';

import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';

Session.get('showNotificationMenu', true);

let style = {
  username: {
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    top: '-5px',
    cursor: 'pointer'
  }
};

export class AuthenticatedNavigation extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        position: 'fixed',
        top: '0px',
        width: '100%',
        display: 'flex',
        // height: '6.4rem',
        alignItems: 'center',
        padding: '0 2.4rem',
        opacity: Session.get('globalOpacity')
      },
      listItem: {
        display: 'inline-block',
        position: 'relative'
      },
      state: {
        showNotificationMenu: Session.get('showNotificationMenu')
      }
    };


    if (Meteor.user()) {
      const user = Meteor.user();
      const name = user && user.profile ? user.profile.name : '';
      if (name.text) {
        data.user = name.text;
      } else {
        data.user = name.given + ' ' + name.family;
      }
    } else {
      data.user = '';
    }

    return data;
  }

  userName() {
    return this.data.user;
  }

  render () {
    return(
      <div id='authenticatedUserMenuToggle' onTouchTap={this.toggleNotificationMenu } onClick={this.toggleNotificationMenu } style={style.username}>
        <ToolbarGroup >

          <IconMenu
            id='authenticatedUserMenu'
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            open={!this.data.state.showNotificationMenu}
            iconButtonElement={
              <div>
                <IconButton touch={true}>
                  <ActionAccountCircle />
                </IconButton>
                <ToolbarTitle
                  id='authenticatedUsername'
                  text={ this.data.user }
                  style={style.username}
                  onTouchTap={this.toggleNotificationMenu }
                />
              </div>
            }
          >
            <MenuItem
              id='myProfileMenuItem'
              type="block"
              onTouchTap={ this.handleProfile }
              primaryText='Profile'
              leftIcon={<ActionAccountCircle />}
              />
            <MenuItem
              id='logoutMenuItem'
              type="block"
              onTouchTap={ this.handleLogout }
              leftIcon={<ActionExitToApp />}
              primaryText='Logout' />
          </IconMenu>

        </ToolbarGroup>
      </div>
    );
  }

  handleLogout() {
    Meteor.logout(() => browserHistory.push('/login'));
  }

  handleProfile() {
    browserHistory.push('/myprofile');
  }

  toggleNotificationMenu(){
    console.log("showNotificationMenu", Session.get('showNotificationMenu'));

    if (Session.get('showNotificationMenu')) {
      Session.set('showNotificationMenu', false);
    } else {
      Session.set('showNotificationMenu', true);
    }
  }
}
AuthenticatedNavigation.propTypes = {

};
AuthenticatedNavigation.defaultProps = {

};
ReactMixin(AuthenticatedNavigation.prototype, ReactMeteorData);
