import React from 'react';

import { PrivacyPolicyCard } from '/imports/ui/components/PrivacyPolicyCard';
import { GlassCard, VerticalCanvas } from 'meteor/clinical:glass-ui';

export class PrivacyPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id="privacyPage">
        <VerticalCanvas>
          <GlassCard height='auto'>
            <PrivacyPolicyCard />            
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}
export default PrivacyPage;