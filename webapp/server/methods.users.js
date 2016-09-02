import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';


Meteor.startup(function (){
  if (process.env.INITIALIZE && (Meteor.users.find().count() === 0)) {
    console.log('No users found.');

    Meteor.call("initializeTestUsers");
  }
});



Meteor.methods({
  dropTestUsers: function(){
    console.log('Dropping test users...');

    if ((process.env.NODE_ENV === 'test') || (process.env.NODE_ENV === 'circle')) {
      let count = 0;
      Meteor.users.find().forEach(function(user){
        if (user.emails && user.emails[0]) {
          if ((user.emails[0].address === 'alice@test.org') || (user.emails[0].address === 'janedoe@test.org') || (user.emails[0].address === 'admin@admin.com')){
            Meteor.users.remove({_id: user._id});
            count++;
          }
        }
      });
      console.log(count + " users removed.");

    } else {
      console.log('Not in test mode.  Try using NODE_ENV=test');
    }
  },
  updateUserProfile: function(userId, profileData){
    console.log('Updating user profile...', profileData);

    Meteor.users.update({_id: userId}, {$set: { profile: profileData }}, function(error, result){
      if(error){
        HipaaLogger.logEvent('error', Meteor.userId(), Meteor.user().getPrimaryEmail(), 'RiskAssessments', null, null, null, error);
      }
      if(result){
        HipaaLogger.logEvent('update', Meteor.userId(), Meteor.user().getPrimaryEmail(), 'Meteor.users', null, null, null, null);
      }
    });
  },
  initializeTestUsers: function(){
    console.log("Initializing users...");

    //==============================================================================
    // JANEDOE

    var user = {
      username: 'janedoe',
      password: 'janedoe123',
      email: 'janedoe@test.org'
    };
    let existingUser = Meteor.users.findOne({username: 'janedoe'});
    if (!existingUser) {
      let janedoeId = Accounts.createUser(user);
      Meteor.users.update({_id: janedoeId}, {$set: {
        'profile.name': {
          text: 'Jane Doe',
          given: 'Jane',
          family: 'Doe'
        }
      }});
    }


    //==============================================================================
    // ADMIN

    var admin = {
      username: 'admin',
      password: 'admin123',
      email: 'admin@admin.com'
    };
    let existingAdmin = Meteor.users.findOne({username: 'admin'});
    if (!existingAdmin) {
      let adminId = Accounts.createUser(admin);
      Meteor.users.update({_id: adminId}, {$set: {
        'profile.name': {
          text: 'System Admin',
          given: 'System',
          family: 'Admin'
        }
      }});
    }
  }
});
