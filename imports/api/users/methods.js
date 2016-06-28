
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

export const removeUserById = new ValidatedMethod({
  name: 'users.removeById',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    console.log("Removing user " + _id);
    Meteor.users.remove({_id: _id});
  },
});


export const setUserAvatar = new ValidatedMethod({
  name: 'users.setAvatar',
  validate: new SimpleSchema({
    _id: { type: String },
    avatar: { type: String }
  }).validator(),
  run({ _id, avatar }) {
    Meteor.users.update(_id, { $set: {'profile.avatar': avatar} });
  }
});

export const setUserTheme = new ValidatedMethod({
  name: 'users.setTheme',
  validate: new SimpleSchema({
    _id: { type: String },
    backgroundColor: { type: String, optional: true },
    backgroundImagePath: { type: String, optional: true },
    video: { type: String, optional: true }
  }).validator(),
  run({ _id, backgroundColor, backgroundImagePath }) {

    if (backgroundColor) {
      Meteor.users.update(_id, { $set: {
        'profile.theme.backgroundColor': backgroundColor
      }});
      Meteor.users.update(_id, { $unset: {
        'profile.theme.backgroundImagePath': ""
      }});
    }

    if (backgroundImagePath) {
      Meteor.users.update(_id, { $unset: {
        'profile.theme.backgroundColor': ""
      }});
      Meteor.users.update(_id, { $set: {
        'profile.theme.backgroundImagePath': backgroundImagePath
      }});
    }

  }
});

export const changeUserPassword = new ValidatedMethod({
  name: 'users.changePassword',
  validate: new SimpleSchema({
    _id: { type: String },
    password: { type: String }
  }).validator(),
  run({ _id, avatar }) {
    Meteor.users.update(_id, { $set: {'profile.avatar': avatar} });
  },
});
