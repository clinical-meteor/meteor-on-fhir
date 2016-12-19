module.exports = {
  url: 'http://localhost:3000/practitioners',
  commands: [{

    verifyElements: function() {
      return this
        .verify.elementPresent('#practitionersPage')
        .verify.elementPresent('#practitionersTable');
    },
    verifyEmptyList: function() {
      return this
        .verify.elementNotPresent('#practitionersTable .practitionerRow:nth-child(1)');
    },
    verifyPractitionerListCard: function() {
      return this
        .verify.elementPresent('#practitionersTable')
        .verify.elementPresent('#practitionersTable .practitionerRow:nth-child(1)')
        .verify.elementPresent('#practitionersTable .practitionerRow:nth-child(1) .name');
    },
    selectNewPractitionerTab: function() {
      return this
        .verify.elementPresent('#practitionersPageTabs')
        .verify.elementPresent('#practitionersPageTabs .newPractitionerTab')
        .click("#practitionersPageTabs .newPractitionerTab");
    },
    verifyNewPractitionerCard: function() {
      return this
        .verify.elementPresent('#practitionersPage .practitionerDetail')
        .verify.elementPresent('#practitionersPage .practitionerDetail input[name="name"]')
        .verify.elementPresent('#practitionersPage .practitionerDetail input[name="telecomValue"]')
        .verify.elementPresent('#practitionersPage .practitionerDetail input[name="telecomUse"]')
        .verify.elementPresent('#practitionersPage .practitionerDetail input[name="issuer"]')
        .verify.elementPresent('#practitionersPage .practitionerDetail input[name="qualificationId"]')
        .verify.elementPresent('#practitionersPage .practitionerDetail input[name="qualificationStart"]')
        .verify.elementPresent('#practitionersPage .practitionerDetail input[name="qualificationEnd"]');
    },
    verifyPractitionerDetails: function(name, telecomValue, telecomUse, issuer, qualificationId) {
      this
        .waitForElementPresent('#practitionerDetails', 5000)
        .waitForElementPresent('#practitionerDetails input[name="name"]', 5000);

      if (name) {
        this.verify.attributeEquals('#practitionersPage .practitionerDetail  input[name="name"]', 'value', name);
      }
      if (telecomValue) {
        this.verify.attributeEquals('#practitionersPage .practitionerDetail  input[name="telecomValue"]', 'value', telecomValue);
      }
      if (telecomUse) {
        this.verify.attributeEquals('#practitionersPage .practitionerDetail  input[name="telecomUse"]', 'value', telecomUse);
      }
      if (issuer) {
        this.verify.attributeEquals('#practitionersPage .practitionerDetail  input[name="issuer"]', 'value', issuer);
      }
      if (qualificationId) {
        this.verify.attributeEquals('#practitionersPage .practitionerDetail  input[name="qualificationId"]', 'value', qualificationId);
      }
      return this;
    },
    listContainsPractitioner: function (index, name) {
      this
        .verify.elementPresent('#practitionersTable')
        .verify.elementPresent('#practitionersTable .practitionerRow:nth-child(' + index + ')')
        .verify.elementPresent('#practitionersTable .practitionerRow:nth-child(' + index + ') .name');

      if (name) {
        this.verify.containsText('#practitionersTable .practitionerRow:nth-child(' + index + ') .name', name);
      }
      return this;
    },
    selectListTab: function(){
      return this.click('#practitionersPage .practitionerListTab');
    },
    displayListCard: function(){
      return this.click('#practitionersPage .practitionerListTab');
    },
    displayNewPractitionerCard: function(){
      return this.click('#practitionersPage .newPractitionerTab');
    },
    displayPractitionerDetails: function(){
      return this.click('#practitionersPage .practitionerDetailsTab');
    },
    selectPractitioner: function(index){
      return this.click('#practitionersTable .practitionerRow:nth-child(' + index + ')');
    },
    upsertPractitioner: function(name, telecomValue, telecomUse, issuer, qualificationId, pageElement) {
      if (name) {
        var nameArray = name.split('');
        for (var i = 0; i < nameArray.length; i++) {
          this.setValue(pageElement + ' input[name="name"]', nameArray[i]);
        }
      }
      if (telecomValue) {
        var telecomValueArray = telecomValue.split('');
        for (var l = 0; l < telecomValueArray.length; l++) {
          this.setValue(pageElement + ' input[name="telecomValue"]', telecomValueArray[l]);
        }
      }
      if (telecomUse) {
        var telecomUseArray = telecomUse.split('');
        for (var m = 0; m < telecomUseArray.length; m++) {
          this.setValue(pageElement + ' input[name="telecomUse"]', telecomUseArray[m]);
        }
      }
      if (issuer) {
        var issuerArray = issuer.split('');
        for (var j = 0; j < issuerArray.length; j++) {
          this.setValue(pageElement + ' input[name="issuer"]', issuerArray[j]);
        }
      }
      if (qualificationId) {
        var qualificationIdArray = qualificationId.split('');
        for (var k = 0; k < qualificationIdArray.length; k++) {
          this.setValue(pageElement + ' input[name="qualificationId"]', qualificationIdArray[k]);
        }
      }
      return this;
    },
    savePractitioner: function(){
      return this.verify.elementPresent('#savePractitionerButton').click('#savePractitionerButton');
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
