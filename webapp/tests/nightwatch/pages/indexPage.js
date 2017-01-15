module.exports = {
  url: 'http://localhost:3000',
  commands: [{
    selectPatientsTile: function() {
      return this
        .verify.elementPresent('#patientsTile')
        .click('#patientsTile');
    },
    selectPractitionersTile: function() {
      return this
        .verify.elementPresent('#practitionersTile')
        .click('#practitionersTile');
    },
    selectObservationsTile: function() {
      return this
        .verify.elementPresent('#observationsTile')
        .click('#observationsTile');
    },
    selectMedicationsTile: function() {
      return this
        .verify.elementPresent('#medicationsTile')
        .click('#medicationsTile');
    },
    selectDevicesTile: function() {
      return this
        .verify.elementPresent('#devicesTile')
        .click('#devicesTile');
    },
    selectRiskAssessmentsTile: function() {
      return this
        .verify.elementPresent('#riskAssessmentsTile')
        .click('#riskAssessmentsTile');
    },
    selectConditionsTile: function() {
      return this
        .verify.elementPresent('#conditionsTile')
        .click('#conditionsTile');
    }
  }],
  elements: {
    indexPage: {
      selector: '#indexPage'
    }
  }
};
