import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import AppBar from 'react-toolbox/lib/app_bar';
import Button from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Avatar from 'react-toolbox/lib/avatar';

import { Table } from 'react-bootstrap';




Session.setDefault('selectedPractitioner', false);

export default class PractitionerTable extends React.Component {
  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      practitioners: Practitioners.find().map(function(practitioner){
        let result = {
          _id: practitioner._id,
          gender: practitioner.gender,
          active: practitioner.active.toString(),
          name: practitioner.name ? practitioner.name.text: '',
          photo: practitioner.photo ? practitioner.photo[0].url: ''
        };

        if (practitioner.identifier && practitioner.identifier[0]) {
          result.username = practitioner.identifier[0].value;
        }
        return result;
      })
    };

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

  handleSelect(selected) {
    this.setState({selected});
  }
  getDate(){
    return 'YYYY/MM/DD';
  }
  noChange(){
    return '';
  }
  rowClick(id){
    // set the user
    Session.set('selectedPractitioner', id);

    // set which tab is selected
    let state = Session.get('practitionerCardState');
    state['index'] = 2;
    Session.set('practitionerCardState', state);
  }
  render () {

    let tableRows = [];
    for (var i = 0; i < this.data.practitioners.length; i++) {
      tableRows.push(
      <tr className='practitionerRow' key={i} style={{cursor: 'pointer'}} onClick={ this.rowClick.bind('this', this.data.practitioners[i]._id) }>
        <td>
          <Avatar><img src={this.data.practitioners[i].photo }/></Avatar>
        </td>

        <td>{this.data.practitioners[i].username}</td>
        <td>{this.data.practitioners[i].name}</td>
        <td>{this.data.practitioners[i].gender}</td>
        <td>{this.data.practitioners[i].active}</td>
        <td class="barcode">{this.data.practitioners[i]._id}</td>
      </tr>);
    }


    return(
      <Table responses hover >
        <thead>
          <tr>
            <th>avatar</th>
            <th>username</th>
            <th>name</th>
            <th>gender</th>
            <th>active</th>
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

PractitionerTable.propTypes = {

};
ReactMixin(PractitionerTable.prototype, ReactMeteorData);
