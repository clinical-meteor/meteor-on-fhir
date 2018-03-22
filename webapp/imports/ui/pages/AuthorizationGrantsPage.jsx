import React from 'react';

import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { VerticalCanvas, GlassCard, DynamicSpacer } from 'meteor/clinical:glass-ui';
import { CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';

import { ConsentTable } from 'meteor/clinical:hl7-resource-consent'
import RaisedButton from 'material-ui/RaisedButton';

export class AuthorizationGrantsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id="authorizationGrantsPage">
        <VerticalCanvas >
          <GlassCard width='768px'>
            <CardTitle title="Advanced Care Directives" subtitle='Consents, living wills, advanced care directives, and other legal documents.' />
              <CardText>
              <RaisedButton
                  // id='changePasswordButton'
                  label='Consent to View Personal Health Info'
                  // onClick={this.changePassword.bind(this)}
                  className="muidocs-icon-action-delete"
                  primary={true}
                  style={{minWidth: '400px'}}
                  /><br/><br/>
              {/* <RaisedButton
                  // id='changePasswordButton'
                  label='Consent to View Mental Health Data'
                  // onClick={this.changePassword.bind(this)}
                  className="muidocs-icon-action-delete"
                  primary={true}
                  style={{minWidth: '400px'}}
                  /><br/><br/>                   */}
              <RaisedButton
                  // id='changePasswordButton'
                  label='Consent to Treat'
                  // onClick={this.changePassword.bind(this)}
                  className="muidocs-icon-action-delete"
                  primary={true}
                  style={{minWidth: '400px'}}
                  /><br/><br/>     
              <RaisedButton
                  // id='changePasswordButton'
                  label='OAuth 2.0 Consent'
                  // onClick={this.changePassword.bind(this)}
                  className="muidocs-icon-action-delete"
                  primary={true}
                  style={{minWidth: '400px'}}
                  /><br/><br/>
              <RaisedButton
                  // id='changePasswordButton'
                  label='My Final Days'
                  // onClick={this.changePassword.bind(this)}
                  className="muidocs-icon-action-delete"
                  primary={true}
                  style={{minWidth: '400px'}}
                  /><br/><br/>
              <RaisedButton
                  // id='changePasswordButton'
                  label='Quality of Life'
                  // onClick={this.changePassword.bind(this)}
                  className="muidocs-icon-action-delete"
                  primary={true}
                  style={{minWidth: '400px'}}
                  /><br/><br/>                  
              <RaisedButton
                  // id='changePasswordButton'
                  label='Organ Donations'
                  // onClick={this.changePassword.bind(this)}
                  className="muidocs-icon-action-delete"
                  primary={true}
                  style={{minWidth: '400px'}}
                  /><br/><br/>                             
              <RaisedButton
                  // id='changePasswordButton'
                  label='Organ Donations'
                  // onClick={this.changePassword.bind(this)}
                  className="muidocs-icon-action-delete"
                  primary={true}
                  style={{minWidth: '400px'}}
                  /><br/><br/>                                   
            </CardText>              
          </GlassCard>
          <DynamicSpacer />

          <GlassCard width='768px'>
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
