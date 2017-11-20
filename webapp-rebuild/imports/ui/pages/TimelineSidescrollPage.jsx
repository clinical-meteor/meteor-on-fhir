// http://visjs.org/docs/timeline/index.html
// https://github.com/Lighthouse-io/react-visjs-timeline
// http://visjs.org/examples/timeline/interaction/animateWindow.html
import React, { Component } from 'react';
import Timeline from 'react-visjs-timeline';
import moment from 'moment';

// http://visjs.org/docs/timeline/#Configuration_Options
const options = {
  width: '100%',
  height: '200px',
  stack: false,
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
  start: '2014-04-10',
  end: '2014-04-30'
}
const items = [{
  start: new Date(2010, 7, 15),
  end: new Date(2010, 8, 2),  // end is optional
  content: 'Trajectory A',
}]

const basicExample = {
  options: {
    start: '2014-04-10',
    end: '2014-04-30',
  },
  items: [
    {content: 'item 1', start: moment('2014-04-20').toDate(), type: 'point'},
    {content: 'item 2', start: moment('2014-04-14').toDate(), type: 'point'},
    {content: 'item 3', start: moment('2014-04-18').toDate(), type: 'point'},
    {content: 'item 4', start: moment('2014-04-16').toDate(), end: moment('2014-04-19')},
    {content: 'item 5', start: moment('2014-04-25').toDate(), type: 'point'},
    {content: 'item 6', start: moment('2014-04-27').toDate(), type: 'point'}
  ],
}


export class TimelineSidescrollPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id="horizontalTimeline">
        <Timeline options={options} items={basicExample.items} />
      </div>
    );
  }
}