

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
    console.log('Initializing all collections....');
    
    Meteor.call('initializeAllergyIntolerances');
    Meteor.call('initializeCarePlan');
    Meteor.call('initializeChecklists');
    Meteor.call('initializeConditions');
    Meteor.call('initializeDevices');
    Meteor.call('initializeGoals');
    Meteor.call('initializeDiagnosticReports')
    Meteor.call('initializeImmunizations');
    Meteor.call('initializeMedications');
    Meteor.call('initializeMedicationStatements');
    Meteor.call('initializeObservation', 70.0, '');
    Meteor.call('initializePatient');
    Meteor.call('initializeProcedure');
    Meteor.call('initializePractitioner');
    Meteor.call('initializeQuestionnaire');

    Meteor.call('initializeSystemUsers');
    Meteor.call('initializeProviderDirectory');    

  },
  initializeProviderDirectory: function(){
    if(Package['clinical:routing-algorithms']){
      Meteor.call('initializeBlockchain');  
    }
    Meteor.call('initializeLocations');
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