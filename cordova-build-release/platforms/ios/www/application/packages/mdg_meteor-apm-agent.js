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
var Random = Package.random.Random;
var HTTP = Package.http.HTTP;

/* Package-scope variables */
var Kadira, BaseErrorModel, Retry, Ntp, getBrowserInfo, getResolution, getErrorStack, getInfoArray, getTime, checkSizeAndPickFields, httpRequest, ErrorModel;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/mdg_meteor-apm-agent/lib/common/unify.js                                                //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
Kadira = {};
Kadira.options = {};

if(Meteor.wrapAsync) {
  Kadira._wrapAsync = Meteor.wrapAsync;
} else {
  Kadira._wrapAsync = Meteor._wrapAsync;
}

if(Meteor.isServer) {
  var EventEmitter = Npm.require('events').EventEmitter;
  var eventBus = new EventEmitter();
  eventBus.setMaxListeners(0);

  var buildArgs = function(args) {
    args = _.toArray(args);
    var eventName = args[0] + '-' + args[1];
    var args = args.slice(2);
    args.unshift(eventName);
    return args;
  };
  
  Kadira.EventBus = {};
  _.each(['on', 'emit', 'removeListener', 'removeAllListeners'], function(m) {
    Kadira.EventBus[m] = function() {
      var args = buildArgs(arguments);
      return eventBus[m].apply(eventBus, args);
    };
  });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/mdg_meteor-apm-agent/lib/models/base_error.js                                           //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
BaseErrorModel = function(options) {
  this._filters = [];
};

BaseErrorModel.prototype.addFilter = function(filter) {
  if(typeof filter === 'function') {
    this._filters.push(filter);
  } else {
    throw new Error("Error filter must be a function");
  }
};

BaseErrorModel.prototype.removeFilter = function(filter) {
  var index = this._filters.indexOf(filter);
  if(index >= 0) {
    this._filters.splice(index, 1);
  }
};

BaseErrorModel.prototype.applyFilters = function(type, message, error, subType) {
  for(var lc=0; lc<this._filters.length; lc++) {
    var filter = this._filters[lc];
    try {
      var validated = filter(type, message, error, subType);
      if(!validated) return false;
    } catch (ex) {
      // we need to remove this filter
      // we may ended up in a error cycle
      this._filters.splice(lc, 1);
      throw new Error("an error thrown from a filter you've suplied", ex.message);
    }
  }

  return true;
};
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/mdg_meteor-apm-agent/lib/retry.js                                                       //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
// Retry logic with an exponential backoff.
//
// options:
//  baseTimeout: time for initial reconnect attempt (ms).
//  exponent: exponential factor to increase timeout each attempt.
//  maxTimeout: maximum time between retries (ms).
//  minCount: how many times to reconnect "instantly".
//  minTimeout: time to wait for the first `minCount` retries (ms).
//  fuzz: factor to randomize retry times by (to avoid retry storms).

//TODO: remove this class and use Meteor Retry in a later version of meteor.

Retry = function (options) {
  var self = this;
  _.extend(self, _.defaults(_.clone(options || {}), {
    baseTimeout: 1000, // 1 second
    exponent: 2.2,
    // The default is high-ish to ensure a server can recover from a
    // failure caused by load.
    maxTimeout: 5 * 60000, // 5 minutes
    minTimeout: 10,
    minCount: 2,
    fuzz: 0.5 // +- 25%
  }));
  self.retryTimer = null;
};

_.extend(Retry.prototype, {

  // Reset a pending retry, if any.
  clear: function () {
    var self = this;
    if(self.retryTimer)
      clearTimeout(self.retryTimer);
    self.retryTimer = null;
  },

  // Calculate how long to wait in milliseconds to retry, based on the
  // `count` of which retry this is.
  _timeout: function (count) {
    var self = this;

    if(count < self.minCount)
      return self.minTimeout;

    var timeout = Math.min(
      self.maxTimeout,
      self.baseTimeout * Math.pow(self.exponent, count));
    // fuzz the timeout randomly, to avoid reconnect storms when a
    // server goes down.
    timeout = timeout * ((Random.fraction() * self.fuzz) +
                         (1 - self.fuzz/2));
    return Math.ceil(timeout);
  },

  // Call `fn` after a delay, based on the `count` of which retry this is.
  retryLater: function (count, fn) {
    var self = this;
    var timeout = self._timeout(count);
    if(self.retryTimer)
      clearTimeout(self.retryTimer);

    self.retryTimer = setTimeout(fn, timeout);
    return timeout;
  }

});

//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/mdg_meteor-apm-agent/lib/ntp.js                                                         //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
var logger = getLogger();

Ntp = function (endpoint) {
  this.setEndpoint(endpoint);
  this.diff = 0;
  this.synced = false;
  this.reSyncCount = 0;
  this.reSync = new Retry({
    baseTimeout: 1000*60,
    maxTimeout: 1000*60*10,
    minCount: 0
  });
}

Ntp._now = function() {
  var now = Date.now();
  if(typeof now == 'number') {
    return now;
  } else if(now instanceof Date) {
    // some extenal JS libraries override Date.now and returns a Date object
    // which directly affect us. So we need to prepare for that
    return now.getTime();
  } else {
    // trust me. I've seen now === undefined
    return (new Date()).getTime();
  }
};

Ntp.prototype.setEndpoint = function(endpoint) {
  this.endpoint = endpoint + '/simplentp/sync';
};

Ntp.prototype.getTime = function() {
  return Ntp._now() + Math.round(this.diff);
};

Ntp.prototype.syncTime = function(localTime) {
  return localTime + Math.ceil(this.diff);
};

Ntp.prototype.sync = function() {
  logger('init sync');
  var self = this;
  var retryCount = 0;
  var retry = new Retry({
    baseTimeout: 1000*20,
    maxTimeout: 1000*60,
    minCount: 1,
    minTimeout: 0
  });
  syncTime();

  function syncTime () {
    if(retryCount<5) {
      logger('attempt time sync with server', retryCount);
      // if we send 0 to the retryLater, cacheDns will run immediately
      retry.retryLater(retryCount++, cacheDns);
    } else {
      logger('maximum retries reached');
      self.reSync.retryLater(self.reSyncCount++, function () {
        var args = [].slice.call(arguments);
        self.sync.apply(self, args);
      });
    }
  }

  // first attempt is to cache dns. So, calculation does not
  // include DNS resolution time
  function cacheDns () {
    self.getServerTime(function(err) {
      if(!err) {
        calculateTimeDiff();
      } else {
        syncTime();
      }
    });
  }

  function calculateTimeDiff () {
    var clientStartTime = (new Date()).getTime();
    self.getServerTime(function(err, serverTime) {
      if(!err && serverTime) {
        // (Date.now() + clientStartTime)/2 : Midpoint between req and res
        var networkTime = ((new Date()).getTime() - clientStartTime)/2
        var serverStartTime = serverTime - networkTime;
        self.diff = serverStartTime - clientStartTime;
        self.synced = true;
        // we need to send 1 into retryLater.
        self.reSync.retryLater(self.reSyncCount++, function () {
          var args = [].slice.call(arguments);
          self.sync.apply(self, args);
        });
        logger('successfully updated diff value', self.diff);
      } else {
        syncTime();
      }
    });
  }
}

Ntp.prototype.getServerTime = function(callback) {
  var self = this;

  if(Meteor.isServer) {
    var Fiber = Npm.require('fibers');
    new Fiber(function() {
      HTTP.get(self.endpoint, function (err, res) {
        if(err) {
          callback(err);
        } else {
          var serverTime = parseInt(res.content);
          callback(null, serverTime);
        }
      });
    }).run();
  } else {
    httpRequest('GET', self.endpoint, function(err, res) {
      if (err) {
        callback(err);
      } else {
        var serverTime = parseInt(res.content);
        callback(null, serverTime);
      }
    });
  }
};

function getLogger() {
  if(Meteor.isServer) {
    return Npm.require('debug')("kadira:ntp");
  } else {
    return function(message) {
      var canLogKadira =
        Meteor._localStorage.getItem('LOG_KADIRA') !== null
        && typeof console !== 'undefined';

      if(canLogKadira) {
        if(message) {
          message = "kadira:ntp " + message;
          arguments[0] = message;
        }
        console.log.apply(console, arguments);
      }
    }
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/mdg_meteor-apm-agent/lib/client/utils.js                                                //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
getBrowserInfo = function () {
  return {
    browser: window.navigator.userAgent,
    userId: Meteor.userId && Meteor.userId(),
    url: location.href,
    resolution: getResolution()
  };
}

getResolution = function () {
  if(screen && screen.width && screen.height) {
    var resolution = screen.width + 'x' + screen.height;
    return resolution;
  }
}

getErrorStack = function (zone, callback) {
  var trace = [];
  var eventMap = zone.eventMap || {};
  var infoMap = zone.infoMap || {};

  trace.push({
    at: (new Date().getTime()),
    stack: zone.erroredStack.get()
  });

  processZone();
  function processZone() {
    // we assume, first two zones are not interesting
    // bacause, they are some internal meteor loading stuffs
    if(zone && zone.depth > 2) {
      var stack = "";
      if(zone.currentStack) {
        stack = zone.currentStack.get();
      }

      var events = eventMap[zone.id];
      var info = getInfoArray(infoMap[zone.id]);
      var ownerArgsEvent = events && events[0] && events[0].type == 'owner-args' && events.shift();
      var runAt = (ownerArgsEvent)? ownerArgsEvent.at : zone.runAt;
      var ownerArgs = (ownerArgsEvent)? _.toArray(ownerArgsEvent.args) : [];

      // limiting
      events = _.map(_.last(events, 5), checkSizeAndPickFields(100));
      info = _.map(_.last(info, 5), checkSizeAndPickFields(100));
      ownerArgs = checkSizeAndPickFields(200)(_.first(ownerArgs, 5));

      zone.owner && delete zone.owner.zoneId;

      trace.push({
        createdAt: zone.createdAt,
        runAt: runAt,
        stack: stack,
        owner: zone.owner,
        ownerArgs: ownerArgs,
        events: events,
        info: info,
        zoneId: zone.id
      });
      zone = zone.parent;

      setTimeout(processZone, 0);
    } else {
      callback(trace);
    }
  }
}

getInfoArray = function (info) {
  return _(info || {}).map(function (value, type) {
    value.type = type;
    return value;
  })
}

getTime = function () {
  if(Kadira && Kadira.syncedDate) {
    return Kadira.syncedDate.getTime();
  } else {
    return (new Date().getTime());
  }
}

checkSizeAndPickFields = function(maxFieldSize) {
  return function(obj) {
    maxFieldSize = maxFieldSize || 100;
    for(var key in obj) {
      var value = obj[key];
      try {
        var valueStringified = JSON.stringify(value);
        if(valueStringified.length > maxFieldSize) {
          obj[key] = valueStringified.substr(0, maxFieldSize) + " ...";
        } else {
          obj[key] = value;
        }
      } catch(ex) {
        obj[key] = 'Error: cannot stringify value';
      }
    }
    return obj;
  }
}

httpRequest = function (method, url, options, callback) {
  /**
   * IE8 and IE9 does not support CORS with the usual XMLHttpRequest object
   * If XDomainRequest exists, use it to send errors.
   * XDR can POST data to HTTPS endpoints only if current page uses HTTPS
   */
  if (window.XDomainRequest) {
    var xdr = new XDomainRequest();
    url = matchPageProtocol(url);

    xdr.onload = function () {
      var headers = { 'Content-Type': xdr.contentType };
      callback(null, { content: xdr.responseText, headers: headers });
    }

    xdr.onerror = function () {
      callback({ statusCode: 404 });
    }

    xdr.open(method, url);
    xdr.send(options.content || null);

    function matchPageProtocol (endpoint) {
      var withoutProtocol = endpoint.substr(endpoint.indexOf(':') + 1);
      return window.location.protocol + withoutProtocol;
    }
  } else {
    HTTP.call(method, url, options, callback);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/mdg_meteor-apm-agent/lib/client/models/error.js                                         //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
ErrorModel = function(options) {
  BaseErrorModel.call(this);
  options = options || {};
  options.maxErrorsPerInterval = options.maxErrorsPerInterval || 10;
  options.intervalInMillis = options.intervalInMillis || 1000 * 60 *2; //2 mins
  options.waitForNtpSyncInterval = options.waitForNtpSyncInterval || 0;
  var self = this;

  self.options = options;

  // errorsSentCount will be reseted at the start of the interval
  self.errorsSentCount = 0;
  self.errorsSent = Object.create(null);
  self.intervalTimeoutHandler = setInterval(function() {
    self.errorsSentCount = 0;
    self._flushErrors();
  }, self.options.intervalInMillis);
};

_.extend(ErrorModel.prototype, BaseErrorModel.prototype);

ErrorModel.prototype.sendError = function(errorDef, err, force) {
  var self = this;
  if(!this.applyFilters('client', errorDef.name, err, errorDef.subType)) {
    return;
  };

  if(!this.canSendErrors()) {
    // reached maximum error count for this interval (1 min)
    return;
  }

  if(force) {
    sendError();
  } else {
    if(Kadira.syncedDate.synced || self.options.waitForNtpSyncInterval == 0) {
      sendError();
    } else {
      setTimeout(forceSendError, self.options.waitForNtpSyncInterval);
    }
  }

  function forceSendError() {
    self.sendError(errorDef, err, true);
  }

  function sendError() {
    if(!self.errorsSent[errorDef.name]) {
      // sync time with the server
      if(errorDef.startTime) {
        errorDef.startTime = Kadira.syncedDate.syncTime(errorDef.startTime);
      }
      errorDef.count = 1;
      var payload = {host: Kadira.options.hostname, errors: [errorDef]}
      Kadira.send(payload, '/errors');

      self.errorsSent[errorDef.name] = _.clone(errorDef);
      self.errorsSent[errorDef.name].count = 0;
      self.errorsSentCount++;
    } else {
      self.increamentErrorCount(errorDef.name);
    }
  }
};

ErrorModel.prototype._flushErrors = function() {
  var self = this;
  var errors = _.values(self.errorsSent);
  errors = _.filter(errors, function(error) {
    return error.count > 0;
  });

  if(errors.length > 0) {
    Kadira.send({errors: errors}, '/errors');
  }
  self.errorsSent = Object.create(null);
};

ErrorModel.prototype.isErrorExists = function(name) {
  return !!this.errorsSent[name];
};

ErrorModel.prototype.increamentErrorCount = function(name) {
  var error = this.errorsSent[name];
  if(error) {
    error.count++;
  }
};

ErrorModel.prototype.canSendErrors = function() {
  return this.errorsSentCount < this.options.maxErrorsPerInterval;
};

ErrorModel.prototype.close = function() {
  clearTimeout(this.intervalTimeoutHandler);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/mdg_meteor-apm-agent/lib/client/error_reporters/zone.js                                 //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
if(window.Zone && Zone.inited) {
  Zone.Reporters.add('kadira', kadiraZoneReporter);
}

function kadiraZoneReporter(zone) {
  // track only if error tracking is enabled
  if(!Kadira.options.enableErrorTracking) {
    return;
  }

  var errorName = Zone.Reporters.getErrorMessage(zone.erroredStack._e);
  if(Kadira.errors.isErrorExists(errorName)) {
    Kadira.errors.increamentErrorCount(errorName);
  } else if(Kadira.errors.canSendErrors()) {
    getErrorStack(zone, function(stacks) {
      Kadira.errors.sendError({
        appId : Kadira.options.appId,
        name : errorName,
        type : 'client',
        startTime : zone.runAt,
        subType : 'zone',
        info : getBrowserInfo(),
        stacks : JSON.stringify(stacks),
      });
    });
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/mdg_meteor-apm-agent/lib/client/error_reporters/window_error.js                         //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
var prevWindowOnError = window.onerror || Function.prototype;

window.onerror = function(message, url, line, col, error) {
  // track only if error tracking is enabled
  if(!Kadira.options.enableErrorTracking) {
    return prevWindowOnError(message, url, line, col, error);
  }

  url = url || '<anonymous>';
  line = line || 0;
  col = col || 0;

  if(error) {
    var stack = error.stack;
  } else {
    var stack = 'Error:\n    at window.onerror ('+url+':'+line+':'+col+')';
  }

  var now = (new Date().getTime());
  Kadira.errors.sendError({
    appId : Kadira.options.appId,
    name : message,
    type : 'client',
    startTime : now,
    subType : 'window.onerror',
    info : getBrowserInfo(),
    stacks : JSON.stringify([{at: now, events: [], stack: stack}]),
  });

  return prevWindowOnError(message, url, line, col, error);;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/mdg_meteor-apm-agent/lib/client/error_reporters/meteor_debug.js                         //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
var originalMeteorDebug = Meteor._debug;

Meteor._debug = function(m, s) {
  // We need to assign variables like this. Otherwise, 
  // we can't see proper error messages.
  // See: https://github.com/meteorhacks/kadira/issues/193
  var message = m;
  var stack = s;
  
  // track only if error tracking is enabled
  if(!Kadira.options.enableErrorTracking) {
    return originalMeteorDebug(message, stack);
  }

  // do not track if a zone is available (let zone handle the error)
  if(window.zone) {
    return originalMeteorDebug(message, stack);
  }

  // We hate Meteor._debug (no single usage pattern)
  if(message instanceof Error) {
    stack = message.stack;
    message = message.message
  } else if(typeof message == 'string' && stack === undefined) {
    stack = getStackFromMessage(message);
    message = firstLine(message);
  }

  // sometimes Meteor._debug is called with the stack concat to the message
  // FIXME Meteor._debug can be called in many ways
  if(message && stack === undefined) {
    stack = getStackFromMessage(message);
    message = firstLine(message);
  }

  var now = (new Date().getTime());
  Kadira.errors.sendError({
    appId : Kadira.options.appId,
    name : message,
    type : 'client',
    startTime : now,
    subType : 'meteor._debug',
    info : getBrowserInfo(),
    stacks : JSON.stringify([{at: now, events: [], stack: stack}]),
  });

  return originalMeteorDebug.apply(this, arguments);
};

var stackRegex = /^\s+at\s.+$/gm;
function getStackFromMessage (message) {
  // add empty string to add the empty line at start
  var stack = [''];
  var match;
  while(match = stackRegex.exec(message)) {
    stack.push(match[0]);
  }
  return stack.join('\n');
}

function firstLine (message) {
  return message.split('\n')[0];
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/mdg_meteor-apm-agent/lib/client/kadira.js                                               //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
Kadira.enableErrorTracking = function () {
  Kadira.options.enableErrorTracking = true;
};

Kadira.disableErrorTracking = function () {
  Kadira.options.enableErrorTracking = false;
};

Kadira.trackError = function (type, message, options) {
  if(Kadira.options.enableErrorTracking && type && message) {
    var now = (new Date()).getTime();
    options = options || {};
    _.defaults(options, {subType: 'client', stacks: ''});
    Kadira.errors.sendError({
      appId : Kadira.options.appId,
      name : message,
      source : 'client',
      startTime : now,
      type : type,
      subType : options.subType,
      info : getBrowserInfo(),
      stacks : JSON.stringify([{at: now, events: [], stack: options.stacks}]),
    });
  }
};

// Create new NTP object and error model immediately so it can be used
// endpoints is set later using __meteor_runtime_config__ or publication
Kadira.syncedDate = new Ntp(null);
Kadira.errors = new ErrorModel({
  waitForNtpSyncInterval: 1000 * 5, // 5 secs
  intervalInMillis: 1000 * 60 * 1, // 1minutes
  maxErrorsPerInterval: 5
});

// __meteor_runtime_config__ cannot be dynamically set for cordova apps
// using a null subscription to send required options to client
if(Meteor.isCordova) {
  var SettingsCollection = new Meteor.Collection('kadira_settings');
  SettingsCollection.find().observe({added: _.once(initialize)});
} else {
  initialize(__meteor_runtime_config__.kadira);
}

function initialize (options) {
  Kadira.options = options || {};
  _.defaults(Kadira.options, {
    errorDumpInterval: 1000*60,
    maxErrorsPerInterval: 10,
    collectAllStacks: false,
    enableErrorTracking: false,
  });

  if(Kadira.options.appId && Kadira.options.endpoint) {
    // update endpoint after receiving correct data
    Kadira.syncedDate.setEndpoint(Kadira.options.endpoint);
    Kadira.connected = true;
    Meteor.startup(function () {
      // if we don't do this this might block the initial rendering
      // or, it will show up bottom of the page, which is not cool
      setTimeout(function() {
        Kadira.syncedDate.sync();
      }, Kadira.options.clientEngineSyncDelay);
    });
  }

  if(Kadira.connected && Kadira.options.enableErrorTracking) {
    Kadira.enableErrorTracking();
  }

  if(window.Zone && Zone.inited) {
    Zone.collectAllStacks = Kadira.options.collectAllStacks;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/mdg_meteor-apm-agent/lib/profiler/client.js                                             //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
// For just making a notice
// meteorhacks:kadira-profiler will override this method to add
// actual functionality
Kadira.profileCpu = function profileCpu() {
  var message =
    "Please install meteorhacks:kadira-profiler" +
    " to take a CPU profile.";
  console.log(message);
};
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/mdg_meteor-apm-agent/lib/common/default_error_filters.js                                //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
var commonErrRegExps = [
  /connection timeout\. no (\w*) heartbeat received/i,
  /INVALID_STATE_ERR/i,
];

Kadira.errorFilters = {
  filterValidationErrors: function(type, message, err) {
    if(err && err instanceof Meteor.Error) {
      return false;
    } else {
      return true;
    }
  },

  filterCommonMeteorErrors: function(type, message) {
    for(var lc=0; lc<commonErrRegExps.length; lc++) {
      var regExp = commonErrRegExps[lc];
      if(regExp.test(message)) {
        return false;
      }
    }
    return true;
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/mdg_meteor-apm-agent/lib/common/send.js                                                 //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
Kadira.send = function (payload, path, callback) {
  if(!Kadira.connected)  {
    throw new Error("You need to connect with Kadira first, before sending messages!");
  }

  path = (path.substr(0, 1) != '/')? "/" + path : path;
  var endpoint = Kadira.options.endpoint + path;
  var retryCount = 0;
  var retry = new Retry({
    minCount: 1,
    minTimeout: 0,
    baseTimeout: 1000*5,
    maxTimeout: 1000*60,
  });

  var sendFunction = Kadira._getSendFunction();
  tryToSend();

  function tryToSend(err) {
    if(retryCount < 5) {
      retry.retryLater(retryCount++, send);
    } else {
      console.warn('Error sending error traces to kadira server');
      if(callback) callback(err);
    }
  }

  function send() {
    sendFunction(endpoint, payload, function(err, content, statusCode) {
      if(err) {
        tryToSend(err);
      } else if(statusCode == 200){
        if(callback) callback(null, content);
      } else {
        if(callback) callback(new Meteor.Error(statusCode, content));
      }
    });
  }
};

Kadira._getSendFunction = function() {
  return (Meteor.isServer)? Kadira._serverSend : Kadira._clientSend;
};

Kadira._clientSend = function (endpoint, payload, callback) {
  httpRequest('POST', endpoint, {
    headers: {
      'Content-Type': 'application/json'
    },
    content: JSON.stringify(payload)
  }, callback);
}

Kadira._serverSend = function (endpoint, payload, callback) {
  callback = callback || function() {};
  var Fiber = Npm.require('fibers');
  new Fiber(function() {
    var httpOptions = {
      data: payload,
      headers: Kadira.options.authHeaders
    };

    HTTP.call('POST', endpoint, httpOptions, function(err, res) {
      if(res) {
        var content = (res.statusCode == 200)? res.data : res.content;
        callback(null, content, res.statusCode);
      } else {
        callback(err);
      }
    });
  }).run();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("mdg:meteor-apm-agent", {
  Kadira: Kadira
});

})();
