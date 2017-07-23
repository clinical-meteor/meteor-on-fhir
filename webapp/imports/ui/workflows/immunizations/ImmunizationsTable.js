import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';

export default class ImmunizationsTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      immunizations: []
    }
    
    if(Immunizations.find().count() > 0){
      data.immunizations = Immunizations.find().fetch();
    }


    if(process.env.NODE_ENV === "test") console.log("data", data);
    return data;
  };


  rowClick(id){
    Session.set('immunizationsUpsert', false);
    Session.set('selectedImmunization', id);
    Session.set('immunizationPageTabIndex', 2);
  };
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.immunizations.length; i++) {
      var newRow = {
        patientDisplay: '',
        asserterDisplay: '',
        clinicalStatus: '',
        snomedCode: '',
        snomedDisplay: '',
        evidenceDisplay: '',
        barcode: ''
      };
      // if (this.data.immunizations[i]){
      //   if(this.data.immunizations[i].patient){
      //     newRow.patientDisplay = this.data.immunizations[i].patient.display;
      //   }
      //   if(this.data.immunizations[i].asserter){
      //     newRow.asserterDisplay = this.data.immunizations[i].asserter.display;
      //   }
      //   if(this.data.immunizations[i].clinicalStatus){
      //     newRow.clinicalStatus = this.data.immunizations[i].clinicalStatus;
      //   }
      //   if(this.data.immunizations[i].code){
      //     if(this.data.immunizations[i].code.coding && this.data.immunizations[i].code.coding[0]){            
      //       newRow.snomedCode = this.data.immunizations[i].code.coding[0].code;
      //       newRow.snomedDisplay = this.data.immunizations[i].code.coding[0].display;
      //     }
      //   }
      //   if(this.data.immunizations[i].evidence && this.data.immunizations[i].evidence[0]){
      //     if(this.data.immunizations[i].evidence[0].detail && this.data.immunizations[i].evidence[0].detail[0]){            
      //       newRow.evidenceDisplay = this.data.immunizations[i].evidence[0].detail[0].display;
      //     }
      //   }
      //   if(this.data.immunizations[i]._id){
      //     newRow.barcode = this.data.immunizations[i]._id;
      //   }        
      // }

      tableRows.push(
        <tr key={i} className="immunizationRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.immunizations[i]._id)} >

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
      <Table id='immunizationsTable' responses hover >
        <thead>
          <tr>
            <th className='patientDisplay'>patient</th>
            <th className='asserterDisplay'>asserter</th>
            <th className='clinicalStatus'>status</th>
            <th className='snomedCode'>code</th>
            <th className='snomedDisplay'>immunization</th>
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


ReactMixin(ImmunizationsTable.prototype, ReactMeteorData);
