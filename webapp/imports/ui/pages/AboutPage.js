import React from 'react';

import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { PhoneContainer } from '/imports/ui/components/PhoneContainer';


export class AboutPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id="aboutPage">
        <PhoneContainer >
          <GlassCard>
            <AboutAppCard />
          </GlassCard>
        </PhoneContainer>
      </div>
    );
  }
}
