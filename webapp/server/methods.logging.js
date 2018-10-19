import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';


Meteor.methods({
  debugToServer: function(functionName, error){
    check(functionName, String);
    check(error, Object);
    console.error('Error in ' + functionName)
    console.error(error)
  }
});
