
// list Patients
// new patient
// list Patients
// patient detail
// edit patient
// list Patients
// delete patient
// list Patients


// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api


module.exports = {
  tags: ['patients', 'Patients', 'crud', 'fhir'],
  before: function(client){
    client
      .url("http://localhost:3000").pause(3000)
      .executeAsync(function(){
        Meteor.call('dropTestUsers');
      });
  },
  'Sign up.': function (client) {
    client.resizeWindow(1200, 1024);

    client.page.signupPage()
      .navigate()
      .fillOutSignupPage('Gregory', 'House', 'house@test.org', 'house123', 'hippocrates')
      .saveScreenshot('tests/nightwatch/screenshots/accounts/A-signupPage.png', client)
      .signup()
      .pause(1000, client);

    client
      .verify.elementPresent('#indexPage')
      .verify.containsText('#authenticatedUsername', 'Gregory House');
  },
  'list patients': function (client) {
    client
      .page
      .indexPage()
      .selectPatientsTile();

    client
      .page
      .patientsPage()
      .verifyElements()
      .verifyPatientListCard();
  },
  'create new patient': function (client) {
    client
      .page
      .patientsPage()
      .selectNewPatientTab()
      .verifyNewPatientCard()
      .createNewPatient('Dr. Spock');
  },
  'list should contain recently created patient': function (client) {
    const patientsPage = client.page.patientsPage();
    patientsPage
      .displayListCard()
      .verifyListCard()
      .listContainsPatient(1, 'Dr. Spock');
  }
  // 'patient detail': function (client) {
  //   client
  //
  // },
  // 'edit patient': function (client) {
  //   client
  // },
  // 'list edited Patients': function (client) {
  //   client
  // },
  // 'delete patient': function (client) {
  //   client
  //
  // },
  // 'list non-deleted Patients': function (client) {
  //   client
  //
  //     .end();
  // }
};
