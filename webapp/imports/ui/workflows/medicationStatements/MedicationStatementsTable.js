import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';

export default class MedicationStatementsTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      medicationStatements: []
    }
    
    if(MedicationStatements.find().count() > 0){
      data.medicationStatements = MedicationStatements.find().fetch();
    }


    if(process.env.NODE_ENV === "test") console.log("data", data);
    return data;
  };


  rowClick(id){
    Session.set('medicationStatementsUpsert', false);
    Session.set('selectedMedicationStatement', id);
    Session.set('medicationStatementPageTabIndex', 2);
  };
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.medicationStatements.length; i++) {
      var newRow = {
        patientDisplay: '',
        asserterDisplay: '',
        clinicalStatus: '',
        snomedCode: '',
        snomedDisplay: '',
        evidenceDisplay: '',
        barcode: ''
      };
      // if (this.data.medicationStatements[i]){
      //   if(this.data.medicationStatements[i].patient){
      //     newRow.patientDisplay = this.data.medicationStatements[i].patient.display;
      //   }
      //   if(this.data.medicationStatements[i].asserter){
      //     newRow.asserterDisplay = this.data.medicationStatements[i].asserter.display;
      //   }
      //   if(this.data.medicationStatements[i].clinicalStatus){
      //     newRow.clinicalStatus = this.data.medicationStatements[i].clinicalStatus;
      //   }
      //   if(this.data.medicationStatements[i].code){
      //     if(this.data.medicationStatements[i].code.coding && this.data.medicationStatements[i].code.coding[0]){            
      //       newRow.snomedCode = this.data.medicationStatements[i].code.coding[0].code;
      //       newRow.snomedDisplay = this.data.medicationStatements[i].code.coding[0].display;
      //     }
      //   }
      //   if(this.data.medicationStatements[i].evidence && this.data.medicationStatements[i].evidence[0]){
      //     if(this.data.medicationStatements[i].evidence[0].detail && this.data.medicationStatements[i].evidence[0].detail[0]){            
      //       newRow.evidenceDisplay = this.data.medicationStatements[i].evidence[0].detail[0].display;
      //     }
      //   }
      //   if(this.data.medicationStatements[i]._id){
      //     newRow.barcode = this.data.medicationStatements[i]._id;
      //   }        
      // }

      tableRows.push(
        <tr key={i} className="medicationStatementRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.medicationStatements[i]._id)} >

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
      <Table id='medicationStatementsTable' responses hover >
        <thead>
          <tr>
            <th className='patientDisplay'>patient</th>
            <th className='asserterDisplay'>asserter</th>
            <th className='clinicalStatus'>status</th>
            <th className='snomedCode'>code</th>
            <th className='snomedDisplay'>medicationStatement</th>
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


ReactMixin(MedicationStatementsTable.prototype, ReactMeteorData);
