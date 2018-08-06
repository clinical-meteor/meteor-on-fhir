// footer
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { Glass } from 'meteor/clinical:glass-ui';
import ImageBlurOn from 'material-ui/svg-icons/image/blur-on';
import ImageExposure from 'material-ui/svg-icons/image/exposure';
import OpacitySlider from '../components/OpacitySlider';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import {Session} from 'meteor/session';
import { ToolbarTitle } from 'material-ui/Toolbar';
import { browserHistory } from 'react-router';
import { has, get } from 'lodash';
import DeviceWifiTethering from 'material-ui/svg-icons/device/wifi-tethering';

// if(Package['clinical:hl7-resource-practitioner']){
//   import { Practitioners } from 'meteor/clinical:hl7-resource-practitioner'
// }

Session.setDefault('showThemingControls', false);
Session.setDefault('gender', 'Pink');
Session.setDefault('timelineBackground', false);
Session.setDefault('continuityOfCareDoc', null);

export class Footer extends React.Component {
  getMeteorData() {
    let data = {
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
        }
      }
    };

    if (Meteor.status) {
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
  clearContinuityOfCareDoc(){
    Meteor.users.update({_id: Meteor.userId()}, {$unset: {
      'profile.continuityOfCare': ''
    }});
  }
  transferCurrentPatient(){
    console.log('Transferring patient...');
    console.log('selectedPractitioner:  ', Session.get('selectedPractitioner'));


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
  }
  toggleStates(){
    if(Session.equals('powerOfAttorneyState', 'Illinois')){
      Session.set('powerOfAttorneyState', 'North Carolina');
    } else if(Session.equals('powerOfAttorneyState', 'North Carolina')){
      Session.set('powerOfAttorneyState', 'Illinois');      
    }
  }
  renderWestNavbar(displayThemeNavbar){
    if (displayThemeNavbar) {
      // the user has pressed ctrl-cmd-t and is looking at theming controls
      return (
        <div style={{marginTop: '-8px'}}>
          {/* <FlatButton label='privacy screen' className='blurButton' ref='blurButton' onClick={this.clickOnBlurButton} style={this.data.style.buttonText} ></FlatButton>
          <FlatButton label='darkroom' className='darkroomButton' ref='darkroomButton' onClick={this.clickOnDarkroomButton} style={this.data.style.buttonText} ></FlatButton>
          <FlatButton label='theming' className='themingButton' ref='themingButton' onClick={this.clickOnThemingButton} style={this.data.style.buttonText} ></FlatButton> */}
        </div>
      );
    } else {
      // PATIENTS
      if (Meteor.userId() && (Session.equals('pathname', '/')) ) {
        return (
          <div style={{marginTop: '-8px'}}>
            <FlatButton label='filter tiles' className='filterTileButton' ref='filterTileButton' onClick={this.toggleFilterMainTiles} style={this.data.style.buttonText} ></FlatButton>
          </div>
        );

        // PATIENTS
      } else if (Meteor.userId() && (Session.equals('pathname', '/patients')) && get(Meteor, 'settings.public.modules.epic')) {
        // the user is logged in as a normal user
        return (
          <div></div>
        );

      // PRACTITIONERS
      } else if (Meteor.userId() && (Session.equals('pathname', '/practitioners')) && get(Meteor, 'settings.public.modules.fhir.Practitioners')) {
        if(Package["symptomatic:blockchain-core"]){          
          return (
            <div>
              <FlatButton label='Read Practitioners on Bigchain' className='querySystemButton' ref='querySystemButton' onClick={this.readPractitionersFromBlockchain.bind(this)} style={this.data.style.buttonText} ></FlatButton>
              <FlatButton label='Query Practitioner History' className='querySystemButton' ref='querySystemButton' onClick={this.searchBigchainForPractitioner.bind(this)} style={this.data.style.buttonText} ></FlatButton>
            </div>
          );
        }
            
      // OBSERVATIONS
    } else if (Meteor.userId() && (Session.equals('pathname', '/observations')) && get(Meteor, 'settings.public.modules.fhir.Observations')) {
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
    
      // ORGANIZATIONS
      } else if (Meteor.userId() && (Session.equals('pathname', '/organizations')) && get(Meteor, 'settings.public.modules.fhir.Organizations')) {
        return (
          <div>
            {/* <FlatButton label='GET open.epic.com/Organization' className='querySystemButton' ref='querySystemButton' onClick={this.querySystemButton.bind(this, 'Organization')} style={this.data.style.buttonText} ></FlatButton> */}
          </div>
        );

      // CONTINUITY OF CARE
      } else if (Meteor.userId() && (Session.equals('pathname', '/continuity-of-care') )) {
        return (
          <div>
            <FlatButton label='Sidescroll Timeline' className='horizontalTimeline' ref='horizontalTimeline' onClick={this.openLink.bind(this, '/timeline-sidescroll')} style={this.data.style.buttonText} ></FlatButton>
            <FlatButton label='Import' className='importData' ref='importCcd' onClick={this.openLink.bind(this, '/data-management')} style={this.data.style.buttonText} ></FlatButton>
            <FlatButton label='Export CCD' id="exportContinuityOfCareDoc" className='exportCcd' ref='exportContinuityOfCareDoc' style={this.data.style.buttonText} onClick={this.exportContinuityOfCareDoc}></FlatButton>
          </div>
        );

      // TIMELINE
      } else if (Meteor.userId() && (Session.equals('pathname', '/timeline') || Session.equals('pathname', '/timeline-sidescroll'))) {
        return (
          <div>
            <FlatButton label='Continuity of Care' className='ccdPage' ref='ccdPage' onClick={this.openLink.bind(this, '/continuity-of-care')} style={this.data.style.buttonText} ></FlatButton>
            <FlatButton label={this.data.gender} id="pinkBlueToggle" className='clearCcd' ref='pinkBlueToggle' style={this.data.style.buttonText} onClick={this.pinkBlueToggle}></FlatButton>
            <FlatButton label='Background' id="toggleBackground" className='clearCcd' ref='toggleBackground' style={this.data.style.buttonText} onClick={this.toggleBackground}></FlatButton>
          </div>
        );

      // DATA Management
      } else if (Meteor.userId() && (Session.equals('pathname', '/data-management'))) {
        return (
          <div>
            <FlatButton label='Prepare CCD' id="exportContinuityOfCareDoc" className='exportCcd' ref='exportContinuityOfCareDoc' style={this.data.style.buttonText} onClick={this.exportContinuityOfCareDoc}></FlatButton>
            <FlatButton label='Download' id="downloadContinuityOfCareDoc" className='exportCcd' ref='exportContinuityOfCareDoc' style={this.data.style.buttonText} onClick={this.downloadContinuityOfCareDoc}></FlatButton>
            <FlatButton label='Clear' disabled={true} id="clearContinuityOfCareDoc" className='clearCcd' ref='clearContinuityOfCareDoc' style={this.data.style.disabledButtonText} onClick={this.clearContinuityOfCareDoc}></FlatButton>
            <a id="downloadAnchorElement" style={{display: "none"}} ></a>            
          </div>
        );

      // CONDITIONS
      } else if (Meteor.userId() && (Session.equals('pathname', '/conditions')) && get(Meteor, 'settings.public.modules.epic')) {
        return (
          <div></div>
        );

      // ZYGOTE
      } else if (Meteor.userId() && (Session.equals('pathname', '/zygote'))) {
        return (
          <div>
            <FlatButton label='Rotate' className='querySystemButton' ref='querySystemButton' onClick={this.rotateZygote.bind(this, 'Condition')} style={this.data.style.buttonText} ></FlatButton>
          </div>
        );

      // VIDEOCONFERENCING
      } else if (Meteor.userId() && (Session.equals('pathname', '/videoconferencing'))) {
        return (
          <div>
            <FlatButton label='Phonebook' className='querySystemButton' ref='querySystemButton' onClick={this.showPhonebook.bind(this, 'Condition')} style={this.data.style.buttonText} ></FlatButton>
            <FlatButton label='Fullscreen' className='querySystemButton' ref='querySystemButton' onClick={this.fullscreenVideo.bind(this)} style={this.data.style.buttonText} ></FlatButton>
            <FlatButton label='Orbital' className='querySystemButton' ref='querySystemButton' onClick={this.showOrbital.bind(this)} style={this.data.style.buttonText} ></FlatButton>
          </div>
        );

        // ENDPOINTS
      } else if (Meteor.userId() && (Session.equals('pathname', '/endpoints'))) {
        return (
          <div>
            <FlatButton label='Clear' className='clearEndpoints' ref='querySystemButton' onClick={this.clearEndpoints} style={this.data.style.buttonText} ></FlatButton>
            <FlatButton label='Init Graph' ref='querySystemButton' onClick={this.initBlockchainGraph} style={this.data.style.buttonText} ></FlatButton>
          </div>
        );

      // GRAPHS
      } else if (Meteor.userId() && (Session.equals('pathname', '/blockchain-graphs'))) {
        return (
          <div>
            <FlatButton label='Config' className='configGraph' ref='querySystemButton' onClick={ this.configBlockchain } style={this.data.style.buttonText} ></FlatButton>
            <FlatButton label='Lines' className='configGraph' ref='querySystemButton' onClick={ this.showLines } style={this.data.style.buttonText} ></FlatButton>
          </div>
        );


      // Power of Attorney
    } else if (Meteor.userId() && (Session.equals('pathname', '/power-of-attorney'))) {
      return (
        <div>
          <FlatButton label='State' className='configGraph' ref='querySystemButton' onClick={ this.toggleStates } style={this.data.style.buttonText} ></FlatButton>
        </div>
      );        


        // NOTIFICATIONS
      } else if (Meteor.userId() && (Session.equals('pathname', '/notifications')) && get(Meteor, 'settings.public.defaults.notificationMenu')) {
        return (
          <div>
            <FlatButton label='Transfer Current Patient' className='querySystemButton' ref='querySystemButton' onClick={this.transferCurrentPatient.bind(this)} style={this.data.style.buttonText} ></FlatButton>
          </div>
        );

      } else {
        // anything else
        return (
          <div></div>
        );

      }
    }
  }
  renderEastNavbar(displayThemeNavbar){
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
            style={{fontSize: '18px', top: '-4px', cursor: 'pointer'}}
            onClick={this.clickOnBlurButton }
          />

          <ToolbarTitle
            id='connectionStatus'
            text={this.data.status}
            style={{fontSize: '18px', top: '-4px', cursor: 'pointer'}}
            onClick={this.openInfo }
          />
        </div>
      );
    }
  }
  openInfo(){
    Session.toggle('secondPanelVisible');
    // browserHistory.push('/info');
  }
  render () {
    return(
      <div id='appFooter' style={this.data.footerStyle}>
        <AppBar
          iconElementLeft={ this.renderWestNavbar(this.data.displayThemeNavbar) }
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