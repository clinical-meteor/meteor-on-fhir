import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Card, CardMedia, CardTitle, CardText, CardActions, Toggle } from 'material-ui';
import { DynamicSpacer } from 'meteor/clinical:glass-ui';

import { get } from 'lodash';

import { Alert } from 'react-bootstrap';

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


export class PrivacyPolicyCard extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {
      consentToggles: {
        performanceAnalytics: get(Meteor.user(), 'profile.consents.performanceAnalytics.status') === 'active' ? true : false,
        medicalCodeLookup: get(Meteor.user(), 'profile.consents.medicalCodeLookup.status') === 'active' ? true : false,
        patientEducationReferences: get(Meteor.user(), 'profile.consents.patientEducationReferences.status') === 'active' ? true : false,
        geocoding: get(Meteor.user(), 'profile.consents.geocoding.status') === 'active' ? true : false 
      },
      consentStyles: {
        performanceAnalytics: get(Meteor.user(), 'profile.consents.performanceAnalytics.status') === 'active' ? 'warning' : 'disabledAlert',
        medicalCodeLookup: get(Meteor.user(), 'profile.consents.medicalCodeLookup.status') === 'active' ? 'warning' : 'disabledAlert',
        patientEducationReferences: get(Meteor.user(), 'profile.consents.patientEducationReferences.status') === 'active' ? 'warning' : 'disabledAlert',
        geocoding: get(Meteor.user(), 'profile.consents.geocoding.status') === 'active' ? 'warning' : 'disabledAlert'
      }
    };

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
    return (
         <CardText style={{margin: '20px'}}>
            <p>Symptomatic Timeline is an application is provided by Symptomatic, LLC, an Illinois company based out of the Polsky Center for Entrepreneurship (University of Chicago), and MATTER.health, a Chicago area health incubator.</p>

            <p>This app was initially produced by volunteers and the open source community.  Subsequent development was provided by consulting fees, and the app is now funded by purchases, subscriptions, and donations.  </p>

            <p>Symptomatic Timeline is designed to not store protected health information (PHI) on our servers, which greatly reduces the risk of HIPAA breaches.  That being said, we have implemented policies, procedures, audit trails, and encryption to be HIPAA compliant, as some of our other applications require this level of regulatory oversight.  We are happy and willing to sign business associate agreements (BAA) with covered entities that require them. </p>

            <p>Generally speaking, this app does not store protected health information, although it does store some user account information, and administrative data such as HIPAA audit log and consent authorizations.  This app allows you to export and save your health data to your local device; so after using this app, you may chose to store data on your local device; in which case, protecting your health information and privacy will be your responsibility.</p>

            <p>Symptomatic Timeline does not relay or route protected health information to other servers or devices.  Some tracking information about application usage is sent to Google Analytics to help us understand usage patterns and improve the product.  This app also generates aggregate and generalized data using de-identified data.  The user may also choose to geocode their home address, which involves sending anonymized address to Google geocoding servers.</p>

            <p>Users specifically approve each time their protected health information is accessed.  This app allows users to obtain a complete record of the data that it has stored about them.</p>

            <p>This app allows users to delete all of the data that it has stored about them.</p>

            <p>In summary, this data fetches protected health information directly from FHIR compliant servers to the user’s web browser, displays it in a timeline, and then allows users to export/download the result.  The app does not directly store user PHI on our servers.</p>

            <Alert bsStyle="success">
              <Toggle
                label="Symptomatic Core Services"
                defaultToggled={true}
                style={styles.toggle}
                disabled={true}
              />
              This app will send some core data to Symptomatic services, including account access, audit logs, consent, and other infrastructure data.  This data is necessary for this application to work and to maintain legal and regulatory compliance.  These core services avoid Protected Health Information (PHI) as much as possible, although medical record numbers and patient name is frequently included.  
            </Alert>
            {/* <DynamicSpacer /> */}

            <Alert bsStyle={this.data.consentStyles.performanceAnalytics}>
              <Toggle
                label="Performance Analytics"
                defaultToggled={ this.data.consentToggles.performanceAnalytics }
                onToggle={ this.togglePerformance.bind(this) }
              />
              Sending performance analytics to Symptomatic helps us improve this application and make it better for you.  Analytics that we track through Google Analytics include metrics such as page visits, time spent on a page, type of device you are using, location that the app was accessed, and system errors.
            </Alert>
            {/* <DynamicSpacer /> */}

            <Alert bsStyle={this.data.consentStyles.medicalCodeLookup} >
              <Toggle
                label="Medical Code Lookups - LOINC, SNOMED, and RxNORM"
                toggled={ this.data.consentToggles.medicalCodeLookup }
                onToggle={ this.toggleMedicalCodeLookup.bind(this) }
              />
              This app may fetch data and content from external websites to help interpret the data in the medical record.   
            </Alert>
            {/* <DynamicSpacer /> */}
            <Alert bsStyle={this.data.consentStyles.patientEducationReferences} >
              <Toggle
                label="Patient Education References"
                toggled={ this.data.consentToggles.patientEducationReferences }
                onToggle={ this.togglePatientEducation.bind(this) }
              />
              This app may fetch additional content, such as patient education materials, to help interpret conditions, procedures, medications, and other data in the medical record.
              </Alert>
            {/* <DynamicSpacer /> */}
            <Alert bsStyle={this.data.consentStyles.geocoding} >
              <Toggle
                label="Geocoding"
                toggled={ this.data.consentToggles.geocoding }
                onToggle={ this.toggleGeocoding.bind(this) }
              />
              This app may contact Google Maps to retrieve the latitude/longitude of home addresses, medical offices, and other locations.  The app will send anonymized versions of these addresses without any identifying information.  
            </Alert>
            {/* <DynamicSpacer /> */}
            <Alert bsStyle="danger">
              <Toggle
                label="FileVault Disk Encryptiong"
                defaultToggled={true}
                style={styles.toggle}
                disabled={true}
              />
              We don't detect FileVault running on your Mac!  
            </Alert>
            {/* <DynamicSpacer /> */}
            <Alert bsStyle="disabledAlert">
              <Toggle
                label="Access Tokens"
                defaultToggled={true}
                style={styles.toggle}
              />
              We have found the following Access Tokens associated with your account.

              
            </Alert>

         </CardText>
    );
  }
}

ReactMixin(PrivacyPolicyCard.prototype, ReactMeteorData);
export default PrivacyPolicyCard;

