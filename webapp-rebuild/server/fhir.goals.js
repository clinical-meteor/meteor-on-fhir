

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
        description: 'Biomarker - Weight - Loose 20 lbs.',
        priority: {
          text: 'medium'
        },
        status: 'planned'
      };
      Meteor.call('createGoal', developAwareness);

      var cycleToWork = {
        description: 'Biomarker - Blood Pressure - 120/80-140/90',
        priority: {
          text: 'medium'
        },
        status: 'planned'
      };
      Meteor.call('createGoal', cycleToWork);      

      var quitSmoking24 = {
        description: '24 hours without cigarette smoking.',
        priority: {
          text: 'medium'
        },
        status: 'planned'
      };
      Meteor.call('createGoal', quitSmoking24);
      
      var quitSmoking3days = {
        description: '3 days without cigarette smoking.',
        priority: {
          text: 'medium'
        },
        status: 'planned'
      };
      Meteor.call('createGoal', quitSmoking3days);

      var quitSmoking7days = {
        description: '7 days without cigarette smoking.',
        priority: {
          text: 'medium'
        },
        status: 'planned'
      };
      Meteor.call('createGoal', quitSmoking3days);
      
      var quitSmoking1month = {
        description: '1 month without cigarette smoking.',
        priority: {
          text: 'medium'
        },
        status: 'planned'
      };
      Meteor.call('createGoal', quitSmoking1month);


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
