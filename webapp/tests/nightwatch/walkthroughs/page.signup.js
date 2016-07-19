export default {  
  url: 'https://localhost:3000/signup',
  commands: [{  
  signup(email, pass) {
    return this
      .waitForElementVisible('@emailInput')
      .clearValue('@emailInput')
      .clearValue('@passInput')
      .setValue('@emailInput', email)
      .setValue('@passInput', pass)
      .waitForElementVisible('@loginButton')
      .click('@loginButton')
  },
  clear() {
    return this
      .waitForElementVisible('@emailInput')
      .clearValue('@emailInput')
      .clearValue('@passInput')
      .waitForElementVisible('@loginButton')
      .click('@loginButton')
  },
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