if(Package['clinical:hl7-resource-procedure']){
  Meteor.methods({
    createProcedure:function(procedureObject){
      check(procedureObject, Object);
  
      if (process.env.NODE_ENV === 'test') {
        console.log('Creating Procedure...');
        Procedures.insert(procedureObject, function(error, result){
          if (error) {
            console.log(error);
          }
          if (result) {
            console.log('Procedure created: ' + result);
          }
        });
      } else {
        console.log('This command can only be run in a test environment.');
        console.log('Try setting NODE_ENV=test');
      }
    },
    initializeProcedure:function(){
      console.log('Initializing procedures...');
      
      if (Procedures.find({'code.text': 'MRI BRAIN W/WO CONTRAST'}).count() === 0) {
        console.log('No records found in Procedures collection.  Lets create some...');
  
        var defaultProcedure = {
          resourceType: 'Procedure',
          status: 'unknown',
          nodeDone: false,
          code: {
            text: 'MRI BRAIN W/WO CONTRAST'
          }
        };
  
        // if (this.userId) {
        //   let user = Meteor.users.findOne({_id: this.userId});
        //   if (user && user.profile && user.profile.name && user.profile.name.text) {
  
        //     //   display: Patients.findByUserId(this.userId).fullName(),
        //     //   reference: 'Patients/' + Patients.findByUserId(this.userId).patientId()
  
        //     defaultProcedure.subject.display = user.profile.name.text;
        //     defaultProcedure.subject.reference = 'Meteor.users/' + this.userId;
  
        //     defaultProcedure.performer.display = user.profile.name.text;
        //     defaultProcedure.performer.reference = 'Meteor.users/' + this.userId;
        //   }
        // }
  
        Meteor.call('createProcedure', defaultProcedure);
      } else {
        console.log('Procedures already exist.  Skipping.');
      }
    },
    removeProcedureById: function(procedureId){
      check(procedureId, String);
      if (process.env.NODE_ENV === 'test') {
        console.log('-----------------------------------------');
        console.log('Removing procedure... ');
        Procedures.remove({_id: procedureId});
      } else {
        console.log('This command can only be run in a test environment.');
        console.log('Try setting NODE_ENV=test');
      }
    },
    dropProcedures: function(){
      if (process.env.NODE_ENV === 'test') {
        console.log('-----------------------------------------');
        console.log('Dropping procedures... ');
        Procedures.remove({});
      } else {
        console.log('This command can only be run in a test environment.');
        console.log('Try setting NODE_ENV=test');
      }
    }
  
  });
    
}



