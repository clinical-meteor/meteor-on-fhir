//
// // list Observations
// // new practioner
// // list Observations
// // practitioner detail
// // edit practitioner
// // list Observations
// // delete practitioner
// // list Observations
//
//
// // add tests to this file using the Nightwatch.js API
// // http://nightwatchjs.org/api
//
//
// module.exports = {
//   tags: ['practitioners', 'Observations', 'crud', 'fhir'],
//   'Sign in.': function (client) {
//     client.resizeWindow(1200, 1024);
//
//     const loginPage = client.page.loginPage();
//     const indexPage = client.page.indexPage();
//
//     loginPage
//       .navigate()
//       .login('alice@test.org', 'alice123')
//       .pause(1000, client);
//
//     indexPage.expect.element('#indexPage').to.be.present;
//     indexPage.expect.element('#authenticatedUsername').text.to.contain('Jane Doe');
//
//     indexPage.selectObservationsTile();
//   },
//   'list practitioners': function (client) {
//     const practitionersPage = client.page.practitionersPage();
//     practitionersPage
//       .verifyElements()
//       .verifyListCard();
//   },
//   'create new practioner': function (client) {
//     const practitionersPage = client.page.practitionersPage();
//     practitionersPage
//       .displayNewObservationCard()
//       .verifyNewObservationCard()
//       .createNewObservation('Dr. Spock');
//   },
//   'list should contain recently created practitioner': function (client) {
//     const practitionersPage = client.page.practitionersPage();
//     practitionersPage
//       .displayListCard()
//       .verifyListCard()
//       .listContainsObservation(1, 'Dr. Spock');
//   },
//   // 'practitioner detail': function (client) {
//   //   client
//   //
//   // },
//   // 'edit practitioner': function (client) {
//   //   client
//   // },
//   // 'list edited Observations': function (client) {
//   //   client
//   // },
//   // 'delete practitioner': function (client) {
//   //   client
//   //
//   // },
//   // 'list non-deleted Observations': function (client) {
//   //   client
//   //
//   //     .end();
//   // }
// };
