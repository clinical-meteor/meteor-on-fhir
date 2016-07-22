// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api


module.exports = {
  tags: ['accounts', 'passwords', 'users', 'entry'],
  'User can sign up.': function (client) {
    client.resizeWindow(1200, 1024);

    const signupPage = client.page.signupPage();
    const indexPage = client.page.indexPage();

    client.page.signupPage()
      .navigate()
      .signup('Alice', 'Doe', 'alice@test.org', 'alicedoe')
      .pause(1000, client);

    indexPage.expect.element('#indexPage').to.be.present;
    indexPage.expect.element('#authenticatedUsername').text.to.contain('Alice Doe');
  },
  'User gets logged in after signup.': function (client) {
    client.verify.elementPresent('#indexPage')
  },
  'User can log out.': function (client) {
    client.verify.elementPresent('#authenticatedUsername')
      .click('#authenticatedUsername').pause(1000)
      .verify.elementPresent('#authenticatedUserMenu .notificationMenu .logoutMenuItem')
      .click('#authenticatedUserMenu .notificationMenu .logoutMenuItem').pause(500)
      .verify.elementPresent('#loginPage')
  },
  'User can sign in.': function (client) {
    const loginPage = client.page.loginPage();
    const indexPage = client.page.indexPage();

    client.page.loginPage()
      .navigate()
      .login("alice@test.org", "alicedoe")
      .pause(2000, client);

    indexPage.expect.element('#indexPage').to.be.present;
    indexPage.expect.element('#authenticatedUsername').text.to.contain('Alice Doe');
  },
  "User can view profile.": function (client) {
    client
      .verify.elementPresent("#authenticatedUsername")
      .click("#authenticatedUsername").pause(500)

      .verify.elementPresent("#authenticatedUserMenu .profileMenuItem")
      .click("#authenticatedUserMenu .profileMenuItem").pause(500)

      .verify.elementPresent("#myProfilePage")
  },
  "User can edit profile avatar.": function (client) {
    var myArray = 'https://pbs.twimg.com/profile_images/436598467956187136/yncbkX83_400x400.jpeg'.split('');

    client
      .verify.elementPresent('#avatarImage')
      .verify.attributeEquals('#avatarImage', 'src', 'http://localhost:3000/thumbnail.png')

      .verify.elementPresent('input[name="avatar"]')
        .clearValue('input[name="avatar"]')
        .setValue('input[name="avatar"]', 'https://foo').pause(500)
        .verify.attributeEquals('#avatarImage', 'src', 'http://localhost:3000/noAvatar.png')

      .verify.elementPresent('input[name="avatar"]')
        .clearValue('input[name="avatar"]')

        for(var i=0; i < myArray.length; i++) {
          client.setValue('input[name="avatar"]', myArray[i]).pause(50);
        };

        client.pause(3000).verify.attributeEquals('#avatarImage', 'src', 'https://pbs.twimg.com/profile_images/436598467956187136/yncbkX83_400x400.jpeg')
  },
  "User can change password.": function (client) {
    var oldPassArray = 'alicedoe'.split('');
    var newPassArray = 'alice123'.split('');

    client
      .verify.elementPresent("label.passwordTab")
      .click("label.passwordTab").pause(500)

      .verify.elementPresent("input[name=oldPassword]")
      .verify.elementPresent("input[name=newPassword]")
      .verify.elementPresent("input[name=confirmPassword]")
      .verify.elementPresent("#changePasswordButton")


        .clearValue('input[name="oldPassword"]')
        .clearValue('input[name="newPassword"]')
        .clearValue('input[name="confirmPassword"]').pause(300);

        // .setValue('input[name="oldPassword"]', 'alice').pause(300)
        // .setValue('input[name="newPassword"]', 'alice123').pause(300)
        // .setValue('input[name="confirmPassword"]', 'alice123').pause(300)
        for(var i=0; i < oldPassArray.length; i++) {
          client.setValue('input[name="oldPassword"]', oldPassArray[i]).pause(100);
        };
        for(var i=0; i < newPassArray.length; i++) {
          client.setValue('input[name="newPassword"]', newPassArray[i]).pause(100);
        };
        for(var i=0; i < newPassArray.length; i++) {
          client.setValue('input[name="confirmPassword"]', newPassArray[i]).pause(100);
        };

        client.click("#changePasswordButton").pause(1000)

        .verify.attributeEquals('input[name="oldPassword"]', 'value', '')
        .verify.attributeEquals('input[name="newPassword"]', 'value', '')
        .verify.attributeEquals('input[name="confirmPassword"]', 'value', '')

      .verify.elementPresent("#authenticatedUsername")
      .click("#authenticatedUsername").pause(500)

      .verify.elementPresent("#authenticatedUserMenu .logoutMenuItem")
      .click("#authenticatedUserMenu .logoutMenuItem").pause(500)

      .verify.elementPresent("#loginPage")
  },
  "User can sign in with new password.": function (client) {
    client
        .verify.elementPresent("#loginPage")
        .verify.elementPresent('input[name="emailAddress"]')
        .verify.elementPresent('input[name="password"]')
        .verify.elementPresent('#loginButton')

        .clearValue('input[name="emailAddress"]')
        .clearValue('input[name="password"]')

        .setValue('input[name="emailAddress"]', 'alice@test.org')
        .setValue('input[name="password"]', 'alice123')

        .click("#loginButton").pause(1000)
          .verify.elementPresent("#indexPage");
  },
  "User can delete account.": function (client) {
    // log out
    var userIdArray = "alice@test.org";

    client
      .verify.elementPresent("#authenticatedUsername")
      .click("#authenticatedUsername").pause(500)

      .verify.elementPresent("#authenticatedUserMenu .profileMenuItem")
      .click("#authenticatedUserMenu .profileMenuItem").pause(500)

      // the menu doesn't auto-close, so we need to manually close it
      // so it doesn't obscure other components
      .verify.elementPresent("#authenticatedUsername")
      .click("#authenticatedUsername").pause(500)

      .verify.elementPresent("label.systemTab")
      .click("label.systemTab").pause(500)

      .verify.elementPresent("#deleteUserButton")
      .click("#deleteUserButton").pause(500)


      .verify.elementPresent("input[name='_id']")
      .verify.elementPresent("input[name='email']")
      .verify.elementPresent("input[name='confirm']")
      .clearValue('input[name="confirm"]');

      for(var i=0; i < userIdArray.length; i++) {
        client.setValue('input[name="confirm"]', userIdArray[i]).pause(50)
      }

      client.verify.elementPresent("#confirmDeleteUserButton")
      .click("#confirmDeleteUserButton").pause(1500)

      .verify.elementPresent("#loginPage")
      .end();
  }
};
