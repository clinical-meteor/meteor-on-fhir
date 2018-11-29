import React from 'react';

import { PrivacyPolicyCard } from '/imports/ui/components/PrivacyPolicyCard';
import { GlassCard, VerticalCanvas } from 'meteor/clinical:glass-ui';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui';

export class PrivacyPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id="privacyPage">
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle title='Privacy Policy' />
            <PrivacyPolicyCard />            
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}
export default PrivacyPage;