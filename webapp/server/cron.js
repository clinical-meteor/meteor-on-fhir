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

    if (Devices) {
      newDailyStat.counts.devices = Devices.find().count();
    }
    if (MyGenotype) {
      newDailyStat.counts.genotype = MyGenotype.find().count();
    }
    if (Medications) {
      newDailyStat.counts.medications = Medications.find().count();
    }
    if (Organizations) {
      newDailyStat.counts.organizations = Organizations.find().count();
    }
    if (Locations) {
      newDailyStat.counts.locations = Locations.find().count();
    }
    if (Observations) {
      newDailyStat.counts.observations = Observations.find().count();
    }
    if (Patients) {
      newDailyStat.patientsCount = Patients.find().count();
      newDailyStat.counts.patients = Patients.find().count();
    }
    if (Practitioners) {
      newDailyStat.practitionersCount = Practitioners.find().count();
      newDailyStat.counts.practitioners = Practitioners.find().count();
    }
    if (Questionnaires) {
      newDailyStat.counts.questionnaires = Questionnaires.find().count();
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
