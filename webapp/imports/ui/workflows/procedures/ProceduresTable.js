import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';

export default class ProceduresTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      procedures: []
    }
    
    if(Procedures.find().count() > 0){
      data.procedures = Procedures.find().fetch();
    }


    if(process.env.NODE_ENV === "test") console.log("ProceduresTable[data]", data);
    return data;
  };


  rowClick(id){
    Session.set('proceduresUpsert', false);
    Session.set('selectedProcedure', id);
    Session.set('procedurePageTabIndex', 2);
  };
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.procedures.length; i++) {
      var newRow = {
        status: '',
        isDone: '',
        code: ''        
      };
      if (this.data.procedures[i]){
        if(this.data.procedures[i].status){
          newRow.status = this.data.procedures[i].status;
        }
        if(this.data.procedures[i].isDone){
          newRow.isDone = this.data.procedures[i].isDone;
        }
        if(this.data.procedures[i].code && this.data.procedures[i].code.text){
          newRow.code = this.data.procedures[i].code.text;
        }
        // if(this.data.procedures[i].code){
        //   if(this.data.procedures[i].code.coding && this.data.procedures[i].code.coding[0]){            
        //     newRow.snomedCode = this.data.procedures[i].code.coding[0].code;
        //     newRow.snomedDisplay = this.data.procedures[i].code.coding[0].display;
        //   }
        // }
        // if(this.data.procedures[i].evidence && this.data.procedures[i].evidence[0]){
        //   if(this.data.procedures[i].evidence[0].detail && this.data.procedures[i].evidence[0].detail[0]){            
        //     newRow.evidenceDisplay = this.data.procedures[i].evidence[0].detail[0].display;
        //   }
        // }
        // if(this.data.procedures[i]._id){
        //   newRow.barcode = this.data.procedures[i]._id;
        // }        
      }

      tableRows.push(
        <tr key={i} className="procedureRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.procedures[i]._id)} >

          <td className='patientDisplay'>{ newRow.status }</td>
          <td className='patientDisplay'>{ newRow.isDone }</td>
          <td className='patientDisplay'>{ newRow.code }</td>
          {/*<td className='asserterDisplay'>{ newRow.asserterDisplay }</td>
          <td className='clinicalStatus'>{ newRow.clinicalStatus }</td>
          <td className='snomedCode'>{ newRow.snomedCode }</td>
          <td className='snomedDisplay'>{ newRow.snomedDisplay }</td>
          <td className='evidenceDisplay'>{ newRow.evidenceDisplay }</td>*/}
          <td><span className="barcode">{ newRow.barcode }</span></td>
        </tr>
      )
    }

    return(
      <Table id='proceduresTable' responses hover >
        <thead>
          <tr>
            <th className='status'>status</th>
            <th className='isDone'>isDone</th>
            <th className='code'>code</th>
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


ReactMixin(ProceduresTable.prototype, ReactMeteorData);
