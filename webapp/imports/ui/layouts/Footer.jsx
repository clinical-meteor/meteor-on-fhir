// footer

import { AppBar, FlatButton, ToolbarTitle } from 'material-ui';

import { Glass } from 'meteor/clinical:glass-ui';
import ImageBlurOn from 'material-ui/svg-icons/image/blur-on';
import ImageExposure from 'material-ui/svg-icons/image/exposure';
import DeviceWifiTethering from 'material-ui/svg-icons/device/wifi-tethering';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { HTTP } from 'meteor/http';

import { has, get } from 'lodash';

import { MdBlurOn } from 'react-icons/md';
import { MdBlurOff } from 'react-icons/md';
 
import { MdSignalWifi0Bar } from 'react-icons/md';
import { MdSignalWifi1Bar } from 'react-icons/md';
import { MdSignalWifi1BarLock } from 'react-icons/md';
import { MdSignalWifi2Bar } from 'react-icons/md';
import { MdSignalWifi2BarLock } from 'react-icons/md';
import { MdSignalWifi3Bar } from 'react-icons/md';
import { MdSignalWifi3BarLock } from 'react-icons/md';
import { MdSignalWifi4Bar } from 'react-icons/md';
import { MdSignalWifi4BarLock } from 'react-icons/md';
import { MdSignalWifiOff } from 'react-icons/md';

import { Cache } from '../helpers/cache';

Session.setDefault('showThemingControls', false);
Session.setDefault('gender', false);
Session.setDefault('timelineBackground', false);
Session.setDefault('continuityOfCareDoc', null);


export class Footer extends React.Component {
  getMeteorData() {
    let data = {
      userId: Meteor.userId(),
      gender: Session.get('gender'),
      footerStyle: {
        position: 'fixed',
        bottom: '0px',
        width: '100%',
        // height: '6.4rem',
        alignItems: 'center',
        WebkitTransition: 'ease .2s',
        transition: 'ease .2s',
        margin: '0px',
        opacity: Session.get('globalOpacity')
      },
      westStyle: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        left: '0px',
        // height: '6.4rem'
      },
      displayThemeNavbar: false,
      status: '',
      style: {
        buttonText: Glass.darkroom({marginLeft: '20px'}),
        disabledButtonText: {
          color: 'lightgray'
        },
        southEastButtons: {
          fontSize: '18px', 
          // top: '-4px', 
          cursor: 'pointer'
        }
      },
      pathname: Session.get('pathname'),
      privacy: Session.get('glassBlurEnabled')
    };

    if (Meteor.status()) {
      data.status = Meteor.status().status + " | " + process.env.NODE_ENV;
    }

    if (Session.get('showThemingControls')) {
      data.displayThemeNavbar = Session.get('showThemingControls');
      data.westStyle.bottom = '2.4rem';
    }

    data.style = Glass.blur(data.style);
    data.footerStyle = Glass.darkroom(data.footerStyle);

    //phone layout
    if (Session.get('appWidth') < 768) {
      data.westStyle.visibility = 'hidden';
    }

    if (get(Meteor, 'settings.public.defaults.disableFooter')) {
      data.footerStyle.display = 'none !important';
      data.footerStyle.visibility = 'hidden !important';
    } else {
      if (!Session.get('showNavbars')) {
        data.footerStyle.bottom = '-100px';
      }
    }

    if (get(Meteor, 'settings.public.defaults.disableSecondaryPanel')) {
      data.style.southEastButtons.cursor = 'none !important';
    }

    return data;
  }

  clickOnDarkroomButton(){
    Session.toggle('darkroomEnabled');
  }

  clickOnBlurButton(){
    Session.toggle('glassBlurEnabled');

    let downloadCcda = { 
      "resourceType" : "AuditEvent",
      "action" : 'Privacy Screen',
      "recorded" : new Date(), 
      "outcomeDesc" : Session.get('glassBlurEnabled') ? 'Privacy Screen Enabled' : 'Privacy Screen Disabled',
      "agent" : [{
        "altId" : Meteor.userId() ? Meteor.userId() : '', // Alternative User id e.g. authentication
        "name" : Meteor.user() ? Meteor.user().fullName() : '', // Human-meaningful name for the agent
        "requestor" : true  
      }],
      "source" : { 
        "site" : Meteor.absoluteUrl(),
        "identifier": {
          "value": 'Accounts Subsystem'
        }
      },
      "entity": []
    }      

    // HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Procedures", recordId: self.state.procedureId });
    HipaaLogger.logAuditEvent(downloadCcda, {validate: get(Meteor, 'settings.public.defaults.schemas.validate', false)}, function(error, result){
      if(error) console.error('HipaaLogger.logEvent.error.invalidKeys', error.invalidKeys)
      if(result) console.error(result)
    });

  }
  clickOnThemingButton(){
    if(this.props.history){
      this.props.history.push('/theming');
    }
  }
  querySystemButton(resourceType){
    console.log("querying open.epic.com", resourceType);
    Meteor.call("queryEpic", resourceType, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
         console.log("queryEpic[epic]", result);         
      }
    });
  }
  openLink(url, callback){
    console.log("openLink", url);

    if(typeof callback === "function"){
      callback();
    }

    if(this.props.history){
      this.props.history.push(url);      
    }
  }
  deleteLocalData(){
    console.log('Confirming that we should delete local data.  Y/N?');
    
    if(confirm('Are you sure?')){
      Cache.deleteLocalData();
    } else {
      console.log('Delete aborted.')
    }
  }
  exportContinuityOfCareDoc(){
    console.log('exportContinuityOfCareDoc');

    var continuityOfCareDoc = {
      resourceType: "Bundle",
      entry: []
    }

    if(typeof AllergyIntollerances === "object"){
      AllergyIntollerances.find().forEach(function(allergy){
        continuityOfCareDoc.entry.push({
          fullUrl: "/AllergyIntolerance/" + allergy._id,
          resource: allergy
        })
      })
    }
    if(typeof CarePlans === "object"){
      CarePlans.find().forEach(function(careplan){
        continuityOfCareDoc.entry.push({
          fullUrl: "/CarePlan/" + careplan._id,
          resource: careplan
        })
      })
    }
    if(typeof Conditions === "object"){
      Conditions.find().forEach(function(condition){
        continuityOfCareDoc.entry.push({
          fullUrl: "/Condition/" + condition._id,
          resource: condition
        })
      })
    }
    if(typeof Devices === "object"){
      Devices.find().forEach(function(device){
        continuityOfCareDoc.entry.push({
          fullUrl: "/Device/" + device._id,
          resource: device
        })
      })
    }
    if(typeof Goals === "object"){
      Goals.find().forEach(function(goal){
        continuityOfCareDoc.entry.push({
          fullUrl: "/Goal/" + goal._id,
          resource: goal
        })
      })
    }
    if(typeof Immunizations === "object"){
      Immunizations.find().forEach(function(immunization){
        continuityOfCareDoc.entry.push({
          fullUrl: "/Immunization/" + immunization._id,
          resource: immunization
        })
      })
    }
    if(typeof Medications === "object"){
      Medications.find().forEach(function(medication){
        continuityOfCareDoc.entry.push({
          fullUrl: "/Medication/" + medication._id,
          resource: medication
        })
      })
    }
    if(typeof MedicationOrders === "object"){
      MedicationOrders.find().forEach(function(medicationOrder){
        continuityOfCareDoc.entry.push({
          fullUrl: "/MedicationOrder/" + medicationOrder._id,
          resource: medicationOrder
        })
      })
    }
    if(typeof MedicationStatements === "object"){
      MedicationStatements.find().forEach(function(medicationStatement){
        continuityOfCareDoc.entry.push({
          fullUrl: "/MedicationStatement/" + medicationStatement._id,
          resource: medicationStatement
        })
      })
    }
    if(typeof Observations === "object"){
      Observations.find().forEach(function(observation){
        continuityOfCareDoc.entry.push({
          fullUrl: "/Observation/" + observation._id,
          resource: observation
        })
      })
    }
    if(typeof Organizations === "object"){
      Organizations.find().forEach(function(organization){
        continuityOfCareDoc.entry.push({
          fullUrl: "/Organization/" + organization._id,
          resource: organization
        })
      })
    }
    if(typeof Patients === "object"){
      Patients.find().forEach(function(patient){
        continuityOfCareDoc.entry.push({
          fullUrl: "/Patient/" + patient._id,
          resource: patient
        })
      })
    }
    if(typeof Practitioners === "object"){
      Practitioners.find().forEach(function(practitioner){
        continuityOfCareDoc.entry.push({
          fullUrl: "/Practitioner/" + practitioner._id,
          resource: practitioner
        })
      })
    }
    if(typeof Procedures === "object"){
      Procedures.find().forEach(function(procedure){
        continuityOfCareDoc.entry.push({
          fullUrl: "/Procedure/" + procedure._id,
          resource: procedure
        })
      })
    }
    if(typeof RiskAssessments === "object"){
      RiskAssessments.find().forEach(function(riskAssessment){
        continuityOfCareDoc.entry.push({
          fullUrl: "/RiskAssessment/" + riskAssessment._id,
          resource: riskAssessment
        })
      })
    }
    // if(Meteor.user()){
    //   continuityOfCareDoc = get(Meteor.user(), 'profile.continuityOfCare');
    // }    
    Session.set('continuityOfCareDoc', continuityOfCareDoc)
  }
  downloadContinuityOfCareDoc(){
    var continuityOfCareDoc = Session.get('continuityOfCareDoc');

    var dataString = 'data:text/csv;charset=utf-8,' + encodeURIComponent(JSON.stringify(continuityOfCareDoc, null, 2));  
    var downloadAnchorElement = document.getElementById('downloadAnchorElement');
    if(downloadAnchorElement){
      downloadAnchorElement.setAttribute("href", dataString );

      var patientName = Meteor.user().displayName();
      console.log('Generating C-CDA for ', patientName)
  
      downloadAnchorElement.setAttribute("download", "continuity-of-care.fhir.ccd");
      downloadAnchorElement.click();
      // window.open('data:text/csv;charset=utf-8,' + escape(continuityOfCareDoc), '_self');    

      let downloadCcda = { 
        "resourceType" : "AuditEvent",
        "action" : 'C-CDA Downloaded',
        "recorded" : new Date(), 
        "outcome" : 'Success',
        "outcomeDesc" : 'User downloaded the C-CDA bundle.',
        "agent" : [{
          "altId" : Meteor.userId() ? Meteor.userId() : '', // Alternative User id e.g. authentication
          "name" : Meteor.user() ? Meteor.user().fullName() : '', // Human-meaningful name for the agent
          "requestor" : true  
        }],
        "source" : { 
          "site" : Meteor.absoluteUrl(),
          "identifier": {
            "value": 'Accounts Subsystem'
          }
        },
        "entity": []
      }      
  
      // HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Procedures", recordId: self.state.procedureId });
      HipaaLogger.logAuditEvent(downloadCcda, {validate: get(Meteor, 'settings.public.defaults.schemas.validate', false)}, function(error, result){
        if(error) console.error('HipaaLogger.logEvent.error.invalidKeys', error.invalidKeys)
        if(result) console.error(result)
      });

    } else {
      console.log('Couldnt find anchor element.')
    }
  }
  // clearContinuityOfCareDoc(){
  //   Meteor.users.update({_id: Meteor.userId()}, {$unset: {
  //     'profile.continuityOfCare': ''
  //   }});
  // }
  transferCurrentPatient(){
    console.log('Transferring patient...');
    console.log('selectedPractitioner:  ', Session.get('selectedPractitioner'));

    if(typeof Practitioners === 'object'){
      var practitionerName = '';
      var selectedPractitioner = Practitioners.findOne({_id: Session.get('selectedPractitioner')})
      if(selectedPractitioner){
        practitionerName = selectedPractitioner.displayName();
      }
      console.log('Practitioner Name:     ', practitionerName);


      console.log('selectedPatient:       ', Session.get('selectedPatient'));

      var displayText = '';
      var currentPatient = Patients.findOne({_id: Session.get('selectedPatient')})
      if(currentPatient){
        displayText = currentPatient.displayName();
      }
      console.log('Patient Name:          ', displayText);

      if(Session.get('selectedPractitioner')){
        Meteor.users.update({_id: Session.get('selectedPractitioner')}, {$set: {
          'profile.inbox': true,
          'profile.incomingPatient': {
            display: displayText,
            reference: Session.get('selectedPatient')
          }     
        }});  
      }
    }
  }
  pinkBlueToggle(){
    console.log('pinkBlueToggle');
    if(Session.get('gender') === "Pink"){
      Session.set('gender', 'BabyBlue');
    } else if (Session.get('gender') == 'BabyBlue'){
      Session.set('gender', 'Pink');
    }
  }
  toggleBackground(){ 
    Session.toggle('timelineBackground');    
  }
  toggleFilterMainTiles(){
    Session.toggle('filterMainTiles');
  }
  searchBigchainForPractitioner(){
    console.log("searchBigchainForPractitioner", Session.get('selectedPractitioner'));

    if(typeof Practitioners === "object"){
      var practitioner = Practitioners.findOne({_id: Session.get('selectedPractitioner')});
      var searchTerm = '';

      // console.log('practitioner.name', practitioner.name)

      if(get(practitioner, 'name[0].text')){
        searchTerm = get(practitioner, 'name[0].text');
        console.log('searchTerm', searchTerm);

        Meteor.call('searchBigchainForPractitioner', searchTerm, function(error, data){
          if(error) console.log('error', error);
          if(data){
            var parsedResults = [];

            data.forEach(function(result){
              parsedResults.push(result.data);
            });

            console.log('parsedResults', parsedResults)
            
            Session.set('practitionerBlockchainData', parsedResults);  
          }
        });
      }
    }
  }
  readPractitionersFromBlockchain(){
    //console.log("readPractitionersFromBlockchain");
    Meteor.call('readPractitionersFromBlockchain', function(error, data){
      if(error) console.log('error', error);
      if(data){
        var parsedResults = [];
        console.log('data', data)

        data.forEach(function(result){
          delete result.data._document;
          parsedResults.push(result.data);
        });

        console.log('parsedResults', parsedResults)

        Session.set('blockchainPractitionerData', parsedResults);  
      }
    });
  }
  rotateZygote(){
    console.log('rotateZygote')
    Session.toggle('rotated');
  }
  showPhonebook(){
    console.log('showPhonebook')
    Session.toggle('showPhonebook');    
  }
  fullscreenVideo(){
    console.log('fullscreenVideo')
    Session.toggle('fullscreenVideo');    
  }
  showOrbital(){
    Session.toggle('showOrbital');
  }
  newQuestionnaire(){
    console.log('newQuestionnaire')

  }
  saveQuestionnaire(){
    console.log('saveQuestionnaire');
    let editedQuestionnaire = Session.get('editedQuestionnaire');

    console.log('editedQuestionnaire', editedQuestionnaire)
  }
  previewQuestionnaire(){
    console.log('previewQuestionnaire')
    if(this.props.history){
      this.props.history.push(get(Meteor, 'settings.public.modules.links.QuestionnairePreview', '/'))
    }
  }
  clearEndpoints(){
    console.log('Droping endpoints.....')
    Meteor.call('dropEndpoints');
    Session.set('edgeBundle', []);
  }
  cornerstoneViewer(){
    if(this.props.history){
      this.props.history.push('/dicom-viewer');
    }
  }
  initializeCurebot(){
    console.log('Initializing the CureBot Service.');
    Meteor.call('Curebot/initialize');
    if(this.props.history){
      this.props.history.push('/questionnaires')    
    }
  }
  initBlockchainGraph(){
    Session.set('edgeBundle', Endpoints.find().map(function(endpoint){
      var result = {
        name: endpoint.name,
        size: 1000,
        status: endpoint.status,
        managingOrganization: endpoint.managingOrganization,
        imports: []
      }
      if(endpoint.contact){
        endpoint.contact.forEach(function(contact){
          result.imports.push(contact.value)
        })  
      }
      return result;
    }));
    if(this.props.history){
      this.props.history.push('/blockchain-graphs')
    }
  }
  configBlockchain(){
    if(this.props.history){
      this.props.history.push('/blockchain-graph-config')    
    }
  }
  showLines(){
    Session.toggle('showEdgeBundleLines');
    console.log('selectedChecklist', Session.get('selectedChecklist'))
  }
  searchConsents(){
    Session.set('consentDialogOpen', true);
  }
  newList(){
    Session.set('selectedChecklist', Lists.insert({
      "resourceType": "List",
      "code": {
        "text": ''
      },
      "note": '',
      "source": {
        "reference": "System/system"
      },
      "status": "current",
      "date": new Date(),
      "mode": "changes",
      "entry": []
    }))
    Session.set('checklistPageTabIndex', 1);
    console.log('selectedChecklist', Session.get('selectedChecklist'))
  }
  toggleStates(){
    if(Session.equals('powerOfAttorneyState', 'Illinois')){
      Session.set('powerOfAttorneyState', 'North Carolina');
    } else if(Session.equals('powerOfAttorneyState', 'North Carolina')){
      Session.set('powerOfAttorneyState', 'Illinois');      
    }
  }
  renderWestNavbar(pathname){
      // console.log('Footer.renderWestNavbar', pathname)

      let self = this;

      const buttonRenderArray = [{
        pathname: '/fhir-resources-index',
        label: 'Filter Tiles',
        onClick: this.toggleFilterMainTiles,
      }, {
        pathname: '/observations',
        label: 'Test',
        settings: 'settings.public.modules.fhir.Observations',
        component: <div>
          <FlatButton label='Record Vitals' className='querySystemButton' ref='querySystemButton' onClick={this.openLink.bind(this, '/vitals-tracking', function(){
            Session.set('vitalsForm', {
              pulse: '',
              temperature: '',
              respiration: '',
              bloodPressure: '',
              notes: ''
            });
          })}  style={this.data.style.buttonText} ></FlatButton>

          <FlatButton label='Filter' className='querySystemButton' ref='querySystemButton' onClick={this.openLink.bind(this, '/filters')} ></FlatButton>
          <FlatButton label='Graph' className='querySystemButton' ref='querySystemButton' onClick={this.openLink.bind(this, '/observations-graph')} ></FlatButton>
        </div>
      }, {
        pathname: '/checklists',
        label: 'New List',
        settings: 'settings.public.modules.apps.ChecklistManifesto',
        component: <div>
          <FlatButton label='New List' className='querySystemButton' ref='querySystemButton' onClick={this.newList.bind(this)} style={this.data.style.buttonText} ></FlatButton>
        </div>
      }, {
        pathname: '/continuity-of-care',
        component: <div>
          <FlatButton label='Sidescroll Timeline' className='horizontalTimeline' ref='horizontalTimeline' onClick={this.openLink.bind(this, '/timeline-sidescroll')} style={this.data.style.buttonText} ></FlatButton>
          {/* <FlatButton label='Import' className='importData' ref='importCcd' onClick={this.openLink.bind(this, '/data-management')} style={this.data.style.buttonText} ></FlatButton>
          <FlatButton label='Export CCD' id="exportContinuityOfCareDoc" className='exportCcd' ref='exportContinuityOfCareDoc' style={this.data.style.buttonText} onClick={this.exportContinuityOfCareDoc}></FlatButton> */}
        </div>
      }, {
        pathname: '/timeline',
        component: <div>
        <FlatButton label='Continuity of Care' className='ccdPage' ref='ccdPage' onClick={this.openLink.bind(this, '/continuity-of-care')} style={this.data.style.buttonText} ></FlatButton>
        {/* <FlatButton label='Background' id="toggleBackground" className='clearCcd' ref='toggleBackground' style={this.data.style.buttonText} onClick={this.toggleBackground}></FlatButton> */}
      </div>
      }, {
        pathname: '/timeline-sidescroll',
        component: <div>
        <FlatButton label='Continuity of Care' className='ccdPage' ref='ccdPage' onClick={this.openLink.bind(this, '/continuity-of-care')} style={this.data.style.buttonText} ></FlatButton>
        {/* <FlatButton label='Background' id="toggleBackground" className='clearCcd' ref='toggleBackground' style={this.data.style.buttonText} onClick={this.toggleBackground}></FlatButton> */}
      </div>
      }, {
        pathname: '/data-management',
        component: <div>
          <FlatButton label='Delete Local Data' id="deleteLocalData" className='deleteLocalData' ref='deleteLocalData' style={this.data.style.buttonText} onClick={this.deleteLocalData}></FlatButton>
          {/* <FlatButton label='Prepare CCD' id="exportContinuityOfCareDoc" className='exportCcd' ref='exportContinuityOfCareDoc' style={this.data.style.buttonText} onClick={this.exportContinuityOfCareDoc}></FlatButton>
          <FlatButton label='Download' id="downloadContinuityOfCareDoc" className='exportCcd' ref='exportContinuityOfCareDoc' style={this.data.style.buttonText} onClick={this.downloadContinuityOfCareDoc}></FlatButton>
          <a id="downloadAnchorElement" style={{display: "none"}} ></a>             */}
        </div>
      }, {
        pathname: '/zygote',
        component: <div>
          <FlatButton label='Rotate' className='querySystemButton' ref='querySystemButton' onClick={this.rotateZygote.bind(this, 'Condition')} style={this.data.style.buttonText} ></FlatButton>
        </div>
      }, {
        pathname: '/videoconferencing',
        component: <div>
          <FlatButton label='Phonebook' className='querySystemButton' ref='querySystemButton' onClick={this.showPhonebook.bind(this, 'Condition')} style={this.data.style.buttonText} ></FlatButton>
          <FlatButton label='Fullscreen' className='querySystemButton' ref='querySystemButton' onClick={this.fullscreenVideo.bind(this)} style={this.data.style.buttonText} ></FlatButton>
          <FlatButton label='Orbital' className='querySystemButton' ref='querySystemButton' onClick={this.showOrbital.bind(this)} style={this.data.style.buttonText} ></FlatButton>
        </div>
      }, {        
        pathname: '/endpoints',
        component: <div>
          <FlatButton label='Clear' className='clearEndpoints' ref='querySystemButton' onClick={this.clearEndpoints} style={this.data.style.buttonText} ></FlatButton>
        </div>
      }, {
        pathname: '/diagnostic-reports',
        component: <div>
          <FlatButton label='Imaging Studies' ref='cornerstoneViewer' onClick={this.openLink.bind(this, '/imaging-studies')} style={this.data.style.buttonText} ></FlatButton>
        </div>
      }]


      Object.keys(Package).forEach(function(packageName){
        if(Package[packageName].FooterButtons){
          // we try to build up a route from what's specified in the package
          Package[packageName].FooterButtons.forEach(function(route){
            buttonRenderArray.push(route);      
          });    
        }

      });


      let renderDom;
      buttonRenderArray.forEach(function(buttonConfig){
        // right route
        if (pathname === buttonConfig.pathname){
          // right security/function enabled
          if(buttonConfig.settings && (get(Meteor, buttonConfig.settings) === false)){
            // there was a settings criteria; and it was set to faulse            
            return false;
          } else {
            if(buttonConfig.component){
              renderDom = buttonConfig.component;
            } else {
              renderDom = <div style={{marginTop: '-8px'}}>
                <FlatButton label={buttonConfig.label} className='filterTileButton' onClick={ buttonConfig.onClick } style={self.data.style.buttonText} ></FlatButton>
              </div>
            }
          }         
        }
      })

      return renderDom;





  }
  webAuthn(){
    window.open('https://poc-node-1.fhirblocks.io/oauth2/wan-auth','MyWindow', "width=1024, height=600"); 
  }
  queryHapiConsents(){
    console.log('queryHapiConsents')

    HTTP.get('https://hapi.fhir.org/baseDstu3/Consent?_pretty=true&_format=json&_organization=Duke', function(error, result){
      if(error){
        console.error(error)        
      }
      if(result){
        // console.info(result)
        let resultContent = JSON.parse(result.content);
        console.info(resultContent)
        
        if(resultContent.resourceType === "Bundle"){
          resultContent.entry.forEach(function(record){
            let consentValidator = ConsentSchema.newContext();
            consentValidator.validate(record.resource)
        
            console.log('IsValid: ', consentValidator.isValid())
            console.log('ValidationErrors: ', consentValidator.validationErrors());        
            
            Consents._collection.upsert(record.resource.id, record.resource)
    
          })
        } 

      }
    })
    
    Session.set('hapiResults', {})
  }
  queryHapiPatients(){
    // 
    console.log('queryHapiPatients')

    HTTP.get('https://hapi.fhir.org/baseDstu3/Patient?_pretty=true&_format=json&_count=100&_agent=Duke', function(error, result){
      if(error){
        console.error(error)        
      }
      if(result){
        // console.info(result)
        let resultContent = JSON.parse(result.content);
        console.info(resultContent)
        
        if(resultContent.resourceType === "Bundle"){
          resultContent.entry.forEach(function(record){
            let patientValidator = PatientSchema.newContext();
            patientValidator.validate(record.resource)
        
            console.log('IsValid: ', patientValidator.isValid())
            console.log('ValidationErrors: ', patientValidator.validationErrors());        
            
            Patients._collection.upsert(record.resource.id, record.resource)
    
          })
        } 

      }
    })
    
    Session.set('hapiPatients', {})
  }  
  queryHapiProvenances(){
    // 
    console.log('queryHapiProvenances')

    HTTP.get('https://hapi.fhir.org/baseDstu3/Provenance?_pretty=true&_format=json&_count=100&_agent=Duke', function(error, result){
      if(error){
        console.error(error)        
      }
      if(result){
        // console.info(result)
        let resultContent = JSON.parse(result.content);
        console.info(resultContent)
        
        if(resultContent.resourceType === "Bundle"){
          resultContent.entry.forEach(function(record){
            let provenanceValidator = ProvenanceSchema.newContext();
            provenanceValidator.validate(record.resource)
        
            console.log('IsValid: ', provenanceValidator.isValid())
            console.log('ValidationErrors: ', provenanceValidator.validationErrors());        
            
            Provenances._collection.upsert(record.resource.id, record.resource)
    
          })
        } 

      }
    })
    
    Session.set('hapiProvenances', {})
  }
  queryHapiDocumentReferences(){
    console.log('queryHapiProvenances')

    HTTP.get('https://hapi.fhir.org/baseDstu3/DocumentReference?_pretty=true&_format=json&_count=100', function(error, result){
      if(error){
        console.error(error)        
      }
      if(result){
        // console.info(result)
        let resultContent = JSON.parse(result.content);
        console.info(resultContent)
        
        if(resultContent.resourceType === "Bundle"){
          resultContent.entry.forEach(function(record){
            let documentReferenceValidator = DocumentReferenceSchema.newContext();
            documentReferenceValidator.validate(record.resource)
        
            console.log('IsValid: ', documentReferenceValidator.isValid())
            console.log('ValidationErrors: ', documentReferenceValidator.validationErrors());        
            
            DocumentReferences._collection.upsert(record.resource.id, record.resource)
          })
        } 

      }
    })
    
    Session.set('hapiProvenances', {})
  }
  renderEastNavbar(displayThemeNavbar){
    var privacyText;
    if(this.data.privacy){
      privacyText = <MdBlurOn />
    } else {
      privacyText = <MdBlurOff />
    }


    var connectionStatus;

    switch (this.data.status) {
      case 'connected | production':   
        connectionStatus = <MdSignalWifi4BarLock />; 
        break;
      case 'connecting | production': 
        connectionStatus = <MdSignalWifi2BarLock />; 
        break;
      case 'failed | production':  
        connectionStatus = <MdSignalWifiOff />; 
        break;
      case 'waiting | production':  
        connectionStatus = <MdSignalWifi1BarLock />; 
        break;
      case 'offline | production':  
        connectionStatus = <MdSignalWifi0Bar />; 
        break;

      case 'connected | development':  
        connectionStatus = <MdSignalWifi4Bar />; 
        break;
      case 'connecting | development':  
        connectionStatus = <MdSignalWifi2Bar />; 
        break;
      case 'failed | development':  
        connectionStatus = <MdSignalWifiOff />; 
        break;
      case 'waiting | development':  
        connectionStatus = <MdSignalWifi1Bar />; 
        break;
      case 'offline | development':  
        connectionStatus = <MdSignalWifi0Bar />; 
        break;

    }

    if (displayThemeNavbar) {
      return (<div>
          {/* <OpacitySlider style={this.data.eastStyle} /> */}
        </div>
      );
    } else {
      return (
        <div id='eastNavbar' onClick={this.clickOnBlurButton} style={{cursor: 'pointer'}} >
          {/* <FlatButton label='privacy screen' className='blurButton' ref='blurButton' onClick={this.clickOnBlurButton} style={this.data.style.buttonText} ></FlatButton> */}

          <ToolbarTitle
            id='privacyScreen'
            text={ privacyText }
            style={{
              fontSize: '18px',               
              marginRight: '10px'
            }}
            
          />

          <ToolbarTitle
            id='connectionStatus'
            text={ connectionStatus }
            style={ this.data.style.southEastButtons }
            onClick={this.openInfo }
          />
        </div>
      );
    }
  }
  openInfo(){
    // if we haven't disabled the secondary panel
    if (get(Meteor, 'settings.public.defaults.disableSecondaryPanel') !== true) {
      // then toggle it when clicked
      Session.toggle('secondPanelVisible');
    }
  }
  render () {
    // console.log('this.data.pathname', this.data.pathname)
    // console.log('this.data.userId', this.data.userId)

    let westNavbar;
    if(this.data.userId){
      westNavbar = this.renderWestNavbar(this.data.pathname);
    }
    return(
      <div id='appFooter' style={this.data.footerStyle}>
        <AppBar
          iconElementLeft={ westNavbar }
          iconElementRight={ this.renderEastNavbar(this.data.displayThemeNavbar) }
          style={this.data.footerStyle}
          titleStyle={{color: 'black'}}
        />


      </div>
   );
  }
}

ReactMixin(Footer.prototype, ReactMeteorData);
export default Footer;