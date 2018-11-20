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

import { browserHistory } from 'react-router';
import { has, get } from 'lodash';

Session.setDefault('showThemingControls', false);
Session.setDefault('gender', 'Pink');
Session.setDefault('timelineBackground', false);
Session.setDefault('continuityOfCareDoc', null);

// Session.setDefault('patientDialogOpen', false);
// Session.setDefault('terminologyDialogOpen', false);


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
          top: '-4px', 
          cursor: 'pointer'
        }
      },
      pathname: Session.get('pathname')
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
  }
  clickOnThemingButton(){
    browserHistory.push('/theming');
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

    browserHistory.push(url);
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
      console.log('Generating CCD for ', patientName)
  
      downloadAnchorElement.setAttribute("download", "continuity-of-care.fhir.ccd");
      downloadAnchorElement.click();
      // window.open('data:text/csv;charset=utf-8,' + escape(continuityOfCareDoc), '_self');    
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
  clearEndpoints(){
    console.log('Droping endpoints.....')
    Meteor.call('dropEndpoints');
    Session.set('edgeBundle', []);
  }
  cornerstoneViewer(){
    browserHistory.push('/dicom-viewer');
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
    browserHistory.push('/blockchain-graphs')
  }
  configBlockchain(){
    browserHistory.push('/blockchain-graph-config')    
  }
  showLines(){
    Session.toggle('showEdgeBundleLines');
    console.log('selectedChecklist', Session.get('selectedChecklist'))
  }
  searchConsents(){
    Session.set('consentDialogOpen', true);
  }
  searchPatients(){
    Session.set('patientDialogOpen', true);
  }
  searchTerminologies(){
    Session.set('terminologyDialogOpen', true);
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
      console.log('Footer.renderWestNavbar', pathname)

      // FHIR RESOURCES
      if (pathname === '/fhir-resources-index') {
        return (
          <div style={{marginTop: '-8px'}}>
            <FlatButton label='Filter Tiles' className='filterTileButton' ref='filterTileButton' onClick={this.toggleFilterMainTiles} style={this.data.style.buttonText} ></FlatButton>
          </div>
        );

        // PATIENTS
      } else if ((pathname === '/patients') && get(Meteor, 'settings.public.modules.epic')) {
        // the user is logged in as a normal user
        return (
          <div>
            <FlatButton label='Search Patients' className='configGraph' ref='querySystemButton' onClick={ this.searchPatients } style={this.data.style.buttonText} ></FlatButton>
          </div>
        );

      // PRACTITIONERS
      } else if ((pathname === '/practitioners') && get(Meteor, 'settings.public.modules.fhir.Practitioners')) {
        if(Package["symptomatic:blockchain-core"]){          
          return (
            <div>
              <FlatButton label='Read Practitioners on Bigchain' className='querySystemButton' ref='querySystemButton' onClick={this.readPractitionersFromBlockchain.bind(this)} style={this.data.style.buttonText} ></FlatButton>
              <FlatButton label='Query Practitioner History' className='querySystemButton' ref='querySystemButton' onClick={this.searchBigchainForPractitioner.bind(this)} style={this.data.style.buttonText} ></FlatButton>
            </div>
          );
        }
            
      // OBSERVATIONS
      } else if ((pathname === '/observations') && get(Meteor, 'settings.public.modules.fhir.Observations')) {
        // the user is logged in as a normal user
        return (
          <div>
            <FlatButton label='Record Vitals' className='querySystemButton' ref='querySystemButton' onClick={this.openLink.bind(this, '/vitals-tracking', function(){
              Session.set('vitalsForm', {
                pulse: '',
                temperature: '',
                respiration: '',
                bloodPressure: '',
                notes: ''
              });
            })}  style={this.data.style.buttonText} ></FlatButton>

            <FlatButton label='Filter' className='querySystemButton' ref='querySystemButton'></FlatButton>

          </div>
        );

      // CHECKLISTS
      } else if ((pathname === '/checklists') && get(Meteor, 'settings.public.modules.apps.ChecklistManifesto')) {
        return (
          <div>
            <FlatButton label='New List' className='querySystemButton' ref='querySystemButton' onClick={this.newList.bind(this)} style={this.data.style.buttonText} ></FlatButton>
          </div>
        );

      // ORGANIZATIONS
      } else if ((pathname === '/organizations') && get(Meteor, 'settings.public.modules.fhir.Organizations')) {
        return (
          <div>
            {/* <FlatButton label='GET open.epic.com/Organization' className='querySystemButton' ref='querySystemButton' onClick={this.querySystemButton.bind(this, 'Organization')} style={this.data.style.buttonText} ></FlatButton> */}
          </div>
        );

      // CONTINUITY OF CARE
      } else if (pathname === '/continuity-of-care') {
        return (
          <div>
            <FlatButton label='Sidescroll Timeline' className='horizontalTimeline' ref='horizontalTimeline' onClick={this.openLink.bind(this, '/timeline-sidescroll')} style={this.data.style.buttonText} ></FlatButton>
            <FlatButton label='Import' className='importData' ref='importCcd' onClick={this.openLink.bind(this, '/data-management')} style={this.data.style.buttonText} ></FlatButton>
            <FlatButton label='Export CCD' id="exportContinuityOfCareDoc" className='exportCcd' ref='exportContinuityOfCareDoc' style={this.data.style.buttonText} onClick={this.exportContinuityOfCareDoc}></FlatButton>
          </div>
        );

      // TIMELINE
      } else if ((pathname === '/timeline') || (pathname === '/timeline-sidescroll')) {
        return (
          <div>
            <FlatButton label='Continuity of Care' className='ccdPage' ref='ccdPage' onClick={this.openLink.bind(this, '/continuity-of-care')} style={this.data.style.buttonText} ></FlatButton>
            <FlatButton label={this.data.gender} id="pinkBlueToggle" className='clearCcd' ref='pinkBlueToggle' style={this.data.style.buttonText} onClick={this.pinkBlueToggle}></FlatButton>
            <FlatButton label='Background' id="toggleBackground" className='clearCcd' ref='toggleBackground' style={this.data.style.buttonText} onClick={this.toggleBackground}></FlatButton>
          </div>
        );

      // DATA Management
      } else if (pathname === '/data-management') {
        return (
          <div>
            <FlatButton label='Prepare CCD' id="exportContinuityOfCareDoc" className='exportCcd' ref='exportContinuityOfCareDoc' style={this.data.style.buttonText} onClick={this.exportContinuityOfCareDoc}></FlatButton>
            <FlatButton label='Download' id="downloadContinuityOfCareDoc" className='exportCcd' ref='exportContinuityOfCareDoc' style={this.data.style.buttonText} onClick={this.downloadContinuityOfCareDoc}></FlatButton>
            {/* <FlatButton label='Clear' disabled={true} id="clearContinuityOfCareDoc" className='clearCcd' ref='clearContinuityOfCareDoc' style={this.data.style.disabledButtonText} onClick={this.clearContinuityOfCareDoc}></FlatButton> */}
            <a id="downloadAnchorElement" style={{display: "none"}} ></a>            
          </div>
        );

      // CONDITIONS
      } else if ((pathname === '/conditions') && get(Meteor, 'settings.public.modules.epic')) {
        return (
          <div></div>
        );

      // ZYGOTE
      } else if (pathname === '/zygote') {
        return (
          <div>
            <FlatButton label='Rotate' className='querySystemButton' ref='querySystemButton' onClick={this.rotateZygote.bind(this, 'Condition')} style={this.data.style.buttonText} ></FlatButton>
          </div>
        );

      // VIDEOCONFERENCING
      } else if (pathname === '/videoconferencing') {
        return (
          <div>
            <FlatButton label='Phonebook' className='querySystemButton' ref='querySystemButton' onClick={this.showPhonebook.bind(this, 'Condition')} style={this.data.style.buttonText} ></FlatButton>
            <FlatButton label='Fullscreen' className='querySystemButton' ref='querySystemButton' onClick={this.fullscreenVideo.bind(this)} style={this.data.style.buttonText} ></FlatButton>
            <FlatButton label='Orbital' className='querySystemButton' ref='querySystemButton' onClick={this.showOrbital.bind(this)} style={this.data.style.buttonText} ></FlatButton>
          </div>
        );

      // ENDPOINTS
      } else if (pathname === '/endpoints') {
        return (
          <div>
            <FlatButton label='Clear' className='clearEndpoints' ref='querySystemButton' onClick={this.clearEndpoints} style={this.data.style.buttonText} ></FlatButton>
          </div>
        );

      // DIAGNOSTIC REPORTS
      } else if (pathname === '/diagnostic-reports') {
        return (
          <div>
            <FlatButton label='Imaging Studies' ref='cornerstoneViewer' onClick={this.openLink.bind(this, '/imaging-studies')} style={this.data.style.buttonText} ></FlatButton>
          </div>
        );

      // IMAGING STUDIES
      } else if (pathname === '/imaging-studies') {
        return (
          <div>
            <FlatButton label='Cornerstone DICOM Viewer' ref='cornerstoneViewer' onClick={this.cornerstoneViewer} style={this.data.style.buttonText} ></FlatButton>
          </div>
        );

      // GRAPHS
      } else if (pathname === '/blockchain-graphs') {
        return (
          <div>
            <FlatButton label='Config' className='configGraph' ref='querySystemButton' onClick={ this.configBlockchain } style={this.data.style.buttonText} ></FlatButton>
            <FlatButton label='Lines' className='configGraph' ref='querySystemButton' onClick={ this.showLines } style={this.data.style.buttonText} ></FlatButton>
          </div>
        );

        
      // CONSENTS
      } else if (pathname === '/consents') {
        return (
          <div>
            <FlatButton label='Search' className='configGraph' ref='querySystemButton' onClick={ this.searchConsents } style={this.data.style.buttonText} ></FlatButton>
          </div>
        );        


      // POWER OF ATTOURNEY
      } else if (pathname === '/power-of-attorney') {
        return (
          <div>
            <FlatButton label='State' className='configGraph' ref='querySystemButton' onClick={ this.toggleStates } style={this.data.style.buttonText} ></FlatButton>
          </div>
        );        


      // NOTIFICATIONS
      } else if ((pathname === '/notifications') && get(Meteor, 'settings.public.defaults.notificationMenu')) {
        return (
          <div>
            <FlatButton label='Transfer Current Patient' className='querySystemButton' ref='querySystemButton' onClick={this.transferCurrentPatient.bind(this)} style={this.data.style.buttonText} ></FlatButton>
          </div>
        );

      // WALLET DASHBOARD
      } else if ((pathname === '/wallet-dashboard') || (pathname.includes('authn'))) {
        return (
          <div>
            {/* <FlatButton label='Query HAPI for Patients' className='querySystemButton' ref='querySystemButton' onClick={this.queryHapiPatients.bind(this)} style={this.data.style.buttonText} ></FlatButton> */}
            {/* <FlatButton label='Query HAPI for Provenances' className='querySystemButton' ref='querySystemButton' onClick={this.queryHapiProvenances.bind(this)} style={this.data.style.buttonText} ></FlatButton>
            <FlatButton label='Query HAPI for Consents' className='querySystemButton' ref='querySystemButton' onClick={this.queryHapiConsents.bind(this)} style={this.data.style.buttonText} ></FlatButton> */}
            {/* <FlatButton label='Query HAPI for Documents' className='querySystemButton' ref='querySystemButton' onClick={this.queryHapiDocumentReferences.bind(this)} style={this.data.style.buttonText} ></FlatButton> */}
            {/* <FlatButton label='WebAuthN ' className='querySystemButton' ref='querySystemButton' onClick={this.webAuthn.bind(this)}  style={this.data.style.buttonText} ></FlatButton> */}
          </div>
        );


      } else {
        // anything else
        return (
          <div></div>
        );
      }

  }
  // webAuthn(){
  //   window.open('https://poc-node-1.fhirblocks.io/oauth2/wan-auth','MyWindow', "width=1024, height=600"); 
  // }
  // queryHapiConsents(){
  //   console.log('queryHapiConsents')

  //   HTTP.get('https://hapi.fhir.org/baseDstu3/Consent?_pretty=true&_format=json&_count=100&_organization=Duke', function(error, result){
  //     if(error){
  //       console.error(error)        
  //     }
  //     if(result){
  //       // console.info(result)
  //       let resultContent = JSON.parse(result.content);
  //       console.info(resultContent)
        
  //       if(resultContent.resourceType === "Bundle"){
  //         resultContent.entry.forEach(function(record){
  //           let consentValidator = ConsentSchema.newContext();
  //           consentValidator.validate(record.resource)
        
  //           console.log('IsValid: ', consentValidator.isValid())
  //           console.log('ValidationErrors: ', consentValidator.validationErrors());        
            
  //           Consents._collection.upsert(record.resource.id, record.resource)
    
  //         })
  //       } 

  //     }
  //   })
    
  //   Session.set('hapiResults', {})
  // }
  // queryHapiPatients(){
  //   // 
  //   console.log('queryHapiPatients')

  //   HTTP.get('https://hapi.fhir.org/baseDstu3/Patient?_pretty=true&_format=json&_count=100&_agent=Duke', function(error, result){
  //     if(error){
  //       console.error(error)        
  //     }
  //     if(result){
  //       // console.info(result)
  //       let resultContent = JSON.parse(result.content);
  //       console.info(resultContent)
        
  //       if(resultContent.resourceType === "Bundle"){
  //         resultContent.entry.forEach(function(record){
  //           let patientValidator = PatientSchema.newContext();
  //           patientValidator.validate(record.resource)
        
  //           console.log('IsValid: ', patientValidator.isValid())
  //           console.log('ValidationErrors: ', patientValidator.validationErrors());        
            
  //           Patients._collection.upsert(record.resource.id, record.resource)
    
  //         })
  //       } 

  //     }
  //   })
    
  //   Session.set('hapiPatients', {})
  // }  
  // queryHapiProvenances(){
  //   // 
  //   console.log('queryHapiProvenances')

  //   HTTP.get('https://hapi.fhir.org/baseDstu3/Provenance?_pretty=true&_format=json&_count=500&_agent=Duke', function(error, result){
  //     if(error){
  //       console.error(error)        
  //     }
  //     if(result){
  //       // console.info(result)
  //       let resultContent = JSON.parse(result.content);
  //       console.info(resultContent)
        
  //       if(resultContent.resourceType === "Bundle"){
  //         resultContent.entry.forEach(function(record){
  //           let provenanceValidator = ProvenanceSchema.newContext();
  //           provenanceValidator.validate(record.resource)
        
  //           console.log('IsValid: ', provenanceValidator.isValid())
  //           console.log('ValidationErrors: ', provenanceValidator.validationErrors());        
            
  //           Provenances._collection.upsert(record.resource.id, record.resource)
    
  //         })
  //       } 

  //     }
  //   })
    
  //   Session.set('hapiProvenances', {})
  // }
  // queryHapiDocumentReferences(){
  //   // 
  //   console.log('queryHapiProvenances')

  //   HTTP.get('https://hapi.fhir.org/baseDstu3/DocumentReference?_pretty=true&_format=json&_count=100', function(error, result){
  //     if(error){
  //       console.error(error)        
  //     }
  //     if(result){
  //       // console.info(result)
  //       let resultContent = JSON.parse(result.content);
  //       console.info(resultContent)
        
  //       if(resultContent.resourceType === "Bundle"){
  //         resultContent.entry.forEach(function(record){
  //           let documentReferenceValidator = DocumentReferenceSchema.newContext();
  //           documentReferenceValidator.validate(record.resource)
        
  //           console.log('IsValid: ', documentReferenceValidator.isValid())
  //           console.log('ValidationErrors: ', documentReferenceValidator.validationErrors());        
            
  //           DocumentReferences._collection.upsert(record.resource.id, record.resource)
  //         })
  //       } 

  //     }
  //   })
    
  //   Session.set('hapiProvenances', {})
  // }
  renderEastNavbar(displayThemeNavbar){
    console.log('Footer.renderEastNavbar')

    if (displayThemeNavbar) {
      return (<div>
          {/* <OpacitySlider style={this.data.eastStyle} /> */}
        </div>
      );
    } else {
      return (
        <div>
          {/* <FlatButton label='privacy screen' className='blurButton' ref='blurButton' onClick={this.clickOnBlurButton} style={this.data.style.buttonText} ></FlatButton> */}

          <ToolbarTitle
            id='privacyScreen'
            text='privacy | '
            style={{
              fontSize: '18px', 
              top: '-4px', 
              cursor: 'pointer'
            }}
            onClick={this.clickOnBlurButton }
          />

          <ToolbarTitle
            id='connectionStatus'
            text={this.data.status}
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
    console.log('this.data.pathname', this.data.pathname)
    console.log('this.data.userId', this.data.userId)

    let westNavbar;
    if(this.data.userId){
      westNavbar = this.renderWestNavbar(this.data.pathname);
    }
    console.log('westNavbar', westNavbar)
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