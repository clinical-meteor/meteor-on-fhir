import { CardActions, CardText, CardTitle } from 'material-ui/Card';

import { Alert } from 'react-bootstrap';
import FlatButton from 'material-ui/FlatButton';
import React from 'react';

import { VerticalCanvas, GlassCard } from 'meteor/clinical:glass-ui';

export class WelcomeAdminPage extends React.Component {
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
    return(
      <div id="welcomeAdminPage">
        <VerticalCanvas>
          <GlassCard>
            <CardTitle
              title="New Admin Setup"
            />
            <CardText>
              <Alert bsStyle="danger">
                <b>This software is NOT running in HIPAA Compliance Mode.</b>
              </Alert>
              <p>
                To enable HIPAA compliance, you'll need to remove the autopublish packages, write your own pub/sub functions, and then connect to a production Mongo database <i> that has data encryption at rest enabled</i>.
              </p>
              <pre>
                # meteor remove autopublish <br />
                # meteor remove clinical:autopublish <br />
                # MONGO_URL=mongodb://[username]:[password]hostname.com:27017/databasename meteor --settings settings.prod.json
              </pre>
            </CardText>
            <CardTitle
              title="Admin Checklist"
            />
            <CardText>
              <p>Let's make sure your site is configured correctly...</p>

            </CardText>
            <CardActions>
              <FlatButton id='acceptWelcomePageButton' label="Accept" onClick={this.handleGo} />
            </CardActions>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}
export default WelcomeAdminPage;
