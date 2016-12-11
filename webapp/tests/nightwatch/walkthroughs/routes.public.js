// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  tags: ['routes', 'public', 'circle'],
  before: function(client){
    client
      .url("http://localhost:3000").pause(3000)
      .executeAsync(function(){
        Meteor.call('initializeTestUsers');
      });
  },
  "/": function (client) {
    client
      .resizeWindow(1024, 768)

      .url("http://localhost:3000").pause(1000)
        .verify.elementPresent("body")
        .verify.elementPresent("#publicNavigation")
        .verify.elementPresent("#signupLink")
        .verify.elementPresent("#loginLink")


        .saveScreenshot("tests/nightwatch/screenshots/routes/root.png");
  },
  "/about": function (client) {
    client
      .url("http://localhost:3000/about").pause(1200)
        .verify.elementPresent("#aboutPage")
        .saveScreenshot("tests/nightwatch/screenshots/routes/about.png");
  },
  "/privacy": function (client) {
    client
      .url("http://localhost:3000/privacy").pause(1200)
        .verify.elementPresent("#privacyPage")
        .saveScreenshot("tests/nightwatch/screenshots/routes/privacy.png");
  },
  "/support": function (client) {
    client
      .url("http://localhost:3000/support").pause(1200)
        .verify.elementPresent("#forumPage")
        .saveScreenshot("tests/nightwatch/screenshots/routes/support.png");
  },
  "/signup": function (client) {
    client
      .url("http://localhost:3000/signup").pause(1200)
        .verify.elementPresent("#signupPage")
        .saveScreenshot("tests/nightwatch/screenshots/routes/support.png");
  },
  "/login": function (client) {
    client
      .url("http://localhost:3000/login").pause(1200)
        .verify.elementPresent("#loginPage")
        .saveScreenshot("tests/nightwatch/screenshots/routes/support.png");
  }
};
