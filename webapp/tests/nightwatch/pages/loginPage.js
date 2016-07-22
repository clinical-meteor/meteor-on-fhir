

module.exports = {
  url: 'http://localhost:3000/login',
  commands: [{
  login: function(email, password) {
    return this
      .verify.elementPresent("#loginPage")
      .verify.elementPresent('input[name="emailAddress"]')
      .verify.elementPresent('input[name="password"]')

      .clearValue('input[name="emailAddress"]')
      .clearValue('input[name="password"]')

      .setValue('input[name="emailAddress"]', email)
      .setValue('input[name="password"]', password)

      .verify.elementPresent('#loginButton')
      .click("#loginButton");
  },
  clear: function() {
    return this
      .waitForElementVisible('@emailInput')
      .clearValue('@emailInput')
      .clearValue('@passInput')
      .waitForElementVisible('@loginButton')
      .click('@loginButton')
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
