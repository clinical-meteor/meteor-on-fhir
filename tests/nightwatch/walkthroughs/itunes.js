// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

module.exports = {
  tags: ["itunes", "publish", "marketing"],
  "iTunesConnect" : function (client) {
    client
      .resizeWindow(1024, 768)

      .url("http://localhost:3000/features")
      .pause(500)
      .verify.elementPresent("#marketingPage")
      .saveScreenshot("tests/nightwatch/screenshots/iTunesConnect/A-marketingPage.png")

      .url("http://localhost:3000/support")
      .pause(500)
      .verify.elementPresent("#supportPage")
      .saveScreenshot("tests/nightwatch/screenshots/iTunesConnect/A-supportPage.png")

      .url("http://localhost:3000/privacy")
      .pause(500)
      .verify.elementPresent("#privacyPage")
      .saveScreenshot("tests/nightwatch/screenshots/iTunesConnect/A-privacyPage.png")

      .end();
  }
};
