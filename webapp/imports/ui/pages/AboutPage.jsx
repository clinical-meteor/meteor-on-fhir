import React from 'react';

import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { VerticalCanvas, GlassCard } from 'meteor/clinical:glass-ui';


export class AboutPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id="aboutPage">
        <VerticalCanvas >
          <GlassCard height='auto' width='768px'>
            <AboutAppCard />
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}
