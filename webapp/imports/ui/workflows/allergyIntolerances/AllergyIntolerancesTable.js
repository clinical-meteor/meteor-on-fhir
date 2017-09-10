import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';

export default class AllergyIntolerancesTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      allergyIntolerances: []
    }
    
    if(AllergyIntolerances.find().count() > 0){
      data.allergyIntolerances = AllergyIntolerances.find().fetch();
    }


    if(process.env.NODE_ENV === "test") console.log("data", data);
    return data;
  };


  rowClick(id){
    Session.set('allergyIntolerancesUpsert', false);
    Session.set('selectedAllergyIntolerance', id);
    Session.set('allergyIntolerancePageTabIndex', 2);
  };
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.allergyIntolerances.length; i++) {
      var newRow = {
        patientDisplay: '',
        asserterDisplay: '',
        clinicalStatus: '',
        snomedCode: '',
        snomedDisplay: '',
        evidenceDisplay: '',
        barcode: ''
      };
      // if (this.data.allergyIntolerances[i]){
      //   if(this.data.allergyIntolerances[i].patient){
      //     newRow.patientDisplay = this.data.allergyIntolerances[i].patient.display;
      //   }
      //   if(this.data.allergyIntolerances[i].asserter){
      //     newRow.asserterDisplay = this.data.allergyIntolerances[i].asserter.display;
      //   }
      //   if(this.data.allergyIntolerances[i].clinicalStatus){
      //     newRow.clinicalStatus = this.data.allergyIntolerances[i].clinicalStatus;
      //   }
      //   if(this.data.allergyIntolerances[i].code){
      //     if(this.data.allergyIntolerances[i].code.coding && this.data.allergyIntolerances[i].code.coding[0]){            
      //       newRow.snomedCode = this.data.allergyIntolerances[i].code.coding[0].code;
      //       newRow.snomedDisplay = this.data.allergyIntolerances[i].code.coding[0].display;
      //     }
      //   }
      //   if(this.data.allergyIntolerances[i].evidence && this.data.allergyIntolerances[i].evidence[0]){
      //     if(this.data.allergyIntolerances[i].evidence[0].detail && this.data.allergyIntolerances[i].evidence[0].detail[0]){            
      //       newRow.evidenceDisplay = this.data.allergyIntolerances[i].evidence[0].detail[0].display;
      //     }
      //   }
      //   if(this.data.allergyIntolerances[i]._id){
      //     newRow.barcode = this.data.allergyIntolerances[i]._id;
      //   }        
      // }

      tableRows.push(
        <tr key={i} className="allergyIntoleranceRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.allergyIntolerances[i]._id)} >

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
      <Table id='allergyIntolerancesTable' responses hover >
        <thead>
          <tr>
            <th className='patientDisplay'>patient</th>
            <th className='asserterDisplay'>asserter</th>
            <th className='clinicalStatus'>status</th>
            <th className='snomedCode'>code</th>
            <th className='snomedDisplay'>allergyIntolerance</th>
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


ReactMixin(AllergyIntolerancesTable.prototype, ReactMeteorData);
