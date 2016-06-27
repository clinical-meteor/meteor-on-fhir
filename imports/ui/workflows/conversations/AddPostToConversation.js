import React  from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import { FormGroup } from 'react-bootstrap';
import { CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Input  from 'react-toolbox/lib/input';
import { insertPost } from '../../../api/posts/methods.js';
import { GlassCard } from '../../components/GlassCard';

import { Meteor } from 'meteor/meteor';

const handleInsertPost = (event) => {
  const target = event.target;
  const title = target.value.trim();

  if (title !== '' && event.keyCode === 13) {
    //console.log('title', title);
    let newPost = {
      title: title,
      createdAt: new Date(),
      createdBy: {
        display: Meteor.user().fullName(),
        reference: Meteor.userId()
      }
    };
    if (Meteor.user().profile && Meteor.user().profile.avatar) {

    }

    insertPost.call(newPost, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        target.value = '';
        Bert.alert('Post added!', 'success');
      }
    });
  }
};

export const AddPostToConversation = () => (
  <GlassCard>
    <CardTitle
      title="New Topic Comment"
    />
    <CardText>
      <FormGroup>
        <Input
          multiline
          label='Add Post'
          name='addPost'
          type="textarea"
          onKeyUp={ handleInsertPost }
          rows="5"
          />
      </FormGroup>
    </CardText>
  </GlassCard>
);
