import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './routes.js';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Bert} from 'meteor/clinical:alert';
import { get } from 'lodash';


// OAuth Access Token
Session.setDefault('accessToken', '');

Meteor.startup(function (){

  document.title = get(Meteor, 'settings.public.title');

  console.log('Bert', Bert)
  Bert.defaults.style = 'growl-top-right';


  // Global session variables for user interface elements
  Session.set('showNavbars', true);
  Session.set('showSearchbar', false);
  Session.set('hasPagePadding', true);
  Session.set('appSurfaceOffset', true);
  Session.set('selectedChromosome', 1);
  Session.set('showOrbital', false);

  // In some applications, we want a default OAuth provider and service name
  // This is usually due to the app having a single parent organization.
  // (i.e. not for AppOrchard apps)
  if(get(Meteor, 'settings.private.defaultOauth.serviceName')){
    Meteor.call('fetchAccessToken', get(Meteor, 'settings.private.defaultOauth.serviceName'), function(err, result){
      if(result){
          console.log(result)
          Session.set('accessToken', result.accessToken);
      }
    })  
  }

  // Set the default scopes for different OAuth services  
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