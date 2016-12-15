//
// // list Patients
// // new practioner
// // list Patients
// // practitioner detail
// // edit practitioner
// // list Patients
// // delete practitioner
// // list Patients
//
//
// // add tests to this file using the Nightwatch.js API
// // http://nightwatchjs.org/api
//
//
// module.exports = {
//   tags: ['practitioners', 'Patients', 'crud', 'fhir'],
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
//     indexPage.selectPatientsTile();
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
//       .displayNewPatientCard()
//       .verifyNewPatientCard()
//       .createNewPatient('Dr. Spock');
//   },
//   'list should contain recently created practitioner': function (client) {
//     const practitionersPage = client.page.practitionersPage();
//     practitionersPage
//       .displayListCard()
//       .verifyListCard()
//       .listContainsPatient(1, 'Dr. Spock');
//   },
//   // 'practitioner detail': function (client) {
//   //   client
//   //
//   // },
//   // 'edit practitioner': function (client) {
//   //   client
//   // },
//   // 'list edited Patients': function (client) {
//   //   client
//   // },
//   // 'delete practitioner': function (client) {
//   //   client
//   //
//   // },
//   // 'list non-deleted Patients': function (client) {
//   //   client
//   //
//   //     .end();
//   // }
// };
