import { 
  CardTitle
} from 'material-ui';

import React from 'react';

import { DefaultPrivacyPolicyCard } from '/imports/ui/components/PrivacyPolicyCard';
import { GlassCard, VerticalCanvas, Glass } from 'meteor/clinical:glass-ui';

import { TermsConditionsCard } from '../components/TermsConditionsCard';


// if we find a TermsConditionsCard card in one of the packages
// we want to override the local version
Object.keys(Package).forEach(function(packageName){
  if(Package[packageName].TermsConditionsCard){
    TermsConditionsCard = Package[packageName].TermsConditionsCard;
  }
});


export class TermsConditionsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){

    let pageBackground = Glass.getContextImage();
    return(
      <div id="TermsConditionsPage" style={pageBackground} >
        <VerticalCanvas>
          <GlassCard height='auto'  zDepth={3} >
            <CardTitle
              title="Terms and Conditions"
            />
            <TermsConditionsCard />            
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}
export default TermsConditionsPage;