import {Posts} from '/imports/api/posts/posts';
import {Topics} from '/imports/api/topics/topics';
import {Statistics} from '/imports/api/statistics/statistics';

import { Meteor } from 'meteor/meteor';

Meteor.startup(function (){

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
});



Meteor.methods({
  generateDailyStat:function (){
    if (process.env.NODE_ENV !== 'production') {
      DailyStats.generate();
    }
  }
});


DailyStats = {
  generate: function(){
    let newDailyStat = {
      date: new Date(),
      usersCount: Meteor.users.find().count(),
      postsCount: Posts.find().count(),
      topicsCount: Topics.find().count(),
      patientsCount: Patients.find().count(),
      practitionersCount: Practitioners.find().count()
    };
    console.log('newDailyStat', newDailyStat);

    return Statistics.insert(newDailyStat);
  }
};
