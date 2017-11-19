import { Meteor } from 'meteor/meteor';
import { Posts } from '../posts';

//Meteor.publish('posts', () => Posts.find());

Meteor.publish('posts', function(){
  return Posts.find()
});
