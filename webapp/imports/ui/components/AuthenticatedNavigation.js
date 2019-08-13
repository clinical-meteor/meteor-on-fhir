import {ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import AvVideoCall from 'material-ui/svg-icons/av/video-call';
import { CardText } from 'material-ui/Card';
import { Glass } from 'meteor/clinical:glass-ui';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';
import { get } from 'lodash';
import MenuButton from '/imports/ui/components/MenuButton';
import NorthEastMenu from '/imports/ui/components/NorthEastMenu';


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
      }),
      notifications: [],
      notificationCount: 0,
      notificationColor: 'green',
      isIncomingCall: false
    };

    if (Meteor.user()) {
      data.user = Meteor.user().fullName();

      if(get(Meteor.user(), 'profile.notifications')){
        data.notifications = get(Meteor.user(), 'profile.notifications', []);  
        data.notificationCount = data.notifications.length;   
      }
    } else {
      data.user = '';
    }

    // data.style.glassText = Glass.blur(data.style.glassText);

    if (Session.get('glassBlurEnabled')) {
      data.glassText.filter = 'blur(3px)';
      data.glassText.WebkitFilter = 'blur(3px)';
    }

    if(data.notificationCount > 0){
      data.notificationColor = 'orange';
      if(data.notifications){
        data.notifications.forEach(function(notification){
          if(notification.type == 'videocall'){
            data.isIncomingCall = true;
          }
        });          
      }
    }
    (process.env.NODE_ENV === 'test') && console.log("AuthenticatedNavigation[data]", data);

    return data;
  }

  userName() {
    return this.data.user;
  }

  openNotifications(){
    // not every wants the notification menu, so we make sure it's configurable in the Meteor.settings file
    if(get(Meteor, 'settings.public.defaults.notificationMenu')){
      browserHistory.push('/notifications');
    }    
  }
  render () {
    var currentIcon;

    if(this.data.isIncomingCall){
      currentIcon = <AvVideoCall onClick={this.openNotifications} style={{color: this.data.notificationColor}} />            
    } else {
      currentIcon = <ActionAccountCircle onClick={this.openNotifications} style={{color: this.data.notificationColor}} />      
    }

    return(
      <div id='authenticatedUserMenuToggle' onClick={this.toggleNotificationMenu } style={this.data.glassText}>
        <ToolbarGroup >
          <IconMenu
            id='authenticatedUserMenu'
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            open={false}
            iconButtonElement={
              <NorthEastMenu>
                <ToolbarTitle
                  id='notificationCount'
                  text={ this.data.notificationCount.toString() }
                  style={this.data.glassText}
                  
                />
                <IconButton touch={true} style={this.data.glassTextIcon} onClick={this.toggleSearch}>
                  { currentIcon }
                </IconButton>
                <ToolbarTitle
                  id='authenticatedUsername'
                  text={ this.data.user }
                  style={this.data.glassText}
                  onClick={this.showProfile }
                />
              </NorthEastMenu>
            }
          >
          </IconMenu>
        </ToolbarGroup>
      </div>
    );
  }

  handleLogout() {
    Meteor.logout(function(){      
      browserHistory.push('/signin');
    });
  }

  toggleSearch(){
    console.log('toggleSearch')    
  }
  showProfile() {
    browserHistory.push('/myprofile');
  }

  toggleNotificationMenu(){
    // console.log("showNotificationMenu", Session.get('showNotificationMenu'));
    Session.toggle('showNotificationMenu');
  }
}

ReactMixin(AuthenticatedNavigation.prototype, ReactMeteorData);
export default AuthenticatedNavigation;