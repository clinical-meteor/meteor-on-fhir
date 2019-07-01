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
var Meteor = Package['clinical:extended-api'].Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Mongo = Package.mongo.Mongo;
var Collection2 = Package['aldeed:collection2'].Collection2;
var moment = Package['mrt:moment'].moment;
var Session = Package['clinical:extended-api'].Session;
var HTTP = Package.http.HTTP;
var ReactMeteorData = Package['react-meteor-data'].ReactMeteorData;
var HipaaLogger = Package['clinical:hipaa-logger'].HipaaLogger;
var HipaaLog = Package['clinical:hipaa-logger'].HipaaLog;
var Random = Package.random.Random;
var Collection = Package['clinical:extended-api'].Collection;
var Style = Package['clinical:extended-api'].Style;
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
var MoneySchema = Package['clinical:hl7-resource-datatypes'].MoneySchema;
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
var BasicSchema = Package['clinical:hl7-resource-datatypes'].BasicSchema;
var OperationDefinitionSchema = Package['clinical:hl7-resource-datatypes'].OperationDefinitionSchema;
var StructureDefinitionSchema = Package['clinical:hl7-resource-datatypes'].StructureDefinitionSchema;
var ValueSetSchema = Package['clinical:hl7-resource-datatypes'].ValueSetSchema;
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
var Bundle = Package['clinical:hl7-resource-bundle'].Bundle;
var Bundles = Package['clinical:hl7-resource-bundle'].Bundles;
var BundleSchema = Package['clinical:hl7-resource-bundle'].BundleSchema;
var AuditEvent = Package['clinical:hl7-resource-audit-event'].AuditEvent;
var AuditEvents = Package['clinical:hl7-resource-audit-event'].AuditEvents;
var AuditEventSchema = Package['clinical:hl7-resource-audit-event'].AuditEventSchema;
var WebApp = Package.webapp.WebApp;
var Log = Package.logging.Log;
var Tracker = Package.deps.Tracker;
var Deps = Package.deps.Deps;
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
var HipaaAuditLog;

var require = meteorInstall({"node_modules":{"meteor":{"clinical:hipaa-audit-log":{"lib":{"HipaaAuditLog.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// packages/clinical_hipaa-audit-log/lib/HipaaAuditLog.js                                      //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
HipaaAuditLog = {
  configure: function (configObject) {
    if (Meteor.isClient) {
      Session.set('HipaaAuditLogConfig', configObject);
    } //console.log("HipaaAuditLogConfig.configObject", configObject);

  }
};

if (Meteor.isClient) {
  Session.setDefault('HipaaAuditLogConfig', {
    classes: {
      input: "",
      select: "",
      ribbon: ""
    },
    highlightColor: ""
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////

}},"index.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// packages/clinical_hipaa-audit-log/index.jsx                                                 //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
module.export({
  AdminSidebarElements: function () {
    return AdminSidebarElements;
  },
  DynamicRoutes: function () {
    return DynamicRoutes;
  },
  HipaaLogPage: function () {
    return HipaaLogPage;
  }
});
var HipaaLogPage;
module.link("./client/HipaaLogPage", {
  "default": function (v) {
    HipaaLogPage = v;
  }
}, 0);
var DynamicRoutes = [{
  'name': 'HipaaLogPage',
  'path': '/hipaa-audit-log',
  'component': HipaaLogPage,
  'requireAuth': true
}];
var AdminSidebarElements = [{
  'primaryText': 'Hipaa Audit Log',
  'to': '/hipaa-audit-log',
  'href': '/hipaa-audit-log'
}];
/////////////////////////////////////////////////////////////////////////////////////////////////

},"client":{"HipaaLogPage.jsx":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// packages/clinical_hipaa-audit-log/client/HipaaLogPage.jsx                                   //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

module.export({
  HipaaLogPage: function () {
    return HipaaLogPage;
  }
});
var CardText, CardTitle;
module.link("material-ui/Card", {
  CardText: function (v) {
    CardText = v;
  },
  CardTitle: function (v) {
    CardTitle = v;
  }
}, 0);
var GlassCard, VerticalCanvas, Glass;
module.link("meteor/clinical:glass-ui", {
  GlassCard: function (v) {
    GlassCard = v;
  },
  VerticalCanvas: function (v) {
    VerticalCanvas = v;
  },
  Glass: function (v) {
    Glass = v;
  }
}, 1);
var Meteor;
module.link("meteor/meteor", {
  Meteor: function (v) {
    Meteor = v;
  }
}, 2);
var Session;
module.link("meteor/session", {
  Session: function (v) {
    Session = v;
  }
}, 3);
var React;
module.link("react", {
  "default": function (v) {
    React = v;
  }
}, 4);
var ReactMeteorData;
module.link("meteor/react-meteor-data", {
  ReactMeteorData: function (v) {
    ReactMeteorData = v;
  }
}, 5);
var ReactMixin;
module.link("react-mixin", {
  "default": function (v) {
    ReactMixin = v;
  }
}, 6);
var AuditEventsTable;
module.link("meteor/clinical:hl7-resource-audit-event", {
  AuditEventsTable: function (v) {
    AuditEventsTable = v;
  }
}, 7);

var HipaaLogPage =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(HipaaLogPage, _React$Component);

  function HipaaLogPage() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = HipaaLogPage.prototype;

  _proto.getMeteorData = function () {
    function getMeteorData() {
      var data = {
        style: {
          opacity: Session.get('globalOpacity')
        }
      };
      data.style = Glass.blur(data.style);
      data.style.appbar = Glass.darkroom(data.style.appbar);
      data.style.tab = Glass.darkroom(data.style.tab);
      return data;
    }

    return getMeteorData;
  }();

  _proto.render = function () {
    function render() {
      if (process.env.NODE_ENV === "test") console.log('In HipaaLogPage render');
      return React.createElement("div", {
        id: "conditionsPage"
      }, React.createElement(VerticalCanvas, null, React.createElement(GlassCard, {
        height: "auto"
      }, React.createElement(CardTitle, {
        title: "HIPAA - Audit Events"
      }), React.createElement(CardText, null, React.createElement(AuditEventsTable, null)))));
    }

    return render;
  }();

  return HipaaLogPage;
}(React.Component);

ReactMixin(HipaaLogPage.prototype, ReactMeteorData);
module.exportDefault(HipaaLogPage);
/////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".jsx",
    ".html"
  ]
});

require("/node_modules/meteor/clinical:hipaa-audit-log/lib/HipaaAuditLog.js");
var exports = require("/node_modules/meteor/clinical:hipaa-audit-log/index.jsx");

/* Exports */
Package._define("clinical:hipaa-audit-log", exports, {
  HipaaAuditLog: HipaaAuditLog
});

})();
