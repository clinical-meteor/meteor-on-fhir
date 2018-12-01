
import { get } from 'lodash';

// Support for playing D&D: Roll 3d6 for dexterity
Accounts.onCreateUser(function(options, user) {
  console.log('------------------------------------------------');
  console.log('Accounts.onCreateUser');
  console.log(' ');

  process.env.DEBUG && console.log('user', user);
  process.env.DEBUG && console.log('options', options);
  console.log(' ');

  // console.log('options', options);
  // console.log('user', user);
  // console.log('Meteor.settings', Meteor.settings);


  // We still want the default hook's 'profile' behavior.
  if (options.profile){
    process.env.DEBUG && console.log("options.profile exists");

    user.profile = options.profile;
    user.profile.firstTimeVisit = true;
    user.roles = [];


    // some of our test data will be initialized with a profile.role of Physician
    // if so, we want to set their system access to 'practitioner'
    if (options.profile.role === 'Physician') {
      user.roles = ['practitioner'];
      Roles.addUsersToRoles(user._id, ['practitioner']);
    }

    // otherwise, we check whether thay have an access code to grant practitioner access
    if (options.accessCode && get(Meteor, 'settings.private.practitionerAccessCode')) {
      if (options.accessCode === get(Meteor, 'settings.private.practitionerAccessCode')) {
        process.env.DEBUG && console.log('AccessCodes match!  Assigning practitioner role...');

        user.roles = ['practitioner'];
        Roles.addUsersToRoles(user._id, ['practitioner']);
      }
    }

    // also check for admin access
    if (options.accessCode) {
      process.env.DEBUG && console.log("options.profile.accessCode exists");

      if (get(Meteor, 'settings.private.sysadminAccessCode')) {
        process.env.DEBUG && console.log("Meteor.settings.private.sysadminAccessCode exists");

        if (options.accessCode === get(Meteor, 'settings.private.sysadminAccessCode')) {
          process.env.DEBUG && console.log('AccessCodes match!  Assigning sysadmin role...');

          user.roles = ['sysadmin'];
          Roles.addUsersToRoles(user._id, ['sysadmin']);
        }
      }
    }

    // if no other roles have been assigned, make the new user a patient
    if (user.roles.length === 0) {
      user.roles.push('patient');
      Roles.addUsersToRoles(user._id, ['patient']);
    }
  }

  // this lets us add OAuth services in the profile at account creation time
  // when then get securely stored 
  if(get(options, 'profile.services')){
    let services = get(options, 'profile.services');
    Object.keys(services).forEach(function(key){
      user.services[key] = services[key];      
    })
    delete user.profile.services;
  }

  process.env.DEBUG && console.log('modified user', user);

  return user;
});




Accounts.onLogin(function(loginObject) {
  console.log('Accounts.onLogin().foo', loginObject)

  let userId = get(loginObject, 'user._id');
  console.log('userId', userId);

  var consents;
  
  if(!get(loginObject, 'user.profile.consents')){
    var defaultConsents = {
      performanceAnalytics: {
        "resourceType": "Consent",
        "id": "Consent/" + userId + "/performanceAnalytics",
        "status": "inactive",
        "patient": {
          "reference": "Patient/" + userId
        },
        "dateTime": new Date(),
        "consentingParty": [{
          "reference": "Patient/" + userId
        }],
        "category": [],
        "organization": [{
          "reference": "Organization/Symptomatic",
          "display": "Symptomatic"
        }],
        "policyRule": "http://hl7.org/fhir/ConsentPolicy/opt-in",
        "except": []
    },
      medicalCodeLookup: {
        "resourceType": "Consent",
        "id": "Consent/" + userId + "/medicalCodeLookup",
        "status": "inactive",
        "patient": {
          "reference": "Patient/" + userId
        },
        "dateTime": new Date(),
        "consentingParty": [{
          "reference": "Patient/" + userId
        }],
        "category": [],
        "organization": [{
          "reference": "Organization/Symptomatic",
          "display": "Symptomatic"
        }],
        "policyRule": "http://hl7.org/fhir/ConsentPolicy/opt-in",
        "except": []
      },
      patientEducationReferences: {
        "resourceType": "Consent",
        "id": "Consent/" + userId + "/patientEducationReferences",
        "status": "inactive",
        "patient": {
          "reference": "Patient/" + userId
        },
        "dateTime": new Date(),
        "consentingParty": [{
          "reference": "Patient/" + userId
        }],
        "category": [],
        "organization": [{
          "reference": "Organization/Symptomatic",
          "display": "Symptomatic"
        }],
        "policyRule": "http://hl7.org/fhir/ConsentPolicy/opt-in",
        "except": []
      },
      geocoding: {
        "resourceType": "Consent",
        "id": "Consent/" + userId + "/geocoding",
        "status": "inactive",
        "patient": {
          "reference": "Patient/" + userId
        },
        "dateTime": new Date(),
        "consentingParty": [{
          "reference": "Patient/" + userId
        }],
        "category": [],
        "organization": [{
          "reference": "Organization/Symptomatic",
          "display": "Symptomatic"
        }],
        "policyRule": "http://hl7.org/fhir/ConsentPolicy/opt-in",
        "except": []
      }
    }
    Meteor.users.update({_id: userId}, {$set: {
      'profile.consents': defaultConsents
    }});

    console.log('userId', userId);
  };


});
