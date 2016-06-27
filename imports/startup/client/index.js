import { Bert } from 'meteor/themeteorchef:bert';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './routes.js';
import './globals.js';

import { Meteor } from 'meteor/meteor';

if (Meteor.settings.environment === 'production') {
  Bert.defaults.style = 'fixed-top';
} else {
  Bert.defaults.style = 'fixed-bottom';
}


// subscriptions
Meteor.startup(function (){
  Meteor.subscribe('posts');
  Meteor.subscribe('topics');
});


// global imports for subscriptions
import { Posts as _Posts } from '/imports/api/posts/posts';
Posts = _Posts;

// global imports for subscriptions
import { Topics as _Topics } from '/imports/api/topics/topics';
Topics = _Topics;
