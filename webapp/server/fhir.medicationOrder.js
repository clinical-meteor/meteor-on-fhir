if(Package['clinical:hl7-resource-medication-order']){
  Meteor.methods({
    createMedicationOrder:function(medicationOrderObject){
      check(medicationOrderObject, Object);
  
      if (process.env.NODE_ENV === 'test') {
        console.log('Creating MedicationOrder...');
        MedicationOrders.insert(medicationOrderObject, function(error, result){
          if (error) {
            console.log(error);
          }
          if (result) {
            console.log('MedicationOrder created: ' + result);
          }
        });
      } else {
        console.log('This command can only be run in a test environment.');
        console.log('Try setting NODE_ENV=test');
      }
    },
    initializeMedicationOrder:function(medicationOrderValue, deviceId){
      check(medicationOrderValue, Number);
      check(deviceId, String);
  
      if (MedicationOrders.find().count() === 0) {
        console.log('No records found in MedicationOrders collection.  Lets create some...');
  
        var defaultMedicationOrder = {
          resourceType: 'MedicationOrder',
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
          //   value: medicationOrderValue,
          //   unit: 'kg',
          //   system: 'http://unitsofmeasure.org'
          // }
        };
  
        // if (this.userId) {
        //   let user = Meteor.users.findOne({_id: this.userId});
        //   if (user && user.profile && user.profile.name && user.profile.name.text) {
  
        //     //   display: Patients.findByUserId(this.userId).fullName(),
        //     //   reference: 'Patients/' + Patients.findByUserId(this.userId).patientId()
  
        //     defaultMedicationOrder.subject.display = user.profile.name.text;
        //     defaultMedicationOrder.subject.reference = 'Meteor.users/' + this.userId;
  
        //     defaultMedicationOrder.performer.display = user.profile.name.text;
        //     defaultMedicationOrder.performer.reference = 'Meteor.users/' + this.userId;
        //   }
        // }
  
        Meteor.call('createMedicationOrder', defaultMedicationOrder);
      } else {
        console.log('MedicationOrders already exist.  Skipping.');
      }
    },
    removeMedicationOrderById: function(medicationOrderId){
      check(medicationOrderId, String);
      if (process.env.NODE_ENV === 'test') {
        console.log('-----------------------------------------');
        console.log('Removing medicationOrder... ');
        MedicationOrders.remove({_id: medicationOrderId});
      } else {
        console.log('This command can only be run in a test environment.');
        console.log('Try setting NODE_ENV=test');
      }
    },
    dropMedicationOrders: function(){
      if (process.env.NODE_ENV === 'test') {
        console.log('-----------------------------------------');
        console.log('Dropping medicationOrders... ');
        MedicationOrders.remove({});
      } else {
        console.log('This command can only be run in a test environment.');
        console.log('Try setting NODE_ENV=test');
      }
    }
  
  });
    
}



