import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardTitle, CardText } from 'material-ui/Card';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

import { Meteor } from 'meteor/meteor';
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
  secret: ''
});

Session.setDefault('jsonData', {});

export class OAuthScrapYardPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
      },
      client: Session.get('newClient'),
      result: Session.get('jsonData')
    };

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("OAuthScrapYardPage[data]", data);
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
        secret: ''
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
    console.log("signInWith");
  }
  render() {
    return (
      <div id="oauthPage">
        <VerticalCanvas>

          <RegisterApplicationCard />
          <DynamicSpacer />

          <OAuthAdminCard />
          <DynamicSpacer />

          <hr />
          <br />

          <ConfigureClientCard />
          <DynamicSpacer />

          <GlassCard>
            <CardText>
              <RaisedButton id="oAuthSignInButton" label="Sign in with Meteor on FHIR" primary={true} onClick={this.signInWith.bind(this)}  />
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
              <Well>{ JSON.stringify(this.data.result, null, 2)}</Well>
            </CardText>
          </GlassCard>

          <DynamicSpacer />
          <DynamicSpacer />

        </VerticalCanvas>
      </div>
    );
  }
}



ReactMixin(OAuthScrapYardPage.prototype, ReactMeteorData);
