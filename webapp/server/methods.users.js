import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Meteor.startup(function (){
  if (process.env.INITIALIZE && (Meteor.users.find().count() === 0)) {
    console.log('No users found.');

    Meteor.call("initializeTestUsers");
  }
});



Meteor.methods({
  initializeUser: function(email, password, name){
    check(email, String);
    check(password, String);
    check(name, String);


    console.log('Initializing user... ' + email);

    if (Meteor.users.find({'emails.0.address': email}).count() === 0) {
      Accounts.createUser({
        email: email,
        password: password,
        profile: {
          name: {
            text: name
          }
        }
      });
    }
  },
  dropTestUsers: function(){
    console.log('==================================================================');
    console.log('Dropping test users...');

    if ((process.env.NODE_ENV === 'test') || (process.env.NODE_ENV === 'circle')) {
      let count = 0;
      Meteor.users.find().forEach(function(user){
        if (user.emails && user.emails[0]) {
          if ((user.emails[0].address === 'alice@test.org')
          || (user.emails[0].address === 'janedoe@test.org')
          || (user.emails[0].address === 'sysadmin@test.org')
          || (user.emails[0].address === 'house@test.org')){
            Meteor.users.remove({_id: user._id});
            count++;
          }
        }
      });
      Meteor.users.remove({test: true});
      console.log(Meteor.users.find().count() + " users.");

    } else {
      console.log('Not in test mode.  Try using NODE_ENV=test');
    }
  },
  updateUserProfile: function(userId, profileData){
    console.log('Updating user profile...', profileData);

    Meteor.users.update({_id: userId}, {$set: { profile: profileData }}, function(error, result){
      if(error){
        HipaaLogger.logEvent({eventType: "error", userId: Meteor.userId(), userName: Meteor.user().getPrimaryEmail(), collectionName: "Patients"});
      }
      if(result){
        HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().getPrimaryEmail(), collectionName: "Patients"});
      }
    });
  },
  initializeTestUsers: function(){
    console.log("Initializing users...");

    //==============================================================================
    // JANEDOE

    var user = {
      password: 'janedoe123',
      email: 'janedoe@test.org',
      profile: {
        name: {
          text: 'Jane Doe',
          given: 'Jane',
          family: 'Doe'
        },
        firstTimeVisit: false
      }
    };
    let existingUser = Meteor.users.findOne({username: 'janedoe'});
    if (!existingUser) {
      Accounts.createUser(user);
    }


    //==============================================================================
    // ADMIN

    var admin = {
      password: 'sysadmin123',
      email: 'sysadmin@test.org',
      profile: {
        name: {
          text: 'System Admin',
          given: 'System',
          family: 'Admin'
        }
      }
    };
    let existingAdmin = Meteor.users.findOne({username: 'admin'});
    if (!existingAdmin) {
      let userId = Accounts.createUser(admin);
      Roles.addUsersToRoles(userId, ['sysadmin']);
    }
  }
});
