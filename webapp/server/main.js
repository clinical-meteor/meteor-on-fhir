import '/imports/server';

import '/imports/api/users/methods';
import '/imports/api/practitioners/methods';
import '/imports/ui/workflows/patients/methods';

import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Meteor.startup(function (){
  // if (Meteor.users.find({username: 'janedoe'}).count() === 0) {
  if (Meteor.users.find({'emails.0.address': 'janedoe@test.org'}).count() === 0) {
    let newAccount = Accounts.createUser({
      username: 'janedoe',
      email: 'janedoe@test.org',
      password: 'janedoe',
      profile: {
        name: {
          given: 'Jane',
          family: 'Doe',
          text: 'Jane Doe'
        }
      }
    });
    console.log('Initialized Jane Doe account.  ', newAccount);
  } else {
    console.log('Jane Doe account already exists.  Skipping.');
  }


});
