//import {defaultCarePlan} from '/imports/api/careplans/default';

let defaultCarePlan = {};
Meteor.methods({
  createCarePlan:function(carePlanObject){
    check(carePlanObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating CarePlan...');
      carePlanObject.template = true;
      carePlanObject.createdAt = new Date();
      CarePlans.insert(carePlanObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('CarePlan created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeCarePlan: function(){
    if (CarePlans.find().count() === 0) {
      console.log('No records found in CarePlan collection.  Lets create some...');

      // We're just using tis record to bootstrap the system.  In the actual pipeline,
      // we won't be using Random.id() and will reference actual external records.

      Meteor.call('createCarePlan', defaultCarePlan);
    } else {
      console.log('CarePlans already exist.  Skipping.');
    }
  },
  dropCarePlans: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping conditions... ');
      CarePlans.remove({});
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }    
  }
});
