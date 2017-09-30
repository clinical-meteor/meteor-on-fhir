import { Col, Grid, Row } from 'react-bootstrap';

import { CardTitle } from 'material-ui/Card';
import { FullPageCanvas } from '/imports/ui/layouts/FullPageCanvas';
import Glass from '/imports/ui/Glass';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import Spacer from '/imports/ui/components/Spacer';
import { browserHistory } from 'react-router';
import { get } from 'lodash';

export class MainIndex extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {
      style: {
        sectionTitle: {
          display: 'none'
        },
        inactiveIndexCard: {
          opacity: .5,
          width: '100%',
          display: 'inline-block',
          paddingBottom: '20px'
        },
        indexCard: {
          cursor: 'pointer',
          height: '240px'
        },
        indexCardPadding: {
          width: '100%',
          display: 'inline-block',
          paddingBottom: '20px'
        },
        spacer: {
          display: 'block'
        },
        title: Glass.darkroom(),
        subtitle: Glass.darkroom()
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
          data.style.sectionTitle.display = 'inline-block';
        } else if (role == "practitioner") {
          data.user.isPractitioner = true;
          data.style.sectionTitle.display = 'inline-block';
        } else if (role == "patient") {
          data.user.isPatient = true;
          data.style.sectionTitle.display = 'inline-block';
        }
      });
    }

    if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.app && Meteor.settings.public.app.showUnderConstruction) {
      data.showUnderConstruction = Meteor.settings.public.app.showUnderConstruction;
    }
    if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.app && Meteor.settings.public.app.showExperimental) {
      data.showExperimental = Meteor.settings.public.app.showExperimental;
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
        <FullPageCanvas>

          {this.renderAdminTiles(this.data.user)}

          {this.renderAppsSection(this.data.user)}
            <Row>
              <Col md={3}>
                {this.renderChecklists(this.data.user)}
              </Col>
              <Col md={3}>
                {this.renderVideoconferencing(this.data.user)}
              </Col>
            </Row>


          {this.renderFhirSection(this.data.user)}
            <Row>
              <Col lg={3}>
                {this.renderAllergies(this.data.user)}
              </Col>
              <Col lg={3}>
                {this.renderCarePlans(this.data.user)}
              </Col>
              <Col lg={3}>
                {this.renderConditions(this.data.user)}
              </Col>
              <Col lg={3}>
              {this.renderDevices(this.data.user)}
              </Col>
            </Row>


            <Row>
              <Col lg={3}>
                {this.renderDiagnosticReport(this.data.user)}
              </Col>
              <Col lg={3}>
                {this.renderGoals(this.data.user)}
              </Col>
              <Col lg={3}>
                {this.renderImmunizations(this.data.user)}
              </Col>
              <Col lg={3}>
                {this.renderLocations(this.data.user)}
              </Col>
            </Row>

            <Row>
              <Col lg={3}>
              {this.renderOrganizations(this.data.user)}
              </Col>
              <Col lg={3}>
                {this.renderMedications(this.data.user)}
              </Col>
              <Col lg={3}>
                {this.renderMedicationOrders(this.data.user)}
              </Col>
              <Col lg={3}>
                {this.renderMedicationStatements(this.data.user)}
              </Col>
            </Row>


            <Row>
              <Col lg={3}>
                {this.renderObservations(this.data.user)}
              </Col>
              <Col lg={3}>
                {this.renderPractitioners(this.data.user)}
              </Col>
              <Col lg={3}>
                {this.renderProcedures(this.data.user)}
              </Col>
              <Col lg={3}>
                {this.renderRiskAssessments(this.data.user)}
              </Col>
            </Row>
            <Row>
              <Col lg={3}>
                {this.renderPatients(this.data.user)}
              </Col>
              <Col lg={3}>
              </Col>
              <Col lg={3}>
              </Col>
              <Col lg={3}>
              </Col>
            </Row>






          <br/>
          {this.renderUnderConstructionSection(this.data.user)}          

          {this.renderExperimentalSection(this.data.user)}

        </FullPageCanvas>
      </div>
    );
  }

  renderExperimentalSection(user){
    if (Meteor.settings.public.app.showExperimental) {
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
    if (Meteor.settings.public.platform.showUnderConstruction) {
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
    if (get(Meteor.settings, 'public.platform.showApps')) {
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
    if (get(Meteor.settings, 'public.platform.showFhirMenu')) {
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
                title='Inbound Messages'
                subtitle='Inbound HL7 FHIR message log.'
                titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
          <div id="outboundMessagesTile" style={this.data.style.indexCardPadding} onClick={ this.openOutboundMessages.bind(this) } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Outbound Messages'
                subtitle='Outbound HL7 log.'
                titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>

          <div id='dataManagementTile' style={this.data.style.indexCardPadding} onClick={ this.openDataManagement.bind(this) } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Data Management'
                subtitle='Import/export data.'
                titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>

          <div id="hipaaLogTile" style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/hipaa-log') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Audit Events'
                subtitle='HIPAA compliance and access logs.'
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
                  title='Questionnaires'
                  subtitle='Questionnaires and miscellaneous data collection.'
                  titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
                />
              </GlassCard>
            </div>
            <div id='questionnaireResponsesTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/questionnaire-responses') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title='Questionnaire Responses'
                  subtitle='Patient responses to questionnaires.'
                  titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
                />
              </GlassCard>
            </div>


            <div id="appointmentsTile" style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/appointments') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title='Appointments'
                  subtitle='Appointments, slots, schedules, and calendars.'
                  titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
                />
              </GlassCard>
            </div>

            <div id='slotsTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/slots') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title='Slots'
                  subtitle='Appointment slots.'
                  titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
                />
              </GlassCard>
            </div>




            <div id='schedulesTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/schedules') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title='Schedules'
                  subtitle='Medication schedules, treatment schedules, office schedules, etc.'
                  titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
                />
              </GlassCard>
            </div>


          <div id='forumTile' style={this.data.style.indexCardPadding} onClick={ this.openDiscussionForum.bind(this) }>
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Discussion Forum'
                subtitle='Get help developing healthcare apps using Meteor.js'
                titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>

          <div id='weblogTile' style={this.data.style.indexCardPadding} onClick={ this.openHealthlog.bind(this) } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Healthlog'
                subtitle='Post public thoughts using a Wordpress/Twitter style format.'
                titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>

          <div id="dermatogramsTile" style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/dermatograms') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Dermatograms'
                subtitle='Mole counts, burn coverage, body sites, etc.'
                titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>

          <div id='telemedicineTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/telemed') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Telemedicine'
                subtitle='Point-to-point video conferencing.'
                titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
          <div id='myGenomeTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/my-genome') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='My Genome'
                subtitle='A basic 23 and Me genome explorer.'
                titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
              />
            </GlassCard>
          </div>
          <div id="oAuthTile" style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/oauth-ui') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Authorization & Trust'
                subtitle='OAuth Server/Client Configuration'
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
    if (Meteor.settings.public.modules.fhir.Procedures) {
      if (user.isPractitioner || user.isAdmin || user.isPatient) {
        return (
          <div id='immunizationsTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/immunizations') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Immunizations'
                subtitle='Vaccines and immunizations.'
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
    if (Meteor.settings.public.modules.fhir.AllergyIntolerances) {
      if (user.isPractitioner || user.isAdmin || user.isPatient) {
        return (
          <div id='allergyIntollerancesTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/allergies') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Allergy Intollerances'
                subtitle='Things that might trigger autoimmunize responses.'
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
    if (Meteor.settings.public.modules.fhir.Procedures) {
      if (user.isPractitioner || user.isAdmin || user.isPatient) {
        return (
          <div id='proceduresTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/procedures') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Procedures'
                subtitle='Surgical procedures, outpatient therapy, sports therapy, etc.'
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
    if (Meteor.settings.public.modules.fhir.Patients) {
      if (user.isPractitioner || user.isAdmin) {
        return (
          <div id='patientsTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/patients') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Patients'
                subtitle='Browse patient in system.'
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
    if (Meteor.settings.public.modules.fhir.Practitioners) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id="practitionersTile" style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/practitioners') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Practitioners'
                subtitle='Browse practitioners in system.'
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
    if (Meteor.settings.public.modules.fhir.Observations) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id='observationsTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/observations') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Observations'
                subtitle='Observations from devices.'
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
    if (Meteor.settings.public.modules.fhir.Organizations) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id='organizationsTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/organizations') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Organizations'
                subtitle='Organizations that patients or practitioners may be part of.'
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
    if (Meteor.settings.public.modules.fhir.Locations) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id="locationsTile" style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/locations') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Locations'
                subtitle='Locations and geomapping.'
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
    if (Meteor.settings.public.modules.fhir.Medications) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id="medicationsTile" style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/medications') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Medications'
                subtitle='Crash carts, first responder kits, and surgical prep.'
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
    if (Meteor.settings.public.modules.fhir.Devices) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id='devicesTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/devices') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Devices'
                subtitle='Equipment and devices.'
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
    if (Meteor.settings.public.modules.apps.ChecklistManifesto) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id='checklistsTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/checklists') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Checklist Manifesto'
                subtitle='Checklists lead to better outcomes.'
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
    if (Meteor.settings.public.modules.apps.Videoconferencing) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id='videoconferencingTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/videoconferencing') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Telemedicine'
                subtitle='Videoconferencing and remote consultations.'
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
    if (Meteor.settings.public.modules.fhir.RiskAssessments) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id='riskAssessmentsTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/risk-assessments') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Risk Assessments'
                subtitle='Risk assessments for patients pertaining to conditions.'
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
    if (Meteor.settings.public.modules.fhir.Conditions) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id='conditionsTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/conditions') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Conditions'
                subtitle='Conditions that a patient might have.'
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
    if (Meteor.settings.public.modules.fhir.AllergyIntolerances) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
            <div id='allergyIntoleranceTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/allergies') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title='Allergy Intolerances'
                  subtitle='Allergy intolerances.'
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
    if (Meteor.settings.public.modules.fhir.AllergyIntolerances) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
            <div id='medicationStatementsTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/medication-statements') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title='Medication Statements'
                  subtitle='Current list of medications a person is on.'
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
    if (Meteor.settings.public.modules.fhir.ImagingStudies) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
            <div id='imagingStudiesTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/radiology') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title='Imaging Studies'
                  subtitle='Medical images and radiographs.'
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
    if (Meteor.settings.public.modules.fhir.DiagnosticReports) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
            <div id='diagnosticReportsTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/diagnostic-reports') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title='Diagnostic Report'
                  subtitle='Findings associated with a diagnostic laboratory procedure.'
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
    if (Meteor.settings.public.modules.fhir.Goals) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id='goalsTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/goals') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Goals'
                subtitle='Treatment and careplan goals.'
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
    if (Meteor.settings.public.modules.fhir.CarePlans) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id="carePlansTile" style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/care-plans') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='CarePlans'
                subtitle='Treatment careplans.'
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
    if (Meteor.settings.public.modules.fhir.MedicationOrders) {
      if (user.isPatient || user.isPractitioner || user.isAdmin) {
        return (
          <div id='medicationOrderTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/medication-orders') } >
            <GlassCard style={this.data.style.indexCard} >
              <CardTitle
                title='Medication Orders'
                subtitle='Pending prescriptions for medications.'
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
                  title='Diagnostic Reports'
                  subtitle='Allergies and substances to avoid.'
                  titleStyle={this.data.style.title}
                  subtitleStyle={this.data.style.subtitle}
                />
              </GlassCard>
            </div>    

            <div id='bodySitesTile' style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/body-sites') } >
              <GlassCard style={this.data.style.indexCard} >
                <CardTitle
                  title='Body Sites'
                  subtitle='Anatomical reference and locality.'
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
  hasUser: React.PropTypes.object
};
ReactMixin(MainIndex.prototype, ReactMeteorData);