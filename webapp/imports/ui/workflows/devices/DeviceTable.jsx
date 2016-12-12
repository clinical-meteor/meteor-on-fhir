import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';

import { Table } from 'react-bootstrap';


export default class DeviceTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      devices: Devices.find().map(function(device){
        return {
          _id: device._id,
          deviceName: device.deviceName,
          deviceProductId: device.deviceProductId,
          patientId: device.patientId,
          createdBy: device.createdBy,
          createdAt: device.createdAt,
        };
      })
    }

    if (Session.get('darkroomEnabled')) {
      data.style.color = "black";
      data.style.background = "white";
    } else {
      data.style.color = "white";
      data.style.background = "black";
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = "blur(3px)";
      data.style.webkitFilter = "blur(3px)";
    }

    // this could be another mixin
    if (Session.get('backgroundBlurEnabled')) {
      data.style.backdropFilter = "blur(5px)";
    }

    if(process.env.NODE_ENV === "test") console.log("data", data);


    return data;
  };
  handleChange(row, key, value) {
    const source = this.state.source;
    source[row][key] = value;
    this.setState({source});
  };

  handleSelect(selected) {
    this.setState({selected});
  };
  getDate(){
    return "YYYY/MM/DD"
  };
  noChange(){
    return "";
  };
  rowClick(id){
    // set the user
    Session.set("selectedDevice", id);

    // set which tab is selected
    let state = Session.get('deviceCardState');
    state["index"] = 2;
    Session.set('deviceCardState', state);
  };
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.devices.length; i++) {
      tableRows.push(
        <tr key={i} className="deviceRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.devices[i]._id)} >

          <td>{this.data.devices[i].deviceName }</td>
          <td>{this.data.devices[i].deviceProductId }</td>
          <td>{this.data.devices[i].patientId }</td>
          <td><span className="barcode">{ this.data.devices[i]._id }</span></td>
        </tr>
      )
    }

    return(
      <Table responses hover >
        <thead>
          <tr>
            <th>name</th>
            <th>product id</th>
            <th>patientId</th>
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


DeviceTable.propTypes = {};
ReactMixin(DeviceTable.prototype, ReactMeteorData);
