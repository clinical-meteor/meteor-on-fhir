import React from 'react';

import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';


export class AboutPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id="aboutPage">
        <VerticalCanvas >
          <GlassCard>
            <AboutAppCard />
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}
