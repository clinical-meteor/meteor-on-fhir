// http://visjs.org/docs/timeline/index.html
// https://github.com/Lighthouse-io/react-visjs-timeline
// http://visjs.org/examples/timeline/interaction/animateWindow.html
import React, { Component } from 'react';
//import Timeline from 'react-visjs-timeline';
import Timeline from '../components/Timeline';
import moment from 'moment';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Session } from 'meteor/session';
import { has, get } from 'lodash';


// // http://visjs.org/docs/timeline/#Configuration_Options
// const options = {
//   width: '100%',
//   height: '200px',
//   stack: false,
//   showMajorLabels: true,
//   showCurrentTime: true,
//   zoomMin: 1000000,
//   //type: 'background',
//   format: {
//     minorLabels: {
//       minute: 'h:mma',
//       hour: 'ha'
//     }
//   },
//   start: '2014-04-10',
//   end: '2014-04-30'
// }
// const items = [{
//   start: new Date(2010, 7, 15),
//   end: new Date(2010, 8, 2),  // end is optional
//   content: 'Trajectory A',
// }]

// const basicExample = {
//   options: {
//     start: '2014-04-10',
//     end: '2014-04-30',
//   },
//   items: [
//     {content: 'item 1', start: moment('2014-04-20').toDate(), type: 'point'},
//     {content: 'item 2', start: moment('2014-04-14').toDate(), type: 'point'},
//     {content: 'item 3', start: moment('2014-04-18').toDate(), type: 'point'},
//     {content: 'item 4', start: moment('2014-04-16').toDate(), end: moment('2014-04-19')},
//     {content: 'item 5', start: moment('2014-04-25').toDate(), type: 'point'},
//     {content: 'item 6', start: moment('2014-04-27').toDate(), type: 'point'}
//   ],
// }


export class TimelineSidescrollPage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {
      options: {
        width: '100%',
        height: (Session.get('appHeight') - 128)+ 'px',
        stack: true,
        showMajorLabels: true,
        showCurrentTime: true,
        zoomMin: 1000000,
        //type: 'background',
        format: {
          minorLabels: {
            minute: 'h:mma',
            hour: 'ha'
          }
        },
        start: '1978-01-25',
        end: '2018-01-01',
        min: '1977-01-01',
        max: '2022-01-01', 
        groupOrder: 'content'  // groupOrder can be a property name or a sorting function'
      },
      groups: [],
      items: []
    }

    if(Meteor.userId()){
      var continuityOfCare = get(Meteor.user(), 'profile.continuityOfCare', {});

      if(continuityOfCare.allergyIntolerances){
        continuityOfCare.allergyIntolerances.forEach(function(allergy){
          data.items.push({
            content: allergy.identifier[0].value,
            group: 'Allergies',
            start: allergy.onsetDateTime,
            end: null,
            type: 'point'
          })   
        });  
      }
      if(continuityOfCare.carePlans){
        continuityOfCare.carePlans.forEach(function(carePlan){
          data.items.push({
            content: carePlan.title,
            group: 'CarePlans',
            start: carePlan.period.start,
            end: carePlan.period.end,
            type: 'range'
          })   
        });  
      }
      if(continuityOfCare.conditions){
        continuityOfCare.conditions.forEach(function(condition){
          data.items.push({
            content: condition.identifier[0].value,
            group: 'Conditions',
            start: condition.onsetDateTime,
            end: condition.abatementDateTime,
            type: condition.abatementDateTime ? 'range' : 'point'
          })   
        });  
      }
      if(continuityOfCare.immunizations){
        continuityOfCare.immunizations.forEach(function(immunization){
          data.items.push({
            content: immunization.identifier[0].type.text,
            group: 'immunizations',
            start: immunization.date,
            end: null,
            type: 'point'
          })   
        });  
      }
      if(continuityOfCare.imagingStudies){
        continuityOfCare.imagingStudies.forEach(function(imagingStudy){
          data.items.push({
            content: imagingStudy.description,
            group: 'imagingStudies',
            start: imagingStudy.started,
            type: 'point'
          })   
        });  
      }
      if(continuityOfCare.medicaitonStatements){
        continuityOfCare.medicaitonStatements.forEach(function(medicationStatement){
          data.items.push({
            content: medicationStatement.medicationReference.display,
            group: 'MedicationStatements',
            start: effectiveDateTime.started,
            type: 'point'
          })   
        });  
      }
      if(continuityOfCare.observations){
        continuityOfCare.observations.forEach(function(observation){
          data.items.push({
            content: observation.identifier[0].value,
            group: 'Observations',
            start: observation.effectiveDateTime,
            type: 'point'
          })   
        });  
      }
      if(continuityOfCare.procedures){
        continuityOfCare.procedures.forEach(function(procedure){
          data.items.push({
            content: procedure.identifier[0].value,
            group: 'Procedures',
            start: procedure.performedDateTime,
            type: 'point'
          })   
        });  
      }      
      


    }

    const now = moment().minutes(0).seconds(0).milliseconds(0)
    
      // create a data set with groups
    const names = ['Conditions', 'Medications', 'Observations', 'Procedures', "CarePlans", "Allergies", "Immunizations", "Imaging Studies"]
    for (let g = 0; g < names.length; g++) {
      data.groups.push({ id: names[g], content: names[g] })
    }

    return data;
  }
  
  render(){
    return(
      <div id="horizontalTimeline" style={{paddingTop: '64px', paddingBottom: '64px'}}>
        <Timeline options={this.data.options} items={this.data.items} groups={this.data.groups} />
      </div>
    );
  }
}
ReactMixin(TimelineSidescrollPage.prototype, ReactMeteorData);
