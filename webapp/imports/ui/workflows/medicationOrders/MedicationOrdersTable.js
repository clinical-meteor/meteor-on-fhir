import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';

export default class MedicationOrdersTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      medicationOrders: []
    }
    
    if(MedicationOrders.find().count() > 0){
      data.medicationOrders = MedicationOrders.find().fetch();
    }


    if(process.env.NODE_ENV === "test") console.log("data", data);
    return data;
  };


  rowClick(id){
    Session.set('medicationOrdersUpsert', false);
    Session.set('selectedMedicationOrder', id);
    Session.set('medicationOrderPageTabIndex', 2);
  };
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.medicationOrders.length; i++) {
      var newRow = {
        patientDisplay: '',
        asserterDisplay: '',
        clinicalStatus: '',
        snomedCode: '',
        snomedDisplay: '',
        evidenceDisplay: '',
        barcode: ''
      };
      // if (this.data.medicationOrders[i]){
      //   if(this.data.medicationOrders[i].patient){
      //     newRow.patientDisplay = this.data.medicationOrders[i].patient.display;
      //   }
      //   if(this.data.medicationOrders[i].asserter){
      //     newRow.asserterDisplay = this.data.medicationOrders[i].asserter.display;
      //   }
      //   if(this.data.medicationOrders[i].clinicalStatus){
      //     newRow.clinicalStatus = this.data.medicationOrders[i].clinicalStatus;
      //   }
      //   if(this.data.medicationOrders[i].code){
      //     if(this.data.medicationOrders[i].code.coding && this.data.medicationOrders[i].code.coding[0]){            
      //       newRow.snomedCode = this.data.medicationOrders[i].code.coding[0].code;
      //       newRow.snomedDisplay = this.data.medicationOrders[i].code.coding[0].display;
      //     }
      //   }
      //   if(this.data.medicationOrders[i].evidence && this.data.medicationOrders[i].evidence[0]){
      //     if(this.data.medicationOrders[i].evidence[0].detail && this.data.medicationOrders[i].evidence[0].detail[0]){            
      //       newRow.evidenceDisplay = this.data.medicationOrders[i].evidence[0].detail[0].display;
      //     }
      //   }
      //   if(this.data.medicationOrders[i]._id){
      //     newRow.barcode = this.data.medicationOrders[i]._id;
      //   }        
      // }

      tableRows.push(
        <tr key={i} className="medicationOrderRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.medicationOrders[i]._id)} >

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
      <Table id='medicationOrdersTable' responses hover >
        <thead>
          <tr>
            <th className='patientDisplay'>patient</th>
            <th className='asserterDisplay'>asserter</th>
            <th className='clinicalStatus'>status</th>
            <th className='snomedCode'>code</th>
            <th className='snomedDisplay'>medicationOrder</th>
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


ReactMixin(MedicationOrdersTable.prototype, ReactMeteorData);
