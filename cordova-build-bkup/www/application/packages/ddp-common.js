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
var Random = Package.random.Random;
var EJSON = Package.ejson.EJSON;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var Retry = Package.retry.Retry;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var Symbol = Package['ecmascript-runtime-client'].Symbol;
var Map = Package['ecmascript-runtime-client'].Map;
var Set = Package['ecmascript-runtime-client'].Set;

/* Package-scope variables */
var DDPCommon;

var require = meteorInstall({"node_modules":{"meteor":{"ddp-common":{"namespace.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/ddp-common/namespace.js                                                                             //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
/**
 * @namespace DDPCommon
 * @summary Namespace for DDPCommon-related methods/classes. Shared between 
 * `ddp-client` and `ddp-server`, where the ddp-client is the implementation
 * of a ddp client for both client AND server; and the ddp server is the
 * implementation of the livedata server and stream server. Common 
 * functionality shared between both can be shared under this namespace
 */
DDPCommon = {};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"heartbeat.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/ddp-common/heartbeat.js                                                                             //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
// Heartbeat options:
//   heartbeatInterval: interval to send pings, in milliseconds.
//   heartbeatTimeout: timeout to close the connection if a reply isn't
//     received, in milliseconds.
//   sendPing: function to call to send a ping on the connection.
//   onTimeout: function to call to close the connection.
DDPCommon.Heartbeat =
/*#__PURE__*/
function () {
  function Heartbeat(options) {
    this.heartbeatInterval = options.heartbeatInterval;
    this.heartbeatTimeout = options.heartbeatTimeout;
    this._sendPing = options.sendPing;
    this._onTimeout = options.onTimeout;
    this._seenPacket = false;
    this._heartbeatIntervalHandle = null;
    this._heartbeatTimeoutHandle = null;
  }

  var _proto = Heartbeat.prototype;

  _proto.stop = function () {
    function stop() {
      this._clearHeartbeatIntervalTimer();

      this._clearHeartbeatTimeoutTimer();
    }

    return stop;
  }();

  _proto.start = function () {
    function start() {
      this.stop();

      this._startHeartbeatIntervalTimer();
    }

    return start;
  }();

  _proto._startHeartbeatIntervalTimer = function () {
    function _startHeartbeatIntervalTimer() {
      var _this = this;

      this._heartbeatIntervalHandle = Meteor.setInterval(function () {
        return _this._heartbeatIntervalFired();
      }, this.heartbeatInterval);
    }

    return _startHeartbeatIntervalTimer;
  }();

  _proto._startHeartbeatTimeoutTimer = function () {
    function _startHeartbeatTimeoutTimer() {
      var _this2 = this;

      this._heartbeatTimeoutHandle = Meteor.setTimeout(function () {
        return _this2._heartbeatTimeoutFired();
      }, this.heartbeatTimeout);
    }

    return _startHeartbeatTimeoutTimer;
  }();

  _proto._clearHeartbeatIntervalTimer = function () {
    function _clearHeartbeatIntervalTimer() {
      if (this._heartbeatIntervalHandle) {
        Meteor.clearInterval(this._heartbeatIntervalHandle);
        this._heartbeatIntervalHandle = null;
      }
    }

    return _clearHeartbeatIntervalTimer;
  }();

  _proto._clearHeartbeatTimeoutTimer = function () {
    function _clearHeartbeatTimeoutTimer() {
      if (this._heartbeatTimeoutHandle) {
        Meteor.clearTimeout(this._heartbeatTimeoutHandle);
        this._heartbeatTimeoutHandle = null;
      }
    }

    return _clearHeartbeatTimeoutTimer;
  }(); // The heartbeat interval timer is fired when we should send a ping.


  _proto._heartbeatIntervalFired = function () {
    function _heartbeatIntervalFired() {
      // don't send ping if we've seen a packet since we last checked,
      // *or* if we have already sent a ping and are awaiting a timeout.
      // That shouldn't happen, but it's possible if
      // `this.heartbeatInterval` is smaller than
      // `this.heartbeatTimeout`.
      if (!this._seenPacket && !this._heartbeatTimeoutHandle) {
        this._sendPing(); // Set up timeout, in case a pong doesn't arrive in time.


        this._startHeartbeatTimeoutTimer();
      }

      this._seenPacket = false;
    }

    return _heartbeatIntervalFired;
  }(); // The heartbeat timeout timer is fired when we sent a ping, but we
  // timed out waiting for the pong.


  _proto._heartbeatTimeoutFired = function () {
    function _heartbeatTimeoutFired() {
      this._heartbeatTimeoutHandle = null;

      this._onTimeout();
    }

    return _heartbeatTimeoutFired;
  }();

  _proto.messageReceived = function () {
    function messageReceived() {
      // Tell periodic checkin that we have seen a packet, and thus it
      // does not need to send a ping this cycle.
      this._seenPacket = true; // If we were waiting for a pong, we got it.

      if (this._heartbeatTimeoutHandle) {
        this._clearHeartbeatTimeoutTimer();
      }
    }

    return messageReceived;
  }();

  return Heartbeat;
}();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"utils.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/ddp-common/utils.js                                                                                 //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

module.export({
  hasOwn: function () {
    return hasOwn;
  },
  slice: function () {
    return slice;
  },
  keys: function () {
    return keys;
  },
  isEmpty: function () {
    return isEmpty;
  },
  last: function () {
    return last;
  }
});
var hasOwn = Object.prototype.hasOwnProperty;
var slice = Array.prototype.slice;

function keys(obj) {
  return Object.keys(Object(obj));
}

function isEmpty(obj) {
  if (obj == null) {
    return true;
  }

  if (Array.isArray(obj) || typeof obj === "string") {
    return obj.length === 0;
  }

  for (var key in meteorBabelHelpers.sanitizeForInObject(obj)) {
    if (hasOwn.call(obj, key)) {
      return false;
    }
  }

  return true;
}

function last(array, n, guard) {
  if (array == null) {
    return;
  }

  if (n == null || guard) {
    return array[array.length - 1];
  }

  return slice.call(array, Math.max(array.length - n, 0));
}

DDPCommon.SUPPORTED_DDP_VERSIONS = ['1', 'pre2', 'pre1'];

DDPCommon.parseDDP = function (stringMessage) {
  try {
    var msg = JSON.parse(stringMessage);
  } catch (e) {
    Meteor._debug("Discarding message with invalid JSON", stringMessage);

    return null;
  } // DDP messages must be objects.


  if (msg === null || (0, _typeof2.default)(msg) !== 'object') {
    Meteor._debug("Discarding non-object DDP message", stringMessage);

    return null;
  } // massage msg to get it into "abstract ddp" rather than "wire ddp" format.
  // switch between "cleared" rep of unsetting fields and "undefined"
  // rep of same


  if (hasOwn.call(msg, 'cleared')) {
    if (!hasOwn.call(msg, 'fields')) {
      msg.fields = {};
    }

    msg.cleared.forEach(function (clearKey) {
      msg.fields[clearKey] = undefined;
    });
    delete msg.cleared;
  }

  ['fields', 'params', 'result'].forEach(function (field) {
    if (hasOwn.call(msg, field)) {
      msg[field] = EJSON._adjustTypesFromJSONValue(msg[field]);
    }
  });
  return msg;
};

DDPCommon.stringifyDDP = function (msg) {
  var copy = EJSON.clone(msg); // swizzle 'changed' messages from 'fields undefined' rep to 'fields
  // and cleared' rep

  if (hasOwn.call(msg, 'fields')) {
    var cleared = [];
    Object.keys(msg.fields).forEach(function (key) {
      var value = msg.fields[key];

      if (typeof value === "undefined") {
        cleared.push(key);
        delete copy.fields[key];
      }
    });

    if (!isEmpty(cleared)) {
      copy.cleared = cleared;
    }

    if (isEmpty(copy.fields)) {
      delete copy.fields;
    }
  } // adjust types to basic


  ['fields', 'params', 'result'].forEach(function (field) {
    if (hasOwn.call(copy, field)) {
      copy[field] = EJSON._adjustTypesToJSONValue(copy[field]);
    }
  });

  if (msg.id && typeof msg.id !== 'string') {
    throw new Error("Message id is not a string");
  }

  return JSON.stringify(copy);
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"method_invocation.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/ddp-common/method_invocation.js                                                                     //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
// Instance name is this because it is usually referred to as this inside a
// method definition

/**
 * @summary The state for a single invocation of a method, referenced by this
 * inside a method definition.
 * @param {Object} options
 * @instanceName this
 * @showInstanceName true
 */
DDPCommon.MethodInvocation =
/*#__PURE__*/
function () {
  function MethodInvocation(options) {
    // true if we're running not the actual method, but a stub (that is,
    // if we're on a client (which may be a browser, or in the future a
    // server connecting to another server) and presently running a
    // simulation of a server-side method for latency compensation
    // purposes). not currently true except in a client such as a browser,
    // since there's usually no point in running stubs unless you have a
    // zero-latency connection to the user.

    /**
     * @summary Access inside a method invocation.  Boolean value, true if this invocation is a stub.
     * @locus Anywhere
     * @name  isSimulation
     * @memberOf DDPCommon.MethodInvocation
     * @instance
     * @type {Boolean}
     */
    this.isSimulation = options.isSimulation; // call this function to allow other method invocations (from the
    // same client) to continue running without waiting for this one to
    // complete.

    this._unblock = options.unblock || function () {};

    this._calledUnblock = false; // current user id

    /**
     * @summary The id of the user that made this method call, or `null` if no user was logged in.
     * @locus Anywhere
     * @name  userId
     * @memberOf DDPCommon.MethodInvocation
     * @instance
     */

    this.userId = options.userId; // sets current user id in all appropriate server contexts and
    // reruns subscriptions

    this._setUserId = options.setUserId || function () {}; // On the server, the connection this method call came in on.

    /**
     * @summary Access inside a method invocation. The [connection](#meteor_onconnection) that this method was received on. `null` if the method is not associated with a connection, eg. a server initiated method call. Calls to methods made from a server method which was in turn initiated from the client share the same `connection`.
     * @locus Server
     * @name  connection
     * @memberOf DDPCommon.MethodInvocation
     * @instance
     */


    this.connection = options.connection; // The seed for randomStream value generation

    this.randomSeed = options.randomSeed; // This is set by RandomStream.get; and holds the random stream state

    this.randomStream = null;
  }
  /**
   * @summary Call inside a method invocation.  Allow subsequent method from this client to begin running in a new fiber.
   * @locus Server
   * @memberOf DDPCommon.MethodInvocation
   * @instance
   */


  var _proto = MethodInvocation.prototype;

  _proto.unblock = function () {
    function unblock() {
      this._calledUnblock = true;

      this._unblock();
    }

    return unblock;
  }();
  /**
   * @summary Set the logged in user.
   * @locus Server
   * @memberOf DDPCommon.MethodInvocation
   * @instance
   * @param {String | null} userId The value that should be returned by `userId` on this connection.
   */


  _proto.setUserId = function () {
    function setUserId(userId) {
      if (this._calledUnblock) {
        throw new Error("Can't call setUserId in a method after calling unblock");
      }

      this.userId = userId;

      this._setUserId(userId);
    }

    return setUserId;
  }();

  return MethodInvocation;
}();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"random_stream.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// packages/ddp-common/random_stream.js                                                                         //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
// RandomStream allows for generation of pseudo-random values, from a seed.
//
// We use this for consistent 'random' numbers across the client and server.
// We want to generate probably-unique IDs on the client, and we ideally want
// the server to generate the same IDs when it executes the method.
//
// For generated values to be the same, we must seed ourselves the same way,
// and we must keep track of the current state of our pseudo-random generators.
// We call this state the scope. By default, we use the current DDP method
// invocation as our scope.  DDP now allows the client to specify a randomSeed.
// If a randomSeed is provided it will be used to seed our random sequences.
// In this way, client and server method calls will generate the same values.
//
// We expose multiple named streams; each stream is independent
// and is seeded differently (but predictably from the name).
// By using multiple streams, we support reordering of requests,
// as long as they occur on different streams.
//
// @param options {Optional Object}
//   seed: Array or value - Seed value(s) for the generator.
//                          If an array, will be used as-is
//                          If a value, will be converted to a single-value array
//                          If omitted, a random array will be used as the seed.
DDPCommon.RandomStream =
/*#__PURE__*/
function () {
  function RandomStream(options) {
    this.seed = [].concat(options.seed || randomToken());
    this.sequences = Object.create(null);
  } // Get a random sequence with the specified name, creating it if does not exist.
  // New sequences are seeded with the seed concatenated with the name.
  // By passing a seed into Random.create, we use the Alea generator.


  var _proto = RandomStream.prototype;

  _proto._sequence = function () {
    function _sequence(name) {
      var self = this;
      var sequence = self.sequences[name] || null;

      if (sequence === null) {
        var sequenceSeed = self.seed.concat(name);

        for (var i = 0; i < sequenceSeed.length; i++) {
          if (typeof sequenceSeed[i] === "function") {
            sequenceSeed[i] = sequenceSeed[i]();
          }
        }

        self.sequences[name] = sequence = Random.createWithSeeds.apply(null, sequenceSeed);
      }

      return sequence;
    }

    return _sequence;
  }();

  return RandomStream;
}(); // Returns a random string of sufficient length for a random seed.
// This is a placeholder function; a similar function is planned
// for Random itself; when that is added we should remove this function,
// and call Random's randomToken instead.


function randomToken() {
  return Random.hexString(20);
}

; // Returns the random stream with the specified name, in the specified
// scope. If a scope is passed, then we use that to seed a (not
// cryptographically secure) PRNG using the fast Alea algorithm.  If
// scope is null (or otherwise falsey) then we use a generated seed.
//
// However, scope will normally be the current DDP method invocation,
// so we'll use the stream with the specified name, and we should get
// consistent values on the client and server sides of a method call.

DDPCommon.RandomStream.get = function (scope, name) {
  if (!name) {
    name = "default";
  }

  if (!scope) {
    // There was no scope passed in; the sequence won't actually be
    // reproducible. but make it fast (and not cryptographically
    // secure) anyways, so that the behavior is similar to what you'd
    // get by passing in a scope.
    return Random.insecure;
  }

  var randomStream = scope.randomStream;

  if (!randomStream) {
    scope.randomStream = randomStream = new DDPCommon.RandomStream({
      seed: scope.randomSeed
    });
  }

  return randomStream._sequence(name);
}; // Creates a randomSeed for passing to a method call.
// Note that we take enclosing as an argument,
// though we expect it to be DDP._CurrentMethodInvocation.get()
// However, we often evaluate makeRpcSeed lazily, and thus the relevant
// invocation may not be the one currently in scope.
// If enclosing is null, we'll use Random and values won't be repeatable.


DDPCommon.makeRpcSeed = function (enclosing, methodName) {
  var stream = DDPCommon.RandomStream.get(enclosing, '/rpc/' + methodName);
  return stream.hexString(20);
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/node_modules/meteor/ddp-common/namespace.js");
require("/node_modules/meteor/ddp-common/heartbeat.js");
require("/node_modules/meteor/ddp-common/utils.js");
require("/node_modules/meteor/ddp-common/method_invocation.js");
require("/node_modules/meteor/ddp-common/random_stream.js");

/* Exports */
Package._define("ddp-common", {
  DDPCommon: DDPCommon
});

})();
