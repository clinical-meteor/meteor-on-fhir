import { Posts } from '/imports/api/posts/posts';
import { Topics } from '/imports/api/topics/topics';
import { Statistics } from '/imports/api/statistics/statistics';
import { MyGenotype } from '/imports/api/genotype/MyGenotype';

import { Meteor } from 'meteor/meteor';

let DailyStats = {
  generate: function(){
    let newDailyStat = {
      date: new Date(),
      usersCount: Meteor.users.find().count(),
      postsCount: 0,
      topicsCount: 0,
      patientsCount: 0,
      practitionersCount: 0,
      observationsCount: 0,
      questionnaireResponsesCount: 0,
      counts: {
        devices: 0,
        conditions: 0,
        genotype: 0,
        medications: 0,
        observations: 0,
        patients: 0,
        practitioners: 0,
        procedures: 0,
        questionnaires: 0
      }
    };

    if (Devices) {
      newDailyStat.counts.devices = Devices.find().count();
    }
    if (MyGenotype) {
      newDailyStat.counts.genotype = MyGenotype.find().count();
    }
    if (Medications) {
      newDailyStat.counts.medications = Medications.find().count();
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
    if (process.env.NODE_ENV !== 'production') {
      // DailyStats.generate();
      return Statistics.insert(DailyStats.generate());
    }
  },
  getServerStats: function(){
    return DailyStats.generate();
  }
});
