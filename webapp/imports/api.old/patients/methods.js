
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

//import { Patients } from 'meteor/accounts-base';


export const insertPatient = new ValidatedMethod({
  name: 'patients.insert',
  validate: new SimpleSchema({
    'name.$.text': { type: String },
    'identifier': { type: [ String ], optional: true },
    'gender': { type: String, optional: true },
    'active': { type: Boolean, optional: true },
    'birthdate': { type: Date, optional: true },
    'photo.$.url': { type: String, optional: true }
  }).validator(),
  run(document) {

    Patients.insert(document);
  },
});

export const updatePatient = new ValidatedMethod({
  name: 'patients.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update': { type: Object, blackbox: true, optional: true}
  }).validator(),
  run({ _id, update }) {
    console.log("updatePatient");
    console.log("_id", _id);
    console.log("update", update);

    let patient = Patients.findOne({_id: _id});

    delete patient._id;
    delete patient._document;
    delete patient._super_;
    patient.name.text = update.name.text;
    patient.gender = update.gender;
    patient.photo = update.gender.photo;

    console.log("diffedPatient", patient);


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
