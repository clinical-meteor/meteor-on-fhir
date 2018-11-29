// https://material.io/icons/
// https://andy-pro.github.io/icon-viewer/

import { Alert, Grid, Container, Col, Row } from 'react-bootstrap';

import { CardTitle, Card, CardText, CardActions } from 'material-ui';
import { Glass, GlassCard, FullPageCanvas, DynamicSpacer } from 'meteor/clinical:glass-ui';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { browserHistory } from 'react-router';
import { has, get } from 'lodash';
import PropTypes from 'prop-types';

import { MenuTile } from '/imports/ui/components/MenuTile';

import { ObservationsTable } from 'meteor/clinical:hl7-resource-observation';

import FaStreetView from 'react-icons/fa';
import FaHeartbeat from 'react-icons/fa';
import FaEye from 'react-icons/fa';
import FaEyeDropper from 'react-icons/fa';
import FaFlask from 'react-icons/fa';
import IoMdErlenmeyerFlask from 'react-icons/io';
import IoMdErlenmeyerFlaskBubbles from 'react-icons/io';
import FaList from 'react-icons/fa';
import FaMapMarker from 'react-icons/fa';
import FaMedkit from 'react-icons/fa';
import IoMdMedkitNormal from 'react-icons/io';
import IoMdMedkitOutline from 'react-icons/io';
import FaMobile from 'react-icons/fa';
import FaMoon from 'react-icons/fa';
import FaBuilding from 'react-icons/fa';
import FaCheck from 'react-icons/fa';
import GoPulse from 'react-icons/go';
import GoBroadcast from 'react-icons/go';
import GoBug from 'react-icons/go';
import GoPerson from 'react-icons/go';
import GoOrganization from 'react-icons/go';
import IoMdClipboard from 'react-icons/io';
import IoMdPulseNormal from 'react-icons/io';
import IoMdPulseStrong from 'react-icons/io';
import IoMdNuclear from 'react-icons/io';
import IoMdNoSmoking from 'react-icons/io';
import IoMdLeaf from 'react-icons/io';
import IoMdRibbon from 'react-icons/io';
import IoMdNutrition from 'react-icons/io';
import MdLocalPhramacy from 'react-icons/md';
import MdAddAlert from 'react-icons/md';
import MdList from 'react-icons/md';
import MdDashboard from 'react-icons/md';
import MdDataUsage from 'react-icons/md';
import MdFingerprint from 'react-icons/md';
import MdHearing from 'react-icons/md';
import MdImportantDevices from 'react-icons/md';

// import Pulse from 'react-icons/lib/io/ios-pulse';
// import Male from 'react-icons/lib/io/ios-male';
// import Female from 'react-icons/lib/io/ios-female';



import { VitalMeasurements } from 'meteor/clinical:hl7-resource-observation';




Session.setDefault('filterMainTiles', false);
export class MainIndex extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {
      style: {
        sectionTitle: {
          display: 'inline-block'
        },
        spacer: {
          display: 'block'
        },
        column: {
          paddingLeft: '5px',
          paddingRight: '5px',
          //border: '1px solid orange'
        }
      },
      col: {
        md: 12,
        mdOffset: 0,
        lg: 6,
        lgOffset: 0
      },
      user: {
        isAdmin: false,
        isPractitioner: false,
        isPatient: true
      },
      showUnderConstruction: true,
      showExperimental: true,
      local: {
        allergies: 0,
        auditEvents: 0,
        carePlans: 0,
        conditions: 0,
        devices: 0,
        diagnosticReports: 0,
        goals: 0,
        immunizations: 0,
        locations: 0,
        medications: 0,
        medicationOrders: 0,
        medicationStatements: 0,
        observations: 0,
        organizations: 0,
        practitioners: 0,
        procedures: 0,
        riskAssessments: 0,
        serviceConfigs: 0
      },
      filterMainTiles: Session.get('filterMainTiles'),
      glassBlurEnabled: Session.get('glassBlurEnabled')
    };

    if( typeof AllergyIntolerances === "object" ){
      data.local.allergies = AllergyIntolerances.find().count();
    }
    if( typeof AuditEvents === "object" ){
      data.local.auditEvents = AuditEvents.find().count();
    }
    if( typeof CarePlans === "object" ){
      data.local.carePlans = CarePlans.find().count();
    }
    if( typeof Conditions === "object" ){
      data.local.conditions = Conditions.find().count();
    }
    if( typeof Devices === "object" ){
      data.local.devices = Devices.find().count();
    }
    if( typeof DiagnosticReports === "object" ){
      data.local.diagnosticReports = DiagnosticReports.find().count();
    }
    if( typeof Goals === "object" ){
      data.local.goals = Goals.find().count();
    }
    if( typeof Immunizations === "object" ){
      data.local.immunizations = Immunizations.find().count();
    }
    if( typeof Locations === "object" ){
      data.local.locations = Locations.find().count();
    }
    if( typeof Medicaitons === "object" ){
      data.local.medications = Medicaitons.find().count();
    }
    if( typeof MedicationOrders === "object" ){
      data.local.medicationOrders = MedicationOrders.find().count();
    }
    if( typeof MedicationStatements === "object" ){
      data.local.medicationStatements = MedicationStatements.find().count();
    }
    if( typeof Observations === "object" ){
      data.local.observations = Observations.find().count();
    }
    if( typeof Organizations === "object" ){
      data.local.organizations = Organizations.find().count();
    }
    if( typeof Practitioners === "object" ){
      data.local.practitioners = Practitioners.find().count();
    }
    if( typeof Procedures === "object" ){
      data.local.procedures = Procedures.find().count();
    }
    if( typeof RiskAssessments === "object" ){
      data.local.riskAssessments = RiskAssessments.find().count();
    }
    if( typeof ServiceConfiguration === "object" ){
      data.local.serviceConfigs = ServiceConfiguration.configurations.find().count();
    }

    data.style.indexCard = Glass.darkroom(data.style.indexCard);

    let user = Meteor.user();
    if (user && user.roles) {
      user.roles.forEach(function(role){
        if (role == "sysadmin") {
          data.user.isAdmin = true;
        } else if (role == "practitioner") {
          data.user.isPractitioner = true;
        } else if (role == "patient") {
          data.user.isPatient = true;
        }
      });
    }

    if (get(Meteor, 'settings.public.app.showUnderConstruction')) {
      data.showUnderConstruction =get(Meteor, 'settings.public.app.showUnderConstruction')
    }
    if (get(Meteor, 'settings.public.app.showExperimental')) {
      data.showExperimental = get(Meteor, 'settings.public.app.showExperimental');
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);

    if(process.env.NODE_ENV === "test") console.log("MainIndex[data]", data);
    return data;
  }
  render() {
    var self = this;

    var tilesToRender = [];
          
  
    var appRow = <Row>
      <Col sm={3} style={this.data.style.column} >
        {this.renderImportChart(this.data.user)}
      </Col>
      <Col sm={3} style={this.data.style.column} >
        {this.renderChecklists(this.data.user)}
      </Col>
      <Col sm={3} style={this.data.style.column}>
        {this.renderContinuityOfCare(this.data.user)}
      </Col>
      <Col sm={3} style={this.data.style.column}>
        {this.renderTimeline(this.data.user)}
        {/* {this.renderVideoconferencing(this.data.user)} */}
      </Col>
      {/* <Col sm={3} style={this.data.style.column}>
        {this.renderZygote(this.data.user)}
      </Col> */}
    </Row>


    return (
      <div id='indexPage'>
        <FullPageCanvas>
          <Col lgOffset={this.data.col.lgOffset} lg={this.data.col.lg} mdOffset={this.data.col.mdOffset} md={this.data.col.md}>
            {/* {this.renderAdminTiles(this.data.user)}

            {this.renderAppsSection(this.data.user)}
            { appRow } */}



            <VitalMeasurements />
            <DynamicSpacer />

            <GlassCard>
              <ObservationsTable 
                showSubjects={false}
                showDevices={false}
              />
            </GlassCard>

            {/* <br/>
            {this.renderUnderConstructionSection(this.data.user)}          

            {this.renderExperimentalSection(this.data.user)} */}
          </Col>

        </FullPageCanvas>
      </div>
    );
  }

  renderTile(user, tileConfig){
    if (user.isPatient || user.isPractitioner || user.isAdmin) {
      return (
        <MenuTile          
          id={ tileConfig.id }
          active={ tileConfig.active }
          path={ tileConfig.path }
          icon={ tileConfig.icon }
          iconSize={ 85 }
          title={ tileConfig.title }
          subtitle={ tileConfig.subtitle }
        />

      );
    }
  }
  renderExperimentalSection(user){
    if (get(Meteor, 'settings.public.home.showExperimental')) {
      if (user.isAdmin || user.isPractitioner) {
        return(
          <div>
            <CardTitle title="Experimental" style={this.data.style.sectionTitle} />  
            <br/>
            {this.renderExperimentalTiles(this.data.user)}

          </div>
        );
      }
    }
  }
  renderUnderConstructionSection(user){
    if (get(Meteor, 'settings.public.home.showUnderConstruction')) {
      if (user.isAdmin || user.isPractitioner) {
        return(
          <div>
            <CardTitle title="Under Construction" style={this.data.style.sectionTitle} /> 
            <br/>
            {this.renderTilesUnderConstruction(this.data.user)}
            {/* {this.renderImagingStudy(this.data.user)} */}
          </div>
        );
      }
    }
  }  
  renderAppsSection(user){
    if (get(Meteor, 'settings.public.home.showApps')) {
      if (user.isAdmin || user.isPractitioner || user.isPatient) {
        return(
          <div>
            <CardTitle title="Apps" style={this.data.style.sectionTitle} /> 
            <br/>
          </div>
        );
      }
    }
  }    
  // renderFhirSection(user){
  //   if (get(Meteor, 'settings.public.home.showFhirMenu')) {
  //     if (user.isAdmin || user.isPractitioner || user.isPatient || user.isUser) {
  //       return(
  //         <div>
  //           <br/>
  //           <CardTitle title="Fast Healthcare Interoperability Resources" style={this.data.style.sectionTitle} /><br/>  
  //           <br/>
  //         </div>
  //       );
  //     }
  //   }
  // }    




  renderAdminTiles(user){
    if (user.isAdmin) {
      return (
        <div>
          <CardTitle title="Admin Functionality" style={this.data.style.sectionTitle} />  
          <br />  

          <Row>
            <Col sm={3} style={this.data.style.column}>
              <MenuTile          
                id='oauthConfigTile'
                active={true}
                path='/oauth-config'
                icon='Clipboard'
                iconSize={65}
                title={ this.data.local.serviceConfigs }
                subtitle='OAuth Service Config'
              />  
            </Col>
            <Col sm={3} style={this.data.style.column}>
              <MenuTile          
                id='hipaaLogTile'
                active={true}
                path='/hipaa-audit-log'
                icon='Clipboard'
                iconSize={65}
                title={ this.data.local.auditEvents }
                subtitle='Audit Events'
              />  
            </Col>
            {/* <Col sm={3} style={this.data.style.column} >
              <MenuTile          
                id='inboundMessagesTile'
                active={true}
                path='/inbound-messages'
                iconSize={65}
                subtitle='Inbound Messages' />  
            </Col>
            <Col sm={3} style={this.data.style.column}>
              <MenuTile          
                id='outboundMessagesTile'
                active={true}
                path='/outbound-messages'
                iconSize={65}
                subtitle='Outbound Messages' />  
            </Col> */}
            {/* <Col sm={3} style={this.data.style.column}>
              <MenuTile          
                id='dataManagementTile'
                active={true}
                path='/data-management'
                iconSize={65}
                subtitle='Data Management' />  
            </Col> */}
          </Row>         
        </div>
      )
    }
  }

  renderExperimentalTiles(user){
    if (user.isPatient || user.isPractitioner || user.isAdmin) {
      return (
        <div>


            <div id='familyMemberHistoriesTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/family-member-histories') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title='Family Member History'
                  subtitle='Relevant medical histories of family members.'
                  titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
                />
              </GlassCard>
            </div>

            <div id="questionnairesTile" style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/questionnaires') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  subtitle='Questionnaires'
                  titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
                />
              </GlassCard>
            </div>
            <div id='questionnaireResponsesTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/questionnaire-responses') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  subtitle='Questionnaire Responses'
                  titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
                />
              </GlassCard>
            </div>


            <div id="appointmentsTile" style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/appointments') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  subtitle='Appointments'
                  titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
                />
              </GlassCard>
            </div>

            <div id='slotsTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/slots') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  subtitle='Slots'
                  titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
                />
              </GlassCard>
            </div>




            <div id='schedulesTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/schedules') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  subtitle='Schedules'
                  titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
                />
              </GlassCard>
            </div>


          <div id='forumTile' style={this.data.style.indexCardPadding} onClick={ this.openDiscussionForum.bind(this) }>
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                subtitle='Discussion Forum'
                titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>

          <div id='weblogTile' style={this.data.style.indexCardPadding} onClick={ this.openHealthlog.bind(this) } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                subtitle='Healthlog'
                titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>

          <div id="dermatogramsTile" style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/dermatograms') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                subtitle='Dermatograms'
                titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>

          <div id='telemedicineTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/telemed') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                subtitle='Telemedicine'
                titleStyle={this.data.style.title}
                subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
          <div id='myGenomeTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/my-genome') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                subtitle='My Genome'
                titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
          <div id="oAuthTile" style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/oauth-ui') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                subtitle='Authorization & Trust'
                titleStyle={this.data.style.title}
                subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
        </div>
      );
    }
  }


  renderImportChart(user){
    if (get(Meteor, 'settings.public.modules.apps.ImportChart')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <MenuTile          
            id='importChartTile'
            active={true}
            path='/import-chart'
            icon='MdList'
            iconSize={85}
            subtitle='Import Chart'
          />

        );
      }
    }    
  }
  renderChecklists(user){
    if (get(Meteor, 'settings.public.modules.apps.ChecklistManifesto') && get(Meteor, 'settings.public.modules.fhir.Lists')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <MenuTile          
            id='checklistsTile'
            active={true}
            path='/checklists'
            icon='MdList'
            iconSize={85}
            subtitle='Checklist Manifesto'
          />

        );
      }
    }
  }
  renderZygote(user){
    if (get(Meteor, 'settings.public.modules.apps.ZygoteAvatar')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (

          <MenuTile          
            id='zygoteAvatarTile'
            active={true}
            path='/zygote'
            icon='MdFingerprint'
            iconSize={85}
            subtitle='Zygote'
          />

        );
      }
    }
  }
  renderVideoconferencing(user){
    if (get(Meteor, 'settings.public.modules.apps.Videoconferencing')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <MenuTile          
            id='videoconferencingTile'
            active={true}
            path='/videoconferencing'
            icon='MdImportantDevices'
            iconSize={85}
            subtitle='Telemedicine'
          />
        );
      }
    }
  }
  renderContinuityOfCare(user){
    if (get(Meteor, 'settings.public.modules.apps.ContinuityOfCare')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <MenuTile          
            id='continuityOfCareTile'
            active={true}
            path='/continuity-of-care'
            icon='Heartbeat'
            iconSize={85}
            subtitle='Continuity of Care'
          />
        );
      }
    }
  }
  renderTimeline(user){
    if (get(Meteor, 'settings.public.modules.apps.Timeline')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <MenuTile          
            id='timelineTile'
            active={true}
            path='/timeline-sidescroll'
            icon='Pulse'
            iconSize={85}
            subtitle='Timeline'
          />
        );
      }
    }
  }


  renderTilesUnderConstruction(user, showUnderConstruction){
    // if (showUnderConstruction) {
    if (true) {
      if (user.isPractitioner || user.isAdmin) {
        return (
          <div>

            <div id='diagnosticReportsTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/diagnostic-reports') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title={<Heartbeat />}
                  subtitle='Diagnostic Reports'
                  titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
                />
              </GlassCard>
            </div>    

            <div id='bodySitesTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/body-sites') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title={<Heartbeat />}
                  subtitle='Body Sites'
                  titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
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
  hasUser: PropTypes.object
};
ReactMixin(MainIndex.prototype, ReactMeteorData);