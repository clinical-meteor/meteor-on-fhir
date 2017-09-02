import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';

export default class DiagnosticReportsTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      diagnosticReports: []
    }
    
    if(DiagnosticReports.find().count() > 0){
      data.diagnosticReports = DiagnosticReports.find().fetch();
    }


    if(process.env.NODE_ENV === "test") console.log("data", data);
    return data;
  };


  rowClick(id){
    Session.set('diagnosticReportsUpsert', false);
    Session.set('selectedDiagnosticReport', id);
    Session.set('diagnosticReportPageTabIndex', 2);
  };
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.diagnosticReports.length; i++) {
      var newRow = {
        patientDisplay: '',
        asserterDisplay: '',
        clinicalStatus: '',
        snomedCode: '',
        snomedDisplay: '',
        evidenceDisplay: '',
        barcode: ''
      };
      // if (this.data.diagnosticReports[i]){
      //   if(this.data.diagnosticReports[i].patient){
      //     newRow.patientDisplay = this.data.diagnosticReports[i].patient.display;
      //   }
      //   if(this.data.diagnosticReports[i].asserter){
      //     newRow.asserterDisplay = this.data.diagnosticReports[i].asserter.display;
      //   }
      //   if(this.data.diagnosticReports[i].clinicalStatus){
      //     newRow.clinicalStatus = this.data.diagnosticReports[i].clinicalStatus;
      //   }
      //   if(this.data.diagnosticReports[i].code){
      //     if(this.data.diagnosticReports[i].code.coding && this.data.diagnosticReports[i].code.coding[0]){            
      //       newRow.snomedCode = this.data.diagnosticReports[i].code.coding[0].code;
      //       newRow.snomedDisplay = this.data.diagnosticReports[i].code.coding[0].display;
      //     }
      //   }
      //   if(this.data.diagnosticReports[i].evidence && this.data.diagnosticReports[i].evidence[0]){
      //     if(this.data.diagnosticReports[i].evidence[0].detail && this.data.diagnosticReports[i].evidence[0].detail[0]){            
      //       newRow.evidenceDisplay = this.data.diagnosticReports[i].evidence[0].detail[0].display;
      //     }
      //   }
      //   if(this.data.diagnosticReports[i]._id){
      //     newRow.barcode = this.data.diagnosticReports[i]._id;
      //   }        
      // }

      tableRows.push(
        <tr key={i} className="diagnosticReportRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.diagnosticReports[i]._id)} >

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
      <Table id='diagnosticReportsTable' responses hover >
        <thead>
          <tr>
            <th className='patientDisplay'>patient</th>
            <th className='asserterDisplay'>asserter</th>
            <th className='clinicalStatus'>status</th>
            <th className='snomedCode'>code</th>
            <th className='snomedDisplay'>diagnosticReport</th>
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


ReactMixin(DiagnosticReportsTable.prototype, ReactMeteorData);
