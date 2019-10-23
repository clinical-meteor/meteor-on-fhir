import { CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';

import { Alert } from 'react-bootstrap';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';

import { VerticalCanvas, GlassCard } from 'meteor/clinical:glass-ui';

import { get } from 'lodash';

export class WelcomePractitionerPage extends React.Component {
  constructor(props) {
    super(props);
  }

  handleGo(){
    Meteor.users.update({_id: Meteor.userId()}, {$set: {
      'profile.firstTimeVisit':false
    }});
    if(this.props.history){
      this.props.history.push('/');
    }
  }

  render(){

    let adminEmail = get(Meteor, 'settings.public.administrative.email', 'suppport@symptomatic.io');

    let hipaaCheck;
    if(Package['autopublish'] || Package['clinical:autopublish']){
      hipaaCheck = <Alert bsStyle="danger">
      <b>This software is NOT running in HIPAA Compliance Mode.</b>
      <p>
        For demonstration purposes, this software is currently running on an insecure hosting platform that does not guarantee HIPAA security.  Do not store protected health information (PHI) in this instance.  This software is for demonstration and evaluation purposes only.  By accepting this policy, you agree not to store PHI in this system.  In an actual production environment, we would work with you and your team to install this software in a secured HIPAA compliance datacenter or cloud service provider.  
      </p>
      <p>
        To enable HIPAA compliance, you'll need to remove the autopublish packages, write your own pub/sub functions, and then connect to a production Mongo database <i> that has data encryption at rest enabled</i>.
      </p>
      <pre>
        # meteor remove autopublish <br />
        # meteor remove clinical:autopublish <br />
        # MONGO_URL=mongodb://[username]:[password]hostname.com:27017/databasename meteor --settings settings.prod.json
      </pre>
      <p>Please note that Mongo encrypted data at rest is an enterprise grade feature.  Please contact sales@symptomatic.io for licensing details.</p>
    </Alert>
    } else {
      hipaaCheck = <Alert bsStyle="warning">
        <b>Prototyping Modules Removed</b>
        <p>
          Good news.  This software has had the prototyping modules removed, and may be eligible for production use.  Please check with your administrator if you have any questions, and proceed cautiously.
        </p>
      </Alert>
    }


    return(
      <div id="welcomePractitionerPage">
        <VerticalCanvas>
          <GlassCard style={{textAlign: 'justify'}} >
            <CardTitle
              title="Privacy Policy"
            />
            <CardText>
              <p>
                Welcome to the Meteor on FHIR Interface Engine demo - a next-gen healh information exchange, running on the latest web technologies.
              </p>
              { hipaaCheck }
              <p>
                All software is provided 'as is'.  This is a work in progress, and some features are still under construction or marked experimental.
              </p>
            </CardText>
            
            <CardActions>
              <FlatButton id='acceptWelcomePageButton' label="Accept" onClick={this.handleGo.bind(this) } />
            </CardActions>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}
export default WelcomePractitionerPage;
