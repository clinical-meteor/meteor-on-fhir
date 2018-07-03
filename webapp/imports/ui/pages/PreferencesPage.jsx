import React from 'react';

import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { VerticalCanvas, GlassCard } from 'meteor/clinical:glass-ui';
import { CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';

export class PreferencesPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id="preferencesPage">
        <VerticalCanvas >
          <GlassCard height='auto' width='768px'>
            <CardTitle
                title="Preferences" />
            <CardText>
            </CardText>                
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}
