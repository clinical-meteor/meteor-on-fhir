import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { VerticalCanvas } from           '/imports/ui/components/VerticalCanvas';
import { AddPostToConversation } from   '/imports/ui/workflows/conversations/AddPostToConversation';
import { ConversationPosts } from       '/imports/ui/workflows/conversations/ConversationPosts';
import { CardTitle, CardText } from 'material-ui/Card';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { DynamicSpacer } from '/imports/ui/components/DynamicSpacer';

import { Topics } from '/imports/api/topics/topics';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {blue600, yellow600, green600, gray600, orange600, red600} from 'material-ui/styles/colors';

import Error from 'material-ui/svg-icons/alert/error';
import ErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import Warning from 'material-ui/svg-icons/alert/warning';

import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import Archive from 'material-ui/svg-icons/content/archive';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import ContentPaste from 'material-ui/svg-icons/content/content-paste';
import Report from 'material-ui/svg-icons/content/report';
import RemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline';
import Unarchive from 'material-ui/svg-icons/content/unarchive';
import Mail from 'material-ui/svg-icons/content/mail';
import Block from 'material-ui/svg-icons/content/block';
import Flag from 'material-ui/svg-icons/content/flag';
import Clear from 'material-ui/svg-icons/content/clear';
import ActionInfo from 'material-ui/svg-icons/action/info';

import Glass from '/imports/ui/Glass';


export class NotificationsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  getMeteorData() {
    let data = {
      style: {
        notification: Glass.darkroom({borderTop: '1px solid lightgray'}),
        title: Glass.darkroom()
      }
    };

    return data;
  }



  render() {
    return (
      <div id='conversationsPage' >
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle title="Notifications" titleStyle={this.data.style.title} />
            <CardText>
              <List>
              <Subheader inset={true}>Files</Subheader>
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
                />

              </List>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}


ReactMixin(NotificationsPage.prototype, ReactMeteorData);
