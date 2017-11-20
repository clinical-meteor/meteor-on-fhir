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
import { Table } from 'react-bootstrap';

import { oAuth2Server } from 'meteor/clinical:fhir-vault-server';


export class OAuthAdminCard extends React.Component {
  getMeteorData() {
    let data = {
      style: {
      },
      client: Session.get('patientSearchQuery'),
      result: {},
      clients: [],
      authCodes: [],
      refreshTokens: []
    };

    if (oAuth2Server && oAuth2Server.collections && oAuth2Server.collections.clientsCollection && oAuth2Server.collections.clientsCollection.find()) {
      data.clients = oAuth2Server.collections.clientsCollection.find().map(function(record){
        record.value = record._id;
        return record;
      });
    }

    if(oAuth2Server && oAuth2Server.collections && oAuth2Server.collections.authCodes){
      data.authCodes = oAuth2Server.collections.authCodes.find().map(function(record){
        record.value = record._id;
        return record;
      });
    }

    if(oAuth2Server && oAuth2Server.collections && oAuth2Server.collections.refreshToken){
      data.refreshTokens = oAuth2Server.collections.refreshToken.find().map(function(record){
        record.value = record._id;
        return record;
      });
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("OAuthAdminCard[data]", data);
    return data;
  }

  render() {
    let tableRows = [];
    for (var i = 0; i < this.data.clients.length; i++) {
      tableRows.push(
      <tr className='practitionerRow' key={i} style={{cursor: 'pointer'}} >
        <td className="isActive">{this.data.clients[i].active.toString()}</td>
        <td className="clientName">{this.data.clients[i].clientName}</td>
        <td className="clientId">{this.data.clients[i].clientId}</td>
        <td className="redirectUri">{this.data.clients[i].redirectUri}</td>
      </tr>);
    }


    let authCodeRows = [];
    for (var i = 0; i < this.data.authCodes.length; i++) {
      authCodeRows.push(
      <tr className='authCodeRows' key={i} style={{cursor: 'pointer'}} >
        <td className="value">{this.data.authCodes[i].authCode}</td>
        <td className="value">{this.data.authCodes[i].clientId}</td>
        <td className="value">{this.data.authCodes[i].userId}</td>
      </tr>);
    }

    let refreshTokenRows = [];
    for (var i = 0; i < this.data.refreshTokens.length; i++) {
      refreshTokenRows.push(
      <tr className='refreshTokenRows' key={i} style={{cursor: 'pointer'}} >
        <td className="value">{this.data.refreshTokens[i].authCode}</td>
        <td className="value">{this.data.refreshTokens[i].clientId}</td>
        <td className="value">{this.data.refreshTokens[i].userId}</td>
        <td className="value">{this.data.refreshTokens[i].expres.toString()}</td>
      </tr>);
    }

    return (
      <GlassCard>
        <CardTitle
          title="Trust & Authorization Administration"
        />
        <CardText>
          <Row>
            <Table id="practitionersTable" responses hover >
              <thead>
                <tr>
                  <th className="isActive">active</th>
                  <th className="clientName">clientName</th>
                  <th className="clientId">clientId</th>
                  <th className="redirectUri">redirectUri</th>
                </tr>
              </thead>
              <tbody>
                { tableRows }
              </tbody>
            </Table>
          </Row>
          <br />
          <Row>
            <Table id="practitionersTable" responses hover >
              <thead>
                <tr>
                  <th className="name">auth codes</th>
                  <th className="name">client ID</th>
                  <th className="name">user ID</th>
                </tr>
              </thead>
              <tbody>
                { authCodeRows }
              </tbody>
            </Table>
          </Row>
          <br />
          <Row>
            <Table id="practitionersTable" responses hover >
              <thead>
                <tr>
                  <th className="name">auth codes</th>
                  <th className="name">client ID</th>
                  <th className="name">user ID</th>
                  <th className="expres">expires</th>
                </tr>
              </thead>
              <tbody>
                { refreshTokenRows }
              </tbody>
            </Table>
          </Row>
          <br/>
          <RaisedButton id="searchPatientsButton" label="Search Patients" primary={true} />
        </CardText>
      </GlassCard>
    );
  }
}



ReactMixin(OAuthAdminCard.prototype, ReactMeteorData);
