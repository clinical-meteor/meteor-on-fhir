// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  tags: ['routes', 'patient', 'circle'],
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
  "/login": function (client) {
    client
      .url("http://localhost:3000/login").pause(1200)
        .verify.elementPresent("#loginPage");
  },
  "/signup": function (client) {
    client.page.signupPage()
      .navigate()
      .signup('Alice', 'Doe', 'alice@test.org', 'alicedoe')
      .pause(1000, client);
  },
  "/ (signed in)": function (client) {
    client
      .url("http://localhost:3000").pause(2000)
        .verify.elementPresent("#indexPage")
        .saveScreenshot("tests/nightwatch/screenshots/routes/index.png");
  },
  "/weblog": function (client) {
    client
      .url("http://localhost:3000/weblog").pause(2000)
      .verify.elementPresent("#weblogPage")
      .saveScreenshot("tests/nightwatch/screenshots/routes/weblog.png")
      .end();
  }

};
