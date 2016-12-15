import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Table } from 'react-bootstrap';
import Toggle from 'material-ui/Toggle';

Session.setDefault('selectedGoals', []);

export default class GoalsTable extends React.Component {
  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        block: {
          maxWidth: 250
        },
        checkbox: {
          //marginBottom: 16
        }
      },
      selected: [],
      goals:[]
    };

    // the following assumes that we only have a single CarePlan record in the database
    //if (CarePlans.find({'identifier.value':'alcohol-treatment-template'}).count() > 0) {
      data.goals = Goals.find().map(function(goal){
        let result = {
          id: goal._id,
          description: '',
          author: '',
          status: '',
          priority: ''
        };

        result.description = goal.description;
        result.status = goal.status;
        if (goal.author && goal.author.display) {
          result.author = goal.author.display;
        }
        if (goal.priority && goal.priority.text) {
          result.priority = goal.priority.text;
        }

        return result;
      });
    //}


    if (Session.get('darkroomEnabled')) {
      data.style.color = 'black';
      data.style.background = 'white';
    } else {
      data.style.color = 'white';
      data.style.background = 'black';
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = 'blur(3px)';
      data.style.webkitFilter = 'blur(3px)';
    }

    // this could be another mixin
    if (Session.get('backgroundBlurEnabled')) {
      data.style.backdropFilter = 'blur(5px)';
    }

    //console.log("data", data);

    return data;
  }
  // handleChange(row, key, value) {
  //   const source = this.state.source;
  //   source[row][key] = value;
  //   this.setState({source});
  // }

  rowClick(id){
    let selectedGoals = Session.get('selectedGoals');

    if (selectedGoals.includes(id)) {
      selectedGoals.splice(selectedGoals.indexOf(id), 1);
    } else {
      selectedGoals.push(id);
    }

    if(process.env.NODE_ENV === "test") console.log("selectedGoals", selectedGoals);

    Session.set('selectedGoals', selectedGoals);
  }
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.goals.length; i++) {
      tableRows.push(
      <tr className='goalRow' key={i} style={{cursor: 'pointer'}} onClick={ this.rowClick.bind('this', this.data.goals[i].id) }>
        <td className="check">
          <Toggle
            defaultToggled={false}
            style={this.data.style.checkbox}
          />
        </td>
        <td className="description">{this.data.goals[i].description}</td>
        <td className="author">{this.data.goals[i].author}</td>
        <td className="status">{this.data.goals[i].status}</td>
        <td className="priority">{this.data.goals[i].priority}</td>
      </tr>);
    }


    return(
      <Table id="goalsTable" responses hover >
        <thead>
          <tr>
            <th className="check">prescribed</th>
            <th className="description">description</th>
            <th className="author hidden-on-phone">author</th>
            <th className="status hidden-on-phone">status</th>
            <th className="priority hidden-on-phone">priority</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>

    );
  }
}



GoalsTable.propTypes = {};
ReactMixin(GoalsTable.prototype, ReactMeteorData);
