/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { Topics } from './topics.js';
import { insertTopic, updateTopic, removeTopic } from './methods.js';


describe('Topics collection', function () {
  it('registers the collection with Mongo properly', function () {
    assert.equal(typeof Topics, 'object');
  });
});

describe('Topics methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      resetDatabase();
    }
  });

  it('inserts a topic into the Topics collection', function () {
    insertTopic.call({
      name: 'The early bird catches the worm, but the nightowl gets the fieldmouse.',
      createdAt: new Date()
    });
    const topic = Topics.findOne({
      name: 'The early bird catches the worm, but the nightowl gets the fieldmouse.'
    });
    assert.equal(topic.name, 'The early bird catches the worm, but the nightowl gets the fieldmouse.');
  });

  it('updates a topic in the Topics collection', function () {
    const { _id } = Factory.create('topic');

    updateTopic.call({
      _id,
      update: {
        name: 'Never look a gift horse in the mouth.'
      }
    });

    const topic = Topics.findOne(_id);
    assert.equal(topic.name, 'Never look a gift horse in the mouth.');
  });

  it('removes a topic from the Topics collection', function () {
    const { _id } = Factory.create('topic');
    console.log("_id", _id);

    removeTopic.call({ _id });
    const topic = Topics.findOne(_id);
    assert.equal(topic, undefined);
  });
});
