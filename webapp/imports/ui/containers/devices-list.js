import { composeWithTracker } from 'react-komposer';
import Devices from '../../api/devices/devices.js';
import DevicesList from '../workflows/devices/DevicesList.js';
import { Loading } from '/imports/ui/components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('devices');
  if (subscription.ready()) {
    const devices = Devices.find({},{sort: {title: -1}}).fetch();
    onData(null, { devices });
  }
};

export default composeWithTracker(composer, Loading)(DevicesList);
