import React from 'react';
import { ListGroup, Alert } from 'react-bootstrap';
import { Post } from './Post.js';

export const PostsList = ({ posts }) => (
  posts.length > 0 ?
    <ListGroup className="posts-list">
      {posts.map((doc) => (
        <Post key={ doc._id } post={ doc } />
      ))}
    </ListGroup>
  :
    <Alert bsStyle="warning">No posts yet.</Alert>
);

PostsList.propTypes = {
  posts: React.PropTypes.array,
};
