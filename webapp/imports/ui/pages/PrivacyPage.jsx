import React from 'react';

import { PrivacyPolicyCard } from '/imports/ui/components/PrivacyPolicyCard';
import { PrivacyControlsCard } from '/imports/ui/components/PrivacyControlsCard';
import { GlassCard, VerticalCanvas, DynamicSpacer } from 'meteor/clinical:glass-ui';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui';

export class PrivacyPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){

    var privacyControls;
    if(Meteor.userId()){
      privacyControls = <PrivacyControlsCard /> ;
    }
    return(
      <div id="privacyPage">
        <VerticalCanvas>
          <GlassCard height='auto'>
            <PrivacyPolicyCard />            
            { privacyControls}  
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}
export default PrivacyPage;