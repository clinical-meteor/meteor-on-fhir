import React from 'react';
import { browserHistory } from 'react-router';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { PageContainer } from '../components/PageContainer';

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
            Welcome Patient!

            
          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}
