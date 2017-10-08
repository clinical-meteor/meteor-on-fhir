import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';
import Toggle from 'material-ui/Toggle';

export default class ProceduresTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      procedures: [],
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
      data.procedures = this.props.data;
    } else {
      if(Procedures.find().count() > 0){
        data.procedures = Procedures.find().fetch();
      }  
    }

    if(process.env.NODE_ENV === "test") console.log("ProceduresTable[data]", data);
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
    Session.set('proceduresUpsert', false);
    Session.set('selectedProcedure', id);
    Session.set('procedurePageTabIndex', 2);
  };
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.procedures.length; i++) {
      var newRow = {
        identifier: '',
        status: '',
        code: ''        
      };
      if (this.data.procedures[i]){
        if(this.data.procedures[i].identifier){
          newRow.identifier = this.data.procedures[i].identifier[0].value;
        }
        if(this.data.procedures[i].code && this.data.procedures[i].code.text){
          newRow.code = this.data.procedures[i].code.text;
        }     
        if(this.data.procedures[i].status){
          newRow.status = this.data.procedures[i].status;
        }
      }

      tableRows.push(
        <tr key={i} className="procedureRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.procedures[i]._id)} >
          { this.renderToggles(this.data.displayToggle, this.data.procedures[i]) }
          <td className='identifier'>{ newRow.identifier }</td>
          <td className='code'>{ newRow.code }</td>
          <td className='status'>{ newRow.status }</td>
          { this.renderDate(this.data.displayDates, this.data.procedures[i].performedDateTime) }
        </tr>
      )
    }

    return(
      <Table id='proceduresTable' responses hover >
        <thead>
          <tr>
            { this.renderTogglesHeader(this.data.displayToggle) }
            <th className='identifier'>identifier</th>
            <th className='code'>code</th>
            <th className='status'>status</th>
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


ReactMixin(ProceduresTable.prototype, ReactMeteorData);