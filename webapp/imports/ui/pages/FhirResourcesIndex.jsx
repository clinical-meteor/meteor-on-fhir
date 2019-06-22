// https://material.io/icons/
// https://andy-pro.github.io/icon-viewer/

// https://www.npmjs.com/package/react-absolute-grid  
// http://jrowny.github.io/react-absolute-grid/demo/  



import { Container, Col, Row } from 'react-bootstrap';

import { CardTitle, CardText, CardActions } from 'material-ui';
import { Glass, GlassCard, FullPageCanvas, VerticalCanvas } from 'meteor/clinical:glass-ui';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { browserHistory } from 'react-router';
import { has, get } from 'lodash';
import PropTypes from 'prop-types';

import MenuTile from '/imports/ui/components/MenuTile';

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
import IoLogoNoSmoking from 'react-icons/io';
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

// import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary
//   }
// }));

let classes = {
  card: {
    display: 'flex',
    margin: '10px', 
    padding: '0px',
    cursor: 'pointer'
  },
  details: {
    display: 'contents',
    flexDirection: 'row-reference',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 80,
    backgroundColor: '#bbbbbb'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    // paddingLeft: theme.spacing(1),
    // paddingBottom: theme.spacing(1),
  },
  paper: {
    textAlign: 'center',
    padding: '10px',
    margin: '10px'
  },
  playIcon: {
    height: 38,
    width: 38,
  }
}

Session.setDefault('filterMainTiles', false);
export class FhirResourcesIndex extends React.Component {
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
        consents: 0,
        contracts: 0,
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
      },
      filterMainTiles: Session.get('filterMainTiles'),
      glassBlurEnabled: Session.get('glassBlurEnabled')
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
    if( typeof Consents === "object" ){
      data.local.consents = Consents.find().count();
    }
    if( typeof Contracts === "object" ){
      data.local.contracts = Contracts.find().count();
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

    if(process.env.NODE_ENV === "test") console.log("FhirResourcesIndex[data]", data);
    return data;
  }
  render() {
    var self = this;

    var tilesToRender = [];
            
    var tileConfigs = [{
      collection: "AllergyIntolerances",
      id: 'allergyIntoleranceTile',
      active: true,
      path: '/allergies',
      icon: 'FaStreetView',
      subtitle: 'Allergy Intolerances'
    }, {
      collection: "AuditEvents",
      id: 'auditEventsTile',
      active: true,
      path: '/audit-events',
      icon: 'IoMdClipboard',
      subtitle: 'Audit Events'
    }, {
      collection: "Bundles",
      id: 'bundleTile',
      active: true,
      path: '/bundles',
      icon: 'IoMdClipboard',
      subtitle: 'Bundles'
    }, {
      collection: "CarePlans",
      id: 'carePlansTile',
      active: true,
      path: '/care-plans',
      icon: 'IoMdClipboard',
      subtitle: 'Care Plan'
    }, {
      collection: "Claims",
      id: 'claimsTile',
      active: true,
      path: '/claims',
      icon: 'IoMdClipboard',
      subtitle: 'Claims'
    }, {
      collection: "ClinicalImpressions",
      id: 'clinicalImpressionssTile',
      active: true,
      path: '/clinical-impressions',
      icon: 'MdHearing',
      subtitle: 'Clinical Impressions'
    }, {
      collection: "Conditions",
      id: 'conditionsTile',
      active: true,
      path: '/conditions',
      icon: 'FaHeartbeat',
      subtitle: 'Conditions'
    }, {
      collection: "Consents",
      id: 'consentsTile',
      active: true,
      path: '/consents',
      icon: 'IoMdClipboard',
      subtitle: 'Consents'
    }, {
      collection: "Contracts",
      id: 'contractsTile',
      active: true,
      path: '/contracts',
      icon: 'IoMdClipboard',
      subtitle: 'Contracts'
    }, {
      collection: "Communications",
      id: 'contractsTile',
      active: true,
      path: '/communications',
      icon: 'FaMobile',
      subtitle: 'Communications'
    }, {
      collection: "Devices",
      id: 'devicesTile',
      active: true,
      path: '/devices',
      icon: 'FaMobile',
      subtitle: 'Devices'
    }, {
      collection: "DiagnosticReports",
      id: 'diagnosticReportsTile',
      active: true,
      path: '/diagnostic-reports',
      icon: 'IoMdClipboard',
      subtitle: 'Diagnostic Reports'
    },  {
      collection: "Endpoints",
      id: 'endpointsTile',
      active: true,
      path: '/endpoints',
      icon: 'FaMobile',
      subtitle: 'Endpoints'
    }, {
      collection: "Goals",
      id: 'goalsTile',
      active: true,
      path: '/goals',
      icon: 'IoLogoNoSmoking',
      subtitle: 'Goals'
    },  {
      collection: "Immunizations",
      id: 'immunizationsTile',
      active: true,
      path: '/immunizations',
      icon: 'FaEyeDropper',
      subtitle: 'Immunizations',
    }, {
      collection: "ImagingStudies",
      id: 'imagingStudiesTile',
      active: true,
      path: '/imaging-studies',
      icon: 'IoMdNuclear',
      subtitle: 'Imaging Studies',
    }, {
      collection: "Locations",
      id: 'locationsTile',
      active: true,
      path: '/locations',
      icon: 'FaMapMarker',
      subtitle: 'Locations'
    }, {
      collection: "Lists",
      id: 'listsTile',
      active: true,
      path: '/checklists',
      icon: 'FaMapMarker',
      subtitle: 'Lists'
    }, {
      collection: "Medications",
      id: 'medicationsTile',
      active: true,
      path: '/medications',
      icon: 'FaFlask',
      subtitle: 'Medications'
    }, {
      collection: "Observations",
      id: 'observationsTile',
      active: true,
      path: '/observations',
      icon: 'GoPulse',
      subtitle: 'Observations'
    }, {
      collection: "Organizations",
      id: 'organizationsTile',
      active: true,
      path: '/organizations',
      icon: 'FaBuilding',
      subtitle: 'Organizations'
    }, {
      collection: "Procedures",
      id: 'proceduresTile',
      active: true,
      path: '/procedures',
      icon: 'IoMdNuclear',
      subtitle: 'Procedures'
    }, {
      collection: "Patients",
      id: 'patientsTile',
      active: true,
      path: '/patients',
      icon: 'GoPerson',
      subtitle: 'Patients'
    }, {
      collection: "Persons",
      id: 'personsTile',
      active: true,
      path: '/persons',
      icon: 'GoPerson',
      subtitle: 'Persons'
    }, {
      collection: "Practitioners",
      id: 'practitionersTile',
      active: true,
      path: '/practitioners',
      icon: 'GoPerson',
      subtitle: 'Practitioners'
    }, {
      collection: "RiskAssessments",
      id: 'riskAssessmentsTile',
      active: true,
      path: '/risk-assessments',
      icon: 'MdAddAlert',
      subtitle: 'Risk Assessments'
    }, {
      collection: "MedicationStatements",
      id: 'medicationStatementsTile',
      active: true,
      path: '/medication-statements',
      icon: 'MdLocalPhramacy',
      subtitle: 'Med Statements'
    }, {
      collection: "MedicationOrders",
      id: 'medicationOrderTile',
      active: true,
      path: '/medication-orders',
      icon: 'MdLocalPhramacy',
      subtitle: 'Medication Orders'
    }, {
      collection: "Questionnaires",
      id: 'questionnairesTile',
      active: true,
      path: '/questionnaires',
      icon: 'IoMdClipboard',
      subtitle: 'Questionnaires'
    }, {
      collection: "QuestionnaireResponses",
      id: 'questionnaireResponsesTile',
      active: true,
      path: '/questionnaire-responses',
      icon: 'IoMdClipboard',
      subtitle: 'Questionnaire Responses'
    }, {
      collection: "Sequences",
      id: 'sequencesTile',
      active: true,
      path: '/sequences',
      icon: 'IoMdRibbon',
      subtitle: 'Sequences'
    }, {
      collection: "Subscriptions",
      id: 'subscriptionsTile',
      active: true,
      path: '/subscriptions',
      icon: '',
      subtitle: 'Subscriptions'
    } ];
   



    // first we need to figure out which tiles to render
    if(get(Meteor, 'settings.public.modules.fhir')){
      var fhirResources = get(Meteor, 'settings.public.modules.fhir');

      var count = 0;
      var rowsToRender = [];
      var innerRow = [];
      var row;
      // parse through each FHIR module specified in the Settings file
      Object.keys(fhirResources).forEach(function(key){

        console.log('modulo', count % 6);
        if(count % 6 === 0){
          innerRow = [];
        }

        // is it enabled?  does it have a sub-object?  is it truthy?
        if(fhirResources[key]){
          // if so, see if there's a collection loaded up
          if(Mongo.Collection.get(key)){
              console.log('key', key)

              var selectedConfig = {
                id: '',
                active: true,
                path: '/',
                icon: '',
                title: 0,
                subtitle: ''
              }
              // parse through our config objects
              tileConfigs.forEach(function(config){
                // if we find a config object that matches the current key, assign it
                if(config.collection === key){
                  selectedConfig = config;
                }
              })
              
              // grab the count
              selectedConfig.title = Mongo.Collection.get(key).find().count();

              // render out a tile
              // var newTile = <Col md={4} lg={2} style={self.data.style.column} key={key}>
              //   {self.renderTile(self.data.user, selectedConfig)}
              // </Col>
              var newTile = <Grid item xs={6} md={4} lg={2} key={count}>
                {self.fhirTile(selectedConfig, classes)}
              </Grid>

              // and add it to the array of tiles to render
              // check whether we want to limit tiles to just those that have records on the client
              if(self.data.filterMainTiles){
                if(Mongo.Collection.get(key).find().count() > 0){
                  innerRow.push(newTile);
                  count++;
                } 
              } else {
                // or display them all (including tiles with 0 records)
                innerRow.push(newTile);
                count++;
              }
          };
        }

        if(count % 6 === 5){
          row = <Grid container item xs={12} spacing={4}>
            <React.Fragment>
              { innerRow }
            </React.Fragment>
          </Grid>
          
          rowsToRender.push(row);
        }
      });
    }

    //console.log('tilesToRender', tilesToRender)
    




    return (
      <div id='fhirResourcesIndexPage'>
        <FullPageCanvas>
          {this.renderFhirSection(this.data.user)}
          <Grid container spacing={16}>
            {rowsToRender}          
          </Grid>
        </FullPageCanvas>
      </div>
    );
  }
  // renderTile()
  // // id, active, path, icon, subtitle
  // {
  //   id: 'immunizationsTile',
  //   active: true,
  //   path: '/immunizations',
  //   icon: 'EyeDropper',
  //   title: this.data.local.immunizations,
  //   subtitle: 'Immunizations'
  // }
  
  fhirTile(selectedConfig, classes){
    return (
      <Card style={classes.card} id={selectedConfig.id} onClick={ this.openLink.bind(this, selectedConfig.path) } >
        <div style={classes.details}>
          <CardContent style={classes.content}>
            <Typography component="h2" variant="h2" style={{fontWeight: 300}}>
              {selectedConfig.title}
            </Typography>
            <Typography variant="h5" color="textSecondary" style={{fontWeight: 300}}>
              {selectedConfig.subtitle}
            </Typography>
          </CardContent>
        </div>
        <CardMedia
          style={classes.cover}
          //image="/static/images/cards/live-from-space.jpg"
          title="Live from space album cover"
        />
      </Card>
    );
  }
  renderTile(user, tileConfig){
    if (user.isPatient || user.isPractitioner || user.isAdmin) {
      return (
        <MenuTile          
          id={ tileConfig.id }
          className='tile'
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




  // renderExperimentalTiles(user){
  //   if (user.isPatient || user.isPractitioner || user.isAdmin) {
  //     return (
  //       <div>


  //           <div id='familyMemberHistoriesTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/family-member-histories') } >
  //             <GlassCard style={this.data.style.indexCard} >
  //               <CardTitle
  //                 title='Family Member History'
  //                 subtitle='Relevant medical histories of family members.'
  //                 titleStyle={this.data.style.title}
  //                 subtitleStyle={this.data.style.subtitle}
  //               />
  //             </GlassCard>
  //           </div>

  //           <div id="questionnairesTile" style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/questionnaires') } >
  //             <GlassCard style={this.data.style.indexCard} >
  //               <CardTitle
  //                 subtitle='Questionnaires'
  //                 titleStyle={this.data.style.title}
  //                 subtitleStyle={this.data.style.subtitle}
  //               />
  //             </GlassCard>
  //           </div>
  //           <div id='questionnaireResponsesTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/questionnaire-responses') } >
  //             <GlassCard style={this.data.style.indexCard} >
  //               <CardTitle
  //                 subtitle='Questionnaire Responses'
  //                 titleStyle={this.data.style.title}
  //                 subtitleStyle={this.data.style.subtitle}
  //               />
  //             </GlassCard>
  //           </div>


  //           <div id="appointmentsTile" style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/appointments') } >
  //             <GlassCard style={this.data.style.indexCard} >
  //               <CardTitle
  //                 subtitle='Appointments'
  //                 titleStyle={this.data.style.title}
  //                 subtitleStyle={this.data.style.subtitle}
  //               />
  //             </GlassCard>
  //           </div>

  //           <div id='slotsTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/slots') } >
  //             <GlassCard style={this.data.style.indexCard} >
  //               <CardTitle
  //                 subtitle='Slots'
  //                 titleStyle={this.data.style.title}
  //                 subtitleStyle={this.data.style.subtitle}
  //               />
  //             </GlassCard>
  //           </div>




  //           <div id='schedulesTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/schedules') } >
  //             <GlassCard style={this.data.style.indexCard} >
  //               <CardTitle
  //                 subtitle='Schedules'
  //                 titleStyle={this.data.style.title}
  //                 subtitleStyle={this.data.style.subtitle}
  //               />
  //             </GlassCard>
  //           </div>


  //         <div id='forumTile' style={this.data.style.indexCardPadding} onClick={ this.openDiscussionForum.bind(this) }>
  //           <GlassCard style={this.data.style.indexCard} >
  //             <CardTitle
  //               subtitle='Discussion Forum'
  //               titleStyle={this.data.style.title}
  //                 subtitleStyle={this.data.style.subtitle}
  //             />
  //           </GlassCard>
  //         </div>

  //         <div id='weblogTile' style={this.data.style.indexCardPadding} onClick={ this.openHealthlog.bind(this) } >
  //           <GlassCard style={this.data.style.indexCard} >
  //             <CardTitle
  //               subtitle='Healthlog'
  //               titleStyle={this.data.style.title}
  //                 subtitleStyle={this.data.style.subtitle}
  //             />
  //           </GlassCard>
  //         </div>

  //         <div id="dermatogramsTile" style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/dermatograms') } >
  //           <GlassCard style={this.data.style.indexCard} >
  //             <CardTitle
  //               subtitle='Dermatograms'
  //               titleStyle={this.data.style.title}
  //                 subtitleStyle={this.data.style.subtitle}
  //             />
  //           </GlassCard>
  //         </div>

  //         <div id='telemedicineTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/telemed') } >
  //           <GlassCard style={this.data.style.indexCard} >
  //             <CardTitle
  //               subtitle='Telemedicine'
  //               titleStyle={this.data.style.title}
  //               subtitleStyle={this.data.style.subtitle}
  //             />
  //           </GlassCard>
  //         </div>
  //         <div id='myGenomeTile' style={this.data.style.inactiveIndexCard} onClick={ this.openLink.bind(this, '/my-genome') } >
  //           <GlassCard style={this.data.style.indexCard} >
  //             <CardTitle
  //               subtitle='My Genome'
  //               titleStyle={this.data.style.title}
  //                 subtitleStyle={this.data.style.subtitle}
  //             />
  //           </GlassCard>
  //         </div>
  //         <div id="oAuthTile" style={this.data.style.indexCardPadding} onClick={ this.openLink.bind(this, '/oauth-ui') } >
  //           <GlassCard style={this.data.style.indexCard} >
  //             <CardTitle
  //               subtitle='Authorization & Trust'
  //               titleStyle={this.data.style.title}
  //               subtitleStyle={this.data.style.subtitle}
  //             />
  //           </GlassCard>
  //         </div>
  //       </div>
  //     );
  //   }
  // }


  // renderImportChart(user){
  //   if (get(Meteor, 'settings.public.modules.apps.ImportChart')) {
  //     if (user.isPatient || user.isPractitioner || user.isAdmin) {
  //       return (
  //         <MenuTile          
  //           id='importChartTile'
  //           active={true}
  //           path='/import-chart'
  //           icon='MdList'
  //           iconSize={85}
  //           subtitle='Import Chart'
  //         />

  //       );
  //     }
  //   }    
  // }
  // renderChecklists(user){
  //   if (get(Meteor, 'settings.public.modules.apps.ChecklistManifesto') && get(Meteor, 'settings.public.modules.fhir.Lists')) {
  //     if (user.isPatient || user.isPractitioner || user.isAdmin) {
  //       return (
  //         <MenuTile          
  //           id='checklistsTile'
  //           active={true}
  //           path='/checklists'
  //           icon='MdList'
  //           iconSize={85}
  //           subtitle='Checklist Manifesto'
  //         />

  //       );
  //     }
  //   }
  // }
  // renderZygote(user){
  //   if (get(Meteor, 'settings.public.modules.apps.ZygoteAvatar')) {
  //     if (user.isPatient || user.isPractitioner || user.isAdmin) {
  //       return (

  //         <MenuTile          
  //           id='zygoteAvatarTile'
  //           active={true}
  //           path='/zygote'
  //           icon='MdFingerprint'
  //           iconSize={85}
  //           subtitle='Zygote'
  //         />

  //       );
  //     }
  //   }
  // }
  // renderVideoconferencing(user){
  //   if (get(Meteor, 'settings.public.modules.apps.Videoconferencing')) {
  //     if (user.isPatient || user.isPractitioner || user.isAdmin) {
  //       return (
  //         <MenuTile          
  //           id='videoconferencingTile'
  //           active={true}
  //           path='/videoconferencing'
  //           icon='MdImportantDevices'
  //           iconSize={85}
  //           subtitle='Telemedicine'
  //         />
  //       );
  //     }
  //   }
  // }
  // renderContinuityOfCare(user){
  //   if (get(Meteor, 'settings.public.modules.apps.ContinuityOfCare')) {
  //     if (user.isPatient || user.isPractitioner || user.isAdmin) {
  //       return (
  //         <MenuTile          
  //           id='continuityOfCareTile'
  //           active={true}
  //           path='/continuity-of-care'
  //           icon='FaHeartbeat'
  //           iconSize={85}
  //           subtitle='Continuity of Care'
  //         />
  //       );
  //     }
  //   }
  // }
  // renderTimeline(user){
  //   if (get(Meteor, 'settings.public.modules.apps.Timeline')) {
  //     if (user.isPatient || user.isPractitioner || user.isAdmin) {
  //       return (
  //         <MenuTile          
  //           id='timelineTile'
  //           active={true}
  //           path='/timeline-sidescroll'
  //           icon='Pulse'
  //           iconSize={85}
  //           subtitle='Timeline'
  //         />
  //       );
  //     }
  //   }
  // }



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


FhirResourcesIndex.propTypes = {
  hasUser: PropTypes.object
};
ReactMixin(FhirResourcesIndex.prototype, ReactMeteorData);
export default FhirResourcesIndex;