import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

import { CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { Table } from 'react-bootstrap';


export class InboundHeaderPage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {
      messages: MessageHeaders.find({},{sort: {timestamp: -1}}).map(function(header){
        let result = {
          _id: header._id,
          count: 0,
          patientId: '',
          data: '',
          timestamp: ''
        };
        if (header.timestamp) {
          result.date = header.timestamp.toString();
        }
        if (header.data) {
          result.count = header.data.length;

          header.data.forEach(function(datum){
            if (result.data === '') {
              result.data = datum.resourceType;
            } else {
              result.data = result.data + ', ' + datum.resourceType;
            }

            if (datum.resourceType === "Patient") {
              result.patientId = '';
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

          <td className='date'>{this.data.messages[i].date }</td>
          <td className='count'>{this.data.messages[i].count }</td>
          <td className='patient'>{this.data.messages[i].patientId }</td>
          <td className='data'>{this.data.messages[i].data }</td>
          <td className='barcode'><span className="barcode">{ this.data.messages[i]._id }</span></td>
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
                    <th className='timestamp'>timestamp</th>
                    <th className='count'>count</th>
                    <th className='patient'>patient._id</th>
                    <th className='data'>resources</th>
                    <th className='id'>message._id</th>
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


ReactMixin(InboundHeaderPage.prototype, ReactMeteorData);
