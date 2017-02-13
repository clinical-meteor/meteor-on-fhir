import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';

import { Table } from 'react-bootstrap';


export default class DevicesTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      devices: Devices.find().fetch()
    }


    if(process.env.NODE_ENV === "test") console.log("data", data);
    return data;
  };


  rowClick(id){
    Session.set('devicesUpsert', false);
    Session.set('selectedDevice', id);
    Session.set('devicePageTabIndex', 2);
  };
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.devices.length; i++) {
      tableRows.push(
        <tr key={i} className="deviceRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.devices[i]._id)} >

          <td className='deviceType'>{this.data.devices[i].type.text }</td>
          <td className='manufacturer'>{this.data.devices[i].manufacturer }</td>
          <td className='deviceModel'>{this.data.devices[i].model }</td>
          <td className='serialNumber'>{this.data.devices[i].identifier[0] ? this.data.devices[i].identifier[0].value :  '' }</td>
          <td className="costOfOwnership">{ this.data.devices[i].note[0] ? this.data.devices[i].note[0].text : '' }</td>
          <td><span className="barcode">{ this.data.devices[i]._id }</span></td>
        </tr>
      );
    }

    return(
      <Table id='devicesTable' responses hover >
        F
        <thead>
          <tr>
            <th className='deviceType'>type</th>
            <th className='manufacturer'>manufacturer</th>
            <th className='deviceModel'>model</th>
            <th className='serialNumber'>serial number</th>
            <th className='costOfOwnership'>cost ($/year)</th>
            <th>_id</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}


ReactMixin(DevicesTable.prototype, ReactMeteorData);
