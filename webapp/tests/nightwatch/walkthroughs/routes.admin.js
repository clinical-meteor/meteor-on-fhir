// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  tags: ['routes', 'sysadmin', 'circle'],
  before: function(client){
    client
      .url("http://localhost:3000").pause(3000)
      .executeAsync(function(){
        Meteor.call('dropTestUsers');
      });
  },
  "/": function (client) {
    client
      .resizeWindow(1024, 768)

      .url("http://localhost:3000").pause(1000)
        .verify.elementPresent("body")
        .verify.elementPresent("#publicNavigation")
        .verify.elementPresent("#signupLink")
        .verify.elementPresent("#signinLink")
        .saveScreenshot("tests/nightwatch/screenshots/routes/root.png");
  },
  "/signin": function (client) {
    client
      .url("http://localhost:3000/signin")
        .waitForElementPresent("#signinPage", 3000);
  },
  "/signup": function (client) {
    client.page.signupPage()
      .navigate()
      .fillOutSignupPage('System', 'Admin', 'sysadmin@test.org', 'sysadmin123', 'rootaccess')
      .saveScreenshot('tests/nightwatch/screenshots/accounts/A-signupPage.png', client)
      .signup()
      .pause(2000, client);
  },
  "/ (signed in)": function (client) {
    client
      .waitForElementPresent("#indexPage", 5000)
      .saveScreenshot("tests/nightwatch/screenshots/routes/index.png");
  },
  "/dashboard": function (client) {
    client
      .url("http://localhost:3000/dashboard")
      .waitForElementPresent("#dashboardPage", 3000)
      .saveScreenshot("tests/nightwatch/screenshots/routes/dashboard.png");
  },
  "/patients": function (client) {
    client
      .url("http://localhost:3000/patients")
        .waitForElementPresent("#patientsPage", 3000)
        .saveScreenshot("tests/nightwatch/screenshots/routes/patients.png");
  },
  "/practitioners": function (client) {
    client
      .url("http://localhost:3000/practitioners")
        .waitForElementPresent("#practitionersPage", 3000)
        .saveScreenshot("tests/nightwatch/screenshots/routes/practitioners.png")
        .end();
  }
};
