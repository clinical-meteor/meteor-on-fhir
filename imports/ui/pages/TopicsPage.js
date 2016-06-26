import { PageContainer } from '/imports/ui/components/PageContainer';

import { ReactMeteorData } from 'meteor/react-meteor-data'
import React  from 'react'
import { Row, Col } from 'react-bootstrap'
import ReactMixin  from 'react-mixin'
import Spacer  from '../components/Spacer'
import DocumentsList  from '../containers/documents-list.js'
import PostsList  from '../containers/posts-list.js'
import PostsDeck  from '../workflows/posts/PostsDeck.js'
import { AddPostToTopic } from '../workflows/topics/AddPostToTopic.js'


export class TopicsPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {}
    }

    // this should all be handled by props
    // or a mixin!
    if (Session.get('darkroomEnabled')) {
      data.style.color = "black";
      data.style.background = "white";
    } else {
      data.style.color = "white";
      data.style.background = "black";
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = "blur(3px)";
      data.style.webkitFilter = "blur(3px)";
    }

    return data;
  }
  render() {
    return (
      <div id="topicsPage">
        <PageContainer>
          <AddPostToTopic />
          <Spacer />
          <PostsDeck />
        </PageContainer>
      </div>
    );
  }
}


TopicsPage.propTypes = {
  hasUser: React.PropTypes.object,
};
ReactMixin(TopicsPage.prototype, ReactMeteorData);
