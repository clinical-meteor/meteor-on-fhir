

export default {  
  url: 'https://localhost:3000/login',
  commands: [{  
  login(email, pass) {
    return this
      //waitForElementVisible('@emailInput')
      //clearValue('@emailInput')
      //clearValue('@passInput')
      //setValue('@emailInput', email)
      //setValue('@passInput', pass)
      //waitForElementVisible('@loginButton')
      //click('@loginButton')
      
      
      .verify.elementPresent("#loginPage")
        .verify.elementPresent('input[name="emailAddress"]')
        .verify.elementPresent('input[name="password"]')
        .verify.elementPresent('#loginButton')

        .clearValue('input[name="emailAddress"]')
        .clearValue('input[name="password"]')

        .setValue('input[name="emailAddress"]', 'janedoe@test.org')
        .setValue('input[name="password"]', 'janedoe')

        .click("#loginButton").pause(1000)
          .verify.elementPresent("#indexPage");
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