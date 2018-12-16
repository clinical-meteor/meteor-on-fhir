import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Card, CardMedia, CardTitle, CardText, CardActions, Toggle } from 'material-ui';
import { DynamicSpacer } from 'meteor/clinical:glass-ui';

import { get } from 'lodash';

import { Alert, Table } from 'react-bootstrap';

const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  labelStyle: {
    color: 'red',
  },
};


function getOS() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}

let disabledStyle = {backgroundColor: '#eeeeee', color: '#333333', borderColor: '#dddddd'};

export class PrivacyControlsCard extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {
      consentToggles: {
        performanceAnalytics: get(Meteor.user(), 'profile.consents.performanceAnalytics.status') === 'active' ? true : false,
        medicalCodeLookup: get(Meteor.user(), 'profile.consents.medicalCodeLookup.status') === 'active' ? true : false,
        patientEducationReferences: get(Meteor.user(), 'profile.consents.patientEducationReferences.status') === 'active' ? true : false,
        geocoding: get(Meteor.user(), 'profile.consents.geocoding.status') === 'active' ? true : false,
        fileVault: get(Meteor, 'settings.public.fileVault') === "on" ? true : false
      },
      consentBsStyles: {
        performanceAnalytics: get(Meteor.user(), 'profile.consents.performanceAnalytics.status') === 'active' ? 'warning' : '',
        medicalCodeLookup: get(Meteor.user(), 'profile.consents.medicalCodeLookup.status') === 'active' ? 'warning' : '',
        patientEducationReferences: get(Meteor.user(), 'profile.consents.patientEducationReferences.status') === 'active' ? 'warning' : '',
        geocoding: get(Meteor.user(), 'profile.consents.geocoding.status') === 'active' ? 'warning' : '',
        fileVault: get(Meteor, 'settings.public.fileVault') === "on" ? 'success' : 'danger'
      },
      consentStyles: {
        performanceAnalytics: get(Meteor.user(), 'profile.consents.performanceAnalytics.status') === 'active' ? null : disabledStyle,
        medicalCodeLookup: get(Meteor.user(), 'profile.consents.medicalCodeLookup.status') === 'active' ? null : disabledStyle,
        patientEducationReferences: get(Meteor.user(), 'profile.consents.patientEducationReferences.status') === 'active' ? null : disabledStyle,
        geocoding: get(Meteor.user(), 'profile.consents.geocoding.status') === 'active' ? null : disabledStyle
      },
      accessTokens: []
    };

    if(['iPhone'].includes(window.navigator.platform)){
      data.consentBsStyles.fileVault = 'success';
    }

    return data;
  }
  togglePerformance(event, value){
    console.log('togglePerformance', value);

    let newStatus = '';

    if(value === true){
      newStatus = 'active'
    } else if (value === false) {
      newStatus = 'inactive'
    }

    Meteor.users.update({_id: Meteor.userId()}, {$set: {
      'profile.consents.performanceAnalytics.status': newStatus
    }})
  }
  toggleMedicalCodeLookup(event, value){
    console.log('togglePerformance', value);

    let newStatus = '';

    if(value === true){
      newStatus = 'active'
    } else if (value === false) {
      newStatus = 'inactive'
    }

    Meteor.users.update({_id: Meteor.userId()}, {$set: {
      'profile.consents.medicalCodeLookup.status': newStatus
    }})

  }
  togglePatientEducation(event, value){
    console.log('togglePerformance', value);

    let newStatus = '';

    if(value === true){
      newStatus = 'active'
    } else if (value === false) {
      newStatus = 'inactive'
    }

    Meteor.users.update({_id: Meteor.userId()}, {$set: {
      'profile.consents.patientEducationReferences.status': newStatus
    }})

  }
  toggleGeocoding(event, value){
    console.log('togglePerformance', value);

    let newStatus = '';

    if(value === true){
      newStatus = 'active'
    } else if (value === false) {
      newStatus = 'inactive'
    }

    Meteor.users.update({_id: Meteor.userId()}, {$set: {
      'profile.consents.geocoding.status': newStatus
    }})

  }
  render(){

    let performanceAnalyticsText = '';
    let medicalCodeLookupText = '';
    let patientEducationReferencesText = '';
    let geocodingText = '';
    let accessTokensText = ''
    let encryptionText = '';

    if(this.data.consentToggles.performanceAnalytics){
      performanceAnalyticsText = 'Sending performance analytics to Symptomatic helps us improve this application and make it better for you.  Analytics that we track through Google Analytics include metrics such as page visits, time spent on a page, type of device you are using, location that the app was accessed, and system errors.'
    } else {
      performanceAnalyticsText = 'This app will not send any performance analytics to Symptomatic.'
    }

    if(this.data.consentToggles.medicalCodeLookup){
      medicalCodeLookupText = 'This app may fetch data and content from external websites to help interpret the data in the medical record.  This will typically involve looking up RxNorm codes to determine medication names and effects; looking up ICD10 codes to determine disease and condition names, looking up SNOMED-CT codes to determine anatomical clasifications, and looking up LOINC codes to determine laboratory tests.  '
    } else {
      medicalCodeLookupText = 'This app will not look up medical codes from terminology servers.  Some functionality may be impacted.'
    }

    if(this.data.consentToggles.patientEducationReferences){
      patientEducationReferencesText = 'This app may fetch additional content, such as patient education materials and medical illustrations, to help interpret and explain your medical records.'
    } else {
      patientEducationReferencesText = 'This app will not look up patient education materials from 3rd party sites.  Some functionality may be impacted.'
    }

    if(this.data.consentToggles.geocoding){
      geocodingText = 'This app may contact Google Maps to retrieve the latitude/longitude of home addresses, medical offices, and other locations.  The app will send anonymized versions of these addresses without any identifying information.'
    } else {
      geocodingText = 'This app will not geocode addresses.  Some geomapping functionality may be impacted.'
    }

    if(this.data.accessTokens.length > 0){
      accessTokensText = 'We have found the following Access Tokens associated with your account.';
    } else {
      accessTokensText = 'We did not find any Access Tokens associated with your account.';
    }

    let osText = getOS();
    let detectedFileEncryption = false;

    if(['iPhone'].includes(window.navigator.platform)){
      encryptionText = "iPhone detected!  Devices running iOS 11.3 or later on an iPhone support Apple HealthRecord, which stores your records in an encrypted HIPAA compliant zone on your device.  Please make sure your device is upgraded to v11.3 or later. ";
      detectedFileEncryption = true;
    } else if(['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K', 'Mac OS'].includes(window.navigator.platform)){
      if(get(Meteor, 'settings.public.fileVault') === "on"){
        encryptionText = "We found FileVault running on your Mac!  This is an important step in establishing HIPAA compliance.";
      } else {
        encryptionText = "We don't detect FileVault running on your Mac!  This app will not store protected health information on this device, although some user account information and administrative data may be stored, such as username, password, HIPAA audit log,and consent authorizations.  This app allows you to export and save your health data to your local device; so after using this app, you may chose to store data on your local device; in which case, protecting your health information and privacy will be your responsibility.";
      }
    }


    // let accessTokenRows = [];
    // for (let index = 0; index < this.data.accessTokens.length; index++) {

    //   accessTokenRows.push(
    //     <tr className='accessTokenRow' key={i} >
    //       <td className='serviceName'>{ get(this, 'data.accessToken.serviceName') }</td>
    //       <td className='token'>{ get(this, 'data.accessToken.token') }</td>
    //       <td className='expiration'>{ get(this, 'data.accessToken.expiration') }</td>
    //     </tr>
    //   )
    // }

    return (
      <div>
         {/* <CardTitle title='Privacy Policy' />

         <CardText style={{margin: '20px'}}>
            <p >Symptomatic Timeline is an application is provided by Symptomatic, LLC, an Illinois company based out of the Polsky Center for Entrepreneurship (University of Chicago), and MATTER.health, a Chicago area health incubator.</p>

            <p>This app was initially produced by volunteers and the open source community.  Subsequent development was provided by consulting fees, and the app is now funded by purchases, subscriptions, and donations.  </p>

            <p>Symptomatic Timeline is designed to not store protected health information (PHI) on our servers, which greatly reduces the risk of HIPAA breaches.  However, we have also implemented policies, procedures, audit trails, and encryption to be HIPAA compliant, as some of our other applications require this level of regulatory oversight.  We are happy and willing to sign business associate agreements (BAA) with covered entities that require them. </p>

            <p>Users specifically approve each time their protected health information is accessed.  This app allows users to obtain a complete record of the data that it has stored about them.  This app allows users to delete all of the data that it has stored about them.</p>

            <p>In summary, this data fetches protected health information directly from FHIR compliant servers to the user’s mobile device or desktop, displays it in a timeline, provides context to understand the medical chart, and then allows users to export/download the result.  The app does not directly store user PHI on our servers.</p>
          </CardText> */}

          <CardTitle title='Privacy Controls' subtitle={ moment().format('YYYY MMM DD')} />
          {/* <CardText style={{margin: '20px', marginTop: '0px'}}> */}
            <Alert bsStyle="success">
              <Toggle
                label="Symptomatic Core Services"
                defaultToggled={true}
                style={styles.toggle}
                disabled={true}
              />
              This app may send core data to Symptomatic services, including account username/password, audit logs, consent, and other infrastructure data.  This data is necessary for this application to work and to maintain legal and regulatory compliance.  These core services avoid Protected Health Information (PHI) as much as possible, although medical record numbers and patient name is frequently included.  
            </Alert>
            {/* <DynamicSpacer /> */}
            <Alert bsStyle={this.data.consentBsStyles.fileVault} >
              <Toggle
                label="Disk Encryption (i.e. Encrypted Data at Rest)"
                defaultToggled={detectedFileEncryption}
                style={styles.toggle}
                disabled={true}
              />
              <p><b>Detected Operating System:  </b>{ osText }</p>
              <p>{ encryptionText }</p>
            </Alert>

            <Alert bsStyle={this.data.consentBsStyles.performanceAnalytics} style={this.data.consentStyles.performanceAnalytics} >
              <Toggle
                label="Performance Analytics"
                defaultToggled={ this.data.consentToggles.performanceAnalytics }
                onToggle={ this.togglePerformance.bind(this) }
              />
              { performanceAnalyticsText }              
            </Alert>
            {/* <DynamicSpacer /> */}

            <Alert bsStyle={this.data.consentBsStyles.medicalCodeLookup} style={this.data.consentStyles.medicalCodeLookup} >
              <Toggle
                label="Medical Code Lookups - LOINC, SNOMED, and RxNORM"
                toggled={ this.data.consentToggles.medicalCodeLookup }
                onToggle={ this.toggleMedicalCodeLookup.bind(this) }
              />
              { medicalCodeLookupText }                 
            </Alert>
            {/* <DynamicSpacer /> */}
            <Alert bsStyle={this.data.consentBsStyles.patientEducationReferences} style={this.data.consentStyles.patientEducationReferences} >
              <Toggle
                label="Patient Education References"
                toggled={ this.data.consentToggles.patientEducationReferences }
                onToggle={ this.togglePatientEducation.bind(this) }
              />
                { patientEducationReferencesText }
              </Alert>
            {/* <DynamicSpacer /> */}
            <Alert bsStyle={this.data.consentBsStyles.geocoding} style={this.data.consentStyles.geocoding} >
              <Toggle
                label="Geocoding"
                toggled={ this.data.consentToggles.geocoding }
                onToggle={ this.toggleGeocoding.bind(this) }
              />
                { geocodingText }  
            </Alert>
            {/* <DynamicSpacer /> */}

            {/* <DynamicSpacer /> */}
            {/* <Alert bsStyle={this.data.consentBsStyles.accessTokens} style={this.data.consentStyles.accessTokens}>
              <Toggle
                label="Access Tokens"
                defaultToggled={true}
                style={styles.toggle}
              />
              { accessTokensText }
              <DynamicSpacer />

              <Table>
                <thead>
                  <tr>
                    <th className='serviceName'>Service Name</th>
                    <th className='token'>Token</th>
                    <th className='expiration'>Expiration</th>
                  </tr>
                </thead>
                <tbody>
                  {accessTokenRows}
                </tbody>
              </Table>
                            
            </Alert> */}

         {/* </CardText> */}
        </div>
    );
  }
}

ReactMixin(PrivacyControlsCard.prototype, ReactMeteorData);
export default PrivacyControlsCard;

