module.exports = {
  url: 'http://localhost:3000/signup',
  commands: [{
  signup: function(firstName, lastName, emailAddress, password) {
    return this
      .verify.elementPresent("#signupPage")
      .verify.elementPresent('input[name="firstName"]')
      .verify.elementPresent('input[name="lastName"]')
      .verify.elementPresent('input[name="emailAddress"]')
      .verify.elementPresent('input[name="password"]')

      .clearValue('input[name="firstName"]')
      .clearValue('input[name="lastName"]')
      .clearValue('input[name="emailAddress"]')
      .clearValue('input[name="password"]')

      .setValue('input[name="firstName"]', firstName)
      .setValue('input[name="lastName"]', lastName)
      .setValue('input[name="emailAddress"]', emailAddress)
      .setValue('input[name="password"]', password)

    .verify.elementPresent('#signupButton')
    .click('#signupButton')
  },
  clear: function() {
    return this
      .clearValue('input[name="firstName"]')
      .clearValue('input[name="lastName"]')
      .clearValue('input[name="emailAddress"]')
      .clearValue('input[name="password"]');
  },
  // refactor to
  verifyElements: function() {
    return this
      .verify.elementPresent('#addPostCard textarea')
      .verify.elementPresent('#weblogPage')
      .verify.elementPresent('#addPostCard')
      .verify.elementPresent('#addPostButton');
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
  elements: {
    emailInput: {
      selector: 'input[type=text]'
    },
    passInput: {
      selector: 'input[name=password]'
    },
    loginButton: {
      selector: 'button[type=submit]'
    }
  }
};
