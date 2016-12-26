
// import { Medications } from '/imports/api/medications/medications';
import { Medications } from 'meteor/clinical:hl7-resource-medication';

Meteor.publish('medications', function(){
  return Medications.find();
});

Meteor.methods({
  createMedication:function(medicationObject){
    check(medicationObject, Object);

    if (Medications.find({'code.text': medicationObject.code.text}).count() === 0) {
      Medications.insert(medicationObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Medication created: ' + result);
        }
      });
    }
  },
  initializeMedications:function(){

    if (process.env.Medications) {
      console.log('Lets make sure our Medication inventory is correct...');

      var thiamine = {
        isBrand: false,
        code: {
          text: "Claritin"
        },
        manufacturer: {
          display: '',
          reference: ''
        },
        product: {
          form: {
            text: 'tablet'
          },
          ingredient: [{
            item: {
              resourceType: 'Substance',
              code: {
                text: 'Loratadine'
              },
              description: 'Antihistimine'
            },
            instance: [{
              quantity: '1 tablet'
            }]
          }]
        }
      };
      Meteor.call('createMedication', thiamine);


    } else {
      console.log('Medications already exist.  Skipping.');
    }
  },
  dropMedications: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping medications... ');
      Medications.find().forEach(function(patient){
        Medications.remove({_id: patient._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }

});
