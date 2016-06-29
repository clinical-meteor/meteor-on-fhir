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
      <div id="aboutPage">
        <PageContainer>
          <GlassCard>
            <AboutAppCard />
          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}
