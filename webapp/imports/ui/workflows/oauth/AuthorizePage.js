import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardTitle, CardText } from 'material-ui/Card';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import Glass from '/imports/ui/Glass';

import { DynamicSpacer } from '/imports/ui/components/DynamicSpacer';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { Well } from 'react-bootstrap';
import { ReactiveVar } from 'meteor/reactive-var';



Session.setDefault('showNavbars', false);

let grantResult = new ReactiveVar(null);
export class AuthorizePage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
      },
      result: getUrlParams(),
      grantResult: grantResult.get()
    };

    Session.set('showNavbars', false);


    if(process.env.NODE_ENV === "test") console.log("AuthorizePage[data]", data);
    return data;
  }
  authorizePatientsAccessTokens(){
    var urlParams = getUrlParams();
    console.log('Authorize Patients button clicked.', urlParams);

    // create an authorization code for the provided client.
    oAuth2Server.callMethod.authCodeGrant(
      urlParams.client_id,
      urlParams.redirect_uri,
      urlParams.response_type,
      urlParams.scope && urlParams.scope.split(' '),
      urlParams.state,
      function (err, result) {
        console.log('grantResult', result);

        // give the UI something to display.
        if (process.env.DEBUG) {
          //Session.set('grantResult', result)
          grantResult.set(result);
        } else {
           window.location.replace(result.redirectToUri);
        }
      }
    );
  }
  authorizeAccessToMyPractitioners(){
    var urlParams = getUrlParams();
    console.log('Authorize Practitioners button clicked.', urlParams);
  }
  render() {
    return (
      <div id="oauthPage">
        <VerticalCanvas>

          <GlassCard>
            <CardTitle
              title="Authorize"
            />
            <CardText>
              <Well>{ JSON.stringify(this.data.result, null, 2)}</Well>
              <RaisedButton id="authorizePatientsAccessTokens" className="authorizePatientsAccessTokens" label="Core Demographics" primary={true} onClick={this.authorizePatientsAccessTokens.bind(this)}  /><br/><br/>
              <RaisedButton id="authorizeAccessToMyPractitioners" className="authorizeAccessToMyPractitioners" label="Practitioners" primary={true} onClick={this.authorizeAccessToMyPractitioners.bind(this)}  /><br/><br/>
              <RaisedButton id="authorizeAccessToMyMedications" className="authorizeAccessToMyMedications" label="Medications" primary={true} onClick={this.authorizeAccessToMyPractitioners.bind(this)}  /><br/><br/>

            </CardText>
          </GlassCard>

        </VerticalCanvas>
      </div>
    );
  }
}



ReactMixin(AuthorizePage.prototype, ReactMeteorData);



function getUrlParams() {
  var match,
    pl = /\+/g, // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) {
      return decodeURIComponent(s.replace(pl, " "));
    },
    query = window.location.search.substring(1);

  var urlParams = {};
  while (match = search.exec(query)) {
    urlParams[decode(match[1])] = decode(match[2]);
  }

  return urlParams;
}
