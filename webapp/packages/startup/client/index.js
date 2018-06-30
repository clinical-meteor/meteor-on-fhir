import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './routes.js';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Bert } from 'meteor/themeteorchef:bert';

Bert.defaults.style = 'growl-top-right';

Meteor.startup(function (){
  // global session variables
  Session.set('showNavbars', true);
  Session.set('showSearchbar', false);
  Session.set('hasPagePadding', true);
  Session.set('appSurfaceOffset', true);
  Session.set('selectedChromosome', 1);
  Session.set('showOrbital', false);

  Meteor.subscribe('Observations');
  Meteor.subscribe('Patients');
});


  // -----------------------------------------------------------------------------
// Buffer API
// https://github.com/meteor/meteor/blob/master/History.md#v15-2017-05-30

global.Buffer = global.Buffer || require("buffer").Buffer;