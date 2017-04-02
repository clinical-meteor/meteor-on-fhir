import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './routes.js';
import './globals.js';

import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
// global imports for subscriptions
import { MyGenotype as _MyGenotype } from '/imports/api/genotype/MyGenotype';
// global imports for subscriptions
import { Posts as _Posts } from '/imports/api/posts/posts';
// global imports for subscriptions
import { Statistics as _Statistics } from '/imports/api/statistics/statistics';
// global imports for subscriptions
import { Topics as _Topics } from '/imports/api/topics/topics';

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

  Meteor.subscribe('Observations');
});


Posts = _Posts;

Topics = _Topics;

Statistics = _Statistics;

MyGenotype = _MyGenotype;
