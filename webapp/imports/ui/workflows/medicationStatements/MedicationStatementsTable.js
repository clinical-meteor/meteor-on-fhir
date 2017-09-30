import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import { get, has } from 'lodash';

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
      data.medicationStatements = [];
    }


    MedicationStatements.find().map(function(statement){
      var newRow = {
        '_id': statement._id,
        'medication': '',
        'basedOn': '',
        'effectiveDateTime': '',
        'dateAsserted': '',
        'informationSource': '',
        'subjectDisplay': '',
        'taken': '',
        'reasonCodeDisplay': '',
        'dosage': '',
      };
      console.log('statement', statement)

      if(get(statement), 'subject.display'){
        newRow.subjectDisplay = get(statement, 'subject.display');
      }        

      console.log('medicationReference.reference', get(statement, 'medicationReference.reference'));

      // display the reference if it's the only thing we have
      if(has(statement, 'medicationReference.reference')){
        newRow.medication = get(statement, 'medicationReference.reference');
      } 
      // but if there's a display value specified, use it instead
      if(has(statement, 'medicationReference.display')){
        newRow.medication = get(statement, 'medicationReference.display');
      } 
      // but best is to use a properly coded value
      if(has(statement, 'medicationCodeableConcept.coding[0].display')){
        newRow.medication = get(statement, 'medicationCodeableConcept.coding[0].display');
      }  

      if(has(statement, 'identifier[0].value')){
        newRow.identifier = get(statement, 'identifier[0].value');
      }        

      if(has(statement, 'effectiveDateTime')){
        newRow.effectiveDateTime = moment(get(statement, 'effectiveDateTime')).format("YYYY-MM-DD");
      }        

      if(has(statement, 'dateAsserted')){
        newRow.dateAsserted = moment(get(statement, 'dateAsserted')).format("YYYY-MM-DD");
      }        

      if(has(statement, 'informationSource.display')){
        newRow.informationSource = get(statement, 'informationSource.display');
      }        

      if(has(statement, 'taken')){
        newRow.taken = get(statement, 'taken');
      }        

      if(has(statement, 'reasonCode[0].coding[0].display')){
        newRow.reasonCodeDisplay = get(statement, 'reasonCode[0].coding[0].display');
      }  
      console.log('newRow', newRow);

      data.medicationStatements.push(newRow);
    });

    // console.log('newRow', newRow)

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

      tableRows.push(
        <tr key={i} className="medicationStatementRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.medicationStatements[i]._id)} >

          <td className='medication'>{ this.data.medicationStatements[i].medication }</td>
          {/* <td className='basedOn'>{ this.data.medicationStatements[i].basedOn }</td> */}
          <td className='effectiveDateTime'>{ this.data.medicationStatements[i].effectiveDateTime }</td>
          <td className='dateAsserted'>{ this.data.medicationStatements[i].dateAsserted }</td>
          <td className='informationSource'>{ this.data.medicationStatements[i].informationSource }</td>
          <td className='subject'>{ this.data.medicationStatements[i].subjectDisplay }</td>
          <td className='taken'>{ this.data.medicationStatements[i].taken }</td>
          <td className='reason'>{ this.data.medicationStatements[i].reasonCodeDisplay }</td>
          <td className='dosage'>{ this.data.medicationStatements[i].dosage }</td>
        </tr>
      )
    }

    return(
      <Table id='medicationStatementsTable' responses hover >
        <thead>
          <tr>
            <th className='medication'>medication</th>
            {/* <th className='basedOn'>based on</th> */}
            <th className='effectiveDateTime'>date /time</th>
            <th className='dateAsserted'>assertion</th>
            <th className='informationSource'>source</th>
            <th className='subject'>subject</th>
            <th className='taken'>taken</th>
            <th className='reason'>reason</th>
            <th className='dosage'>dosage</th>
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
