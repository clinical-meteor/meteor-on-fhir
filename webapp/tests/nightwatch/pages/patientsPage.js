module.exports = {
  url: 'http://localhost:3000/patients',
  commands: [{

    verifyElements: function() {
      return this
        .verify.elementPresent('#patientsPage')
        .verify.elementPresent('#patientsTable')
        .verify.elementPresent('#patientsTable .patientRow:nth-child(1)');
    },
    verifyPatientListCard: function() {
      return this
        .verify.elementPresent('#patientsTable')
        .verify.elementPresent('#patientsTable .patientRow:nth-child(1)')
        .verify.elementPresent('#patientsTable .patientRow:nth-child(1) .name')
        .verify.elementPresent('#patientsTable .patientRow:nth-child(1) .avatar');
    },
    selectNewPatientTab: function() {
      return this
        .verify.elementPresent('#patientsPageTabs')
        .verify.elementPresent('#patientsPageTabs .newPatientTab')
        .click("#patientsPageTabs .newPatientTab");
    },
    verifyNewPatientCard: function() {
      return this
        .verify.elementPresent('#patientsPage .patientDetail')
        .verify.elementPresent('#patientsPage .patientDetail input[name="name"]')
        .verify.elementPresent('#patientsPage .patientDetail input[name="gender"]')
        .verify.elementPresent('#patientsPage .patientDetail input[name="photo"]')
        .verify.elementPresent('#patientsPage .patientDetail input[name="active"]');
    },
    verifyPatientDetails: function(name, avatar) {
      return this
        .verify.containsText('#patientsPage .patientDetail input[name="name"]', name)
        .verify.containsText('#patientsPage .patientDetail input[name="photo"]', avatar);
    },
    listContainsPatient: function (index, name, avatar) {
      return this
        .verify.elementPresent('#patientsTable')
        .verify.elementPresent('#patientsTable .patientRow:nth-child(' + index + ')')
        .verify.elementPresent('#patientsTable .patientRow:nth-child(' + index + ') .name', name)
        .verify.elementPresent('#patientsTable .patientRow:nth-child(' + index + ') .avatar', avatar);
    },
    displayListCard: function(){
      return this.click('#patientsPage .patientListTab');
    },
    // displayNewPatientCard: function(){
    //   return this.click('#patientsPage .newPatientTab');
    // },
    displayPatientDetails: function(){
      return this.click('#patientsPage .patientDetailsTab');
    },
    selectPatient: function(index){
      return this.click('#patientsTable .patientRow:nth-child(' + index + ')');
    },
    createNewPatient: function(name, gender, photo, birthdate) {
      return this
        .verify.elementPresent('#patientsPage .patientDetail')

        .verify.elementPresent('#patientsPage .patientDetail input[name="name"]')
        .clearValue('#patientsPage .patientDetail input[name="name"]')
        .setValue('#patientsPage .patientDetail input[name="name"]', name)

        .verify.elementPresent('#savePatientButton')
        .click('#savePatientButton');
    },

    pause: function(time, client) {
      client.pause(time);
      return this;
    },
    saveScreenshot: function(path, client){
      client.saveScreenshot(path);
      return this;
    }
  }],
  elements: {}
};
