//import { Questionnaires, FooSchema } from '/imports/api/questionnaires/questionnaires';
import { Questionnaires } from 'meteor/clinical:hl7-resource-questionnaire';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertQuestionnaire = new ValidatedMethod({
  name: 'questionnaires.insert',
  validate: new SimpleSchema({
    version: {
      type: Number,
      optional: true
    },
    publisher: {
      type: String,
      optional: true
    }
  }).validator(),
  run(surveyData) {

    let newQuestionnaire = {
      resourceType: 'Questionnaire',
      version: surveyData.version,
      status: "published",
      date: new Date(),
      publisher: surveyData.publisher
    };


    return Questionnaires.insert(newQuestionnaire, function(error){
      if (error) {
        if(process.env.NODE_ENV === "test") console.log("Questionnaires.insert[error]", error);
      }
    });
  }
});

export const updateQuestionnaire = new ValidatedMethod({
  name: 'questionnaires.update',
  validate: new SimpleSchema({
    '_id': {
      type: String
    },
    'update.version': {
      type: Number
    },
    'update.publisher': {
      type: String
    }
  }).validator(),
  run({ _id, update }) {

    // we're going to map the foo data onto a FHIR Questionnaire resource
    let updatedQuestionnaire = {
      resourceType: 'Questionnaire',
      version: update.version,
      status: "published",
      date: new Date(),
      publisher: update.publisher
    };
    Questionnaires.update(_id, { $set: updatedQuestionnaire });
  }
});

export const removeQuestionnaire = new ValidatedMethod({
  name: 'questionnaires.remove',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    Questionnaires.remove(_id);
  }
});



//-------------------------------------------------------------------------
// Factories

import { Factory } from 'meteor/dburles:factory';
Factory.define('questionnaire', Questionnaires, {
  resourceType: 'Questionnaire',
  version: "1",
  status: "published",
  date: new Date(),
  publisher: "System Test"
});
