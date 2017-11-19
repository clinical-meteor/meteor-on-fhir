import { AllergyIntolerances } from 'meteor/clinical:hl7-resource-allergy-intolerance';

Meteor.methods({
  createAllergyIntolerance:function(allergyIntolleranceObject){
    check(allergyIntolleranceObject, Object);

    //TODO:  Maybe we should check that this is an admin?
    if (process.env.NODE_ENV === 'test') {
      console.log('Creating AllergyIntolerance...');
      AllergyIntolerances.insert(allergyIntolleranceObject, function(error, result){
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
  initializeAllergyIntolerances:function(){
    if (AllergyIntolerances.find().count() === 0) {
      console.log('No records found in AllergyIntolerances collection.  Lets create some...');

      var milk = {
        resourceType: 'AllergyIntolerance',
        identifier: [{
          use: 'oficial',
          value: 'Milk'
        }],
        clinicalStatus: 'active',
        verificationStatus: 'confirmed',
        type: 'allergy',
        category: ['food'],
        code: null,
        patient: null
      };
      Meteor.call('createAllergyIntolerance', milk);

      var eggs = {
        resourceType: 'AllergyIntolerance',
        identifier: [{
          use: 'oficial',
          value: 'Eggs'
        }],
        clinicalStatus: 'active',
        verificationStatus: 'confirmed',
        type: 'allergy',
        category: ['food'],
        code: null,
        patient: null
      };
      Meteor.call('createAllergyIntolerance', eggs);


      var fish = {
        resourceType: 'AllergyIntolerance',
        identifier: [{
          use: 'oficial',
          value: 'Fish'
        }],
        clinicalStatus: 'active',
        verificationStatus: 'confirmed',
        type: 'allergy',
        category: ['food'],
        code: null,
        patient: null
      };
      Meteor.call('createAllergyIntolerance', fish);

      var crustacean = {
        resourceType: 'AllergyIntolerance',
        identifier: [{
          use: 'oficial',
          value: 'Crustacean'
        }],
        clinicalStatus: 'active',
        verificationStatus: 'confirmed',
        type: 'allergy',
        category: ['food'],
        code: null,
        patient: null
      };
      Meteor.call('createAllergyIntolerance', crustacean);

      var nuts = {
        resourceType: 'AllergyIntolerance',
        identifier: [{
          use: 'oficial',
          value: 'Tree Nuts'
        }],
        clinicalStatus: 'active',
        verificationStatus: 'confirmed',
        type: 'allergy',
        category: ['food'],
        code: null,
        patient: null
      };
      Meteor.call('createAllergyIntolerance', nuts);

      var peanuts = {
        resourceType: 'AllergyIntolerance',
        identifier: [{
          use: 'oficial',
          value: 'Peanuts'
        }],
        clinicalStatus: 'active',
        verificationStatus: 'confirmed',
        type: 'allergy',
        category: ['food'],
        code: null,
        patient: null
      };
      Meteor.call('createAllergyIntolerance', peanuts);

      var wheat = {
        resourceType: 'AllergyIntolerance',
        identifier: [{
          use: 'oficial',
          value: 'Wheat'
        }],
        clinicalStatus: 'active',
        verificationStatus: 'confirmed',
        type: 'allergy',
        category: ['food'],
        code: null,
        patient: null
      };
      Meteor.call('createAllergyIntolerance', wheat);


      var soybeans = {
        resourceType: 'AllergyIntolerance',
        identifier: [{
          use: 'oficial',
          value: 'Soybeans'
        }],
        clinicalStatus: 'active',
        verificationStatus: 'confirmed',
        type: 'allergy',
        category: ['food'],
        code: null,
        patient: null
      };
      Meteor.call('createAllergyIntolerance', soybeans);

    } else {
      console.log('AllergyIntolerances already exist.  Skipping.');
    }
  },
  removeAllergyIntoleranceById: function(allergyIntolleranceId){
    check(allergyIntolleranceId, String);
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Removing allergyIntollerance... ');
      AllergyIntolerances.remove({_id: allergyIntolleranceId});
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  dropAllergyIntolerances: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping AllergyIntolerances... ');
      AllergyIntolerances.remove({});
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }

});
