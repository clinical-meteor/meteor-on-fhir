module.exports = {
  url: 'http://localhost:3000/patients',
  commands: [{

    verifyElements: function() {
      return this
        .verify.elementPresent('#patientsPage')
        .verify.elementPresent('#patientsTable');
    },
    verifyEmptyList: function() {
      return this
        .verify.elementNotPresent('#patientsTable .patientRow:nth-child(1)');
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
        .verify.elementPresent('#patientsPage .patientDetail input[name="birthdate"]');
    },
    verifyPatientDetails: function(name, gender, birthdate, photo) {
      this
        .waitForElementPresent('#patientDetails', 5000)
        .waitForElementPresent('#patientDetails input[name="name"]', 5000)

      if (name) {
        this.verify.attributeEquals('#patientsPage .patientDetail  input[name="name"]', 'value', name);
        // this.verify.attributeEquals('#patientDetails #nameInput', 'value', name);
      }
      if (gender) {
        this.verify.attributeEquals('#patientsPage .patientDetail  input[name="gender"]', 'value', gender);
        // this.verify.attributeEquals('#patientDetails #genderInput', 'value', gender);
      }
      if (birthdate) {
        this.verify.attributeEquals('#patientsPage .patientDetail  input[name="birthdate"]', 'value', birthdate);
        // this.verify.attributeEquals('#patientDetails #birthdateInput', 'value', birthdate);
      }
      if (photo) {
        this.verify.attributeEquals('#patientsPage .patientDetail  input[name="photo"]', 'value', photo);
        // this.verify.attributeEquals('#patientDetails #photoInput', 'value', photo);
      }
      return this;
    },
    listContainsPatient: function (index, name, client) {
      this
        .verify.elementPresent('#patientsTable')
        .verify.elementPresent('#patientsTable .patientRow:nth-child(' + index + ')')
        .verify.elementPresent('#patientsTable .patientRow:nth-child(' + index + ') .name');

      if (name) {
        this.verify.containsText('#patientsTable .patientRow:nth-child(' + index + ') .name', name);
      }
      return this;
    },
    selectListTab: function(){
      return this.click('#patientsPage .patientListTab');
    },
    displayPatientDetails: function(){
      return this.click('#patientsPage .patientDetailsTab');
    },
    selectPatient: function(index){
      return this
        .verify.elementPresent('#patientsTable')
        .click('#patientsTable .patientRow:nth-child(' + index + ')');
    },
    upsertPatient: function(name, gender, birthdate, photo, pageElement, client) {
      if (name) {
        var nameArray = name.split('');
        for (var i = 0; i < nameArray.length; i++) {
          this.setValue(pageElement + ' input[name="name"]', nameArray[i]);
        }
      }
      if (gender) {
        var genderArray = gender.split('');
        for (var j = 0; j < genderArray.length; j++) {
          this.setValue(pageElement + ' input[name="gender"]', genderArray[j]);
        }
      }
      if (birthdate) {
        var birthdateArray = birthdate.split('');
        for (var k = 0; k < birthdateArray.length; k++) {
          this.setValue(pageElement + ' input[name="birthdate"]', birthdateArray[k]);
        }
      }
      if (photo) {
        var photoArray = photo.split('');
        for (var l = 0; l < photoArray.length; l++) {
          this.setValue(pageElement + ' input[name="photo"]', photoArray[l]);
        }
      }
      return this;
    },
    savePatient: function(){
      return this.verify.elementPresent('#savePatientButton').click('#savePatientButton');
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
