import React  from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Bert } from 'meteor/themeteorchef:bert';
import { FormGroup } from 'react-bootstrap';
import { CardText } from 'material-ui/Card';
import Input  from 'react-toolbox/lib/input';
import { insertPost } from '../../../api/posts/methods.js';
import { GlassCard } from '/imports/ui/components/GlassCard';

import { Meteor } from 'meteor/meteor';
import RaisedButton from 'material-ui/RaisedButton';

export class AddPostToConversation extends React.Component {
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

  handleKeypress(topicId, event){
    const target = event.target;
    const title = this.refs.addPostToConversationInput.refs.input.value.trim();

    if (title !== '' && event.keyCode === 13) {
      this.handleInsertPost(topicId, title, target);
    }
  }
  handleAddPostButton(topicId, event){
    const target = event.target;
    const title = this.refs.addPostToConversationInput.refs.input.value.trim();

    this.handleInsertPost(topicId, title, target);
  }
  handleInsertPost(topicId, title, target){
    let newPost = {
      title: title,
      createdAt: new Date(),
      createdBy: {
        display: Meteor.user().fullName(),
        reference: Meteor.userId()
      },
      topicId: topicId
    };

    if (Meteor.user().profile && Meteor.user().profile.avatar) {
      newPost.createdBy.avatar = Meteor.user().profile.avatar;
    }

    //console.log("newPost", newPost);

    insertPost.call(newPost, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        target.value = '';
        Bert.alert('Post added!', 'success');
      }
    });
  }

  render(){
    return (
      <GlassCard id='addPostToConversationCard'>
        <CardText>
          <FormGroup>
            <Input
              multiline
              label='Add Post'
              name='addPost'
              type="textarea"
              onKeyUp={ this.handleKeypress.bind(this, this.props.topicId) }
              rows="5"
              ref="addPostToConversationInput"
              id='addPostToConversationInput'
              />
          </FormGroup>
          <RaisedButton id='addPostButton' onMouseUp={ this.handleAddPostButton.bind(this, this.props.topicId) } primary={true} label='Post' />
        </CardText>
      </GlassCard>
    );
  }
}

ReactMixin(AddPostToConversation.prototype, ReactMeteorData);
