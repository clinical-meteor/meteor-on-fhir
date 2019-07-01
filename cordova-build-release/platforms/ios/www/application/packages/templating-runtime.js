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
var _ = Package.underscore._;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var Template;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/templating-runtime/templating.js                                                                    //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //

// Packages and apps add templates on to this object.

/**
 * @summary The class for defining templates
 * @class
 * @instanceName Template.myTemplate
 */
Template = Blaze.Template;

var RESERVED_TEMPLATE_NAMES = "__proto__ name".split(" ");

// Check for duplicate template names and illegal names that won't work.
Template.__checkName = function (name) {
  // Some names can't be used for Templates. These include:
  //  - Properties Blaze sets on the Template object.
  //  - Properties that some browsers don't let the code to set.
  //    These are specified in RESERVED_TEMPLATE_NAMES.
  if (name in Template || _.contains(RESERVED_TEMPLATE_NAMES, name)) {
    if ((Template[name] instanceof Template) && name !== "body")
      throw new Error("There are multiple templates named '" + name + "'. Each template needs a unique name.");
    throw new Error("This template name is reserved: " + name);
  }
};

// XXX COMPAT WITH 0.8.3
Template.__define__ = function (name, renderFunc) {
  Template.__checkName(name);
  Template[name] = new Template("Template." + name, renderFunc);
  // Exempt packages built pre-0.9.0 from warnings about using old
  // helper syntax, because we can.  It's not very useful to get a
  // warning about someone else's code (like a package on Atmosphere),
  // and this should at least put a bit of a dent in number of warnings
  // that come from packages that haven't been updated lately.
  Template[name]._NOWARN_OLDSTYLE_HELPERS = true;
};

// Define a template `Template.body` that renders its
// `contentRenderFuncs`.  `<body>` tags (of which there may be
// multiple) will have their contents added to it.

/**
 * @summary The [template object](#templates_api) representing your `<body>`
 * tag.
 * @locus Client
 */
Template.body = new Template('body', function () {
  var view = this;
  return _.map(Template.body.contentRenderFuncs, function (func) {
    return func.apply(view);
  });
});
Template.body.contentRenderFuncs = []; // array of Blaze.Views
Template.body.view = null;

Template.body.addContent = function (renderFunc) {
  Template.body.contentRenderFuncs.push(renderFunc);
};

// This function does not use `this` and so it may be called
// as `Meteor.startup(Template.body.renderIntoDocument)`.
Template.body.renderToDocument = function () {
  // Only do it once.
  if (Template.body.view)
    return;

  var view = Blaze.render(Template.body, document.body);
  Template.body.view = view;
};

// XXX COMPAT WITH 0.9.0
UI.body = Template.body;

// XXX COMPAT WITH 0.9.0
// (<body> tags in packages built with 0.9.0)
Template.__body__ = Template.body;
Template.__body__.__contentParts = Template.body.contentViews;
Template.__body__.__instantiate = Template.body.renderToDocument;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/templating-runtime/template.dynamic.js                                                              //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //

Template.__checkName("__dynamic");
Template["__dynamic"] = new Template("Template.__dynamic", (function() {
  var view = this;
  return [ Blaze.View("lookup:checkContext", function() {
    return Spacebars.mustache(view.lookup("checkContext"));
  }), "\n  ", Blaze.If(function() {
    return Spacebars.call(view.lookup("dataContextPresent"));
  }, function() {
    return [ "\n    ", Spacebars.include(view.lookupTemplate("__dynamicWithDataContext"), function() {
      return Blaze._InOuterTemplateScope(view, function() {
        return Spacebars.include(function() {
          return Spacebars.call(view.templateContentBlock);
        });
      });
    }), "\n  " ];
  }, function() {
    return [ "\n    \n    ", Blaze._TemplateWith(function() {
      return {
        template: Spacebars.call(view.lookup("template")),
        data: Spacebars.call(view.lookup(".."))
      };
    }, function() {
      return Spacebars.include(view.lookupTemplate("__dynamicWithDataContext"), function() {
        return Blaze._InOuterTemplateScope(view, function() {
          return Spacebars.include(function() {
            return Spacebars.call(view.templateContentBlock);
          });
        });
      });
    }), "\n  " ];
  }) ];
}));

Template.__checkName("__dynamicWithDataContext");
Template["__dynamicWithDataContext"] = new Template("Template.__dynamicWithDataContext", (function() {
  var view = this;
  return Spacebars.With(function() {
    return Spacebars.dataMustache(view.lookup("chooseTemplate"), view.lookup("template"));
  }, function() {
    return [ "\n    \n    ", Blaze._TemplateWith(function() {
      return Spacebars.call(Spacebars.dot(view.lookup(".."), "data"));
    }, function() {
      return Spacebars.include(view.lookupTemplate(".."), function() {
        return Blaze._InOuterTemplateScope(view, function() {
          return Spacebars.include(function() {
            return Spacebars.call(view.templateContentBlock);
          });
        });
      });
    }), "\n  " ];
  });
}));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/templating-runtime/dynamic.js                                                                       //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
var Template = Blaze.Template;

/**
 * @isTemplate true
 * @memberOf Template
 * @function dynamic
 * @summary Choose a template to include dynamically, by name.
 * @locus Templates
 * @param {String} template The name of the template to include.
 * @param {Object} [data] Optional. The data context in which to include the
 * template.
 */

Template.__dynamicWithDataContext.helpers({
  chooseTemplate: function (name) {
    return Blaze._getTemplate(name, function () {
      return Template.instance();
    });
  }
});

Template.__dynamic.helpers({
  dataContextPresent: function () {
    return _.has(this, "data");
  },
  checkContext: function () {
    if (! _.has(this, "template")) {
      throw new Error("Must specify name in the 'template' argument " +
                      "to {{> Template.dynamic}}.");
    }

    _.each(this, function (v, k) {
      if (k !== "template" && k !== "data") {
        throw new Error("Invalid argument to {{> Template.dynamic}}: " +
                        k);
      }
    });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("templating-runtime", {
  Template: Template
});

})();
