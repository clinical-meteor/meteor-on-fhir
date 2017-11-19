import { Statistics } from './statistics';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertStatistic = new ValidatedMethod({
  name: 'statistics.insert',
  validate: new SimpleSchema({
    title: { type: String }
  }).validator(),
  run(document) {
    Statistics.insert(document);
  }
});

export const updateStatistic = new ValidatedMethod({
  name: 'statistics.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update.title': { type: String, optional: true }
  }).validator(),
  run({ _id, update }) {
    Statistics.update(_id, { $set: update });
  }
});

export const removeStatistic = new ValidatedMethod({
  name: 'statistics.remove',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    Statistics.remove(_id);
  }
});
