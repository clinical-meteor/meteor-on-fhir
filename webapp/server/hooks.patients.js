


import { HTTP } from 'meteor/http';


Patients.after.insert(function (userId, doc) {
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
});
Patients.after.update(function (userId, doc) {
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
});
Patients.after.remove(function (userId, doc) {
  // ...
});
