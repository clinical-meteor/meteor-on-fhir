import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardTitle, CardText } from 'material-ui/Card';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { EJSON } from 'meteor/ejson';
import Glass from '/imports/ui/Glass';

import { DynamicSpacer } from '/imports/ui/components/DynamicSpacer';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { RegisterApplicationCard } from '/imports/ui/workflows/oauth/RegisterApplicationCard';
import { ConfigureClientCard } from '/imports/ui/workflows/oauth/ConfigureClientCard';
import { SearchPatientsCard } from '/imports/ui/workflows/oauth/SearchPatientsCard';
import { GenerateResourceAccessTokens } from '/imports/ui/workflows/oauth/GenerateResourceAccessTokens';
import { OAuthAdminCard } from '/imports/ui/workflows/oauth/OAuthAdminCard';

import { Well } from 'react-bootstrap';


Session.setDefault('newClient', {
  clientName: '',
  clientId: '',
  redirectUri: '',
  secret: '',
  autoscanServerUrl: ''
}); 

Meteor.call("getBearerTokenOnUserAccount", function(error, result){
  if (error) {
    console.log("getBearerTokenOnUserAccount[error]", error);
  }
  if (result) {
    Session.set('bearerToken', result);
  }
});

Session.setDefault('bearerToken', '');
Session.setDefault('userIdResult', '');
export class ClientConfigurationPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
      },
      client: Session.get('newClient'),
      result: Session.get('jsonData'),
      bearerToken: Session.get('bearerToken'),
      getUserIdResult: Session.get('userIdResult')
    };

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("ClientConfigurationPage[data]", data);
    return data;
  }
  // this could be a mixin
  changeClient(field, event, value){
    let clientUpdate;

    // by default, assume there's no other data and we're creating a new organization
    if (Session.get('newClient')) {
      clientUpdate = Session.get('newClient');
    } else {
      clientUpdate = {
        clientName: '',
        clientId: '',
        redirectUri: '',
        secret: '',
        autoscanServerUrl: ''
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
      case "secret":
        clientUpdate.secret = value;
        break;
      case "autoscanServerUrl":
        clientUpdate.autoscanServerUrl = value;
        break;
      default:
    }

    // clientUpdate[field] = value;
    if(process.env.NODE_ENV === "test") console.log("changeClient", clientUpdate);

    Session.set('newClient', clientUpdate);
  }
  saveClient(){
    if(process.env.NODE_ENV === "test"){
      console.log("saveClient");
    }
  }
  signInWith(){

    let config = ServiceConfiguration.configurations.findOne({service: 'FhirVault'});

    console.log("signInWith", config);

    Meteor.loginWithFhirVault({
      redirectUrl: config.redirectUri,
      loginStyle: 'popup',
      loginUrl: config.loginUrl
    }, function(error, result){
      if (error) {
        console.log("error", error);
      }
      if (result) {
        console.log("result",  result);
      }
    });

  }

  autoscanUrl(){
    //if(process.env.NODE_ENV === "test"){
    console.log("autoscanUrl");

    let clientConfig = Session.get('newClient')

    Meteor.call("fetchMetadata", clientConfig.autoscanServerUrl, function (error, result){
      if (error){
        console.log("fetchMetadata[error]", error);
        Bert.alert(error, 'error');
      }
      if (result){
        console.log("fetchMetadata", result);
        Session.set('jsonData', result.data);

        if (result.data) {
           result.data.rest.forEach(function (rest){
             //console.log('rest', rest);
             if (rest.mode === "server") {
               if (rest && rest.security && rest.security.extension && rest.security.extension[0]) {
                 var tokenUrl = "";
                 var authorizeUrl = "";

                 rest.security.extension[0].extension.forEach(function(data){
                   //console.log('extension', data);
                   if (data && data.url === "token") {
                     console.log('token', data.valueUri);
                     tokenUrl = data.valueUri;
                   }
                   if (data && data.url === "authorize") {
                     console.log('authorize', data.valueUri);
                     authorizeUrl = data.valueUri;
                   }
                 });

                 ServiceConfiguration.configurations.insert({
                   service: 'FhirVault',
                   clientId: clientConfig.clientId,
                   scope: ['user/*.read'], // whatever scope the resource owner supports. By default, ['email'] will be used.
                   //scope: [], // whatever scope the resource owner supports. By default, ['email'] will be used.
                   secret: clientConfig.secret,
                   baseUrl: clientConfig.baesUrl,
                   loginUrl: authorizeUrl,
                   loginStyle: "popup"
                 }, function(error, result){
                   if (error) {
                      Bert.alert(error, 'error');
                   }
                   if (result) {
                     Bert.alert(result, 'success');
                   }
                 });

               }
             }
           });
         }
      }
    });
  }

  tokenTest(){
    console.log("tokenTest");
    Meteor.call('getUserId', function (err, userId) {
      console.log('getUserId', userId);
      // set the userId.
      // getUserIdResult.set(userId.data);
      console.log("userId", userId);

      Session.set('userIdResult', userId.data);

      Meteor.call('getUserData', userId.data, function (err, userData) {
        console.log('getUserData', userData);

        if (userData) {
          Session.set('jsonData', userData.data);
          // set the userId.
          //getUserData.set(userData.data);
        }
      });
    });
  }

  render() {
    return (
      <div id="oauthPage">
        <VerticalCanvas>

          <ConfigureClientCard />
          <DynamicSpacer />


          <GlassCard>
            <CardText>
              <RaisedButton id="oAuthSignInButton" label="Sign in with Meteor on FHIR" primary={true} onClick={this.signInWith.bind(this)}  />
              <hr />
              <bold>Bearer Token</bold><br />
              {this.data.bearerToken}
              <hr />
              <RaisedButton id="tokenTestButton" label="Test Tokens" primary={true} onClick={this.tokenTest.bind(this)}  />
              <br />
              <br />
              <bold>User ID</bold><br />
              {this.data.getUserIdResult}
              <br />
              <br />




            </CardText>
          </GlassCard>
          <DynamicSpacer />


          <GlassCard>
            <CardText>
              <TextField
                id='autoscanServerUrlInput'
                ref='autoscanServerUrl'
                name='autoscanServerUrl'
                floatingLabelText='Autoscan Server URL'
                hintText='http://localhost:3100/fhir/metadata'
                value={this.data.client.autoscanServerUrl}
                onChange={ this.changeClient.bind(this, 'autoscanServerUrl')}
                fullWidth
                />
              <br/>
              <br />
              <RaisedButton id="autoscanServerButton" label="Autoscan Server" primary={true} onClick={ this.autoscanUrl } />
            </CardText>
          </GlassCard>
          <DynamicSpacer />



          <SearchPatientsCard />
          <DynamicSpacer />

          <GlassCard>
            <CardTitle
              title="Results"
            />
            <CardText>
              <pre>{ JSON.stringify(this.data.result, null, 2)}</pre>
            </CardText>
          </GlassCard>

          <DynamicSpacer />
          <DynamicSpacer />


        </VerticalCanvas>
      </div>
    );
  }
}

ReactMixin(ClientConfigurationPage.prototype, ReactMeteorData);
