import { CardTitle, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import ReactMixin from 'react-mixin';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { removePost } from '/imports/api/posts/methods.js';
import { DynamicSpacer } from '/imports/ui/components/DynamicSpacer';

import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

export default class PostsDeck extends React.Component {
  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      state: {
        checkbox: false
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

    if (this.props.userId) {
      if (Posts.find({'createdBy.reference': this.props.userId}).count() > 0) {
        data.posts = Posts.find({'createdBy.reference': this.props.userId},{sort: {createdAt: -1}}).fetch();
      }
    } else {
      if (Posts.find({'createdBy.reference': Meteor.userId()}).count() > 0) {
        data.posts = Posts.find({'createdBy.reference': Meteor.userId()},{sort: {createdAt: -1}}).fetch();
      }
    }

    //console.log('data.posts', data.posts);

    return data;
  }

  render () {
    let self = this;

    return(
      <div className='postDeck'>
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
            <div className='postCard' key={i}>
              <GlassCard>
                <CardTitle
                  avatar={createdByAvatar}
                  title={createdBy}
                  subtitle={createdAt}
                />

                <CardText className="postTitle">
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



  handleDeleteButton(index, post){
    console.log('handleDeleteButton');

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

  renderCardActions(i, item){
    if (item && item.createdBy && item.createdBy.reference) {
      if (item.createdBy.reference === Meteor.userId()) {
        return (
          <CardActions>
            <RaisedButton className='deleteButton' primary={true} onMouseUp={this.handleDeleteButton.bind(self, i, item)} label='Delete' style={{color: 'lightgray'}} />
          </CardActions>
        );
      }
    }
  }

}



ReactMixin(PostsDeck.prototype, ReactMeteorData);
