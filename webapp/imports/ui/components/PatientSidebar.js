import { List, ListItem } from 'material-ui/List';
import MenuItem from '/imports/ui/components/MenuItem';

import { LinkContainer } from 'react-router-bootstrap';
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
      },
      indexRoute: '/'
    };

    // but normally we just use the default route specified in settings.json
    if(get(Meteor, 'settings.public.defaults.route')){
      data.indexRoute = get(Meteor, 'settings.public.defaults.route', '/');
    } 

    return data;
  }

  handleLogout() {
    console.log("handleLogout");
    Meteor.logout();
    browserHistory.push('/signin')
  }

  handleProfile() {
    browserHistory.push('/myprofile');
  }
  render () {

    //----------------------------------------------------------------------
    // Index Item

    var index;
    if(get(Meteor, 'settings.public.defaults.sidebar.menuItems.Index')){
      index = <LinkContainer key='indexItem'  to={ this.data.indexRoute } >
        <MenuItem id="indexPageItem" className="indexItem" href={ this.data.indexRoute } primaryText='Index' />
      </LinkContainer>;
    }
    
    //----------------------------------------------------------------------
    // HealthLog

    var healthlog;
    if(get(Meteor, 'settings.public.defaults.sidebar.menuItems.Healthlog')){
      healthlog = <LinkContainer key='vitalsItem' to='/vitals-tracking'>
        <MenuItem primaryText='Healthlog' href='/vitals-tracking' />
      </LinkContainer>;
    }

    //----------------------------------------------------------------------
    // GettingStarted

    var gettingStarted;
    if(get(Meteor, 'settings.public.defaults.sidebar.menuItems.GettingStarted')){
      gettingStarted = <LinkContainer key='gettingStartedItem' to='/welcome/patient'>
        <MenuItem primaryText='Getting Started' href='/welcome/patient' />
      </LinkContainer>;
    }


    //----------------------------------------------------------------------
    // DataManagement

    var dataManagement = []

    if(get(Meteor, 'settings.public.defaults.sidebar.menuItems.DataManagement')){
      if(!['iPhone'].includes(window.navigator.platform)){
        dataManagement.push(<LinkContainer key='dataItem' to='/data-management'>
          <MenuItem primaryText='Data Management' href='/data-management' />
        </LinkContainer>);
      }
      if(!['iPhone'].includes(window.navigator.platform)){
        dataManagement.push(<LinkContainer key='importData' to='/import-data'>
          <MenuItem primaryText='Import' href='/import-data' />
        </LinkContainer>);
      }
      if(!['iPhone'].includes(window.navigator.platform)){
        dataManagement.push(<LinkContainer key='exportData' to='/export-data'>
          <MenuItem primaryText='Export' href='/export-data' />
        </LinkContainer>);
      }
    }

    // if(get(Meteor, 'settings.public.defaults.sidebar.menuItems.DataManagement')){
    // }

    // if(get(Meteor, 'settings.public.defaults.sidebar.menuItems.DataManagement')){
    // }

    //----------------------------------------------------------------------
    // FHIR Resources
    
    var fhirResources = [];
    if(get(Meteor, 'settings.public.defaults.sidebar.menuItems.FhirResources')){
      if(!['iPhone'].includes(window.navigator.platform)){
        fhirResources.push(<hr key='hra'/>);
        fhirResources.push(<LinkContainer key='fhirItem' to='/fhir-resources-index'>
          <MenuItem id="fhirResourcePageItem" primaryText='FHIR Resources' href='/fhir-resources-index' />
      </LinkContainer>);
        fhirResources.push(<hr key='hrb' />);
      
      }
    }


    //----------------------------------------------------------------------
    // Spacer  

    var spacer;
    if(!['iPhone'].includes(window.navigator.platform)){
      spacer = <hr />;
    }




    //----------------------------------------------------------------------
    // Dynamic Modules  

    var dynamicElements = [];
    dynamicModules.map(function(element, index){ 

      // the excludes array will hide routes
      if(!get(Meteor, 'settings.public.defaults.sidebar.hidden', []).includes(element.to)){
        dynamicElements.push(<LinkContainer to={element.to} key={index}>
          <MenuItem primaryText={element.primaryText} href={element.href} />
        </LinkContainer>);
        dynamicElements.push(<br />);
      }
    });

    var smartOnFhirImports = [];
    // we don't want SMART on FHIR links on iPhone (for now)
    // because they will be accessing records through HealthRecords
    if(Package['symptomatic:smart-on-fhir-client'] && !['iPhone'].includes(window.navigator.platform)){
      smartOnFhirImports.push(<LinkContainer key='importItem' to='/import-chart'>
            <MenuItem primaryText='Import Patient Record' href='/import-chart' />
        </LinkContainer>);
      smartOnFhirImports.push(
        <LinkContainer key='fastImportItem' to='/fast-import-chart'>
            <MenuItem primaryText='Quick Import' href='/fast-import-chart' />
        </LinkContainer>)
    }

    var continuityOfCareElements;
    var supportElements;
    if(Package['symptomatic:continuity-of-care']){
      continuityOfCareElements = <div>
          <hr key='hr1' />
          <LinkContainer key='continuityOfCareItem' to='/continuity-of-care'>
             <MenuItem id="continuityOfCareItem" primaryText='Continuity of Care' href='/continuity-of-care' />
          </LinkContainer>
          <LinkContainer key='timelineItem' to='/timeline-sidescroll'>
             <MenuItem id="timelineItem" primaryText='Timeline' href='/timeline-sidescroll' />
          </LinkContainer>
          <LinkContainer key='filtersItem' to='/filters'>
             <MenuItem id="filtersItem" primaryText='Filters' href='/filters' />
          </LinkContainer>
          <LinkContainer key='observationGraphs' to='/observations-graph'>
             <MenuItem id="observationGraphs" primaryText='Biomarker Trends' href='/observations-graph' />
          </LinkContainer>
          <LinkContainer key='healthcard' to='/healthcard'>
             <MenuItem id="healthcard" primaryText='Health Card' href='/healthcard' />
          </LinkContainer>
      </div>

      supportElements = <LinkContainer key='Support' to='/support'>
          <MenuItem primaryText='Help & Support' href='/support' />
      </LinkContainer>

    }



    return(
      <div id='patientSidebar'>
        <List id='iteratorContainer' style={{paddingLeft: '20px', position: 'static'}}>

          { index }
          { healthlog }         
            
          { continuityOfCareElements }

          { fhirResources }
          
          { dataManagement }
          {/* { importDataBtn } */}
          {/* { exportData } */}
          
          <hr key='hr2' />

          { gettingStarted }
          { smartOnFhirImports }

          <hr key='hr3' />
          <LinkContainer key='themingItem' to='/theming'>
             <MenuItem primaryText='Theming' href='/theming' />
          </LinkContainer>

          <LinkContainer key='aboutItem' to='/about'>
             <MenuItem primaryText='About' href='/about' />
          </LinkContainer>

          { supportElements }

          <LinkContainer key='privacyItem' to='/privacy'>
             <MenuItem primaryText='Privacy' href='/privacy' />
          </LinkContainer>

          <LinkContainer key='termsItem'  to='/terms-and-conditions'>
            <MenuItem primaryText='Terms and Conditions' href='/terms-and-conditions' />
          </LinkContainer>

          <LinkContainer key='logoutMenuItem' to='/signin'>
             <MenuItem id='logoutMenuItem' className='logoutMenuItem' primaryText='Logout' onClick={this.handleLogout} />
          </LinkContainer>
        </List>
      </div>
    );
  }
}
PatientSidebar.propTypes = {};
PatientSidebar.defaultProps = {};
ReactMixin(PatientSidebar.prototype, ReactMeteorData);
export default PatientSidebar;