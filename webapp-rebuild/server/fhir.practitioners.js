

Meteor.methods({
  createPractitioner:function(practitionerObject){
    check(practitionerObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating Practitioner...');
      Practitioners.insert(practitionerObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Practitioner created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializePractitioner:function(){
    if (Practitioners.find().count() === 0) {
      console.log("No records found in Practitioners collection.  Lets create some...");

      if(!Practitioners.find({'name.text': "Dr. Benjamin McLane Spock, MD"})){
        var defaultPractitioner = {
          name: [{
            given: ["Benjamin"],
            family: "Spock",
            text: "Dr. Benjamin McLane Spock, MD"
          }],
          telecom: [{
            system: 'phone',
            value: '415-555-1234',
            use: 'work',
            rank: '1'
          }],
          qualification: [{
            identifier: [{
              use: 'certficate',
              value: '123456',
              period: {
                start: new Date(2010, 1, 1),
                end: new Date(2019, 12, 31)
              }
            }],
            issuer: {
              display: "American Board of Pediatrics",
              reference: "Organizations/12345"
            }
          }],
          test: true
        };
        Meteor.call('createPractitioner', defaultPractitioner);
      }
      
      if(!Practitioners.find({'name.text': "GREGORY MULA, MD"})){
        var providerDirectoryDefaultPractitioner = {
          name: [{
            given: ["GREGORY"],
            family: "MULA",
            text: "GREGORY MULA, MD"
          }],
          telecom: [{
            system: 'phone',
            value: '415-555-1234',
            use: 'work',
            rank: '1'
          }],
          qualification: [{
            identifier: [{
              system: 'http://hl7.org/fhir/sid/us-npi',
              use: 'certficate',
              value: '1265437362',
              period: {
                start: new Date(2010, 1, 1),
                end: new Date(2019, 12, 31)
              }
            }],
            issuer: {
              display: "American Board of Pathology",
              reference: "Organizations/22888-91s"
            }
          }],
          test: true
        };
        Meteor.call('createPractitioner', providerDirectoryDefaultPractitioner);
      }

    

    } else {
      console.log('Practitioners already exist.  Skipping.');
    }
  },
  removePractitionerById: function(practitionerId){
    check(practitionerId, String);
    Practitioners.remove({_id: practitionerId});
  },
  dropTestPractitioners: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping test practitioners... ');
      Practitioners.find({test: true}).forEach(function(practitioner){
        Practitioners.remove({_id: practitioner._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  dropPractitioners: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping practitioners... ');
      Practitioners.find().forEach(function(practitioner){
        Practitioners.remove({_id: practitioner._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  syncPractitioners: function(){
    if(Meteor.settings && Meteor.settings.public && Meteor.settings.public.meshNetwork && Meteor.settings.public.meshNetwork.upstreamSync){
      console.log('-----------------------------------------');
      console.log('Syncing practitioners... ');
      var queryString = Meteor.settings.public.meshNetwork.upstreamSync + "/Practitioner";
      console.log(queryString);
      
      var result =  HTTP.get(queryString);

      var bundle = JSON.parse(result.content);

      console.log('result', bundle);
      bundle.entry.forEach(function(record){
        console.log('record', record);
        if(record.resource.resourceType === "Practitioner"){
          if(!Practitioners.findOne({'name.text': record.resource.name.text})){
            Practitioners.insert(record.resource);
          }
        }
      });
      Meteor.call('generateDailyStat');
      return true;
    }else {
    console.log('-----------------------------------------');
    console.log('Syncing disabled... ');      
    }

  },   
});
