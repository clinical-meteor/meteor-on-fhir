import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { GlassCard } from '/imports/ui/components/GlassCard';
import React from 'react';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

export class MarketingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id="MarketingPage">
        <VerticalCanvas >
          <GlassCard height='auto' width='768px'>
            <AboutAppCard />
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}
