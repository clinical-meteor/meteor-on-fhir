


Meteor.methods({
  createMedicationStatement:function(medicationStatementObject){
    check(medicationStatementObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating MedicationStatement...');
      MedicationStatements.insert(medicationStatementObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('MedicationStatement created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeMedicationStatement:function(medicationStatementValue, deviceId){
    check(medicationStatementValue, Number);
    check(deviceId, String);

    if (MedicationStatements.find().count() === 0) {
      console.log('No records found in MedicationStatements collection.  Lets create some...');

      var defaultMedicationStatement = {
        resourceType: 'MedicationStatement',
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
        //   value: medicationStatementValue,
        //   unit: 'kg',
        //   system: 'http://unitsofmeasure.org'
        // }
      };

      // if (this.userId) {
      //   let user = Meteor.users.findOne({_id: this.userId});
      //   if (user && user.profile && user.profile.name && user.profile.name.text) {

      //     //   display: Patients.findByUserId(this.userId).fullName(),
      //     //   reference: 'Patients/' + Patients.findByUserId(this.userId).patientId()

      //     defaultMedicationStatement.subject.display = user.profile.name.text;
      //     defaultMedicationStatement.subject.reference = 'Meteor.users/' + this.userId;

      //     defaultMedicationStatement.performer.display = user.profile.name.text;
      //     defaultMedicationStatement.performer.reference = 'Meteor.users/' + this.userId;
      //   }
      // }

      Meteor.call('createMedicationStatement', defaultMedicationStatement);
    } else {
      console.log('MedicationStatements already exist.  Skipping.');
    }
  },
  removeMedicationStatementById: function(medicationStatementId){
    check(medicationStatementId, String);
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Removing medicationStatement... ');
      MedicationStatements.remove({_id: medicationStatementId});
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  dropMedicationStatements: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping medicationStatements... ');
      MedicationStatements.remove({});
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }

});
