/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { assert } from 'meteor/practicalmeteor:chai';
import { Devices } from './devices.js';

describe('Devices collection', function () {
  it('registers the collection with Mongo properly', function () {
    assert.equal(typeof Devices, 'object');
  });
});
