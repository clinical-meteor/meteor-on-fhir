import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Tabs, Tab } from 'material-ui/Tabs';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardTitle, CardText } from 'material-ui/Card';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

import OrganizationDetail from '/imports/ui/workflows/organizations/OrganizationDetail';
import OrganizationTable from '/imports/ui/workflows/organizations/OrganizationsTable';
import { Meteor } from 'meteor/meteor';
import Glass from '/imports/ui/Glass';

import { DynamicSpacer } from '/imports/ui/components/DynamicSpacer';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Col, Grid, Row } from 'react-bootstrap';

Session.setDefault('newApplication', {
  clientName: '',
  clientId: '',
  redirectUri: '',
  clientSecret: ''
});

export class RegisterApplicationCard extends React.Component {
  getMeteorData() {
    let data = {
      style: {
      },
      client: Session.get('newApplication')
    };

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("RegisterApplicationCard[data]", data);
    return data;
  }
  // this could be a mixin
  changeClient(field, event, value){
    let clientUpdate;

    // by default, assume there's no other data and we're creating a new organization
    if (Session.get('newApplication')) {
      clientUpdate = Session.get('newApplication');
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

    Session.set('newApplication', clientUpdate);
  }
  saveClient(){
    if(process.env.NODE_ENV === "test"){
      console.log("saveClient");
    }
  }
  render() {
    return (
      <GlassCard>
        <CardTitle
          title="Register Application with OAuth Server"
        />
        <CardText>
          <Row>
            <Col md={6}>
              <TextField
                id='clientNameInput'
                ref='clientName'
                name='clientName'
                floatingLabelText='Client Name'
                hintText="My App"
                value={this.data.client.clientName}
                onChange={ this.changeClient.bind(this, 'clientName')}
                fullWidth
                /><br/>
              <TextField
                id='clientIdInput'
                ref='clientId'
                name='clientId'
                floatingLabelText='Client ID'
                hintText="my-app-id"
                value={this.data.client.clientId}
                onChange={ this.changeClient.bind(this, 'clientId')}
                fullWidth
                /><br/>
            </Col>
            <Col md={6}>
              <TextField
                id='redirectUriInput'
                ref='redirectUri'
                name='redirectUri'
                floatingLabelText='Redirect URI'
                hintText="http://localhost:3100/_oauth/OAuth2Server"
                value={this.data.client.redirectUri}
                onChange={ this.changeClient.bind(this, 'redirectUri')}
                fullWidth
                /><br/>
              <TextField
                id='clientSecretInput'
                ref='clientSecret'
                name='clientSecret'
                floatingLabelText='Client Secret'
                hintText="slXlHvA-pGl6FbcCO8VuaKZnXemVc9fw1A0BFUjdrFc"
                value={this.data.client.clientSecret}
                onChange={ this.changeClient.bind(this, 'clientSecret')}
                fullWidth
                /><br/><br/>
            </Col>
          </Row>
          <RaisedButton id="addClientButton" label="Add Client" primary={true} onClick={this.saveClient.bind(this)} />
        </CardText>
      </GlassCard>
    );
  }
}



ReactMixin(RegisterApplicationCard.prototype, ReactMeteorData);
