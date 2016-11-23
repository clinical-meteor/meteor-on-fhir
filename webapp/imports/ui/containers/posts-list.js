import { composeWithTracker } from 'react-komposer';
import { Posts } from '../../api/posts/posts.js';
import { PostsList } from '../workflows/posts/PostsList.js';
import { Loading } from '/imports/ui/components/loading.js';
import { Meteor } from 'meteor/meteor';

import { PostsDeck } from '../workflows/posts/PostsDeck.js';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('posts');
  if (subscription.ready()) {
    const posts = Posts.find({},{sort: {title: -1}}).fetch();
    onData(null, { posts });
  }
};

export default composeWithTracker(composer, Loading)(PostsList);
