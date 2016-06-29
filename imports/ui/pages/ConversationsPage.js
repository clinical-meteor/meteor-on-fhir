import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import Spacer from                      '/imports/ui/components/Spacer';
import { PageContainer } from           '/imports/ui/components/PageContainer';
import { AddPostToConversation } from   '/imports/ui/workflows/conversations/AddPostToConversation';
import { ConversationPosts } from       '/imports/ui/workflows/conversations/ConversationPosts';
import { CardTitle } from 'react-toolbox/lib/card';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { DynamicSpacer } from '/imports/ui/components/DynamicSpacer';

import { Topics } from '/imports/api/topics/topics';

export class ConversationsPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('Topic of conversation...', this.props.routeParams.topicId);

    Topics.update({_id: this.props.routeParams.topicId}, {$inc: { views: 1 }});
  }

  getMeteorData() {
    let data = {
      state: {
        topicName: ''
      }
    };

    let topic = Topics.findOne({_id: this.props.routeParams.topicId});
    if (topic) {
      data.state.topicName = topic.name;
    }

    return data;
  }

  render() {
    return (
      <div id='ConversationsPage'>
        <PageContainer>
          <GlassCard>
            <CardTitle title={this.data.state.topicName} />
          </GlassCard>
          <DynamicSpacer />
          <ConversationPosts topicId={this.props.routeParams.topicId} />
          <AddPostToConversation topicId={this.props.routeParams.topicId} />
        </PageContainer>
      </div>
    );
  }
}



ConversationsPage.propTypes = {};
ReactMixin(ConversationsPage.prototype, ReactMeteorData);
