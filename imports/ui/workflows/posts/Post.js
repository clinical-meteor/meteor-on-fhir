import React from 'react';
import { Row, Col, ListGroupItem, FormControl, Button } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { updatePost, removePost } from '../../../api/posts/methods.js';

import { GlassCard } from '../../components/GlassCard';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';


const handleUpdatePost = (postId, event) => {
  const title = event.target.value.trim();
  if (title !== '' && event.keyCode === 13) {
    updatePost.call({
      _id: postId,
      update: { title }
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Post updated!', 'success');
      }
    });
  }
};

const handleRemovePost = (documentId, event) => {
  event.preventDefault();
  // this should be replaced with a styled solution so for now we will
  // disable the eslint `no-alert`
  // eslint-disable-next-line no-alert
  if (confirm('Are you sure? This is permanent.')) {
    removePost.call({
      _id: documentId
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Post removed!', 'success');
      }
    });
  }
};

export const Post = ({ post }) => (
  <ListGroupItem key={ post._id }>
    <Row>
      <Col xs={ 8 } sm={ 10 }>
        <FormControl
          type="text"
          standalone
          defaultValue={ post.title }
          onKeyUp={ handleUpdatePost.bind(this, post._id) }
        />
      </Col>
      <Col xs={ 4 } sm={ 2 }>
        <Button
          bsStyle="danger"
          className="btn-block"
          onClick={ handleRemovePost.bind(this, post._id) }>
          Remove
        </Button>
      </Col>
    </Row>
  </ListGroupItem>
);
