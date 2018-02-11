
// https://www.cdc.gov/vaccines/schedules/index.html
// https://www.hl7.org/fhir/immunization.html

if(Package['clinical:hl7-resource-immunization']){
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
  
      if (Immunizations.find({'vaccineCode.text': 'MMRV'}).count() === 0) {
        var multspectrum = {
          resourceType: 'Immunization',
          notGiven: true,
          identifier: [{
            use: 'secondary',
            type: {
              text: 'Varicella'
            }
          }, {
            use: 'secondary',
            type: {
              text: 'Mumps'
            }
          }, {
            use: 'secondary',
            type: {
              text: 'Measles'
            }
          }, {
            use: 'secondary',
            type: {
              text: 'Rubella'
            }
          }, {
            use: 'official',
            type: {
              text: 'ProQuad'
            }
          }],
          vaccineCode: {
            text: 'MMRV'
          }
        };
        Meteor.call('createImmunization', multspectrum);
      }
  
      if (Immunizations.find({'vaccineCode.text': 'VAR'}).count() === 0) {
        console.log('No records found in Immunizations collection.  Lets create some...');
  
        var chickenpox1 = {
          resourceType: 'Immunization',
          notGiven: true,
          identifier: [{
            use: 'secondary',
            type: {
              text: 'Chickenpox'
            }
          }, {
            use: 'secondary',
            type: {
              text: 'Varicella'
            }
          }, {
            use: 'official',
            type: {
              text: 'Varivax'
            }
          }],
          vaccineCode: {
            text: 'VAR'
          }
        };
        Meteor.call('createImmunization', chickenpox1);
      } 
  
      if (Immunizations.find({'vaccineCode.text': 'DTaP*'}).count() === 0) {
        console.log('No records found in Immunizations collection.  Lets create some...');
  
        var diptheria = {
          resourceType: 'Immunization',
          notGiven: true,
          identifier: [{
            use: 'official',
            type: {
              text: 'Daptacel'
            }
          }, {
            use: 'secondary',
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
  
      if (Immunizations.find({'vaccineCode.text': 'ActHIB'}).count() === 0) {
        console.log('No records found in Immunizations collection.  Lets create some...');
  
        var hib = {
          resourceType: 'Immunization',
          notGiven: true,
          identifier: [{
            use: 'official',
            type: {
              text: 'Hib'
            }
          }, {
            use: 'secondary',
            type: {
              text: 'Haemophilus influenzae type b'
            }
          }],
          vaccineCode: {
            text: 'ActHIB'
          }        
        };
        Meteor.call('createImmunization', hib);
      }     
  
      if (Immunizations.find({'vaccineCode.text': 'HepA'}).count() === 0) {
        console.log('No records found in Immunizations collection.  Lets create some...');
  
        var hepA = {
          resourceType: 'Immunization',
          notGiven: true,
          identifier: [{
            use: 'official',
            type: {
              text: 'Havrix'
            }
          }, {
            use: 'secondary',
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
  
      if (Immunizations.find({'vaccineCode.text': 'HepB'}).count() === 0) {
        console.log('No records found in Immunizations collection.  Lets create some...');
  
        var hepB = {
          resourceType: 'Immunization',
          notGiven: true,
          identifier: [{
            use: 'official',
            type: {
              text: 'Engerix-B'
            }
          }, {
            use: 'secondary',
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
  
      if (Immunizations.find({'vaccineCode.text': 'IIV*'}).count() === 0) {
        console.log('No records found in Immunizations collection.  Lets create some...');
  
        var flu = {
          resourceType: 'Immunization',
          notGiven: true,
          identifier: [{
            use: 'official',
            type: {
              text: 'Afluria'
            }
          }, {
            use: 'secondary',
            type: {
              text: 'Influenza'
            }
          }, {
            use: 'secondary',
            type: {
              text: 'Flu'
            }
          }],
          vaccineCode: {
            text: 'IIV*'
          }        
        };
        Meteor.call('createImmunization', flu);
      }     
  
      if (Immunizations.find({'vaccineCode.text': 'MMR**'}).count() === 0) {
        console.log('No records found in Immunizations collection.  Lets create some...');
  
        var measles = {
          resourceType: 'Immunization',
          notGiven: true,
          identifier: [{
            use: 'official',
            type: {
              text: 'M-M-R II'
            }
          }, {
            use: 'secondary',
            type: {
              text: 'Mumps'
            }
          }, {
            use: 'secondary',
            type: {
              text: 'Measles'
            }
          }, {
            use: 'secondary',
            type: {
              text: 'Rubella'
            }
          }],
          vaccineCode: {
            text: 'MMR**'
          }        
        };
        Meteor.call('createImmunization', measles);
      }     
  
  
      if (Immunizations.find({'vaccineCode.text': 'DTaP'}).count() === 0) {
        console.log('No records found in Immunizations collection.  Lets create some...');
  
        var pertussis = {
          resourceType: 'Immunization',
          notGiven: true,
          identifier: [{
            use: 'official',
            type: {
              text: 'Daptacel'
            }
          }, {
            use: 'secondary',
            type: {
              text: 'Tetanus'
            }
          }, {
            use: 'secondary',
            type: {
              text: 'Diphtheria'
            }
          }, {
            use: 'secondary',
            type: {
              text: 'Pertussis'
            }
          }],
          vaccineCode: {
            text: 'DTaP'
          }        
        };
        Meteor.call('createImmunization', pertussis);
      }       
  
  
      if (Immunizations.find({'vaccineCode.text': 'DTaP-IPV'}).count() === 0) {
        console.log('No records found in Immunizations collection.  Lets create some...');
  
        var polio = {
          resourceType: 'Immunization',
          notGiven: true,
          identifier: [{
            use: 'official',
            type: {
              text: 'Quadracel'
            }
          }, {
            use: 'secondary',
            type: {
              text: 'Diptheria'
            }
          }, {
            use: 'secondary',
            type: {
              text: 'Pertussis'
            }
          }, {
            use: 'secondary',
            type: {
              text: 'Polio'
            }
          }, {
            use: 'secondary',
            type: {
              text: 'Tetanus'
            }
          }],
          vaccineCode: {
            text: 'DTaP-IPV'
          }        
        };
        Meteor.call('createImmunization', polio);
      }    
  
      if (Immunizations.find({'vaccineCode.text': 'PCV13'}).count() === 0) {
        console.log('No records found in Immunizations collection.  Lets create some...');
  
        var pneumococcal = {
          resourceType: 'Immunization',
          notGiven: true,
          identifier: [{
            use: 'official',
            type: {
              text: 'Prevnar13'
            }
          }, {
            use: 'secondary',
            type: {
              text: 'Pneumococcal'
            }
          }],
          vaccineCode: {
            text: 'PCV13'
          }                
        };
        Meteor.call('createImmunization', pneumococcal);
      }    
  
  
      if (Immunizations.find({'vaccineCode.text': 'RV1'}).count() === 0) {
        console.log('No records found in Immunizations collection.  Lets create some...');
  
        var rotavirus = {
          resourceType: 'Immunization',
          notGiven: true,
          identifier: [{
            use: 'official',
            type: {
              text: 'Rotarix'
            }
          }, {
            use: 'secondary',
            type: {
              text: 'Rotavirus'
            }
          }],
          vaccineCode: {
            text: 'RV1'
          }        
        };
        Meteor.call('createImmunization', rotavirus);
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
}


