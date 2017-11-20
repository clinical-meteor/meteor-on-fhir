import { CardText, CardTitle } from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import {blue600, gray600, green600, orange600, red600, yellow600} from 'material-ui/styles/colors';

import ActionInfo from 'material-ui/svg-icons/action/info';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import { AddPostToConversation } from   '/imports/ui/workflows/conversations/AddPostToConversation';
import Archive from 'material-ui/svg-icons/content/archive';
import Avatar from 'material-ui/Avatar';
import Block from 'material-ui/svg-icons/content/block';
import Clear from 'material-ui/svg-icons/content/clear';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import ContentPaste from 'material-ui/svg-icons/content/content-paste';
import { ConversationPosts } from       '/imports/ui/workflows/conversations/ConversationPosts';
import Divider from 'material-ui/Divider';
import { DynamicSpacer } from '/imports/ui/components/DynamicSpacer';
import Error from 'material-ui/svg-icons/alert/error';
import ErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import Flag from 'material-ui/svg-icons/content/flag';
import Glass from '/imports/ui/Glass';
import { GlassCard } from '/imports/ui/components/GlassCard';
import Mail from 'material-ui/svg-icons/content/mail';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import RemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline';
import Report from 'material-ui/svg-icons/content/report';
import Subheader from 'material-ui/Subheader';
import { Topics } from '/imports/api/topics/topics';
import Unarchive from 'material-ui/svg-icons/content/unarchive';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import Warning from 'material-ui/svg-icons/alert/warning';

export class NotificationsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  getMeteorData() {
    let data = {
      style: {
        notification: Glass.darkroom({borderTop: '1px solid lightgray'}),
        title: Glass.darkroom()
      },
      notifications: []
    };

    var user = Meteor.user();
    if(user && user.profile && user.profile.notifications){
      data.notifications = user.profile.notifications;
    }

    return data;
  }


  onNotificationClick(message){
    console.log('lets try to remove this item...', message);
    Meteor.call('removeSpecificNotification', message)
  }
  render() {
    var self = this;
    var notificationItems = [];
    this.data.notifications.forEach(function(notification){
      // let notificationIcon;
      // if(notification.type === 'message'){

      // }

      let newNotification = <ListItem
        leftAvatar={<Avatar icon={<Warning />} backgroundColor={yellow600} />}
        rightIcon={<Clear />}
        primaryText={notification.primaryText}
        secondaryText={notification.secondaryText}
        style={self.data.style.notification}
        onClick={self.onNotificationClick.bind(this, notification.primaryText)}
      />;

      notificationItems.push(newNotification);
    });

    return (
      <div id='conversationsPage' >
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle title="Notifications" titleStyle={this.data.style.title} />
            <CardText>
              <List>
              <Subheader inset={true}>Files</Subheader>
                {notificationItems}
                
                {/*
                <ListItem
                  leftAvatar={<Avatar icon={<ContentCopy />} backgroundColor={green600} />}
                  rightIcon={<Clear />}
                  primaryText="Record copied"
                  secondaryText="Jan 20, 2014"
                  style={this.data.style.notification}
                />
                <ListItem
                  leftAvatar={<Avatar icon={<Warning />} backgroundColor={yellow600} />}
                  rightIcon={<Clear />}
                  primaryText="Medication warning"
                  secondaryText="Jan 10, 2014"
                  style={this.data.style.notification}
                />
                <ListItem
                  leftAvatar={<Avatar icon={<AddCircleOutline />} backgroundColor={green600} />}
                  rightIcon={<Clear />}
                  primaryText="New clinical note"
                  secondaryText="Jan 10, 2014"
                  style={this.data.style.notification}
                />
                <ListItem
                  leftAvatar={<Avatar icon={<Archive />} backgroundColor={green600} />}
                  rightIcon={<Clear />}
                  primaryText="Archive export"
                  secondaryText="Jan 10, 2014"
                  style={this.data.style.notification}
                />


                <ListItem
                  leftAvatar={<Avatar icon={<Mail />} backgroundColor={orange600} />}
                  rightIcon={<Clear />}
                  primaryText="Unencrypted email"
                  secondaryText="Jan 10, 2014"
                  style={this.data.style.notification}
                />
                <ListItem
                  leftAvatar={<Avatar icon={<ContentPaste />} backgroundColor={green600} />}
                  rightIcon={<Clear />}
                  primaryText="Record copied"
                  secondaryText="Jan 10, 2014"
                  style={this.data.style.notification}
                />
                <ListItem
                  leftAvatar={<Avatar icon={<RemoveCircleOutline />} backgroundColor={green600} />}
                  rightIcon={<Clear />}
                  primaryText="Record removed"
                  secondaryText="Jan 10, 2014"
                  style={this.data.style.notification}
                />
                <ListItem
                  leftAvatar={<Avatar icon={<Report />} backgroundColor={red600} />}
                  rightIcon={<Clear />}
                  primaryText="Report!"
                  secondaryText="Jan 10, 2014"
                  style={this.data.style.notification}
                />
                <ListItem
                  leftAvatar={<Avatar icon={<Flag />} backgroundColor={orange600} />}
                  rightIcon={<Clear />}
                  primaryText="Flagged"
                  secondaryText="Jan 10, 2014"
                  style={this.data.style.notification}
                />
                <ListItem
                  leftAvatar={<Avatar icon={<Block />} backgroundColor={red600} />}
                  rightIcon={<Clear />}
                  primaryText="Blocked!"
                  secondaryText="Jan 10, 2014"
                  style={this.data.style.notification}
                />
                <ListItem
                  leftAvatar={<Avatar icon={<Unarchive />} backgroundColor={green600} />}
                  rightIcon={<Clear />}
                  primaryText="Unarchived"
                  secondaryText="Jan 10, 2014"
                  style={this.data.style.notification}
                />*/}

              </List>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}


ReactMixin(NotificationsPage.prototype, ReactMeteorData);
