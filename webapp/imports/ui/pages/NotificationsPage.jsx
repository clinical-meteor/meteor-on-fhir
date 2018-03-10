import {List, ListItem} from 'material-ui/List';
import {blue600, gray600, green600, orange600, red600, yellow600} from 'material-ui/styles/colors';
import { GlassCard, Glass, DynamicSpacer, VerticalCanvas } from 'meteor/clinical:glass-ui';
import { CardHeader, CardText, CardTitle } from 'material-ui/Card';

import ActionInfo from 'material-ui/svg-icons/action/info';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import Archive from 'material-ui/svg-icons/content/archive';
import Avatar from 'material-ui/Avatar';
import Block from 'material-ui/svg-icons/content/block';
import Clear from 'material-ui/svg-icons/content/clear';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import ContentPaste from 'material-ui/svg-icons/content/content-paste';
import Divider from 'material-ui/Divider';
import Error from 'material-ui/svg-icons/alert/error';
import ErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import Flag from 'material-ui/svg-icons/content/flag';
import Mail from 'material-ui/svg-icons/content/mail';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import RemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline';
import Report from 'material-ui/svg-icons/content/report';
import Subheader from 'material-ui/Subheader';
import Unarchive from 'material-ui/svg-icons/content/unarchive';
import Warning from 'material-ui/svg-icons/alert/warning';
import { Session } from 'meteor/session';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { get } from 'lodash';

const sampleNotifications = [{
  primaryText:"Record copied",
  secondaryText:"Jan 20, 2014",                
  icon: 'ContentCopy',
  color: 'green600'
},
{
  primaryText:"Medication warning",
  secondaryText:"Jan 10, 2014",             
  icon: 'Warning',
  color: 'yellow600'
},
{
  primaryText:"New clinical note",
  secondaryText:"Jan 10, 2014",             
  icon: 'AddCircleOutline',
  color: 'green600'
},
{
  primaryText:"Archive export",
  secondaryText:"Jan 10, 2014",             
  icon: 'Archive',
  color: 'green600'
},
{
  primaryText:"Unencrypted email",
  secondaryText:"Jan 10, 2014",             
  icon: 'Mail',
  color: 'orange600'
},              
{
  primaryText:"Record copied",
  secondaryText:"Jan 10, 2014",             
  icon: 'ContentPaste',
  color: 'green600'
},              
{
  primaryText:"Record removed",
  secondaryText:"Jan 10, 2014",             
  icon: 'RemoveCircleOutline',
  color: 'green600'
},      
{
  primaryText: "Report!",
  secondaryText: "Jan 10, 2014",             
  icon: 'Report',
  color: 'red600'
},
{
  primaryText: "Report!",
  secondaryText: "Jan 10, 2014",             
  icon: 'Flag',
  color: 'orange600'
},
{
  primaryText: "Blocked!",
  secondaryText: "Jan 10, 2014",             
  icon: 'Block',
  color: 'red600'
},
{
  primaryText: "Unarchive",
  secondaryText: "Jan 10, 2014",             
  icon: 'Unarchive',
  color: 'green600'
}];



Session.setDefault('catchDialogOpen', false);

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
      catchDialog: {
        open: false,
        patient: {
          display: '',
          reference: ''
        }
      },
      notifications: sampleNotifications
    };

    // if(Session.get('catchDialogOpen')){
    //   data.catchDialog.open = Session.get('catchDialogOpen');
    // }


    if(get(Meteor.user(), 'profile.notifications')){
      data.notifications = get(Meteor.user(), 'profile.notifications');
    }
    if(get(Meteor.user(), 'profile.inbox')){
      data.catchDialog.open = get(Meteor.user(), 'profile.inbox');
    }

    return data;
  }


  onNotificationClick(message){
    console.log('lets try to remove this item...', message);
    Meteor.call('removeSpecificNotification', message)
  }
  handleCloseCatch(){
    // Session.set('catchDialogOpen', false);
    Meteor.users.update({_id: Meteor.userId()}, {$set: {
      'profile.inbox': false
    }});

  }  

  render() {
    var self = this;
    var notificationItems = [];
    this.data.notifications.forEach(function(notification, index){
      // let notificationIcon;
      // if(notification.type === 'message'){

      // }

      let newNotification = <ListItem
        key={index}
        leftAvatar={<Avatar icon={<Warning />} backgroundColor={yellow600} />}
        rightIcon={<Clear />}
        primaryText={notification.primaryText}
        secondaryText={notification.secondaryText}
        style={self.data.style.notification}
        onClick={self.onNotificationClick.bind(this, notification.primaryText)}
      />;

      notificationItems.push(newNotification);
    });

    const catchActions = [
      <FlatButton
        label="Accept"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleCloseCatch}
      />,
      <FlatButton
        label="Dismiss"
        primary={true}
        onTouchTap={this.handleCloseCatch}
      />
    ];

    console.log('notificationItems', notificationItems);

    return (
      <div id='notificationsPage' >
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle title="Notifications" titleStyle={this.data.style.title} />
            <CardText>
              <List>
                {notificationItems}
                <Dialog
                  title="Catch!"
                  actions={catchActions}
                  modal={false}
                  open={this.data.catchDialog.open}
                  onRequestClose={this.handleCloseCatch}
                >
                    <CardHeader title="Incoming Patient Chart" />
                    <CardText>
                      Patient Chart
                    </CardText>
                </Dialog>




              
              </List>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}


ReactMixin(NotificationsPage.prototype, ReactMeteorData);
export default NotificationsPage;