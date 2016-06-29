import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const Topics = new Mongo.Collection('Topics');

Topics.schema = new SimpleSchema({
  'name': {
    type: String,
    label: 'Forum topic.'
  },
  'cateogry': {
    type: String,
    optional: true,
    label: 'Topic category.'
  },
  'replies': {
    type: Number,
    optional: true,
    label: 'Number of replies.'
  },
  'views': {
    type: Number,
    optional: true,
    label: 'Number of views.'
  },
  'createdAt': {
    type: Date,
    optional: true,
    label: 'Created at.'
  },
  'createdBy.display': {
    type: String,
    optional: true,
    label: 'CreatedBy.display.'
  },
  'createdBy.reference': {
    type: String,
    optional: true,
    label: 'CreatedBy.reference.'
  },
  'createdBy.avatar': {
    type: String,
    optional: true,
    label: 'Avatar of the user who crated the post.'
  },
  'activity': {
    type: Date,
    optional: true,
    label: 'Last activity.'
  },
  'photo.$.url': {
    type: String,
    optional: true,
    label: 'Users.'
  }
});

Topics.attachSchema(Topics.schema);

Factory.define('topic', Topics, {
  title: () => faker.hacker.phrase()
});
