// category, value, unit, name, userId
// 'Weight', '60', 'kg', 'Jane Doe', '123456789',


module.exports = {
  url: 'http://localhost:3000/riskAssessments',
  commands: [{

    verifyElements: function() {
      return this
        .waitForElementPresent('#riskAssessmentsPage', 10000)
        .verify.elementPresent('#riskAssessmentsTable');
    },
    verifyEmptyList: function() {
      return this
        .verify.elementNotPresent('#riskAssessmentsTable .riskAssessmentRow:nth-child(1)');
    },
    verifyRiskAssessmentListCard: function() {
      return this
        .verify.elementPresent('#riskAssessmentsTable')
        .verify.elementPresent('#riskAssessmentsTable .riskAssessmentRow:nth-child(1)')
        .verify.elementPresent('#riskAssessmentsTable .riskAssessmentRow:nth-child(1) .riskAssessmentType')
        .verify.elementPresent('#riskAssessmentsTable .riskAssessmentRow:nth-child(1) .manufacturer')
        .verify.elementPresent('#riskAssessmentsTable .riskAssessmentRow:nth-child(1) .riskAssessmentModel')
        .verify.elementPresent('#riskAssessmentsTable .riskAssessmentRow:nth-child(1) .serialNumber');
    },
    selectNewRiskAssessmentTab: function() {
      return this
        .verify.elementPresent('#riskAssessmentsPageTabs')
        .verify.elementPresent('#riskAssessmentsPageTabs .newRiskAssessmentTab')
        .click("#riskAssessmentsPageTabs .newRiskAssessmentTab");
    },
    verifyNewRiskAssessmentCard: function() {
      return this
        .verify.elementPresent('#riskAssessmentsPage .riskAssessmentDetail')
        .verify.elementPresent('#riskAssessmentsPage .riskAssessmentDetail input[name="riskAssessmentType"]')
        .verify.elementPresent('#riskAssessmentsPage .riskAssessmentDetail input[name="manufacturer"]')
        .verify.elementPresent('#riskAssessmentsPage .riskAssessmentDetail input[name="riskAssessmentModel"]')
        .verify.elementPresent('#riskAssessmentsPage .riskAssessmentDetail input[name="serialNumber"]');
    },
    verifyRiskAssessmentDetails: function(riskAssessmentType, manufacturer, riskAssessmentModel, serialNumber) {
      this
        .waitForElementPresent('#riskAssessmentDetails', 5000);

      if (riskAssessmentType) {
        this.verify.attributeEquals('#riskAssessmentsPage .riskAssessmentDetail  input[name="riskAssessmentType"]', 'value', riskAssessmentType);
      }
      if (manufacturer) {
        this.verify.attributeEquals('#riskAssessmentsPage .riskAssessmentDetail  input[name="manufacturer"]', 'value', manufacturer);
      }
      if (riskAssessmentModel) {
        this.verify.attributeEquals('#riskAssessmentsPage .riskAssessmentDetail  input[name="riskAssessmentModel"]', 'value', riskAssessmentModel);
      }
      if (serialNumber) {
        this.verify.attributeEquals('#riskAssessmentsPage .riskAssessmentDetail  input[name="serialNumber"]', 'value', serialNumber);
      }
      return this;
    },
    listContainsRiskAssessment: function (index, riskAssessmentType, manufacturer, riskAssessmentModel, serialNumber){
      this
        .verify.elementPresent('#riskAssessmentsTable')
        .verify.elementPresent('#riskAssessmentsTable .riskAssessmentRow:nth-child(' + index + ')')
        .verify.elementPresent('#riskAssessmentsTable .riskAssessmentRow:nth-child(' + index + ') .riskAssessmentType')
        .verify.elementPresent('#riskAssessmentsTable .riskAssessmentRow:nth-child(' + index + ') .manufacturer')
        .verify.elementPresent('#riskAssessmentsTable .riskAssessmentRow:nth-child(' + index + ') .riskAssessmentModel')
        .verify.elementPresent('#riskAssessmentsTable .riskAssessmentRow:nth-child(' + index + ') .serialNumber');

      if (riskAssessmentType) {
        this.verify.containsText('#riskAssessmentsTable .riskAssessmentRow:nth-child(' + index + ') .riskAssessmentType', riskAssessmentType);
      }
      if (manufacturer) {
        this.verify.containsText('#riskAssessmentsTable .riskAssessmentRow:nth-child(' + index + ') .manufacturer', manufacturer);
      }
      if (riskAssessmentModel) {
        this.verify.containsText('#riskAssessmentsTable .riskAssessmentRow:nth-child(' + index + ') .riskAssessmentModel', riskAssessmentModel);
      }
      if (serialNumber) {
        this.verify.containsText('#riskAssessmentsTable .riskAssessmentRow:nth-child(' + index + ') .serialNumber', serialNumber);
      }
      return this;
    },
    selectListTab: function(){
      return this.click('#riskAssessmentsPage .riskAssessmentListTab');
    },
    displayListCard: function(){
      return this.click('#riskAssessmentsPage .riskAssessmentListTab');
    },
    displayNewRiskAssessmentCard: function(){
      return this.click('#riskAssessmentsPage .newRiskAssessmentTab');
    },
    displayRiskAssessmentDetails: function(){
      return this.click('#riskAssessmentsPage .riskAssessmentDetailsTab');
    },
    selectRiskAssessment: function(index){
      return this.click('#riskAssessmentsTable .riskAssessmentRow:nth-child(' + index + ')');
    },
    upsertRiskAssessment: function(riskAssessmentType, manufacturer, riskAssessmentModel, serialNumber, pageElement) {
      if (riskAssessmentType) {
        var riskAssessmentTypeArray = riskAssessmentType.split('');
        for (var i = 0; i < riskAssessmentTypeArray.length; i++) {
          this.setValue(pageElement + ' input[name="riskAssessmentType"]', riskAssessmentTypeArray[i]);
        }
      }
      if (manufacturer) {
        var manufacturerArray = manufacturer.split('');
        for (var k = 0; k < manufacturerArray.length; k++) {
          this.setValue(pageElement + ' input[name="manufacturer"]', manufacturerArray[k]);
        }
      }
      if (riskAssessmentModel) {
        var riskAssessmentModelArray = riskAssessmentModel.split('');
        for (var j = 0; j < riskAssessmentModelArray.length; j++) {
          this.setValue(pageElement + ' input[name="riskAssessmentModel"]', riskAssessmentModelArray[j]);
        }
      }
      if (serialNumber) {
        var serialNumberArray = serialNumber.split('');
        for (var l = 0; l < serialNumberArray.length; l++) {
          this.setValue(pageElement + ' input[name="serialNumber"]', serialNumberArray[l]);
        }
      }

      return this;
    },
    saveRiskAssessment: function(){
      return this.verify.elementPresent('#saveRiskAssessmentButton').click('#saveRiskAssessmentButton');
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
