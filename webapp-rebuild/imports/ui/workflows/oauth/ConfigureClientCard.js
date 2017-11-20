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

import { HTTP } from 'meteor/http';
import { Bert } from 'meteor/themeteorchef:bert';



Session.setDefault('newClient', {
  clientName: '',
  clientId: '',
  redirectUri: 'http://localhost:3100/_oauth/FhirVault',
  secret: '',
  autoscanServerUrl: '',
  baseUrl: '',
  loginUrl: ''
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
        redirectUri: 'http://localhost:3100/_oauth/FhirVault',
        secret: '',
        autoscanServerUrl: '',
        baseUrl: '',
        loginUrl: ''
      };
    }


    switch (field) {
      case "clientName":
        clientUpdate.clientName = value;
        break;
      case "clientId":
        clientUpdate.clientId = value;
        break;
      case "loginUrl":
        clientUpdate.loginUrl = value;
        break;
      case "baseUrl":
        clientUpdate.baseUrl = value;
        break;
      case "redirectUri":
        clientUpdate.redirectUri = value;
        break;
      case "secret":
        clientUpdate.secret = value;
        break;
      case "autoscanServerUrl":
        clientUpdate.autoscanServerUrl = value;
        break;
      default:
    }


    // clientUpdate[field] = value;
    if(process.env.NODE_ENV === "test") console.log("configureClient", clientUpdate);

    Session.set('newClient', clientUpdate);
  }
  saveClient(){
    console.log("saveClient");

    let newConfiguration = Session.get('newClient');
    if (newConfiguration) {
      Meteor.call("addServiceConfiguration", newConfiguration, function (error, result){
        if (error){
          console.log("error", error);
          Bert.alert(error, 'error');
        }
        if (result){
          console.log("result", result);
          Bert.alert(result, 'success');
        }
      });
    }


  }
  resetConfiguration(){
    console.log("resetConfiguration");
    Meteor.call('resetServiceConfiguration');
  }

  render() {
    return (
      <GlassCard>
        <CardTitle
          title="Configure This Health Record as a Client App"
          subtitle="After you register an account with the external service, you should receive a "
        />
        <CardText>

          <Row>
            <Col md={6}>
              <TextField
                id='clientNameInput'
                ref='clientName'
                name='clientName'
                floatingLabelText='Client Name'
                defaultValue='Meteor on FHIR'
                value={this.data.client.clientName}
                onChange={ this.configureClient.bind(this, 'clientName')}
                fullWidth
                /><br/>
            </Col>
            <Col md={6}>
              <TextField
                id='redirectUriInput'
                ref='redirectUri'
                name='redirectUri'
                floatingLabelText='Redirect URI'
                defaultValue='http://localhost:3100/_oauth/FhirVault'
                hintText='http://localhost:3100/_oauth/FhirVault'
                value={this.data.client.redirectUri}
                onChange={ this.configureClient.bind(this, 'redirectUri')}
                fullWidth
                /><br/>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <TextField
                id='clientIdInput'
                ref='clientId'
                name='clientId'
                floatingLabelText='Client ID'
                hintText='meteor-on-fhir'
                value={this.data.client.clientId}
                onChange={ this.configureClient.bind(this, 'clientId')}
                fullWidth
                /><br/>
            </Col>
            <Col md={6}>
              <TextField
                id='secretInput'
                ref='secret'
                name='secret'
                floatingLabelText='Client Secret'
                hintText={ Meteor.uuid() }
                value={this.data.client.secret}
                onChange={ this.configureClient.bind(this, 'secret')}
                fullWidth
                /><br/>
            </Col>
          </Row>





          <Row>
            <Col md={6}>
              <TextField
                id='BaseUrlInput'
                ref='baseUrl'
                name='baseUrl'
                floatingLabelText='Server URL'
                hintText='http://localhost:3100/'
                value={this.data.client.baseUrl}
                onChange={ this.configureClient.bind(this, 'baseUrl')}
                fullWidth
                /><br/>
            </Col>
            <Col md={6}>
              <TextField
                id='loginUrlInput'
                ref='loginUrl'
                name='loginUrl'
                floatingLabelText='Server OAuth URL'
                hintText='http://localhost:3100/oauth'
                value={this.data.client.loginUrl}
                onChange={ this.configureClient.bind(this, 'loginUrl')}
                fullWidth
                /><br/>
            </Col>
          </Row>

          <br/>
          <div>
            <RaisedButton id="cancelSaveConfigurationButton" label="Cancel" primary={true} style={{marginRight: '20px'}} />
            <RaisedButton id="saveConfigurationButton" label="Save Configuration" onClick={ this.saveClient } />
            <RaisedButton id="resetServiceConfiguration" label="Reset service configuration" primary={true} onClick={this.resetConfiguration } style={{float: 'right'}}/>
          </div>


        </CardText>
      </GlassCard>
    );
  }
}



ReactMixin(ConfigureClientCard.prototype, ReactMeteorData);






function prePopulateValues (e, id, value) {
  var el = $(e.target).find('#' + id);
  if (!el.length) {
    return false;
  }

  if (!el.val()) {
    el.val(value);
    return true;
  }

  return false;
}
