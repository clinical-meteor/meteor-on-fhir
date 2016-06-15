// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  "Root": function (client) {
    client
      .resizeWindow(1024, 768)
  },

  "User can sign up.": function (client) {
    client
      .url("http://localhost:3000").pause(1200)

        .click("#signupLink").pause(500)
        .verify.elementPresent("#signupPage")
        .verify.elementPresent('input[name="firstName"]')
        .verify.elementPresent('input[name="lastName"]')
        .verify.elementPresent('input[name="emailAddress"]')
        .verify.elementPresent('input[name="password"]')
        .verify.elementPresent('#signupButton');

        .clearValue('input[name="firstName"]')
        .clearValue('input[name="lastName"]')
        .clearValue('input[name="emailAddress"]')
        .clearValue('input[name="password"]')

        .setValue('input[name="firstName"]', 'John')
        .setValue('input[name="lastName"]', 'Doe')
        .setValue('input[name="emailAddress"]', 'johndoe@test.org')
        .setValue('input[name="password"]', 'johndoe')

        .click("#signupButton").pause(500)
  },
  "User gets logged in after signup.": function (client) {
    client
          .verify.elementPresent("#indexPage")
  },
  "User can log out.": function (client) {
    client
      .url("http://localhost:3000").pause(1500)
        .verify.elementPresent("#authenticatedNavDropdown")
        .click("#authenticatedNavDropdown").pause(500)
        .click("#logoutMenuItem").pause(500)
  },
  "User can sign in.": function (client) {
    client
      .url("http://localhost:3000/login").pause(1200)
        .verify.elementPresent("#loginPage")

        .clearValue('input[name="emailAddress"]')
        .clearValue('input[name="password"]')

        .setValue('input[name="emailAddress"]', 'johndoe@test.org')
        .setValue('input[name="password"]', 'johndoe')

        .click("#loginButton").pause(1000)
          .verify.elementPresent("#indexPage");
  },
  "User can view profile.": function (client) {
    client
        .click("#authenticatedNavDropdown").pause(500)
        .click("#profileMenuItem").pause(500)
  },
  "User can edit profile.": function (client) {
    client
  },
  "User can change password.": function (client) {
    client
  },
  "User can sign in with new password.": function (client) {
    client
  },
  "User can delete account.": function (client) {
    // log out
    client

    //
  },
  "End": function (client) {
    client
      .end();
  }
};
