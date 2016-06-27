import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const Posts = new Mongo.Collection('Posts');

Posts.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'The title of the post.'
  },
  createdAt: {
    optional: true,
    type: Date,
    label: 'Date and time the post was created.'
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
  topicId: {
    optional: true,
    type: String,
    label: 'Topic ID.'
  }
});

Posts.attachSchema(Posts.schema);

Factory.define('post', Posts, {
  title: () => faker.hacker.phrase(),
  createdAt: () => new Date()
});
