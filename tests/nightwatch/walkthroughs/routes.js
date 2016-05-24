// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  "Root": function (client) {
    client
      .resizeWindow(1024, 768)

      .url("http://localhost:3000").pause(1000)
        .verify.elementPresent("body")
        .verify.elementPresent("#publicNavigation")
        .verify.elementPresent("#aboutLink")
        .verify.elementPresent("#signupLink")
        .verify.elementPresent("#loginLink");
  },
  "/about": function (client) {
    client
      .url("http://localhost:3000/about").pause(1200)
        .verify.elementPresent("#aboutPage");
  },

  "/signup": function (client) {
    client
      .url("http://localhost:3000/signup").pause(1200)
        .verify.elementPresent("#signupPage")

        .verify.elementPresent('input[name="firstName"]')
        .verify.elementPresent('input[name="lastName"]')
        .verify.elementPresent('input[name="emailAddress"]')
        .verify.elementPresent('input[name="password"]')
        .verify.elementPresent('#signupButton');

        // .clearValue('input[name="firstName"]')
        // .clearValue('input[name="lastName"]')
        // .clearValue('input[name="emailAddress"]')
        // .clearValue('input[name="password"]')
        //
        // .setValue('input[name="firstName"]', 'Jane')
        // .setValue('input[name="lastName"]', 'Doe')
        // .setValue('input[name="emailAddress"]', 'janedoe@test.org')
        // .setValue('input[name="password"]', 'janedoe')
        //
        // .click("#signupButton").pause(500)
        //   .verify.elementPresent("#indexPage")
  },
  "/login": function (client) {
    client
      .url("http://localhost:3000/login").pause(1200)
        .verify.elementPresent("#loginPage")

        .clearValue('input[name="emailAddress"]')
        .clearValue('input[name="password"]')

        .setValue('input[name="emailAddress"]', 'janedoe@test.org')
        .setValue('input[name="password"]', 'janedoe')

        .click("#loginButton").pause(1000)
          .verify.elementPresent("#indexPage");
  },
  "/ (signed in)": function (client) {
    client
      .url("http://localhost:3000").pause(1500)
        .verify.elementPresent("#indexPage");
  },
  "/documents": function (client) {
    client
      .url("http://localhost:3000/documents").pause(1500)
        .verify.elementPresent("#documentsPage");
  },
  "/dashboard": function (client) {
    client
      .url("http://localhost:3000/dashboard").pause(1500)
        .verify.elementPresent("#dashboardPage");
  },
  "End": function (client) {
    client
      .end();
  }
};
