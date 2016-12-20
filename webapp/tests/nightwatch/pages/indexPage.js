module.exports = {
  url: 'http://localhost:3000',
  commands: [{
    selectObservationsTile: function() {
      return this
        .verify.elementPresent('#observationsTile')
        .click('#observationsTile');
    },
    selectPatientsTile: function() {
      return this
        .verify.elementPresent('#patientsTile')
        .click('#patientsTile');
    },
    selectPractitionersTile: function() {
      return this
        .verify.elementPresent('#practitionersTile')
        .click('#practitionersTile');
    }
  }],
  elements: {
    indexPage: {
      selector: '#indexPage'
    }
  }
};
