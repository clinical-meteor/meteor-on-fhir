import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';

import { Table } from 'react-bootstrap';


export default class ConditionsTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      conditions: Conditions.find().fetch()
    }


    if(process.env.NODE_ENV === "test") console.log("data", data);
    return data;
  };


  rowClick(id){
    Session.set('conditionsUpsert', false);
    Session.set('selectedCondition', id);
    Session.set('conditionPageTabIndex', 2);
  };
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.conditions.length; i++) {
      tableRows.push(
        <tr key={i} className="conditionRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.conditions[i]._id)} >

          <td className='patientDisplay'>{this.data.conditions[i].patient ? this.data.conditions[i].patient.display :  '' }</td>
          <td className='asserterDisplay'>{this.data.conditions[i].asserter ? this.data.conditions[i].asserter.display :  '' }</td>
          <td className='clinicalStatus'>{this.data.conditions[i].clinicalStatus }</td>
          <td className='snomedCode'>{ this.data.conditions[i].code.coding[0] ? this.data.conditions[i].code.coding[0].code :  '' }</td>
          <td className='snomedDisplay'>{this.data.conditions[i].code.coding[0].display }</td>
          <td className='evidenceDisplay'>{this.data.conditions[i].evidence[0].detail[0] ? this.data.conditions[i].evidence[0].detail[0].display :  '' }</td>
          <td><span className="barcode">{ this.data.conditions[i]._id }</span></td>
        </tr>
      )
    }

    return(
      <Table id='conditionsTable' responses hover >
        <thead>
          <tr>
            <th className='patientDisplay'>patient</th>
            <th className='asserterDisplay'>asserter</th>
            <th className='clinicalStatus'>status</th>
            <th className='snomedCode'>code</th>
            <th className='snomedDisplay'>condition</th>
            <th className='evidenceDisplay'>evidence</th>
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


ReactMixin(ConditionsTable.prototype, ReactMeteorData);
