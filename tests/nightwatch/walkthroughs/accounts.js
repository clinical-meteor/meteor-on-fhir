// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api


module.exports = {
  "User can sign up.": function (client) {
    client
      .resizeWindow(1200, 1024)
      .url("http://localhost:3000").pause(1200)

        .click("#signupLink").pause(500)
        .verify.elementPresent("#signupPage")
        .verify.elementPresent('input[name="firstName"]')
        .verify.elementPresent('input[name="lastName"]')
        .verify.elementPresent('input[name="emailAddress"]')
        .verify.elementPresent('input[name="password"]')
        .verify.elementPresent('#signupButton')

        .clearValue('input[name="firstName"]')
        .clearValue('input[name="lastName"]')
        .clearValue('input[name="emailAddress"]')
        .clearValue('input[name="password"]')

        .setValue('input[name="firstName"]', 'John')
        .setValue('input[name="lastName"]', 'Doe')
        .setValue('input[name="emailAddress"]', 'johndoe@test.org')
        .setValue('input[name="password"]', 'johndoe')

        .click("#signupButton").pause(500);
  },
  "User gets logged in after signup.": function (client) {
    client
        .verify.elementPresent("#indexPage")
  },
  "User can log out.": function (client) {
    client
      .verify.elementPresent("#authenticatedNavDropdown")
      .click("#authenticatedNavDropdown").pause(500)

      .verify.elementPresent("#logoutMenuItem")
      .click("#logoutMenuItem").pause(500)

      .verify.elementPresent("#loginPage")
  },
  "User can sign in.": function (client) {
    client
        .verify.elementPresent("#loginPage")
        .verify.elementPresent('input[name="emailAddress"]')
        .verify.elementPresent('input[name="password"]')
        .verify.elementPresent('#loginButton')

        .clearValue('input[name="emailAddress"]')
        .clearValue('input[name="password"]')

        .setValue('input[name="emailAddress"]', 'johndoe@test.org')
        .setValue('input[name="password"]', 'johndoe')

        .click("#loginButton").pause(1000)
          .verify.elementPresent("#indexPage");
  },
  "User can view profile.": function (client) {
    client
      .verify.elementPresent("#authenticatedNavDropdown")
      .click("#authenticatedNavDropdown").pause(500)

      .verify.elementPresent("#profileMenuItem")
      .click("#profileMenuItem").pause(500)

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

        client.verify.attributeEquals('#avatarImage', 'src', 'https://pbs.twimg.com/profile_images/436598467956187136/yncbkX83_400x400.jpeg')
  },
  "User can change password.": function (client) {
    var oldPassArray = 'johndoe'.split('');
    var newPassArray = 'johndoe123'.split('');

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

        // .setValue('input[name="oldPassword"]', 'johndoe').pause(300)
        // .setValue('input[name="newPassword"]', 'johndoe123').pause(300)
        // .setValue('input[name="confirmPassword"]', 'johndoe123').pause(300)
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

      .verify.elementPresent("#authenticatedNavDropdown")
      .click("#authenticatedNavDropdown").pause(500)

      .verify.elementPresent("#logoutMenuItem")
      .click("#logoutMenuItem").pause(500)

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

        .setValue('input[name="emailAddress"]', 'johndoe@test.org')
        .setValue('input[name="password"]', 'johndoe123')

        .click("#loginButton").pause(1000)
          .verify.elementPresent("#indexPage");
  },
  "User can delete account.": function (client) {
    // log out
    var userIdArray = "johndoe@test.org";

    client
      .verify.elementPresent("#authenticatedNavDropdown")
      .click("#authenticatedNavDropdown").pause(500)

      .verify.elementPresent("#profileMenuItem")
      .click("#profileMenuItem").pause(500)

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
