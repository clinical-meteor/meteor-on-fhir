import { Posts } from './posts';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertPost = new ValidatedMethod({
  name: 'posts.insert',
  validate: new SimpleSchema({
    title: { type: String },
    createdAt: { type: Date },
    'createdBy.display': { type: String, optional: true },
    'createdBy.reference': { type: String, optional: true },
    topicId: { type: String, optional: true }
  }).validator(),
  run(document) {
    Posts.insert(document);
  }
});

export const updatePost = new ValidatedMethod({
  name: 'posts.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update.title': { type: String, optional: true },
  }).validator(),
  run({ _id, update }) {
    Posts.update(_id, { $set: update });
  },
});

export const removePost = new ValidatedMethod({
  name: 'posts.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Posts.remove(_id);
  },
});
