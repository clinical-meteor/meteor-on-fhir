import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import Avatar from 'material-ui/Avatar';
import { Table } from 'react-bootstrap';


export default class PatientTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        hideOnPhone: {
          visibility: 'visible',
          display: 'table'
        }
      },
      selected: [],
      patients: Patients.find().map(function(person){
        return {
          _id: person._id,
          active: person.active.toString(),
          gender: person.gender,
          name: person.name ? person.name[0].text : "",
          birthdate: moment(person.birthDate).format("YYYY-MM-DD"),
          photo: person.photo ? person.photo[0].url : "/thumbnail-blank.png",
          initials: 'abc'
        };
      })
    };

    if (Session.get('appWidth') < 768) {
      data.style.hideOnPhone.visibility = 'hidden';
      data.style.hideOnPhone.display = 'none';
    } else {
      data.style.hideOnPhone.visibility = 'visible';
      data.style.hideOnPhone.display = 'table-cell';
    }

    console.log("PatientTable[data]", data);

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
    return "YYYY/MM/DD";
  }
  noChange(){
    return "";
  }
  rowClick(id){
    // set the user
    Session.set("selectedPatient", id);

    // set which tab is selected
    let state = Session.get('patientCardState');
    state["index"] = 2;
    Session.set('patientCardState', state);
  }

  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.patients.length; i++) {
      tableRows.push(
        <tr key={i} className="patientRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.patients[i]._id)} >

          <td className='avatar'>
            <Avatar src={this.data.patients[i].photo} />
          </td>

          <td className='name'>{this.data.patients[i].name }</td>
          <td className='gender'>{this.data.patients[i].gender}</td>
          <td className='birthdate' style={{minWidth: '100px'}}>{this.data.patients[i].birthdate }</td>
          <td className='active' style={this.data.style.hideOnPhone}>{this.data.patients[i].active}</td>
          <td className='id' style={this.data.style.hideOnPhone}><span className="barcode">{this.data.patients[i]._id}</span></td>
        </tr>
      );
    }


    return(
      <Table id='patientsTable' responses hover >
        <thead>
          <tr>
            <th className='avatar'>photo</th>
            <th className='name'>name</th>
            <th className='gender'>gender</th>
            <th className='birthdate' style={{minWidth: '100px'}}>birthdate</th>
            <th className='active' style={this.data.style.hideOnPhone}>active</th>
            <th className='id' style={this.data.style.hideOnPhone}>_id</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>

    );
  }
}


ReactMixin(PatientTable.prototype, ReactMeteorData);
