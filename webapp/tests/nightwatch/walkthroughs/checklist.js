// //
// // // foo
// //
// // var newListName = "Foo List";
// // var joesPrivateList = {
// //   listName: "Joe's Private List"
// // }
// // var joesPublicList = {
// //   listName: "Joe's Public List"
// // }
//
//
// // add tests to this file using the Nightwatch.js API
// // http://nightwatchjs.org/api
//
// module.exports = {
//   tags: ["checklist"],
//   before: function(client){
//     client
//       .url("http://localhost:3000")
//       // .initializeLists()
//       // .initializeUsers()
//       //.pause(500)
//   },
//   "anonymous user - can view scratch checklist" : function (client) {
//     client
//       .resizeWindow(768, 1024).pause(300)
//         .verify.visible("#sidebarToggle")
//         .verify.visible("#checklistPage")
//         .verify.visible("#checklistTitle")
//         .verify.visible("#checklistPage .taskItem:nth-child(1)")
//         .saveScreenshot("tests/nightwatch/screenshots/checklists/A-Scratchlist.png")
//   },
//   "anonymous user - cannot access list of lists" : function (client) {
//     client
//       .resizeWindow(1024, 768).pause(300)
//       .verify.visible("#sidebar")
//       .verify.visible("#usernameLink")
//       .verify.visible("#protocolLibraryLink")
//       .verify.elementNotPresent("#newListButton")
//       .verify.elementNotPresent("#lists .listItem:nth-child(1)")
//   },
//   "signed in user - can access list of lists" : function (client) {
//     client
//       // .click("#usernameLink").pause(300)
//       //   .click("#needAnAccountButton").pause(500)
//       .url("http://localhost:3000/entrySignUp").pause(500)
//         .resizeWindow(1024, 768)
//         .setValue("#signUpPageFullNameInput", "Alice Doe")
//         .setValue("#signUpPageEmailInput", "alice@symptomatic.io")
//         .setValue("#signUpPagePasswordInput", "alice123")
//         .setValue("#signUpPagePasswordConfirmInput", "alice123")
//         .click("#signUpPageJoinNowButton").pause(500)
//
//       .verify.visible("#sidebar")
//       .verify.visible("#usernameLink")
//       .verify.visible("#protocolLibraryLink")
//       .verify.visible("#newListButton")
//       .saveScreenshot("tests/nightwatch/screenshots/checklists/B-ListOfLists.png")
//       // .verify.visible("#lists .listItem:nth-child(1)")
//       // .verify.visible("#lists .listItem:nth-child(2)")
//       //.verify.visible("#lists .list:nth-child(3)")
//   },
//   "signed in user - can add new task" : function (client) {
//     client
//       .resizeWindow(1024, 768)
//         .verify.elementPresent("#checklistPage")
//         .saveScreenshot("tests/nightwatch/screenshots/checklists/C-Checklist.png")
//         .click("#showNewTaskToggle").pause(300)
//         .verify.visible("#newTaskInput")
//         .saveScreenshot("tests/nightwatch/screenshots/checklists/D-Checklist-NewTaskInput.png")
//         .setValue("#newTaskInput", "Publish app in App Store")
//         .keys(client.Keys.ENTER).pause(500)
//         .verify.visible("#checklistPage .taskItem:nth-child(1)")
//         .verify.attributeEquals("#checklistPage .taskItem:nth-child(1) .taskInput", "placeholder", "Publish app in App Store")
//         .saveScreenshot("tests/nightwatch/screenshots/checklists/C-Checklist.png")
//   },
//   "signed in user - can complete task" : function (client) {
//     client
//       .verify.visible("#checklistPage .taskItem:nth-child(1)")
//       .verify.attributeEquals("#checklistPage .taskItem:nth-child(1) .taskInput", "placeholder", "Publish app in App Store")
//       .verify.visible("#checklistPage .taskItem:nth-child(1) .checkbox")
//       // .verify.hidden("#checklistPage .taskItem:nth-child(1) .delete")
//       .verify.cssProperty("#checklistPage .taskItem:nth-child(1)", "color", "rgba(51, 51, 51, 1)")
//       .click("#checklistPage .taskItem:nth-child(1) .checkbox").pause(500)
//       .verify.cssProperty("#checklistPage .taskItem:nth-child(1)", "color", "rgba(211, 211, 211, 1)")
//       .verify.visible("#checklistPage .taskItem:nth-child(1) .checkbox")
//   },
//
//   "signed in user - can delete completed task" : function (client) {
//     client
//       .resizeWindow(1024, 768)
//         .verify.visible("#checklistPage .taskItem:nth-child(1)")
//         .verify.attributeEquals("#checklistPage .taskItem:nth-child(1) .taskInput", "placeholder", "Publish app in App Store")
//         .click("#checklistPage .taskItem:nth-child(1) .taskInput").pause(300)
//         .verify.visible("#checklistPage .taskItem:nth-child(1) .delete-item")
//         .click("#checklistPage .taskItem:nth-child(1) .delete-item").pause(500)
//         .verify.elementNotPresent("#checklistPage .taskItem:nth-child(1)")
//   },
//
//   "signed in user - can add list(s)": function(client) {
//     client
//       .verify.visible("#newListButton")
//       .verify.elementPresent("#lists .listItem:nth-child(1)")
//       .verify.elementNotPresent("#lists .listItem:nth-child(2)")
//       .verify.elementNotPresent("#lists .listItem:nth-child(3)")
//       .click("#newListButton")
//       .pause(500)
//       .verify.containsText("#lists .listItem:nth-child(2)", "List B")
//       .verify.elementNotPresent("#lists .listItem:nth-child(3)")
//       .click("#newListButton")
//       .pause(500)
//       .verify.containsText("#lists .listItem:nth-child(2)", "List B")
//       .verify.containsText("#lists .listItem:nth-child(3)", "List C")
//   },
//   "signed in user - can edit own list(s)": function(client) {
//     client
//       .click("#lists .listItem:nth-child(2)")
//       .verify.containsText("#checklistTitle", "List B")
//       .verify.visible("#checklistTitle")
//       .verify.visible("#checklistConfig")
//       .verify.hidden("#configListModal")
//       .click("#checklistConfig").pause(300)
//       .verify.visible("#configListModal")
//       .verify.visible("#configListModal #listNameInput")
//       .verify.attributeEquals("#configListModal #listNameInput", "value", "List B")
//       .clearValue("#configListModal #listNameInput")
//       .setValue("#configListModal #listNameInput", "Biomarker List")
//       .verify.attributeEquals("#configListModal #listNameInput", "value", "Biomarker List")
//       .verify.elementPresent("#configListModal #saveListButton")
//       .click("#configListModal #saveListButton").pause(300)
//       .verify.hidden("#configListModal")
//       .verify.containsText("#checklistTitle", "Biomarker List")
//   },
//   "signed in user - can delete own list": function(client) {
//     client
//       .click("#lists .listItem:nth-child(3)").pause(200)
//       .verify.containsText("#checklistTitle", "List C")
//       .verify.visible("#checklistConfig")
//       .verify.hidden("#configListModal")
//       .click("#checklistConfig").pause(300)
//       .verify.visible("#configListModal")
//       .verify.visible("#configListModal #deleteListButton")
//       .click("#configListModal #deleteListButton").pause(300)
//       .verify.visible("#configListModal #configListModalInput")
//       .verify.visible("#configListModal #confirmRemoveListButton")
//       .setValue("#configListModal #configListModalInput", "List C").pause(200)
//       .verify.attributeEquals("#configListModal #configListModalInput", "value", "List C")
//       .click("#confirmRemoveListButton").pause(500)
//       .verify.containsText("#lists .listItem:nth-child(1)", "List A")
//       .verify.containsText("#lists .listItem:nth-child(2)", "Biomarker List")
//       .verify.elementNotPresent("#lists .listItem:nth-child(3)")
//
//       .click("#lists .listItem:nth-child(2)")
//       .click("#checklistConfig").pause(300)
//       .click("#configListModal #deleteListButton").pause(300)
//       .setValue("#configListModal #configListModalInput", "Biomarker List").pause(200)
//       .click("#confirmRemoveListButton").pause(500)
//       .verify.containsText("#lists .listItem:nth-child(1)", "List A")
//       .verify.elementNotPresent("#lists .listItem:nth-child(2)")
//       .verify.elementNotPresent("#lists .listItem:nth-child(3)")
//   },
//   after: function (client){
//     client
//       .dropEntryUsers()
//       .end();
//   }
// };
