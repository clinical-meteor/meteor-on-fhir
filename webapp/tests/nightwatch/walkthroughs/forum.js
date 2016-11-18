
module.exports = {
  tags: ['forum', 'topics'],
  before: function(client){
    client
      .url('http://localhost:3000').pause(3000)
      .executeAsync(function(data){
        //Meteor.call('initializeTestUsers');
        Meteor.call('dropTestUsers');
        Meteor.call('initializeUser', 'janedoe@test.org', 'janedoe', 'Jane Doe');
      });
  },
  'user can log in/out' : function (client) {
    client.resizeWindow(1200, 1024);

    const loginPage = client.page.loginPage();
    const indexPage = client.page.indexPage();

    loginPage
      .navigate()
      .login('janedoe@test.org', 'janedoe')
      .pause(2000, client);


    client
      .assert.elementPresent('#indexPage').pause(2000)
      .assert.containsText('#authenticatedUsername', 'Jane Doe')
      .saveScreenshot('tests/nightwatch/screenshots/accounts/A-SignUp.png');
  },

  'user should be able to log status' : function (client) {
    client
  },

  'user can view list of topics' : function (client) {
    client
  },

  'user can create new topic' : function (client) {
    client
  },

  'admin/user can delete topic' : function (client) {
    client
  },

  'user can post on any topic' : function (client) {
    client
  },

  'post should have title, text, image, and labels' : function (client) {
    client
  },

  'posts can be displayed in list/timeline view' : function (client) {
    client
  },

  'tapping on post should highlight it' : function (client) {
    client
  },

  'user can edit post after its posted' : function (client) {
    client
  },

  'user can post status' : function (client) {
    client
  },

  'user can search posts' : function (client) {
    client
  },

  'guest can view posts' : function (client) {
    client
  },

  'guest can not edit posts' : function (client) {
    client
  },

  'user can filter statuses by label' : function (client) {
    client
  },

  'labels are displayed in sidebar category list' : function (client) {
    client
  },

  'end' : function (client) {
    client
      .end();
  }
}
