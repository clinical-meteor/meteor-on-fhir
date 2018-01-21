

import { CardHeader, CardText, CardTitle } from 'material-ui/Card';
import React, {Component} from 'react'
import { get, has, sortBy } from 'lodash';

import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { TimelineEvent } from 'react-event-timeline'
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

import StreetView from 'react-icons/lib/fa/street-view';
import Heartbeat from 'react-icons/lib/fa/heartbeat';
import Eye from 'react-icons/lib/fa/eye';
import EyeDropper from 'react-icons/lib/fa/eyedropper';
import Flask from 'react-icons/lib/fa/flask';
import ErlenmeyerFlask from 'react-icons/lib/io/erlenmeyer-flask';
import ErlenmeyerFlaskBubbles from 'react-icons/lib/io/erlenmeyer-flask-bubbles';
import List from 'react-icons/lib/fa/list';
import MapMarker from 'react-icons/lib/fa/map-marker';
import Medkit from 'react-icons/lib/fa/medkit';
import MedkitNormal from 'react-icons/lib/io/ios-medkit';
import MedkitOutline from 'react-icons/lib/io/ios-medkit-outline';
import Mobile from 'react-icons/lib/fa/mobile';
import Moon from 'react-icons/lib/fa/moon-o';
import Building from 'react-icons/lib/fa/building';
import Check from 'react-icons/lib/fa/check-circle';
import Pulse from 'react-icons/lib/go/pulse';
import Broadcast from 'react-icons/lib/go/broadcast';
import Bug from 'react-icons/lib/go/bug';
import Person from 'react-icons/lib/go/person';
import Organization from 'react-icons/lib/go/organization';
import Clipboard from 'react-icons/lib/io/clipboard';
import PulseNormal from 'react-icons/lib/io/ios-pulse';
import PulseStrong from 'react-icons/lib/io/ios-pulse-strong';
import Nuclear from 'react-icons/lib/io/nuclear';
import NoSmoking from 'react-icons/lib/io/no-smoking';
import Leaf from 'react-icons/lib/io/leaf';
import Ribbon from 'react-icons/lib/io/ribbon-b';
import Nutrition from 'react-icons/lib/io/ios-nutrition';
import MdLocalPhramacy from 'react-icons/lib/md/local-pharmacy';
import MdAddAlert from 'react-icons/lib/md/add-alert';
import MdList from 'react-icons/lib/md/list';
import MdDashboard from 'react-icons/lib/md/dashboard';
import MdDataUsage from 'react-icons/lib/md/data-usage';
import MdFingerprint from 'react-icons/lib/md/fingerprint';
import MdHearing from 'react-icons/lib/md/hearing';
import MdImportantDevices from 'react-icons/lib/md/important-devices';

//sortBy(result.shortestFoundPath, 'cardinality');


export class TimelinePage extends React.Component {
  constructor(props) {
    super(props);
  }

  getMeteorData() {
    let data = {
      ccd: null,
      timelineEntries: []
    }

    if(has(Meteor.user(), 'profile.continuityOfCare')){
      data.ccd = get(Meteor.user(), 'profile.continuityOfCare');

      if(get(Meteor.user(), 'profile.continuityOfCare.allergyIntolerances')){
        data.ccd.allergyIntolerances.forEach(function(record) {
          record.icon = <StreetView />;
          record.date = get(record, 'onsetDateTime', '');
          record.text = get(record, 'identifier[0].value', '');
          data.timelineEntries.push(record);
        });
      }

      if(get(Meteor.user(), 'profile.continuityOfCare.carePlans')){
        data.ccd.carePlans.forEach(function(record) {
          record.icon = <Clipboard />;
          record.date = get(record, 'period.start', '');
          record.text = get(record, 'title', '');
          data.timelineEntries.push(record);
        });
      }

      if(get(Meteor.user(), 'profile.continuityOfCare.conditions')){
        data.ccd.conditions.forEach(function(record) {
          record.icon = <Heartbeat />;
          record.date = get(record, 'onsetDateTime', '');
          record.text = get(record, 'identifier[0].value', '');
          data.timelineEntries.push(record);
        });
      }      

      if(get(Meteor.user(), 'profile.continuityOfCare.diagnosticReports')){
        data.ccd.diagnosticReports.forEach(function(record) {
          record.icon = <Clipboard />;
          record.date = get(record, 'period.start', '');
          record.text = get(record, 'conclusion', '');
          data.timelineEntries.push(record);
        });
      }      

      if(get(Meteor.user(), 'profile.continuityOfCare.immuizations')){
        data.ccd.immunizations.forEach(function(record) {
          record.icon = <EyeDropper />;
          record.date = get(record, 'date', '');
          record.text = get(record, 'identifier[0].type.text', '');
          data.timelineEntries.push(record);
        });
      }

      if(get(Meteor.user(), 'profile.continuityOfCare.medicationStatements')){
        data.ccd.medicationStatements.forEach(function(record) {
          record.icon = <MdLocalPhramacy />;
          record.date = get(record, 'effectiveDateTime', '');
          record.text = get(record, 'identifier[0].type.text', '');
          data.timelineEntries.push(record);
        });
      }

      if(get(Meteor.user(), 'profile.continuityOfCare.procedures')){
        data.ccd.procedures.forEach(function(record) {
          record.icon = <Nuclear />;
          record.date = record.effectiveDateTime;
          record.text = get(record, 'identifier[0].value', '');
          data.timelineEntries.push(record);
        });
      }      


      data.timelineEntries = sortBy(data.timelineEntries, 'date');
      // data.timelineEntries.sort(function compare(a, b) {
      //   var dateA = new Date(a.date);
      //   var dateB = new Date(b.date);
      //   return dateA - dateB;
      // });
    }

    if(process.env.NODE_ENV === "test") console.log("TimelinePage[data]", data);
    return data;
  };
  render(){
    
    var timelineEntries = [];
    for (var i = 0; i < this.data.timelineEntries.length; i++) {
      
      timelineEntries.push(
        <TimelineEvent 
          key={i}
          className='timelineEvent'
          createdAt={ moment(this.data.timelineEntries[i].date).format("YYYY-MM-DD") }
          icon={ this.data.timelineEntries[i].icon }
          iconStyle={{height: '80px', width: '80px', fontSize: '200%', border: 'none'}}
          contentStyle={{width: '500px'}}
          bubbleStyle={{border: '0px none'}}
          >
          <CardText>
            {/* { this.data.timelineEntries[i].icon } <br />             */}
            <h4 className='helveticas'>{ this.data.timelineEntries[i].text }</h4>
            <h5 className='helveticas' style={{color: 'gray'}}>{ this.data.timelineEntries[i].resourceType } </h5>
          </CardText>
        </TimelineEvent>
      )
    }

    return(
      <div id="TimelinePage">
        <VerticalCanvas >
          <Timeline className="timeline" style={{height: '100%'}}>
            { timelineEntries }          
          </Timeline>
        </VerticalCanvas>
      </div>
    );
  }
}
ReactMixin(TimelinePage.prototype, ReactMeteorData);



var s = {
  container: {
    position: 'relative',
    fontSize: '80%',
    fontWeight: 300,
    padding: '10px 0',
    width: '95%',
    margin: '0 auto'
  },
  containerBefore: {
    position: 'fixed',
    top: 0,
    left: 36,
    height: '10000%',
    // width: 2,
    // background: '#ffffff',
    borderLeft: '3px dashed lightgray'
  },
  containerAfter: {
    content: '',
    display: 'table',
    clear: 'both'
  }
}

class Timeline extends Component {

  render () {
    return (
      <div>
        <section style={s.container} {...this.props}>
          <div className='containerBefore timeline' style={s.containerBefore} />
          {this.props.children}
          <div className='containerAfter' style={s.containerAfter} />
        </section >
      </div>
    )
  }
}
