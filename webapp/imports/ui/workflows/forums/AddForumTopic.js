import React from 'react';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { ReactMeteorData } from 'meteor/react-meteor-data';
import { CardTitle, CardText } from 'material-ui/Card';
import { FormGroup } from 'react-bootstrap';


import { Bert } from 'meteor/themeteorchef:bert';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { insertTopic } from '/imports/api/topics/methods';
import { insertPost } from '/imports/api/posts/methods';

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
      name: Session.get('topicName'),
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
          title: Session.get('postContent'),
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
  }
  render(){
    return(
      <GlassCard>
        <CardTitle
          title='New Forum Topic'
        />
        <CardText>
          <FormGroup>
            <TextField
              id='topicDescriptionInput'
              ref='topicName'
              name='topicName'
              floatingLabelText='Topic description'
              defaultValue={this.data.state.topicName}
              onChange={this.changeTopic.bind(this)}
              fullWidth
              /><br/>
            <TextField
              id='postContentInput'
              ref='postContent'
              name='postContent'
              floatingLabelText='Post content'
              defaultValue={this.data.state.postContent}
              onChange={this.changePost.bind(this)}
              multiLine={true}
              rows={5}
              fullWidth
              /><br/>

              <RaisedButton id='newTopicButton' onMouseUp={ this.handleInsertPost.bind(this) } primary={true} label='New Topic' />

          </FormGroup>
        </CardText>
      </GlassCard>
    );
  }

  changeTopic(event, value){
    Session.set('topicName', value);
  }

  changePost(event, value){
    Session.set('postContent', value);
  }
}


ReactMixin(AddForumTopic.prototype, ReactMeteorData);
