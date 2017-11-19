import { Topics } from '/imports/api/topics/topics';

Meteor.publish('topics', () => Topics.find());
