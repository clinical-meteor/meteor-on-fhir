module.exports = {
  url: 'http://localhost:3000',
  commands: [{
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
