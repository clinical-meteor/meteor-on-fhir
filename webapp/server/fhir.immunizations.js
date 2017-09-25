// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api



module.exports = {
  tags: ['immunizations', 'Immunizations', 'crud', 'fhir', 'circle'],
  before: function(client){
    client
      .url("http://localhost:3000").pause(3000)
      .executeAsync(function(){
        Meteor.call('dropImmunizations');
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
  'list immunizations': function (client) {
    client.page
      .indexPage()
      .selectImmunizationsTile();

    client.page
      .immunizationsPage()
      .verifyElements()
      .verifyEmptyList();
  },
  'create new immunization': function (client) {

    client.page
      .immunizationsPage()
      .selectNewImmunizationTab()
      .verifyNewImmunizationCard();

    client.pause(1000).executeAsync(function(){
      Session.set('immunizationUpsert', {
        "resourceType": "Immunization",
        'notGiven': true,
        'identifier': '',
        'vaccine': '',
        'vaccineCode': ''
      });
    });
    
    client.page
      .immunizationsPage()
      .upsertImmunization('cholera, live attenuated', 'cholera', '174', '#newImmunization')
      .saveScreenshot('tests/nightwatch/screenshots/immunizations.crud/B-ImmunizationList.png', client);

    client
      .click('#newImmunization #saveImmunizationButton').pause(1000);
  },
  "table should contain recently created immunization" : function (client) {
    client.page
      .immunizationsPage()
      .selectListTab()
      .verifyImmunizationListCard()
      .listContainsImmunization(1, 'cholera, live attenuated', 'cholera')
      .saveScreenshot('tests/nightwatch/screenshots/immunizations.crud/B-ImmunizationList.png', client);
  },
  'immunization detail': function (client) {
    client.page
      .immunizationsPage()
      .selectImmunization(1)
      .verifyImmunizationDetails('cholera, live attenuated', 'cholera')
      .saveScreenshot('tests/nightwatch/screenshots/immunizations.crud/C-ImmunizationDetails.png', client);
  },
  'edit immunization': function (client) {
    client.pause(1000).executeAsync(function(){
      Session.set('immunizationUpsert', {
        "resourceType": "Immunization",
        'notGiven': true,
        'identifier': '',
        'vaccine': '',
        'vaccineCode': ''
      });
    });

    client.page
      .immunizationsPage()
      .upsertImmunization('cholera, live attenuated', 'cholera', '174', '#immunizationDetails')
      .saveScreenshot('tests/nightwatch/screenshots/immunizations.crud/D-EditedImmunization.png', client);

    // since we're using the ImmunizationDetail component twice,
    // there are two #saveImmunizationButtons on the page
    // so we need to scope the button accordingly
    client
      .verify.elementPresent('#immunizationDetails #saveImmunizationButton')
      .click('#immunizationDetails #saveImmunizationButton').pause(2000);
  },
  'list edited Immunizations': function (client) {
    client.page
      .immunizationsPage()
      .listContainsImmunization(1, 'cholera, live attenuated', 'cholera', '174')
      //.pause(40000, client)
      .saveScreenshot('tests/nightwatch/screenshots/immunizations.crud/E-EditedImmunizationList.png', client);
  },

  'fin': function (client) {
    client
      .end();
  }
};