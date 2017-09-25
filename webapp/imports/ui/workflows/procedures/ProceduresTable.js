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
          <td className='identifier'>{ newRow.identifier }</td>
          <td className='code'>{ newRow.code }</td>
          <td className='status'>{ newRow.status }</td>
        </tr>
      )
    }

    return(
      <Table id='proceduresTable' responses hover >
        <thead>
          <tr>
            <th className='identifier'>identifier</th>
            <th className='code'>code</th>
            <th className='status'>status</th>
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