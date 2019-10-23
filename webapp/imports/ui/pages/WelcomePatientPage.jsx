import { CardActions, CardText, CardTitle } from 'material-ui/Card';

import { Alert } from 'react-bootstrap';
import FlatButton from 'material-ui/FlatButton';
import React from 'react';

import { VerticalCanvas, GlassCard } from 'meteor/clinical:glass-ui';

export class WelcomePatientPage extends React.Component {
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
      <div id="welcomePatientPage">
        <VerticalCanvas>
          <GlassCard >
            <CardTitle
              title="Welcome!"
            />
            <CardText>
              <p>Etiam tempus massa in mi condimentum, vitae ullamcorper turpis pellentesque. Curabitur condimentum vestibulum eros, sit amet pellentesque ipsum rutrum sed. Nam a pulvinar arcu, non venenatis ligula. Maecenas vestibulum congue interdum. Aenean a arcu ut augue condimentum laoreet eu sed lacus. Nulla at tortor pretium, finibus sapien at, porta eros. Fusce rutrum finibus purus, quis hendrerit libero fermentum nec. Quisque sit amet metus congue, scelerisque metus ut, pharetra nisl. Mauris quis placerat nibh.</p>
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
export default WelcomePatientPage;
