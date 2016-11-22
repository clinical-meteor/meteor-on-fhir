

Meteor.methods({
  createPractitioner:function(practitionerObject){
    check(practitionerObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating Practitioner...');
      Practitioners.insert(practitionerObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Practitioner created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializePractitioner:function(){
    if (Practitioners.find().count() === 0) {
      console.log("No records found in Practitioners collection.  Lets create some...");

      var defaultPractitioner = {
        name: {
          given: ["Theodor"],
          family: ["Seuss"],
          text: "Dr. Theodor Seuss"
        },
        telecom: [{
          system: 'phone',
          value: '415-555-1234',
          use: 'work',
          rank: '1'
        }]
      };

      Meteor.call('createPractitioner', defaultPractitioner);
    } else {
      console.log('Practitioners already exist.  Skipping.');
    }
  },
  dropPractitioners: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping practitioners... ');
      Practitioners.find().forEach(function(practitioner){
        Practitioners.remove({_id: practitioner._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }
});
