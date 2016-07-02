import { Meteor } from 'meteor/meteor';
import { Statistics } from '../statistics';

Meteor.publish('statistics', () => Statistics.find());
