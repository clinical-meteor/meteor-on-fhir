import React from 'react';

import { GlassCard, VerticalCanvas, DynamicSpacer } from 'meteor/clinical:glass-ui';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui';

import { PrivacyPolicyCard } from '/imports/ui/components/PrivacyPolicyCard';
import { PrivacyControlsCard } from '/imports/ui/components/PrivacyControlsCard';

import { Tab, Tabs } from '@material-ui/core';

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
    this.state = {
      value: 0
    };
  }
  handleChange = (event, value) => {
    this.setState({ value });
  }
  render(){
    const { classes } = this.props;
    const { value } = this.state;

    // var privacyControls;
    // if(Meteor.userId() && (typeof PrivacyControlsCard === "object")){
    //   privacyControls = <PrivacyControlsCard /> ;
    // }

    let tabStyle = {
      fontSize: '24px',
      lineHeight: '36px',
      fontWeight: 200,
      textTransform: 'capitalize'
    }

    let controlTab;
    if(Meteor.userId()){
      controlTab = <Tab label="Controls" style={tabStyle} />;
    }


    return(
      <div id="privacyPage">
        <VerticalCanvas>
          <GlassCard height='auto'>
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Privacy Policy" style={tabStyle} />
              { controlTab }
              {/* <Tab label="Consents" style={tabStyle} /> */}
            </Tabs>
            {value === 0 && <CardText>
              <PrivacyPolicyCard hideTitle={true} />
            </CardText>}
            {value === 1 && Meteor.userId() && <CardText>
              <PrivacyControlsCard hideTitle={true} />
            </CardText>}
            {/* {value === 2 && Meteor.userId() && <CardText>Consents</CardText>} */}

          </GlassCard>
          <DynamicSpacer />

        </VerticalCanvas>
      </div>
    );
  }
}
export default PrivacyPage;