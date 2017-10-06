import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';
import Toggle from 'material-ui/Toggle';

export default class ImmunizationsTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      immunizations: [],
      displayToggle: false,
      displayDates: false
    }

    if(this.props.displayToggles){
      data.displayToggle = this.props.displayToggles;
    }
    if(this.props.displayDates){
      data.displayDates = this.props.displayDates;
    }
    if(this.props.data){
      data.immunizations = this.props.data;
    } else {
      if(Immunizations.find({}, {$sort: {'identifier.type.text': 1}}).count() > 0){
        data.immunizations = Immunizations.find().fetch();
      }
    }
    //if(process.env.NODE_ENV === "test"){
      console.log("ImmunizationsTable[data]", data)
    //};
    return data;
  };


  renderTogglesHeader(displayToggle){
    if (displayToggle) {
      return (
        <th className="toggle">toggle</th>
      );
    }
  }
  renderToggles(displayToggle, patientId ){
    if (displayToggle) {
      return (
        <td className="toggle">
            <Toggle
              defaultToggled={true}
              //style={styles.toggle}
            />
          </td>
      );
    }
  }
  renderDateHeader(displayDates){
    if (displayDates) {
      return (
        <th className='date'>date</th>
      );
    }
  }
  renderDate(displayDates, newDate ){
    if (displayDates) {
      return (
        <td className='date'>{ moment(newDate).format('YYYY-MM-DD') }</td>
      );
    }
  }


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
        if(this.data.immunizations[i]._id){
          newRow.barcode = this.data.immunizations[i]._id;
        }
      }

      tableRows.push(
        <tr key={i} className="immunizationRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.immunizations[i]._id)} >
          { this.renderToggles(this.data.displayToggle, this.data.immunizations[i]) }
          <td className='identifier'>{ newRow.identifier }</td>
          <td className='vaccine'>{ newRow.vaccine }</td>
          <td className='vaccineCode'>{ newRow.vaccineCode }</td>
          { this.renderDate(this.data.displayDates, this.data.immunizations[i].date) }
        </tr>
      )
    }

    return(
      <Table id='immunizationsTable' responses hover >
        <thead>
          <tr>
            { this.renderTogglesHeader(this.data.displayToggle) }
            <th className='identifier'>identifier</th>
            <th className='vaccine'>vaccine</th>
            <th className='vaccineCode'>vaccineCode</th>
            { this.renderDateHeader(this.data.displayDates) }
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
