import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { CardTitle, CardText } from 'material-ui/Card';
import { FormGroup } from 'react-bootstrap';
import Input  from 'react-toolbox/lib/input';

import { Bert } from 'meteor/themeteorchef:bert';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { insertTopic } from '/imports/api/topics/methods';
import { insertPost } from '/imports/api/posts/methods';

import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';

Session.setDefault('topicName', false);
Session.setDefault('postContent', false);

export class AddForumTopic extends React.Component {
  getMeteorData() {
    let data = {
      style: {},
      state: {
        topicName: '',
        postContent: ''
      }
    };

    if (Session.get('topicName')) {
      data.state.topicName = Session.get('topicName');
    }
    if (Session.get('postContent')) {
      data.state.postContent = Session.get('postContent');
    }

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

  handleInsertPost(){

    console.log("handleInsertPost");


    let newTopic = {
      name: this.refs.topicName.refs.input.value.trim(),
      createdAt: new Date(),
      createdBy: {
        display: Meteor.user().fullName(),
        reference: Meteor.userId()
      }
    };

    if (Meteor.user().profile && Meteor.user().profile.avatar) {
      newTopic.createdBy.avatar = Meteor.user().profile.avatar;
    }

    insertTopic.call(newTopic, (error, topicId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      if (topicId) {
        Bert.alert('Topic added!', 'success');
        console.log("topicId", topicId);

        let newPost = {
          topicId: topicId,
          title: this.refs.postContent.refs.input.value.trim(),
          createdAt: new Date(),
          createdBy: {
            display: Meteor.user().fullName(),
            reference: Meteor.userId()
          }
        };
        if (Meteor.user().profile && Meteor.user().profile.avatar) {
          newPost.createdBy.avatar = Meteor.user().profile.avatar;
        }

        console.log("newPost", newPost);

        insertPost.call(newPost, (error) => {
          if (error) {
            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert('Post added!', 'success');
            Session.set('topicName', false);
            Session.set('postContent', false);
            browserHistory.push('/topic/' + topicId);
          }
        });
      }
    });


    //}
  }
  render(){
    return(
      <GlassCard>
        <CardTitle
          title='New Forum Topic'
        />
        <CardText>
          <FormGroup>
            <Input
              label='Topic description'
              name='topicName'
              ref='topicName'
              type='textarea'
              value={this.data.state.topicName}
              onChange={this.changeTopic.bind(this)}
              />
            <Input
              multiline
              label='Post content'
              name='postContent'
              ref='postContent'
              type='textarea'
              value={this.data.state.postContent}
              onChange={this.changePost.bind(this)}
              rows='5'
              />
              <RaisedButton onMouseUp={ this.handleInsertPost.bind(this) } primary={true} label='New Topic' />

          </FormGroup>
        </CardText>
      </GlassCard>
    );
  }

  changeTopic(){
    Session.set('topicName', this.refs.topicName.refs.input.value);
  }

  changePost(){
    Session.set('postContent', this.refs.postContent.refs.input.value);
  }
}


ReactMixin(AddForumTopic.prototype, ReactMeteorData);
