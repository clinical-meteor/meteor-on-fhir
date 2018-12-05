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
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var Collection2 = Package['aldeed:collection2'].Collection2;
var oAuth2Server = Package['prime8consulting:meteor-oauth2-server'].oAuth2Server;
var BaseModel = Package['clinical:base-model'].BaseModel;
var MetaSchema = Package['clinical:hl7-resource-datatypes'].MetaSchema;
var BaseSchema = Package['clinical:hl7-resource-datatypes'].BaseSchema;
var DomainResourceSchema = Package['clinical:hl7-resource-datatypes'].DomainResourceSchema;
var NarrativeSchema = Package['clinical:hl7-resource-datatypes'].NarrativeSchema;
var AddressSchema = Package['clinical:hl7-resource-datatypes'].AddressSchema;
var AnnotationSchema = Package['clinical:hl7-resource-datatypes'].AnnotationSchema;
var AttachmentSchema = Package['clinical:hl7-resource-datatypes'].AttachmentSchema;
var Code = Package['clinical:hl7-resource-datatypes'].Code;
var QuantitySchema = Package['clinical:hl7-resource-datatypes'].QuantitySchema;
var HumanNameSchema = Package['clinical:hl7-resource-datatypes'].HumanNameSchema;
var ReferenceSchema = Package['clinical:hl7-resource-datatypes'].ReferenceSchema;
var PeriodSchema = Package['clinical:hl7-resource-datatypes'].PeriodSchema;
var CodingSchema = Package['clinical:hl7-resource-datatypes'].CodingSchema;
var CodeableConceptSchema = Package['clinical:hl7-resource-datatypes'].CodeableConceptSchema;
var IdentifierSchema = Package['clinical:hl7-resource-datatypes'].IdentifierSchema;
var ContactPointSchema = Package['clinical:hl7-resource-datatypes'].ContactPointSchema;
var GroupSchema = Package['clinical:hl7-resource-datatypes'].GroupSchema;
var ConformanceSchema = Package['clinical:hl7-resource-datatypes'].ConformanceSchema;
var RangeSchema = Package['clinical:hl7-resource-datatypes'].RangeSchema;
var RatioSchema = Package['clinical:hl7-resource-datatypes'].RatioSchema;
var SampledDataSchema = Package['clinical:hl7-resource-datatypes'].SampledDataSchema;
var SignatureSchema = Package['clinical:hl7-resource-datatypes'].SignatureSchema;
var TimingSchema = Package['clinical:hl7-resource-datatypes'].TimingSchema;
var Address = Package['clinical:hl7-resource-datatypes'].Address;
var Annotation = Package['clinical:hl7-resource-datatypes'].Annotation;
var Attachment = Package['clinical:hl7-resource-datatypes'].Attachment;
var Quantity = Package['clinical:hl7-resource-datatypes'].Quantity;
var HumanName = Package['clinical:hl7-resource-datatypes'].HumanName;
var Reference = Package['clinical:hl7-resource-datatypes'].Reference;
var Period = Package['clinical:hl7-resource-datatypes'].Period;
var Coding = Package['clinical:hl7-resource-datatypes'].Coding;
var CodeableConcept = Package['clinical:hl7-resource-datatypes'].CodeableConcept;
var Identifier = Package['clinical:hl7-resource-datatypes'].Identifier;
var ContactPoint = Package['clinical:hl7-resource-datatypes'].ContactPoint;
var Group = Package['clinical:hl7-resource-datatypes'].Group;
var Conformance = Package['clinical:hl7-resource-datatypes'].Conformance;
var Range = Package['clinical:hl7-resource-datatypes'].Range;
var Ratio = Package['clinical:hl7-resource-datatypes'].Ratio;
var SampledData = Package['clinical:hl7-resource-datatypes'].SampledData;
var Signature = Package['clinical:hl7-resource-datatypes'].Signature;
var Timing = Package['clinical:hl7-resource-datatypes'].Timing;
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
var _ = Package.underscore._;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Random = Package.random.Random;
var EJSON = Package.ejson.EJSON;
var FastClick = Package.fastclick.FastClick;
var LaunchScreen = Package['launch-screen'].LaunchScreen;
var CollectionHooks = Package['matb33:collection-hooks'].CollectionHooks;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var ProcedureRequest, ProcedureRequests, ProcedureRequestSchema;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/clinical_hl7-resource-procedure-request/lib/hl7-resource-procedure-request.js       //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //

// create the object using our BaseModel
ProcedureRequest = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
ProcedureRequest.prototype._collection = ProcedureRequests;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
ProcedureRequests = new Mongo.Collection('ProcedureRequests');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
ProcedureRequests._transform = function (document) {
  return new ProcedureRequest(document);
};


if (Meteor.isClient){
  Meteor.subscribe("ProcedureRequests");
}

if (Meteor.isServer){
  Meteor.publish("ProcedureRequests", function (argument){
    if (this.userId) {
      return ProcedureRequests.find();
    } else {
      return [];
    }
  });
}



ProcedureRequestSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "ProcedureRequest"
  },
  "identifier" : {
    optional: true,
    type: [ IdentifierSchema ]
  },
  "subject" : {
    optional: true,
    type: ReferenceSchema
  },
  "code" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "bodySite" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  },

  "reasonCodeableConceptSchema" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "reasonReferenceSchema" : {
    optional: true,
    type: ReferenceSchema
  },

  "scheduledDateTime" : {
    optional: true,
    type: Date
  },
  "scheduledPeriodSchema" : {
    optional: true,
    type: PeriodSchema
  },
  "scheduledTiming" : {
    optional: true,
    type: TimingSchema
  },
  "encounter" : {
    optional: true,
    type: ReferenceSchema
  },
  "performer" : {
    optional: true,
    type: ReferenceSchema
  },
  "status" : {
    optional: true,
    type: String
  },
  "notes" : {
    optional: true,
    type: [ AnnotationSchema ]
  },

  "asNeededBoolean" : {
    optional: true,
    type: Boolean
  },
  "asNeededCodeableConceptSchema" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "orderedOn" : {
    optional: true,
    type: Date
  },
  "orderer" : {
    optional: true,
    type: ReferenceSchema
  },
  "priority" : {
    optional: true,
    type: String
  }

});

ProcedureRequests.attachSchema(ProcedureRequestSchema);

//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("clinical:hl7-resource-procedure-request", {
  ProcedureRequest: ProcedureRequest,
  ProcedureRequests: ProcedureRequests,
  ProcedureRequestSchema: ProcedureRequestSchema
});

})();
