
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

//import { Patients } from 'meteor/accounts-base';


export const insertPatient = new ValidatedMethod({
  name: 'patients.insert',
  validate: new SimpleSchema({
    title: { type: String },
    createdAt: { type: Date }
  }).validator(),
  run(document) {
    Patients.insert(document);
  },
});

export const updatePatient = new ValidatedMethod({
  name: 'patients.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update.title': { type: String, optional: true },
  }).validator(),
  run({ _id, update }) {
    Patients.update(_id, { $set: update });
  },
});

export const removePatientById = new ValidatedMethod({
  name: 'patients.removeById',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    console.log("Removing user " + _id);
    Patients.remove({_id: _id});
  },
});
