import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './routes.js';
import './hooks.js';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

// import { Bert} from 'meteor/clinical:alert';
import { get } from 'lodash';


// OAuth Access Token
Session.setDefault('accessToken', '');

Meteor.startup(function (){

  // Initialize the Event Hooks system
  // Used with the AuditLog
  Hooks.init();

  // Accounts.onLogin(function(){
  //   // console.log(user.user._id)
  //   var roles = get(Meteor.user(), 'roles');
  //   if(roles.includes('practitioner')){
  //     Session.set('showSearchbar', true)
  //   }
  // });
  

  document.title = get(Meteor, 'settings.public.title');

  // console.log('Bert', Bert)
  Bert.defaults.style = 'growl-top-right';
  Bert.defaults.type = 'info';


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


// -----------------------------------------------------------------------------
// Security

if(Package['clinical:hl7-resource-patient'] && (typeof Patients === "object")){
  Patients.allow({
    update() { return true; },
    insert() { return true; },
    remove() { return true; }
  });
}

if(Package['clinical:hl7-resource-allergy-intolerance'] && (typeof AllergyIntolerances === "object")){
  AllergyIntolerances.allow({
    update() { return true; },
    insert() { return true; },
    remove() { return true; }
  });
}
if(Package['clinical:hl7-resource-audit-event'] && (typeof AuditEvents === "object")){
  AuditEvents.allow({
    update() { return true; },
    insert() { return true; },
    remove() { return true; }
  });
}

if(Package['clinical:hl7-resource-careplan']){
  if(typeof CarePlans === "object"){
    CarePlans.allow({
      update() { return true; },
      insert() { return true; },
      remove() { return true; }
    });  
  }
  if(typeof Goals === "object"){
    Goals.allow({
      update() { return true; },
      insert() { return true; },
      remove() { return true; }
    });
  }
}

if(Package['clinical:hl7-resource-condition'] && (typeof Conditions === "object")){
  Conditions.allow({
    update() { return true; },
    insert() { return true; },
    remove() { return true; }
  });
}

if(Package['clinical:hl7-resource-device'] && (typeof Devices === "object")){
  Devices.allow({
    update() { return true; },
    insert() { return true; },
    remove() { return true; }
  });
}

if(Package['clinical:hl7-resource-endpoint'] && (typeof Endpoints === "object")){
  Endpoints.allow({
    update() { return true; },
    insert() { return true; },
    remove() { return true; }
  });
}

if(Package['clinical:hl7-resource-diagnostic-report'] && (typeof DiagnosticReports === "object")){
  DiagnosticReports.allow({
    update() { return true; },
    insert() { return true; },
    remove() { return true; }
  });
}


if(Package['clinical:hl7-resource-immunization'] && (typeof Immunizations === "object")){
  Immunizations.allow({
    update() { return true; },
    insert() { return true; },
    remove() { return true; }
  });
}

if(Package['clinical:hl7-resource-list'] && (typeof Lists === "object")){
  Lists.allow({
    update() { return true; },
    insert() { return true; },
    remove() { return true; }
  });
}
if(Package['clinical:hl7-resource-location'] && (typeof Locations === "object")){
  Locations.allow({
    update() { return true; },
    insert() { return true; },
    remove() { return true; }
  });
}

if(Package['clinical:hl7-resource-medication'] && (typeof Medications === "object")){
  Medications.allow({
    update() { return true; },
    insert() { return true; },
    remove() { return true; }
  });
}

if(Package['clinical:hl7-resource-medication-order'] && (typeof MedicationOrders === "object")){
  MedicationOrders.allow({
    update() { return true; },
    insert() { return true; },
    remove() { return true; }
  });
}

if(Package['clinical:hl7-resource-medication-statement'] && (typeof MedicationStatements === "object")){
  MedicationStatements.allow({
    update() { return true; },
    insert() { return true; },
    remove() { return true; }
  });
}

if(Package['clinical:hl7-resource-observation'] && (typeof Observations === "object")){
  Observations.allow({
    update() { return true; },
    insert() { return true; },
    remove() { return true; }
  });
}

if(Package['clinical:hl7-resource-organization'] && (typeof Organizations === "object")){
  Organizations.allow({
    update() { return true; },
    insert() { return true; },
    remove() { return true; }
  });
}

if(Package['clinical:hl7-resource-person'] && (typeof Persons === "object")){
  Persons.allow({
    update() { return true; },
    insert() { return true; },
    remove() { return true; }
  });
}

if(Package['clinical:hl7-resource-patient'] && (typeof Patients === "object")){
  Patients.allow({
    update() { return true; },
    insert() { return true; },
    remove() { return true; }
  });
}

if(Package['clinical:hl7-resource-practitioner'] && (typeof Practitioners === "object")){
  Practitioners.allow({
    update() { return true; },
    insert() { return true; },
    remove() { return true; }
  });
}

if(Package['clinical:hl7-resource-procedure'] && (typeof Procedures === "object")){
  Procedures.allow({
    update() { return true; },
    insert() { return true; },
    remove() { return true; }
  });
}

if(Package['clinical:hl7-resource-risk-assessment'] && (typeof RiskAssessments === "object")){
  RiskAssessments.allow({
    update() { return true; },
    insert() { return true; },
    remove() { return true; }
  });    
}