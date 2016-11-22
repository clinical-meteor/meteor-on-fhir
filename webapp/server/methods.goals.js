

Meteor.methods({
  createGoal:function(goalObject){
    check(goalObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating Goal...');
      Goals.insert(goalObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Goal created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeGoals:function(){
    if (Goals.find().count() === 0) {
      console.log("No records found in Goals collection.  Lets create some...");

      var developAwareness = {
        description: '10,000 steps per day.',
        priority: {
          text: 'medium'
        },
        status: 'planned'
      };
      Meteor.call('createGoal', developAwareness);

    } else {
      console.log('Goals already exist.  Skipping.');
    }
  },
  dropGoals: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping goals... ');
      Goals.find().forEach(function(goal){
        Goals.remove({_id: goal._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }
});
