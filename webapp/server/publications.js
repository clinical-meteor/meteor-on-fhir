
import {Meteor} from 'meteor/meteor';
import {Statistics} from '/imports/api/statistics/statistics';

Meteor.publish("Statistics", function (){
  return Statistics.find();
});






// 
// //==============================================================================
// // SiteStatistics
// // Originally developed as part of the fhir-server demo
// // Should rename to OAuthStatistics
//
// Meteor.publish("SiteStatistics", function () {
//   return SiteStatistics.find();
//
//   // // uncomment this block if only SysAdmins should be able to see stats
//   // if (Roles.userIsInRole(this.userId, ['sysadmin'])) {
//   //   return SiteStatistics.find();
//   // } else {
//   //   return [];
//   // }
// });
//
//
// Meteor.startup(function () {
//   if ((SiteStatistics.find({_id: "configuration"}).count() === 0)) {
//     SiteStatistics.insert({
//       _id: "configuration",
//       Patients: {
//         count: {
//           "read": 0,
//           "vread": 0,
//           "search-type": 0,
//           "delete": 0,
//           "update": 0,
//           "create": 0
//         }
//       }
//     });
//     console.log("Added Patients stats bucket.");
//   };
// });
