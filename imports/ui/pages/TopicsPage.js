
import React  from 'react';
import ReactMixin  from 'react-mixin';

import { ReactMeteorData } from 'meteor/react-meteor-data';
import Spacer from              '/imports/ui/components/Spacer';
import { PageContainer } from   '/imports/ui/components/PageContainer';
import { AddPostToTopic } from  '/imports/ui/workflows/topics/AddPostToTopic';
import PostsDeck  from          '/imports/ui/workflows/posts/PostsDeck';


export class TopicsPage extends React.Component {
  getMeteorData() {
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
  render() {
    return (
      <div id='topicsPage'>
        <PageContainer>
          <AddPostToTopic />
          <Spacer />
          <PostsDeck />
        </PageContainer>
      </div>
    );
  }
}


TopicsPage.propTypes = {};
ReactMixin(TopicsPage.prototype, ReactMeteorData);
