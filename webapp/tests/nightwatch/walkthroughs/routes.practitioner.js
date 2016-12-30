// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  tags: ['routes', 'practitioners', 'circle'],
  before: function(client){
    client
      .url("http://localhost:3000").pause(3000)
      .executeAsync(function(data){
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
      .url("http://localhost:3000/signin").pause(1200)
        .verify.elementPresent("#signinPage");
  },
  "/signup": function (client) {
    client.page.signupPage()
      .navigate()
      .fillOutSignupPage('Gregory', 'House', 'house@test.org', 'house123', 'hippocrates')
      .saveScreenshot('tests/nightwatch/screenshots/accounts/A-signupPage.png', client)
      .signup()
      .pause(1000, client);
  },
  "/ (signed in)": function (client) {
    client
      .url("http://localhost:3000").pause(2000)
        .verify.elementPresent("#indexPage")
        .saveScreenshot("tests/nightwatch/screenshots/routes/index.png");
  },
  "/dashboard": function (client) {
    client
      .url("http://localhost:3000/dashboard").pause(2000)
        .verify.elementPresent("#dashboardPage")
        .saveScreenshot("tests/nightwatch/screenshots/routes/dashboard.png");
  },
  "/patients": function (client) {
    client
      .url("http://localhost:3000/patients").pause(2000)
        .verify.elementPresent("#patientsPage")
        .saveScreenshot("tests/nightwatch/screenshots/routes/patients.png")
        .end();
  }
};
