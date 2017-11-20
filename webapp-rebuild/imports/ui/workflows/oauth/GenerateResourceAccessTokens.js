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

import { ReactiveVar } from 'meteor/reactive-var';


let grantResult = new ReactiveVar(null);

export class GenerateResourceAccessTokens extends React.Component {
  getMeteorData() {
    let data = {
      style: {
      },
      result: {},
      grantResult: grantResult.get()
    };

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("GenerateResourceAccessTokens[data]", data);
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
        // if (process.env.DEBUG) {
        //  grantResult.set(result);
        // } else {
           window.location.replace(result.redirectToUri);
        // }
      }
    );
  }
  render() {
    var urlParams = getUrlParams();
    var subtitle = "Please select which resources you would like to grant access to."
    return (
      <GlassCard>
        <CardTitle
          title="Generate Access Tokens"
          subtitle={subtitle}
        />
        <CardText>
          <Row>

          </Row>
          <Row>

          </Row>
          <br/>
          <RaisedButton id="authorizePatientsAccessTokens" className="authorizePatientsAccessTokens" label="Patients" primary={true} onClick={this.authorizePatientsAccessTokens.bind(this)}  />
        </CardText>
      </GlassCard>
    );
  }
}



ReactMixin(GenerateResourceAccessTokens.prototype, ReactMeteorData);


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
