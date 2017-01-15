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
    optional: true,
    label: 'Users Count'
  },
  postsCount: {
    type: new Number,
    optional: true,
    label: 'Posts Count'
  },
  topicsCount: {
    type: new Number,
    optional: true,
    label: 'Topics Count'
  },
  patientsCount: {
    type: new Number,
    optional: true,
    label: 'Patients Count'
  },
  practitionersCount: {
    type: new Number,
    optional: true,
    label: 'Practitioners Count'
  },
  'counts.devices': {
    type: new Number,
    optional: true,
    label: 'Devices'
  },
  'counts.conditions': {
    type: new Number,
    optional: true,
    label: 'Conditions'
  },
  'counts.genotype': {
    type: new Number,
    optional: true,
    label: 'Genotype'
  },
  'counts.medications': {
    type: new Number,
    optional: true,
    label: 'Medications'
  },
  'counts.observations': {
    type: new Number,
    optional: true,
    label: 'Observations'
  },
  'counts.patients': {
    type: new Number,
    optional: true,
    label: 'Patients'
  },
  'counts.practitioners': {
    type: new Number,
    optional: true,
    label: 'Practitioners'
  },
  'counts.procedures': {
    type: new Number,
    optional: true,
    label: 'Procedures'
  },
  'counts.questionnaires': {
    type: new Number,
    optional: true,
    label: 'Questionnaires'
  },
  progressMax: {
    type: new Number,
    optional: true,
    label: 'Progress Max'
  }
});

Statistics.attachSchema(Statistics.schema);
