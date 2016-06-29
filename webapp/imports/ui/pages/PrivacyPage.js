import React from 'react';

import { AboutAppCard } from '../components/AboutAppCard';
import { GlassCard } from '../components/GlassCard';
import { PageContainer } from '../components/PageContainer';


export class AboutPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id="PrivacyPage">
        <PageContainer>
          <GlassCard>
            <h2>Privacy</h2>
          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}
