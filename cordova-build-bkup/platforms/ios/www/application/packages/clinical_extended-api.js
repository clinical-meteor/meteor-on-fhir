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
var Session = Package.session.Session;
var _ = Package.underscore._;
var ReactiveDict = Package['reactive-dict'].ReactiveDict;
var EJSON = Package.ejson.EJSON;
var WebApp = Package.webapp.WebApp;
var Log = Package.logging.Log;
var Tracker = Package.deps.Tracker;
var Deps = Package.deps.Deps;
var DDP = Package['ddp-client'].DDP;
var Mongo = Package.mongo.Mongo;
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
var FastClick = Package.fastclick.FastClick;
var LaunchScreen = Package['launch-screen'].LaunchScreen;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var decimals, Style, Collection;

(function(){

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
// packages/clinical_extended-api/client/meteor-extended-api.js              //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
                                                                             //
Meteor.isLandscape = function () {
    if(Session.get('appWidth') > Session.get('appHeight')){
        return true;
    } else {
        return false;
    }
};
  
Meteor.isPortrait = function () {
    if(Session.get('appHeight') > Session.get('appWidth')){
        return true;
    } else {
        return false;
    }
};
  
///////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
// packages/clinical_extended-api/client/session-extended-api.js             //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
                                                                             //
/**
 * @summary Toggles a boolean session variable true/false.
 * @locus Client
 * @memberOf Session
 * @name toggle
 * @version 1.2.3
 * @example
 * ```js
 *   Session.toggle('isSidebarVisible');
 * ```
 */

Session.toggle = function (session_variable) {
  if (Session.get(session_variable) === undefined) {
    Session.set(session_variable, undefined);
  } else if (Session.get(session_variable) === null) {
    Session.set(session_variable, null);
  } else if (Session.get(session_variable) === true) {
    Session.set(session_variable, false);
  } else if (Session.get(session_variable) === false) {
    Session.set(session_variable, true);
  }
  return true;
};

/**
 * @summary Clears a session variable.
 * @locus Client
 * @memberOf Session
 * @name clear
 * @version 1.2.3
 * @example
 * ```js
 *   Session.clear('activePatient');
 * ```
 */

Session.clear = function (session_variable) {
  Session.set(session_variable, null);
  return true;
};
Session.remove = function (session_variable) {
  Session.set(session_variable, undefined);
  return true;
};

Session.setAll = function (object) {
  console.log('object', object);

  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      console.log(key + " = " + object[key]);
      Session.set(key, object[key]);
    }
  }
  return true;
};

///////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
// packages/clinical_extended-api/client/random-extended-api.js              //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
                                                                             //
/**
 * @summary Generate a random date.
 * @locus Anywhere
 * @memberOf Random
 * @name date
 * @example
 * ```js
 *   Random.date();
 *   Random.date("1975-01-01");
 *   Random.date("1975-01-01", "YYYY/MM/DD");
 *   Random.date(null, "YYYY/MM/DD");
 *   new Date(Random.date());
 * ```
 */

Random.date = function (maxDateAgo, dateFormat) {
  if(!maxDateAgo){
    maxDateAgo = '1950-01-01';
  }
  if(!dateFormat){
    dateFormat = "YYYY-MM-DD";
  }

  var momentAgo =  moment(maxDateAgo)
  var now = new moment();
  var duration = moment.duration(now.diff(momentAgo));    
  var years = duration._data.years;
  var months = duration._data.months;
  var days = duration._data.days;
  var totalDays = duration.as('days');
  var randomDays = parseInt(Random.fraction() * totalDays);
  var randomDate = now.subtract(randomDays, 'days');

  return randomDate.format(dateFormat);
};


/**
 * @summary Generate a random integer.  Zero based counting.
 * @locus Anywhere
 * @memberOf Random
 * @name date
 * @example
 * ```js
 *   Random.date();
 * ```
 */
Random.integer = function (max) {
  if (!max){
    max = Number.MAX_SAFE_INTEGER;
  }
  var randomInt = parseInt(Random.fraction() * max);
  return randomInt;
};



/**
 * @summary Generate a random cardinal integer.  Doesn't include zero.
 * @locus Anywhere
 * @memberOf Random
 * @name date
 * @example
 * ```js
 *   Random.cardinal(10);
 * ```
 */
Random.cardinal = function (max) {
  if (!max){
    max = Number.MAX_SAFE_INTEGER;
  }
  var randomInt = parseInt(Random.fraction() * max) + 1;
  return randomInt;
};



/**
 * @summary Generate a random number (float).  
 * @locus Anywhere
 * @memberOf Random
 * @name date
 * @example
 * ```js
 *   Random.number(10);  
 * ```
 */
Random.number = function (max) {
  if (!max){
    max = Number.MAX_SAFE_INTEGER;
  }
  if (!decimals){
    decimals = 2;
  }
  var randomInt = parseFloat((Random.fraction() * max));
  return randomInt;
};



/**
 * @summary Generate a random number with 2 decimals.  
 * @locus Anywhere
 * @memberOf Random
 * @name date
 * @example
 * ```js
 *   Random.decimal(10);
 * ```
 */
Random.decimal = function (max, decimals) {
  if (!max){
    max = Number.MAX_SAFE_INTEGER;
  }
  if (!decimals){
    decimals = 2;
  }
  var randomInt = parseFloat((Random.fraction() * max).toFixed(decimals));
  return randomInt;
};


//--------------------------------------------------------------------------
// VITAL MEASURES

// The following functions use a random walk, and are prone to drift.
// Should modify them to use normal distributions around empirical data.  

/**
 * @summary Generate a random weight (in lbs).
 * @locus Anywhere
 * @memberOf Random
 * @name date
 * @example
 * ```js
 *   Random.weight(150, 200);
 * ```
 */
Random.weight = function (lastWeight, variant) {
  if (!lastWeight){
    lastWeight = 150;
  }
  if (!variant){
    variant = 5;
  }

  var difference = variant * 2;
  var lowerLossBound = lastWeight - variant;  
  var randomWeightDiff = parseFloat(Random.fraction() * difference);
  var randomWeight = lowerLossBound + randomWeightDiff;
  
  return parseFloat(randomWeight.toFixed(1));
};



///////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
// packages/clinical_extended-api/lib/Style.js                               //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
                                                                             //
Style = {};


/**
 * @summary Serializes a json object into a text string.
 * @locus Anywhere
 * @memberOf Style
 * @return {String}
 * @name parse
 * @example
 * Template.foo.helpers({
 *   getPageWidth: function(){
 *     return Style.parse({
 *       "width": "80%",
 *       "padding-left": "80%",
 *       "padding-right": "80%"
 *     });
 *   }
 * });
 */


Style.parse = function (json) {
  var result = "";
  $.each(json, function (key, val, index) {
    result = result + key + ":" + val;
    if (index !== 0) {
      result = result + ";";
    }
  });
  return result;
};

///////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("clinical:extended-api", {
  Random: Random,
  Session: Session,
  Meteor: Meteor,
  Collection: Collection,
  Style: Style
});

})();
