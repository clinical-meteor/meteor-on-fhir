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
    
    if(Immunizations.find({}, {$sort: {'identifier.type.text': 1}}).count() > 0){
      data.immunizations = Immunizations.find().fetch();
    }


    //if(process.env.NODE_ENV === "test"){
      console.log("ImmunizationsTable[data]", data)
    //};
    return data;
  };


  rowClick(id){
    Session.set('immunizationsUpsert', false);
    Session.set('selectedImmunization', id);
    Session.set('immunizationPageTabIndex', 2);
  };
  render () {
    console.log('this.data', this.data)

      let tableRows = [];
    for (var i = 0; i < this.data.immunizations.length; i++) {
      console.log('this.data.immunizations[i]', this.data.immunizations[i])
      var newRow = {
        status: '',
        notGiven: '',
        identifier: '',
        vaccine: '',
        snomedCode: '',
        snomedDisplay: '',
        evidenceDisplay: '',
        barcode: ''
      };
      if (this.data.immunizations[i]){
        if(this.data.immunizations[i].status){
          newRow.status = this.data.immunizations[i].status;
        }
        if(this.data.immunizations[i].notGiven){
          newRow.notGiven = this.data.immunizations[i].notGiven;
        }

        if(this.data.immunizations[i].identifier && this.data.immunizations[i].identifier[0]){
          console.log('this.data.immunizations[i].identifier', this.data.immunizations[i].identifier)
          this.data.immunizations[i].identifier.forEach(function(record){
            console.log('record', record)

            if(record.use == 'official'){              
              newRow.identifier = record.type.text;
            }
            if(record.use == 'secondary'){
              newRow.vaccine = newRow.vaccine + ' ' + record.type.text;
            }

          });
        }
        if(this.data.immunizations[i].vaccineCode && this.data.immunizations[i].vaccineCode.text){
          newRow.vaccineCode = this.data.immunizations[i].vaccineCode.text;
        }
        // if(this.data.immunizations[i].identifier && this.data.immunizations[i].identifier[0] && this.data.immunizations[i].identifier[0].type.text){
        //   newRow.identifier = this.data.immunizations[i].identifier[0].type.text;
        // }
        // if(this.data.immunizations[i].code){
        //   if(this.data.immunizations[i].code.coding && this.data.immunizations[i].code.coding[0]){            
        //     newRow.snomedCode = this.data.immunizations[i].code.coding[0].code;
        //     newRow.snomedDisplay = this.data.immunizations[i].code.coding[0].display;
        //   }
        // }
        // if(this.data.immunizations[i].evidence && this.data.immunizations[i].evidence[0]){
        //   if(this.data.immunizations[i].evidence[0].detail && this.data.immunizations[i].evidence[0].detail[0]){            
        //     newRow.evidenceDisplay = this.data.immunizations[i].evidence[0].detail[0].display;
        //   }
        // }
        // if(this.data.immunizations[i]._id){
        //   newRow.barcode = this.data.immunizations[i]._id;
        // }        
        if(this.data.immunizations[i]._id){
          newRow.barcode = this.data.immunizations[i]._id;
        }
      }

      tableRows.push(
        <tr key={i} className="immunizationRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.immunizations[i]._id)} >
          <td className='identifier'>{ newRow.identifier }</td>
          <td className='vaccine'>{ newRow.vaccine }</td>
          <td className='vaccineCode'>{ newRow.vaccineCode }</td>
        </tr>
      )
    }

    return(
      <Table id='immunizationsTable' responses hover >
        <thead>
          <tr>
            <th className='identifier'>identifier</th>
            <th className='vaccine'>vaccine</th>
            <th className='vaccineCode'>vaccineCode</th>
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
