import {Posts} from '/imports/api/posts/posts';
import {Topics} from '/imports/api/topics/topics';
import {Statistics} from '/imports/api/statistics/statistics';

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
      questionnaireResponsesCount: 0
    };

    if (Posts) {
      newDailyStat.postsCount = Posts.find().count();
    }
    if (Topics) {
      newDailyStat.topicsCount = Topics.find().count();
    }
    if (Patients) {
      newDailyStat.patientsCount = Patients.find().count();
    }
    if (Practitioners) {
      newDailyStat.practitionersCount = Practitioners.find().count();
    }
    // if (QuestionnaireResponses) {
    //   newDailyStat.postsCount = QuestionnaireResponses.find().count();
    // }
    
    console.log('newDailyStat', newDailyStat);

    return Statistics.insert(newDailyStat);
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
      DailyStats.generate();
    }
  }
});
