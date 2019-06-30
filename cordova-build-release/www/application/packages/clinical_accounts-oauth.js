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
var check = Package.check.check;
var Match = Package.check.Match;
var Accounts = Package['accounts-base'].Accounts;
var OAuth = Package['clinical:oauth'].OAuth;
var WebApp = Package.webapp.WebApp;
var Log = Package.logging.Log;
var Tracker = Package.deps.Tracker;
var Deps = Package.deps.Deps;
var Session = Package.session.Session;
var DDP = Package['ddp-client'].DDP;
var Mongo = Package.mongo.Mongo;
var Blaze = Package.ui.Blaze;
var UI = Package.ui.UI;
var Handlebars = Package.ui.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var Template = Package['templating-runtime'].Template;
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

var require = meteorInstall({"node_modules":{"meteor":{"clinical:accounts-oauth":{"oauth_common.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/clinical_accounts-oauth/oauth_common.js                                             //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
var get;
module.link("lodash", {
  get: function (v) {
    get = v;
  }
}, 0);
Accounts.oauth = {};
var services = {}; // Helper for registering OAuth based accounts packages.
// On the server, adds an index to the user collection.

Accounts.oauth.registerService = function (name) {
  if (get(Meteor, 'settings.public.logging') === "debug") {
    console.log('C3      Registering OAuth service in active server memory:  ', name);
  }

  if (_.has(services, name)) throw new Error("Duplicate service: " + name);
  services[name] = true;

  if (Meteor.server) {
    // Accounts.updateOrCreateUserFromExternalService does a lookup by this id,
    // so this should be a unique index. You might want to add indexes for other
    // fields returned by your service (eg services.github.login) but you can do
    // that in your app.
    Meteor.users._ensureIndex('services.' + name + '.id', {
      unique: 1,
      sparse: 1
    });
  }
}; // Removes a previously registered service.
// This will disable logging in with this service, and serviceNames() will not
// contain it.
// It's worth noting that already logged in users will remain logged in unless
// you manually expire their sessions.


Accounts.oauth.unregisterService = function (name) {
  if (!_.has(services, name)) throw new Error("Service not found: " + name);
  delete services[name];
};

Accounts.oauth.serviceNames = function () {
  return _.keys(services);
};
//////////////////////////////////////////////////////////////////////////////////////////////////

},"oauth_client.js":function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/clinical_accounts-oauth/oauth_client.js                                             //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
var get;
module.link("lodash", {
  get: function (v) {
    get = v;
  }
}, 0);

// Documentation for Meteor.loginWithExternalService

/**
 * @name loginWith<ExternalService>
 * @memberOf Meteor
 * @function
 * @summary Log the user in using an external service.
 * @locus Client
 * @param {Object} [options]
 * @param {String[]} options.requestPermissions A list of permissions to request from the user.
 * @param {Boolean} options.requestOfflineToken If true, asks the user for permission to act on their behalf when offline. This stores an additional offline token in the `services` field of the user document. Currently only supported with Google.
 * @param {Object} options.loginUrlParameters Provide additional parameters to the authentication URI. Currently only supported with Google. See [Google Identity Platform documentation](https://developers.google.com/identity/protocols/OpenIDConnect#authenticationuriparameters).
 * @param {String} options.loginHint An email address that the external service will use to pre-fill the login prompt. Currently only supported with Meteor developer accounts and Google accounts. If used with Google, the Google User ID can also be passed.
 * @param {String} options.loginStyle Login style ("popup" or "redirect", defaults to the login service configuration).  The "popup" style opens the login page in a separate popup window, which is generally preferred because the Meteor application doesn't need to be reloaded.  The "redirect" style redirects the Meteor application's window to the login page, and the login service provider redirects back to the Meteor application which is then reloaded.  The "redirect" style can be used in situations where a popup window can't be opened, such as in a mobile UIWebView.  The "redirect" style however relies on session storage which isn't available in Safari private mode, so the "popup" style will be forced if session storage can't be used.
 * @param {String} options.redirectUrl If using "redirect" login style, the user will be returned to this URL after authorisation has been completed.
 * @param {Function} [callback] Optional callback. Called with no arguments on success, or with a single `Error` argument on failure. The callback cannot be called if you are using the "redirect" `loginStyle`, because the app will have reloaded in the meantime; try using [client-side login hooks](#accounts_onlogin) instead.
 * @importFromPackage meteor
 */
// Allow server to specify a specify subclass of errors. We should come
// up with a more generic way to do this!
var convertError = function (err) {
  if (err && err instanceof Meteor.Error && err.error === Accounts.LoginCancelledError.numericError) return new Accounts.LoginCancelledError(err.reason);else return err;
}; // For the redirect login flow, the final step is that we're
// redirected back to the application.  The credentialToken for this
// login attempt is stored in the reload migration data, and the
// credentialSecret for a successful login is stored in session
// storage.


Meteor.startup(function () {
  var oauth = OAuth.getDataAfterRedirect();
  if (!oauth) return; // We'll only have the credentialSecret if the login completed
  // successfully.  However we still call the login method anyway to
  // retrieve the error if the login was unsuccessful.

  var methodName = 'login';
  var methodArguments = [{
    oauth: _.pick(oauth, 'credentialToken', 'credentialSecret')
  }];

  if (get(Meteor, 'settings.public.logging') === "debug") {
    console.log('Meteor.startup()');
  }

  var newLoginMethod = {
    methodArguments: methodArguments,
    userCallback: function (err) {
      // The redirect login flow is complete.  Construct an
      // `attemptInfo` object with the login result, and report back
      // to the code which initiated the login attempt
      // (e.g. accounts-ui, when that package is being used).
      err = convertError(err);

      Accounts._pageLoadLogin({
        type: oauth.loginService,
        allowed: !err,
        error: err,
        methodName: methodName,
        methodArguments: methodArguments
      });
    }
  };

  if (get(Meteor, 'settings.public.logging') === "debug") {
    console.log('Meteor.startup().newLoginMethod', newLoginMethod);
  }

  Accounts.callLoginMethod(newLoginMethod);
}); // Send an OAuth login method to the server. If the user authorized
// access in the popup this should log the user in, otherwise
// nothing should happen.

Accounts.oauth.tryLoginAfterPopupClosed = function (credentialToken, callback) {
  if (get(Meteor, 'settings.public.logging') === "debug") {
    console.log('C9.     Trying login now that the popup is closed.', credentialToken);
  }

  var credentialSecret = OAuth._retrieveCredentialSecret(credentialToken) || null;
  Accounts.callLoginMethod({
    methodArguments: [{
      oauth: {
        credentialToken: credentialToken,
        credentialSecret: credentialSecret
      }
    }],
    userCallback: callback && function (err) {
      callback(convertError(err));
    }
  });
};

Accounts.oauth.credentialRequestCompleteHandler = function (callback) {
  if (get(Meteor, 'settings.public.logging') === "debug") {
    console.log('C4.     Attempting to handle credetial request completion.');
  }

  return function (credentialTokenOrError) {
    if (credentialTokenOrError && credentialTokenOrError instanceof Error) {
      callback && callback(credentialTokenOrError);
    } else {
      Accounts.oauth.tryLoginAfterPopupClosed(credentialTokenOrError, callback);
    }
  };
};
//////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

require("/node_modules/meteor/clinical:accounts-oauth/oauth_common.js");
require("/node_modules/meteor/clinical:accounts-oauth/oauth_client.js");

/* Exports */
Package._define("clinical:accounts-oauth");

})();
