import { get } from 'lodash';
import { Match } from 'meteor/check';

Hooks.onLoggedIn = function (userId) { 
    check(userId, String);
    console.log('Hooks.onLoggedIn', userId);    
}
Hooks.onLoggedOut = function (userId) { 
    check(userId, String);
    if(userId){
        console.log('Logging out.  User ID:  ', userId);    
    } else {
        console.log('Logging out.  Nobody appears logged in.')
    }
}


// Hooks.onCloseSession = function (userId) { 
//     check(userId, Match.Maybe(String));
//     console.log('Hooks.onCloseSession', userId);    

//     let closeSessionEvent = { 
//         "resourceType" : "AuditEvent",
//         "action" : 'Close Session',
//         "recorded" : new Date(), 
//         "outcome" : 'Success',
//         "outcomeDesc" : 'Server has closed session with the device.',
//         "agent" : [{
//             "altId" : userId ? userId : '', // Alternative User id e.g. authentication
//             "name" : Meteor.user() ? Meteor.user().fullName() : '', // Human-meaningful name for the agent
//             "requestor" : true  
//         }],
//         "source" : { 
//           "site" : Meteor.absoluteUrl(),
//           "identifier": {
//             "value": 'Device'
//           }
//         },
//         "entity": []
//       }
  
//       HipaaLogger.logAuditEvent(closeSessionEvent, {validate: get(Meteor, 'settings.public.defaults.schemas.validate', false)}, function(error, result){
//         if(error) console.error('HipaaLogger.logEvent.error.invalidKeys', error.invalidKeys)
//         if(result) console.error(result)
//       }); 

// }