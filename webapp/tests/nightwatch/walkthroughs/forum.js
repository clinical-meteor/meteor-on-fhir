
// var topicDescription = 'Lorem ipsum';
// var postText = 'Sed pretium ipsum a ex gravida, a tristique nunc blandit. Pellentesque viverra id diam in volutpat. Aenean at arcu nulla. Nunc a mi non orci mattis dictum.';
// var secondPostText = 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur laoreet massa vitae velit dapibus, vel maximus lectus porta.';

// module.exports = {
//   tags: ['forum', 'topics', 'experimental'],
//   before: function(client){
//     client
//       .url('http://localhost:3000').pause(3000)
//       .executeAsync(function(){
//         Meteor.call('dropTopics');
//         Meteor.call('dropTestUsers');
//         Meteor.call('initializeUser', 'janedoe@test.org', 'janedoe', 'Jane Doe');
//       });
//   },
//   'user can log in/out' : function (client) {
//     client.resizeWindow(1920, 1200);

//     client.page.signinPage()
//       .fillOutSigninPage('janedoe@test.org', 'janedoe')
//       .saveScreenshot('tests/nightwatch/screenshots/accounts/E-signinPage.png', client)
//       .pause(1000, client)
//       .signin()
//       .pause(2000, client);


//     client
//       .assert.elementPresent('#indexPage').pause(2000)
//       .saveScreenshot('tests/nightwatch/screenshots/accounts/A-SignUp.png');
//   },
//   'user can navigate to forum': function(client){
//     client
//       .waitForElementPresent("#forumTile", 2000)
//       .click("#forumTile").pause(1000);
//   },
//   'user can view list of topics' : function (client) {
//     client
//       .waitForElementPresent('#forumPage', 2000)
//       .waitForElementPresent('#forumTopicsTable', 1000)
//       .verify.elementNotPresent("#forumTopicsTable .topicRow:nth-child(1)", 1000);
//   },

//   'user can create new topic' : function (client) {
//     var descriptionArray = topicDescription.split('');
//     var textArray = postText.split('');

//     client
//       .waitForElementPresent('#forumPage', 2000)
//       .verify.elementPresent("#newTopicButton")
//       .click("#newTopicButton").pause(1000)

//       .waitForElementPresent('#newTopicPage', 2000)
//       .verify.elementPresent("#topicDescriptionInput")
//       .verify.elementPresent("#postContentInput")

//       .clearValue("#topicDescriptionInput")
//       .clearValue("#postContentInput");

//     for(var j=0; j < descriptionArray.length; j++) {
//       client.setValue("#topicDescriptionInput", descriptionArray[j]).pause(100);
//     }
//     for(var k=0; k < textArray.length; k++) {
//       client.setValue("#postContentInput", textArray[k]).pause(100);
//     }

//     client
//       .verify.elementPresent("#newTopicButton")
//       .click("#newTopicButton");
//   },
//   'topic should have post' : function (client) {
//     client
//       // .waitForElementPresent('#forumTopicsTable', 1000)
//       // .verify.elementPresent("#forumTopicsTable .topicRow:nth-child(1)", 1000)
//       // .click("#forumTopicsTable .topicRow:nth-child(1)").pause(1000)

//       .waitForElementPresent('#conversationsPage', 2000)
//       .verify.elementPresent("#conversationsPage .conversation")
//       .verify.elementPresent("#conversationsPage .description")
//       .verify.containsText('#conversationsPage .description', topicDescription)

//       .verify.elementPresent("#conversationsPage .conversation .conversationPostCard:nth-child(1)")
//       .verify.elementPresent("#conversationsPage .conversation .conversationPostCard:nth-child(1) .postText")
//       .verify.containsText("#conversationsPage .conversation .conversationPostCard:nth-child(1) .postText", postText);
//   },
//   'user can post on existing topic' : function (client) {
//     client
//       .verify.elementPresent("#addPostToConversationCard")
//       .verify.elementPresent("#addPostToConversationInput")

//       .clearValue('#addPostToConversationInput')
//       .setValue('#addPostToConversationInput', secondPostText)

//       .verify.elementPresent("#addPostButton")
//       .click("#addPostButton").pause(1000)

//       .waitForElementPresent('#conversationsPage', 1000)
//       .verify.elementPresent("#conversationsPage .conversation .conversationPostCard:nth-child(2)")
//       .verify.containsText("#conversationsPage .conversation .conversationPostCard:nth-child(2) .postText", secondPostText);
//   },

//   // 'admin/user can delete topic' : function (client) {
//   //   client
//   // },
//   // 'posts can be displayed in list/timeline view' : function (client) {
//   //   client
//   // },
//   //
//   // 'tapping on post should highlight it' : function (client) {
//   //   client
//   // },
//   //
//   // 'user can edit post after its posted' : function (client) {
//   //   client
//   // },
//   //
//   // 'user can post status' : function (client) {
//   //   client
//   // },
//   //
//   // 'user can search posts' : function (client) {
//   //   client
//   // },
//   //
//   // 'guest can view posts' : function (client) {
//   //   client
//   // },
//   //
//   // 'guest can not edit posts' : function (client) {
//   //   client
//   // },
//   //
//   // 'user can filter statuses by label' : function (client) {
//   //   client
//   // },
//   //
//   // 'labels are displayed in sidebar category list' : function (client) {
//   //   client
//   // },

//   'end' : function (client) {
//     client
//       .end();
//   }
// };
