// import './style';

import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Button from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Table from 'react-toolbox/lib/table';


const PatientModel = {
  _id: {type: String},
  name: {type: String},
  gender: {type: String},
  active: {type: Boolean}
};

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
      source: Patients.find().map(function(person){
        let record = {
          _id: person._id,
          gender: person.gender,
          active: person.active
        }
        if (person.name && person.name[0] && person.name[0].text) {
          record.name = person.name[0].text
        } else {
          record.name = "---"
        }
        return record;
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
    return(
      <Table
        model={PatientModel}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        selectable
        selected={this.data.selected}
        source={this.data.source}
        onChange={this.noChange}
      />
    );
  }
});

export default PatientTable;
