
import { HTTP } from 'meteor/http';


Practitioners.after.insert(function (userId, doc) {
  HTTP.put(Meteor.settings.public.interfaces.default.channel.endpoint + '/Practitioner', {
    data: doc
  }, function(error, result){
    if (error) {
      console.log("POST /Practitioner", error);
    }
    if (result) {
      console.log("POST /Practitioner", result);
    }
  });
});
Practitioners.after.update(function (userId, doc) {
  HTTP.post(Meteor.settings.public.interfaces.default.channel.endpoint + '/Practitioner', {
    data: doc
  }, function(error, result){
    if (error) {
      console.log("POST /Practitioner", error);
    }
    if (result) {
      console.log("POST /Practitioner", result);
    }
  });
});
Practitioners.after.remove(function (userId, doc) {
  // ...
});
