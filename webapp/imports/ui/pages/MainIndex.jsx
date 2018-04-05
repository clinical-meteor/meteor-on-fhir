// https://material.io/icons/
// https://andy-pro.github.io/icon-viewer/

import { Container, Col, Row } from 'react-bootstrap';

import { CardTitle, Card, CardText, CardActions } from 'material-ui';
import { Glass, GlassCard, FullPageCanvas, VerticalCanvas } from 'meteor/clinical:glass-ui';
import { Meteor } from 'meteor/meteor';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { browserHistory } from 'react-router';
import { has, get } from 'lodash';
import PropTypes from 'prop-types';

import { MenuTile } from '/imports/ui/components/MenuTile';


import StreetView from 'react-icons/lib/fa/street-view';
import Heartbeat from 'react-icons/lib/fa/heartbeat';
import Eye from 'react-icons/lib/fa/eye';
import EyeDropper from 'react-icons/lib/fa/eyedropper';
import Flask from 'react-icons/lib/fa/flask';
import ErlenmeyerFlask from 'react-icons/lib/io/erlenmeyer-flask';
import ErlenmeyerFlaskBubbles from 'react-icons/lib/io/erlenmeyer-flask-bubbles';
import List from 'react-icons/lib/fa/list';
import MapMarker from 'react-icons/lib/fa/map-marker';
import Medkit from 'react-icons/lib/fa/medkit';
import MedkitNormal from 'react-icons/lib/io/ios-medkit';
import MedkitOutline from 'react-icons/lib/io/ios-medkit-outline';
import Mobile from 'react-icons/lib/fa/mobile';
import Moon from 'react-icons/lib/fa/moon-o';
import Building from 'react-icons/lib/fa/building';
import Check from 'react-icons/lib/fa/check-circle';
import Pulse from 'react-icons/lib/go/pulse';
import Broadcast from 'react-icons/lib/go/broadcast';
import Bug from 'react-icons/lib/go/bug';
import Person from 'react-icons/lib/go/person';
import Organization from 'react-icons/lib/go/organization';
import Clipboard from 'react-icons/lib/io/clipboard';
import PulseNormal from 'react-icons/lib/io/ios-pulse';
import PulseStrong from 'react-icons/lib/io/ios-pulse-strong';
import Nuclear from 'react-icons/lib/io/nuclear';
import NoSmoking from 'react-icons/lib/io/no-smoking';
import Leaf from 'react-icons/lib/io/leaf';
import Ribbon from 'react-icons/lib/io/ribbon-b';
import Nutrition from 'react-icons/lib/io/ios-nutrition';
import MdLocalPhramacy from 'react-icons/lib/md/local-pharmacy';
import MdAddAlert from 'react-icons/lib/md/add-alert';
import MdList from 'react-icons/lib/md/list';
import MdDashboard from 'react-icons/lib/md/dashboard';
import MdDataUsage from 'react-icons/lib/md/data-usage';
import MdFingerprint from 'react-icons/lib/md/fingerprint';
import MdHearing from 'react-icons/lib/md/hearing';
import MdImportantDevices from 'react-icons/lib/md/important-devices';


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
          paddingRight: '5px'
        }
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
        riskAssessments: 0
      }
    };

    if( typeof AllergyIntolerances === "object" ){
      data.local.allergies = AllergyIntolerances.find().count();
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

    data.style.indexCard = Glass.darkroom(data.style.indexCard);

    let user = Meteor.user();
    if (user && user.roles) {
      user.roles.forEach(function(role){
        if (role == "sysadmin") {
          data.user.isAdmin = true;
          // data.style.sectionTitle.display = 'inline-block';
        } else if (role == "practitioner") {
          data.user.isPractitioner = true;
          // data.style.sectionTitle.display = 'inline-block';
        } else if (role == "patient") {
          data.user.isPatient = true;
          // data.style.sectionTitle.display = 'inline-block';
        }
      });
    }

    if (get(Meteor, 'settings.public.app.showUnderConstruction')) {
      data.showUnderConstruction =get(Meteor, 'settings.public.app.showUnderConstruction')
    }
    if (get(Meteor, 'settings.public.app.showExperimental')) {
      data.showExperimental = get(Meteor, 'settings.public.app.showExperimental');
    }


    if (Session.get('appWidth') < 768) {
      data.style.indexCardPadding.width = '100%';
      data.style.indexCardPadding.marginBottom = '10px';
      data.style.indexCardPadding.paddingBottom = '10px';
      data.style.indexCardPadding.paddingLeft = '0px';
      data.style.indexCardPadding.paddingRight = '0px';

      data.style.inactiveIndexCard.width = '100%';
      data.style.inactiveIndexCard.marginBottom = '10px';
      data.style.inactiveIndexCard.paddingBottom = '10px';
      data.style.inactiveIndexCard.paddingLeft = '0px';
      data.style.inactiveIndexCard.paddingRight = '0px';

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
          <div>

            {this.renderAdminTiles(this.data.user)}

            {this.renderAppsSection(this.data.user)}
              <Row>
                <Col sm={3} style={this.data.style.column} >
                  {this.renderChecklists(this.data.user)}
                </Col>
                <Col sm={3} style={this.data.style.column}>
                  {this.renderVideoconferencing(this.data.user)}
                </Col>
                <Col sm={3} style={this.data.style.column}>
                  {this.renderContinuityOfCare(this.data.user)}
                </Col>
                <Col sm={3} style={this.data.style.column}>
                  {this.renderZygote(this.data.user)}
                </Col>
              </Row>


            {this.renderFhirSection(this.data.user)}
              <Row>
                <Col sm={3} style={this.data.style.column}>
                  {this.renderAllergies(this.data.user)}
                </Col>
                <Col sm={3} style={this.data.style.column}>
                  {this.renderCarePlans(this.data.user)}
                </Col>
                <Col sm={3} style={this.data.style.column}>
                  {this.renderConditions(this.data.user)}
                </Col>
                <Col sm={3} style={this.data.style.column}>
                {this.renderDevices(this.data.user)}
                </Col>
              </Row>


              <Row>
                <Col sm={3} style={this.data.style.column}>
                  {this.renderDiagnosticReport(this.data.user)}
                </Col>
                <Col sm={3} style={this.data.style.column}>
                  {this.renderGoals(this.data.user)}
                </Col>
                <Col sm={3} style={this.data.style.column}>
                  {this.renderImmunizations(this.data.user)}
                </Col>
                <Col sm={3} style={this.data.style.column}>
                  {this.renderLocations(this.data.user)}
                </Col>
              </Row>

              <Row>
                <Col sm={3} style={this.data.style.column}>
                {this.renderOrganizations(this.data.user)}
                </Col>
                <Col sm={3} style={this.data.style.column}>
                  {this.renderMedications(this.data.user)}
                </Col>
                <Col sm={3} style={this.data.style.column}>
                  {this.renderMedicationOrders(this.data.user)}
                </Col>
                <Col sm={3} style={this.data.style.column}>
                  {this.renderMedicationStatements(this.data.user)}
                </Col>
              </Row>


              <Row>
                <Col sm={3} style={this.data.style.column}>
                  {this.renderObservations(this.data.user)}
                </Col>
                <Col sm={3} style={this.data.style.column}>
                  {this.renderPractitioners(this.data.user)}
                </Col>
                <Col sm={3} style={this.data.style.column}>
                  {this.renderProcedures(this.data.user)}
                </Col>
                <Col sm={3} style={this.data.style.column}>
                  {this.renderRiskAssessments(this.data.user)}
                </Col>
              </Row>
              <Row>
                <Col sm={3} style={this.data.style.column}>
                  {this.renderPatients(this.data.user)}
                </Col>
                <Col sm={3} style={this.data.style.column}>
                </Col>
                <Col sm={3} style={this.data.style.column}>
                </Col>
                <Col sm={3} style={this.data.style.column}>
                </Col>
              </Row>






            <br/>
            {this.renderUnderConstructionSection(this.data.user)}          

            {this.renderExperimentalSection(this.data.user)}
          </div>

        </VerticalCanvas>
      </div>
    );
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
            {this.renderImagingStudy(this.data.user)}
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
  renderFhirSection(user){
    if (get(Meteor, 'settings.public.home.showFhirMenu')) {
      if (user.isAdmin || user.isPractitioner || user.isPatient || user.isUser) {
        return(
          <div>
            <br/>
            <CardTitle title="Fast Healthcare Interoperability Resources" style={this.data.style.sectionTitle} /><br/>  
            <br/>
          </div>
        );
      }
    }
  }    




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
                path='/oauth-client'
                icon='Clipboard'
                iconSize={65}
                subtitle='Authorization Grants'
              />  
            </Col>
            <Col sm={3} style={this.data.style.column}>
              <MenuTile          
                id='hipaaLogTile'
                active={true}
                path='/hipaa-log'
                icon='Clipboard'
                iconSize={65}
                subtitle='Audit Events'
              />  
            </Col>
            <Col sm={3} style={this.data.style.column} >
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
            </Col>
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


  renderImmunizations(user){
    if (get(Meteor, 'settings.public.modules.fhir.Immunizations')) {
      if (user.isPractitioner || user.isAdmin || user.isPatient) {
        return (
          <MenuTile          
            id='immunizationsTile'
            active={true}
            path='/immunizations'
            icon='EyeDropper'
            iconSize={65}
            title={ this.data.local.immunizations  }
            subtitle='Immunizations'
          />              
        );
      }
    }
  }


  renderAllergies(user){
    if (get(Meteor, 'settings.public.modules.fhir.AllergyIntolerances')) {
      if (user.isPractitioner || user.isAdmin || user.isPatient) {
        return (
          <MenuTile          
            id='allergyIntoleranceTile'
            active={true}
            path='/allergies'
            icon='StreetView'
            iconSize={65}
            title={ this.data.local.allergies  }
            subtitle='Allergy Intolerances'
          />          
        );
      }
    }
  }

  renderProcedures(user){
    if (get(Meteor, 'settings.public.modules.fhir.Procedures')) {
      if (user.isPractitioner || user.isAdmin || user.isPatient) {
        return (
          <MenuTile          
            id='proceduresTile'
            active={true}
            path='/procedures'
            icon='Nuclear'
            iconSize={65}
            title={ this.data.local.procedures  }
            subtitle='Procedures'
          /> 
        );
      }
    }
  }
  renderPatients(user){
    if (get(Meteor, 'settings.public.modules.fhir.Patients')) {
      if (user.isPractitioner || user.isAdmin) {
        return (
          <MenuTile          
            id='patientsTile'
            active={true}
            path='/patients'
            icon='Person'
            iconSize={65}
            title={ this.data.local.patients  }
            subtitle='Patients'
          />               
        );
      }
    }
  }
  renderPractitioners(user){
    if (get(Meteor, 'settings.public.modules.fhir.Practitioners')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <MenuTile          
            id='practitionersTile'
            active={true}
            path='/practitioners'
            icon='Person'
            iconSize={65}
            title={ this.data.local.practitioners  }
            subtitle='Practitioners'
          />                
        );
      }
    }
  }
  renderObservations(user){
    if (get(Meteor, 'settings.public.modules.fhir.Observations')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <MenuTile          
            id='observationsTile'
            active={true}
            path='/observations'
            icon='Pulse'
            iconSize={85}
            title={ Observations.find().count()  }
            subtitle='Observations'
          />

          // <div id='observationsTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/observations') } >
          //   <Card id='observationThumbnail' className='thumbnail' style={this.data.style.thumbnail} zDepth={1} >
          //     <Pulse size={85} />
          //   </Card>
          //   <GlassCard className='tile' style={this.data.style.indexCard} >
          //     <CardTitle
          //       title={ Observations.find().count()  }
          //       subtitle='Observations'
          //       titleStyle={this.data.style.title}
          //       subtitleStyle={this.data.style.subtitle}
          //     />
          //   </GlassCard>
          // </div>
        );
      }
    }
  }
  renderOrganizations(user){
    if (get(Meteor, 'settings.public.modules.fhir.Organizations')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <MenuTile          
            id='organizationsTile'
            active={true}
            path='/organizations'
            icon='Building'
            iconSize={65}
            title={ this.data.local.organizations  }
            subtitle='Organizations'
          />
        );
      }
    }
  }
  renderLocations(user){
    if (get(Meteor, 'settings.public.modules.fhir.Locations')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
            <MenuTile          
              id='locationsTile'
              active={true}
              path='/locations'
              icon='MapMarker'
              iconSize={65}
              title={ this.data.local.locations  }
              subtitle='Locations'
            />
        );
      }
    }
  }
  renderMedications(user){
    if (get(Meteor, 'settings.public.modules.fhir.Medications')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          
          <MenuTile          
            id='medicationsTile'
            active={true}
            path='/medications'
            icon='Flask'
            iconSize={65}
            title={ this.data.local.medications  }
            subtitle='Medications'
          />
        );
      }
    }
  }
  renderDevices(user){
    if (get(Meteor, 'settings.public.modules.fhir.Devices')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <MenuTile          
            id='devicesTile'
            active={true}
            path='/devices'
            icon='Mobile'
            iconSize={65}
            title={ this.data.local.devices  }
            subtitle='Devices'
          />          
        );
      }
    }
  }
  renderChecklists(user){
    if (get(Meteor, 'settings.public.modules.apps.ChecklistManifesto')) {
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

  renderRiskAssessments(user){
    if (get(Meteor, 'settings.public.modules.fhir.RiskAssessments')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <MenuTile          
            id='riskAssessmentsTile'
            active={true}
            path='/risk-assessments'
            icon='MdAddAlert'
            iconSize={65}
            title={ this.data.local.riskAssessments  }
            subtitle='Risk Assessments'
          />   
        );
      }
    }
  }

  renderConditions(user){
    if (get(Meteor, 'settings.public.modules.fhir.Conditions')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <MenuTile          
            id='conditionsTile'
            active={true}
            path='/conditions'
            icon='Heartbeat'
            iconSize={65}
            title={ this.data.local.conditions  }
            subtitle='Conditions'
          /> 
        );
      }
    }
  }  

  // renderAllergyIntolerance(user){
  //   if (get(Meteor, 'settings.public.modules.fhir.AllergyIntolerances')) {
  //     if (user.isPatient || user.isPractitioner || user.isAdmin) {
  //       return (
  //         <MenuTile          
  //           id='allergyIntoleranceTile'
  //           active={true}
  //           path='/allergies'
  //           icon='Heartbeat'
  //           iconSize={65}
  //           title={ this.data.local.allergies  }
  //           subtitle='Allergy Intolerances'
  //         /> 
  //       );
  //     }
  //   }
  // }   
  renderMedicationStatements(user){
    if (get(Meteor, 'settings.public.modules.fhir.MedicationStatements')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <MenuTile          
            id='medicationStatementsTile'
            active={true}
            path='/medication-statements'
            icon='MdLocalPhramacy'
            iconSize={65}
            title={ this.data.local.medicationStatements  }
            subtitle='Medication Statements'
          />             
        );
      }
    }
  }   
  


  renderImagingStudy(user){
    if (get(Meteor, 'settings.public.modules.fhir.ImagingStudies')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <MenuTile          
            id='imagingStudiesTile'
            active={true}
            path='/radiology'
            icon='Heartbeat'
            iconSize={65}
            title={ this.data.local.imagingStudies  }
            subtitle='Imaging Studies'
          />             
        );
      }
    }
  }   


  renderDiagnosticReport(user){
    if (get(Meteor, 'settings.public.modules.fhir.DiagnosticReports')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <MenuTile          
            id='diagnosticReportsTile'
            active={true}
            path='/diagnostic-reports'
            icon='Clipboard'
            iconSize={85}
            title={  this.data.local.diagnosticReports }
            subtitle='Diagnostic Reports'
          />           
        );
      }
    }
  }    
  
  renderGoals(user){
    if (get(Meteor, 'settings.public.modules.fhir.Goals')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <MenuTile          
            id='goalsTile'
            active={true}
            path='/goals'
            icon='NoSmoking'
            iconSize={65}
            title={ this.data.local.goals  }
            subtitle='Goals'
          />       
        );
      }
    }
  }      


  
  
  renderCarePlans(user){
    if (get(Meteor, 'settings.public.modules.fhir.CarePlans')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <MenuTile          
            id='carePlansTile'
            active={true}
            path='/care-plans'
            icon='Clipboard'
            iconSize={65}
            title={ this.data.local.carePlans  }
            subtitle='Care Plans'
          />            
        );
      }
    }
  }      

  renderMedicationOrders(user){
    if (get(Meteor, 'settings.public.modules.fhir.MedicationOrders')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <MenuTile          
            id='medicationOrderTile'
            active={true}
            path='/medication-orders'
            icon='MdLocalPhramacy'
            iconSize={65}
            title={ this.data.local.medicationOrders  }
            subtitle='Medication Orders'
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