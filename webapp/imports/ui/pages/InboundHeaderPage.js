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
      messages: []
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

          <td className='date'>{this.data.observations[i].effectiveDateTime }</td>
          <td className='barcode'><span className="barcode">{ this.data.observations[i]._id }</span></td>
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
                    <th className='date'>date</th>
                    <th className='barcode'>_id</th>
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
