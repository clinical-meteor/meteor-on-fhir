import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './routes.js';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Bert } from 'meteor/themeteorchef:bert';

Bert.defaults.style = 'growl-top-right';

// OAuth Access Token
Session.setDefault('accessToken', '');

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

  Meteor.call('fetchAccessToken', function(err, result){
    if(result){
        console.log(result)
        Session.set('accessToken', result.accessToken);
    }
  })


  Accounts.ui.config({
    requestPermissions: {
      facebook: ['user_likes'],
      github: ['user', 'repo'],
      MeteorOnFhir: [
        'OBSERVATION.READ', 
        'OBSERVATION.SEARCH', 
        'PATIENT.READ', 
        'PATIENT.SEARCH', 
        'PRACTITIONER.READ', 
        'PRACTITIONER.SEARCH',
        'patient/*.read',
        'patient/*.search',
        'openid',
        'profile',
        'user/*.*',
        'launch',
        'online_access'
      ]
    },
    requestOfflineToken: {
      google: true
    },
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
  });  
});


  // -----------------------------------------------------------------------------
// Buffer API
// https://github.com/meteor/meteor/blob/master/History.md#v15-2017-05-30

global.Buffer = global.Buffer || require("buffer").Buffer;