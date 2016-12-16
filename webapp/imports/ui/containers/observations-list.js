import { composeWithTracker } from 'react-komposer';
import Observations from '../../api/observations/observations.js';
import ObservationsList from '../workflows/observations/ObservationsList.js';
import { Loading } from '/imports/ui/components/Loading';
import { Meteor } from 'meteor/meteor';

import ObservationsDeck from '../workflows/observations/ObservationsDeck.js';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('observations');
  if (subscription.ready()) {
    const observations = Observations.find({},{sort: {title: -1}}).fetch();
    onData(null, { observations });
  }
};

export default composeWithTracker(composer, Loading)(ObservationsList);
