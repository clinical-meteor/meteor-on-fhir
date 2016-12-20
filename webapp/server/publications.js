
import {Meteor} from 'meteor/meteor';
import {Statistics} from '/imports/api/statistics/statistics';

Meteor.publish("Statistics", function (){
  return Statistics.find();
});
