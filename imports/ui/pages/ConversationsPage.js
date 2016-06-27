
import React  from 'react';
import ReactMixin  from 'react-mixin';
import { Navigation } from 'react-router';

import { ReactMeteorData } from 'meteor/react-meteor-data';
import Spacer from              '/imports/ui/components/Spacer';
import { PageContainer } from   '/imports/ui/components/PageContainer';
import { AddPostToConversation } from  '/imports/ui/workflows/conversations/AddPostToConversation';
import PostsDeck  from          '/imports/ui/workflows/posts/PostsDeck';


export class ConversationsPage extends React.Component {
  getMeteorData() {
    //console.log("getMeteorData() this.props", this.props);

    let data = {
      style: {}
    };

    // this should all be handled by props
    // or a mixin!
    if (Session.get('darkroomEnabled')) {
      data.style.color = 'black';
      data.style.background = 'white';
    } else {
      data.style.color = 'white';
      data.style.background = 'black';
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = 'blur(3px)';
      data.style.webkitFilter = 'blur(3px)';
    }

    return data;
  }
  // componentDidMount(){
  //   console.log("this.props.params.id", this.props.params.id);
  // }
  render() {
    //console.log("this.props", this.props);

    return (
      <div id='ConversationsPage'>
        <PageContainer>
          <AddPostToConversation />
          <Spacer />
          <PostDeck />
        </PageContainer>
      </div>
    );
  }
}


ConversationsPage.propTypes = {};
ReactMixin(ConversationsPage.prototype, ReactMeteorData);
