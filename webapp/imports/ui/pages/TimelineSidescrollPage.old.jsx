// http://visjs.org/docs/timeline/index.html
// https://github.com/Lighthouse-io/react-visjs-timeline
// http://visjs.org/examples/timeline/interaction/animateWindow.html
import React, { Component } from 'react';
import Timeline from 'react-visjs-timeline';
import moment from 'moment';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

// http://visjs.org/docs/timeline/#Configuration_Options
const options = {
  width: '100%',
  height: '300px',
  stack: false,
  showMajorLabels: true,
  showCurrentTime: true,
  zoomMin: 1000000,
  type: 'background',
  format: {
    minorLabels: {
      minute: 'h:mma',
      hour: 'ha'
    }
  }
}
const items = [{
  start: new Date(2010, 7, 15),
  end: new Date(2010, 8, 2),  // end is optional
  content: 'Trajectory A',
}]


export class TimelineSidescrollPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id="horizontalTimeline">
        <Timeline options={options} />
      </div>
    );
  }
}
