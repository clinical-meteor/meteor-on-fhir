import { Bert } from 'meteor/themeteorchef:bert';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './routes.js';
import './globals.js';

import { Meteor } from 'meteor/meteor';

if (process.env.NODE_ENV === 'production') {
  Bert.defaults.style = 'fixed-top';
} else {
  Bert.defaults.style = 'fixed-bottom';
}


Meteor.startup(function (){
  // global session variables
  Session.set('showNavbars', true);
  Session.set('hasPagePadding', true);
  Session.set('appSurfaceOffset', true);
  Session.set('selectedChromosome', 1);


  // subscriptions that aren't provided via packages
  Meteor.subscribe('posts');
  Meteor.subscribe('topics');

  //Meteor.subscribe('Lists');
  Meteor.subscribe('Statistics');
  Meteor.subscribe('MyGenotype', Session.get('selectedChromosome'));
});


// global imports for subscriptions
import { Posts as _Posts } from '/imports/api/posts/posts';
Posts = _Posts;

// global imports for subscriptions
import { Topics as _Topics } from '/imports/api/topics/topics';
Topics = _Topics;

// global imports for subscriptions
import { Statistics as _Statistics } from '/imports/api/statistics/statistics';
Statistics = _Statistics;

// global imports for subscriptions
import { MyGenotype as _MyGenotype } from '/imports/api/genotype/MyGenotype';
MyGenotype = _MyGenotype;
