import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';
import Toggle from 'material-ui/Toggle';

Session.setDefault('deselectedActivities', []);

export default class MedicationTable extends React.Component {
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
      activity:[]
    };

    // the following assumes that we only have a single CarePlan record in the database
    if (CarePlans.find({'identifier.value':'alcohol-treatment-template'}).count() > 0) {
      let carePlanTemplate = CarePlans.find({'identifier.value':'alcohol-treatment-template'}).fetch()[0];
      //console.log("carePlanTemplate", carePlanTemplate);

      if (carePlanTemplate ) {
        data.activity = carePlanTemplate.activity;
      }
    } else {
      data.activity = [{
        detail: {
          description: '10,000 steps per day'
        },
        reference: {
          display: ''
        }
      }, {
        detail: {
          description: 'Cycle to work 30 mins.'
        },
        reference: {
          display: ''
        }
      }]
    }

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
  handleChange(row, key, value) {
    const source = this.state.source;
    source[row][key] = value;
    this.setState({source});
  }

  rowClick(display){
    let deselectedActivities = Session.get('deselectedActivities');

    if (deselectedActivities.includes(display)) {
      deselectedActivities.splice(deselectedActivities.indexOf(display), 1);
    } else {
      deselectedActivities.push(display);
    }

    if(process.env.NODE_ENV === "test") console.log("deselectedActivities", deselectedActivities);

    Session.set('deselectedActivities', deselectedActivities);
  }
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.activity.length; i++) {
      tableRows.push(
      <tr className='activityRow' key={i} style={{cursor: 'pointer'}} onClick={ this.rowClick.bind('this', this.data.activity[i].reference.display) }>
        <td className="check">
          <Toggle
            defaultToggled={true}
            style={this.data.style.checkbox}
          />
        </td>
        <td className="description">{this.data.activity[i].detail.description}</td>
        <td className="goal hidden-on-phone">{this.data.activity[i].reference.display}</td>
      </tr>);
    }


    return(
      <Table id="activitysTable" responses hover >
        <thead>
          <tr>
            <th className="check">prescribed</th>
            <th className="description">description</th>
            <th className="goal hidden-on-phone">associated goal</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>

    );
  }
}



MedicationTable.propTypes = {};
ReactMixin(MedicationTable.prototype, ReactMeteorData);
