import { get } from 'lodash';

Hooks.onLoggedIn = function () { 
    console.log('Hooks.onLoggedIn');    

    // let startupEvent = {
    //     "resourceType" : "AuditEvent",
    //     "action" : "Login", // Type of action performed during the event
    //     "recorded" : new Date(), // R!  Time when the event occurred on source
    //     "outcome" : "Success", // Whether the event succeeded or failed
    //     "outcomeDesc" : "User logged into the system.", // Description of the event outcome
    //     "agent" : [{ // R!  Actor involved in the event
    //       "altId" : Meteor.userId(), // Alternative User id e.g. authentication
    //       "name" : Meteor.user() ? Meteor.user().fullName() : '', // Human-meaningful name for the agent
    //       "requestor" : true
    //     }],
    //     "source" : { // R!  Audit Event Reporter
    //       "site" : Meteor.absoluteUrl(), // Logical source location within the enterprise
    //     }
    //   };

      let loginEvent = { 
        "resourceType" : "AuditEvent",
        "action" : 'Login',
        "recorded" : new Date(), 
        "outcome" : 'Success',
        "outcomeDesc" : 'User logged in and authenticated.',
        "agent" : [{
            "altId" : Meteor.userId(), // Alternative User id e.g. authentication
            "name" : Meteor.user() ? Meteor.user().fullName() : '', // Human-meaningful name for the agent
            "requestor" : true  
        }],
        "source" : { 
          "site" : Meteor.absoluteUrl(),
          "identifier": {
            "value": 'Accounts Subsystem'
          }
        },
        "entity": []
      }
  
      HipaaLogger.logAuditEvent(loginEvent, {validate: get(Meteor, 'settings.public.defaults.schemas.validate', false)}, function(error, result){
        if(error) console.error('HipaaLogger.logEvent.error.invalidKeys', error.invalidKeys)
        if(result) console.error(result)
      }); 

}


// Hooks.onLoggedOut = function (userId) { 
//     check(userId, String);
//     console.log('Hooks.onLoggedOut', userId);  
    
    

//     let logoutEvent = { 
//         "resourceType" : "AuditEvent",
//         "action" : 'Logout',
//         "recorded" : new Date(), 
//         "outcome" : 'Success',
//         "outcomeDesc" : 'User logged out and deauthenticated.',
//         "agent" : [{
//             "altId" : userId, // Alternative User id e.g. authentication
//             "name" : Meteor.user() ? Meteor.user().fullName() : '', // Human-meaningful name for the agent
//             "requestor" : true  
//         }],
//         "source" : { 
//           "site" : Meteor.absoluteUrl(),
//           "identifier": {
//             "value": 'Accounts Subsystem'
//           }
//         },
//         "entity": []
//       }

//       console.log('logoutEvent', logoutEvent);    
  
//       HipaaLogger.logAuditEvent(logoutEvent, {validate: get(Meteor, 'settings.public.defaults.schemas.validate', false)}, function(error, result){
//         if(error) console.error('HipaaLogger.logEvent.error.invalidKeys', error.invalidKeys)
//         if(result) console.error(result)
//       }); 
// }

Hooks.onGainFocus = function (userId) { 
    check(userId, String);
    console.log('Hooks.onGainFocus', userId);    

    let gainFocusEvent = { 
        "resourceType" : "AuditEvent",
        "action" : 'Focus',
        "recorded" : new Date(), 
        "outcome" : 'Success',
        "outcomeDesc" : 'User has opened the application and may be subject privacy regulations.',
        "agent" : [{
            "altId" : userId, // Alternative User id e.g. authentication
            "name" : Meteor.user() ? Meteor.user().fullName() : '', // Human-meaningful name for the agent
            "requestor" : true  
        }],
        "source" : { 
          "site" : Meteor.absoluteUrl(),
          "identifier": {
            "value": 'Device'
          }
        },
        "entity": []
      }
  
      HipaaLogger.logAuditEvent(gainFocusEvent, {validate: get(Meteor, 'settings.public.defaults.schemas.validate', false)}, function(error, result){
        if(error) console.error('HipaaLogger.logEvent.error.invalidKeys', error.invalidKeys)
        if(result) console.error(result)
      }); 

}