
Cache = {
    deleteLocalData(){
        console.log('Confirming that we should delete local data.  Y/N?');
        
        // if(confirm('Are you sure?')){
          console.log('Deleting local data...');
    
          if(typeof AllergyIntolerances === "object"){
            AllergyIntolerances._collection.remove({});
          }
    
          if(typeof Appointments === "object"){
            Appointments._collection.remove({});        
          }
    
          if(typeof CarePlans === "object"){
            CarePlans._collection.remove({});        
          }
    
          if(typeof Claims === "object"){
            Claims._collection.remove({});        
          }
    
          if(typeof Conditions === "object"){
            Conditions._collection.remove({});        
          }
    
          if(typeof Consents === "object"){
            Consents._collection.remove({});        
          }
    
          if(typeof Contracts === "object"){
            Contracts._collection.remove({});        
          }
    
          if(typeof Communications === "object"){
            Communications._collection.remove({});        
          }
    
          if(typeof ClinicalImpressions === "object"){
            ClinicalImpressions._collection.remove({});        
          }
    
          if(typeof Devices === "object"){
            Devices._collection.remove({});        
          }
    
          if(typeof DiagnosticReports === "object"){
            DiagnosticReports._collection.remove({});        
          }
    
          if(typeof FamilyMemberHistories === "object"){
            FamilyMemberHistories._collection.remove({});        
          }
    
          if(typeof Goals === "object"){
            Goals._collection.remove({});        
          }
    
          if(typeof Immunizations === "object"){
            Immunizations._collection.remove({});        
          }
    
          if(typeof ImagingStudies === "object"){
            ImagingStudies._collection.remove({});        
          }
    
          if(typeof Locations === "object"){
            Locations._collection.remove({});        
          }
    
          if(typeof Medications === "object"){
            Medications._collection.remove({});        
          }
    
          if(typeof MedicationOrders === "object"){
            MedicationOrders._collection.remove({});        
          }
    
          if(typeof MedicationStatements === "object"){
            MedicationStatements._collection.remove({});        
          }
    
          if(typeof Observations === "object"){
            Observations._collection.remove({});        
          }
    
          if(typeof Organizations === "object"){
            Organizations._collection.remove({});        
          }
    
          if(typeof Patients === "object"){
            Patients._collection.remove({});        
          }
    
          if(typeof Persons === "object"){
            Persons._collection.remove({});        
          }
    
          if(typeof Practitioners === "object"){
            Practitioners._collection.remove({});        
          }
    
          if(typeof Procedures === "object"){
            Procedures._collection.remove({});        
          }
    
          if(typeof Questionnaires === "object"){
            Questionnaires._collection.remove({});        
          }
    
          if(typeof QuestionnaireResponses === "object"){
            QuestionnaireResponses._collection.remove({});        
          }
    
          if(typeof ProcedureRequests === "object"){
            ProcedureRequests._collection.remove({});        
          }
    
          if(typeof RiskAssessments === "object"){
            RiskAssessments._collection.remove({});          
          }
          if(typeof ServiceRequests === "object"){
            ServiceRequests._collection.remove({});          
          }
    
          Meteor.call('getServerStats', function(error, result){
            if(result){
              Session.set('datalakeStats', result);
            }
          });
    
        // } else {
        //   console.log('Delete aborted.')
        // }
      }
    
};


export default Cache;