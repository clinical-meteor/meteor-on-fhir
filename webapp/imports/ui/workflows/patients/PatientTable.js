import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import Avatar from 'material-ui/Avatar';
import { Table } from 'react-bootstrap';
import { HTTP } from 'meteor/http';

import FlatButton from 'material-ui/FlatButton';


export default class PatientTable extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        hideOnPhone: {
          visibility: 'visible',
          display: 'table'
        },
        cellHideOnPhone: {
          visibility: 'visible',
          display: 'table',
          paddingTop: '16px'
        },
        cell: {
          paddingTop: '16px'
        },
        avatar: {
          // color: rgb(255, 255, 255);
          backgroundColor: 'rgb(188, 188, 188)',
          userSelect: 'none',
          borderRadius: '2px',
          height: '40px',
          width: '40px'
        }
      },
      selected: [],
      patients: []
    };

    let query = {};
    let options = {};
    if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.defaults && Meteor.settings.public.defaults.paginationLimit) {
      options.limit = Meteor.settings.public.defaults.paginationLimit;
    }

    data.patients = Patients.find(query, options).map(function(person){
      let result = {
        _id: person._id,
        active: person.active.toString(),
        gender: person.gender,
        name: '',
        mrn: '',
        // there's an off-by-1 error between momment() and Date() that we want
        // to account for when converting back to a string
        birthDate: '',
        photo: "/thumbnail-blank.png",
        initials: 'abc'
      };
      if (person.birthDate) {
        result.birthDate = moment(person.birthDate).format("YYYY-MM-DD")
      }
      if (person.name && person.name[0] && person.name[0].text) {
        result.name = person.name[0].text;
      }
      if (person.photo && person.photo[0] && person.photo[0].url) {
        result.photo = person.photo[0].url;
      }
      if (person.identifier && person.identifier[0] && person.identifier[0].value) {
        result.mrn = person.identifier[0].value;
      }
      return result;
    });

    if (Session.get('appWidth') < 768) {
      data.style.hideOnPhone.visibility = 'hidden';
      data.style.hideOnPhone.display = 'none';
      data.style.cellHideOnPhone.visibility = 'hidden';
      data.style.cellHideOnPhone.display = 'none';
    } else {
      data.style.hideOnPhone.visibility = 'visible';
      data.style.hideOnPhone.display = 'table-cell';
      data.style.cellHideOnPhone.visibility = 'visible';
      data.style.cellHideOnPhone.display = 'table-cell';
    }

    // console.log("PatientTable[data]", data);
    return data;
  }
  rowClick(id){
    Session.set('patientsUpsert', false);
    Session.set('selectedPatient', id);
    Session.set('patientPageTabIndex', 2);
  }
  renderRowAvatarHeader(){
    if (Meteor.settings.public.defaults.avatars) {
      return (
        <th className='avatar'>photo</th>
      );
    }
  }
  renderRowAvatar(patient, avatarStyle){
    if (Meteor.settings.public.defaults.avatars) {
      return (
        <td className='avatar'>
          <img src={patient.photo} style={avatarStyle}/>
        </td>
      );
    }
  }
   onSend(id){
      let patient = Patients.findOne({_id: id});

      console.log("PatientTable.onSend()", patient);

      var httpEndpoint = "http://localhost:8080";
      if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.interfaces && Meteor.settings.public.interfaces.default && Meteor.settings.public.interfaces.default.channel && Meteor.settings.public.interfaces.default.channel.endpoint) {
        httpEndpoint = Meteor.settings.public.interfaces.default.channel.endpoint;
      }
      HTTP.post(httpEndpoint + '/Patient', {
        data: patient
      }, function(error, result){
        if (error) {
          console.log("error", error);
        }
        if (result) {
          console.log("result", result);
        }
      });
    }
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.patients.length; i++) {
      tableRows.push(
        <tr key={i} className="patientTableRow" style={{cursor: "pointer"}}>

          { this.renderRowAvatar(this.data.patients[i], this.data.style.avatar) }

          <td className='name' onClick={ this.rowClick.bind('this', this.data.patients[i]._id)} style={this.data.style.cell}>{this.data.patients[i].name }</td>
          <td className='gender' onClick={ this.rowClick.bind('this', this.data.patients[i]._id)} style={this.data.style.cell}>{this.data.patients[i].gender}</td>
          <td className='birthDate' onClick={ this.rowClick.bind('this', this.data.patients[i]._id)} style={{minWidth: '100px', paddingTop: '16px'}}>{this.data.patients[i].birthDate }</td>
          <td className='isActive' onClick={ this.rowClick.bind('this', this.data.patients[i]._id)} style={this.data.style.cellHideOnPhone}>{this.data.patients[i].active}</td>
          <td className='id' onClick={ this.rowClick.bind('this', this.data.patients[i]._id)} style={this.data.style.cellHideOnPhone}><span className="barcode">{this.data.patients[i]._id}</span></td>
          <td className='mrn' style={this.data.style.cellHideOnPhone}>{this.data.patients[i].mrn}</td>
          <td className='sendButton' style={this.data.style.hideOnPhone}><FlatButton label="send" onClick={this.onSend.bind('this', this.data.patients[i]._id)}/></td>
        </tr>
      );
    }


    return(
      <Table id='patientsTable' responses hover >
        <thead>
          <tr>

            { this.renderRowAvatarHeader() }

            <th className='name'>name</th>
            <th className='gender'>gender</th>
            <th className='birthdate' style={{minWidth: '100px'}}>birthdate</th>
            <th className='isActive' style={this.data.style.hideOnPhone}>active</th>
            <th className='id' style={this.data.style.hideOnPhone}>_id</th>
            <th className='mrn' style={this.data.style.hideOnPhone}>mrn</th>
            <th className='sendButton' style={this.data.style.hideOnPhone}></th>
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
