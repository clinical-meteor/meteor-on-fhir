// https://www.hl7.org/fhir/riskassessment-example-prognosis.json.html
// https://www.hl7.org/fhir/riskassessment-example-cardiac.json.html
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Meteor.startup(function(){
  console.log("*************************************************************************************");
  console.log("*************************************************************************************");
  console.log("Starting up " + Meteor.settings.public.title);
  console.log("Environment: " + process.env.NODE_ENV);
  console.log("");

  if(process.env.DEBUG) console.log("Meteor.settings", Meteor.settings);

  if(process.env.NIGHTWATCH) console.log("Running application in testing mode.  Security disabled for testing related helper functions.");

  //var rootUrl = __meteor_runtime_config__.ROOT_URL;
  //console.log('Adding Content Security Policies for ' + rootUrl + ' and meteor-on-fhir.meteorapp.com');
  //BrowserPolicy.content.allowConnectOrigin(rootUrl);
  //BrowserPolicy.content.allowConnectOrigin(rootUrl.replace('http', 'ws'));
  //BrowserPolicy.content.allowConnectOrigin(rootUrl.replace('http', 'wss'));
  //BrowserPolicy.content.allowConnectOrigin('https://meteor-on-fhir.meteorapp.com');
  //BrowserPolicy.content.allowConnectOrigin('wss://meteor-on-fhir.meteorapp.com');

  if (process.env.INITIALIZE) {
    console.log("Initializing records...");

    Meteor.call('initializeSystem');
    Meteor.call('initializeAll');
  }

  // initialize Symptomatic plugins, if licensed and installed
  if(Package["symptomatic:blockchain-core"]){
    console.log('Trying to initialize symptomatic:blockchain-core');
    import { Ipfs } from 'meteor/symptomatic:blockchain-core';

    if( typeof Ipfs == "object") {
      Ipfs.loadOrganizations();
    };
  }

});
