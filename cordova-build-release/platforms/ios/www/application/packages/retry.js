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
var Random = Package.random.Random;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;

/* Package-scope variables */
var Retry;

var require = meteorInstall({"node_modules":{"meteor":{"retry":{"retry.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////
//                                                                                     //
// packages/retry/retry.js                                                             //
//                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////
                                                                                       //
module.export({
  Retry: function () {
    return Retry;
  }
});

var Retry =
/*#__PURE__*/
function () {
  function Retry() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$baseTimeout = _ref.baseTimeout,
        baseTimeout = _ref$baseTimeout === void 0 ? 1000 : _ref$baseTimeout,
        _ref$exponent = _ref.exponent,
        exponent = _ref$exponent === void 0 ? 2.2 : _ref$exponent,
        _ref$maxTimeout = _ref.maxTimeout,
        maxTimeout = _ref$maxTimeout === void 0 ? 5 * 60 * 1000 : _ref$maxTimeout,
        _ref$minTimeout = _ref.minTimeout,
        minTimeout = _ref$minTimeout === void 0 ? 10 : _ref$minTimeout,
        _ref$minCount = _ref.minCount,
        minCount = _ref$minCount === void 0 ? 2 : _ref$minCount,
        _ref$fuzz = _ref.fuzz,
        fuzz = _ref$fuzz === void 0 ? 0.5 : _ref$fuzz;

    this.baseTimeout = baseTimeout;
    this.exponent = exponent;
    this.maxTimeout = maxTimeout;
    this.minTimeout = minTimeout;
    this.minCount = minCount;
    this.fuzz = fuzz;
    this.retryTimer = null;
  } // Reset a pending retry, if any.


  var _proto = Retry.prototype;

  _proto.clear = function () {
    function clear() {
      if (this.retryTimer) {
        clearTimeout(this.retryTimer);
      }

      this.retryTimer = null;
    }

    return clear;
  }(); // Calculate how long to wait in milliseconds to retry, based on the
  // `count` of which retry this is.


  _proto._timeout = function () {
    function _timeout(count) {
      if (count < this.minCount) {
        return this.minTimeout;
      } // fuzz the timeout randomly, to avoid reconnect storms when a
      // server goes down.


      var timeout = Math.min(this.maxTimeout, this.baseTimeout * Math.pow(this.exponent, count)) * (Random.fraction() * this.fuzz + (1 - this.fuzz / 2));
      return timeout;
    }

    return _timeout;
  }(); // Call `fn` after a delay, based on the `count` of which retry this is.


  _proto.retryLater = function () {
    function retryLater(count, fn) {
      var timeout = this._timeout(count);

      if (this.retryTimer) clearTimeout(this.retryTimer);
      this.retryTimer = Meteor.setTimeout(fn, timeout);
      return timeout;
    }

    return retryLater;
  }();

  return Retry;
}();
/////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/node_modules/meteor/retry/retry.js");

/* Exports */
Package._define("retry", exports, {
  Retry: Retry
});

})();
