// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  tags: ['observations', 'Observations', 'crud', 'fhir', 'circle'],
  before: function(client){
    client
      .url("http://localhost:3000").pause(3000)
      .executeAsync(function(){
        Meteor.call('dropObservations');
        Meteor.call('dropTestUsers');
      });
  },
  'Sign up.': function (client) {
    client.resizeWindow(1200, 1024);

    client.page.signupPage()
      .navigate()
      .fillOutSignupPage('Jane', 'Doe', 'janedoe@test.org', 'janedoe123', '')
      .saveScreenshot('tests/nightwatch/screenshots/observations/A-Signup-Observation.png', client)
      .signup()
      .pause(1000, client);

    client
      .verify.elementPresent("#acceptWelcomePageButton")
      .click("#acceptWelcomePageButton").pause(1000)
      .verify.elementPresent('#indexPage')
      .verify.containsText('#authenticatedUsername', 'Jane Doe');
  },
  'list observations': function (client) {
    client.page
      .indexPage()
      .selectObservationsTile();

    client.page
      .observationsPage()
      .verifyElements()
      .verifyEmptyList();
      // .verifyObservationListCard();
  },
  'create new observation': function (client) {
    client.page
      .observationsPage()
      .selectNewObservationTab()
      .verifyNewObservationCard()
      .upsertObservation('Weight', '60', 'kg', 'Jane Doe', '123456789', '#newObservation', client)
      .saveScreenshot('tests/nightwatch/screenshots/observations.crud/B-ObservationList.png', client);

    client
      .click('#newObservation .saveObservationButton').pause(1000);
  },
  'list should contain recently created observation': function (client) {
    client.page
      .observationsPage()
      .selectListTab()
      .verifyObservationListCard()
      .listContainsObservation(1, 'Weight', '60', 'kg', 'Jane Doe')
      .saveScreenshot('tests/nightwatch/screenshots/observations.crud/B-ObservationList.png', client);
  },
  'observation detail': function (client) {
    client.page
      .observationsPage()
      .selectObservation(1)
      .verifyObservationDetails('Weight', '60', 'kg', 'Jane Doe', '123456789')
      .saveScreenshot('tests/nightwatch/screenshots/observations.crud/C-ObservationDetails.png', client);
  },
  'edit observation': function (client) {
    client.executeAsync(function(){
      Session.set('observationDetailState', {
        resourceType: 'Observation',
        status: 'preliminary',
        category: {
          text: ''
        },
        effectiveDateTime: '',
        subject: {
          display: '',
          reference: ''
        },
        performer: {
          display: '',
          reference: ''
        },
        device: {
          display: '',
          reference: ''
        },
        valueQuantity: {
          value: '',
          unit: '',
          system: 'http://unitsofmeasure.org'
        }
      });
    });

    client.page
      .observationsPage()
      .upsertObservation('Weight', '68', 'kg', 'Jane Doe', '123456789', '#observationDetails', client)
      .saveScreenshot('tests/nightwatch/screenshots/observations.crud/D-EditedObservation.png', client);

    // since we're using the ObservationDetail component twice,
    // there are two #saveObservationButtons on the page
    // so we need to scope the button accordingly
    client
      .click('#observationDetails .saveObservationButton').pause(1000);
  },
  'list edited Observations': function (client) {
    client.page
      .observationsPage()
      .listContainsObservation(1, 'Weight', '68', 'kg', 'Jane Doe')
      //.pause(40000, client)
      .saveScreenshot('tests/nightwatch/screenshots/observations.crud/E-EditedObservationList.png', client);
  },
  // 'admin can delete observation': function (client) {
  //   client
  //     .verify.elementPresent('#sidebarToggleButton')
  //       .click('#sidebarToggleButton').pause(1000)
  //       .waitForElementPresent('#observationSidebar .logoutMenuItem', 5000)
  //       .click('#observationSidebar .logoutMenuItem').pause(1000);
  //
  //   client.page.signupPage()
  //     .navigate()
  //     .fillOutSignupPage('Sysadmin', 'Admin', 'admin@test.org', 'admin12345', 'rootaccess')
  //     .signup();
  //
  //   client.page
  //     .indexPage()
  //     .selectObservationsTile();
  //
  //   client.page
  //     .observationsPage()
  //     .selectListTab()
  //     .verifyObservationListCard()
  //     .listContainsObservation(1, 'Sally Doe');
  //
  // },
  // 'list non-deleted Observations': function (client) {
  //   client.page
  //     .observationsPage()
  //     .selectListTab()
  //     .verifyObservationListCard()
  //     .listOmitsObservation(1, 'Sally Doe');
  //
  //     .end();
  // },
  'fin': function (client) {
    client
      .end();
  }
};
