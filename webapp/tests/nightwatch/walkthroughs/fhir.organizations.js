// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  tags: ['organizations', 'Organizations', 'crud', 'fhir', 'circle', 'provider', 'directory'],
  before: function(client){
    client
      .url("http://localhost:3000").pause(3000)
      .executeAsync(function(){
        Meteor.call('dropOrganizations');
        Meteor.call('dropTestUsers');
      });
  },
  'Sign up.': function (client) {
    client.resizeWindow(1920, 1200);

    client.page.signupPage()
      .navigate()
      .fillOutSignupPage('Gregory', 'House', 'house@test.org', 'house123', 'hippocrates')
      .saveScreenshot('tests/nightwatch/screenshots/organizations/A-Signup-Organization.png', client)
      .signup()
      .pause(5000, client);

    client
      .verify.elementPresent('#indexPage')
      .verify.containsText('#authenticatedUsername', 'Gregory House')
      .pause(3000);
  },
  'list organizations': function (client) {
    client.page
      .indexPage()
      .selectOrganizationsTile();

    client.page
      .organizationsPage()
      .verifyElements()
      .verifyEmptyList();
      // .verifyOrganizationListCard();
  },
  'create new organization': function (client) {
    client.page
      .organizationsPage()
      .selectNewOrganizationTab()
      .verifyNewOrganizationCard()
      .upsertOrganization("Rainbow's End", '702-555-2345', 'someone@somewhere.com', 'rainbow-702', '#newOrganization', client)
      .saveScreenshot('tests/nightwatch/screenshots/organizations.crud/B-OrganizationList.png', client);

    client
      .click('#newOrganization #saveOrganizationButton').pause(1000);
  },
  'list should contain recently created organization': function (client) {
    client.page
      .organizationsPage()
      .selectListTab()
      .verifyOrganizationListCard()
      .listContainsOrganization(1, "Rainbow's End")
      .saveScreenshot('tests/nightwatch/screenshots/organizations.crud/B-OrganizationList.png', client);
  },
  'organization detail': function (client) {
    client.page
      .organizationsPage()
      .selectOrganization(1)
      .verifyOrganizationDetails("Rainbow's End", '702-555-2345', 'someone@somewhere.com', 'rainbow-702')
      .saveScreenshot('tests/nightwatch/screenshots/organizations.crud/C-OrganizationDetails.png', client);
  },
  'edit organization': function (client) {
    client.pause(1000).executeAsync(function(){
      Session.set('organizationUpsert', {
        name: '',
        phone: '',
        email: '',
        identifier: ''
      });
    });

    client.page
      .organizationsPage()
      .upsertOrganization("Rainbow's End Nursing Home", '702-404-2345', 'someone@somewhere.com', 'rainbow-404', '#organizationDetails', client)
      .saveScreenshot('tests/nightwatch/screenshots/organizations.crud/D-EditedOrganization.png', client);

    // since we're using the OrganizationDetail component twice,
    // there are two #saveOrganizationButtons on the page
    // so we need to scope the button accordingly
    client
      .click('#organizationDetails #saveOrganizationButton').pause(1000);
  },
  'list edited Organizations': function (client) {
    client.page
      .organizationsPage()
      .listContainsOrganization(1, "Rainbow's End Nursing Home")
      //.pause(40000, client)
      .saveScreenshot('tests/nightwatch/screenshots/organizations.crud/E-EditedOrganizationList.png', client);
  },
  'fin': function (client) {
    client
      .end();
  }
};
