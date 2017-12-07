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
      data.items = get(Meteor.user(), 'profile.timeline');
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
