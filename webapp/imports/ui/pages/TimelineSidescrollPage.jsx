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
        format: {
          minorLabels: {
            minute: 'h:mma',
            hour: 'ha'
          }
        },
        start: '1978-01-25',
        end: moment().format("YYYY-MM-DD"),
        min: '1977-04-25',
        max: '2054-01-01', 
        groupOrder: 'content'  // groupOrder can be a property name or a sorting function'
      },
      groups: [],
      items: []
    }

    if(Meteor.userId()){
      var continuityOfCare = get(Meteor.user(), 'profile.continuityOfCare', {});

      data.items.push({
        start: '1977-04-25',
        end: '1978-01-25',
        type: 'background',
        style: 'background-color: #ecdcde; opacity: 0.5;'
      })   

      data.items.push({
        start: '1988-01-25',
        end: '1995-01-25',
        type: 'background',
        style: 'background-color: #ecdcde; opacity: 0.5;'
      })   

      if(continuityOfCare.allergyIntolerances){
        continuityOfCare.allergyIntolerances.forEach(function(allergy){
          data.items.push({
            content: get(allergy, 'identifier[0].value'),
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
            start: get(carePlan, 'period.start', null),
            end: get(carePlan, 'period.end', null),
            type: 'range',
            style: "background-color: white; border-color: lightgray;"
          })   
        });  
      }
      if(continuityOfCare.conditions){
        continuityOfCare.conditions.forEach(function(condition){
          data.items.push({
            content: get(condition, 'identifier[0].value') ? get(condition, 'identifier[0].value', '') : get(condition, 'code.coding[0].display', ''),
            group: 'Conditions',
            start: condition.onsetDateTime,
            end: condition.abatementDateTime,
            type: condition.abatementDateTime ? 'range' : 'point',
            style: condition.abatementDateTime ? "background-color: white; border-color: lightgray;" : ""
          })   
        });  
      }
      if(continuityOfCare.immunizations){
        continuityOfCare.immunizations.forEach(function(immunization){
          data.items.push({
            content: get(immunization, 'identifier[0].type.text'),
            group: 'Immunizations',
            start: get(immunization, 'date'),
            end: null,
            type: 'point'
          })   
        });  
      }
      if(continuityOfCare.imagingStudies){
        continuityOfCare.imagingStudies.forEach(function(imagingStudy){
          console.log('imagingStudy', imagingStudy);
          data.items.push({
            content: get(imagingStudy, 'description'),
            group: 'ImagingStudies',
            start: get(imagingStudy, 'started', null),
            type: 'point'
          })   
        });  
      }
      if(continuityOfCare.medicationStatements){
        continuityOfCare.medicationStatements.forEach(function(medicationStatement){
          console.log('medicationStatement', medicationStatement);
          if(get(medicationStatement, 'effectiveDateTime')){
            data.items.push({
              content: get(medicationStatement, 'medicationReference.display', ''),
              group: 'MedicationStatements',
              start: get(medicationStatement, 'effectiveDateTime', null),
              type: 'point'
            });  
          }
        });  
      }
      if(continuityOfCare.observations){
        continuityOfCare.observations.forEach(function(observation){
          //console.log('observation', observation);
          data.items.push({
            content: get(observation, 'identifier[0].value'),
            group: 'Observations',
            start: get(observation, 'effectiveDateTime', null),
            type: 'point'
          })   
        });  
      }
      if(continuityOfCare.procedures){
        continuityOfCare.procedures.forEach(function(procedure){
          //console.log('procedure', procedure);
          data.items.push({
            content: get(procedure, 'identifier[0].value') ? get(procedure, 'identifier[0].value') : get(procedure, 'code.text'),
            group: 'Procedures',
            start: get(procedure, 'performedDateTime'),
            type: 'point'
          })   
        });  
      }      
      


    }

    // const now = moment().minutes(0).seconds(0).milliseconds(0);
    
      // create a data set with groups
    const names = ['Conditions', 'MedicationStatements', 'Observations', 'Procedures', "CarePlans", "Allergies", "Immunizations", "Imaging Studies"]
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
