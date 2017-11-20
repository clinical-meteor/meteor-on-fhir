import React  from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { CardTitle, CardText, CardActions } from 'material-ui/Card';
import { GlassCard } from '/imports/ui/components/GlassCard';

import RaisedButton from 'material-ui/RaisedButton';
import { Bert } from 'meteor/themeteorchef:bert';
import { removePost } from '/imports/api/posts/methods';

import { DynamicSpacer } from '/imports/ui/components/DynamicSpacer';

import { Meteor } from 'meteor/meteor';

export class ConversationPosts extends React.Component {
  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        overflowY: 'scroll',
        WebkitTransform: 'translate3d(0px,0px,0px)',
        WebkitOverflowScrolling: 'touch',
        opacity: Session.get('globalOpacity')
      },
      state: {
        checkbox: false,
        canManagePost: false
      },
      posts: []
    };

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

    // this could be another mixin
    if (Session.get('backgroundBlurEnabled')) {
      data.style.backdropFilter = 'blur(5px)';
    }

    // another mixin
    if (Session.get('appWidth') > 768) {
      Session.set('hasPageVerticalPadding', true);
      Session.set('mainPanelIsCard', true);
    } else {
      Session.set('hasPageVerticalPadding', false);
      Session.set('mainPanelIsCard', false);
    }

    if (Posts.find({
      topicId: this.props.topicId
    }).count() > 0) {
      data.posts = Posts.find({
        topicId: this.props.topicId
      },{sort: {createdAt: 1}}).fetch();
    }

    //console.log('data.posts', data.posts);

    return data;
  }

  render () {
    let self = this;

    return(
      <div className="conversation">
        {this.data.posts.map(function(item, i){
          let createdAt = '';
          let createdBy = '';
          let createdByAvatar = '/thumbnail-blank.png'; //https://media.licdn.com/mpr/mpr/shrink_100_100/AAEAAQAAAAAAAAKeAAAAJDJkM2RmNTMzLWI4OGUtNDZmOC1iNTliLWYwOTc1ZWM0YmIyZg.jpg
          if (item.createdAt) {
            createdAt = moment(item.createdAt).format('YYYY, MMMM Do (dddd) hh:mm a');
          }
          if (item.createdBy && item.createdBy.display) {
            createdBy = item.createdBy.display;
          }
          if (item.createdBy && item.createdBy.avatar) {
            createdByAvatar = item.createdBy.avatar;
          }
          return (
            <div className="conversationPostCard" key={i}>
              <GlassCard>
                <CardTitle
                  avatar={createdByAvatar}
                  title={createdBy}
                  subtitle={createdAt}
                />

                <CardText className='postText'>
                  { item.title}
                </CardText>
                { self.renderCardActions(i, item) }

              </GlassCard>
              <DynamicSpacer />
            </div>

          );
        })}

      </div>
    );
  }

  renderCardActions(i, item){
    if (item && item.createdBy && item.createdBy.reference) {
      if (item.createdBy.reference === Meteor.userId()) {
        return (
          <CardActions>
            <RaisedButton className='deleteButton' onMouseUp={this.handleDeleteButton.bind(self, i, item)} label='Delete' style={{color: 'lightgray'}} />
          </CardActions>
        );
      }
    }
  }

  handleDeleteButton(index, post){
    removePost.call({
      _id: post._id
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Post removed!', 'success');
      }
    });
  }
}


ReactMixin(ConversationPosts.prototype, ReactMeteorData);
