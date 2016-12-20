// observationType, value, unit, name, userId
// 'Weight', '60', 'kg', 'Jane Doe', '123456789',


module.exports = {
  url: 'http://localhost:3000/observations',
  commands: [{

    verifyElements: function() {
      return this
        .verify.elementPresent('#observationsPage')
        .verify.elementPresent('#observationsTable');
    },
    verifyEmptyList: function() {
      return this
        .verify.elementNotPresent('#observationsTable .observationRow:nth-child(1)');
    },
    verifyObservationListCard: function() {
      return this
        .verify.elementPresent('#observationsTable')
        .verify.elementPresent('#observationsTable .observationRow:nth-child(1)')
        .verify.elementPresent('#observationsTable .observationRow:nth-child(1) .name')
        .verify.elementPresent('#observationsTable .observationRow:nth-child(1) .value')
        .verify.elementPresent('#observationsTable .observationRow:nth-child(1) .unit')
        .verify.elementPresent('#observationsTable .observationRow:nth-child(1) .date');
    },
    selectNewObservationTab: function() {
      return this
        .verify.elementPresent('#observationsPageTabs')
        .verify.elementPresent('#observationsPageTabs .newObservationTab')
        .click("#observationsPageTabs .newObservationTab");
    },
    verifyNewObservationCard: function() {
      return this
        .verify.elementPresent('#observationsPage .observationDetail')
        .verify.elementPresent('#observationsPage .observationDetail input[name="observationType"]')
        .verify.elementPresent('#observationsPage .observationDetail input[name="value"]')
        .verify.elementPresent('#observationsPage .observationDetail input[name="unit"]')
        .verify.elementPresent('#observationsPage .observationDetail input[name="name"]')
        .verify.elementPresent('#observationsPage .observationDetail input[name="userId"]');
    },
    verifyObservationDetails: function(observationType, value, unit, name, userId) {
      this
        .waitForElementPresent('#observationDetails', 5000)
        .waitForElementPresent('#observationDetails input[name="name"]', 5000);

      if (observationType) {
        this.verify.attributeEquals('#observationsPage .observationDetail  input[name="observationType"]', 'value', observationType);
      }
      if (value) {
        this.verify.attributeEquals('#observationsPage .observationDetail  input[name="value"]', 'value', value);
      }
      if (unit) {
        this.verify.attributeEquals('#observationsPage .observationDetail  input[name="unit"]', 'value', unit);
      }
      if (name) {
        this.verify.attributeEquals('#observationsPage .observationDetail  input[name="name"]', 'value', name);
      }
      if (userId) {
        this.verify.attributeEquals('#observationsPage .observationDetail  input[name="userId"]', 'value', userId);
      }
      return this;
    },
    listContainsObservation: function (index, observationType, value, unit, name, userId) {
      this
        .verify.elementPresent('#observationsTable')
        .verify.elementPresent('#observationsTable .observationRow:nth-child(' + index + ')')
        .verify.elementPresent('#observationsTable .observationRow:nth-child(' + index + ') .observationType')
        .verify.elementPresent('#observationsTable .observationRow:nth-child(' + index + ') .value')
        .verify.elementPresent('#observationsTable .observationRow:nth-child(' + index + ') .unit')
        .verify.elementPresent('#observationsTable .observationRow:nth-child(' + index + ') .name');

      if (observationType) {
        this.verify.containsText('#observationsTable .observationRow:nth-child(' + index + ') .observationType', observationType);
      }
      if (value) {
        this.verify.containsText('#observationsTable .observationRow:nth-child(' + index + ') .value', value);
      }
      if (unit) {
        this.verify.containsText('#observationsTable .observationRow:nth-child(' + index + ') .unit', unit);
      }
      if (name) {
        this.verify.containsText('#observationsTable .observationRow:nth-child(' + index + ') .name', name);
      }
      return this;
    },
    selectListTab: function(){
      return this.click('#observationsPage .observationListTab');
    },
    displayListCard: function(){
      return this.click('#observationsPage .observationListTab');
    },
    displayNewObservationCard: function(){
      return this.click('#observationsPage .newObservationTab');
    },
    displayObservationDetails: function(){
      return this.click('#observationsPage .observationDetailsTab');
    },
    selectObservation: function(index){
      return this.click('#observationsTable .observationRow:nth-child(' + index + ')');
    },
    upsertObservation: function(observationType, value, unit, name, userId, pageElement) {
      if (observationType) {
        var observationTypeArray = observationType.split('');
        for (var i = 0; i < observationTypeArray.length; i++) {
          this.setValue(pageElement + ' input[name="observationType"]', observationTypeArray[i]);
        }
      }
      if (value) {
        var valueArray = value.split('');
        for (var k = 0; k < valueArray.length; k++) {
          this.setValue(pageElement + ' input[name="value"]', valueArray[k]);
        }
      }
      if (unit) {
        var unitArray = unit.split('');
        for (var j = 0; j < unitArray.length; j++) {
          this.setValue(pageElement + ' input[name="unit"]', unitArray[j]);
        }
      }
      if (name) {
        var nameArray = name.split('');
        for (var l = 0; l < nameArray.length; l++) {
          this.setValue(pageElement + ' input[name="name"]', nameArray[l]);
        }
      }
      if (userId) {
        var userIdArray = userId.split('');
        for (var m = 0; m < userIdArray.length; m++) {
          this.setValue(pageElement + ' input[name="userId"]', userIdArray[m]);
        }
      }

      return this;
    },
    saveObservation: function(){
      return this.verify.elementPresent('#saveObservationButton').click('#saveObservationButton');
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
