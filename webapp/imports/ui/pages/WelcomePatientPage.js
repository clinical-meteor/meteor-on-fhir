import React from 'react';
import { browserHistory } from 'react-router';

import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardHeader, CardText, CardActions } from 'material-ui/Card';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import { Alert } from 'react-bootstrap';


export class WelcomePatientPage extends React.Component {
  constructor(props) {
    super(props);
  }

  handleGo(){
    Meteor.users.update({_id: Meteor.userId()}, {$set: {
      'profile.firstTimeVisit':false
    }});
    browserHistory.push('/');
  }

  render(){
    return(
      <div id="welcomePatientPage">
        <VerticalCanvas>
          <GlassCard>
            <CardHeader
              title="Privacy Policy & Terms of Agreement"
            />
            <CardText>
              <p>
                Welcome to the Meteor on FHIR Interface Engine demo - a next-gen healh information exchange, running on the latest web technologies.
              </p>
              <Alert bsStyle="danger">
                <b>This is software is NOT running in HIPAA Compliance Mode.</b>
              </Alert>
              <p>
                For demonstration purposes, this software is currently running on an insecure hosting platform that does not guarantee HIPAA security.  Do not store protected health information (PHI) in this instance.  This software is for demonstration and evaluation purposes only.  By accepting this policy, you agree not to store PHI in this system.  In an actual production environment, we would work with you and your team to install this software in a secured HIPAA compliance datacenter or cloud service provider.  
              </p>
              <p>
                All software is provided 'as is'.  This is a work in progress, and some features are still under construction or marked experimental.
              </p>
            </CardText>
            <CardActions>
              <FlatButton id='acceptWelcomePageButton' label="Accept" onTouchTap={this.handleGo} />
            </CardActions>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}
