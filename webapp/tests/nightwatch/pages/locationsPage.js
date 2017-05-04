module.exports = {
  url: 'http://localhost:3000/locations',
  commands: [{

    verifyElements: function() {
      return this
        .verify.elementPresent('#locationsPage')
        .verify.elementPresent('#locationsTable');
    },
    verifyEmptyList: function() {
      return this
        .verify.elementNotPresent('#locationsTable .locationRow:nth-child(1)');
    },
    verifyOrganizationListCard: function() {
      return this
        .verify.elementPresent('#locationsTable')
        .verify.elementPresent('#locationsTable .locationRow:nth-child(1)')
        .verify.elementPresent('#locationsTable .locationRow:nth-child(1) .name');
    },
    selectNewOrganizationTab: function() {
      return this
        .verify.elementPresent('#locationsPageTabs')
        .verify.elementPresent('#locationsPageTabs .newOrganizationTab')
        .click("#locationsPageTabs .newOrganizationTab");
    },
    verifyNewOrganizationCard: function() {
      return this
        .verify.elementPresent('#locationsPage .locationDetail')
        .verify.elementPresent('#locationsPage .locationDetail input[name="name"]')
        .verify.elementPresent('#locationsPage .locationDetail input[name="telecomValue"]')
        .verify.elementPresent('#locationsPage .locationDetail input[name="telecomUse"]')
        .verify.elementPresent('#locationsPage .locationDetail input[name="issuer"]')
        .verify.elementPresent('#locationsPage .locationDetail input[name="qualificationId"]')
        .verify.elementPresent('#locationsPage .locationDetail input[name="qualificationStart"]')
        .verify.elementPresent('#locationsPage .locationDetail input[name="qualificationEnd"]');
    },
    verifyOrganizationDetails: function(name, telecomValue, telecomUse, issuer, qualificationId) {
      this
        .waitForElementPresent('#locationDetails', 5000)
        .waitForElementPresent('#locationDetails input[name="name"]', 5000);

      if (name) {
        this.verify.attributeEquals('#locationsPage .locationDetail  input[name="name"]', 'value', name);
      }
      if (telecomValue) {
        this.verify.attributeEquals('#locationsPage .locationDetail  input[name="telecomValue"]', 'value', telecomValue);
      }
      if (telecomUse) {
        this.verify.attributeEquals('#locationsPage .locationDetail  input[name="telecomUse"]', 'value', telecomUse);
      }
      if (issuer) {
        this.verify.attributeEquals('#locationsPage .locationDetail  input[name="issuer"]', 'value', issuer);
      }
      if (qualificationId) {
        this.verify.attributeEquals('#locationsPage .locationDetail  input[name="qualificationId"]', 'value', qualificationId);
      }
      return this;
    },
    listContainsOrganization: function (index, name) {
      this
        .verify.elementPresent('#locationsTable')
        .verify.elementPresent('#locationsTable .locationRow:nth-child(' + index + ')')
        .verify.elementPresent('#locationsTable .locationRow:nth-child(' + index + ') .name');

      if (name) {
        this.verify.containsText('#locationsTable .locationRow:nth-child(' + index + ') .name', name);
      }
      return this;
    },
    selectListTab: function(){
      return this.click('#locationsPage .locationListTab');
    },
    displayListCard: function(){
      return this.click('#locationsPage .locationListTab');
    },
    displayNewOrganizationCard: function(){
      return this.click('#locationsPage .newOrganizationTab');
    },
    displayOrganizationDetails: function(){
      return this.click('#locationsPage .locationDetailsTab');
    },
    selectOrganization: function(index){
      return this.click('#locationsTable .locationRow:nth-child(' + index + ')');
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
