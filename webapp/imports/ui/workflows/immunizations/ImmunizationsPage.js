// category, value, unit, name, userId
// 'Weight', '60', 'kg', 'Jane Doe', '123456789',




module.exports = {
  url: 'http://localhost:3000/immunizations',
  commands: [{

    verifyElements: function() {
      return this
        .waitForElementPresent('#immunizationsPage', 10000)
        .verify.elementPresent('#immunizationsTable');
    },
    verifyEmptyList: function() {
      return this
        .verify.elementNotPresent('#immunizationsTable .immunizationRow:nth-child(1)');
    },
    verifyImmunizationListCard: function() {
      return this
        .verify.elementPresent('#immunizationsTable')
        .verify.elementPresent('#immunizationsTable .immunizationRow:nth-child(1)')
        .verify.elementPresent('#immunizationsTable .immunizationRow:nth-child(1) .identifier')
        .verify.elementPresent('#immunizationsTable .immunizationRow:nth-child(1) .vaccine')
        .verify.elementPresent('#immunizationsTable .immunizationRow:nth-child(1) .vaccineCode');
    },
    selectNewImmunizationTab: function() {
      return this
        .verify.elementPresent('#immunizationsPageTabs')
        .verify.elementPresent('#immunizationsPageTabs .newImmunizationTab')
        .click("#immunizationsPageTabs .newImmunizationTab");
    },
    verifyNewImmunizationCard: function() {
      return this
        .verify.elementPresent('#immunizationsPage .immunizationDetail')
        .verify.elementPresent('#immunizationsPage .immunizationDetail input[name="identifier"]')
        .verify.elementPresent('#immunizationsPage .immunizationDetail input[name="vaccine"]')
        .verify.elementPresent('#immunizationsPage .immunizationDetail input[name="vaccineCode"]')
    },
    verifyImmunizationDetails: function(identifier, vaccine, vaccineCode) {
      this
        .waitForElementPresent('#immunizationDetails', 5000);

      if (identifier) {
        this.verify.attributeEquals('#immunizationsPage .immunizationDetail  input[name="identifier"]', 'value', identifier);
      }
      if (vaccine) {
        this.verify.attributeEquals('#immunizationsPage .immunizationDetail  input[name="vaccine"]', 'value', vaccine);
      }
      if (vaccineCode) {
        this.verify.attributeEquals('#immunizationsPage .immunizationDetail  input[name="vaccineCode"]', 'value', vaccineCode);
      }
      return this;
    },
    listContainsImmunization: function (index, identifier, vaccine, vaccineCode){
      this
        .verify.elementPresent('#immunizationsTable')
        .verify.elementPresent('#immunizationsTable .immunizationRow:nth-child(' + index + ')')
        .verify.elementPresent('#immunizationsTable .immunizationRow:nth-child(' + index + ') .identifier')
        .verify.elementPresent('#immunizationsTable .immunizationRow:nth-child(' + index + ') .vaccine')
        .verify.elementPresent('#immunizationsTable .immunizationRow:nth-child(' + index + ') .vaccineCode')

      if (identifier) {
        this.verify.containsText('#immunizationsTable .immunizationRow:nth-child(' + index + ') .identifier', identifier);
      }
      if (vaccine) {
        this.verify.containsText('#immunizationsTable .immunizationRow:nth-child(' + index + ') .vaccine', vaccine);
      }
      if (vaccineCode) {
        this.verify.containsText('#immunizationsTable .immunizationRow:nth-child(' + index + ') .vaccineCode', vaccineCode);
      }
      return this;
    },
    selectListTab: function(){
      return this.click('#immunizationsPage .immunizationListTab');
    },
    displayListCard: function(){
      return this.click('#immunizationsPage .immunizationListTab');
    },
    displayNewImmunizationCard: function(){
      return this.click('#immunizationsPage .newImmunizationTab');
    },
    displayImmunizationDetails: function(){
      return this.click('#immunizationsPage .immunizationDetailsTab');
    },
    selectImmunization: function(index){
      return this.click('#immunizationsTable .immunizationRow:nth-child(' + index + ')');
    },
    upsertImmunization: function(identifier, vaccine, vaccineCode, pageElement) {
      if (identifier) {
        var identifierArray = identifier.split('');
        for (var i = 0; i < identifierArray.length; i++) {
          this.setValue(pageElement + ' input[name="identifier"]', identifierArray[i]);
        }
      }
      if (vaccine) {
        var vaccineArray = vaccine.split('');
        for (var k = 0; k < vaccineArray.length; k++) {
          this.setValue(pageElement + ' input[name="vaccine"]', vaccineArray[k]);
        }
      }
      if (vaccineCode) {
        var vaccineCodeArray = vaccineCode.split('');
        for (var j = 0; j < vaccineCodeArray.length; j++) {
          this.setValue(pageElement + ' input[name="vaccineCode"]', vaccineCodeArray[j]);
        }
      }

      return this;
    },
    saveImmunization: function(){
      return this.verify.elementPresent('#saveImmunizationButton').click('#saveImmunizationButton');
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