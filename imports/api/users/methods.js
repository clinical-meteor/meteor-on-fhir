
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertUser = new ValidatedMethod({
  name: 'users.insert',
  validate: function(){
    return true;
  },
  // validate: new SimpleSchema({
  //   title: { type: String },
  //   createdAt: { type: Date },
  // }).validator(),
  run(document) {
    Meteor.users.insert(document);
  },
});

export const updateUser = new ValidatedMethod({
  name: 'users.update',
  validate: function(){
    return true;
  },
  // validate: new SimpleSchema({
  //   _id: { type: String },
  //   'update.title': { type: String, optional: true },
  // }).validator(),
  run({ _id, update }) {
    Meteor.users.update(_id, { $set: update });
  },
});

export const removeUser = new ValidatedMethod({
  name: 'users.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    console.log("Removing user " + _id);
    Meteor.users.remove({_id: _id});
  },
});
