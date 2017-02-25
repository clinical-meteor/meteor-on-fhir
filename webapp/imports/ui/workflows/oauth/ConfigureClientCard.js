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

Session.setDefault('newClient', {
  clientName: '',
  clientId: '',
  redirectUri: 'http://localhost:3100/_oauth/OAuth2Server',
  clientSecret: ''
});

export class ConfigureClientCard extends React.Component {
  getMeteorData() {
    let data = {
      style: {
      },
      client: Session.get('newClient')
    };

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("ConfigureClientCard[data]", data);
    return data;
  }
  // this could be a mixin
  configureClient(field, event, value){
    let clientUpdate;

    // by default, assume there's no other data and we're creating a new organization
    if (Session.get('newClient')) {
      clientUpdate = Session.get('newClient');
    } else {
      clientUpdate = {
        clientName: '',
        clientId: '',
        redirectUri: 'http://localhost:3100/_oauth/OAuth2Server',
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
    if(process.env.NODE_ENV === "test") console.log("configureClient", clientUpdate);

    Session.set('newClient', clientUpdate);
  }
  saveClient(){
    if(process.env.NODE_ENV === "test"){
      console.log("saveClient");
    }
  }
  autoscanUrl(){
    if(process.env.NODE_ENV === "test"){
      console.log("autoscanUrl");
    }
  }
  render() {
    return (
      <GlassCard>
        <CardTitle
          title="Configure OAuth Client Application"
        />
        <CardText>
        <Row>
          <Col md={6}>
            <TextField
              id='clientIdInput'
              ref='clientId'
              name='clientId'
              floatingLabelText='Client ID'
              value={this.data.client.clientId}
              onChange={ this.configureClient.bind(this, 'clientId')}
              fullWidth
              /><br/>
          </Col>
          <Col md={6}>
            <TextField
              id='clientSecretInput'
              ref='clientSecret'
              name='clientSecret'
              floatingLabelText='Client Secret'
              value={this.data.client.clientSecret}
              onChange={ this.configureClient.bind(this, 'clientSecret')}
              fullWidth
              /><br/>
          </Col>
        </Row>
        
          <TextField
            id='autoscanServerUrlInput'
            ref='autoscanServerUrl'
            name='autoscanServerUrl'
            floatingLabelText='Autoscan Server URL'
            value={this.data.client.autoscanServerUrl}
            onChange={ this.autoscanUrl.bind(this, 'autoscanServerUrl')}
            fullWidth
            />
          <br/>
          <br />
          <RaisedButton id="autoscanServerButton" label="Autoscan Server" primary={true}  />
          <br />
          <br />

          <TextField
            id='redirectUriInput'
            ref='redirectUri'
            name='redirectUri'
            floatingLabelText='Redirect URI'
            defaultValue='http://localhost:3100/_oauth/OAuth2Server'
            value={this.data.client.redirectUri}
            onChange={ this.configureClient.bind(this, 'redirectUri')}
            fullWidth
            /><br/>

          <Row>
            <Col md={6}>
              <TextField
                id='targetBaseUrlInput'
                ref='targetBaseUrl'
                name='targetBaseUrl'
                floatingLabelText='Target Base URL'
                value={this.data.client.targetBaseUrl}
                onChange={ this.configureClient.bind(this, 'targetBaseUrl')}
                fullWidth
                /><br/>
            </Col>
            <Col md={6}>
              <TextField
                id='targetLoginUrlInput'
                ref='targetLoginUrl'
                name='targetLoginUrl'
                floatingLabelText='Target Login URL'
                value={this.data.client.targetLoginUrl}
                onChange={ this.configureClient.bind(this, 'targetLoginUrl')}
                fullWidth
                /><br/>
            </Col>
          </Row>

          <br/>
          <div>
            <RaisedButton id="cancelSaveConfigurationButton" label="Cancel" primary={true} style={{marginRight: '20px'}} />
            <RaisedButton id="saveConfigurationButton" label="Save Configuration" />
            <RaisedButton id="resetServiceConfiguration" label="Reset service configuration" primary={true} style={{float: 'right'}}/>
          </div>

        </CardText>
      </GlassCard>
    );
  }
}



ReactMixin(ConfigureClientCard.prototype, ReactMeteorData);
