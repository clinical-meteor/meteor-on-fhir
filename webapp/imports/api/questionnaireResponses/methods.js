import { QuestionnaireResponses } from 'meteor/clinical:hl7-resource-questionnaire-response';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Meteor } from 'meteor/meteor';

export const insertQuestionnaireResponse = new ValidatedMethod({
  name: 'questionnaireResponses.insert',
  //survey response
  validate: new SimpleSchema({
    didDrink: {
      type: Boolean
    },
    firstDrink: {
      type: Date,
      optional: true
    },
    lastDrink: {
      type: Date,
      optional: true
    },
    numberDrinks: {
      type: Number,
      optional: true
    },
    estimatedBAC: {
      type: Number,
      decimal: true,
      optional: true
    }
  }).validator(),
  run(surveyData) {

    // we're going to map the survey data onto a FHIR QuestionnaireResponse resource
    let newQuestionnaireResponse = {
      resourceType: "QuestionnaireResource",
      identifier: {
        use: "usual",
        type: {
          text: "FooQuestionnaireResponse",
          coding: [{
            system: "dxrxmedical",
            version: "1",
            code: "dxrx",
            display: "Foo Survey Questionnaire",
            userSelected: false
          }]
        }
      },
      status: "completed",
      questionnaire: {
        display: "FooQuestionnaire",
        reference: "Questionnaires/FooQuestionnaire"
      },
      author: {
        display: '',
        reference: ''
      },
      subject: {
        display: '',
        reference: ''
      },
      source: {
        display: '',
        reference: ''
      },
      encounter: {
        display: '',
        reference: ''
      },
      group: {
        linkId: '',
        title: "BREATHALYZER SURVEY",
        text: "Foo Survey",
        required: false,
        repeats: true,
        question: [{
          linkId: "survey-question-1",
          text: "Have you drank today?",
          answer: [{
            valueBoolean: surveyData.didDrink
          }]
        }, {
          linkId: "survey-question-2",
          text: "When did you take your first drink today?",
          answer: [{
            valueString: surveyData.firstDrink.toString()
          }]
        }, {
          linkId: "survey-question-3",
          text: "When did you take your last drink today?",
          answer: [{
            valueString: surveyData.lastDrink.toString()
          }]
        }, {
          linkId: "survey-question-4",
          text: "How many drinks did you have today?",
          helpText: "Slide to select number of drinks",
          answer: [{
            valueString: surveyData.numberDrinks
          }]
        }, {
          linkId: "survey-question-5",
          text: "What is your estimated blood alcohol level?",
          helpText: "Slide to estimate level",
          answer: [{
            valueString: surveyData.estimatedBAC
          }]
        }]
      }
    };


    return QuestionnaireResponses.insert(newQuestionnaireResponse, function(error){
      if (error) {
        if(process.env.NODE_ENV === "test") console.log("QuestionnaireResponses.insert[error]", error);
      }
    });
  }
});

export const updateQuestionnaireResponse = new ValidatedMethod({
  name: 'questionnaireResponses.update',
  validate: new SimpleSchema({
    _id: {
      type: String
    },
    'update.didDrink': {
      type: Boolean
    },
    'update.firstDrink': {
      type: Date,
      optional: true
    },
    'update.lastDrink': {
      type: Date,
      optional: true
    },
    'update.numberDrinks': {
      type: Number,
      optional: true
    },
    'update.estimatedBAC': {
      type: Number,
      decimal: true,
      optional: true
    }
  }).validator(),
  run({ _id, update }) {

    // we're going to map the survey data onto a FHIR QuestionnaireResponse resource
    let updatedQuestionnaireResponse = {
      resourceType: "QuestionnaireResource",
      identifier: {
        use: "usual",
        type: {
          text: "FooQuestionnaireResponse",
          coding: [{
            system: "dxrxmedical",
            version: "1",
            code: "dxrx",
            display: "Foo Survey Questionnaire",
            userSelected: false
          }]
        }
      },
      status: "completed",
      questionnaire: {
        display: "FooQuestionnaire",
        reference: "Questionnaires/FooQuestionnaire"
      },
      author: {
        display: '',
        reference: 'Meteor.users/' + Meteor.userId
      },
      subject: {
        display: '',
        reference: 'Meteor.users/' + Meteor.userId
      },
      source: {
        display: '',
        reference: ''
      },
      encounter: {
        display: '',
        reference: ''
      },
      group: {
        linkId: '',
        title: "BREATHALYZER SURVEY",
        text: "Foo Survey",
        required: false,
        repeats: true,
        question: [{
          linkId: "survey-question-1",
          text: "Have you drank today?",
          answer: [{
            valueBoolean: update.didDrink
          }]
        }, {
          linkId: "survey-question-2",
          text: "When did you take your first drink today?",
          answer: [{
            valueString: update.firstDrink
          }]
        }, {
          linkId: "survey-question-3",
          text: "When did you take your last drink today?",
          answer: [{
            valueString: update.lastDrink
          }]
        }, {
          linkId: "survey-question-4",
          text: "How many drinks did you have today?",
          helpText: "Slide to select number of drinks",
          answer: [{
            valueString: update.numberDrinks
          }]
        }, {
          linkId: "survey-question-5",
          text: "What is your estimated blood alcohol level?",
          helpText: "Slide to estimate level",
          answer: [{
            valueString: update.estimatedBAC
          }]
        }]
      }
    };

    if (Meteor.users.findOne({_id: Meteor.userId})) {
      let user = Meteor.users.findOne({_id: Meteor.userId});
      if (user.emails && user.emails[0] && user.emails[0].address) {
        updatedQuestionnaireResponse.author.display = user.emails[0].address;
        updatedQuestionnaireResponse.subject.display = user.emails[0].address;
      }
    }
    QuestionnaireResponses.update(_id, { $set: updatedQuestionnaireResponse });
  }
});

export const removeQuestionnaireResponse = new ValidatedMethod({
  name: 'questionnaireResponses.remove',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    QuestionnaireResponses.remove(_id);
  }
});



//-------------------------------------------------------------------------
// Factories

import { Factory } from 'meteor/dburles:factory';
Factory.define('questionnaireResponse', QuestionnaireResponses, {
  resourceType: 'QuestionnaireResponse',
  version: "1",
  status: "published",
  date: new Date(),
  publisher: "System Test"
});
