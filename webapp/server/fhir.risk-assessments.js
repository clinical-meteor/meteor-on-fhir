// import { RiskAssessments } from '/imports/api/devices/devices';
//
// Meteor.publish('devices', function(){
//   return RiskAssessments.find();
// });

Meteor.methods({
  createRiskAssessment:function(deviceObject){
    check(deviceObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating RiskAssessment...');
      RiskAssessments.insert(deviceObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('RiskAssessment created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeRiskAssessment:function(){

    if (process.env.INITIALIZE) {

      if (RiskAssessments.find().count() === 0) {
        console.log('No records found in RiskAssessments collection.  Lets create some...');

        var defaultRiskAssessment = {
          resourceType: "RiskAssessment",
          subject: {
            display: "",
            reference: ""
          },
          text: "",
          date: null,
          "condition": {
            "reference": "",
            "display": ""
          },
          encounter: {},
          performer: {
            display: "",
            reference: ""
          },
          basis:[{
            display: "",
            reference: ""
          }],
          prediction: [{
            title: "",
            outcome: {
              text: ""
            },
            probabilityDecimal: 0,
            rational: ""
          }],
          mitigation: ""
        };

        Meteor.call('createRiskAssessment', defaultRiskAssessment);

        var canonicalExample = {
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
        Meteor.call('createRiskAssessment', canonicalExample);

      } else {
        console.log('RiskAssessments already exist.  Skipping.');
      }
    }
  },
  dropRiskAssessments: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping devices... ');
      RiskAssessments.find().forEach(function(assessment){
        RiskAssessments.remove({_id: assessment._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }
});
