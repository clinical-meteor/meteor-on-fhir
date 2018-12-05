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
var check = Package.check.check;
var Match = Package.check.Match;
var DDP = Package['ddp-client'].DDP;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;

/* Package-scope variables */
var ValidatedMethod;

var require = meteorInstall({"node_modules":{"meteor":{"mdg:validated-method":{"validated-method.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/mdg_validated-method/validated-method.js                                                             //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

module.export({
  ValidatedMethod: function () {
    return ValidatedMethod;
  }
});
var check, Match;
module.link("meteor/check", {
  check: function (v) {
    check = v;
  },
  Match: function (v) {
    Match = v;
  }
}, 0);

var ValidatedMethod =
/*#__PURE__*/
function () {
  function ValidatedMethod(options) {
    var _this$connection$meth;

    // Default to no mixins
    options.mixins = options.mixins || [];
    check(options.mixins, [Function]);
    check(options.name, String);
    options = applyMixins(options, options.mixins); // connection argument defaults to Meteor, which is where Methods are defined on client and
    // server

    options.connection = options.connection || Meteor; // Allow validate: null shorthand for methods that take no arguments

    if (options.validate === null) {
      options.validate = function () {};
    } // If this is null/undefined, make it an empty object


    options.applyOptions = options.applyOptions || {};
    check(options, Match.ObjectIncluding({
      name: String,
      validate: Function,
      run: Function,
      mixins: [Function],
      connection: Object,
      applyOptions: Object
    })); // Default options passed to Meteor.apply, can be overridden with applyOptions

    var defaultApplyOptions = {
      // Make it possible to get the ID of an inserted item
      returnStubValue: true,
      // Don't call the server method if the client stub throws an error, so that we don't end
      // up doing validations twice
      throwStubExceptions: true
    };
    options.applyOptions = (0, _objectSpread2.default)({}, defaultApplyOptions, options.applyOptions); // Attach all options to the ValidatedMethod instance

    Object.assign(this, options);
    var method = this;
    this.connection.methods((_this$connection$meth = {}, _this$connection$meth[options.name] = function (args) {
      // Silence audit-argument-checks since arguments are always checked when using this package
      check(args, Match.Any);
      var methodInvocation = this;
      return method._execute(methodInvocation, args);
    }, _this$connection$meth));
  }

  var _proto = ValidatedMethod.prototype;

  _proto.call = function () {
    function call(args, callback) {
      // Accept calling with just a callback
      if (typeof args === 'function') {
        callback = args;
        args = {};
      }

      try {
        return this.connection.apply(this.name, [args], this.applyOptions, callback);
      } catch (err) {
        if (callback) {
          // Get errors from the stub in the same way as from the server-side method
          callback(err);
        } else {
          // No callback passed, throw instead of silently failing; this is what
          // "normal" Methods do if you don't pass a callback.
          throw err;
        }
      }
    }

    return call;
  }();

  _proto._execute = function () {
    function _execute() {
      var methodInvocation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var args = arguments.length > 1 ? arguments[1] : undefined;
      // Add `this.name` to reference the Method name
      methodInvocation.name = this.name;
      var validateResult = this.validate.bind(methodInvocation)(args);

      if (typeof validateResult !== 'undefined') {
        throw new Error("Returning from validate doesn't do anything; perhaps you meant to throw an error?");
      }

      return this.run.bind(methodInvocation)(args);
    }

    return _execute;
  }();

  return ValidatedMethod;
}();

; // Mixins get a chance to transform the arguments before they are passed to the actual Method

function applyMixins(args, mixins) {
  // Save name of the method here, so we can attach it to potential error messages
  var _args = args,
      name = _args.name;
  mixins.forEach(function (mixin) {
    args = mixin(args);

    if (!Match.test(args, Object)) {
      var functionName = mixin.toString().match(/function\s(\w+)/);
      var msg = 'One of the mixins';

      if (functionName) {
        msg = "The function '" + functionName[1] + "'";
      }

      throw new Error("Error in " + name + " method: " + msg + " didn't return the options object.");
    }
  });
  return args;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/mdg:validated-method/validated-method.js");

/* Exports */
Package._define("mdg:validated-method", exports, {
  ValidatedMethod: ValidatedMethod
});

})();
