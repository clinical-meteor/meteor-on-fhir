import React from 'react';

import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { VerticalCanvas, GlassCard } from 'meteor/clinical:glass-ui';
import { CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';

import { ConsentTable } from 'meteor/clinical:hl7-resource-consent'

export class AuthorizationGrantsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id="authorizationGrantsPage">
        <VerticalCanvas >
          <GlassCard height='auto' width='768px'>
            <CardTitle title="Consents & Authorizations" subtitle='OAuth tokens, HIPAA consents, Advanced Directives, etc.' />
              <CardText>
                <ConsentTable
                  simplified={ true }
                  patient="Jane Doe"
                />
            </CardText>              
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}
