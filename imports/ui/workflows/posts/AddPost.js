import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { insertPost } from '../../../api/posts/methods.js';

import { GlassCard } from '../../components/GlassCard';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Input from 'react-toolbox/lib/input';

const handleInsertPost = (event) => {
  const target = event.target;
  const title = target.value.trim();
  const createdAt = new Date();

  if (title !== '' && event.keyCode === 13) {
    console.log('title', title);
    insertPost.call({
      title,
      createdAt
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        target.value = '';
        Bert.alert('Post added!', 'success');
      }
    });
  }
};

export const AddPost = () => (
  <GlassCard>
    <CardTitle
      title="Weblog"
      subtitle="These can be anything you want...."
    />
    <CardText>
      <FormGroup>
        <FormControl
          type="textarea"
          onKeyUp={ handleInsertPost }
          placeholder="Type some text and press enter to create a post..."
        />

        <Input type='text' multiline label='Add Post' name='addPost' ref="addPost" />
      </FormGroup>
    </CardText>
  </GlassCard>

);
