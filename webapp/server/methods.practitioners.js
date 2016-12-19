

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
          given: ["Benjamin"],
          family: ["Spock"],
          text: "Dr. Benjamin McLane Spock, MD"
        },
        telecom: [{
          system: 'phone',
          value: '415-555-1234',
          use: 'work',
          rank: '1'
        }],
        qualification: [{
          identifier: [{
            use: 'certficate',
            value: '123456',
            period: {
              start: new Date(2010, 1, 1),
              end: new Date(2019, 12, 31)
            }
          }],
          issuer: {
            display: "American Board of Pediatrics",
            reference: "Organizations/12345"
          }
        }],
        test: true
      };

      Meteor.call('createPractitioner', defaultPractitioner);
    } else {
      console.log('Practitioners already exist.  Skipping.');
    }
  },
  dropTestPractitioners: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping test practitioners... ');
      Practitioners.find({test: true}).forEach(function(practitioner){
        Practitioners.remove({_id: practitioner._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
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
