import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardTitle, CardText } from 'material-ui/Card';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import Glass from '/imports/ui/Glass';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Col, Grid, Row } from 'react-bootstrap';


Session.setDefault('patientSearchQuery', {
  patientName: '',
  patientGiven: '',
  patientFamily: '',
  patientGender: '',
  patientIdentifier: '',
  patientBirthdate: ''
});

export class SearchPatientsCard extends React.Component {
  getMeteorData() {
    let data = {
      style: {
      },
      client: Session.get('patientSearchQuery'),
      result: {}
    };

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("SearchPatientsCard[data]", data);
    return data;
  }
  // this could be a mixin
  changeSearchParameters(field, event, value){
    let clientUpdate;

    // by default, assume there's no other data and we're creating a new organization
    if (Session.get('patientSearchQuery')) {
      clientUpdate = Session.get('patientSearchQuery');
    } else {
      clientUpdate = {
        patientName: '',
        patientGiven: '',
        patientFamily: '',
        patientGender: '',
        patientIdentifier: '',
        patientBirthdate: ''
      };
    }

    switch (field) {
      case "patientName":
        clientUpdate.patientName = value;
        break;
      case "patientGiven":
        clientUpdate.patientGiven = value;
        break;
      case "patientFamily":
        clientUpdate.patientFamily = value;
        break;
      case "patientGender":
        clientUpdate.patientGender = value;
        break;
      case "patientIdentifier":
        clientUpdate.patientIdentifier = value;
        break;
      case "patientBirthdate":
        clientUpdate.patientBirthdate = value;
        break;
      default:
    }

    // clientUpdate[field] = value;
    process.env.TRACE && console.log("changeSearchParameters", clientUpdate);

    Session.set('patientSearchQuery', clientUpdate);
  }
  searchPatients(){
    process.env.DEBUG && console.log("searchPatients", Session.get('patientSearchQuery'));

    Meteor.call("getPatientData", Session.get('patientSearchQuery'), function (error, result){
      if (error){
        console.log("error", error);
      }
      if (result){
        process.env.DEBUG && console.log("getPatientData", result);
        Session.set('jsonData', result);
      }
    });
  }
  render() {
    return (
      <GlassCard>
        <CardTitle
          title="Search Patients"
        />
        <CardText>
          <Row>
            <Col md={4}>
              <TextField
                id='patientNameInput'
                ref='patientName'
                name='patientName'
                floatingLabelText='Full Name (exact match)'
                value={this.data.client.patientName}
                onChange={ this.changeSearchParameters.bind(this, 'patientName')}
                fullWidth
                /><br/>
            </Col>
            <Col md={4}>
              <TextField
                id='patientGivenInput'
                ref='patientGiven'
                name='patientGiven'
                floatingLabelText='Given'
                value={this.data.client.patientGiven}
                onChange={ this.changeSearchParameters.bind(this, 'patientGiven')}
                fullWidth
                /><br/>
            </Col>
            <Col md={4}>
              <TextField
                id='patientFamilyInput'
                ref='patientFamily'
                name='patientFamily'
                floatingLabelText='Family'
                value={this.data.client.patientFamily}
                onChange={ this.changeSearchParameters.bind(this, 'patientFamily')}
                fullWidth
                /><br/>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <TextField
                id='patientGenderInput'
                ref='patientGender'
                name='patientGender'
                floatingLabelText='Gender'
                value={this.data.client.patientGender}
                onChange={ this.changeSearchParameters.bind(this, 'patientGender')}
                fullWidth
                /><br/>
            </Col>
            <Col md={4}>
              <TextField
                id='patientIdentifierInput'
                ref='patientIdentifier'
                name='patientIdentifier'
                floatingLabelText='Identifier'
                value={this.data.client.patientIdentifier}
                onChange={ this.changeSearchParameters.bind(this, 'patientIdentifier')}
                fullWidth
                /><br/>
            </Col>
            <Col md={4}>
              <TextField
                id='patientBirthdateInput'
                ref='patientBirthdate'
                name='patientBirthdate'
                floatingLabelText='Birthdate'
                value={this.data.client.patientBirthdate}
                onChange={ this.changeSearchParameters.bind(this, 'patientBirthdate')}
                fullWidth
                /><br/>
            </Col>
          </Row>
          <br/>
          <RaisedButton id="searchPatientsButton" label="Search Patients" primary={true} onClick={this.searchPatients.bind(this)}  />
        </CardText>
      </GlassCard>
    );
  }
}



ReactMixin(SearchPatientsCard.prototype, ReactMeteorData);
