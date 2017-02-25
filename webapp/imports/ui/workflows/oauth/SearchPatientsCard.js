import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardTitle, CardText } from 'material-ui/Card';

import { Meteor } from 'meteor/meteor';
import Glass from '/imports/ui/Glass';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Col, Grid, Row } from 'react-bootstrap';


Session.setDefault('patientSearchQuery', {
  clientName: '',
  clientId: '',
  redirectUri: '',
  clientSecret: ''
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
  changeClient(field, event, value){
    let clientUpdate;

    // by default, assume there's no other data and we're creating a new organization
    if (Session.get('patientSearchQuery')) {
      clientUpdate = Session.get('patientSearchQuery');
    } else {
      clientUpdate = {
        clientName: '',
        clientId: '',
        redirectUri: '',
        clientSecret: ''
      };
    }

    switch (field) {
      case "clientName":
        clientUpdate.clientName = value;
        break;
      case "clientId":
        clientUpdate.clientId = value;
        break;
      case "redirectUri":
        clientUpdate.redirectUri = value;
        break;
      case "clientSecret":
        clientUpdate.clientSecret = value;
        break;
      default:
    }

    // clientUpdate[field] = value;
    if(process.env.NODE_ENV === "test") console.log("changeClient", clientUpdate);

    Session.set('patientSearchQuery', clientUpdate);
  }
  searchPatients(){
    if(process.env.NODE_ENV === "test"){
      console.log("searchPatients");
    }
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
                onChange={ this.changeClient.bind(this, 'patientName')}
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
                onChange={ this.changeClient.bind(this, 'patientGiven')}
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
                onChange={ this.changeClient.bind(this, 'patientFamily')}
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
                onChange={ this.changeClient.bind(this, 'patientGender')}
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
                onChange={ this.changeClient.bind(this, 'patientIdentifier')}
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
                onChange={ this.changeClient.bind(this, 'patientBirthdate')}
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
