/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { Posts } from './posts.js';
import { insertPost, updatePost, removePost } from './methods.js';

describe('Posts methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      resetDatabase();
    }
  });

  it('inserts a document into the Posts collection', function () {
    insertPost.call({ title: 'You can\'t arrest me, I\'m the Cake Boss!' });
    const getPost = Posts.findOne({ title: 'You can\'t arrest me, I\'m the Cake Boss!' });
    assert.equal(getPost.title, 'You can\'t arrest me, I\'m the Cake Boss!');
  });

  it('updates a document in the Posts collection', function () {
    const { _id } = Factory.create('document');

    updatePost.call({
      _id,
      update: {
        title: 'You can\'t arrest me, I\'m the Cake Boss!',
      },
    });

    const getPost = Posts.findOne(_id);
    assert.equal(getPost.title, 'You can\'t arrest me, I\'m the Cake Boss!');
  });

  it('removes a document from the Posts collection', function () {
    const { _id } = Factory.create('document');
    removePost.call({ _id });
    const getPost = Posts.findOne(_id);
    assert.equal(getPost, undefined);
  });
});
