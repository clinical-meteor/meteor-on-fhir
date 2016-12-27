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

          <td>{this.data.devices[i].type.text }</td>
          <td>{this.data.devices[i].manufacturer }</td>
          <td>{this.data.devices[i].model }</td>
          <td>{this.data.devices[i].serialNumber }</td>
          <td><span className="barcode">{ this.data.devices[i]._id }</span></td>
        </tr>
      )
    }

    return(
      <Table id='devicesTable' responses hover >
        <thead>
          <tr>
            <th>type</th>
            <th>manufacturer</th>
            <th>model</th>
            <th>serial number</th>
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
