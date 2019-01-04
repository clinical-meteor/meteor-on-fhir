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
var Mongo = Package.mongo.Mongo;
var _ = Package.underscore._;
var Collection2 = Package['aldeed:collection2'].Collection2;
var WebApp = Package.webapp.WebApp;
var Log = Package.logging.Log;
var Tracker = Package.deps.Tracker;
var Deps = Package.deps.Deps;
var Session = Package.session.Session;
var DDP = Package['ddp-client'].DDP;
var Blaze = Package.ui.Blaze;
var UI = Package.ui.UI;
var Handlebars = Package.ui.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var Template = Package['templating-runtime'].Template;
var check = Package.check.check;
var Match = Package.check.Match;
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
var AllergyIntolerances, Conditions, CarePlans, Contracts, Communications, Devices, DiagnosticReports, Endpoints, Encounters, FamilyMemberHistories, Goals, HealthcareServices, ImagingStudies, Immunizations, Lists, Locations, Medications, MedicationOrders, MedicationStatements, Observations, Organizations, Patients, Persons, Practitioners, Questionnaires, QuestionnaireResponses, RiskAssessments, RelatedPersons, PractitionerRoles, Procedures, Subscriptions, PublishingHouse;

var require = meteorInstall({"node_modules":{"meteor":{"clinical:desktop-publish":{"autopublish.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/clinical_desktop-publish/autopublish.js                                                          //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
var get;
module.link("lodash", {
  get: function (v) {
    get = v;
  }
}, 0);
var Mongo;
module.link("meteor/mongo", {
  Mongo: function (v) {
    Mongo = v;
  }
}, 1);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 2);

if (Meteor.isClient) {
  console.log('Autosubscribing to publications.');
  Meteor.startup(function () {
    AllergyIntolerances = new Mongo.Collection(null);
    Conditions = new Mongo.Collection(null);
    CarePlans = new Mongo.Collection(null); // Consents = new Mongo.Collection(null);

    Contracts = new Mongo.Collection(null);
    Communications = new Mongo.Collection(null);
    Devices = new Mongo.Collection(null);
    DiagnosticReports = new Mongo.Collection(null);
    Endpoints = new Mongo.Collection(null);
    Encounters = new Mongo.Collection(null);
    FamilyMemberHistories = new Mongo.Collection(null);
    Goals = new Mongo.Collection(null);
    HealthcareServices = new Mongo.Collection(null);
    ImagingStudies = new Mongo.Collection(null);
    Immunizations = new Mongo.Collection(null);
    Lists = new Mongo.Collection(null);
    Locations = new Mongo.Collection(null);
    Medications = new Mongo.Collection(null);
    MedicationOrders = new Mongo.Collection(null);
    MedicationStatements = new Mongo.Collection(null);
    Observations = new Mongo.Collection(null);
    Organizations = new Mongo.Collection(null);
    Patients = new Mongo.Collection(null);
    Persons = new Mongo.Collection(null);
    Practitioners = new Mongo.Collection(null);
    Questionnaires = new Mongo.Collection(null);
    QuestionnaireResponses = new Mongo.Collection(null);
    RiskAssessments = new Mongo.Collection(null);
    RelatedPersons = new Mongo.Collection(null);
    PractitionerRoles = new Mongo.Collection(null);
    Procedures = new Mongo.Collection(null);
    Questionnaires = new Mongo.Collection(null);
    QuestionnaireResponses = new Mongo.Collection(null);
    Subscriptions = new Mongo.Collection(null); // if(Package['clinical:hl7-resource-allergy-intolerance']){
    //   Meteor.subscribe("AllergyIntolerances", {});
    // }

    if (Package['clinical:hl7-resource-audit-event']) {
      Meteor.subscribe("AuditEvents", {});
    } // if(Package['clinical:hl7-resource-condition']){
    //   Meteor.subscribe("Conditions", {});
    // }
    // if(Package['clinical:hl7-resource-careplan']){
    //   Meteor.subscribe("CarePlans", {});
    // }


    if (Package['clinical:hl7-resource-consent']) {
      Meteor.subscribe("Consents", {});
    } // if(Package['clinical:hl7-resource-contract']){
    //   Meteor.subscribe("Contracts", {});
    // }     
    // if(Package['clinical:hl7-resource-communication']){
    //   Meteor.subscribe("Communications", {});
    // }            
    // if(Package['clinical:hl7-resource-device']){
    //   Meteor.subscribe("Devices", {});
    // }
    // if(Package['clinical:hl7-resource-diagnostic-report']){
    //   Meteor.subscribe("DiagnosticReports", {});
    // }
    // if (Package['clinical:hl7-resource-endpoint']){
    //   Meteor.subscribe("Endpoints", {});
    // }
    // if(Package['clinical:hl7-resource-encounter']){
    //   Meteor.subscribe("Encounters", {});
    // }
    // if(Package['clinical:hl7-resource-family-member-history']){
    //   Meteor.subscribe("FamilyMemberHistories", {});
    // }
    // if(Package['clinical:hl7-resource-healthcare-service']){
    //   Meteor.subscribe("HealthcareServices", {});
    // }
    // if(Package['clinical:hl7-resource-imaging-study']){
    //   Meteor.subscribe("ImagingStudies", {});
    // }
    // if(Package['clinical:hl7-resource-immunization']){
    //   Meteor.subscribe("Immunizations", {});
    // }
    // if(Package['clinical:hl7-resource-list']){
    //   Meteor.subscribe("Lists", {});
    // }
    // if(Package['clinical:hl7-resource-location']){
    //   Meteor.subscribe("Locations", {});
    // }
    // if(Package['clinical:hl7-resource-medication']){
    //   Meteor.subscribe("Medications", {});
    // }
    // if(Package['clinical:hl7-resource-medication-order']){
    //   Meteor.subscribe("MedicationOrders", {});
    // }
    // if(Package['clinical:hl7-resource-medication-statement']){
    //   Meteor.subscribe("MedicationStatements", {});
    // }
    // if(Package['clinical:hl7-resource-observation']){
    //   Meteor.subscribe("Observations", {});
    // }
    // if(Package['clinical:hl7-resource-organization']){
    //   Meteor.subscribe("Organizations", {});
    // }
    // if(Package['clinical:hl7-resource-patient']){
    //   Meteor.subscribe("Patients", {});
    // }
    // if(Package['clinical:hl7-resource-person']){
    //   Meteor.subscribe("Persons", {});
    // }
    // if(Package['clinical:hl7-resource-practitioner']){
    //   Meteor.subscribe("Practitioners", {});
    // }      
    // if(Package['clinical:hl7-resource-questionnaire']){
    //   Meteor.subscribe("Questionnaires", {});
    // }
    // if(Package['clinical:hl7-resource-questionnaire-response']){
    //   Meteor.subscribe("QuestionnaireResponses", {});
    // }
    // if(Package['clinical:hl7-resource-risk-assessment']){
    //   Meteor.subscribe("RiskAssessments", {});
    // }
    // if(Package['clinical:hl7-resource-related-person']){
    //   Meteor.subscribe("RelatedPersons", {});
    // }
    // if(Package['clinical:hl7-resource-practitioner-role']){
    //   Meteor.subscribe("PractitionerRoles", {});
    // }
    // if(Package['clinical:hl7-resource-procedure']){
    //   Meteor.subscribe("Procedures", {});
    // }      
    // if(Package['clinical:hl7-resource-questionnaire']){
    //   Meteor.subscribe("Questionnaires", {});
    // }      
    // if(Package['clinical:hl7-resource-questionnaire-response']){
    //   Meteor.subscribe("QuestionnaireResponses", {});
    // }      
    // if(Package['clinical:hl7-resource-subscription']){
    //   Meteor.subscribe("Subscriptions", {});
    // }      

  });
}

if (Meteor.isServer) {
  console.log('Autopublishing loaded FHIR resources.');
  Meteor.startup(function () {
    //     if(Package['clinical:hl7-resource-allergy-intolerance']){
    //       Meteor.publish("AllergyIntolerances", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "AllergyIntolerances", query, {})
    //             return AllergyIntolerances.find(query);
    //           } else {
    //             Meteor.call('removeSubscription', "AllergyIntolerances")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "AllergyIntolerances", query, {})
    //           return AllergyIntolerances.find(query);
    //         }
    //       });
    //     }   
    // if(Package['clinical:hl7-resource-audit-event']){
    Meteor.publish("AuditEvents", function (query) {
      check(query, Match.Maybe(Object));

      if (get(Meteor, 'settings.public.defaults.requireAuthorization')) {
        if (this.userId) {
          Meteor.call('createSubscription', "AuditEvents", query, {});
          return AuditEvents.find(query);
        } else {
          Meteor.call('removeSubscription', "AuditEvents");
          return [];
        }
      } else {
        Meteor.call('createSubscription', "AuditEvents", query, {});
        return AuditEvents.find(query);
      }
    }); // }
    //     if(Package['clinical:hl7-resource-careplan']){
    //       Meteor.publish("CarePlans", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(typeof query === "undefined"){
    //           query = {};
    //         }
    //         let options = {
    //           sort: {}
    //         };
    //         options.sort['meta.lastUpdated'] = -1
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "CarePlans", query, options)
    //             return CarePlans.find(query, options);
    //           } else {
    //             Meteor.call('removeSubscription', "CarePlans")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "CarePlans", query, options)
    //           return CarePlans.find(query, options);
    //         }
    //       });
    //     }    
    //     if(Package['clinical:hl7-resource-communication']){
    //       Meteor.publish("Communications", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "Communications", query, {})
    //             return Communications.find(query);
    //           } else {
    //             Meteor.call('removeSubscription', "Communications")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "Communications", query, {})
    //           return Communications.find(query);
    //         }
    //       });
    //     }    
    //     if(Package['clinical:hl7-resource-condition']){
    //       Meteor.publish("Conditions", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "Conditions", query, {})
    //             return Conditions.find(query);
    //           } else {
    //             Meteor.call('removeSubscription', "Conditions")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "Conditions", query, {})
    //           return Conditions.find(query);
    //         }
    //       });
    //     }         

    if (Package['clinical:hl7-resource-consent']) {
      Meteor.publish("Consents", function (query) {
        check(query, Match.Maybe(Object));

        if (get(Meteor, 'settings.public.defaults.requireAuthorization')) {
          if (this.userId) {
            Meteor.call('createSubscription', "Consents", query, {});
            return Consents.find(query);
          } else {
            Meteor.call('removeSubscription', "Consents");
            return [];
          }
        } else {
          Meteor.call('createSubscription', "Consents", query, {});
          return Consents.find(query);
        }
      });
    } //     if(Package['clinical:hl7-resource-contract']){
    //       Meteor.publish("Contracts", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "Contracts", query, {})
    //             return Contracts.find(query);
    //           } else {
    //             Meteor.call('removeSubscription', "Contracts")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "Contracts", query, {})
    //           return Contracts.find(query);
    //         }
    //       });
    //     }     
    //     if(Package['clinical:hl7-resource-device']){
    //       Meteor.publish("Devices", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "Devices", query, {})
    //             return Devices.find(query);
    //           } else {
    //             Meteor.call('removeSubscription', "Devices")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "Devices", query, {})
    //           return Devices.find(query);
    //         }
    //       });
    //     }     
    //     if(Package['clinical:hl7-resource-diagnostic-report']){
    //       Meteor.publish("DiagnosticReports", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "DiagnosticReports", query, {})
    //             return DiagnosticReports.find(query);
    //           } else {
    //             Meteor.call('removeSubscription', "DiagnosticReports")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "DiagnosticReports", query, {})
    //           return DiagnosticReports.find(query);
    //         }
    //       });
    //     }
    //     if(Package['clinical:hl7-resource-encounter']){
    //       Meteor.publish("Encounters", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "Encounters", query, {})
    //             return Encounters.find(query);
    //           } else {
    //             Meteor.call('removeSubscription', "Encounters")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "Encounters", query, {})
    //           return Encounters.find(query);
    //         }
    //       });
    //     }   
    //     if(Package['clinical:hl7-resource-endpoint']){
    //       Meteor.publish("Endpoints", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "Endpoints", query, {})
    //             return Endpoints.find(query);
    //           } else {
    //             Meteor.call('removeSubscription', "Endpoints")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "Endpoints", query, {})
    //           return Endpoints.find(query);
    //         }
    //       });
    //     }   
    //     if(Package['clinical:hl7-resource-family-member-history']){
    //       Meteor.publish("FamilyMemberHistories", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "FamilyMemberHistories", query, {})
    //             return FamilyMemberHistories.find(query);
    //           } else {
    //             Meteor.call('removeSubscription', "FamilyMemberHistories")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "FamilyMemberHistories", query, {})
    //           return FamilyMemberHistories.find(query);
    //         }
    //       });
    //     }
    //     if(Package['clinical:hl7-resource-healthcare-service']){
    //       Meteor.publish("HealthcareServices", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "HealthcareServices", query, {})
    //             return HealthcareServices.find(query);
    //           } else {
    //             Meteor.call('removeSubscription', "HealthcareServices")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "HealthcareServices", query, {})
    //           return HealthcareServices.find(query);
    //         }
    //       });
    //     }
    //     if(Package['clinical:hl7-resource-imaging-study']){
    //       Meteor.publish("ImagingStudies", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "ImagingStudies", query, {})
    //             return ImagingStudies.find(query);
    //           } else {
    //             Meteor.call('removeSubscription', "ImagingStudies")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "ImagingStudies", query, {})
    //           return ImagingStudies.find(query);
    //         }
    //       });
    //     }
    //     if(Package['clinical:hl7-resource-immunization']){
    //       Meteor.publish("Immunizations", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "Immunizations", query, {})
    //             return Immunizations.find(query);
    //           } else {
    //             Meteor.call('removeSubscription', "Immunizations")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "Immunizations", query, {})
    //           return Immunizations.find(query);
    //         }
    //       });
    //     }
    //     if(Package['clinical:hl7-resource-list']){
    //       Meteor.publish("Lists", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "Communications", query, {})
    //             return Lists.find(query);
    //           } else {
    //             Meteor.call('removeSubscription', "Lists")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "Communications", query, {})
    //           return Lists.find(query);
    //         }
    //       });
    //     }
    //     if(Package['clinical:hl7-resource-location']){
    //       Meteor.publish("Locations", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "Locations", query, {})
    //             return Locations.find(query);
    //           } else {
    //             Meteor.call('removeSubscription', "Locations")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "Locations", query, {})
    //           return Locations.find(query);
    //         }
    //       });
    //     }
    //     if(Package['clinical:hl7-resource-medication']){
    //       Meteor.publish("Medications", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(typeof query === "undefined"){
    //           query = {};
    //         }
    //         let options = {
    //           sort: {}
    //         };
    //         options.sort['meta.lastUpdated'] = -1
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "Medications", query, options)
    //             return Medications.find(query, options);
    //           } else {
    //             Meteor.call('removeSubscription', "Medications")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "Medications", query, {})
    //           return Medications.find(query);
    //         }
    //       });
    //     }    
    //     if(Package['clinical:hl7-resource-medication-statement']){
    //       Meteor.publish("MedicationStatements", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "MedicationStatements", query, {})
    //             return MedicationStatements.find(query);
    //           } else {
    //             Meteor.call('removeSubscription', "MedicationStatements")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "MedicationStatements", query, {})
    //           return MedicationStatements.find(query);
    //         }
    //       });
    //     }        
    //     if(Package['clinical:hl7-resource-medication-order']){
    //       Meteor.publish("MedicationOrders", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "MedicationOrders", query, {})
    //             return MedicationOrders.find(query);
    //           } else {
    //             Meteor.call('removeSubscription', "MedicationOrders")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "MedicationOrders", query, {})
    //           return MedicationOrders.find(query);
    //         }
    //       });
    //     }   
    //     if(Package['clinical:hl7-resource-organization']){
    //       Meteor.publish("Organizations", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "Organizations", query, {})
    //             return Organizations.find(query);
    //           } else {
    //             Meteor.call('removeSubscription', "Organizations")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "Organizations", query, {})
    //           return Organizations.find(query);
    //         }
    //       });
    //     }
    //     if(Package['clinical:hl7-resource-observation']){
    //       Meteor.publish('Observations', function (query){
    //         check(query, Match.Maybe(Object))
    //         if(typeof query === "undefined"){
    //           query = {};
    //         }
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "Observations", query, {})
    //             return Observations.find(query);
    //           } else {
    //             Meteor.call('removeSubscription', "Observations")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "Observations", query, {})
    //           return Observations.find(query);
    //         }
    //       });
    //     }
    //     if(Package['clinical:hl7-resource-practitioner']){
    //       Meteor.publish("Practitioners", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "Practitioners", query, {})
    //             return Practitioners.find(query);
    //           } else {
    //             Meteor.call('removeSubscription', "Practitioners")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "Practitioners", query, {})
    //           return Practitioners.find(query);
    //         }
    //       });
    //     }    
    //     if(Package['clinical:hl7-resource-practitioner-role']){
    //       Meteor.publish("PractitionerRoles", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "PractitionerRoles", query, {})
    //             return PractitionerRoles.find(query);
    //           } else {
    //             Meteor.call('removeSubscription', "PractitionerRoles")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "PractitionerRoles", query, {})
    //           return PractitionerRoles.find(query);
    //         }
    //       });
    //     }
    //     if(Package['clinical:hl7-resource-patient']){
    //       Meteor.publish("Patients", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(typeof query === "undefined"){
    //           query = {};
    //         }
    //         let options = {
    //           sort: {}
    //         };
    //         options.sort['meta.lastUpdated'] = -1
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (!query) {
    //             query = {};
    //           }
    //           if (get(Meteor, 'settings.public.defaults.subscriptionLimit')) {
    //             options.limit = get(Meteor, 'settings.public.defaults.subscriptionLimit');
    //           }
    //           // user is logged in
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "Patients", query, options)
    //             return Patients.find(query, options);
    //           } else {
    //             Meteor.call('removeSubscription', "Patients")
    //             return [];
    //           }
    //         } else {
    //           Meteor.call('createSubscription', "Patients", query, options)
    //           return Patients.find(query);
    //         }
    //       });
    //     }
    //     if(Package['clinical:hl7-resource-person']){
    //       Meteor.publish("Persons", function (query){
    //         if(!query){
    //           query = {};
    //         }
    //         check(query, Match.Maybe(Object))
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "Persons", query, {})
    //             return Persons.find(query);
    //           } else {
    //             Meteor.call('removeSubscription', "Persons")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "Persons", query, {})
    //           return Persons.find(query);
    //         }
    //       });
    //     }    
    //     if(Package['clinical:hl7-resource-questionnaire-response']){
    //       Meteor.publish("QuestionnaireResponses", function (query){
    //         if(!query){
    //           query = {};
    //         }
    //         check(query, Match.Maybe(Object))
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "QuestionnaireResponses", query, {})
    //             return QuestionnaireResponses.find(query);
    //           } else {
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "QuestionnaireResponses", query, {})
    //           return QuestionnaireResponses.find(query);
    //         }
    //       });
    //     }
    //     if(Package['clinical:hl7-resource-questionnaire']){
    //       Meteor.publish("Questionnaires", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "Questionnaires", query, {})
    //             return Questionnaires.find(query);
    //           } else {
    //             Meteor.call('removeSubscription', "Questionnaires")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "Questionnaires", query, {})
    //           return Questionnaires.find(query);
    //         }
    //       });
    //     }
    //     if(Package['clinical:hl7-resource-related-person']){
    //       Meteor.publish("RelatedPersons", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "RelatedPersons", query, {})
    //             return RelatedPersons.find(query);
    //           } else {
    //             Meteor.call('removeSubscription', "RelatedPersons")
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "RelatedPersons", query, {})
    //           return RelatedPersons.find(query);
    //         }
    //       });
    //     }   
    //     if(Package['clinical:hl7-resource-risk-assessment']){
    //       Meteor.publish("RiskAssessments", function (query){
    //         check(query, Match.Maybe(Object))
    //         let options = {
    //           sort: {}
    //         };
    //         options.sort['meta.lastUpdated'] = -1
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (!query) {
    //             query = {};
    //           }
    //           if (get(Meteor, 'settings.public.defaults.subscriptionLimit')) {
    //             options.limit = get(Meteor, 'settings.public.defaults.subscriptionLimit');
    //           }
    //           // user is logged in
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "RiskAssessments", query, options)
    //             return RiskAssessments.find(query, options);
    //           } else {
    //             Meteor.call('removeSubscription', "RiskAssessments")
    //             return [];
    //           }
    //         } else {
    //           Meteor.call('createSubscription', "RiskAssessments", query, options)
    //           return RiskAssessments.find(query);
    //         }        
    //       });
    //     }   
    //     if(Package['clinical:hl7-resource-procedure']){
    //       Meteor.publish("Procedures", function (query){
    //         check(query, Match.Maybe(Object))
    //         if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //           if (this.userId) {
    //             Meteor.call('createSubscription', "Procedures", query, {})
    //             return Procedures.find(query);
    //           } else {
    //             Meteor.call('removeSubscription', "Procedures");
    //             return [];
    //           }  
    //         } else {
    //           Meteor.call('createSubscription', "Procedures", query, {})
    //           return Procedures.find(query);
    //         }      
    //       });
    //     }      
    //   });
    //   if(Package['clinical:hl7-resource-questionnaire']){
    //     Meteor.publish("Questionnaires", function (query){
    //       check(query, Match.Maybe(Object))
    //       if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //         if (this.userId) {
    //           Meteor.call('createSubscription', "Questionnaires", query, {})
    //           return Questionnaires.find(query);
    //         } else {
    //           Meteor.call('removeSubscription', "Questionnaires");
    //           return [];
    //         }  
    //       } else {
    //         Meteor.call('createSubscription', "Questionnaires", query, {})
    //         return Questionnaires.find(query);
    //       }      
    //     });
    //   }      
    //   if(Package['clinical:hl7-resource-questionnaire-response']){
    //     Meteor.publish("QuestionnaireResponses", function (query){
    //       check(query, Match.Maybe(Object))
    //       if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    //         if (this.userId) {
    //           Meteor.call('createSubscription', "QuestionnaireResponses", query, {})
    //           return QuestionnaireResponses.find(query);
    //         } else {
    //           Meteor.call('removeSubscription', "QuestionnaireResponses");
    //           return [];
    //         }  
    //       } else {
    //         Meteor.call('createSubscription', "QuestionnaireResponses", query, {})
    //         return QuestionnaireResponses.find(query);
    //       }      
    //     });

  }); //   if(Package['clinical:hl7-resource-subscription']){
  //     Meteor.publish("Subscriptions", function (query){
  //       check(query, Match.Maybe(Object))
  //       if (this.userId) {
  //         return Subscriptions.find(query);
  //       } else {
  //         return [];
  //       }  
  //     });
  //   }      
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"security.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/clinical_desktop-publish/security.js                                                             //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
// import { Meteor } from 'meteor/meteor';
// import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
// import { _ } from 'meteor/underscore';
// // // Don't let people write arbitrary data to their 'profile' field from the client
// // Meteor.users.deny({
// //   update() {
// //     return true;
// //   }
// // });
// // // Don't let people write arbitrary data to their 'profile' field from the client
// if(Package['clinical:hl7-resource-patient']){
//   Patients.allow({
//     update() { return true; },
//     insert() { return true; },
//     remove() { return true; }
//   });
// }
// if(Package['clinical:hl7-resource-allergy-intolerance']){
//   AllergyIntolerances.allow({
//     update() { return true; },
//     insert() { return true; },
//     remove() { return true; }
//   });
// }
// if(Package['clinical:hl7-resource-careplan']){
//   CarePlans.allow({
//     update() { return true; },
//     insert() { return true; },
//     remove() { return true; }
//   });
//   Goals.allow({
//     update() { return true; },
//     insert() { return true; },
//     remove() { return true; }
//   });
// }
// if(Package['clinical:hl7-resource-condition']){
//   Conditions.allow({
//     update() { return true; },
//     insert() { return true; },
//     remove() { return true; }
//   });
// }
// if(Package['clinical:hl7-resource-device']){
//   Devices.allow({
//     update() { return true; },
//     insert() { return true; },
//     remove() { return true; }
//   });
// }
// if(Package['clinical:hl7-resource-diagnostic-report']){
//   DiagnosticReports.allow({
//     update() { return true; },
//     insert() { return true; },
//     remove() { return true; }
//   });
// }
// if(Package['clinical:hl7-resource-immunization']){
//   Immunizations.allow({
//     update() { return true; },
//     insert() { return true; },
//     remove() { return true; }
//   });
// }
// if(Package['clinical:hl7-resource-list']){
//   Lists.allow({
//     update() { return true; },
//     insert() { return true; },
//     remove() { return true; }
//   });
// }
// if(Package['clinical:hl7-resource-location']){
//   Locations.allow({
//     update() { return true; },
//     insert() { return true; },
//     remove() { return true; }
//   });
// }
// if(Package['clinical:hl7-resource-medication']){
//   Medications.allow({
//     update() { return true; },
//     insert() { return true; },
//     remove() { return true; }
//   });
// }
// if(Package['clinical:hl7-resource-medication-order']){
//   MedicationOrders.allow({
//     update() { return true; },
//     insert() { return true; },
//     remove() { return true; }
//   });
// }
// if(Package['clinical:hl7-resource-medication-statement']){
//   MedicationStatements.allow({
//     update() { return true; },
//     insert() { return true; },
//     remove() { return true; }
//   });
// }
// if(Package['clinical:hl7-resource-observation']){
//   Observations.allow({
//     update() { return true; },
//     insert() { return true; },
//     remove() { return true; }
//   });
// }
// if(Package['clinical:hl7-resource-organization']){
//   Organizations.allow({
//     update() { return true; },
//     insert() { return true; },
//     remove() { return true; }
//   });
// }
// if(Package['clinical:hl7-resource-patient']){
//   Patients.allow({
//     update() { return true; },
//     insert() { return true; },
//     remove() { return true; }
//   });
// }
// if(Package['clinical:hl7-resource-practitioner']){
//   Practitioners.allow({
//     update() { return true; },
//     insert() { return true; },
//     remove() { return true; }
//   });
// }
// if(Package['clinical:hl7-resource-procedure']){
//   Procedures.allow({
//     update() { return true; },
//     insert() { return true; },
//     remove() { return true; }
//   });
// }
// if(Package['clinical:hl7-resource-risk-assessment']){
//   RiskAssessments.allow({
//     update() { return true; },
//     insert() { return true; },
//     remove() { return true; }
//   });    
// }
// // Get a list of all accounts methods by running `Meteor.server.method_handlers` in meteor shell
// const AUTH_METHODS = [
//   'login',
//   'logout',
//   'logoutOtherClients',
//   'getNewToken',
//   'removeOtherTokens',
//   'configureLoginService',
//   'changePassword',
//   'forgotPassword',
//   'resetPassword',
//   'verifyEmail',
//   'createUser',
//   'ATRemoveService',
//   'ATCreateUserServer',
//   'ATResendVerificationEmail',
// ];
// if (Meteor.isServer) {
//   // Only allow 2 login attempts per connection per 5 seconds
//   DDPRateLimiter.addRule({
//     name(name) {
//       return _.contains(AUTH_METHODS, name);
//     },
//     // Rate limit per connection ID
//     connectionId() { return true; },
//   }, 2, 5000);
// }
// // Security notifications
// if(Package['autopublish']){
//   console.log("*****************************************************************************")
//   console.log("HIPAA WARNING:  DO NOT STORE PROTECTED HEALTH INFORMATION IN THIS APP. ");  
//   console.log("Your application has the 'autopublish' package installed.  Please uninstall.");
//   console.log("");  
//   console.log("meteor remove autopublish");  
//   console.log("meteor add clinical:autopublish");  
//   console.log("");  
// }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"lib":{"PublishingHouse.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/clinical_desktop-publish/lib/PublishingHouse.js                                                  //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
PublishingHouse = {
  count: function () {
    return 10;
  }
};
module.exportDefault(PublishingHouse);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/node_modules/meteor/clinical:desktop-publish/autopublish.js");
require("/node_modules/meteor/clinical:desktop-publish/security.js");
require("/node_modules/meteor/clinical:desktop-publish/lib/PublishingHouse.js");

/* Exports */
Package._define("clinical:desktop-publish", {
  PublishingHouse: PublishingHouse
});

})();
