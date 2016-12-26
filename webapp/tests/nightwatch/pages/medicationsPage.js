// category, value, unit, name, userId
// 'Weight', '60', 'kg', 'Jane Doe', '123456789',


module.exports = {
  url: 'http://localhost:3000/medications',
  commands: [{

    verifyElements: function() {
      return this
        .waitForElementPresent('#medicationsPage', 10000)
        .verify.elementPresent('#medicationsTable');
    },
    verifyEmptyList: function() {
      return this
        .verify.elementNotPresent('#medicationsTable .medicationRow:nth-child(1)');
    },
    verifyMedicationListCard: function() {
      return this
        .verify.elementPresent('#medicationsTable')
        .verify.elementPresent('#medicationsTable .medicationRow:nth-child(1)')
        .verify.elementPresent('#medicationsTable .medicationRow:nth-child(1) .medicationName')
        .verify.elementPresent('#medicationsTable .medicationRow:nth-child(1) .manufacturerDisplay')
        .verify.elementPresent('#medicationsTable .medicationRow:nth-child(1) .medicationForm')
        .verify.elementPresent('#medicationsTable .medicationRow:nth-child(1) .activeIngredient');
    },
    selectNewMedicationTab: function() {
      return this
        .verify.elementPresent('#medicationsPageTabs')
        .verify.elementPresent('#medicationsPageTabs .newMedicationTab')
        .click("#medicationsPageTabs .newMedicationTab");
    },
    verifyNewMedicationCard: function() {
      return this
        .verify.elementPresent('#medicationsPage .medicationDetail')
        .verify.elementPresent('#medicationsPage .medicationDetail input[name="medicationName"]')
        .verify.elementPresent('#medicationsPage .medicationDetail input[name="manufacturerDisplay"]')
        .verify.elementPresent('#medicationsPage .medicationDetail input[name="medicationForm"]')
        .verify.elementPresent('#medicationsPage .medicationDetail input[name="activeIngredient"]')
        .verify.elementPresent('#medicationsPage .medicationDetail input[name="activeIngredientQuantity"]')
        .verify.elementPresent('#medicationsPage .medicationDetail input[name="activeIngredientDescription"]');
    },
    verifyMedicationDetails: function(medicationName, manufacturerDisplay, medicationForm, activeIngredient, activeIngredientQuantity, activeIngredientDescription) {
      this
        .waitForElementPresent('#medicationDetails', 5000);

      if (medicationName) {
        this.verify.attributeEquals('#medicationsPage .medicationDetail  input[name="medicationName"]', 'value', medicationName);
      }
      if (manufacturerDisplay) {
        this.verify.attributeEquals('#medicationsPage .medicationDetail  input[name="manufacturerDisplay"]', 'value', manufacturerDisplay);
      }
      if (medicationForm) {
        this.verify.attributeEquals('#medicationsPage .medicationDetail  input[name="medicationForm"]', 'value', medicationForm);
      }
      if (activeIngredient) {
        this.verify.attributeEquals('#medicationsPage .medicationDetail  input[name="activeIngredient"]', 'value', activeIngredient);
      }
      if (activeIngredientQuantity) {
        this.verify.attributeEquals('#medicationsPage .medicationDetail  input[name="activeIngredientQuantity"]', 'value', activeIngredientQuantity);
      }
      if (activeIngredientDescription) {
        this.verify.attributeEquals('#medicationsPage .medicationDetail  input[name="activeIngredientDescription"]', 'value', activeIngredientDescription);
      }
      return this;
    },
    listContainsMedication: function (index, medicationName, manufacturerDisplay, medicationForm, activeIngredient){
      this
        .verify.elementPresent('#medicationsTable')
        .verify.elementPresent('#medicationsTable .medicationRow:nth-child(' + index + ')')
        .verify.elementPresent('#medicationsTable .medicationRow:nth-child(' + index + ') .medicationName')
        .verify.elementPresent('#medicationsTable .medicationRow:nth-child(' + index + ') .manufacturerDisplay')
        .verify.elementPresent('#medicationsTable .medicationRow:nth-child(' + index + ') .medicationForm')
        .verify.elementPresent('#medicationsTable .medicationRow:nth-child(' + index + ') .activeIngredient');

      if (medicationName) {
        this.verify.containsText('#medicationsTable .medicationRow:nth-child(' + index + ') .medicationName', medicationName);
      }
      if (manufacturerDisplay) {
        this.verify.containsText('#medicationsTable .medicationRow:nth-child(' + index + ') .manufacturerDisplay', manufacturerDisplay);
      }
      if (medicationForm) {
        this.verify.containsText('#medicationsTable .medicationRow:nth-child(' + index + ') .medicationForm', medicationForm);
      }
      if (activeIngredient) {
        this.verify.containsText('#medicationsTable .medicationRow:nth-child(' + index + ') .activeIngredient', activeIngredient);
      }
      return this;
    },
    selectListTab: function(){
      return this.click('#medicationsPage .medicationListTab');
    },
    displayListCard: function(){
      return this.click('#medicationsPage .medicationListTab');
    },
    displayNewMedicationCard: function(){
      return this.click('#medicationsPage .newMedicationTab');
    },
    displayMedicationDetails: function(){
      return this.click('#medicationsPage .medicationDetailsTab');
    },
    selectMedication: function(index){
      return this.click('#medicationsTable .medicationRow:nth-child(' + index + ')');
    },
    upsertMedication: function(medicationName, manufacturerDisplay, medicationForm, activeIngredient, activeIngredientQuantity, activeIngredientDescription, pageElement) {
      if (medicationName) {
        var medicationNameArray = medicationName.split('');
        for (var i = 0; i < medicationNameArray.length; i++) {
          this.setValue(pageElement + ' input[name="medicationName"]', medicationNameArray[i]);
        }
      }
      if (manufacturerDisplay) {
        var manufacturerDisplayArray = manufacturerDisplay.split('');
        for (var k = 0; k < manufacturerDisplayArray.length; k++) {
          this.setValue(pageElement + ' input[name="manufacturerDisplay"]', manufacturerDisplayArray[k]);
        }
      }
      if (medicationForm) {
        var medicationFormArray = medicationForm.split('');
        for (var j = 0; j < medicationFormArray.length; j++) {
          this.setValue(pageElement + ' input[name="medicationForm"]', medicationFormArray[j]);
        }
      }
      if (activeIngredient) {
        var activeIngredientArray = activeIngredient.split('');
        for (var l = 0; l < activeIngredientArray.length; l++) {
          this.setValue(pageElement + ' input[name="activeIngredient"]', activeIngredientArray[l]);
        }
      }
      if (activeIngredientQuantity) {
        var activeIngredientQuantityArray = activeIngredientQuantity.split('');
        for (var m = 0; m < activeIngredientQuantityArray.length; m++) {
          this.setValue(pageElement + ' input[name="activeIngredientQuantity"]', activeIngredientQuantityArray[m]);
        }
      }
      if (activeIngredientDescription) {
        var activeIngredientDescriptionArray = activeIngredientDescription.split('');
        for (var m = 0; m < activeIngredientDescriptionArray.length; m++) {
          this.setValue(pageElement + ' input[name="activeIngredientDescription"]', activeIngredientDescriptionArray[m]);
        }
      }
      return this;
    },
    saveMedication: function(){
      return this.verify.elementPresent('#saveMedicationButton').click('#saveMedicationButton');
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
