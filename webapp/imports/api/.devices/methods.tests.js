/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
// import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { Devices } from './devices.js';
import { insertDevice, updateDevice, removeDevice } from './methods.js';

describe('Devices methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      Devices.find().forEach(function(device){
        Devices.remove({_id: device._id});
      });
    }
  });

  it('inserts a document into the Devices collection', function () {
    let deviceId = insertDevice.call({ type: 'BACtrack' });
    let getDevice = Devices.findOne({_id: deviceId });
    assert.equal(getDevice.type.text, 'BACtrack');
  });

  it('updates a document in the Devices collection', function () {
    const { _id } = Factory.create('device');

    updateDevice.call({
      _id: _id,
      update: {
        type: 'BreathalyzerFu',
        identifier: 'xyz-123'
      }
    });

    const getDevice = Devices.findOne(_id);
    assert.equal(getDevice.type.text, 'BreathalyzerFu');
  });

  it('removes a document from the Devices collection', function () {
    const { _id } = Factory.create('document');
    removeDevice.call({ _id });
    const getDevice = Devices.findOne(_id);
    assert.equal(getDevice, undefined);
  });
});
