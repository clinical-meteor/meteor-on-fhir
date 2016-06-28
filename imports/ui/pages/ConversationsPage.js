import React  from 'react';
// import ReactMixin from 'react-mixin';
// import { ReactMeteorData } from 'meteor/react-meteor-data';

import Spacer from                      '/imports/ui/components/Spacer';
import { PageContainer } from           '/imports/ui/components/PageContainer';
import { AddPostToConversation } from   '/imports/ui/workflows/conversations/AddPostToConversation';
import { ConversationPosts } from       '/imports/ui/workflows/conversations/ConversationPosts';


export class ConversationsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //console.log("this.props", this.props);

    return (
      <div id='ConversationsPage'>
        <PageContainer>
          <AddPostToConversation topicId={this.props.routeParams.topicId} />
          <Spacer />
          <ConversationPosts topicId={this.props.routeParams.topicId} />
        </PageContainer>
      </div>
    );
  }
}
