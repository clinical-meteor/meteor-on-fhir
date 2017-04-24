

Meteor.methods({
  createPractitionerRole:function(practitionerRoleObject){
    check(practitionerRoleObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating PractitionerRole...');
      PractitionerRoles.insert(practitionerRoleObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('PractitionerRole created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializePractitionerRole:function(){
    if (!PractitionerRoles.findOne({id: 'f003-0'})) {
      //console.log("No records found in PractitionerRoles collection.  Lets create some...");

      var cardio = {
        "resourceType": "PractitionerRole",
        "id": "f003-0",
        "organization": {
          "reference": "Organization/f001",
          "display": "BMC"
        },        
        "practitioner": {
          "reference": "http://hl7.org/fhir/sid/us-npi|1265437362",
          "display": "Gregory Mula, MD"
        },
        "specialty": [
          {
            "coding": [
              {
                "system": "http://hl7.org/fhir/practitioner-specialty",
                "value": 'cardio',
                "code": "cardio",
                "display": "cardio"
              }
            ],
            "text": "cardio"
          }
        ]
      };
      Meteor.call('createPractitionerRole', cardio);

    } else {
      console.log('PractitionerRoles already exist.  Skipping.');
    }
  },
  dropTestPractitionerRoles: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping test practitionerRoles... ');
      PractitionerRoles.find({test: true}).forEach(function(practitionerRole){
        PractitionerRoles.remove({_id: practitionerRole._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  dropPractitionerRoles: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping practitionerRoles... ');
      PractitionerRoles.find().forEach(function(practitionerRole){
        PractitionerRoles.remove({_id: practitionerRole._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  echoPractitioners: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Echo practitionerRoles... ', PractitionerRoles.find().fetch());
    }
  }
});
