import { CardHeader, CardText, CardTitle } from 'material-ui/Card';

import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { LandingPageContent } from 'meteor/clinical:landing-page';
import React from 'react';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

export class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id="LandingPage">
        <VerticalCanvas >
          <GlassCard height='auto' width='768px'>
            {/* <CardText>
              Landing page foo
            </CardText> */}
             <LandingPageContent /> 
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}
