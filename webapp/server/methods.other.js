

import { Documents } from '/imports/api/documents/documents';
import { Topics } from '/imports/api/topics/topics';

Meteor.methods({
  dropTopics: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping topics... ');
      Topics.find().forEach(function(topic){
        Topics.remove({_id: topic._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  dropDocuments: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping documents... ');
      Documents.find().forEach(function(document){
        Documents.remove({_id: document._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }
});
