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

if(Package['clinical:hl7-resource-practitioner']){
  import { Practitioners } from 'meteor/clinical:hl7-resource-practitioner'
}

Session.setDefault('showThemingControls', false);

export class Footer extends React.Component {
  getMeteorData() {
    let data = {
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
        buttonText: Glass.darkroom({marginLeft: '20px'})
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

    var continuityOfCareDoc = {}

    if(Meteor.user()){
      continuityOfCareDoc = get(Meteor.user(), 'profile.continuityOfCare');
    }    

    var dataString = 'data:text/csv;charset=utf-8,' + encodeURIComponent(JSON.stringify(continuityOfCareDoc, null, 2));  
    var downloadlAnchorElement = document.getElementById('downloadAnchorElement');
    downloadAnchorElement.setAttribute("href", dataString );
    downloadAnchorElement.setAttribute("download", "continuity-of-care.json");
    downloadAnchorElement.click();
    // window.open('data:text/csv;charset=utf-8,' + escape(continuityOfCareDoc), '_self');  
  }
  clearContinuityOfCareDoc(){
    Meteor.users.update({_id: Meteor.userId()}, {$unset: {
      'profile.continuityOfCare': ''
    }});
  }
  sendNotification(){
    Meteor.users.update({_id: Meteor.userId()}, {$set: {
      'profile.inbox': true
    }});
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
  renderWestNavbar(displayThemeNavbar){
    if (displayThemeNavbar) {
      // the user has pressed ctrl-cmd-t and is looking at theming controls
      return (
        <div style={{marginTop: '-8px'}}>
          <FlatButton label='privacy screen' className='blurButton' ref='blurButton' onClick={this.clickOnBlurButton} style={this.data.style.buttonText} ></FlatButton>
          <FlatButton label='darkroom' className='darkroomButton' ref='darkroomButton' onClick={this.clickOnDarkroomButton} style={this.data.style.buttonText} ></FlatButton>
          <FlatButton label='theming' className='themingButton' ref='themingButton' onClick={this.clickOnThemingButton} style={this.data.style.buttonText} ></FlatButton>
        </div>
      );
    } else {
      // PATIENTS
      if (Meteor.userId() && (Session.equals('pathname', '/patients')) && get(Meteor, 'settings.public.modules.epic')) {
        // the user is logged in as a normal user
        return (
          <div>
            <FlatButton label='query open.epic.com' className='querySystemButton' ref='querySystemButton' onClick={this.querySystemButton.bind(this, 'Patients')} style={this.data.style.buttonText} ></FlatButton>
          </div>
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
        </div>
      );
    
      // ORGANIZATIONS
      } else if (Meteor.userId() && (Session.equals('pathname', '/organizations')) && get(Meteor, 'settings.public.modules.fhir.Organizations')) {
        // the user is logged in as a normal user
        return (
          <div>
            <FlatButton label='GET open.epic.com/Organization' className='querySystemButton' ref='querySystemButton' onClick={this.querySystemButton.bind(this, 'Organization')} style={this.data.style.buttonText} ></FlatButton>
          </div>
        );

      // CONTINUITY OF CARE
      } else if (Meteor.userId() && (Session.equals('pathname', '/continuity-of-care') || Session.equals('pathname', '/data-import') || Session.equals('pathname', '/timeline') || Session.equals('pathname', '/timeline-sidescroll'))) {
        // the user is logged in as a normal user
        return (
          <div>
            <FlatButton label='Import' className='importData' ref='importCcd' onClick={this.openLink.bind(this, '/data-import')} style={this.data.style.buttonText} ></FlatButton>
            <FlatButton label='Continuity of Care' className='ccdPage' ref='ccdPage' onClick={this.openLink.bind(this, '/continuity-of-care')} style={this.data.style.buttonText} ></FlatButton>
            <FlatButton label='Timeline' className='verticalTimeline' ref='verticalTimeline' onClick={this.openLink.bind(this, '/timeline')} style={this.data.style.buttonText} ></FlatButton>
            <FlatButton label='Sidescroll Timeline' className='horizontalTimeline' ref='horizontalTimeline' onClick={this.openLink.bind(this, '/timeline-sidescroll')} style={this.data.style.buttonText} ></FlatButton>
            <FlatButton label='Export CCD' id="exportContinuityOfCareDoc" className='exportCcd' ref='exportContinuityOfCareDoc' style={this.data.style.buttonText} onClick={this.exportContinuityOfCareDoc}></FlatButton>
            <FlatButton label='Clear' id="clearContinuityOfCareDoc" className='clearCcd' ref='clearContinuityOfCareDoc' style={this.data.style.buttonText} onClick={this.clearContinuityOfCareDoc}></FlatButton>
            <a id="downloadAnchorElement" style={{display: "none"}}></a>
          </div>
        );

      // CONDITIONS
      } else if (Meteor.userId() && (Session.equals('pathname', '/conditions')) && get(Meteor, 'settings.public.modules.epic')) {
        // the user is logged in as a normal user
        return (
          <div>
            <FlatButton label='GET open.epic.com/Condition' className='querySystemButton' ref='querySystemButton' onClick={this.querySystemButton.bind(this, 'Condition')} style={this.data.style.buttonText} ></FlatButton>
          </div>
        );

    // ZYGOTE
    } else if (Meteor.userId() && (Session.equals('pathname', '/zygote'))) {
      // the user is logged in as a normal user
      return (
        <div>
          <FlatButton label='Rotate' className='querySystemButton' ref='querySystemButton' onClick={this.rotateZygote.bind(this, 'Condition')} style={this.data.style.buttonText} ></FlatButton>
        </div>
      );

    // VIDEOCONFERENCING
    } else if (Meteor.userId() && (Session.equals('pathname', '/videoconferencing'))) {
      // the user is logged in as a normal user
      return (
        <div>
          <FlatButton label='Phonebook' className='querySystemButton' ref='querySystemButton' onClick={this.showPhonebook.bind(this, 'Condition')} style={this.data.style.buttonText} ></FlatButton>
          <FlatButton label='Fullscreen' className='querySystemButton' ref='querySystemButton' onClick={this.fullscreenVideo.bind(this)} style={this.data.style.buttonText} ></FlatButton>
          <FlatButton label='Orbital' className='querySystemButton' ref='querySystemButton' onClick={this.showOrbital.bind(this)} style={this.data.style.buttonText} ></FlatButton>
        </div>
      );


      // NOTIFICATIONS
    } else if (Meteor.userId() && (Session.equals('pathname', '/notifications')) && get(Meteor, 'settings.public.defaults.notificationMenu')) {
      // the user is logged in as a normal user
      return (
        <div>
          <FlatButton label='Send Notifcation' className='querySystemButton' ref='querySystemButton' onClick={this.sendNotification.bind(this)} style={this.data.style.buttonText} ></FlatButton>
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
      return (
        <OpacitySlider style={this.data.eastStyle} />
      );
    } else {
      return (
        <div>                
          <DeviceWifiTethering 
            id='toggleOrbital'
            style={{top: '-4', marginRight: '10px', cursor: 'pointer'}}
            onTouchTap={this.showOrbital }
            />
          <ToolbarTitle
            id='connectionStatus'
            text={this.data.status}
            style={{fontSize: '18px', top: '-4px', cursor: 'pointer'}}
            onTouchTap={this.openInfo }
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
