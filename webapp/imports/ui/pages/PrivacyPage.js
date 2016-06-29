import React from 'react';

import { PrivacyPolicyCard } from '/imports/ui/components/PrivacyPolicyCard';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { PageContainer } from '/imports/ui/components/PageContainer';


export class PrivacyPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id="privacyPage">
        <PageContainer>
          <GlassCard>
            <PrivacyPolicyCard />            
          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}
