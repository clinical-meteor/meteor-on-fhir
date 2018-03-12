import { Meteor } from 'meteor/meteor';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

// // Don't let people write arbitrary data to their 'profile' field from the client
// Meteor.users.deny({
//   update() {
//     return true;
//   }
// });

// // Don't let people write arbitrary data to their 'profile' field from the client
Patients.allow({
  update() { return true; },
  insert() { return true; },
  remove() { return true; }
});

AllergyIntolerances.allow({
  update() { return true; },
  insert() { return true; },
  remove() { return true; }
});
Conditions.allow({
  update() { return true; },
  insert() { return true; },
  remove() { return true; }
});
Devices.allow({
  update() { return true; },
  insert() { return true; },
  remove() { return true; }
});
DiagnosticReports.allow({
  update() { return true; },
  insert() { return true; },
  remove() { return true; }
});
Goals.allow({
  update() { return true; },
  insert() { return true; },
  remove() { return true; }
});
Immunizations.allow({
  update() { return true; },
  insert() { return true; },
  remove() { return true; }
});
// Locations.allow({
//   update() { return true; },
//   insert() { return true; },
//   remove() { return true; }
// });
Medications.allow({
  update() { return true; },
  insert() { return true; },
  remove() { return true; }
});
MedicationStatements.allow({
  update() { return true; },
  insert() { return true; },
  remove() { return true; }
});
Observations.allow({
  update() { return true; },
  insert() { return true; },
  remove() { return true; }
});
Organizations.allow({
  update() { return true; },
  insert() { return true; },
  remove() { return true; }
});
Patients.allow({
  update() { return true; },
  insert() { return true; },
  remove() { return true; }
});
Practitioners.allow({
  update() { return true; },
  insert() { return true; },
  remove() { return true; }
});
Procedures.allow({
  update() { return true; },
  insert() { return true; },
  remove() { return true; }
});
RiskAssessments.allow({
  update() { return true; },
  insert() { return true; },
  remove() { return true; }
});

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

