import React from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import { FormGroup } from 'react-bootstrap';
import { CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Input  from 'react-toolbox/lib/input';
import { insertTopic } from '/imports/api/topics/methods';
import { GlassCard } from '/imports/ui/components/GlassCard';

const handleInsertPost = (event) => {
  const target = event.target;
  const name = target.value.trim();
  const createdAt = new Date();

  if (name !== '' && event.keyCode === 13) {
    // process.env.TEST && console.log('title', title);
    insertTopic.call({
      name,
      createdAt
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        target.value = '';
        Bert.alert('Topic added!', 'success');
      }
    });
  }
};

export const AddForumTopic = () => (
  <GlassCard>
    <CardTitle
      title="New Forum Topic"
    />
    <CardText>
      <FormGroup>
        <Input
          label='Add Post'
          name='addPost'
          type="textarea"
          onKeyUp={ handleInsertPost }
          />
      </FormGroup>
    </CardText>
  </GlassCard>
);
