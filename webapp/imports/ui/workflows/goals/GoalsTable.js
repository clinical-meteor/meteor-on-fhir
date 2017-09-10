import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';

export default class GoalsTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      goals: []
    }
    
    if(Goals.find().count() > 0){
      data.goals = Goals.find().fetch();
    }


    if(process.env.NODE_ENV === "test") console.log("data", data);
    return data;
  };


  rowClick(id){
    Session.set('goalsUpsert', false);
    Session.set('selectedGoal', id);
    Session.set('goalPageTabIndex', 2);
  };
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.goals.length; i++) {
      var newRow = {
        patientDisplay: '',
        asserterDisplay: '',
        clinicalStatus: '',
        snomedCode: '',
        snomedDisplay: '',
        evidenceDisplay: '',
        barcode: ''
      };
      // if (this.data.goals[i]){
      //   if(this.data.goals[i].patient){
      //     newRow.patientDisplay = this.data.goals[i].patient.display;
      //   }
      //   if(this.data.goals[i].asserter){
      //     newRow.asserterDisplay = this.data.goals[i].asserter.display;
      //   }
      //   if(this.data.goals[i].clinicalStatus){
      //     newRow.clinicalStatus = this.data.goals[i].clinicalStatus;
      //   }
      //   if(this.data.goals[i].code){
      //     if(this.data.goals[i].code.coding && this.data.goals[i].code.coding[0]){            
      //       newRow.snomedCode = this.data.goals[i].code.coding[0].code;
      //       newRow.snomedDisplay = this.data.goals[i].code.coding[0].display;
      //     }
      //   }
      //   if(this.data.goals[i].evidence && this.data.goals[i].evidence[0]){
      //     if(this.data.goals[i].evidence[0].detail && this.data.goals[i].evidence[0].detail[0]){            
      //       newRow.evidenceDisplay = this.data.goals[i].evidence[0].detail[0].display;
      //     }
      //   }
      //   if(this.data.goals[i]._id){
      //     newRow.barcode = this.data.goals[i]._id;
      //   }        
      // }

      tableRows.push(
        <tr key={i} className="goalRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.goals[i]._id)} >

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
      <Table id='goalsTable' responses hover >
        <thead>
          <tr>
            <th className='patientDisplay'>patient</th>
            <th className='asserterDisplay'>asserter</th>
            <th className='clinicalStatus'>status</th>
            <th className='snomedCode'>code</th>
            <th className='snomedDisplay'>goal</th>
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


ReactMixin(GoalsTable.prototype, ReactMeteorData);
