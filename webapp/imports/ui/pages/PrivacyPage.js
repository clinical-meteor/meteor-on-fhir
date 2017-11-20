import React from 'react';

import { PrivacyPolicyCard } from '/imports/ui/components/PrivacyPolicyCard';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';


export class PrivacyPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id="privacyPage">
        <VerticalCanvas>
          <GlassCard>
            <PrivacyPolicyCard />            
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}
