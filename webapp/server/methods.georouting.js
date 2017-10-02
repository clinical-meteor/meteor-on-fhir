import {
  clearCities,
  createSampleCities,
  dropGraphDatabase,
  echoAllLocations,
  echoCities,
  fetchCitesFromGraphDatabase,
  generateDistances,
  getDistance,
  getRelationships,
  relationshipTypes,
  simpleSalespersonAlgorithm
} from 'meteor/clinical:routing-algorithms';

Meteor.methods({
  dropGraphDatabase: function(){
    dropGraphDatabase();
  },
  echoCities: function(){
    echoCities();
  },
  createSampleCities: function(){
    createSampleCities();
  },
  generateDistances: function(){
    generateDistances();
  },
  simpleSalespersonAlgorithm: function(){
    simpleSalespersonAlgorithm();
  },
});
