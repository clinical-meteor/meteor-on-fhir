import React from 'react';
import { browserHistory } from 'react-router';

import { PageContainer } from '/imports/ui/components/PageContainer';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardText } from 'react-toolbox/lib/card';


export class WelcomePatientPage extends React.Component {
  constructor(props) {
    super(props);
  }

  handleGo(){
    browserHistory.push('/');
  }

  render(){
    return(
      <div id="welcomePatientPage">
        <PageContainer>
          <GlassCard>
            <CardText>
              Welcome Patient!
            </CardText>
          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}
