import { Statistics } from '/imports/api/statistics/statistics';
import { Meteor } from 'meteor/meteor';

ShapeFiles = new Mongo.Collection('shapefiles');

// INSECURE; DELETE ME
if (Meteor.isClient){
  Meteor.subscribe('allPractitioners');
  Meteor.subscribe('statistics');
}

// INSECURE; DELETE ME
if (Meteor.isServer){
  Meteor.publish('allPractitioners', function (argument){
    return Practitioners.find();
  });
  Meteor.publish('statistics', function (){
    Statistics.find({},{limit: 90});
  });
}

