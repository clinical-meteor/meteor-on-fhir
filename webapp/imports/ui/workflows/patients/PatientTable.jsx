import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import Avatar from 'react-toolbox/lib/avatar';
import { Table } from 'react-bootstrap';


export default class PatientTable extends React.Component {

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
          name: person.name ? person.name[0].text : "",
          birthdate: moment(person.birthDate).format("YYYY-MM-DD"),
          photo: person.photo ? person.photo[0].url: ""
        };
      })
    };

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
  };
  handleChange(row, key, value) {
    const source = this.state.source;
    source[row][key] = value;
    this.setState({source});
  };

  handleSelect(selected) {
    this.setState({selected});
  };
  getDate(){
    return "YYYY/MM/DD"
  };
  noChange(){
    return "";
  };
  rowClick(id){
    // set the user
    Session.set("selectedPatient", id);

    // set which tab is selected
    let state = Session.get('patientCardState');
    state["index"] = 2;
    Session.set('patientCardState', state);
  };
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.patients.length; i++) {
      tableRows.push(
        <tr key={i} className="patientRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.patients[i]._id)} >

          <td>
            <Avatar><img src={this.data.patients[i].photo }/></Avatar>
          </td>

          <td>{this.data.patients[i].name }</td>
          <td>{this.data.patients[i].gender}</td>
          <td>{this.data.patients[i].birthdate }</td>
          <td>{this.data.patients[i].active}</td>
          <td><span className="barcode">{this.data.patients[i]._id}</span></td>
        </tr>
      )
    }


    return(
      <Table responses hover >
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
}


PatientTable.propTypes = {};
ReactMixin(PatientTable.prototype, ReactMeteorData);
