import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const Posts = new Mongo.Collection('Posts');

Posts.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'The title of the document.',
  },
});

Posts.attachSchema(Posts.schema);

Factory.define('post', Posts, {
  title: () => faker.hacker.phrase(),
});
