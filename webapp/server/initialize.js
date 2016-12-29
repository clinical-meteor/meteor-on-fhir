
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


  //var rootUrl = __meteor_runtime_config__.ROOT_URL;
  //console.log('Adding Content Security Policies for ' + rootUrl + ' and meteor-on-fhir.meteorapp.com');
  //BrowserPolicy.content.allowConnectOrigin(rootUrl);
  //BrowserPolicy.content.allowConnectOrigin(rootUrl.replace('http', 'ws'));
  //BrowserPolicy.content.allowConnectOrigin(rootUrl.replace('http', 'wss'));
  //BrowserPolicy.content.allowConnectOrigin('https://meteor-on-fhir.meteorapp.com');
  //BrowserPolicy.content.allowConnectOrigin('wss://meteor-on-fhir.meteorapp.com');

  if (process.env.INITIALIZE) {

    console.log("Initializing records...");

    Meteor.call('initializeCarePlan');
    Meteor.call('initializeCondition');
    Meteor.call('initializeDevice');
    Meteor.call('initializeObservation', 70.0, '');
    Meteor.call('initializePatient');
    Meteor.call('initializePractitioner');
    Meteor.call('initializeQuestionnaire');
    Meteor.call('initializeMedications');

    Meteor.call('generateDailyStat');


    if (HipaaLog.find().count() === 0 ){
      HipaaLogger.logEvent({
        eventType: "init",
        userId: 'System',
        userName: 'System'
      });
    }
  }
});
