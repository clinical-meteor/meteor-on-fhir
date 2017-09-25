import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';
import { get } from 'lodash';

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
        subjectDisplay: '',
        code: '',
        status: '',
        issued: '',
        performerDisplay: '',
        identifier: '',
        category: '',
        effectiveDate: ''
      };
      if (this.data.diagnosticReports[i]){
        if(this.data.diagnosticReports[i].patient.display){
          newRow.patientDisplay = get(this, 'data.diagnosticReports[i].patient.display');
        } else {
          newRow.patientDisplay = get(this, 'data.diagnosticReports[i].patient.reference');          
        }
        if(get(this, 'data.diagnosticReports[i].performer[0].display')){
          newRow.performerDisplay = get(this, 'data.diagnosticReports[i].performer[0].display');
        }
        if(get(this, 'data.diagnosticReports[i].code.text')){
          newRow.code = get(this, 'data.diagnosticReports[i].code.text');
        }
        if(get(this, 'data.diagnosticReports[i].status')){
          newRow.status = get(this, 'data.diagnosticReports[i].status');
        }
        if(get(this, 'data.diagnosticReports[i].issued')){
          newRow.issued = get(this, 'data.diagnosticReports[i].issued');
        }


      }

      tableRows.push(
        <tr key={i} className="diagnosticReportRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.diagnosticReports[i]._id)} >

          <td className='subjectDisplay'>{ newRow.subjectDisplay }</td>
          <td className='code'>{ newRow.code }</td>
          <td className='status'>{ newRow.status }</td>
          <td className='issued'>{ newRow.issued }</td>
          <td className='performerDisplay'>{ newRow.performerDisplay }</td>
          <td className='identifier'>{ newRow.identifier }</td>
          <td className='category'>{ newRow.category }</td>
          <td className='effectiveDate'>{ newRow.effectiveDate }</td>
        </tr>
      )
    }

    return(
      <Table id='diagnosticReportsTable' responses hover >
        <thead>
          <tr>
            <th className='subjectDisplay'>subject</th>
            <th className='code'>code</th>
            <th className='status'>status</th>
            <th className='issued'>issued</th>
            <th className='performerDisplay'>performer</th>
            <th className='identifier'>evidence</th>
            <th className='effectiveDateTime'>date/time</th>
            <th className='category'>category</th>
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
