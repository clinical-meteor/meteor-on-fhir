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
var Template = Package['templating-runtime'].Template;
var Session = Package.session.Session;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var Bert;

var require = meteorInstall({"node_modules":{"meteor":{"clinical:alert":{"templates":{"template.bert-alert.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/clinical_alert/templates/template.bert-alert.js                                       //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //

Template.__checkName("bertAlert");
Template["bertAlert"] = new Template("Template.bertAlert", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "bert-alert ", Spacebars.mustache(Spacebars.dot(view.lookup("alert"), "style")), " ", Spacebars.mustache(Spacebars.dot(view.lookup("alert"), "type")), " clearfix" ];
    }
  }, "\n    ", HTML.DIV({
    class: "bert-container"
  }, "\n      ", HTML.DIV({
    class: "bert-gem"
  }, "\n        ", HTML.I({
    class: function() {
      return [ "fa ", Spacebars.mustache(Spacebars.dot(view.lookup("alert"), "icon")) ];
    }
  }), "\n      "), "\n      ", HTML.DIV({
    class: "bert-content"
  }, "\n        ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("alert"), "title"));
  }, function() {
    return HTML.H5(Blaze.View("lookup:alert.title", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("alert"), "title"));
    }));
  }), "\n        ", HTML.P(Blaze.View("lookup:alert.message", function() {
    return Spacebars.makeRaw(Spacebars.mustache(Spacebars.dot(view.lookup("alert"), "message")));
  })), "\n      "), "\n    "), "\n  ");
}));

////////////////////////////////////////////////////////////////////////////////////////////////////

},"bert-alert.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/clinical_alert/templates/bert-alert.js                                                //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
Template.bertAlert.helpers({
  alert: function () {
    return Session.get('bertAlert');
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////

},"template.body.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/clinical_alert/templates/template.body.js                                             //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //

Template.body.addContent((function() {
  var view = this;
  return Spacebars.include(view.lookupTemplate("bertAlert"));
}));
Meteor.startup(Template.body.renderToDocument);

////////////////////////////////////////////////////////////////////////////////////////////////////

}},"bert.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/clinical_alert/bert.js                                                                //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var BertAlert =
/*#__PURE__*/
function () {
  function BertAlert() {
    this.styles = ['fixed-top', 'fixed-bottom', 'growl-top-left', 'growl-top-right', 'growl-bottom-left', 'growl-bottom-right'];
    this.types = ['default', 'success', 'info', 'warning', 'danger'];
    this.icons = {
      "default": 'fa-bell',
      success: 'fa-check',
      info: 'fa-info',
      warning: 'fa-warning',
      danger: 'fa-remove'
    };
    this.defaults = {
      hideDelay: 3500,
      style: 'fixed-top',
      type: 'default'
    };
  }

  var _proto = BertAlert.prototype;

  _proto.alert = function () {
    function alert() {
      var _this = this,
          _arguments = arguments;

      if (this.isVisible()) {
        this.hide();
        setTimeout(function () {
          _this.handleAlert(_arguments);
        }, 300);
      } else {
        this.handleAlert(arguments);
      }
    }

    return alert;
  }();

  _proto.isVisible = function () {
    function isVisible() {
      return $('.bert-alert').hasClass('show');
    }

    return isVisible;
  }();

  _proto.handleAlert = function () {
    function handleAlert(alert) {
      var _this2 = this;

      this.registerClickHandler();
      this.setBertOnSession(alert);
      setTimeout(function () {
        _this2.show();
      }, 20);
      this.bertTimer();
    }

    return handleAlert;
  }();

  _proto.registerClickHandler = function () {
    function registerClickHandler() {
      var _this3 = this;

      $('.bert-alert').off('click');
      $('.bert-alert').on('click', function () {
        _this3.hide();
      });
    }

    return registerClickHandler;
  }();

  _proto.bertTimer = function () {
    function bertTimer() {
      var _this4 = this;

      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        _this4.hide();
      }, this.defaults.hideDelay);
      return this.timer;
    }

    return bertTimer;
  }();

  _proto.show = function () {
    function show() {
      $('.bert-alert').addClass('show').delay(25).queue(function () {
        $('.bert-alert').addClass('animate').dequeue();
      });
    }

    return show;
  }();

  _proto.hide = function () {
    function hide() {
      $('.bert-alert').removeClass('animate');
      setTimeout(function () {
        $('.bert-alert').removeClass('show');
        Session.set('bertAlert', null);
      }, 300);
    }

    return hide;
  }();

  _proto.setBertOnSession = function () {
    function setBertOnSession(alert) {
      if ((0, _typeof2.default)(alert[0]) === 'object') {
        var type = alert[0].type || this.defaults.type;
        Session.set('bertAlert', {
          title: alert[0].title || "",
          message: alert[0].message || "",
          type: type,
          style: alert[0].style || this.defaults.style,
          icon: alert[0].icon || this.icons[type]
        });
      } else {
        var _type = alert[1] || this.defaults.type;

        Session.set('bertAlert', {
          message: alert[0] || "",
          type: _type,
          style: alert[2] || this.defaults.style,
          icon: alert[3] || this.icons[_type]
        });
      }
    }

    return setBertOnSession;
  }();

  return BertAlert;
}();

Bert = new BertAlert();
////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".scss"
  ]
});

require("/node_modules/meteor/clinical:alert/templates/template.bert-alert.js");
require("/node_modules/meteor/clinical:alert/templates/bert-alert.js");
require("/node_modules/meteor/clinical:alert/templates/template.body.js");
require("/node_modules/meteor/clinical:alert/bert.js");

/* Exports */
Package._define("clinical:alert", {
  Bert: Bert
});

})();
