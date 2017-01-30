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

export class NotificationsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  getMeteorData() {
    let data = {};

    return data;
  }



  render() {
    return (
      <div id='conversationsPage' >
        <VerticalCanvas>
          <GlassCard>
            <CardTitle title="Notifications" />
            <CardText>

            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}


ReactMixin(NotificationsPage.prototype, ReactMeteorData);
