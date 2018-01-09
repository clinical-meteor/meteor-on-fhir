
// https://www.hl7.org/fhir/riskassessment-example-prognosis.json.html
// https://www.hl7.org/fhir/riskassessment-example-cardiac.json.html

Meteor.startup(function (){

  var newOrganization = {
    "resourceType": "Organization",
    "identifier": [
      {
        "system": "",
        "value": ""
      }
    ],
    "name": "Clinical Lab",
    "telecom": [
      {
        "system": "phone",
        "value": "",
        "use": "work"
      },
      {
        "system": "email",
        "value": "",
        "use": "work"
      }
    ]
  };

  console.log("newOrganization", newOrganization);


  if (process.env.INITIALIZE && (Organizations.find().count() === 0)) {
    Organizations.insert(newOrganization, function(error, result){
      if(error){
        HipaaLogger.logEvent({eventType: "error", userId: 'System', userName: 'System', collectionName: "Organizations"});
      }
      if(result){
        HipaaLogger.logEvent({eventType: "create", userId: 'System', userName: 'System', collectionName: "Organizations"});
      }
    });
  }
});
