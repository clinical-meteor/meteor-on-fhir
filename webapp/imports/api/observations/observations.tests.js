/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { assert } from 'meteor/practicalmeteor:chai';
import { Observations } from './observations.js';

describe('Observations collection', function () {
  it('registers the collection with Mongo properly', function () {
    assert.equal(typeof Observations, 'object');
  });
});
