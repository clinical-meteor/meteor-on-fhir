import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Topics } from '/imports/api/topics/topics';


export const insertTopic = new ValidatedMethod({
  name: 'topics.insert',
  // validate: function(){
  //   return true;
  // },
  validate: new SimpleSchema({
    'name': { type: String },
    'createdAt': { type: Date },
    // 'category': { type: [ String ], optional: true },
    // 'replies': { type: Number, optional: true },
    // 'views': { type: Number, optional: true },
    // 'activity': { type: Date, optional: true },
    'createdBy.display': { type: String, optional: true },
    'createdBy.reference': { type: String, optional: true },
    'createdBy.avatar': { type: String, optional: true },
    'photo.$.url': { type: String, optional: true }
  }).validator(),
  run(document) {
    console.log("insertTopic");

    document.replies = 0;
    document.views = 0;
    document.activity = new Date();

    console.log("document", document);

    return Topics.insert(document);
  }
});

export const updateTopic = new ValidatedMethod({
  name: 'topics.update',
  validate: new SimpleSchema({
    '_id': { type: String },
    'update': { type: Object, blackbox: true, optional: true}
  }).validator(),
  run({ _id, update }) {
    // console.log("updateTopic");
    // console.log("_id", _id);
    // console.log("update", update);

    let practitioner = Topics.findOne({_id: _id});

    delete practitioner._id;
    delete practitioner._document;
    delete practitioner._super_;
    practitioner.name = update.name;
    practitioner.createdAt = update.createdAt;
    practitioner.category = update.category;
    practitioner.replies = update.replies;
    practitioner.views = update.views;
    practitioner.activity = update.activity;
    practitioner.photo.push({
      url: update.gender.photo
    });

    Topics.update(_id, { $set: practitioner });
  }
});

export const removeTopicById = new ValidatedMethod({
  name: 'topics.removeById',
  validate:  new SimpleSchema({
    '_id': { type: String }
  }).validator(),
  run({ _id }) {
    console.log("Removing topic " + _id);
    Topics.remove({_id: _id});
  }
});
