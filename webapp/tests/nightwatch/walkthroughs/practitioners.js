
// list Practitioners
// new practioner
// list Practitioners
// practitioner detail
// edit practitioner
// list Practitioners
// delete practitioner
// list Practitioners


// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api


module.exports = {
  tags: ['practitioners', 'Practitioners', 'crud', 'fhir'],
  'Sign in.': function (client) {
    client.resizeWindow(1200, 1024);

    const loginPage = client.page.loginPage();
    const indexPage = client.page.indexPage();

    loginPage
      .navigate()
      .login('janedoe@test.org', 'janedoe')
      .pause(1000, client);

    indexPage.expect.element('#indexPage').to.be.present;
    indexPage.expect.element('#authenticatedUsername').text.to.contain('Jane Doe');

    indexPage.selectPractitionersTile();
  },
  'list practitioners': function (client) {
    const practitionersPage = client.page.practitionersPage();
    practitionersPage
      .verifyElements()
      .verifyListCard();
  },
  'create new practioner': function (client) {
    const practitionersPage = client.page.practitionersPage();
    practitionersPage
      .displayNewPractitionerCard()
      .verifyNewPractitionerCard()
      .createNewPractitioner('Dr. Spock');
  },
  'list should contain recently created practitioner': function (client) {
    const practitionersPage = client.page.practitionersPage();
    practitionersPage
      .displayListCard()
      .verifyListCard()
      .listContainsPractitioner(1, 'Dr. Spock');
  },
  // 'practitioner detail': function (client) {
  //   client
  //
  // },
  // 'edit practitioner': function (client) {
  //   client
  // },
  // 'list edited Practitioners': function (client) {
  //   client
  // },
  // 'delete practitioner': function (client) {
  //   client
  //
  // },
  // 'list non-deleted Practitioners': function (client) {
  //   client
  //
  //     .end();
  // }
};
