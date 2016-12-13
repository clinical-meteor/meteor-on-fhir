import React from 'react';
import { browserHistory } from 'react-router';

import { PageContainer } from '/imports/ui/components/PageContainer';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardText, CardActions } from 'material-ui/Card';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export class WelcomePatientPage extends React.Component {
  constructor(props) {
    super(props);
  }

  handleGo(){
    console.log("handleGo");
    Meteor.users.update({_id: Meteor.userId()}, {$set: {
      'profile.firstTimeVisit':false
    }});
    browserHistory.push('/');
  }

  render(){
    return(
      <div id="welcomePatientPage">
        <PageContainer>
          <GlassCard>
            <CardText>
              Welcome!
              <p>
                Please accept our privacy policy and terms of agreement.
              </p>
            </CardText>
            <CardActions>
              <FlatButton label="Accept" onTouchTap={this.handleGo} />
            </CardActions>
          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}
