// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api



module.exports = {
  tags: ['conditions', 'Conditions', 'crud', 'fhir', 'circle'],
  before: function(client){
    client
      .url("http://localhost:3000").pause(3000)
      .executeAsync(function(){
        Meteor.call('dropConditions');
        Meteor.call('dropTestUsers');
      });
  },
  'Sign up.': function (client) {
    client.resizeWindow(1920, 1200);

    client.page.signupPage()
      .navigate()
      .fillOutSignupPage('Gregory', 'House', 'house@test.org', 'house123', 'hippocrates')
      .saveScreenshot('tests/nightwatch/screenshots/practitioners/A-Signup-Practitioner.png', client)
      .signup()
      .pause(5000, client);

    client
      .verify.elementPresent('#indexPage')
      .verify.containsText('#authenticatedUsername', 'Gregory House')
      .pause(3000);
  },
  'list conditions': function (client) {
    client.page
      .indexPage()
      .selectConditionsTile();

    client.page
      .conditionsPage()
      .verifyElements()
      .verifyEmptyList();
  },
  'create new condition': function (client) {

    client.page
      .conditionsPage()
      .selectNewConditionTab()
      .verifyNewConditionCard();

    client.pause(1000).executeAsync(function(){
      Session.set('conditionUpsert', {
        "resourceType": "Condition",
        "patient": {
          "reference": "",
          "display": ""
        },
        "asserter": {
          "reference": "",
          "display": ""
        },
        "dateRecorded": "",
        "code": {
          "coding": [
            {
              "system": "http://snomed.info/sct",
              "code": "",
              "display": ""
            }
          ]
        },
        "clinicalStatus": "",
        "verificationStatus": "confirmed",
        "severity": {
          "coding": [
            {
              "system": "http://snomed.info/sct",
              "code": "",
              "display": ""
            }
          ]
        },
        "onsetDateTime": "",
        "evidence": [
          {
            "detail": [
              {
                "reference": "",
                "display": ""
              }
            ]
          }
        ]
      });
    });
    
    client.page
      .conditionsPage()
      .upsertCondition('Jane Doe', 'Gregory House', 'active', '22456', 'Fever', 'Observation/555', '#newCondition')
      .saveScreenshot('tests/nightwatch/screenshots/conditions.crud/B-ConditionList.png', client);

    client
      .click('#newCondition #saveConditionButton').pause(1000);
  },
  "table should contain recently created condition" : function (client) {
    client.page
      .conditionsPage()
      .selectListTab()
      .verifyConditionListCard()
      .listContainsCondition(1, 'Jane Doe', 'Gregory House', 'active', '22456', 'Fever', 'Observation/555')
      .saveScreenshot('tests/nightwatch/screenshots/conditions.crud/B-ConditionList.png', client);
  },
  'condition detail': function (client) {
    client.page
      .conditionsPage()
      .selectCondition(1)
      .verifyConditionDetails('Jane Doe', 'Gregory House', 'active', '22456', 'Fever', 'Observation/555')
      .saveScreenshot('tests/nightwatch/screenshots/conditions.crud/C-ConditionDetails.png', client);
  },
  'edit condition': function (client) {
    client.pause(1000).executeAsync(function(){
      Session.set('conditionUpsert', {
        "resourceType": "Condition",
        "patient": {
          "reference": "",
          "display": ""
        },
        "asserter": {
          "reference": "",
          "display": ""
        },
        "dateRecorded": "",
        "code": {
          "coding": [
            {
              "system": "http://snomed.info/sct",
              "code": "",
              "display": ""
            }
          ]
        },
        "clinicalStatus": "",
        "verificationStatus": "confirmed",
        "severity": {
          "coding": [
            {
              "system": "http://snomed.info/sct",
              "code": "",
              "display": ""
            }
          ]
        },
        "onsetDateTime": "",
        "evidence": [
          {
            "detail": [
              {
                "reference": "",
                "display": ""
              }
            ]
          }
        ]
      });
    });

    client.page
      .conditionsPage()
      .upsertCondition('Jane Doe', 'Jane Doe', 'active', '78900', 'Headache', 'Observation/777', '#conditionDetails')
      .saveScreenshot('tests/nightwatch/screenshots/conditions.crud/D-EditedCondition.png', client);

    // since we're using the ConditionDetail component twice,
    // there are two #saveConditionButtons on the page
    // so we need to scope the button accordingly
    client
      .verify.elementPresent('#conditionDetails #saveConditionButton')
      .click('#conditionDetails #saveConditionButton').pause(2000);
  },
  'list edited Conditions': function (client) {
    client.page
      .conditionsPage()
      .listContainsCondition(1, 'Jane Doe', 'Jane Doe', 'active', '78900', 'Headache', 'Observation/777')
      //.pause(40000, client)
      .saveScreenshot('tests/nightwatch/screenshots/conditions.crud/E-EditedConditionList.png', client);
  },

  'fin': function (client) {
    client
      .end();
  }
};
