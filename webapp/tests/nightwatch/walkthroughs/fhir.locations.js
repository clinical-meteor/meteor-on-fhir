// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  tags: ['locations', 'Locations', 'crud', 'fhir', 'circle', 'provider', 'directory'],
  before: function(client){
    client
      .url("http://localhost:3000").pause(3000)
      .executeAsync(function(){
        Meteor.call('dropLocations');
        Meteor.call('dropTestUsers');
      });
  },
  'Sign up.': function (client) {

    client.page.signupPage()
      .navigate()
      .fillOutSignupPage('Gregory', 'House', 'house@test.org', 'house123', 'hippocrates')
      .saveScreenshot('tests/nightwatch/screenshots/locations/A-Signup-Location.png', client)
      .signup()
      .pause(5000, client);

    client.resizeWindow(1920, 1200);

    client
      .verify.elementPresent('#indexPage')
      .verify.containsText('#authenticatedUsername', 'Gregory House')
      .pause(3000);
  },
  'list locations': function (client) {
    client.page
      .indexPage()
      .selectLocationsTile();

    client.page
      .locationsPage()
      .verifyElements()
      .verifyEmptyList();
      // .verifyLocationListCard();
  },
  'create new location': function (client) {
    client.page
      .locationsPage()
      .selectNewLocationTab()
      .verifyNewLocationCard()
      .pause(2000, client)
      .upsertLocation('Center for Disease Control', 33.7993, 84.3280, 200, '#newLocation', client)
      .saveScreenshot('tests/nightwatch/screenshots/locations.crud/B-LocationList.png', client);

    client
      .click('#newLocation #saveLocationButton').pause(1000);
  },
  'list should contain recently created location': function (client) {
    client.page
      .locationsPage()
      .selectListTab()
      .verifyLocationListCard()
      .listContainsLocation(1, 'Center for Disease Control')
      .saveScreenshot('tests/nightwatch/screenshots/locations.crud/B-LocationList.png', client);
  },
  'location detail': function (client) {
    client.page
      .locationsPage()
      .selectLocation(1)
      .verifyLocationDetails('Center for Disease Control', 33.7993, 84.3280, 200)
      .saveScreenshot('tests/nightwatch/screenshots/locations.crud/C-LocationDetails.png', client);
  },
  'edit location': function (client) {
    client.pause(1000).executeAsync(function(){
      Session.set('locationUpsert', {
        "resourceType": "Location",
        "status": "active",
        "name": "",
        "position": {
          'latitude': 0,
          'longitude': 0,
          'altitude': 0
        }
      });
    });

    client.page
      .locationsPage()
      .upsertLocation('CDC', 33.7993, 84.3280, 200, '#locationDetails', client)
      .saveScreenshot('tests/nightwatch/screenshots/locations.crud/D-EditedLocation.png', client);

    // since we're using the LocationDetail component twice,
    // there are two #saveLocationButtons on the page
    // so we need to scope the button accordingly
    client
      .click('#locationDetails #saveLocationButton').pause(1000);
  },
  'list edited Locations': function (client) {
    client.page
      .locationsPage()
      .listContainsLocation(1, 'CDC')
      //.pause(40000, client)
      .saveScreenshot('tests/nightwatch/screenshots/locations.crud/E-EditedLocationList.png', client);
  },
  // 'admin can delete location': function (client) {
  //   client
  //     .verify.elementPresent('#sidebarToggleButton')
  //       .click('#sidebarToggleButton').pause(1000)
  //       .waitForElementPresent('#locationSidebar .logoutMenuItem', 5000)
  //       .click('#locationSidebar .logoutMenuItem').pause(1000);
  //
  //   client.page.signupPage()
  //     .navigate()
  //     .fillOutSignupPage('Sysadmin', 'Admin', 'admin@test.org', 'admin12345', 'rootaccess')
  //     .signup();
  //
  //   client.page
  //     .indexPage()
  //     .selectLocationsTile();
  //
  //   client.page
  //     .locationsPage()
  //     .selectListTab()
  //     .verifyLocationListCard()
  //     .listContainsLocation(1, 'Sally Doe');
  //
  // },
  // 'list non-deleted Locations': function (client) {
  //   client.page
  //     .locationsPage()
  //     .selectListTab()
  //     .verifyLocationListCard()
  //     .listOmitsLocation(1, 'Sally Doe');
  //
  //     .end();
  // },
  'fin': function (client) {
    client
      .end();
  }
};
