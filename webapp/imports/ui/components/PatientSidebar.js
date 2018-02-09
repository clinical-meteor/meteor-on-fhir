import { List, ListItem } from 'material-ui/List';

import { IndexLinkContainer } from 'react-router-bootstrap';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';

import { get } from 'lodash';



// Pick up any dynamic routes that are specified in packages, and include them
var dynamicModules = [];
Object.keys(Package).forEach(function(packageName){
  if(Package[packageName].SidebarElements){
    // we try to build up a route from what's specified in the package
    Package[packageName].SidebarElements.forEach(function(element){
      dynamicModules.push(element);      
    });    
  }
});

console.log('dynamicModules', dynamicModules)


export class PatientSidebar extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        position: 'fixed',
        top: '0px',
        width: '100%',
        display: 'flex',
        // height: '6.4rem',
        alignItems: 'center',
        padding: '0 2.4rem',
        opacity: Session.get('globalOpacity')
      },
      listItem: {
        display: 'inline-block',
        position: 'relative'
      }
    };

    return data;
  }

  handleLogout() {
    console.log("handleLogout");
    Meteor.logout();
  }

  handleProfile() {
    browserHistory.push('/myprofile');
  }

  render () {

    //----------------------------------------------------------------------
    // Core Modules 

    var healthlog;

    if(get(Meteor, 'settings.public.modules.healthlog')){
      allergies = <IndexLinkContainer to='/weblog'>
        <ListItem primaryText='Healthlog' href='/weblog' />
      </IndexLinkContainer>;
    }


    //----------------------------------------------------------------------
    // FHIR Modules

    var allergies;
    var careplans;
    var conditions;
    var devices;
    var diagnosticReports;
    var goals;
    var immunizations;
    var locations;
    var organizations;
    var medications;
    var medicationOrders;
    var medicationStatements;
    var observations;
    var procedures;
    var riskAssessments;

    var fhirSection;
    var fhirSectionEnabled;

    if(get(Meteor, 'settings.public.modules.fhir.AllergyIntolerances')){
      fhirSectionEnabled = true;
      allergies = <IndexLinkContainer to='/allergies'>
        <ListItem primaryText='Allergy Intolerances' href='/allergies' />
      </IndexLinkContainer>;
    }
    if(get(Meteor, 'settings.public.modules.fhir.CarePlans')){
      fhirSectionEnabled = true;
      careplans = <IndexLinkContainer to='/care-plans'>
        <ListItem primaryText='Care Plans' href='/care-plans' />
      </IndexLinkContainer>;
    }
    if(get(Meteor, 'settings.public.modules.fhir.Conditions')){
      fhirSectionEnabled = true;
      careplans = <IndexLinkContainer to='/conditions'>
        <ListItem primaryText='Conditions' href='/conditions' />
      </IndexLinkContainer>;
    }
    if(get(Meteor, 'settings.public.modules.fhir.Devices')){
      fhirSectionEnabled = true;
      careplans = <IndexLinkContainer to='/devices'>
        <ListItem primaryText='Devices' href='/devices' />
      </IndexLinkContainer>;
    }
    if(get(Meteor, 'settings.public.modules.fhir.DiagnosticReports')){
      fhirSectionEnabled = true;
      careplans = <IndexLinkContainer to='/diagnostic-reports'>
        <ListItem primaryText='Diagnostic Reports' href='/diagnostic-reports' />
      </IndexLinkContainer>;
    }
    if(get(Meteor, 'settings.public.modules.fhir.Goals')){
      fhirSectionEnabled = true;
      careplans = <IndexLinkContainer to='/goals'>
        <ListItem primaryText='Goals' href='/goals' />
      </IndexLinkContainer>;
    }
    if(get(Meteor, 'settings.public.modules.fhir.Immunizations')){
      fhirSectionEnabled = true;
      careplans = <IndexLinkContainer to='/immunizations'>
        <ListItem primaryText='Imunizations' href='/immunizations' />
      </IndexLinkContainer>;
    }
    if(get(Meteor, 'settings.public.modules.fhir.Locations')){
      fhirSectionEnabled = true;
      careplans = <IndexLinkContainer to='/locations'>
        <ListItem primaryText='Locations' href='/locations' />
      </IndexLinkContainer>;
    }
    if(get(Meteor, 'settings.public.modules.fhir.Organizations')){
      fhirSectionEnabled = true;
      careplans = <IndexLinkContainer to='/organizations'>
        <ListItem primaryText='Organizations' href='/organizations' />
      </IndexLinkContainer>;
    }
    if(get(Meteor, 'settings.public.modules.fhir.Medications')){
      fhirSectionEnabled = true;
      careplans = <IndexLinkContainer to='/medications'>
        <ListItem primaryText='Medications' href='/medications' />
      </IndexLinkContainer>;
    }
    if(get(Meteor, 'settings.public.modules.fhir.MedicationOrders')){
      fhirSectionEnabled = true;
      careplans = <IndexLinkContainer to='/medication-orders'>
        <ListItem primaryText='Medication Orders' href='/medication-orders' />
      </IndexLinkContainer>;
    }
    if(get(Meteor, 'settings.public.modules.fhir.MedicationStatements')){
      fhirSectionEnabled = true;
      careplans = <IndexLinkContainer to='/medication-statements'>
        <ListItem primaryText='Medication Statements' href='/medication-statements' />
      </IndexLinkContainer>;
    }
    if(get(Meteor, 'settings.public.modules.fhir.Observations')){
      fhirSectionEnabled = true;
      careplans = <IndexLinkContainer to='/observations'>
        <ListItem primaryText='Observations' href='/observations' />
      </IndexLinkContainer>;
    }
    if(get(Meteor, 'settings.public.modules.fhir.Procedures')){
      fhirSectionEnabled = true;
      careplans = <IndexLinkContainer to='/procedures'>
        <ListItem primaryText='Procedures' href='/procedures' />
      </IndexLinkContainer>;
    }
    if(get(Meteor, 'settings.public.modules.fhir.RiskAssessments')){
      fhirSectionEnabled = true;
      careplans = <IndexLinkContainer to='/risk-assessments'>
        <ListItem primaryText='Risk Assessments' href='/risk-assessments' />
      </IndexLinkContainer>;
    }

    if(fhirSectionEnabled){
      fhirSection = <hr />;
    }

    //----------------------------------------------------------------------
    // Dynamic Modules  

    var dynamicElements = [];
    dynamicModules.map(function(element, index){ 

      // if(!element.hideFromSidebar){
        // good; can't turn this on/off
        dynamicElements.push(<IndexLinkContainer to={element.to} key={index}>
          <ListItem primaryText={element.primaryText} href={element.href} />
        </IndexLinkContainer>);

        // this is what we're trying to get to
        if(get(Meteor, 'settings.public.modules.fhir' + element.resourceType )){
          <IndexLinkContainer to={element.to} >
            <ListItem primaryText={element.primaryText} href={element.href} />
          </IndexLinkContainer> 
        }
      // }
    });

    console.log('dynamicElements', dynamicElements);

    return(
      <div id='patientSidebar'>
        <List style={{paddingLeft: '20px', position: 'static'}}>

          <IndexLinkContainer to='/'>
            <ListItem className="indexItem" href='/' primaryText='Index' />
          </IndexLinkContainer>

          { healthlog }              
          { dynamicElements }

          { fhirSection }

          { allergies }
          { careplans }
          { conditions }
          { devices }
          { diagnosticReports }
          { goals }
          { immunizations }
          { locations }
          { medications }
          { medicationOrders }
          { medicationStatements }
          { observations }
          { organizations }
          { procedures }
          { riskAssessments }

          <hr />


          <IndexLinkContainer to='/theming'>
             <ListItem primaryText='Theming' href='/theming' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/about'>
             <ListItem primaryText='About' href='/about' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/signin'>
             <ListItem className='logoutMenuItem' primaryText='Logout' href='/signin' onClick={this.handleLogout} />
          </IndexLinkContainer>
        </List>
      </div>
    );
  }
}
PatientSidebar.propTypes = {};
PatientSidebar.defaultProps = {};
ReactMixin(PatientSidebar.prototype, ReactMeteorData);
