// // when new user fills out form and registers, new user should get created
// // when user signs in with username and password, should redirect to home page
// // newly created user record should have role
// // newly created user record should have profile
// // newly created user record should have full, preferred, and family name
// // user object should return first name
// // user object should return last name
// // user should be able to request reset password email
// // user should be able to request be able to create new account
// // guest should be notified if username already exists
// // guest should be notified if passwords do not match
// // guest should be notified if email is not correctly formatted
// // new user should be able to register on desktop
// // new user should be able to register on tablet
// // existing user should be able to sign in on desktop
// // existing user should be able to sign in on tablet
// // existing user should be able to sign in on phone
// // existing user should be able to change their password
// // company logo should display on sign//in page
//
//
//
// module.exports = {
//   tags: ['users', 'entry'],
//   before: function (client) {
//     client
//       .url("http://localhost:3000/entrySignUp")
//       .initializeUsers()
//       .resizeWindow(1600, 1200);
//   },
//   "new user should be able to register on desktop": function (client) {
//     client
//       .verify.elementPresent("#entrySignUp")
//       .verify.elementPresent("#signUpPageTitle")
//       .verify.elementPresent("#signUpPageMessage")
//       .verify.elementPresent("#signUpPageEmailInput")
//       .verify.elementPresent("#signUpPagePasswordInput")
//       .verify.elementPresent("#signUpPageJoinNowButton")
//       .verify.elementPresent("#signUpPageSignInButton");
//   },
//   "company logo should display on sign-in page": function (client) {
//     client
//       .verify.elementPresent("#entrySignUp")
//       // .verify.elementPresent("#entryAppLogo");
//   },
//   "user should be able to request be able to create new account": function (client) {
//     client.verify.elementPresent("#signUpPageEmailInput")
//       .verify.elementPresent("#signUpPagePasswordInput")
//       .verify.elementPresent("#signUpPagePasswordInput")
//       .verify.elementPresent("#signUpPageJoinNowButton")
//       .saveScreenshot("tests/nightwatch/screenshots/entry/SignUp.png")
//   },
//   // confirm password is an all-or-nothing check, so we don't use the in-between-color
//   "guest should be notified if password is insecure": function (client) {
//     client
//       .clearValue("input")
//       .verify.elementPresent("#signUpPagePasswordInput")
//       .verify.cssProperty('#signUpPagePasswordInput', 'border', '1px solid gray')
//       .setValue("#signUpPagePasswordInput", "jan")
//       .verify.cssProperty('#signUpPagePasswordInput', 'border', '1px solid rgb(242, 222, 222)')
//       .saveScreenshot("tests/nightwatch/screenshots/entry/SignUp-WeakPassword.png")
//       .setValue("#signUpPagePasswordInput", "icedoe123")
//       .verify.cssProperty('#signUpPagePasswordInput', 'border', '1px solid green')
//       .saveScreenshot("tests/nightwatch/screenshots/entry/SignUp-AcceptablePassword.png")
//
//     .verify.cssProperty('#signUpPagePasswordConfirmInput', 'border', '1px solid gray')
//       .setValue("#signUpPagePasswordConfirmInput", "ja")
//       .saveScreenshot("tests/nightwatch/screenshots/entry/SignUp-PartialMatch.png")
//       .click("#signUpPagePasswordConfirmInput").pause(100) // hack to unfocus and input the data
//       // .setValue("#signUpPagePasswordConfirmInput", "n") // we split our setValue into two as a workaround for keyup detection
//       .verify.cssProperty('#signUpPagePasswordConfirmInput', 'border', '1px solid rgb(169, 68, 66)')
//       .clearValue("#signUpPagePasswordConfirmInput")
//       .setValue("#signUpPagePasswordConfirmInput", "janicedoe123")
//       // .click("#signUpPagePasswordConfirmInput").pause(100) // hack to unfocus and input the data
//       // .setValue("#signUpPagePasswordConfirmInput", " ")// we split our setValue into two as a workaround for keyup detection
//       .verify.cssProperty('#signUpPagePasswordConfirmInput', 'border', '1px solid green')
//       .saveScreenshot("tests/nightwatch/screenshots/entry/SignUp-Match.png")
//   },
//   "guest should be notified if passwords do not match": function (client) {
//     client
//       .clearValue("#signUpPagePasswordConfirmInput")
//       .clearValue("#signUpPagePasswordInput")
//       .resetEntry()
//       .pause(500)
//       .verify.cssProperty('#signUpPagePasswordInput', 'border', '1px solid gray')
//       .verify.cssProperty('#signUpPagePasswordConfirmInput', 'border', '1px solid gray')
//       .setValue("#signUpPagePasswordInput", "janicedoe123")
//       .verify.cssProperty('#signUpPagePasswordInput', 'border', '1px solid green')
//       .verify.cssProperty('#signUpPagePasswordConfirmInput', 'border', '1px solid gray')
//       .setValue("#signUpPagePasswordConfirmInput", "janicedoe123")
//       .verify.cssProperty('#signUpPagePasswordInput', 'border', '1px solid green')
//       .verify.cssProperty('#signUpPagePasswordConfirmInput', 'border', '1px solid green');
//   },
//   "guest should be notified if email is not correctly formatted": function (client) {
//     client
//       .clearValue("#signUpPageEmailInput")
//       .resetEntry()
//       .verify.elementPresent("#signUpPageEmailInput")
//       .verify.cssProperty('#signUpPageEmailInput', 'border', '1px solid gray')
//       .saveScreenshot("tests/nightwatch/screenshots/entry/SignUp-PasswordNeeded.png")
//       .setValue("#signUpPageEmailInput", "janicedoe")
//       .verify.cssProperty('#signUpPageEmailInput', 'border', '1px solid rgb(242, 222, 222)')
//       .saveScreenshot("tests/nightwatch/screenshots/entry/SignUp-IncorrectFormat.png")
//       .setValue("#signUpPageEmailInput", "@symptomatic.io")
//       .verify.cssProperty('#signUpPageEmailInput', 'border', '1px solid green')
//       .saveScreenshot("tests/nightwatch/screenshots/entry/SignUp-CorrectlyFormatted.png")
//   },
//   "when new user fills out form and registers, new user should get created": function (client) {
//     client
//       .verify.elementPresent("#entrySignUp")
//
//     .clearValue("#signUpPagePasswordConfirmInput")
//       .clearValue("#signUpPagePasswordInput")
//       .clearValue("#signUpPageFullNameInput")
//       .clearValue("#signUpPageEmailInput")
//       .resetEntry()
//
//     .setValue("#signUpPageFullNameInput", "Janice Doe")
//       .setValue("#signUpPageEmailInput", "janicedoe@symptomatic.io")
//       .setValue("#signUpPagePasswordInput", "janicedoe123")
//       .setValue("#signUpPagePasswordConfirmInput", "janicedoe123")
//       .saveScreenshot("tests/nightwatch/screenshots/entry/SignUp-NewUserInputs.png")
//
//     .click("#signUpPageJoinNowButton").pause(1000)
//     .saveScreenshot("tests/nightwatch/screenshots/entry/SignUp-NewUserCreated.png")
//
//     .verify.containsText("#usernameLink", "janicedoe@symptomatic.io");
//   },
//   "user should be able to signout": function (client) {
//     client
//       .verify.elementPresent("#logoutButton")
//       .saveScreenshot("tests/nightwatch/screenshots/entry/CanLogout.png")
//       .click("#logoutButton").pause(300)
//       .verify.containsText("#usernameLink", "Sign In")
//       .saveScreenshot("tests/nightwatch/screenshots/entry/LoggedOut.png")
//   },
//   "user should be able to request reset password email": function (client) {
//     client
//       .url("http://localhost:3000/entrySignIn")
//       .verify.elementPresent("#forgotPasswordButton")
//       .saveScreenshot("tests/nightwatch/screenshots/entry/CanRequestForgottenPassword.png")
//       .click("#forgotPasswordButton")
//       .verify.elementPresent("#forgotPassword")
//       .verify.elementPresent("#signInPageEmailInput")
//       .verify.elementPresent("#sendReminderButton")
//       .saveScreenshot("tests/nightwatch/screenshots/entry/ForgotPassword.png")
//       .meteorLogout()
//   },
//   "existing user should be able to sign in on desktop": function (client) {
//     client
//       .url("http://localhost:3000/entrySignIn")
//       .resizeWindow(1600, 1200)
//       .verify.containsText("#usernameLink", "Sign In")
//       .saveScreenshot("tests/nightwatch/screenshots/entry/SignIn-Desktop.png")
//       .signIn("janicedoe@symptomatic.io", "janicedoe123").pause(500)
//       .verify.containsText("#usernameLink", "janicedoe@symptomatic.io")
//       .saveScreenshot("tests/nightwatch/screenshots/entry/SignIn-Desktop-Result.png")
//       .click("#logoutButton").pause(200)
//       .verify.containsText("#usernameLink", "Sign In")
//       .meteorLogout();
//   },
//   "existing user should be able to sign in on tablet": function (client) {
//     client
//       .url("http://localhost:3000/entrySignIn")
//       .resizeWindow(1024, 768)
//       .verify.containsText("#usernameLink", "Sign In")
//       .saveScreenshot("tests/nightwatch/screenshots/entry/SignIn-Tablet.png")
//       .signIn("janicedoe@symptomatic.io", "janicedoe123").pause(500)
//       .verify.containsText("#usernameLink", "janicedoe@symptomatic.io")
//       .click("#logoutButton").pause(200)
//       .verify.containsText("#usernameLink", "Sign In")
//       .meteorLogout();
//   },
//   "existing user should be able to sign in on phone": function (client) {
//     client
//       .url("http://localhost:3000/entrySignIn")
//       .resizeWindow(640,960)
//       .saveScreenshot("tests/nightwatch/screenshots/entry/phone-a-loggedout.png")
//       // .verify.containsText("#usernameLink", "Sign In")
//       .saveScreenshot("tests/nightwatch/screenshots/entry/SignIn-Phone.png")
//       .signIn("janicedoe@symptomatic.io", "janicedoe123").pause(500)
//       .saveScreenshot("tests/nightwatch/screenshots/entry/phone-b-loggedin.png")
//
//       .click("#navbarHeader").pause(300)
//       .verify.containsText("#usernameLink", "janicedoe@symptomatic.io")
//       .saveScreenshot("tests/nightwatch/screenshots/entry/phone-c-loggedin-sidebar.png")
//
//       .click("#logoutButton").pause(600)
//       // // sidebar should have closed; reopen
//       // .click("#navbarHeader").pause(400)
//       .verify.containsText("#usernameLink", "Sign In")
//       .saveScreenshot("tests/nightwatch/screenshots/entry/phone-d-loggedout.png");
//   },
//   "existing user should be able to change their password" : function (client) {
//     client
//       .url("http://localhost:3000/entrySignIn")
//       .resizeWindow(1200, 1024).pause(300)
//       .signIn("janicedoe@symptomatic.io", "janicedoe123").pause(500)
//       .verify.containsText("#usernameLink", "janicedoe@symptomatic.io")
//       .url("http://localhost:3000/changePassword")
//       .verify.elementPresent("#changePasswordPageOldPasswordInput")
//       .verify.elementPresent("#changePasswordPagePasswordInput")
//       .verify.elementPresent("#changePasswordPagePasswordConfirmInput")
//       .verify.elementPresent("#changePasswordButton")
//       .saveScreenshot("tests/nightwatch/screenshots/entry/ChangePassword.png")
//       .meteorLogout();
//   },
//   "existing user should be notified if desired new password is insecure" : function (client) {
//     client
//       .url("http://localhost:3000/entrySignIn")
//       .resizeWindow(1200, 1024).pause(300)
//       .signIn("janicedoe@symptomatic.io", "janicedoe123").pause(500)
//       .verify.containsText("#usernameLink", "janicedoe@symptomatic.io")
//       .url("http://localhost:3000/changePassword")
//       .verify.elementPresent("#changePasswordPageOldPasswordInput")
//       .verify.elementPresent("#changePasswordPagePasswordInput")
//       .verify.elementPresent("#changePasswordPagePasswordConfirmInput")
//       .verify.elementPresent("#changePasswordButton")
//       .verify.cssProperty('#changePasswordPagePasswordInput', 'border', '1px solid gray')
//       .setValue("#changePasswordPagePasswordInput", "jan")
//       // .click("#changePasswordPagePasswordInput").pause(100) // hack to unfocus and input the data
//       .verify.cssProperty('#changePasswordPagePasswordInput', 'border', '1px solid rgb(242, 222, 222)')
//       .setValue("#changePasswordPagePasswordInput", "icedoe123")
//       .verify.cssProperty('#changePasswordPagePasswordInput', 'border', '1px solid green')
//       .verify.cssProperty('#changePasswordPagePasswordConfirmInput', 'border', '1px solid gray')
//       .setValue("#changePasswordPagePasswordConfirmInput", "ja")
//       // .click("#changePasswordPagePasswordConfirmInput").pause(100) // hack to unfocus and input the data
//       .verify.cssProperty('#changePasswordPagePasswordConfirmInput', 'border', '1px solid rgb(169, 68, 66)')
//       .clearValue("#changePasswordPagePasswordConfirmInput")
//       .setValue("#changePasswordPagePasswordConfirmInput", "janicedoe123")
//       .click("#changePasswordPagePasswordConfirmInput").pause(100) // hack to unfocus and input the data
//       .verify.cssProperty('#changePasswordPagePasswordConfirmInput', 'border', '1px solid green')
//       .meteorLogout()
//   },
//   "if anonymous user tries to log in with non-existing account, a message is shown" : function (client) {
//     client
//       .url("http://localhost:3000/entrySignIn")
//       .resizeWindow(1200, 1024).pause(300)
//       .signIn("alice@symptomatic.io", "alice123").pause(500)
//       .verify.containsText("#signInPageMessage", "User not found [403]")
//       .verify.cssProperty("#signInPageMessage", "color", "rgba(169, 68, 66, 1)")
//       .verify.cssProperty("#signInPageMessage", "background-color", "rgba(242, 222, 222, 1)")
//       .verify.cssProperty("#signInPageMessage", "border-color", "rgb(235, 204, 209)")
//       .saveScreenshot("tests/nightwatch/screenshots/entry/SignIn-AccountDoesntExist.png")
//   },
//   "anonymous guest should be notified if email already exists": function (client) {
//     client
//       .url("http://localhost:3000/entrySignUp")
//       //.resizeWindow(1024, 768)
//       .signUp("janicedoe@symptomatic.io", "janicedoe123").pause(500)
//       .click("#signUpPageJoinNowButton").pause(1000)
//       .verify.elementPresent("#signUpPageMessage")
//       .verify.containsText("#signUpPageMessage", "Email already exists. [403]")
//       .saveScreenshot("tests/nightwatch/screenshots/entry/SignIn-EmailAlreadyExists.png")
//   },
//   after: function (client) {
//     client
//       .dropEntryUsers()
//       .end();
//   }
// };
