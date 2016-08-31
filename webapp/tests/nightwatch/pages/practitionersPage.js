module.exports = {
  url: 'http://localhost:3000/practitioners',
  commands: [{

    verifyElements: function() {
      return this
        .verify.elementPresent('#practitionersPage')
        .verify.elementPresent('#practitionersTable')
        .verify.elementPresent('#practitionersTable .practitionerRow:nth-child(1)');
    },
    verifyListCard: function() {
      return this
        .verify.elementPresent('#practitionersTable')
        .verify.elementPresent('#practitionersTable .practitionerRow:nth-child(1)')
        .verify.elementPresent('#practitionersTable .practitionerRow:nth-child(1) .name')
        .verify.elementPresent('#practitionersTable .practitionerRow:nth-child(1) .avatar');
    },
    verifyNewPractitionerCard: function() {
      return this
        .verify.elementPresent('#practitionersPage .practitionerDetail')
        .verify.elementPresent('#practitionersPage .practitionerDetail input[name="name"]')
        .verify.elementPresent('#practitionersPage .practitionerDetail input[name="gender"]')
        .verify.elementPresent('#practitionersPage .practitionerDetail input[name="photo"]')
        .verify.elementPresent('#practitionersPage .practitionerDetail input[name="active"]');
    },
    verifyPractitionerDetails: function(name, avatar) {
      return this
        .verify.containsText('#practitionersPage .practitionerDetail input[name="name"]', name)
        .verify.containsText('#practitionersPage .practitionerDetail input[name="photo"]', avatar);
    },
    listContainsPractitioner: function (index, name, avatar) {
      return this
        .verify.elementPresent('#practitionersTable')
        .verify.elementPresent('#practitionersTable .practitionerRow:nth-child(' + index + ')')
        .verify.elementPresent('#practitionersTable .practitionerRow:nth-child(' + index + ') .name', name)
        .verify.elementPresent('#practitionersTable .practitionerRow:nth-child(' + index + ') .avatar', avatar);
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
    createNewPractitioner: function(name, gender, photo) {
      return this
        .verify.elementPresent('#practitionersPage .practitionerDetail')

        .verify.elementPresent('#practitionersPage .practitionerDetail input[name="name"]')
        .clearValue('#practitionersPage .practitionerDetail input[name="name"]')
        .setValue('#practitionersPage .practitionerDetail input[name="name"]', name)

        .verify.elementPresent('#savePractitionerButton')
        .click('#savePractitionerButton');
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
