//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var AuditEvent = Package['clinical:hl7-resource-audit-event'].AuditEvent;
var AuditEvents = Package['clinical:hl7-resource-audit-event'].AuditEvents;
var AuditEventSchema = Package['clinical:hl7-resource-audit-event'].AuditEventSchema;
var WebApp = Package.webapp.WebApp;
var Log = Package.logging.Log;
var Tracker = Package.deps.Tracker;
var Deps = Package.deps.Deps;
var Session = Package.session.Session;
var DDP = Package['ddp-client'].DDP;
var Mongo = Package.mongo.Mongo;
var Blaze = Package.ui.Blaze;
var UI = Package.ui.UI;
var Handlebars = Package.ui.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var Template = Package['templating-runtime'].Template;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Random = Package.random.Random;
var EJSON = Package.ejson.EJSON;
var FastClick = Package.fastclick.FastClick;
var LaunchScreen = Package['launch-screen'].LaunchScreen;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var HTML = Package.htmljs.HTML;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;

/* Package-scope variables */
var HipaaLog, HipaaLogger;

var require = meteorInstall({"node_modules":{"meteor":{"clinical:hipaa-logger":{"lib":{"HipaaLog.js":function(){

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
// packages/clinical_hipaa-logger/lib/HipaaLog.js                                    //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////
                                                                                     //
HipaaLog = new Mongo.Collection("HipaaLog");
HipaaLog.allow({
  insert: function (userId, doc) {
    // we can only write to the audit log if we're logged in
    if (userId) {
      return true;
    } else {
      return false;
    }
  },
  update: function (userId, doc, fields, modifier) {
    // the audit log is write-only
    return false;
  },
  remove: function (userId, doc) {
    // the audit log is write-only
    return false;
  } // fetch: function(userId){
  //   return true;
  // }

});
///////////////////////////////////////////////////////////////////////////////////////

},"HipaaLogger.js":function(){

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
// packages/clinical_hipaa-logger/lib/HipaaLogger.js                                 //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////
                                                                                     //
/*
var hipaaEvent = {
  eventType: "",
  userId: "",
  userName: "",
  collectionName: "",
  recordId: "",
  patientId: "",
  patientName: "",
  message: ""
};
*/
HipaaLogger = {
  /**
  * @summary Detects if a specific environment variable was exposed from the server.
  * @locus Client
  * @memberOf HipaaLogger
  * @name logAuditEvent
  * @param AuditEvent
  * @version 1.2.3
  */
  logAuditEvent: function (auditEvent) {
    check(auditEvent, Object);
    process.env.DEBUG && console.log('auditEvent', auditEvent);
    return Meteor.call("logAuditEvent", auditEvent, function (error, result) {
      if (error) {
        console.log("error", error);
      }

      if (result) {
        return result;
      }
    });
  },

  /**
  * @summary Detects if a specific environment variable was exposed from the server.
  * @locus Client
  * @memberOf HipaaLogger
  * @name logEvent
  * @param hipaaEvent.eventType
  * @param hipaaEvent.userId
  * @param hipaaEvent.userName
  * @param hipaaEvent.collectionName
  * @param hipaaEvent.recordId
  * @param hipaaEvent.patientId
  * @param hipaaEvent.patientName
  * @param hipaaEvent.message
  * @version 1.2.3
  * @example
  * ```js
  * var hipaaEvent = {
  *   eventType: "update",
  *   userId: Meteor.userId(),
  *   userName: Meteor.user().fullName(),
  *   collectionName: "Medications",
  *   recordId: Random.id(),
  *   patientId: Session.get('currentPatientId'),
  *   patientName: Session.get('currentPatientName')
  * };
  * HipaaLogger.logEvent(hipaaEvent);
  * ```
  */
  logEvent: function (hipaaEvent) {
    check(hipaaEvent, Object);
    return Meteor.call("logEvent", hipaaEvent, function (error, result) {
      if (error) {
        console.log("error", error);
      }

      if (result) {
        return result;
      }
    });
  }
};
///////////////////////////////////////////////////////////////////////////////////////

}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/node_modules/meteor/clinical:hipaa-logger/lib/HipaaLog.js");
require("/node_modules/meteor/clinical:hipaa-logger/lib/HipaaLogger.js");

/* Exports */
Package._define("clinical:hipaa-logger", {
  HipaaLogger: HipaaLogger,
  HipaaLog: HipaaLog
});

})();
