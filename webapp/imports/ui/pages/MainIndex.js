import { CardTitle } from 'material-ui/Card';
import React from 'react';
import ReactMixin from 'react-mixin';

import { ReactMeteorData } from 'meteor/react-meteor-data';
import Spacer from '/imports/ui/components/Spacer';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

import { browserHistory } from 'react-router';

export class MainIndex extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {
      style: {
        inactiveIndexCard: {
          opacity: .5,
          width: '50%',
          display: 'inline-block',
          paddingLeft: '20px',
          paddingRight: '20px'
        },
        indexCard: {
          cursor: 'pointer'
        },
        indexCardPadding: {
          width: '50%',
          display: 'inline-block',
          paddingLeft: '20px',
          paddingRight: '20px'
        },
        spacer: {
          display: 'block'
        }
      },
      user: {
        isAdmin: false,
        isPractitioner: false,
        isPatient: true
      }
    };

    if (Roles.userIsInRole(Meteor.userId(), 'sysadmin')) {
      data.user.isAdmin = true;
    }
    if (Roles.userIsInRole(Meteor.userId(), 'practitioner')) {
      data.user.isPractitioner = true;
    }
    if (!Roles.userIsInRole(Meteor.userId(), ['practitioner', 'sysadmin'])) {
      data.user.isPatient = false;
    }
    //// not sure how we want to do handle the default case
    //// so leaving out for now
    // if (Roles.userIsInRole(Meteor.userId(), 'sysadmin')) {
    //   data.user.isAdmin = true;
    // }

    if (Session.get('appWidth') < 768) {
      data.style.indexCardPadding.width = '100%';
      data.style.indexCardPadding.marginBottom = '20px';

      data.style.inactiveIndexCard.width = '100%';
      data.style.inactiveIndexCard.marginBottom = '20px';

      data.style.spacer.display = 'none';
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);

    if(process.env.NODE_ENV === "test") console.log("PractitionerDashboard[data]", data);
    return data;
  }
  render() {
    return (
      <div id='indexPage'>
        <VerticalCanvas>


          {this.renderPatientTiles(this.data.user.isPatient)}
          {this.renderPractitionerTiles(this.data.user.isPractitioner)}
          {this.renderAdminTiles(this.data.user.isAdmin)}

        </VerticalCanvas>
      </div>
    );
  }


  renderPatientTiles(isPatient){
    return (
      <div>
        <div id='forumTile' style={this.data.style.indexCardPadding} onClick={ this.openDiscussionForum.bind(this) }>
          <GlassCard style={this.data.style.indexCard} >
            <CardTitle
              title='Discussion Forum'
              subtitle='Get help developing healthcare apps using Meteor.js'
            />
          </GlassCard>
        </div>

        <div id='weblogTile' style={this.data.style.indexCardPadding} onClick={ this.openHealthlog.bind(this) } >
          <GlassCard style={this.data.style.indexCard} >
            <CardTitle
              title='Healthlog'
              subtitle='Post public thoughts using a Wordpress/Twitter style format.'
            />
          </GlassCard>
        </div>

        <Spacer style={this.data.style.spacer} />

        <div id='dataManagementTile' style={this.data.style.inactiveIndexCard} onClick={ this.openDataManagement.bind(this) } >
          <GlassCard style={this.data.style.indexCard} >
            <CardTitle
              title='Data Management'
              subtitle='Import/export data.'
            />
          </GlassCard>
        </div>

        <div id='forumTile' style={this.data.style.inactiveIndexCard} onClick={ this.openObservations.bind(this) } >
          <GlassCard style={this.data.style.indexCard} >
            <CardTitle
              title='Observations'
              subtitle='Observations from devices.'
            />
          </GlassCard>
        </div>
        <Spacer style={this.data.style.spacer} />

      </div>
    );
  }
  renderPractitionerTiles(isPractitioner){
    return (
      <div>
        <div id='patientsTile' style={this.data.style.indexCardPadding} onClick={ this.openPatients.bind(this) } >
          <GlassCard style={this.data.style.indexCard} >
            <CardTitle
              title='Patients'
              subtitle='Browse patient in system.'
            />
          </GlassCard>
        </div>
        <div id="practitionersTile" style={this.data.style.indexCardPadding} onClick={ this.openPractitioners.bind(this) } >
          <GlassCard style={this.data.style.indexCard} >
            <CardTitle
              title='Practitioners'
              subtitle='Browse practitioners in system.'
            />
          </GlassCard>
        </div>
          <Spacer style={this.data.style.spacer} />
      </div>
    );
  }
  renderAdminTiles(isAdmin){
    return (
      <div>
        <div id='inboundMessagesTile' style={this.data.style.inactiveIndexCard} onClick={ this.openInboundMessages.bind(this) } >
          <GlassCard style={this.data.style.indexCard} >
            <CardTitle
              title='Inbound Messages'
              subtitle='Inbound HL7 FHIR message log.'
            />
          </GlassCard>
        </div>
        <div id="outboundMessagesTile" style={this.data.style.inactiveIndexCard} onClick={ this.openOutboundMessages.bind(this) } >
          <GlassCard style={this.data.style.indexCard} >
            <CardTitle
              title='Outbound Messages'
              subtitle='Outbound HL7 log.'
            />
          </GlassCard>
        </div>
          <Spacer style={this.data.style.spacer} />
      </div>
    );
  }

  openDiscussionForum(){
    browserHistory.push('/forum');
  }
  openHealthlog(){
    browserHistory.push('/weblog');
  }
  openUserManagement(){
    browserHistory.push('/users');
  }
  openMyProfile(){
    browserHistory.push('/myprofile');
  }
  openPatients(){
    browserHistory.push('/patients');
  }
  openPractitioners(){
    browserHistory.push('/practitioners');
  }
  openDataManagement(){
    browserHistory.push('/data-management');
  }
  openObservations(){
    browserHistory.push('/observations');
  }
  openInboundMessages(){
    browserHistory.push('/inbound');
  }
  openOutboundMessages(){
    browserHistory.push('/outbound');
  }
  openLink(url){
    console.log("openLink", url);

    browserHistory.push(url);
  }
}




MainIndex.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(MainIndex.prototype, ReactMeteorData);
