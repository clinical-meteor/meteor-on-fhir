import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

import { CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { Table } from 'react-bootstrap';


export class InboundMessagesPage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {

    let query = {};
    let options = {
      sort: {timestamp: -1}
    };
    if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.defaults && Meteor.settings.public.defaults.paginationLimit) {
      options.limit = Meteor.settings.public.defaults.paginationLimit;
    }

    let data = {
      messages: MessageHeaders.find(query, options).map(function(header){
        let result = {
          _id: header._id,
          host: '',
          count: 0,
          patientId: '',
          data: '',
          timestamp: ''
        };
        if (header.source && header.source.endpoint) {
          result.host = header.source.endpoint;
        }
        if (header.timestamp) {
          result.date = moment(header.timestamp).format("llll");
        }
        if (header.data) {
          result.count = header.data.length;

          header.data.forEach(function(datum){
            // if this is the first resource, we can just add it
            if (result.data === '') {
              if (datum.resourceType) {
                // preference for an actual resource object
                result.data = datum.resourceType;

                if (datum.resourceType === "Patient") {
                  result.patientId = datum.name[0].text;

                  if(Patients.findOne({'name.0.text': datum.name[0].text})){
                    // decide what to do if the patient already exists
                  } else {
                    // patient doesn't exist; lets add them
                    Patients.insert(datum);
                  }
                }
              } else{
                // but we may need to fall back to a reference
                result.data = datum.reference.split('/')[0];
              }

            // otherwise, we need to make sure there is a comma
            } else {
              if (datum.resourceType) {
                // preference for an actual resource object
                result.data = result.data + ', ' + datum.resourceType;
              } else{
                // but we may need to fall back to a reference
                result.data = result.data + ', ' + datum.reference.split('/')[0];
              }
            }

            // if we have a display name that's unique, and not just a repeat of the resource type
            // then lets display it
            if (datum.display && (datum.display !== datum.reference.split('/')[0])) {
              result.patientId = datum.display;
            }
          });
        }
        return result;
      })
    };
    return data;
  }
  rowClick(id){
    Session.set("selectedMessage", id);
    //Session.set('messagePageTabIndex', 1);
  }
  render(){
    let tableRows = [];
    for (var i = 0; i < this.data.messages.length; i++) {
      tableRows.push(
        <tr className="messageRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.messages[i]._id)} >

          <td className='barcode'><span className="barcode">{ this.data.messages[i]._id }</span></td>
          <td className='date'>{this.data.messages[i].date }</td>
          <td className='host'>{this.data.messages[i].host }</td>
          <td className='data'>{this.data.messages[i].data }</td>
          <td className='patientId'>{this.data.messages[i].patientId }</td>
        </tr>
      );
    }

    return(
      <div id="inboundHeaderPage">
        <VerticalCanvas >
          <GlassCard>
            <CardTitle
              title="Inbound HL7 Messages"
            />
            <CardText>
              <Table id="inboundMessagesTable" responses hover >
                <thead>
                  <tr>
                    <th className='id'>message._id</th>
                    <th className='timestamp'>timestamp</th>
                    <th className='host'>host</th>
                    <th className='data'>resources</th>
                    <th className='patientId'>patient._id</th>
                  </tr>
                </thead>
                <tbody>
                  { tableRows }
                </tbody>
              </Table>


            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}


ReactMixin(InboundMessagesPage.prototype, ReactMeteorData);
