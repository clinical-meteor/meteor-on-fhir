
import {Meteor} from 'meteor/meteor';
import {Observations} from '/imports/api/observations/observations';
import {Statistics} from '/imports/api/statistics/statistics';

Meteor.publish("Statistics", function (){
  return Statistics.find();
});
Meteor.publish("CarePlans", function (){
  return CarePlans.find();
});
Meteor.publish("Observations", function (){
  return Observations.find();
});
