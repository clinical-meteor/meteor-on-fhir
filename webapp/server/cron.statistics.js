import { Meteor } from 'meteor/meteor';
import { MyGenotype } from '/imports/api/genotype/MyGenotype';
import { Statistics } from '/imports/api/statistics/statistics';

let DailyStats = {
  generate: function(){
    let newDailyStat = {
      date: new Date(),
      usersCount: 0,
      patientsCount: 0,
      practitionersCount: 0,
      counts: {
        devices: 0,
        conditions: 0,
        genotype: 0,
        locations: 0,
        medications: 0,
        organizations: 0,
        observations: 0,
        patients: 0,
        practitioners: 0,
        procedures: 0,
        questionnaires: 0
      }
    };

    if(Meteor.users){
      newDailyStat.usersCount = Meteor.users.find().count();
    }
    if (typeof AllergyIntolerances === 'object') {
      newDailyStat.counts.allergyIntolerances = AllergyIntolerances.find().count();
    }
    if (typeof Appointments === 'object') {
      newDailyStat.counts.appointments = Appointments.find().count();
    }
    if (typeof CarePlans === 'object') {
      newDailyStat.counts.carePlans = CarePlans.find().count();
    }
    if (typeof Conditions === 'object') {
      newDailyStat.counts.conditions = Conditions.find().count();
    }
    if (typeof Devices === 'object') {
      newDailyStat.counts.devices = Devices.find().count();
    }
    if (typeof DiagnosticReports === 'object') {
      newDailyStat.counts.diagnosticReports = DiagnosticReports.find().count();
    }
    if (typeof FamilyMemberHistories === 'object') {
      newDailyStat.counts.familyMemberHistories = FamilyMemberHistories.find().count();
    }
    if (typeof Goals === 'object') {
      newDailyStat.counts.goals = Goals.find().count();
    }
    if (typeof Immunications === 'object') {
      newDailyStat.counts.immunications = Immunications.find().count();
    }
    if (typeof Locations === 'object') {
      newDailyStat.counts.locations = Locations.find().count();
    }
    if (typeof MyGenotype === 'object') {
      newDailyStat.counts.genotype = MyGenotype.find().count();
    }
    if (typeof Medications === 'object') {
      newDailyStat.counts.medications = Medications.find().count();
    }
    if (typeof MessageHeaders === 'object') {
      newDailyStat.counts.messageHeaders = MessageHeaders.find().count();
    }
    if (typeof Organizations === 'object') {
      newDailyStat.counts.organizations = Organizations.find().count();
    }
    if (typeof Observations === 'object') {
      newDailyStat.counts.observations = Observations.find().count();
    }
    if (typeof Patients === 'object') {
      newDailyStat.patientsCount = Patients.find().count();
      newDailyStat.counts.patients = Patients.find().count();
    }
    if (typeof Practitioners === 'object') {
      newDailyStat.practitionersCount = Practitioners.find().count();
      newDailyStat.counts.practitioners = Practitioners.find().count();
    }
    if (typeof Questionnaires === 'object') {
      newDailyStat.counts.questionnaires = Questionnaires.find().count();
    }
    if (typeof QuestionnaireResponses === 'object') {
      newDailyStat.counts.questionnaireResponses = QuestionnaireResponses.find().count();
    }
    if (typeof RiskAssessments === 'object') {
      newDailyStat.counts.riskAssessments = RiskAssessments.find().count();
    }
    if (typeof Schedules === 'object') {
      newDailyStat.counts.schedules = Schedules.find().count();
    }

    console.log('newDailyStat', newDailyStat);

    return newDailyStat;
  }
};

SyncedCron.add({
  name: 'Crunch some important numbers for the marketing department',
  schedule: function(parser) {
    // return parser.text('at 12:00 am');
    return parser.text('every 1 hour');
  },
  job: function() {
    DailyStats.generate();
  }
});


Meteor.methods({
  generateDailyStat:function (){
    if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.modules && Meteor.settings.public.modules.statisticsLogging) {
      return Statistics.insert(DailyStats.generate());
    }
  },
  getServerStats: function(){
    return DailyStats.generate();
  }
});
