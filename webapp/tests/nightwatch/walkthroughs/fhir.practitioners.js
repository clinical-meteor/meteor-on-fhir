// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  tags: ['practitioners', 'Practitioners', 'crud', 'fhir', 'circle', 'provider', 'directory'],
  before: function(client){
    client
      .url("http://localhost:3000").pause(3000)
      .executeAsync(function(){
        Meteor.call('dropPractitioners');
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
  'list practitioners': function (client) {
    client.page
      .indexPage()
      .selectPractitionersTile();

    client.page
      .practitionersPage()
      .verifyElements()
      .verifyEmptyList();
      // .verifyPractitionerListCard();
  },
  'create new practitioner': function (client) {
    client.page
      .practitionersPage()
      .selectNewPractitionerTab()
      .verifyNewPractitionerCard()
      .upsertPractitioner('Dr. Benjamin McLane Spock', '702-555-2345', 'work', 'Pediatrician', '781912', '#newPractitioner', client)
      .saveScreenshot('tests/nightwatch/screenshots/practitioners.crud/B-PractitionerList.png', client);

    client
      .click('#newPractitioner .savePractitionerButton').pause(1000);
  },
  'list should contain recently created practitioner': function (client) {
    client.page
      .practitionersPage()
      .selectListTab()
      .verifyPractitionerListCard()
      .listContainsPractitioner(1, 'Dr. Benjamin McLane Spock')
      .saveScreenshot('tests/nightwatch/screenshots/practitioners.crud/B-PractitionerList.png', client);
  },
  'practitioner detail': function (client) {
    client.page
      .practitionersPage()
      .selectPractitioner(1)
      .verifyPractitionerDetails('Dr. Benjamin McLane Spock', '702-555-2345', 'work', 'Pediatrician', '781912')
      .saveScreenshot('tests/nightwatch/screenshots/practitioners.crud/C-PractitionerDetails.png', client);
  },
  'edit practitioner': function (client) {
    client.pause(1000).executeAsync(function(){
      Session.set('practitionerUpsert', {
        "resourceType" : "Practitioner",
          "name" : {
            "resourceType" : "HumanName",
            "text" : ""
          },
          "telecom" : [{
            "resourceType" : "ContactPoint",
            "system" : "phone",
            "value" : "",
            "use" : "",
            "rank" : 1
          }],
          "qualification" : [{
            "identifier" : [{
              "use" : "certficate",
              "value" : "",
              "period" : {}
            }],
            "issuer" : {
              "display" : "",
              "reference" : ""
            }
          }]
      });
    });

    client.page
      .practitionersPage()
      .upsertPractitioner('Dr. Benjamin Spock, MD', '702-555-2345', 'mobile', 'Pediatrician', '781912', '#practitionerDetails', client)
      .saveScreenshot('tests/nightwatch/screenshots/practitioners.crud/D-EditedPractitioner.png', client);

    // since we're using the PractitionerDetail component twice,
    // there are two #savePractitionerButtons on the page
    // so we need to scope the button accordingly
    client
      .click('#practitionerDetails .savePractitionerButton').pause(1000);
  },
  'list edited Practitioners': function (client) {
    client.page
      .practitionersPage()
      .listContainsPractitioner(1, 'Dr. Benjamin Spock, MD')
      //.pause(40000, client)
      .saveScreenshot('tests/nightwatch/screenshots/practitioners.crud/E-EditedPractitionerList.png', client);
  },
  // 'admin can delete practitioner': function (client) {
  //   client
  //     .verify.elementPresent('#sidebarToggleButton')
  //       .click('#sidebarToggleButton').pause(1000)
  //       .waitForElementPresent('#practitionerSidebar .logoutMenuItem', 5000)
  //       .click('#practitionerSidebar .logoutMenuItem').pause(1000);
  //
  //   client.page.signupPage()
  //     .navigate()
  //     .fillOutSignupPage('Sysadmin', 'Admin', 'admin@test.org', 'admin12345', 'rootaccess')
  //     .signup();
  //
  //   client.page
  //     .indexPage()
  //     .selectPractitionersTile();
  //
  //   client.page
  //     .practitionersPage()
  //     .selectListTab()
  //     .verifyPractitionerListCard()
  //     .listContainsPractitioner(1, 'Sally Doe');
  //
  // },
  // 'list non-deleted Practitioners': function (client) {
  //   client.page
  //     .practitionersPage()
  //     .selectListTab()
  //     .verifyPractitionerListCard()
  //     .listOmitsPractitioner(1, 'Sally Doe');
  //
  //     .end();
  // },
  'fin': function (client) {
    client
      .end();
  }
};
