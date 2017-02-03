
// import { Medications } from '/imports/api/medications/medications';
import { MessageHeaders } from 'meteor/clinical:hl7-resource-message-header';

Meteor.methods({
  dropMessageHeaders: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping message headers... ');
      MessageHeaders.remove({});
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }
});
