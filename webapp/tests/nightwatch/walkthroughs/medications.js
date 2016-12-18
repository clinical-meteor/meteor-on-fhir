//
// // list Medications
// // new medication
// // list Medications
// // medication detail
// // edit medication
// // list Medications
// // delete medication
// // list Medications
//
//
//
// module.exports = {
//   tags: ['medications', 'Medications', 'crud', 'fhir'],
//   'Sign in.': function (client) {
//     client.resizeWindow(1200, 1024);
//
//     const signinPage = client.page.signinPage();
//     const indexPage = client.page.indexPage();
//
//     signinPage
//       .navigate()
//       .signin('alice@test.org', 'alice123')
//       .pause(1000, client);
//
//     indexPage.expect.element('#indexPage').to.be.present;
//     indexPage.expect.element('#authenticatedUsername').text.to.contain('Jane Doe');
//
//     indexPage.selectMedicationsTile();
//   },
//   'list medications': function (client) {
//     const medicationsPage = client.page.medicationsPage();
//     medicationsPage
//       .verifyElements()
//       .verifyListCard();
//   },
//   'create new medication': function (client) {
//     const medicationsPage = client.page.medicationsPage();
//     medicationsPage
//       .displayNewMedicationCard()
//       .verifyNewMedicationCard()
//       .createNewMedication('Dr. Spock');
//   },
//   'list should contain recently created medication': function (client) {
//     const medicationsPage = client.page.medicationsPage();
//     medicationsPage
//       .displayListCard()
//       .verifyListCard()
//       .listContainsMedication(1, 'Dr. Spock');
//   },
//   // 'medication detail': function (client) {
//   //   client
//   //
//   // },
//   // 'edit medication': function (client) {
//   //   client
//   // },
//   // 'list edited Medications': function (client) {
//   //   client
//   // },
//   // 'delete medication': function (client) {
//   //   client
//   //
//   // },
//   // 'list non-deleted Medications': function (client) {
//   //   client
//   //
//   //     .end();
//   // }
// };
