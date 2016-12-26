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
//   tags: ["library", "protocols"],
//   before: function(client){
//     client
//       .url("http://localhost:3000/entrySignUp").pause(300)
//       // .initializeChecklists()
//       .signUp("alice@somewhere.com", "alice123").pause(500)
//   },
//   "signed in user - can display protocol library": function(client) {
//     client
//       .verify.containsText("#usernameLink", "alice@somewhere.com")
//       .verify.elementPresent("#protocolLibraryLink")
//       .click("#protocolLibraryLink").pause(1000)
//       .verify.elementPresent("#protocolLibraryItems")
//       .saveScreenshot("tests/nightwatch/screenshots/protocols/A-ProtocolLibrary.png")
//       // TODO:  implement this
//       //.verify.containsText("pageTitle", "Protocol Library")
//   },
//   "signed in user - can see public lists in library": function(client) {
//     client
//       .pause(5000)
//       .verify.elementNotPresent("#noProtocolsMessage")
//       .verify.elementPresent("#protocolLibraryItems")
//       .verify.elementPresent("#protocolLibraryItems .libraryItem:nth-child(1)")
//       .verify.elementPresent("#protocolLibraryItems .libraryItem:nth-child(1) .protocolName")
//       .verify.elementPresent("#protocolLibraryItems .libraryItem:nth-child(1) .protocolCreator")
//       .verify.elementPresent("#protocolLibraryItems .libraryItem:nth-child(1) .previewButton")
//       .verify.elementPresent("#protocolLibraryItems .libraryItem:nth-child(1) .cloneButton")
//       .verify.elementPresent("#lists .listItem:nth-child(1)")
//       .verify.elementNotPresent("#lists .listItem:nth-child(2)")
//       .saveScreenshot("tests/nightwatch/screenshots/checklists/A-ProtocolLibrary-Public.png")
//   },
//   "signed in user - can not see unpublished private lists in library": function(client) {
//     client
//       .click("#newListButton").pause(300)
//       .verify.containsText("#lists .listItem:nth-child(1)", "List A")
//       // TODO:  this doesn't scale well as we add new tests
//       // need to be more specific about the unpublished private list
//       .verify.elementNotPresent("#protocolLibraryItems .libraryItem:nth-child(9)")
//   },
//   "signed in user - can publish list to library (by making it public)": function(client) {
//     client
//       .pause(200)
//       .click("#lists .listItem:nth-child(1)").pause(300)
//       .click("#checklistConfig").pause(300)
//       .verify.visible("#configListModal")
//
//       .verify.elementPresent("#publicListButton")
//       .verify.elementPresent("#privateListButton")
//
//       .click("#publicListButton").pause(200)
//
//       .clearValue("#listNameInput")
//       .setValue("#listNameInput", "Public List")
//       .click("#saveListButton").pause(300)
//       .saveScreenshot("tests/nightwatch/screenshots/checklists/A-ProtocolLibrary-ConfigModal.png")
//
//       .click("#protocolLibraryLink").pause(1000)
//       .verify.elementPresent("#protocolLibraryItems")
//       // TODO:  this doesn't scale well as we add new tests
//       // need to be more specific about the unpublished private list
//       .verify.elementPresent("#protocolLibraryItems .libraryItem:nth-child(8)")
//       .verify.containsText("#protocolLibraryItems .libraryItem:nth-child(8) .protocolName", "Public List")
//       .verify.containsText("#lists .listItem:nth-child(1)", "Public List")
//       .verify.containsText("#lists .listItem:nth-child(2)", "List B")
//       .saveScreenshot("tests/nightwatch/screenshots/checklists/A-ProtocolLibrary-Published.png")
//
//       .click("#logoutButton").pause(300)
//   },
//
//
//   "signed in user - can clone protocol from library": function(client) {
//     client
//       .url("http://localhost:3000/entrySignUp").pause(500)
//       .signUp("betty@somewhere.com", "betty123")
//       .verify.elementPresent("#lists .listItem:nth-child(1)")
//       .verify.elementNotPresent("#lists .listItem:nth-child(2)")
//       .click("#protocolLibraryLink").pause(300)
//       // TODO:  this doesn't scale well as we add new tests
//       // need to be more specific about the unpublished private list
//       .verify.elementPresent("#protocolLibraryItems .libraryItem:nth-child(8) .protocolName", "Public List")
//       .verify.elementPresent("#protocolLibraryItems .libraryItem:nth-child(8) .cloneButton")
//       .saveScreenshot("tests/nightwatch/screenshots/checklists/A-ProtocolLibrary-CanClone.png")
//
//       .click("#protocolLibraryItems .libraryItem:nth-child(8) .cloneButton").pause(400)
//       .verify.elementPresent("#lists .listItem:nth-child(1)")
//       .verify.elementPresent("#lists .listItem:nth-child(2)")
//       .verify.containsText("#lists .listItem:nth-child(1)", "List A")
//       // TODO:  this doesn't scale well as we add new tests
//       // need to be more specific about the unpublished private list
//       .verify.containsText("#lists .listItem:nth-child(2)", "Public List")
//       .saveScreenshot("tests/nightwatch/screenshots/checklists/A-ProtocolLibrary-Cloned.png")
//
//       .click("#logoutButton").pause(300)
//   },
//   "anonymous user - can view public checklistPage with URL" : function (client) {
//     client
//       .url("http://localhost:3000/protocols").pause(500)
//         .verify.elementPresent("#protocolLibraryItems .libraryItem:nth-child(1)")
//         .verify.elementPresent("#protocolLibraryItems .libraryItem:nth-child(1) .previewButton")
//         .verify.elementPresent("#protocolLibraryItems .libraryItem:nth-child(1) .protocolName")
//         .verify.containsText("#protocolLibraryItems .libraryItem:nth-child(1) .protocolName", "Collect Blood Specimen")
//         .saveScreenshot("tests/nightwatch/screenshots/checklists/A-ProtocolLibrary-PublicProtocols.png")
//         .click("#protocolLibraryItems .libraryItem:nth-child(1) .previewButton").pause(300)
//
//         .verify.visible("#checklistPage")
//         .verify.visible("#checklistTitle")
//         .verify.visible("#checklistTitle")
//         .verify.containsText("#checklistTitle", "Collect Blood Specimen")
//         .verify.visible("#checklistPage .taskItem:nth-child(1)")
//         .verify.visible("#checklistPage .taskItem:nth-child(1) .taskInput")
//         .verify.attributeEquals("#checklistPage .taskItem:nth-child(1) .taskInput", "placeholder", "Step 1a:  Assemble equipment for collecting blood.")
//
//         .saveScreenshot("tests/nightwatch/screenshots/checklists/A-ProtocolLibrary-PublicList.png")
//   },
//   "anonymous user - can't edit public checklistPage with URL" : function (client) {
//     client
//       .url("http://localhost:3000/protocols").pause(500)
//
//         .saveScreenshot("tests/nightwatch/screenshots/checklists/A-ProtocolLibrary-PublicList-NonEditable.png")
//   },
//   after: function (client){
//     client
//       .dropEntryUsers()
//       .end();
//   }
// };
