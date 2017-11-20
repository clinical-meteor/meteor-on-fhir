import React from 'react';

import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { CardTitle, CardText } from 'material-ui/Card';

export class NeedToBeSysadmin extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id="needToBeSysadmin">
        <VerticalCanvas >
          <GlassCard>
            <CardTitle
              title="Need To Be A Sysadmin"
            />
             <CardText>
              You need to be a practitioner to access this resource.
             </CardText>

          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}
