import { Documents } from '/imports/api/documents/documents';
import { GeneticAlgorithms } from '/imports/api/genotype/GeneticAlgorithms';
import { MyGenotype } from '/imports/api/genotype/MyGenotype';
import NodeGeocoder from 'node-geocoder';
import { Topics } from '/imports/api/topics/topics';

var options = {
  provider: 'google'
  // // Optional depending on the providers
  // httpAdapter: 'https', // Default
  // apiKey: 'YOUR_API_KEY', // for Mapquest, OpenCage, Google Premier
  // formatter: null         // 'gpx', 'string', ...
};
var geocoder = NodeGeocoder(options);

Meteor.methods({
  parseGeojson: function(data){
    check(data, Object);

    if(data.features && data.features.length > 0){
      data.features.forEach(function(feature){
  
        // this was initially created to parse a geojson file from Medicare
        // we want to modify it so it checks the properties for FHIR objects, 
        // and autoimports them into Symptomatic
        if(feature.properties){
          
          // build our organization object
          var newOrganization = {
            resourceType: 'Organization',
            name: '',
            address: []                      
          }
          if(feature.properties.hospital){
            newOrganization.name = feature.properties.hospital;
          }

          // there can be a bunch of addresses, 
          // so we need to build a new one seperately
          var newAddress = {
            use: 'work',
            type: 'physical',
            line: [],
            city: '',
            district: '',
            state: '',
            postalCode: ''
          };
          if(feature.properties.hospital){
            newAddress.line.push(feature.properties.hospital);
          }
          if(feature.properties.city){
            newAddress.city = feature.properties.hospcity;
          }
          if(feature.properties.hospstate){
            newAddress.state = feature.properties.hospstate;
          }

          // then add it to the organizzation
          newOrganization.address.push(newAddress);
            
          var organizationId;

          // then add the organization to the collection, and get an orgid
          if(Organizations.find({name: newOrganization.name}).count() == 0){
            organizationId = Organizations.insert(newOrganization);
            console.log('organizationId', organizationId);

            // which we'll use for the location
            var newLocation = {
              status: 'active',
              position: {},
              name: newOrganization.name,
              managingOrganization: {
                reference: organizationId,
                display: feature.properties.hospital
              }
            };

            // grab the geocoordinates
            if(feature.geometry && feature.geometry.coordinates){
              newLocation.position.longitude = feature.geometry.coordinates[0];
              newLocation.position.latitude = feature.geometry.coordinates[1];
            }          
            
            // and add to the database
            if(Locations.find({name: newLocation.name}).count() == 0){
              Locations.insert(newLocation);
            }          
          }
        }
      });



    }

  },
  geocode: function(address){
    check(address, Object);
    
    process.env.DEBUG &&console.log('received a new address to geocode', address, this.userId)
    // var assembledAddress = "3928 W. Cornelia Ave, Chicago, IL";
    var assembledAddress = '';
    if(address.line){
      assembledAddress = address.line;
    }
    if(address.city){
      assembledAddress = assembledAddress + ', ' + address.city;
    }
    if(address.state){
      assembledAddress = assembledAddress + ', ' + address.state;
    }
    if(address.postalCode){
      assembledAddress = assembledAddress + ', ' + address.postalCode;
    }
    if(address.country){
      assembledAddress = assembledAddress + ', ' + address.country;
    }

    process.env.DEBUG && console.log('lets try geocoding something...', assembledAddress);
    geocoder.geocode(assembledAddress, Meteor.bindEnvironment(function ( err, data ) {
      console.log('geocoded data:', data);
      if(data){
        if(data[0] && data[0].latitude){
          Meteor.users.update({  _id: Meteor.userId()}, {$set:{
            'profile.locations.home.position.latitude': data[0].latitude
          }});
        }
        if(data[0] && data[0].longitude){
          Meteor.users.update({  _id: Meteor.userId()}, {$set:{
            'profile.locations.home.position.longitude': data[0].longitude
          }});
        }
      }
    }));
  },
  dropTopics: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping topics... ');
      Topics.find().forEach(function(topic){
        Topics.remove({_id: topic._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  dropDocuments: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping documents... ');
      Documents.find().forEach(function(document){
        Documents.remove({_id: document._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }
});


Meteor.methods({
  parseGenome: function(file){
    check(file, String);

    console.log('-----------------------------------------');
    console.log('Parsing genome... ');

    GeneticAlgorithms.parse23andMeFile(file);
  },
  dropGenome: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping genome... ');
      MyGenotype.remove({});
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }
});
