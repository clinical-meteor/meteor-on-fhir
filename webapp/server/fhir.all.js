

Meteor.methods({ 
  dropAll: function() { 
    Meteor.call('dropOrganizations');  // creates Organizations
    Meteor.call('dropCarePlans');
    Meteor.call('dropChecklists');
    Meteor.call('dropConditions');
    Meteor.call('dropDevices');
    Meteor.call('dropEncounters');
    Meteor.call('dropGoals');
    Meteor.call('dropLocations');
    Meteor.call('dropMedications');
    Meteor.call('dropMessageHeaders');    
    Meteor.call('dropObservations');
    Meteor.call('dropPatients');
    Meteor.call('dropPractitioners');
    Meteor.call('dropPractitionerRoles');
    Meteor.call('dropQuestionnaires');     
    Meteor.call('dropQuestionnaireResponses');
    Meteor.call('dropRiskAssessments');    
  },
  initializeAll: function(){
    Meteor.call('initializeCarePlan');
    Meteor.call('initializeChecklists');
    Meteor.call('initializeCondition');
    Meteor.call('initializeDevice');
    Meteor.call('initializeMedications');
    Meteor.call('initializeObservation', 70.0, '');
    Meteor.call('initializePatient');
    Meteor.call('initializePractitioner');
    Meteor.call('initializeQuestionnaire');

    Meteor.call('initializeSystemUsers');
    Meteor.call('initializeProviderDirectory');    
  },
  initializeProviderDirectory: function(){
    Meteor.call('initializeBlockchain');  // creates Organizations
    // Meteor.call('initializeLocations');
    Meteor.call('initializeHospitals');
  },
  initializeSystemUsers: function(){
    Meteor.call('initializeUsers', {initializePracitioners: true})
    Meteor.call('initializeFamousDeadPeople');
  },
  initializeSystem: function(){
    Meteor.call('generateDailyStat'); 

    if (HipaaLog.find().count() === 0 ){
      HipaaLogger.logEvent({
        eventType: "init",
        userId: 'System',
        userName: 'System'
      });
    }    
  }
});