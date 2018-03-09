// https://material.io/icons/
// https://andy-pro.github.io/icon-viewer/

import { Container, Col, Row } from 'react-bootstrap';

import { CardTitle } from 'material-ui/Card';
import { Glass, GlassCard, FullPageCanvas, VerticalCanvas } from 'meteor/clinical:glass-ui';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { browserHistory } from 'react-router';
import { has, get } from 'lodash';
import PropTypes from 'prop-types';

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
        inactiveIndexCard: {
          opacity: .5,
          width: '100%',
          display: 'inline-block',
          paddingBottom: '20px'
        },
        indexCard: {
          cursor: 'pointer',
          height: '240px',
          minHeight: '140px'          
        },
        indexCardPadding: {
          width: '100%',
          display: 'inline-block',
          paddingBottom: '20px'
        },
        spacer: {
          display: 'block'
        },
        title: Glass.darkroom({
          marginTop: '20px',
          textAlign: 'center',
          fontSize: '48px'
        }),
        subtitle: Glass.darkroom({
          textAlign: 'center',
          marginTop: '20px'
        }),
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
      showExperimental: true
    };

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

          <div id='inboundMessagesTile' style={this.data.style.indexCardPadding} onClick={ this.openInboundMessages.bind(this) } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                subtitle='Inbound Messages'
                titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
          <div id="outboundMessagesTile" style={this.data.style.indexCardPadding} onClick={ this.openOutboundMessages.bind(this) } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                subtitle='Outbound Messages'
                titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>

          <div id='dataManagementTile' style={this.data.style.indexCardPadding} onClick={ this.openDataManagement.bind(this) } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                subtitle='Data Management'
                titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>

          <div id="hipaaLogTile" style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/hipaa-log') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                subtitle='Audit Events'
                titleStyle={this.data.style.title}
                subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
          
        </div>
      );
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
          <div id='immunizationsTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/immunizations') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title={<EyeDropper />}
                subtitle='Immunizations'
                titleStyle={this.data.style.title}
                subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
        );
      }
    }
  }


  renderAllergies(user){
    if (get(Meteor, 'settings.public.modules.fhir.AllergyIntolerances')) {
      if (user.isPractitioner || user.isAdmin || user.isPatient) {
        return (
          <div id='allergyIntollerancesTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/allergies') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title={<StreetView />}
                subtitle='Allergy Intollerances'
                titleStyle={this.data.style.title}
                subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
        );
      }
    }
  }

  renderProcedures(user){
    if (get(Meteor, 'settings.public.modules.fhir.Procedures')) {
      if (user.isPractitioner || user.isAdmin || user.isPatient) {
        return (
          <div id='proceduresTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/procedures') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title={<Nuclear />}
                subtitle='Procedures'
                titleStyle={this.data.style.title}
                subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
        );
      }
    }
  }
  renderPatients(user){
    if (get(Meteor, 'settings.public.modules.fhir.Patients')) {
      if (user.isPractitioner || user.isAdmin) {
        return (
          <div id='patientsTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/patients') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title={<Person />}
                subtitle='Patients'
                titleStyle={this.data.style.title}
                subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
        );
      }
    }
  }
  renderPractitioners(user){
    if (get(Meteor, 'settings.public.modules.fhir.Practitioners')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id="practitionersTile" style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/practitioners') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title={<Person />}
                subtitle='Practitioners'
                titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
        );
      }
    }
  }
  renderObservations(user){
    if (get(Meteor, 'settings.public.modules.fhir.Observations')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id='observationsTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/observations') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title={<Pulse />}
                subtitle='Observations'
                titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
        );
      }
    }
  }
  renderOrganizations(user){
    if (get(Meteor, 'settings.public.modules.fhir.Organizations')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id='organizationsTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/organizations') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title={<Building />}
                subtitle='Organizations'
                titleStyle={this.data.style.title}
                subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
        );
      }
    }
  }
  renderLocations(user){
    if (get(Meteor, 'settings.public.modules.fhir.Locations')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id="locationsTile" style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/locations') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title={<MapMarker />}
                subtitle='Locations'
                titleStyle={this.data.style.title}
                subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
        );
      }
    }
  }
  renderMedications(user){
    if (get(Meteor, 'settings.public.modules.fhir.Medications')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id="medicationsTile" style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/medications') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title={<Flask />}
                subtitle='Medications'
                titleStyle={this.data.style.title}
                subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
        );
      }
    }
  }
  renderDevices(user){
    if (get(Meteor, 'settings.public.modules.fhir.Devices')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id='devicesTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/devices') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title={<Mobile />}
                subtitle='Devices'
                titleStyle={this.data.style.title}
                subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
        );
      }
    }
  }
  renderChecklists(user){
    if (get(Meteor, 'settings.public.modules.apps.ChecklistManifesto')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id='checklistsTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/checklists') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title={<MdList />}
                subtitle='Checklist Manifesto'
                titleStyle={this.data.style.title}
                subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
        );
      }
    }
  }
  renderZygote(user){
    if (get(Meteor, 'settings.public.modules.apps.ZygoteAvatar')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id='zygoteAvatarTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/zygote') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title={<MdFingerprint />}
                subtitle='Medical Avatar'
                titleStyle={this.data.style.title}
                subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
        );
      }
    }
  }
  renderVideoconferencing(user){
    if (get(Meteor, 'settings.public.modules.apps.Videoconferencing')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id='videoconferencingTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/videoconferencing') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title={<MdImportantDevices />}
                subtitle='Telemedicine'
                titleStyle={this.data.style.title}
                subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
        );
      }
    }
  }
  renderContinuityOfCare(user){
    if (get(Meteor, 'settings.public.modules.apps.ContinuityOfCare')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id='continuityOfCareTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/continuity-of-care') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title={<Heartbeat />}
                subtitle='Continuity of Care'
                titleStyle={this.data.style.title}
                subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
        );
      }
    }
  }

  renderRiskAssessments(user){
    if (get(Meteor, 'settings.public.modules.fhir.RiskAssessments')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id='riskAssessmentsTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/risk-assessments') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title={<MdAddAlert />}
                subtitle='Risk Assessments'
                titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
        );
      }
    }
  }

  renderConditions(user){
    if (get(Meteor, 'settings.public.modules.fhir.Conditions')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id='conditionsTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/conditions') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title={<Heartbeat />}
                subtitle='Conditions'
                titleStyle={this.data.style.title}
                subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
        );
      }
    }
  }  

  renderAllergyIntolerance(user){
    if (get(Meteor, 'settings.public.modules.fhir.AllergyIntolerances')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
            <div id='allergyIntoleranceTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/allergies') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title={<Heartbeat />}
                  subtitle='Allergy Intolerances'
                  titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
                />
              </GlassCard>
            </div>
        );
      }
    }
  }   
  renderMedicationStatements(user){
    if (get(Meteor, 'settings.public.modules.fhir.MedicationStatements')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
            <div id='medicationStatementsTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/medication-statements') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title={<MdLocalPhramacy />}
                  subtitle='Medication Statements'
                  titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
                />
              </GlassCard>
            </div>
        );
      }
    }
  }   
  


  renderImagingStudy(user){
    if (get(Meteor, 'settings.public.modules.fhir.ImagingStudies')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
            <div id='imagingStudiesTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/radiology') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title={<Heartbeat />}
                  subtitle='Imaging Studies'
                  titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
                />
              </GlassCard>
            </div>
        );
      }
    }
  }   


  renderDiagnosticReport(user){
    if (get(Meteor, 'settings.public.modules.fhir.DiagnosticReports')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
            <div id='diagnosticReportsTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/diagnostic-reports') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title={<Clipboard />}
                  subtitle='Diagnostic Report'
                  titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
                />
              </GlassCard>
            </div>
        );
      }
    }
  }    
  
  renderGoals(user){
    if (get(Meteor, 'settings.public.modules.fhir.Goals')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id='goalsTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/goals') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title={<NoSmoking />}
                subtitle='Goals'
                titleStyle={this.data.style.title}
                subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
        );
      }
    }
  }      


  
  
  renderCarePlans(user){
    if (get(Meteor, 'settings.public.modules.fhir.CarePlans')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id="carePlansTile" style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/care-plans') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title={<Clipboard />}
                subtitle='CarePlans'
                titleStyle={this.data.style.title}
                subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
        );
      }
    }
  }      

  renderMedicationOrders(user){
    if (get(Meteor, 'settings.public.modules.fhir.MedicationOrders')) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id='medicationOrderTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/medication-orders') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title={<MdLocalPhramacy />}
                subtitle='Medication Orders'
                titleStyle={this.data.style.title}
                subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>    
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