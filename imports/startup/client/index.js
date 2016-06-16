import { Bert } from 'meteor/themeteorchef:bert';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './routes.js';
import './globals.js';

import { Meteor } from 'meteor/meteor';

if (Meteor.settings.environment === "production") {
  Bert.defaults.style = 'fixed-top';
} else {
  Bert.defaults.style = 'fixed-bottom';
}


// subscriptions
Meteor.startup(function (){
  Meteor.subscribe('posts');
});


// global imports for subscriptions
import { Posts as _Posts } from "../../api/posts/posts";
Posts = _Posts;
