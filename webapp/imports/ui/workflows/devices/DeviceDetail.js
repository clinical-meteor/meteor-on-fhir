import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Bert } from 'meteor/themeteorchef:bert';

import { CardText, CardActions } from 'material-ui/Card';

let defaultDevice = {
  resourceType: 'Device',
  code: {
    text: ""
  },
  isBrand: true,
  manufacturer: {
    display: '',
    reference: ''
  },
  product: {
    form: {
      text: 'tablet'
    },
    ingredient: [{
      item: {
        resourceType: 'Substance',
        code: {
          text: ''
        },
        description: ''
      },
      instance: [{
        quantity: ''
      }]
    }]
  },
  package: {
    container: {
      text: 'bottle'
    },
    content: [{
      amount: {
        value: 30,
        unit: 'tablet'
      }
    }]
  }
};

Session.setDefault('deviceUpsert', false);
Session.setDefault('selectedDevice', false);


export default class DeviceDetail extends React.Component {
  getMeteorData() {
    let data = {
      deviceId: false,
      device: defaultDevice
    };

    if (Session.get('deviceUpsert')) {
      data.device = Session.get('deviceUpsert');
    } else {
      if (Session.get('selectedDevice')) {
        data.deviceId = Session.get('selectedDevice');
        console.log("selectedDevice", Session.get('selectedDevice'));

        let selectedDevice = Devices.findOne({_id: Session.get('selectedDevice')});
        console.log("selectedDevice", selectedDevice);

        if (selectedDevice) {
          data.device = selectedDevice;
        }
      } else {
        data.device = defaultDevice;
      }

    }

    return data;
  }


  // this could be a mixin
  changeState(field, event, value){
    let deviceUpdate;

    if(process.env.NODE_ENV === "test") console.log("DeviceDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new device
    if (Session.get('deviceUpsert')) {
      deviceUpdate = Session.get('deviceUpsert');
    } else {
      deviceUpdate = defaultDevice;
    }



    // if there's an existing device, use them
    if (Session.get('selectedDevice')) {
      deviceUpdate = this.data.device;
    }

    switch (field) {
      case "deviceName":
        deviceUpdate.code.text = value;
        break;
      case "manufacturerDisplay":
        deviceUpdate.manufacturer.display = value;
        break;
      case "deviceForm":
        deviceUpdate.product.form.text = value;
        break;
      case "activeIngredient":
        deviceUpdate.product.ingredient[0].item.code.text = value;
        break;
      case "activeIngredientQuantity":
        deviceUpdate.product.ingredient[0].instance[0].quantity = value;
        break;
      case "activeIngredientDescription":
        deviceUpdate.product.ingredient[0].item.description = value;
        break;
      default:

    }


    // deviceUpdate[field] = value;
    if(process.env.NODE_ENV === "test") console.log("deviceUpdate", deviceUpdate);

    Session.set('deviceUpsert', deviceUpdate);
  }
  openTab(index){
    // set which tab is selected
    let state = Session.get('deviceCardState');
    state["index"] = index;
    Session.set('deviceCardState', state);
  }


  render() {
    return (
      <div id={this.props.id} className="deviceDetail">
        <CardText>
          <TextField
            id='deviceNameInput'
            ref='deviceName'
            name='deviceName'
            floatingLabelText='Device Name'
            value={this.data.device.code.text}
            onChange={ this.changeState.bind(this, 'deviceName')}
            fullWidth
            /><br/>
          <TextField
            id='manufacturerDisplayInput'
            ref='manufacturerDisplay'
            name='manufacturerDisplay'
            floatingLabelText='Manufacturer'
            value={this.data.device.manufacturer.display ? this.data.device.manufacturer.display : ''}
            onChange={ this.changeState.bind(this, 'manufacturerDisplay')}
            fullWidth
            /><br/>
          <TextField
            id='deviceFormInput'
            ref='deviceForm'
            name='deviceForm'
            floatingLabelText='Substance Form'
            value={this.data.device.product.form.text}
            onChange={ this.changeState.bind(this, 'deviceForm')}
            fullWidth
            /><br/>
          <TextField
            id='activeIngredientInput'
            ref='activeIngredient'
            name='activeIngredient'
            floatingLabelText='Active Ingredient'
            value={this.data.device.product.ingredient[0].item.code.text}
            onChange={ this.changeState.bind(this, 'activeIngredient')}
            fullWidth
            /><br/>
          <TextField
            id='activeIngredientQuantityInput'
            ref='activeIngredientQuantity'
            name='activeIngredientQuantity'
            floatingLabelText='Quantity'
            value={this.data.device.product.ingredient[0].instance[0].quantity}
            onChange={ this.changeState.bind(this, 'activeIngredientQuantity')}
            fullWidth
            /><br/>
          <TextField
            id='activeIngredientDescriptionInput'
            ref='activeIngredientDescription'
            name='activeIngredientDescription'
            floatingLabelText='Active Ingredient Description'
            value={this.data.device.product.ingredient[0].item.description}
            onChange={ this.changeState.bind(this, 'activeIngredientDescription')}
            fullWidth
            /><br/>
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
          <RaisedButton id="saveDeviceButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
          <RaisedButton id="deleteDeviceButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveDeviceButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }


  // this could be a mixin
  handleSaveButton(){
    let deviceUpdate = Session.get('deviceUpsert', deviceUpdate);

    if(process.env.NODE_ENV === "test") console.log("deviceUpdate", deviceUpdate);


    if (Session.get('selectedDevice')) {
      if(process.env.NODE_ENV === "test") console.log("update practioner");
      delete deviceUpdate._id;

      Devices.update(
        {_id: Session.get('selectedDevice')}, {$set: deviceUpdate }, function(error) {
          if (error) {
            console.log("error", error);

            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert('Device updated!', 'success');
            Session.set('devicePageTabIndex', 1);
            Session.set('selectedDevice', false);
            Session.set('deviceUpsert', false);
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new device", deviceUpdate);

      Devices.insert(deviceUpdate, function(error) {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Device added!', 'success');
          Session.set('devicePageTabIndex', 1);
          Session.set('selectedDevice', false);
          Session.set('deviceUpsert', false);
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
        Session.set('devicePageTabIndex', 1);
        Session.set('selectedDevice', false);
        Session.set('deviceUpsert', false);
      }
    });
  }
}


DeviceDetail.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(DeviceDetail.prototype, ReactMeteorData);
