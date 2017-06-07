import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
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
      conditions: []
    }
    
    if(Conditions.find().count() > 0){
      data.conditions = Conditions.find().fetch();
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
      var newRow = {
        patientDisplay: '',
        asserterDisplay: '',
        clinicalStatus: '',
        snomedCode: '',
        snomedDisplay: '',
        evidenceDisplay: '',
        barcode: ''
      };
      if (this.data.conditions[i]){
        if(this.data.conditions[i].patient){
          newRow.patientDisplay = this.data.conditions[i].patient.display;
        }
        if(this.data.conditions[i].asserter){
          newRow.asserterDisplay = this.data.conditions[i].asserter.display;
        }
        if(this.data.conditions[i].clinicalStatus){
          newRow.clinicalStatus = this.data.conditions[i].clinicalStatus;
        }
        if(this.data.conditions[i].code){
          if(this.data.conditions[i].code.coding && this.data.conditions[i].code.coding[0]){            
            newRow.snomedCode = this.data.conditions[i].code.coding[0].code;
            newRow.snomedDisplay = this.data.conditions[i].code.coding[0].display;
          }
        }
        if(this.data.conditions[i].evidence && this.data.conditions[i].evidence[0]){
          if(this.data.conditions[i].evidence[0].detail && this.data.conditions[i].evidence[0].detail[0]){            
            newRow.evidenceDisplay = this.data.conditions[i].evidence[0].detail[0].display;
          }
        }
        if(this.data.conditions[i]._id){
          newRow.barcode = this.data.conditions[i]._id;
        }        
      }

      tableRows.push(
        <tr key={i} className="conditionRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.conditions[i]._id)} >

          <td className='patientDisplay'>{ newRow.patientDisplay }</td>
          <td className='asserterDisplay'>{ newRow.asserterDisplay }</td>
          <td className='clinicalStatus'>{ newRow.clinicalStatus }</td>
          <td className='snomedCode'>{ newRow.snomedCode }</td>
          <td className='snomedDisplay'>{ newRow.snomedDisplay }</td>
          <td className='evidenceDisplay'>{ newRow.evidenceDisplay }</td>
          <td><span className="barcode">{ newRow.barcode }</span></td>
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
