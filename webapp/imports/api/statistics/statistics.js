import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Statistics = new Mongo.Collection('Statistics');

Statistics.schema = new SimpleSchema({
  date: {
    type: new Date(),
    label: 'Date.'
  },
  usersCount: {
    type: new Number,
    label: 'Users Count'
  },
  postsCount: {
    type: new Number,
    label: 'Posts Count'
  },
  topicsCount: {
    type: new Number,
    label: 'Topics Count'
  },
  patientsCount: {
    type: new Number,
    label: 'Patients Count'
  },
  practitionersCount: {
    type: new Number,
    label: 'Practitioners Count'
  }
});

Statistics.attachSchema(Statistics.schema);



// import faker from 'faker';
// import { Factory } from 'meteor/dburles:factory';
// Factory.define('statistics', Statistics, {
//   title: () => faker.hacker.phrase(),
// });
