// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api



module.exports = {
  tags: ['riskAssessments', 'RiskAssessments', 'crud', 'fhir', 'circle'],
  before: function(client){
    client
      .url("http://localhost:3000").pause(3000)
      .executeAsync(function(){
        Meteor.call('dropRiskAssessments');
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
  'list riskAssessments': function (client) {
    client.page
      .indexPage()
      .selectRiskAssessmentsTile();

    client.page
      .riskAssessmentsPage()
      .verifyElements()
      .verifyEmptyList();
  },
  'create new riskAssessment': function (client) {

    client.page
      .riskAssessmentsPage()
      .selectNewRiskAssessmentTab()
      .verifyNewRiskAssessmentCard();

    client.pause(1000).executeAsync(function(){
      Session.set('riskAssessmentUpsert', {
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
      });
    });

    client.page
      .riskAssessmentsPage()
      .upsertRiskAssessment('Jane Doe', 'Multiple Sclerosis', 'Gregory House', 'Positive', '0.05', '#newRiskAssessment')
      .saveScreenshot('tests/nightwatch/screenshots/riskAssessments.crud/B-RiskAssessmentList.png', client);

    client
      .click('#newRiskAssessment #saveRiskAssessmentButton').pause(1000);
  },
  "list should contain recently created riskAssessment" : function (client) {
    client.page
      .riskAssessmentsPage()
      .selectListTab()
      .verifyRiskAssessmentListCard()
      .listContainsRiskAssessment(1, 'Jane Doe', 'Multiple Sclerosis', 'Gregory House', 'Positive', '0.05')
      .saveScreenshot('tests/nightwatch/screenshots/riskAssessments.crud/B-RiskAssessmentList.png', client);
  },
  'riskAssessment detail': function (client) {
    client.page
      .riskAssessmentsPage()
      .selectRiskAssessment(1)
      .verifyRiskAssessmentDetails('Jane Doe', 'Multiple Sclerosis', 'Gregory House', 'Positive', '0.05')
      .saveScreenshot('tests/nightwatch/screenshots/riskAssessments.crud/C-RiskAssessmentDetails.png', client);
  },
  'edit riskAssessment': function (client) {
    client.pause(1000).executeAsync(function(){
      Session.set('riskAssessmentUpsert', {
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
      });
    });

    client.page
      .riskAssessmentsPage()
      .upsertRiskAssessment('Jane Doe', 'Lupus', 'Gregory House', 'Positive', '0.10', '#riskAssessmentDetails')
      .saveScreenshot('tests/nightwatch/screenshots/riskAssessments.crud/D-EditedRiskAssessment.png', client);

    // since we're using the RiskAssessmentDetail component twice,
    // there are two #saveRiskAssessmentButtons on the page
    // so we need to scope the button accordingly
    client
      .verify.elementPresent('#riskAssessmentDetails #saveRiskAssessmentButton')
      .click('#riskAssessmentDetails #saveRiskAssessmentButton').pause(2000);
  },
  'list edited RiskAssessments': function (client) {
    client.page
      .riskAssessmentsPage()
      .listContainsRiskAssessment(1, 'Jane Doe', 'Lupus', 'Gregory House', 'Positive', '0.1')
      //.pause(40000, client)
      .saveScreenshot('tests/nightwatch/screenshots/riskAssessments.crud/E-EditedRiskAssessmentList.png', client);
  },

  'fin': function (client) {
    client
      .end();
  }
};
