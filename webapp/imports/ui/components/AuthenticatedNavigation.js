import {ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import { CardText } from 'material-ui/Card';
import Glass from '/imports/ui/Glass';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';

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
      },
      glassText : Glass.darkroom({
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        top: '-5px',
        cursor: 'pointer'
      }),
      glassTextIcon : Glass.darkroom({
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        cursor: 'pointer'
      })
    };


    if (Meteor.user()) {
      data.user = Meteor.user().fullName();
    } else {
      data.user = '';
    }

    console.log("AuthenticatedNavigation[data]", data);


    return data;
  }

  userName() {
    return this.data.user;
  }

  openNotifications(){
    browserHistory.push('/notifications');
  }
  render () {
    return(
      <div id='authenticatedUserMenuToggle' onTouchTap={this.toggleNotificationMenu } style={this.data.glassText}>
        <ToolbarGroup >

          <IconMenu
            id='authenticatedUserMenu'
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            open={false}
            iconButtonElement={
              <div>
                <IconButton touch={true} style={this.data.glassTextIcon}>
                  <ActionAccountCircle onClick={this.openNotifications} />
                </IconButton>
                <ToolbarTitle
                  id='authenticatedUsername'
                  text={ this.data.user }
                  style={this.data.glassText}
                  onTouchTap={this.showProfile }
                />
              </div>
            }
          >
          </IconMenu>

        </ToolbarGroup>
      </div>
    );
  }

  handleLogout() {
    Meteor.logout(() => browserHistory.push('/signin'));
  }

  showProfile() {
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


ReactMixin(AuthenticatedNavigation.prototype, ReactMeteorData);
