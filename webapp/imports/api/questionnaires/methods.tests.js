/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
// import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { Questionnaires } from 'meteor/clinical:hl7-resource-questionnaire';
import { insertQuestionnaire, updateQuestionnaire, removeQuestionnaire } from './methods.js';

describe('Questionnaires methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      Questionnaires.find().forEach(function(questionnaire){
        Questionnaires.remove({_id: questionnaire._id});
      });
    }
  });

  it('inserts a document into the Questionnaires collection', function () {
    let questionnaireId = insertQuestionnaire.call({
      version: 1,
      publisher: 'Test'
    });
    let getQuestionnaire = Questionnaires.findOne({_id: questionnaireId });
    assert.equal(getQuestionnaire.publisher, 'Test');
    assert.equal(getQuestionnaire.version, 1);
  });

  it('updates a document in the Questionnaires collection', function () {
    const { _id } = Factory.create('questionnaire');

    updateQuestionnaire.call({
      _id,
      update: {
        version: 2,
        publisher: 'Lorem Ipsum...'
      }
    });

    const getQuestionnaire = Questionnaires.findOne(_id);
    assert.equal(getQuestionnaire.publisher, 'Lorem Ipsum...');
    assert.equal(getQuestionnaire.version, 2);
  });

  it('removes a document from the Questionnaires collection', function () {
    const { _id } = Factory.create('questionnaire');
    removeQuestionnaire.call({ _id });
    const getQuestionnaire = Questionnaires.findOne(_id);
    assert.equal(getQuestionnaire, undefined);
  });
});
