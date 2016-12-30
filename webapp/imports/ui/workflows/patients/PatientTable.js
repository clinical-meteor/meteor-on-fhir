import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import Avatar from 'material-ui/Avatar';
import { Table } from 'react-bootstrap';


export default class PatientTable extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        hideOnPhone: {
          visibility: 'visible',
          display: 'table'
        }
      },
      selected: [],
      patients: Patients.find().map(function(person){
        let result = {
          _id: person._id,
          active: person.active.toString(),
          gender: person.gender,
          name: person.name ? person.name[0].text : "",
          // there's an off-by-1 error between momment() and Date() that we want
          // to account for when converting back to a string
          birthdate: moment(person.birthDate).add(1, 'day').format("YYYY-MM-DD"),
          photo: "/thumbnail-blank.png",
          initials: 'abc'
        };
        if (person.photo && person.photo[0] && person.photo[0].url) {
          result.photo = person.photo[0].url;
        }
        return result;
      })
    };

    if (Session.get('appWidth') < 768) {
      data.style.hideOnPhone.visibility = 'hidden';
      data.style.hideOnPhone.display = 'none';
    } else {
      data.style.hideOnPhone.visibility = 'visible';
      data.style.hideOnPhone.display = 'table-cell';
    }

    // console.log("PatientTable[data]", data);
    return data;
  }
  rowClick(id){
    Session.set('patientsUpsert', false);
    Session.set('selectedPatient', id);
    Session.set('patientPageTabIndex', 2);
  }

  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.patients.length; i++) {
      tableRows.push(
        <tr key={i} className="patientRow" style={{cursor: "pointer"}}
          onClick={ this.rowClick.bind('this', this.data.patients[i]._id)}
          >

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
