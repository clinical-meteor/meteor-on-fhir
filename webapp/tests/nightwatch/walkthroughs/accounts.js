// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api


// All right, you mutinous, computerized, disloyal half-breed - we'll see about you deserting my ship.

module.exports = {
  tags: ['accounts', 'passwords', 'users', 'entry', 'circle'],
  before: function(client){
    client
      .url("http://localhost:3000").pause(3000)
      .executeAsync(function(){
        Meteor.call('dropTestUsers');
      });
  },
  'User can sign up.': function (client) {
    client.resizeWindow(1200, 1024);

    client.page.signupPage()
      .navigate()
      .fillOutSignupPage('Alice', 'Doe', 'alice@test.org', 'alicedoe', '')
      .saveScreenshot('tests/nightwatch/screenshots/accounts/A-signupPage.png', client)
      .signup()
      .pause(2000, client);
  },
  'User gets logged in after signup.': function (client) {
    client
      .waitForElementPresent('#welcomePatientPage', 1000);
  },
  'User can access sidebar.': function (client) {
    client
      .verify.elementPresent('#sidebarToggleButton')
        .click('#sidebarToggleButton').pause(1000)

      .waitForElementPresent('#userIdentification span:nth-child(1)', 5000)
      .verify.containsText('#userIdentification span:nth-child(1)', 'Alice Doe')
      .saveScreenshot('tests/nightwatch/screenshots/accounts/B-profileSetupPage.png');
  },
  'User can log out.': function (client) {
    client
      .waitForElementPresent('#patientSidebar .logoutMenuItem', 5000)
      .saveScreenshot('tests/nightwatch/screenshots/accounts/C-logoutMenuItem.png')
      .click('#patientSidebar .logoutMenuItem').pause(1000)

      .verify.elementPresent('#signinPage')
      .saveScreenshot('tests/nightwatch/screenshots/accounts/D-signinPage.png');
  },
  'User can sign in.': function (client) {
    client.page.signinPage()
      .fillOutSigninPage('alice@test.org', 'alicedoe')
      .saveScreenshot('tests/nightwatch/screenshots/accounts/E-signinPage.png', client)
      .pause(1000, client)
      .signin()
      .pause(2000, client);

    client
      .verify.elementPresent('#indexPage')
      .verify.containsText('#authenticatedUsername', 'Alice Doe');
  },
  "User can view profile.": function (client) {
    client
      .verify.elementPresent('#sidebarToggleButton')
        .click('#sidebarToggleButton').pause(1000)

      .waitForElementPresent('#userIdentification', 5000)
      .click("#userIdentification")

      .waitForElementPresent('#myProfilePage', 5000);
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
        .clearValue('input[name="avatar"]');

    for(var i=0; i < myArray.length; i++) {
      client.setValue('input[name="avatar"]', myArray[i]).pause(50);
    }

    client.pause(3000).verify.attributeEquals('#avatarImage', 'src', 'https://pbs.twimg.com/profile_images/436598467956187136/yncbkX83_400x400.jpeg');

    // var myArray = 'https://pbs.twimg.com/profile_images/436598467956187136/yncbkX83_400x400.jpeg'.split('');
    //
    // client
    //   .verify.elementPresent('#avatarImage')
    //   .verify.attributeEquals('#avatarImage', 'src', 'http://localhost:3000/thumbnail.png')
    //
    //   .verify.elementPresent('input[name="avatar"]')
    //     .clearValue('input[name="avatar"]')
    //     .setValue('input[name="avatar"]', 'https://foo').pause(500)
    //     .verify.attributeEquals('#avatarImage', 'src', 'http://localhost:3000/noAvatar.png')
    //
    //   .verify.elementPresent('input[name="avatar"]')
    //     .clearValue('input[name="avatar"]');
    //
    // for(var i=0; i < myArray.length; i++) {
    //   client.setValue('input[name="avatar"]', myArray[i]).pause(50);
    // }
    //
    // client.pause(3000).verify.attributeEquals('#avatarImage', 'src', 'https://pbs.twimg.com/profile_images/436598467956187136/yncbkX83_400x400.jpeg');
  },
  "User can change password.": function (client) {
    var oldPassArray = 'alicedoe'.split('');
    var newPassArray = 'alice123'.split('');

    client
      .verify.elementPresent("#profilePageTabs .passwordTab")
      .click("#profilePageTabs .passwordTab").pause(1000)

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
    for(var j=0; j < oldPassArray.length; j++) {
      client.setValue('input[name="oldPassword"]', oldPassArray[j]).pause(100);
    }
    for(var k=0; k < newPassArray.length; k++) {
      client.setValue('input[name="newPassword"]', newPassArray[k]).pause(100);
    }
    for(var l=0; l < newPassArray.length; l++) {
      client.setValue('input[name="confirmPassword"]', newPassArray[l]).pause(100);
    }

    client.click("#changePasswordButton").pause(2000)

      .verify.attributeEquals('input[name="oldPassword"]', 'value', '')
      .verify.attributeEquals('input[name="newPassword"]', 'value', '')
      .verify.attributeEquals('input[name="confirmPassword"]', 'value', '')

      .waitForElementPresent('#sidebarToggleButton', 2000)
      .click('#sidebarToggleButton').pause(2000)
      .click('#sidebarToggleButton').pause(2000)

      .waitForElementPresent('#patientSidebar .logoutMenuItem', 5000)
      .click('#patientSidebar .logoutMenuItem').pause(20000)

      .waitForElementPresent("#signinPage", 5000);
  },
  "User can sign in with new password.": function (client) {
    client
        .verify.elementPresent("#signinPage")
        .verify.elementPresent('input[name="emailAddress"]')
        .verify.elementPresent('input[name="password"]')
        .verify.elementPresent('#signinButton')

        .clearValue('input[name="emailAddress"]')
        .clearValue('input[name="password"]')

        .setValue('input[name="emailAddress"]', 'alice@test.org')
        .setValue('input[name="password"]', 'alice123')

        .click("#signinButton").pause(1000)
          .verify.elementPresent("#indexPage");
  },
  "User can delete account.": function (client) {
    // log out
    var userIdArray = "alice@test.org";

    client.verify.elementPresent('#sidebarToggleButton')
      .click('#sidebarToggleButton').pause(2000)

      .verify.elementPresent('#userIdentification')
      .click('#userIdentification').pause(1000)

      .waitForElementPresent('#myProfilePage', 5000)

      .verify.elementPresent('#profilePageTabs .systemTab')
      .click('#profilePageTabs .systemTab').pause(500)

      .verify.elementPresent('#deleteUserButton')
      .click('#deleteUserButton').pause(500)


      .verify.elementPresent("input[name='_id']")
      .verify.elementPresent("input[name='email']")
      .verify.elementPresent("input[name='confirm']")
      .clearValue('input[name="confirm"]');

    for(var m=0; m < userIdArray.length; m++) {
      client.setValue('input[name="confirm"]', userIdArray[m]).pause(50);
    }

    client.verify.elementPresent("#confirmDeleteUserButton")
      .click("#confirmDeleteUserButton").pause(1500)

      .verify.elementPresent("#signinPage")
      .end();
  }
};
