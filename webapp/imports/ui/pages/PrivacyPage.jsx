import React from 'react';

import { DefaultPrivacyPolicyCard } from '/imports/ui/components/PrivacyPolicyCard';
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
            <DefaultPrivacyPolicyCard />            
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}
export default PrivacyPage;