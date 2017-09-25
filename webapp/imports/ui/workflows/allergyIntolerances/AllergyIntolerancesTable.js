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
        name: '',
        type: '',
        category: '',
        clinicalStatus: '',
        verificationStatus: '',
        snomedCode: '',
        snomedDisplay: '',
        evidenceDisplay: '',
        barcode: ''
      };
      if (this.data.allergyIntolerances[i]){

        if(this.data.allergyIntolerances[i].identifier && this.data.allergyIntolerances[i].identifier[0] && this.data.allergyIntolerances[i].identifier[0].value){
          newRow.name = this.data.allergyIntolerances[i].identifier[0].value;
        }
        if(this.data.allergyIntolerances[i].clinicalStatus){
          newRow.clinicalStatus = this.data.allergyIntolerances[i].clinicalStatus;
        }
        if(this.data.allergyIntolerances[i].verificationStatus){
          newRow.verificationStatus = this.data.allergyIntolerances[i].verificationStatus;
        }
        if(this.data.allergyIntolerances[i].type){
          newRow.type = this.data.allergyIntolerances[i].type;
        }
        if(this.data.allergyIntolerances[i].category && this.data.allergyIntolerances[i].category[0]){
          newRow.category = this.data.allergyIntolerances[i].category[0];
        }
        if(this.data.allergyIntolerances[i].code){
          if(this.data.allergyIntolerances[i].code.coding && this.data.allergyIntolerances[i].code.coding[0]){            
            newRow.snomedCode = this.data.allergyIntolerances[i].code.coding[0].code;
            newRow.snomedDisplay = this.data.allergyIntolerances[i].code.coding[0].display;
          }
        }    
      }

      tableRows.push(
        <tr key={i} className="allergyIntoleranceRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.allergyIntolerances[i]._id)} >
          <td className='identifier'>{ newRow.name }</td>
          <td className='clinicalStatus'>{ newRow.clinicalStatus }</td>
          <td className='verificationStatus'>{ newRow.verificationStatus }</td>
          <td className='type'>{ newRow.type }</td>
          <td className='category'>{ newRow.category }</td>
        </tr>
      )
    }

    return(
      <Table id='allergyIntolerancesTable' responses hover >
        <thead>
          <tr>
            <th className='identifier'>name</th>
            <th className='clinicalStatus'>status</th>
            <th className='verificationStatus'>verification</th>
            <th className='type'>type</th>
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


ReactMixin(AllergyIntolerancesTable.prototype, ReactMeteorData);