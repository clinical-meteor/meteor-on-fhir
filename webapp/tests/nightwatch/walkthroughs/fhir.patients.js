// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  tags: ['patients', 'Patients', 'crud', 'fhir', 'circle'],
  before: function(client){
    client
      .url("http://localhost:3000").pause(3000)
      .executeAsync(function(){
        Meteor.call('dropTestPatients');
        Meteor.call('dropTestUsers');
      });
  },
  'Sign up.': function (client) {
    client.resizeWindow(1200, 1024);

    client.page.signupPage()
      .navigate()
      .fillOutSignupPage('Gregory', 'House', 'house@test.org', 'house123', 'hippocrates')
      .saveScreenshot('tests/nightwatch/screenshots/patients/A-Signup-Practitioner.png', client)
      .signup()
      .pause(5000, client);

    client
      .verify.elementPresent('#indexPage')
      .verify.containsText('#authenticatedUsername', 'Gregory House')
      .pause(3000);
  },
  'list patients': function (client) {
    client.page
      .indexPage()
      .selectPatientsTile();

    client.page
      .patientsPage()
      .verifyElements()
      .verifyEmptyList();
      // .verifyPatientListCard();
  },
  'create new patient': function (client) {
    client.page
      .patientsPage()
      .selectNewPatientTab()
      .verifyNewPatientCard()
      .upsertPatient('Jane Doe', 'Female', '1980-11-23', '', '#newPatient', client)
      .saveScreenshot('tests/nightwatch/screenshots/patients.crud/B-PatientList.png', client);

    client
      .click('#newPatient .savePatientButton').pause(1000);
  },
  'list should contain recently created patient': function (client) {
    client.page
      .patientsPage()
      .selectListTab()
      .verifyPatientListCard()
      .listContainsPatient(1, 'Jane Doe', 'Female', '1980-11-23')
      .saveScreenshot('tests/nightwatch/screenshots/patients.crud/B-PatientList.png', client);
  },
  'patient detail': function (client) {
    client.page
      .patientsPage()
      .selectPatient(1)
      .verifyPatientDetails('Jane Doe', 'Female', '1980-11-23')
      .saveScreenshot('tests/nightwatch/screenshots/patients.crud/C-PatientDetails.png', client);
  },
  'edit patient': function (client) {
    client.executeAsync(function(){
      Session.set('patientUpsert', {
        "resourceType" : "Patient",
        "name" : [{
          "text" : "",
          "resourceType" : "HumanName"
        }],
        "active" : true,
        "gender" : "",
        "birthDate" : null,
        "photo" : [{}],
        "test" : false
      });
    });

    client.page
      .patientsPage()
      .upsertPatient('Sally Doe', 'Female', '1980-11-23', '', '#patientDetails', client)
      .saveScreenshot('tests/nightwatch/screenshots/patients.crud/D-EditedPatient.png', client);

    // since we're using the PatientDetail component twice,
    // there are two #savePatientButtons on the page
    // so we need to scope the button accordingly
    client
      .click('#patientDetails .savePatientButton').pause(1000);
  },
  'list edited Patients': function (client) {
    client.page
      .patientsPage()
      .listContainsPatient(1, 'Sally Doe')
      //.pause(40000, client)
      .saveScreenshot('tests/nightwatch/screenshots/patients.crud/E-EditedPatientList.png', client);
  },
  // 'admin can delete patient': function (client) {
  //   client
  //     .verify.elementPresent('#sidebarToggleButton')
  //       .click('#sidebarToggleButton').pause(1000)
  //       .waitForElementPresent('#patientSidebar .logoutMenuItem', 5000)
  //       .click('#patientSidebar .logoutMenuItem').pause(1000);
  //
  //   client.page.signupPage()
  //     .navigate()
  //     .fillOutSignupPage('Sysadmin', 'Admin', 'admin@test.org', 'admin12345', 'rootaccess')
  //     .signup();
  //
  //   client.page
  //     .indexPage()
  //     .selectPatientsTile();
  //
  //   client.page
  //     .patientsPage()
  //     .selectListTab()
  //     .verifyPatientListCard()
  //     .listContainsPatient(1, 'Sally Doe');
  //
  // },
  // 'list non-deleted Patients': function (client) {
  //   client.page
  //     .patientsPage()
  //     .selectListTab()
  //     .verifyPatientListCard()
  //     .listOmitsPatient(1, 'Sally Doe');
  //
  //     .end();
  // },
  'fin': function (client) {
    client
      .end();
  }
};
