

Meteor.methods({
  createCondition:function(conditionObject){
    check(conditionObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating Condition...');
      Conditions.insert(conditionObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Condition created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeCondition:function(){

    if (Conditions.find().count() === 0) {
      console.log('No records found in Conditions collection.  Lets create some...');

      // TODO:  we can't have empty strings in the record;
      // but we want to eventually get the following fields into the record
      var multipleSclerosis = {
        'resourceType' : 'Condition',
        'code' : {
          text: 'Multiple Sclerosis'
        },
        'category' : {
          text: 'Multiple Sclerosis'
        },
        'clinicalStatus' : 'active',
        'verificationStatus' : 'confirmed',
        'severity' : {
          'text': 'moderate'
        },
        'onsetDateTime' : new Date()
      };

      Meteor.call('createCondition', multipleSclerosis);
    } else {
      console.log('Conditions already exist.  Skipping.');
    }
  },
  dropConditions: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping conditions... ');
      Conditions.remove({});
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }
});
