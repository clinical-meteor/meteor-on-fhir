import '/imports/startup/server';

import '/imports/api/users/methods';

import { Accounts } from 'meteor/accounts-base'

Meteor.startup(function (){

  if (Meteor.users.find({username: "janedoe"}).count() === 0) {
    let newAccount = Accounts.createUser({
      username: "janedoe",
      email: "janedoe@test.org",
      password: "janedoe",
      profile: {
        name: {
          given: "Jane",
          family: "Doe",
          text: "Jane Doe"
        }
      }
    })

    console.log("Initialized Jane Doe account.  ", newAccount);

  } else {
    console.log("Jane Doe account already exists.  Skipping.");

  }
});
