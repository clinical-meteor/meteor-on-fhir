import React from 'react';

import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardHeader, CardText, CardActions } from 'material-ui/Card';


export class WelcomePatientPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id="adHocPage">
        <VerticalCanvas>
          <GlassCard>
            <CardHeader
              title="Privacy Policy & Terms of Agreement"
            />
            <CardText>
              {this.props.card}
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}
