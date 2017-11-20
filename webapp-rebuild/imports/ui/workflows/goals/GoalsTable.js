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
        description: '',
        priority: '',
        status: ''
      };

      if(this.data.goals[i].description){
        newRow.description = this.data.goals[i].description;
      }
      if(this.data.goals[i].priority){
        newRow.priority = this.data.goals[i].priority.text;
      }
      if(this.data.goals[i].status){
        newRow.status = this.data.goals[i].status;
      }

      tableRows.push(
        <tr key={i} className="goalRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.goals[i]._id)} >

          <td className='description'>{ newRow.description }</td>
          <td className='priority'>{ newRow.priority }</td>
          <td className='status'>{ newRow.status }</td>
        </tr>
      )
    }

    return(
      <Table id='goalsTable' responses hover >
        <thead>
          <tr>
            <th className='description'>description</th>
            <th className='priority'>priority</th>
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


ReactMixin(GoalsTable.prototype, ReactMeteorData);
