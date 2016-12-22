import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { CardText, CardActions } from 'material-ui/Card';
import { createOrder, updateOrder, removeOrder } from '/imports/api/orders/methods';
import { Bert } from 'meteor/themeteorchef:bert';


let defaultOrder = {
  status: 'preliminary',
  category: {
    text: ''
  },
  effectiveDateTime: '',
  subject: {
    display: '',
    reference: ''
  },
  performer: {
    display: '',
    reference: ''
  },
  device: {
    display: '',
    reference: ''
  },
  valueQuantity: {
    value: '',
    unit: '',
    system: 'http://unitsofmeasure.org'
  }
};
Session.setDefault('orderDetailState', defaultOrder);


export default class OrderDetail extends React.Component {
  getMeteorData() {
    let data = {
      orderId: false,
      order: defaultOrder
    };

    if (Session.get('selectedOrder')) {
      data.orderId = Session.get('selectedOrder');

      let selectedOrder = Orders.findOne({
        _id: Session.get('selectedOrder')
      });
      console.log("selectedOrder", selectedOrder);


      if (selectedOrder) {
        data.order = selectedOrder;

        if (!Session.get('orderDetailState')) {
          Session.set('orderDetailState', selectedOrder);
        }
      }
    }

    if (Session.get('orderDetailState')) {
      data.order = Session.get('orderDetailState');
    }

    if(process.env.NODE_ENV === "test") console.log("OrderDetail[data]", data);
    return data;
  }

  render() {

    return (
      <div id={this.props.id} className="orderDetail">
        <CardText>
          <TextField
            id='categoryTextInput'
            ref='category.text'
            name='category.text'
            floatingLabelText='Category'
            value={this.data.order.category.text}
            onChange={ this.changeCategory.bind(this, 'category.text')}
            fullWidth
            /><br/>
          <TextField
            id='valueQuantityInput'
            ref='valueQuantity.value'
            name='valueQuantity.value'
            floatingLabelText='Value'
            value={this.data.order.valueQuantity.value}
            onChange={ this.changeQuantityValue.bind(this, 'valueQuantity.value')}
            fullWidth
            /><br/>
          <TextField
            id='valueQuantityUnitInput'
            ref='valueQuantity.unit'
            name='valueQuantity.unit'
            floatingLabelText='Unit'
            value={this.data.order.valueQuantity.unit}
            onChange={ this.changeQuantityUnit.bind(this, 'valueQuantity.unit')}
            fullWidth
            /><br/>
          <TextField
            id='deviceDisplayInput'
            ref='device.display'
            name='device.display'
            floatingLabelText='Device Name'
            value={this.data.order.device.display}
            onChange={ this.changeDeviceDisplay.bind(this, 'device.display')}
            fullWidth
            /><br/>
          <TextField
            id='subjectDisplayInput'
            ref='subject.display'
            name='subject.display'
            floatingLabelText='Subject Name'
            value={this.data.order.subject.display}
            onChange={ this.changeSubjectDisplay.bind(this, 'subject.display')}
            fullWidth
            /><br/>
          <TextField
            id='subjectIdInput'
            ref='subject.reference'
            name='subject.reference'
            floatingLabelText='Subject ID'
            value={this.data.order.subject.reference}
            onChange={ this.changeSubjectReference.bind(this, 'subject.reference')}
            fullWidth
            /><br/>

        </CardText>
        <CardActions>
          { this.determineButtons(this.data.orderId) }
        </CardActions>
      </div>
    );
  }
  determineButtons(orderId) {
    if (orderId) {
      return (
        <div>
          <RaisedButton id="saveOrderButton" label="Save" className="saveOrderButton" primary={true} onClick={this.handleSaveButton.bind(this)} />
          <RaisedButton id="deleteOrderButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return (
        <RaisedButton id="saveOrderButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }

  getOrder(){
    let orderUpdate = Session.get('orderDetailState');
    if (!orderUpdate) {
      orderUpdate = defaultOrder;
    }
  }

  changeCategory(field, event, value) {
    let orderUpdate = Session.get('orderDetailState');
    orderUpdate.category.text = value;
    Session.set('orderDetailState', orderUpdate);
  }
  changeQuantityValue(field, event, value) {
    let orderUpdate = Session.get('orderDetailState');
    orderUpdate.valueQuantity.value = value;
    Session.set('orderDetailState', orderUpdate);
  }
  changeQuantityUnit(field, event, value) {
    let orderUpdate = Session.get('orderDetailState');
    orderUpdate.valueQuantity.unit = value;
    Session.set('orderDetailState', orderUpdate);
  }
  changeDeviceDisplay(field, event, value) {
    let orderUpdate = Session.get('orderDetailState');
    orderUpdate.device.display = value;
    Session.set('orderDetailState', orderUpdate);
  }
  changeSubjectDisplay(field, event, value) {
    let orderUpdate = Session.get('orderDetailState');
    orderUpdate.subject.display = value;
    Session.set('orderDetailState', orderUpdate);
  }
  changeSubjectReference(field, event, value) {
    let orderUpdate = Session.get('orderDetailState');
    orderUpdate.subject.reference = value;
    Session.set('orderDetailState', orderUpdate);
  }


  openTab(index) {
    // set which tab is selected
    let state = Session.get('orderCardState');
    state["index"] = index;
    Session.set('orderCardState', state);
  }

  // this could be a mixin
  handleSaveButton() {
    if (process.env.NODE_ENV === "test") console.log("this", this);

    let orderFormData = Session.get('orderDetailState');
    orderFormData.valueQuantity.value = Number(orderFormData.valueQuantity.value);

    console.log("orderFormData", orderFormData);

    if (Session.get('selectedOrder')) {


      Orders.update({_id: Session.get('selectedOrder')}, {$set: orderFormData }, function(error, result){
        if (error) {
          if(process.env.NODE_ENV === "test") console.log("Orders.insert[error]", error);
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Order added!', 'success');
          Session.set('orderFormData', defaultOrder);
          Session.set('orderDetailState', defaultOrder);
          Session.set('orderPageTabIndex', 1);
        }
      });

      // updateOrder.call({
      //   _id: Session.get('selectedOrder'),
      //   update: orderFormData
      // }, function(error, result){
      //   if (error) {
      //     if (process.env.NODE_ENV === "test") console.log("error", error);
      //     Bert.alert(error.reason, 'danger');
      //   } else {
      //     Bert.alert('Order updated!', 'success');
      //     Session.set('orderFormData', defaultOrder);
      //     Session.set('orderDetailState', defaultOrder);
      //     Session.set('orderPageTabIndex', 1);
      //   }
      //   if (result) {
      //     console.log("result", result);
      //   }
      // });


    } else {

      orderFormData.effectiveDateTime = new Date();
      if (process.env.NODE_ENV === "test") console.log("create a new order", orderFormData);

      Orders.insert(orderFormData, function(error, result){
        if (error) {
          if(process.env.NODE_ENV === "test") console.log("Orders.insert[error]", error);
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Order added!', 'success');
          Session.set('orderFormData', defaultOrder);
          Session.set('orderDetailState', defaultOrder);
          Session.set('orderPageTabIndex', 1);
        }
      });

      // createOrder.call(orderFormData, function(error, result) {
      //   if (error) {
      //     Bert.alert(error.reason, 'danger');
      //   } else {
      //     Bert.alert('Order added!', 'success');
      //     Session.set('orderFormData', defaultOrder);
      //     Session.set('orderDetailState', defaultOrder);
      //     Session.set('orderPageTabIndex', 1);
      //   }
      //   if (result) {
      //     console.log("result", result);
      //   }
      // });
    }
  }

  // this could be a mixin
  handleCancelButton() {
    if (process.env.NODE_ENV === "test") console.log("handleCancelButton");
  }

  handleDeleteButton() {
    removeOrderById.call({
      _id: Session.get('selectedOrder')
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Order deleted!', 'success');
        this.openTab(1);
      }
    });
  }
}


OrderDetail.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(OrderDetail.prototype, ReactMeteorData);
