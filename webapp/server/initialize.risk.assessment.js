
// https://www.hl7.org/fhir/riskassessment-example-prognosis.json.html
// https://www.hl7.org/fhir/riskassessment-example-cardiac.json.html

Meteor.startup(function (){

  var riskAssessment = {
    resourceType: "RiskAssessment",
    subject: {
      display: "Jane Doe",
      reference: "12345"
    },
    text: "Moderate risk of multiple sclerosis.",
    date: new Date(),
    "condition": {
      "reference": "Condition/MultipleSclerosis",
      "display": "Multiple Sclerosis"
    },
    encounter: {},
    performer: {
      display: "Florence Nightingale",
      reference: "55555"
    },
    basis:[
      {
        display: "First Sclerosis",
        reference: "Observations/sclerosis-1"
      },
      {
        display: "Second Sclerosis",
        reference: "Observations/sclerosis-2"
      },
      {
        display: "Demylinization Risk Factor",
        reference: "Observations/mylinization-risk-factor"
      }
    ],
    prediction: [{
      title: "5 Year Risk",
      outcome: {
        text: "Multiple sclerosis"
      },
      probabilityDecimal: 0.0215,
      whenRange: {
        "low": {
          "value": 0,
          "unit": "years",
          "system": "http://unitsofmeasure.org",
          "code": "a"
        },
        "high": {
          "value": 10,
          "unit": "years",
          "system": "http://unitsofmeasure.org",
          "code": "a"
        }
      },
      rational: "This is the 5 year risk value for developing multiple sclerotic legions."
    }],
    mitigation: ""
  };

  console.log("riskAssessment", riskAssessment);


  if (process.env.INITIALIZE && (RiskAssessments.find().count() === 0)) {
    RiskAssessments.insert(riskAssessment, function(error, result){
      if(error){
        HipaaLogger.logEvent({eventType: "error", userId: 'System', userName: 'System', collectionName: "RiskAssessments"});
      }
      if(result){
        HipaaLogger.logEvent({eventType: "create", userId: 'System', userName: 'System', collectionName: "RiskAssessments"});
      }
    });
  }
});
