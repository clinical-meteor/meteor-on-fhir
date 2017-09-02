


Meteor.methods({
  createAllergyIntolerance:function(allergyIntolleranceObject){
    check(allergyIntolleranceObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating AllergyIntolerance...');
      AllergyIntollerances.insert(allergyIntolleranceObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('AllergyIntolerance created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeAllergyIntolerance:function(allergyIntolleranceValue, deviceId){
    check(allergyIntolleranceValue, Number);
    check(deviceId, String);

    if (AllergyIntollerances.find().count() === 0) {
      console.log('No records found in AllergyIntollerances collection.  Lets create some...');

      var defaultAllergyIntolerance = {
        resourceType: 'AllergyIntolerance',
        // status: 'final',
        // category: {
        //   text: 'Weight'
        // },
        // effectiveDateTime: new Date(),
        // subject: {
        //   display: 'Jane Doe',
        //   reference: ''
        // },
        // performer: {
        //   display: '',
        //   reference: ''
        // },
        // device: {
        //   display: 'Withings Weight Scale',
        //   reference: deviceId
        // },
        // valueQuantity: {
        //   value: allergyIntolleranceValue,
        //   unit: 'kg',
        //   system: 'http://unitsofmeasure.org'
        // }
      };

      // if (this.userId) {
      //   let user = Meteor.users.findOne({_id: this.userId});
      //   if (user && user.profile && user.profile.name && user.profile.name.text) {

      //     //   display: Patients.findByUserId(this.userId).fullName(),
      //     //   reference: 'Patients/' + Patients.findByUserId(this.userId).patientId()

      //     defaultAllergyIntolerance.subject.display = user.profile.name.text;
      //     defaultAllergyIntolerance.subject.reference = 'Meteor.users/' + this.userId;

      //     defaultAllergyIntolerance.performer.display = user.profile.name.text;
      //     defaultAllergyIntolerance.performer.reference = 'Meteor.users/' + this.userId;
      //   }
      // }

      Meteor.call('createAllergyIntolerance', defaultAllergyIntolerance);
    } else {
      console.log('AllergyIntollerances already exist.  Skipping.');
    }
  },
  removeAllergyIntoleranceById: function(allergyIntolleranceId){
    check(allergyIntolleranceId, String);
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Removing allergyIntollerance... ');
      AllergyIntollerances.remove({_id: allergyIntolleranceId});
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  dropAllergyIntollerances: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping allergyIntollerances... ');
      AllergyIntollerances.remove({});
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }

});
