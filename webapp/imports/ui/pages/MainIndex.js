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
      },
      showTilesUnderConstruction: false
    };

    let user = Meteor.user();
    if (user && user.roles) {
      user.roles.forEach(function(role){
        if (role === "sysadmin") {
          data.user.isAdmin = true;
        } else if (role === "practitioner") {
          data.user.isPractitioner = true;
        } else if (role === "patient") {
          data.user.isPatient = true;
        }
      });
    }

    if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.app && Meteor.settings.public.app.underConstruction) {
      data.showTilesUnderConstruction = Meteor.settings.public.app.underConstruction;
    }


    if (Session.get('appWidth') < 768) {
      data.style.indexCardPadding.width = '100%';
      data.style.indexCardPadding.marginBottom = '20px';

      data.style.inactiveIndexCard.width = '100%';
      data.style.inactiveIndexCard.marginBottom = '20px';

      data.style.spacer.display = 'none';
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);

    if(process.env.NODE_ENV === "test") console.log("MainIndex[data]", data);
    return data;
  }
  render() {
    return (
      <div id='indexPage'>
        <VerticalCanvas>


          {this.renderAdminTiles(this.data.user.isAdmin)}
          {this.renderPractitionerTiles(this.data.user.isPractitioner, this.data.user.isAdmin)}
          {this.renderPatientTiles(this.data.user.isPatient)}
          {this.renderClinicalTiles(this.data.user)}
          {this.renderTilesUnderConstruction(this.data.user, this.data.showTilesUnderConstruction)}

        </VerticalCanvas>
      </div>
    );
  }

  renderAdminTiles(isAdmin){
    if (isAdmin) {
      return (
        <div>
          <div id='inboundMessagesTile' style={this.data.style.indexCardPadding} onClick={ this.openInboundMessages.bind(this) } >
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
  }
  renderPatientTiles(isPatient){
    if (isPatient) {
      return (
        <div>

          <div id='dataManagementTile' style={this.data.style.indexCardPadding} onClick={ this.openDataManagement.bind(this) } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Data Management'
                subtitle='Import/export data.'
              />
            </GlassCard>
          </div>

          <div id='observationsTile' style={this.data.style.indexCardPadding} onClick={ this.openObservations.bind(this) } >
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
  }
  renderClinicalTiles(user){
    if (user.isPatient || user.isPractitioner) {
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

        </div>
      );
    }
  }
  renderPractitionerTiles(isPractitioner, isAdmin){
    if (isPractitioner || isAdmin) {
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

          <div id='devicesTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/devices') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Devices'
                subtitle='Equipment and devices.'
              />
            </GlassCard>
          </div>
          <div id="medicationsTile" style={this.data.style.indexCardPadding} onClick={ this.openMedications.bind(this) } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Medication Inventory'
                subtitle='Crash carts, first responder kits, and surgical prep.'
              />
            </GlassCard>
          </div>
          <Spacer style={this.data.style.spacer} />

        </div>
      );
    }
  }

  renderTilesUnderConstruction(user, showTilesUnderConstruction){
    if (showTilesUnderConstruction) {
      if (user.isPractitioner || user.isAdmin) {
        return (
          <div>

            <div id='checklistsTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/checklists') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title='Checklist Manifesto'
                  subtitle='Checklists lead to better outcomes.'
                />
              </GlassCard>
            </div>
            <div id="hipaaLogTile" style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/hipaa-log') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title='Audit Log'
                  subtitle='HIPAA compliance and access logs.'
                />
              </GlassCard>
            </div>
            <Spacer style={this.data.style.spacer} />


            <div id='myGenomeTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/my-genome') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title='My Genome'
                  subtitle='A basic 23 and Me genome explorer.'
                />
              </GlassCard>
            </div>

            <div id='radiographsTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/radiology') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title='Radiographs'
                  subtitle='Medical images and radiographs.'
                />
              </GlassCard>
            </div>
            <Spacer style={this.data.style.spacer} />

            <div id="dermatogramsTile" style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/dermatograms') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title='Dermatograms'
                  subtitle='Mole counts, burn coverage, body sites, etc.'
                />
              </GlassCard>
            </div>
            <div id="locationsTile" style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/locations') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title='Locations'
                  subtitle='Locations and geomapping.'
                />
              </GlassCard>
            </div>
            <Spacer style={this.data.style.spacer} />

            <div id="questionnairesTile" style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/questionnaires') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title='Questionnaires'
                  subtitle='Questionnaires and miscellaneous data collection.'
                />
              </GlassCard>
            </div>
            <div id='questionnaireResponsesTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/questionnaire-responses') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title='Questionnaire Responses'
                  subtitle='Patient responses to questionnaires.'
                />
              </GlassCard>
            </div>
            <Spacer style={this.data.style.spacer} />

            <div id="carePlansTile" style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/appointments') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title='CarePlans'
                  subtitle='Treatment careplans.'
                />
              </GlassCard>
            </div>

            <div id='conditionsTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/questionnaire-responses') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title='Conditions'
                  subtitle='Conditions that a patient might have.'
                />
              </GlassCard>
            </div>
            <Spacer style={this.data.style.spacer} />

            <div id="appointmentsTile" style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/appointments') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title='Appointments'
                  subtitle='Appointments, slots, schedules, and calendars.'
                />
              </GlassCard>
            </div>
            <div id='conditionsTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/questionnaire-responses') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title='Diagnostic Report'
                  subtitle='Findings associated with a diagnostic laboratory procedure.'
                />
              </GlassCard>
            </div>
            <Spacer style={this.data.style.spacer} />

            <div id='telemedicineTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/telemed') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title='Telemedicine'
                  subtitle='Point-to-point video conferencing.'
                />
              </GlassCard>
            </div>
            <div id='allergyIntoleranceTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/allergies') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title='Allergy Intolerances'
                  subtitle='Allergy intolerances.'
                />
              </GlassCard>
            </div>

          </div>);
      }
    }
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
  openMedications(){
    browserHistory.push('/medications');
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
