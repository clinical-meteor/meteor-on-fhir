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
var Accounts = Package['accounts-base'].Accounts;
var Mongo = Package.mongo.Mongo;

/* Package-scope variables */
var ServiceConfiguration;

(function(){

////////////////////////////////////////////////////////////////////////////////////////
//                                                                                    //
// packages/service-configuration/service_configuration_common.js                     //
//                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////
                                                                                      //
if (typeof ServiceConfiguration === 'undefined') {
  ServiceConfiguration = {};
}


// Table containing documents with configuration options for each
// login service
ServiceConfiguration.configurations = new Mongo.Collection(
  "meteor_accounts_loginServiceConfiguration", {
    _preventAutopublish: true,
    connection: Meteor.isClient ? Accounts.connection : Meteor.connection
  });
// Leave this collection open in insecure mode. In theory, someone could
// hijack your oauth connect requests to a different endpoint or appId,
// but you did ask for 'insecure'. The advantage is that it is much
// easier to write a configuration wizard that works only in insecure
// mode.


// Thrown when trying to use a login service which is not configured
ServiceConfiguration.ConfigError = function (serviceName) {
  if (Meteor.isClient && !Accounts.loginServicesConfigured()) {
    this.message = "Login service configuration not yet loaded";
  } else if (serviceName) {
    this.message = "Service " + serviceName + " not configured";
  } else {
    this.message = "Service not configured";
  }
};
ServiceConfiguration.ConfigError.prototype = new Error();
ServiceConfiguration.ConfigError.prototype.name = 'ServiceConfiguration.ConfigError';

////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("service-configuration", {
  ServiceConfiguration: ServiceConfiguration
});

})();
