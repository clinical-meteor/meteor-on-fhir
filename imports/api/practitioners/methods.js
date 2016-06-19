
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertPractitioner = new ValidatedMethod({
  name: 'practitioners.insert',
  validate: new SimpleSchema({
    'name.text': { type: String },
    'identifier': { type: [ String ], optional: true },
    'gender': { type: String, optional: true },
    'active': { type: Boolean, optional: true },
    'photo.$.url': { type: String, optional: true }
  }).validator(),
  run(document) {
    console.log("insertPractitioner");
    console.log("document", document);

    Practitioners.insert(document);
  },
});

export const updatePractitioner = new ValidatedMethod({
  name: 'practitioners.update',
  validate: new SimpleSchema({
    '_id': { type: String },
    'update': { type: Object, blackbox: true, optional: true}
  }).validator(),
  run({ _id, update }) {
    console.log("updatePractitioner");
    console.log("_id", _id);
    console.log("update", update);

    let practitioner = Practitioners.findOne({_id: _id});

    delete practitioner._id;
    delete practitioner._document;
    delete practitioner._super_;
    practitioner.name.text = update.name.text;
    practitioner.gender = update.gender;
    practitioner.photo = update.gender.photo;

    console.log("differedPractitioner", practitioner);


    Practitioners.update(_id, { $set: practitioner });
  },
});

export const removePractitionerById = new ValidatedMethod({
  name: 'practitioners.removeById',
  validate:  new SimpleSchema({
    '_id': { type: String }
  }).validator(),
  run({ _id }) {
    console.log("Removing user " + _id);
    Practitioners.remove({_id: _id});
  },
});
