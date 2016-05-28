
// INSECURE; DELETE ME
if (Meteor.isClient){
  Meteor.subscribe("allPractitioners");
}

// INSECURE; DELETE ME
if (Meteor.isServer){
  Meteor.publish("allPractitioners", function (argument){
    return Practitioners.find();
  });
}
