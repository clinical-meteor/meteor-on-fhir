
// https://www.cdc.gov/vaccines/schedules/index.html
// https://www.hl7.org/fhir/immunization.html



Meteor.methods({
  createImmunization:function(immunizationObject){
    check(immunizationObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating Immunization...');
      Immunizations.insert(immunizationObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Immunization created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeImmunizations:function(){
    console.log('Initializing immunizations...');

    if (Immunizations.find({'identifier.type.text': 'Chickenpox'}).count() === 0) {
      console.log('No records found in Immunizations collection.  Lets create some...');

      var chickenpox = {
        resourceType: 'Immunization',
        status: 'unknown', 
        notGiven: true,
        identifier: [{
          type: {
            text: 'Chickenpox'
          }
        }],
        vaccineCode: {
          text: 'Varicella vaccine'
        }
      };
      Meteor.call('createImmunization', chickenpox);
    } 

    if (Immunizations.find({'identifier.type.text': 'Diptheria'}).count() === 0) {
      console.log('No records found in Immunizations collection.  Lets create some...');

      var diptheria = {
        resourceType: 'Immunization',
        status: 'unknown', 
        notGiven: true,
        identifier: [{
          type: {
            text: 'Diptheria'
          }
        }],
        vaccineCode: {
          text: 'DTaP*'
        }        
      };
      Meteor.call('createImmunization', diptheria);
    } 

    if (Immunizations.find({'identifier.type.text': 'Hib'}).count() === 0) {
      console.log('No records found in Immunizations collection.  Lets create some...');

      var hib = {
        resourceType: 'Immunization',
        status: 'unknown', 
        notGiven: true,
        identifier: [{
          type: {
            text: 'Hib'
          }
        }],
        vaccineCode: {
          text: 'Hib'
        }        
      };
      Meteor.call('createImmunization', hib);
    }     

    if (Immunizations.find({'identifier.type.text': 'Hepatitis A'}).count() === 0) {
      console.log('No records found in Immunizations collection.  Lets create some...');

      var hepA = {
        resourceType: 'Immunization',
        status: 'unknown', 
        notGiven: true,
        identifier: [{
          type: {
            text: 'Hepatitis A'
          }
        }],
        vaccineCode: {
          text: 'HepA'
        }        
      };
      Meteor.call('createImmunization', hepA);
    }     

    if (Immunizations.find({'identifier.type.text': 'Hepatitis B'}).count() === 0) {
      console.log('No records found in Immunizations collection.  Lets create some...');

      var hepB = {
        resourceType: 'Immunization',
        status: 'unknown', 
        notGiven: true,
        identifier: [{
          type: {
            text: 'Hepatitis B'
          }
        }],
        vaccineCode: {
          text: 'HepB'
        }        
      };
      Meteor.call('createImmunization', hepB);
    }     

    if (Immunizations.find({'identifier.type.text': 'Influenza'}).count() === 0) {
      console.log('No records found in Immunizations collection.  Lets create some...');

      var flu = {
        resourceType: 'Immunization',
        status: 'unknown', 
        notGiven: true,
        identifier: [{
          type: {
            text: 'Influenza'
          }
        }],
        vaccineCode: {
          text: 'Flu vaccine'
        }        
      };
      Meteor.call('createImmunization', flu);
    }     

    if (Immunizations.find({'identifier.type.text': 'Measles'}).count() === 0) {
      console.log('No records found in Immunizations collection.  Lets create some...');

      var measles = {
        resourceType: 'Immunization',
        status: 'unknown', 
        notGiven: true,
        identifier: [{
          type: {
            text: 'Measles'
          }
        }],
        vaccineCode: {
          text: 'MMR**'
        }        
      };
      Meteor.call('createImmunization', measles);
    }     

    if (Immunizations.find({'identifier.type.text': 'Mumps'}).count() === 0) {
      console.log('No records found in Immunizations collection.  Lets create some...');

      var mumps = {
        resourceType: 'Immunization',
        status: 'unknown', 
        notGiven: true,
        identifier: [{
          type: {
            text: 'Mumps'
          }
        }],
        vaccineCode: {
          text: 'MMR**'
        }        
      };
      Meteor.call('createImmunization', mumps);
    }  

    if (Immunizations.find({'identifier.type.text': 'Pertussis'}).count() === 0) {
      console.log('No records found in Immunizations collection.  Lets create some...');

      var pertussis = {
        resourceType: 'Immunization',
        status: 'unknown', 
        notGiven: true,
        identifier: [{
          type: {
            text: 'Pertussis'
          }
        }],
        vaccineCode: {
          text: 'DTaP*'
        }        
      };
      Meteor.call('createImmunization', pertussis);
    }       


    if (Immunizations.find({'identifier.type.text': 'Polio'}).count() === 0) {
      console.log('No records found in Immunizations collection.  Lets create some...');

      var polio = {
        resourceType: 'Immunization',
        status: 'unknown', 
        notGiven: true,
        identifier: [{
          type: {
            text: 'Polio'
          }
        }],
        vaccineCode: {
          text: 'IPV'
        }        
      };
      Meteor.call('createImmunization', polio);
    }    

    if (Immunizations.find({'identifier.type.text': 'Pneumococcal'}).count() === 0) {
      console.log('No records found in Immunizations collection.  Lets create some...');

      var pneumococcal = {
        resourceType: 'Immunization',
        status: 'unknown', 
        notGiven: true,
        identifier: [{
          type: {
            text: 'Pneumococcal'
          }
        }],
        vaccineCode: {
          text: 'PCV'
        }                
      };
      Meteor.call('createImmunization', pneumococcal);
    }    


    if (Immunizations.find({'identifier.type.text': 'Rotavirus'}).count() === 0) {
      console.log('No records found in Immunizations collection.  Lets create some...');

      var rotavirus = {
        resourceType: 'Immunization',
        status: 'unknown', 
        notGiven: true,
        identifier: [{
          type: {
            text: 'Rotavirus'
          }
        }],
        vaccineCode: {
          text: 'RV'
        }        
      };
      Meteor.call('createImmunization', rotavirus);
    }    

    if (Immunizations.find({'identifier.type.text': 'Rubella'}).count() === 0) {
      console.log('No records found in Immunizations collection.  Lets create some...');

      var rubella = {
        resourceType: 'Immunization',
        status: 'unknown', 
        notGiven: true,
        identifier: [{
          type: {
            text: 'Rubella'
          }
        }],
        vaccineCode: {
          text: 'MMR**'
        }        
      };
      Meteor.call('createImmunization', rubella);
    }    

    if (Immunizations.find({'identifier.type.text': 'Tetanus'}).count() === 0) {
      console.log('No records found in Immunizations collection.  Lets create some...');

      var tetanus = {
        resourceType: 'Immunization',
        status: 'unknown', 
        notGiven: true,
        identifier: [{
          type: {
            text: 'Tetanus'
          }
        }],
        vaccineCode: {
          text: 'DTaP*'
        }        
      };
      Meteor.call('createImmunization', tetanus);
    }    
  },
  removeImmunizationById: function(immunizationId){
    check(immunizationId, String);
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Removing immunization... ');
      Immunizations.remove({_id: immunizationId});
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  dropImmunizations: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping immunizations... ');
      Immunizations.remove({});
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }

});
