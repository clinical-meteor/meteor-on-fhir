import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import Input from 'react-toolbox/lib/input';
import { CardText, CardActions } from 'material-ui/Card';

import Button from 'react-toolbox/lib/button';

import { insertDevice, updateDevice, removeDeviceById } from '../../../api/devices/methods';
import { Bert } from 'meteor/themeteorchef:bert';

let defaultState = false;

Session.setDefault('deviceDetailState', defaultState);


export default class DeviceDetail extends React.Component {
  getMeteorData() {
    let data = {
      deviceId: false,
      device: {
        deviceName: "",
        deviceProductId: "",
        patientId: ""
      }
    };

    if (Session.get('selectedDevice')) {
      data.deviceId = Session.get('selectedDevice');

      let selectedDevice = Devices.findOne({_id: Session.get('selectedDevice')});
      if (selectedDevice) {
        data.device = {
          id: selectedDevice._id,
          deviceName: selectedDevice.deviceName,
          deviceProductId: selectedDevice.productId,
          patientId: selectedDevice.patientId
        };
      }
    }

    if (Session.get('deviceDetailState')) {
      data.device = Session.get('deviceDetailState');
    }

    return data;
  }

  render() {
    if(process.env.NODE_ENV === "test") console.log("In device detail render");
    return (
      <div className="deviceDetail">
        <CardText>
          <Input ref="name" type='text' label='name' name='name' value={this.data.device.deviceName} onChange={ this.changeState.bind(this, 'name')} />
          <Input ref="productid" type='text' label='productid' name='productid' value={this.data.device.deviceProductId} onChange={ this.changeState.bind(this, 'productid')} />
          <Input ref="patientid" type='text' label='patientid' name='patientid' value={this.data.device.patientId} onChange={ this.changeState.bind(this, 'patientid')} />
        </CardText>
        <CardActions>
          { this.determineButtons(this.data.deviceId) }
        </CardActions>
      </div>
    );
  }

  determineButtons(deviceId){
    if (deviceId) {
      return (
        <div>
          <Button label="Save" onClick={this.handleSaveDevice.bind(this)} />
          <Button label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <Button label="Save" onClick={this.handleSaveDevice.bind(this)} />
      );
    }
  }

  // this could be a mixin
  changeState(field, value){

    // by default, assume there's no other data and we're creating a new device
    let deviceUpdate = {
      id: "",
      deviceName: "",
      deviceProductId: "",
      patientId: ""
    };

    // if there's an existing device, use them
    if (Session.get('selectedDevice')) {
      deviceUpdate = this.data.device;
    }

    if (typeof Session.get('deviceDetailState') === "object") {
      deviceUpdate = Session.get('deviceDetailState');
    }

    deviceUpdate[field] = value;
    if(process.env.NODE_ENV === "test") console.log("deviceUpdate", deviceUpdate);
    Session.set('deviceDetailState', deviceUpdate);
  }

  openTab(index){
    // set which tab is selected
    let state = Session.get('deviceCardState');
    state["index"] = index;
    Session.set('deviceCardState', state);
  }

  // this could be a mixin
  handleSaveDevice(){
    if(process.env.NODE_ENV === "test") console.log("this", this);

    let deviceFormData = {
      'deviceName': [{'text': this.refs.name.refs.input.value}],
      'deviceProductId': [{'text': this.refs.productid.refs.input.value}],
      'devicePatientId': [{'text': this.refs.patientid.refs.input.value}]
    };

    if (this.refs.active.refs.input.value === "true") {
      deviceFormData.active = true;
    } else {
      deviceFormData.active = false;
    }

    if(process.env.NODE_ENV === "test") console.log("deviceFormData", deviceFormData);


    if (Session.get('selectedDevice')) {
      if(process.env.NODE_ENV === "test") console.log("update practioner");
      //Meteor.users.insert(deviceFormData);
      updateDevice.call(
        {_id: Session.get('selectedDevice'), update: deviceFormData }, (error) => {
          if (error) {
            if(process.env.NODE_ENV === "test") console.log("error", error);
            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert('Device updated!', 'success');
            this.openTab(1);
          }
        });
      } else {

      if(process.env.NODE_ENV === "test") console.log("create a new device", deviceFormData);

      //Meteor.users.insert(deviceFormData);
      insertDevice.call(deviceFormData, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Device added!', 'success');
          this.openTab(1);
        }
      });
    }
  }

  // this could be a mixin
  handleCancelButton(){
    if(process.env.NODE_ENV === "test") console.log("handleCancelButton");
  }

  handleDeleteButton(){
    removeDeviceById.call(
      {_id: Session.get('selectedDevice')}, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Device deleted!', 'success');
          this.openTab(1);
        }
      });
  }
}



ReactMixin(DeviceDetail.prototype, ReactMeteorData);
