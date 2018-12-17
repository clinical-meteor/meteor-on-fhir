import React from 'react';

import { GlassCard, VerticalCanvas, DynamicSpacer } from 'meteor/clinical:glass-ui';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui';

import { PrivacyPolicyCard } from '/imports/ui/components/PrivacyPolicyCard';
import { PrivacyControlsCard } from '/imports/ui/components/PrivacyControlsCard';

// if we find a PrivacyPolicy or PrivacyControl card in one of the packages
// we want to override the local version
Object.keys(Package).forEach(function(packageName){
  if(Package[packageName].PrivacyPolicyCard){
    PrivacyPolicyCard = Package[packageName].PrivacyPolicyCard;
  }
  if(Package[packageName].PrivacyControlsCard){
    PrivacyControlsCard = Package[packageName].PrivacyControlsCard;
  }
});


export class PrivacyPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    var privacyControls;
    if(Meteor.userId() && (typeof PrivacyControlsCard === "object")){
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