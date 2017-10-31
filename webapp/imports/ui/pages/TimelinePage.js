// http://visjs.org/docs/timeline/index.html
// https://github.com/Lighthouse-io/react-visjs-timeline
// http://visjs.org/examples/timeline/interaction/animateWindow.html

import { CardHeader, CardText, CardTitle } from 'material-ui/Card';
import React, {Component} from 'react'
import { get, has, sortBy } from 'lodash';

import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { TimelineEvent } from 'react-event-timeline'
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

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

      data.ccd.immunizations.forEach(function(record) {
        // Object.keys(data.ccd.immunizations).forEach(function(record) {
          record.text = get(record, 'identifier[0].type.text', '');
          data.timelineEntries.push(record);
      });
      // Object.keys(data.ccd.allergyIntolerances).forEach(function(record) {
      data.ccd.allergyIntolerances.forEach(function(record) {
        record.date = record.assertedDate;
        record.text = get(record, 'identifier[0].value', '');
        data.timelineEntries.push(record);
      });
      // Object.keys(data.ccd.conditions).forEach(function(record) {
      data.ccd.conditions.forEach(function(record) {
        record.date = record.onsetDateTime;
        record.text = get(record, 'code.coding[0].display', '');
        data.timelineEntries.push(record);
      });
      // Object.keys(data.ccd.medicationStatements).forEach(function(record) {
      data.ccd.medicationStatements.forEach(function(record) {
        record.date = record.effectiveDateTime;
        record.text = get(record, 'medicationReference.display', '');
        data.timelineEntries.push(record);
      });
      // Object.keys(data.ccd.procedures).forEach(function(record) {
      data.ccd.procedures.forEach(function(record) {
        record.date = record.performedDateTime;
        record.text = get(record, 'code.text', '');
        data.timelineEntries.push(record);
      });
      // Object.keys(data.ccd.diagnosticReports).forEach(function(record) {
      data.ccd.diagnosticReports.forEach(function(record) {
        record.date = record.effectiveDateTime;
        record.text = get(record, 'conclusion', '');
        data.timelineEntries.push(record);
      });

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
          title={ this.data.timelineEntries[i].resourceType }
          createdAt={ moment(this.data.timelineEntries[i].date).format("YYYY, MMM DD") }
          icon={<i className="material-icons">textsms</i>}
          iconStyle={{height: '40px', width: '40px'}}
          contentStyle={{width: '768px'}}
        >
          <CardText>
            { this.data.timelineEntries[i].text }
          </CardText>
        </TimelineEvent>
      )
    }

    return(
      <div id="TimelinePage">
        <VerticalCanvas >
          <Timeline className="timeline" style={{height: '100%'}}>
            { timelineEntries }
            
            {/* <TimelineEvent 
              title="John Doe sent a SMS"
              createdAt="2016-09-12 10:06 PM"
              icon={<i className="material-icons">textsms</i>}
              iconStyle={{height: '40px', width: '40px'}}
            >
              <CardTitle title="Foo" />
              <CardText>
                I received the payment for $543. Should be shipping the item within a couple of hours.
              </CardText>
            </TimelineEvent>
            <TimelineEvent
                title="You sent an email to John Doe"
                createdAt="2016-09-11 09:06 AM"
                icon={<i className="material-icons md-18">email</i>}
                iconStyle={{height: '40px', width: '40px'}}
            >
                Like we talked, you said that you would share the shipment details? This is an urgent order and so I
                    am losing patience. Can you expedite the process and pls do share the details asap. Consider this a
                    gentle reminder if you are on track already!
            </TimelineEvent> */}
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
    content: '',
    position: 'absolute',
    top: 0,
    left: 36,
    height: '100%',
    width: 2,
    background: '#ffffff'
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
          <div style={s.containerBefore} />
          {this.props.children}
          <div style={s.containerAfter} />
        </section >
      </div>
    )
  }
}
