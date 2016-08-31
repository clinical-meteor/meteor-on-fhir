
module.exports = {
  tags: ["healthlog", "weblog"],
  "user can log in/out" : function (client) {
    client.resizeWindow(1200, 1024);

    const loginPage = client.page.loginPage();
    const indexPage = client.page.indexPage();

    client.page.loginPage()
      .navigate()
      .login("janedoe@test.org", "janedoe")
      .pause(1000, client);

    indexPage.expect.element('#indexPage').to.be.present;
    indexPage.expect.element('#authenticatedUsername').text.to.contain('Jane Doe');
  },

  "user can navigate to weblog page" : function (client) {
    const weblogPage = client.page.weblogPage();

    weblogPage
      .navigate()
      .pause(1000, client)
      .verifyElements()
  },

  "user should be able to post status" : function (client) {
    const weblogPage = client.page.weblogPage();

    weblogPage
      .post("Lorem ipsum...")
  },

  "status should have title, text, image, and labels" : function (client) {
    const weblogPage = client.page.weblogPage();

    weblogPage
      .confirmPostCreated("Lorem ipsum...", 1)
  },


  // "tapping on status should highlight it" : function (client) {
  //   client
  //     .verify.elementPresent("#statusList .status:nth-child(1)")
  //     .verify.elementNotPresent("#statusList .status:nth-child(1) .selected")
  //     .click("#statusList .status:nth-child(1)").pause(500)
  //     .verify.elementPresent("#statusList .status:nth-child(1) .selected")
  // },
  //
  //   "guest can view statuses" : function (client) {
  //   client
  //
  //     // Navigate.logout()
  //     .verify.elementPresent("#authenticatedUsername")
  //     .click("#authenticatedUsername").pause(1000)
  //     .verify.elementPresent("#authenticatedUserMenu .notificationMenu .logoutMenuItem")
  //     .click("#authenticatedUserMenu .notificationMenu .logoutMenuItem").pause(500)
  //     .verify.elementPresent("#loginPage")
  //
  //     .url("http://localhost:3000/weblog").pause(1200)
  //
  //     .verify.attributeEquals("#statusList .status:nth-child(1) .title", "value", "Foo")
  //     .verify.attributeEquals("#statusList .status:nth-child(1) .text", "value", "Lorem ipsum...")
  //     .verify.attributeEquals("#statusList .status:nth-child(1) .image", "value", "http://www.somewhere.com/foo.jpg")
  //     .verify.attributeEquals("#statusList .status:nth-child(1) .labels", "value", "foo")
  // },
  //
  // "user can edit status after its posted" : function (client) {
  //   client
  //     // Navigate.login("janedoe@test.org", "janedoe123")
  //
  //       .verify.elementPresent("#loginPage")
  //       .verify.elementPresent('input[name="emailAddress"]')
  //       .verify.elementPresent('input[name="password"]')
  //       .verify.elementPresent('#loginButton')
  //
  //       .clearValue('input[name="emailAddress"]')
  //       .clearValue('input[name="password"]')
  //
  //       .setValue('input[name="emailAddress"]', 'janedoe@test.org')
  //       .setValue('input[name="password"]', 'janedoe')
  //
  //       .click("#loginButton").pause(1000)
  //         .verify.elementPresent("#indexPage");
  //
  //     // Navigate.to("weblogPage")
  //     .url("http://localhost:3000/weblog").pause(1200)
  //
  //     .verify.elementPresent("#statusList .status:nth-child(1)")
  //     .verify.elementPresent("#statusList .status:nth-child(1) .title")
  //     .verify.elementPresent("#statusList .status:nth-child(1) .text")
  //     .verify.elementPresent("#statusList .status:nth-child(1) .image")
  //     .verify.elementPresent("#statusList .status:nth-child(1) .labels")
  //
  //     .verify.elementPresent("#statusList .status:nth-child(1) .editAction")
  //
  //     .verify.attributeEquals("#statusList .status:nth-child(1) .title", "value", "Foo")
  //     .verify.attributeEquals("#statusList .status:nth-child(1) .text", "value", "Lorem ipsum...")
  //     .verify.attributeEquals("#statusList .status:nth-child(1) .image", "value", "http://www.somewhere.com/foo.jpg")
  //     .verify.attributeEquals("#statusList .status:nth-child(1) .labels", "value", "foo")
  //
  //     .clearValue("#statusList .status:nth-child(1) .title")
  //     .clearValue("#statusList .status:nth-child(1) .text")
  //     .clearValue("#statusList .status:nth-child(1) .image")
  //     .clearValue("#statusList .status:nth-child(1) .labels")
  //
  //     .setValue("#statusList .status:nth-child(1) .title", "Bar"
  //     .setValue("#statusList .status:nth-child(1) .text", "Lorem barnum..."
  //     .setValue("#statusList .status:nth-child(1) .image", "http://www.somewhere.com/bar.jpg"
  //     .setValue("#statusList .status:nth-child(1) .labels", "bar"
  //
  //     .click("#statusList .status:nth-child(1) .editAction").pause(500)
  //
  //     .verify.attributeEquals("#statusList .status:nth-child(1) .title", "value", "Bar")
  //     .verify.attributeEquals("#statusList .status:nth-child(1) .text", "value", "Lorem barnum...")
  //     .verify.attributeEquals("#statusList .status:nth-child(1) .image", "value", "http://www.somewhere.com/bar.jpg")
  //     .verify.attributeEquals("#statusList .status:nth-child(1) .labels", "value", "bar")
  // },
  //
  //
  // "user can search statuses" : function (client) {
  //   client
  //     .verify.elementPresent("#statusSearch")
  //     .verify.elementPresent("#statusSearchInput")
  //     .verify.elementPresent("#statusSearchButton")
  //
  //     .clearValue("#statusSearchInput")
  //     .setValue("#statusSearchInput", "Foo")
  //     .click("#statusSearchButton").pause(500)
  // },
  // "statuses are listed in chronological order" : function (client) {
  //   client
  // },
  //
  //
  // "user can delete status" : function (client) {
  //   client
  //     .verify.elementPresent("#statusList .status:nth-child(1)")
  //     .verify.elementPresent("#statusList .status:nth-child(1) .deleteAction")
  //     .click("#statusList .status:nth-child(1) .deleteAction").pause(500)
  //     .verify.elementNotPresent("#statusList .status:nth-child(1)")
  // },
  //
  //
  //
  //
  // "guest can not edit statuses" : function (client) {
  //   client
  //     .verify.elementPresent("#statusList .status:nth-child(1)")
  //     .verify.elementNotPresent("#statusList .status:nth-child(1) .editAction")
  // },
  //
  // "labels are displayed in sidebar category list" : function (client) {
  //   client
  //     .verify.elementPresent("#categoryList")
  //     .verify.elementPresent("#categoryList .category:nth-child(1)")
  // },
  // "user can filter statuses by label" : function (client) {
  //   client
  //     .verify.elementPresent("#categoryList")
  //     .verify.elementPresent("#categoryList .category:nth-child(1)")
  //     .click("#categoryList .category:nth-child(1)").pause(500)
  //
  // },


  // requires
  //"User can share status on Facebook (share button)" : function (client) {
  //  client
  //},

  // not sure how to implement this
  //"status displays on Facebook with opengraph  metadata" : function (client) {
  //  client
  //},

  "end" : function (client) {
    client
      .end();
  }
}
