import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { AddForumTopic } from   '/imports/ui/workflows/forums/AddForumTopic';
import { VerticalCanvas } from   '/imports/ui/components/VerticalCanvas';
import { GlassCard } from       '/imports/ui/components/GlassCard';
import Spacer from              '/imports/ui/components/Spacer';
import { ForumTopicsTable } from    '/imports/ui/workflows/forums/ForumTopicsTable';



export class NewTopicPage extends React.Component {
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
      <div id="newTopicPage">
        <VerticalCanvas>
          <AddForumTopic />
        </VerticalCanvas>
      </div>
    );
  }
}


NewTopicPage.propTypes = {
  children: React.PropTypes.any
};
ReactMixin(NewTopicPage.prototype, ReactMeteorData);
