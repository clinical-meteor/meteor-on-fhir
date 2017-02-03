


import { HTTP } from 'meteor/http';


Patients.after.insert(function (userId, doc) {

  // interface needs to be active in order to send the messages
  if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.interfaces && Meteor.settings.public.interfaces.default && Meteor.settings.public.interfaces.default.status && (Meteor.settings.public.interfaces.default.status === "active")) {
    HTTP.put(Meteor.settings.public.interfaces.default.channel.endpoint + '/Patient', {
      data: doc
    }, function(error, result){
      if (error) {
        console.log("POST /Patient", error);
      }
      if (result) {
        console.log("POST /Patient", result);
      }
    });
  }
});
Patients.after.update(function (userId, doc) {

  // interface needs to be active in order to send the messages
  if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.interfaces && Meteor.settings.public.interfaces.default && Meteor.settings.public.interfaces.default.status && (Meteor.settings.public.interfaces.default.status === "active")) {
    HTTP.post(Meteor.settings.public.interfaces.default.channel.endpoint + '/Patient', {
      data: doc
    }, function(error, result){
      if (error) {
        console.log("POST /Patient", error);
      }
      if (result) {
        console.log("POST /Patient", result);
      }
    });
  }
});
Patients.after.remove(function (userId, doc) {
  // ...
});
