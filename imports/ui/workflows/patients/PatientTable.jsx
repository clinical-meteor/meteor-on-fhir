// import './style';

import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Button from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Avatar from 'react-toolbox/lib/avatar';

import { Table } from 'react-bootstrap';

// const PatientModel = {
//   _id: {type: String},
//   active: {type: Boolean},
//   birthdate: {type: Date},
//   gender: {type: String},
//   name: {type: String},
//   photo: {type: String}
// };

// const users = [
//   {name: 'Javi Jimenez', twitter: '@soyjavi', birthdate: new Date(1980, 3, 11), cats: 1},
//   {name: 'Javi Velasco', twitter: '@javivelasco', birthdate: new Date(1987, 1, 1), dogs: 1, active: true},
//   {name: 'Jane Doe', twitter: '@jdoe', birthdate: new Date(1951, 1, 1), cats: 2, active: true},
//   {name: 'John Doe', twitter: '@johndoe', birthdate: new Date(1950, 1, 1), cats: 2, active: true}
// ];



PatientTable = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      patients: Patients.find().map(function(person){
        return {
          _id: person._id,
          active: person.active.toString(),
          gender: person.gender,
          name: person.name ? person.name[0].text: "",
          birthdate: moment(person.birthDate).format("YYYY-MM-DD"),
          photo: person.photo ? person.photo[0].url: ""
        };
      })
    }

    if (Session.get('darkroomEnabled')) {
      data.style.color = "black";
      data.style.background = "white";
    } else {
      data.style.color = "white";
      data.style.background = "black";
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = "blur(3px)";
      data.style.webkitFilter = "blur(3px)";
    }

    // this could be another mixin
    if (Session.get('backgroundBlurEnabled')) {
      data.style.backdropFilter = "blur(5px)";
    }

    console.log("data", data);


    return data;
  },
  handleChange(row, key, value) {
    const source = this.state.source;
    source[row][key] = value;
    this.setState({source});
  },

  handleSelect(selected) {
    this.setState({selected});
  },
  getDate(){
    return "YYYY/MM/DD"
  },
  noChange(){
    return "";
  },
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.patients.length; i++) {
      tableRows.push(<tr key={i}>


        <td>
          <Avatar><img src={this.data.patients[i].photo }/></Avatar>
        </td>

        <td>{this.data.patients[i].name }</td>
        <td>{this.data.patients[i].gender}</td>
        <td>{this.data.patients[i].birthdate }</td>
        <td>{this.data.patients[i].active}</td>
        <td><span class="barcode">{this.data.patients[i]._id}</span></td>
      </tr>)
    }


    return(
      <Table responses >
        <thead>
          <tr>
            <th>photo</th>
            <th>name</th>
            <th>gender</th>
            <th>birthdate</th>
            <th>active</th>
            <th>_id</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>

    );
    // return(
    //   <Table
    //     model={PatientModel}
    //     onChange={this.handleChange}
    //     onSelect={this.handleSelect}
    //     selectable
    //     selected={this.data.selected}
    //     source={this.data.source}
    //     onChange={this.noChange}
    //   />
    // );
  }
});

export default PatientTable;
