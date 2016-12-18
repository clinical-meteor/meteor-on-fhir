import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { VerticalCanvas } from           '/imports/ui/components/VerticalCanvas';
import { AddPostToConversation } from   '/imports/ui/workflows/conversations/AddPostToConversation';
import { ConversationPosts } from       '/imports/ui/workflows/conversations/ConversationPosts';
import { CardTitle } from 'material-ui/Card';
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
      <div id='conversationsPage' >
        <VerticalCanvas>
          <GlassCard>
            <CardTitle className='description' title={this.data.state.topicName} />
          </GlassCard>
          <DynamicSpacer />
          <ConversationPosts topicId={this.props.routeParams.topicId} />
          <AddPostToConversation topicId={this.props.routeParams.topicId} />
        </VerticalCanvas>
      </div>
    );
  }
}



ConversationsPage.propTypes = {};
ReactMixin(ConversationsPage.prototype, ReactMeteorData);
