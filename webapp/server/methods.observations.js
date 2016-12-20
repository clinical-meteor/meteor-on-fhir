


Meteor.methods({
  createObservation:function(observationObject){
    check(observationObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating Observation...');
      Observations.insert(observationObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Observation created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeObservation:function(observationValue, deviceId){
    check(observationValue, Number);
    check(deviceId, String);

    if (Observations.find().count() === 0) {
      console.log('No records found in Observations collection.  Lets create some...');

      var defaultObservation = {
        resourceType: 'Observation',
        status: 'final',
        category: {
          text: 'Weight'
        },
        effectiveDateTime: new Date(),
        subject: {
          display: 'Jane Doe',
          reference: ''
        },
        performer: {
          display: '',
          reference: ''
        },
        device: {
          display: 'Withings Weight Scale',
          reference: deviceId
        },
        valueQuantity: {
          value: observationValue,
          unit: 'kg',
          system: 'http://unitsofmeasure.org'
        }
      };

      if (this.userId) {
        let user = Meteor.users.findOne({_id: this.userId});
        if (user && user.profile && user.profile.name && user.profile.name.text) {

          //   display: Patients.findByUserId(this.userId).fullName(),
          //   reference: 'Patients/' + Patients.findByUserId(this.userId).patientId()

          defaultObservation.subject.display = user.profile.name.text;
          defaultObservation.subject.reference = 'Meteor.users/' + this.userId;

          defaultObservation.performer.display = user.profile.name.text;
          defaultObservation.performer.reference = 'Meteor.users/' + this.userId;
        }
      }

      Meteor.call('createObservation', defaultObservation);
    } else {
      console.log('Observations already exist.  Skipping.');
    }
  },
  removeObservationById: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Removing observation... ');
      Observations.find().forEach(function(observation){
        Observations.remove({_id: observation._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  dropObservations: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping observations... ');
      Observations.find().forEach(function(observation){
        Observations.remove({_id: observation._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }

});
