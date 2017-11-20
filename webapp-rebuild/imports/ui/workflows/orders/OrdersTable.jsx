import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';
import { Meteor } from 'meteor/meteor';

import { Table } from 'react-bootstrap';
import { Orders } from 'meteor/clinical:hl7-resource-order';

export default class OrderTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      orders: Orders.find().map(function(order){
        let result = {
          _id: '',
          category: '',
          orderValue: '',
          subject: '',
          status: '',
          device: '',
          createdBy: '',
          effectiveDateTime: '',
          unit: ''
        };

        result._id =  order._id;
        if (order.category && order.category.text) {
          result.category =  order.category.text;
        }
        if (order.valueQuantity && order.valueQuantity.value) {
          result.orderValue =  order.valueQuantity.value;
        }
        if (order.valueQuantity && order.valueQuantity.unit) {
          result.unit =  order.valueQuantity.unit;
        }
        if (order.subject && order.subject.display) {
          result.subject =  order.subject.display;
        }
        if (order.device && order.device.reference) {
          result.device =  order.device.reference;
        }
        result.status =  order.status;

        if (order.effectiveDateTime) {
          result.effectiveDateTime =  moment(order.effectiveDateTime).format("YYYY-MM-DD hh:ss a");
        }

        return result;
      })
    };

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

    if(process.env.NODE_ENV === "test") console.log("OrderTable[data]", data);
    return data;
  }
  handleChange(row, key, value) {
    const source = this.state.source;
    source[row][key] = value;
    this.setState({source});
  }

  handleSelect(selected) {
    this.setState({selected});
  }
  getDate(){
    return "YYYY/MM/DD";
  }
  noChange(){
    return "";
  }
  rowClick(id){
    Session.set("selectedOrder", id);
    Session.set('orderPageTabIndex', 2);
    Session.set('orderDetailState', false);
  }
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.orders.length; i++) {
      tableRows.push(
        <tr className="orderRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.orders[i]._id)} >

          <td className='category'>{this.data.orders[i].category }</td>
          <td className='value'>{this.data.orders[i].orderValue }</td>
          <td className='unit'>{this.data.orders[i].unit }</td>
          <td className='name'>{this.data.orders[i].subject }</td>
          <td className='subject.reference'>{this.data.orders[i].subjectId }</td>
          <td className='status'>{this.data.orders[i].status }</td>
          <td className='device.display'>{this.data.orders[i].device }</td>
          <td className='date'>{this.data.orders[i].effectiveDateTime }</td>
          <td className='barcode'><span className="barcode">{ this.data.orders[i]._id }</span></td>
        </tr>
      );
    }

    return(
      <CardText>
        <Table id="ordersTable" responses hover >
          <thead>
            <tr>
              <th className='category'>type</th>
              <th className='value'>value</th>
              <th className='unit'>unit</th>
              <th className='name'>subject</th>
              <th className='subject.reference'>subject id</th>
              <th className='status'>status</th>
              <th className='device.display'>source</th>
              <th className='date'>date</th>
              <th className='barcode'>_id</th>
            </tr>
          </thead>
          <tbody>
            { tableRows }
          </tbody>
        </Table>
      </CardText>
    );
  }
}


ReactMixin(OrderTable.prototype, ReactMeteorData);
