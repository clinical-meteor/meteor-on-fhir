BulletinBoard QA



module.exports = {
  tags: ["healthlog", "weblog"],
  "user can log in/out" : function (client) {
    client
      .resizeWindow(1200, 1024)
      .url("http://localhost:3000/login").pause(1200)
    
      .verify.elementPresent("#loginPage")
        .verify.elementPresent('input[name="emailAddress"]')
        .verify.elementPresent('input[name="password"]')
        .verify.elementPresent('#loginButton')

        .clearValue('input[name="emailAddress"]')
        .clearValue('input[name="password"]')

        .setValue('input[name="emailAddress"]', 'janedoe@test.org')
        .setValue('input[name="password"]', 'janedoe')

        .click("#loginButton").pause(1000)
          .verify.elementPresent("#indexPage");
  },
 
  "user should be able to log status" : function (client) {
    client
  },
  
  "user can view list of topics" : function (client) {
    client
  },
  
  "user can create new topic" : function (client) {
    client
  },

  "admin/user can delete topic" : function (client) {
    client
  },

  "user can post on any topic" : function (client) {
    client
  },

  "post should have title, text, image, and labels" : function (client) {
    client
  },
  
  "posts can be displayed in list/timeline view" : function (client) {
    client
  },
  
  "tapping on post should highlight it" : function (client) {
    client
  },

  "user can edit post after its posted" : function (client) {
    client
  },

  "user can post status" : function (client) {
    client
  },

  "user can search posts" : function (client) {
    client
  },

  "guest can view posts" : function (client) {
    client
  },
  
  "guest can not edit posts" : function (client) {
    client
  },
  
  "user can filter statuses by label" : function (client) {
    client
  },
  
  "labels are displayed in sidebar category list" : function (client) {
    client
  },

  "end" : function (client) {
    client
      .end();
  }
}





