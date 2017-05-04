module.exports = {
  url: 'http://localhost:3000/organizations',
  commands: [{

    verifyElements: function() {
      return this
        .verify.elementPresent('#organizationsPage')
        .verify.elementPresent('#organizationsTable');
    },
    verifyEmptyList: function() {
      return this
        .verify.elementNotPresent('#organizationsTable .organizationRow:nth-child(1)');
    },
    verifyOrganizationListCard: function() {
      return this
        .verify.elementPresent('#organizationsTable')
        .verify.elementPresent('#organizationsTable .organizationRow:nth-child(1)')
        .verify.elementPresent('#organizationsTable .organizationRow:nth-child(1) .name');
    },
    selectNewOrganizationTab: function() {
      return this
        .verify.elementPresent('#organizationsPageTabs')
        .verify.elementPresent('#organizationsPageTabs .newOrganizationTab')
        .click("#organizationsPageTabs .newOrganizationTab");
    },
    verifyNewOrganizationCard: function() {
      return this
        .verify.elementPresent('#organizationsPage .organizationDetail')
        .verify.elementPresent('#organizationsPage .organizationDetail input[name="name"]')
        .verify.elementPresent('#organizationsPage .organizationDetail input[name="telecomValue"]')
        .verify.elementPresent('#organizationsPage .organizationDetail input[name="telecomUse"]')
        .verify.elementPresent('#organizationsPage .organizationDetail input[name="issuer"]')
        .verify.elementPresent('#organizationsPage .organizationDetail input[name="qualificationId"]')
        .verify.elementPresent('#organizationsPage .organizationDetail input[name="qualificationStart"]')
        .verify.elementPresent('#organizationsPage .organizationDetail input[name="qualificationEnd"]');
    },
    verifyOrganizationDetails: function(name, telecomValue, telecomUse, issuer, qualificationId) {
      this
        .waitForElementPresent('#organizationDetails', 5000)
        .waitForElementPresent('#organizationDetails input[name="name"]', 5000);

      if (name) {
        this.verify.attributeEquals('#organizationsPage .organizationDetail  input[name="name"]', 'value', name);
      }
      if (telecomValue) {
        this.verify.attributeEquals('#organizationsPage .organizationDetail  input[name="telecomValue"]', 'value', telecomValue);
      }
      if (telecomUse) {
        this.verify.attributeEquals('#organizationsPage .organizationDetail  input[name="telecomUse"]', 'value', telecomUse);
      }
      if (issuer) {
        this.verify.attributeEquals('#organizationsPage .organizationDetail  input[name="issuer"]', 'value', issuer);
      }
      if (qualificationId) {
        this.verify.attributeEquals('#organizationsPage .organizationDetail  input[name="qualificationId"]', 'value', qualificationId);
      }
      return this;
    },
    listContainsOrganization: function (index, name) {
      this
        .verify.elementPresent('#organizationsTable')
        .verify.elementPresent('#organizationsTable .organizationRow:nth-child(' + index + ')')
        .verify.elementPresent('#organizationsTable .organizationRow:nth-child(' + index + ') .name');

      if (name) {
        this.verify.containsText('#organizationsTable .organizationRow:nth-child(' + index + ') .name', name);
      }
      return this;
    },
    selectListTab: function(){
      return this.click('#organizationsPage .organizationListTab');
    },
    displayListCard: function(){
      return this.click('#organizationsPage .organizationListTab');
    },
    displayNewOrganizationCard: function(){
      return this.click('#organizationsPage .newOrganizationTab');
    },
    displayOrganizationDetails: function(){
      return this.click('#organizationsPage .organizationDetailsTab');
    },
    selectOrganization: function(index){
      return this.click('#organizationsTable .organizationRow:nth-child(' + index + ')');
    },
    upsertOrganization: function(name, telecomValue, telecomUse, issuer, qualificationId, pageElement) {
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
    saveOrganization: function(){
      return this.verify.elementPresent('#saveOrganizationButton').click('#saveOrganizationButton');
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
