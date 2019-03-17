import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';


Accounts.config({ forbidClientAccountCreation: false });

// // Don't let people write arbitrary data to their 'profile' field from the client
// Meteor.users.deny({
//   update() {
//     return true;
//   }
// });

// Don't let people write arbitrary data to their 'profile' field from the client
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

// Get a list of all accounts methods by running `Meteor.server.method_handlers` in meteor shell
const AUTH_METHODS = [
  'login',
  'logout',
  'logoutOtherClients',
  'getNewToken',
  'removeOtherTokens',
  'configureLoginService',
  'changePassword',
  'forgotPassword',
  'resetPassword',
  'verifyEmail',
  'createUser',
  'ATRemoveService',
  'ATCreateUserServer',
  'ATResendVerificationEmail',
];

if (Meteor.isServer) {
  // Only allow 2 login attempts per connection per 5 seconds
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(AUTH_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 2, 5000);
}


// Security notifications
if(Package['autopublish']){
  console.log("*****************************************************************************")
  console.log("HIPAA WARNING:  DO NOT STORE PROTECTED HEALTH INFORMATION IN THIS APP. ");  
  console.log("Your application has the 'autopublish' package installed.  Please uninstall.");
  console.log("");  
  console.log("meteor remove autopublish");  
  console.log("meteor add clinical:autopublish");  
  console.log("");  
}