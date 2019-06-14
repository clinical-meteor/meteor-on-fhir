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
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;

/* Package-scope variables */
var Hook;

var require = meteorInstall({"node_modules":{"meteor":{"callback-hook":{"hook.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
// packages/callback-hook/hook.js                                                                  //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                   //
module.export({
  Hook: function () {
    return Hook;
  }
});
// XXX This pattern is under development. Do not add more callsites
// using this package for now. See:
// https://meteor.hackpad.com/Design-proposal-Hooks-YxvgEW06q6f
//
// Encapsulates the pattern of registering callbacks on a hook.
//
// The `each` method of the hook calls its iterator function argument
// with each registered callback.  This allows the hook to
// conditionally decide not to call the callback (if, for example, the
// observed object has been closed or terminated).
//
// By default, callbacks are bound with `Meteor.bindEnvironment`, so they will be
// called with the Meteor environment of the calling code that
// registered the callback. Override by passing { bindEnvironment: false }
// to the constructor.
//
// Registering a callback returns an object with a single `stop`
// method which unregisters the callback.
//
// The code is careful to allow a callback to be safely unregistered
// while the callbacks are being iterated over.
//
// If the hook is configured with the `exceptionHandler` option, the
// handler will be called if a called callback throws an exception.
// By default (if the exception handler doesn't itself throw an
// exception, or if the iterator function doesn't return a falsy value
// to terminate the calling of callbacks), the remaining callbacks
// will still be called.
//
// Alternatively, the `debugPrintExceptions` option can be specified
// as string describing the callback.  On an exception the string and
// the exception will be printed to the console log with
// `Meteor._debug`, and the exception otherwise ignored.
//
// If an exception handler isn't specified, exceptions thrown in the
// callback will propagate up to the iterator function, and will
// terminate calling the remaining callbacks if not caught.
var hasOwn = Object.prototype.hasOwnProperty;

var Hook =
/*#__PURE__*/
function () {
  function Hook(options) {
    options = options || {};
    this.nextCallbackId = 0;
    this.callbacks = Object.create(null); // Whether to wrap callbacks with Meteor.bindEnvironment

    this.bindEnvironment = true;

    if (options.bindEnvironment === false) {
      this.bindEnvironment = false;
    }

    if (options.exceptionHandler) {
      this.exceptionHandler = options.exceptionHandler;
    } else if (options.debugPrintExceptions) {
      if (typeof options.debugPrintExceptions !== "string") {
        throw new Error("Hook option debugPrintExceptions should be a string");
      }

      this.exceptionHandler = options.debugPrintExceptions;
    }
  }

  var _proto = Hook.prototype;

  _proto.register = function () {
    function register(callback) {
      var _this2 = this;

      var exceptionHandler = this.exceptionHandler || function (exception) {
        // Note: this relies on the undocumented fact that if bindEnvironment's
        // onException throws, and you are invoking the callback either in the
        // browser or from within a Fiber in Node, the exception is propagated.
        throw exception;
      };

      if (this.bindEnvironment) {
        callback = Meteor.bindEnvironment(callback, exceptionHandler);
      } else {
        callback = dontBindEnvironment(callback, exceptionHandler);
      }

      var id = this.nextCallbackId++;
      this.callbacks[id] = callback;
      return {
        stop: function () {
          delete _this2.callbacks[id];
        }
      };
    }

    return register;
  }(); // For each registered callback, call the passed iterator function
  // with the callback.
  //
  // The iterator function can choose whether or not to call the
  // callback.  (For example, it might not call the callback if the
  // observed object has been closed or terminated).
  //
  // The iteration is stopped if the iterator function returns a falsy
  // value or throws an exception.
  //


  _proto.each = function () {
    function each(iterator) {
      // Invoking bindEnvironment'd callbacks outside of a Fiber in Node doesn't
      // run them to completion (and exceptions thrown from onException are not
      // propagated), so we need to be in a Fiber.
      Meteor._nodeCodeMustBeInFiber();

      var ids = Object.keys(this.callbacks);

      for (var i = 0; i < ids.length; ++i) {
        var id = ids[i]; // check to see if the callback was removed during iteration

        if (hasOwn.call(this.callbacks, id)) {
          var callback = this.callbacks[id];

          if (!iterator(callback)) {
            break;
          }
        }
      }
    }

    return each;
  }();

  return Hook;
}();

// Copied from Meteor.bindEnvironment and removed all the env stuff.
function dontBindEnvironment(func, onException, _this) {
  if (!onException || typeof onException === 'string') {
    var description = onException || "callback of async function";

    onException = function (error) {
      Meteor._debug("Exception in " + description + ":", error && error.stack || error);
    };
  }

  return function () {
    try {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var ret = func.apply(_this, args);
    } catch (e) {
      onException(e);
    }

    return ret;
  };
}
/////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/callback-hook/hook.js");

/* Exports */
Package._define("callback-hook", exports, {
  Hook: Hook
});

})();
