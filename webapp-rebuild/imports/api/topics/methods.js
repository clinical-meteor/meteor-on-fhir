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
    'update.name': { type: String}
  }).validator(),
  run({ _id, update }) {
    console.log("updateTopic");

    let topic = Topics.findOne({_id: _id});

    delete topic._id;
    delete topic._document;
    delete topic._super_;

    topic.name = update.name;
    topic.createdAt = update.createdAt;
    topic.category = update.category;
    topic.replies = update.replies;
    topic.views = update.views;
    topic.activity = update.activity;
    topic.photo = [];

    // if (update.gender) {
    //   topic.photo.push({
    //     url: update.photo
    //   });
    // }

    Topics.update({_id: _id}, { $set: topic });

  }
});
export const removeTopic = new ValidatedMethod({
  name: 'topics.remove',
  validate:  new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    console.log("Removing topic " + _id);
    Topics.remove(_id);
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
