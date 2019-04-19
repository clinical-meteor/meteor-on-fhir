import { Meteor } from 'meteor/meteor';
import { get } from 'lodash';

let DailyStats = {
  generate: function(type){
    let newDailyStat = {
      date: new Date(),
      type: type ? type : 'dailystat',
      usersCount: 0,
      patientsCount: 0,
      practitionersCount: 0,
      counts: {
        allergyIntolerances: 0,
        auditEvents: 0,
        appointments: 0,
        bundles: 0,
        devices: 0,
        carePlans: 0,
        communications: 0,
        conditions: 0,
        consents: 0,
        contracts: 0,
        claims: 0,
        devices: 0,
        endpoints: 0,
        familyMemberHistories: 0,
        genotype: 0,
        goals: 0,
        locations: 0,
        medications: 0,
        medicationOrders: 0,
        medicationStatements: 0,
        messageHeaders: 0,
        organizations: 0,
        observations: 0,
        patients: 0,
        practitioners: 0,
        procedures: 0,
        questionnaires: 0,
        questionnaireResponses: 0,
        schedules: 0,
        sequences: 0
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
    if (typeof AuditEvents === 'object') {
      newDailyStat.counts.auditEvents = AuditEvents.find().count();
    }
    if (typeof Bundles === 'object') {
      newDailyStat.counts.bundles = Bundles.find().count();
    }
    if (typeof CarePlans === 'object') {
      newDailyStat.counts.carePlans = CarePlans.find().count();
    }
    if (typeof Claims === 'object') {
      newDailyStat.counts.claims = Claims.find().count();
    }
    if (typeof Conditions === 'object') {
      newDailyStat.counts.conditions = Conditions.find().count();
    }
    if (typeof Consents === 'object') {
      newDailyStat.counts.consents = Consents.find().count();
    }
    if (typeof Contracts === 'object') {
      newDailyStat.counts.contracts = Contracts.find().count();
    }
    if (typeof Communications === 'object') {
      newDailyStat.counts.communications = Communications.find().count();
    }
    if (typeof Devices === 'object') {
      newDailyStat.counts.devices = Devices.find().count();
    }
    if (typeof DiagnosticReports === 'object') {
      newDailyStat.counts.diagnosticReports = DiagnosticReports.find().count();
    }
    if (typeof Endpoints === 'object') {
      newDailyStat.counts.endpoints = Endpoints.find().count();
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
    if (typeof Medications === 'object') {
      newDailyStat.counts.medications = Medications.find().count();
    }
    if (typeof MedicationStatements === 'object') {
      newDailyStat.counts.medications = MedicationStatements.find().count();
    }
    if (typeof MedicationOrders === 'object') {
      newDailyStat.counts.medications = MedicationOrders.find().count();
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
    if (typeof Sequences === 'object') {
      newDailyStat.counts.sequences = Sequences.find().count();
    }

    process.env.DEBUG && console.log('Cron Job: Generating daily statistics');
    process.env.VERBOSE && console.log(newDailyStat);

    return newDailyStat;
  }
};

SyncedCron.add({
  name: 'Cron Job: Crunch some important numbers for the marketing department',
  schedule: function(parser) {
    // return parser.text('at 12:00 am');
    return parser.text('every 1 day');
  },
  job: function() {
    DailyStats.generate();
  }
});


Meteor.methods({
  generateDailyStat:function (type){
    process.env.DEBUG && console.log('Meteor Method: Generating daily statistics');

    if (get(Meteor, 'settings.public.modules.statisticsLogging')) {
      return Statistics.insert(DailyStats.generate(type));
    }
  },
  getServerStats: function(){
    return DailyStats.generate();
  }
});
