import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import { AppNavigation } from '/imports/ui/components/AppNavigation.scrap';

const composer = (props, onData) => {
  onData(null, { hasUser: Meteor.user() });
};

export default composeWithTracker(composer, {}, {}, { pure: false })(AppNavigation);
