import { List, ListItem } from 'material-ui/List';
import MenuItem from '/imports/ui/components/MenuItem';

import { Meteor } from 'meteor/meteor';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Session } from 'meteor/session';

import { get } from 'lodash';


import { Link } from "react-router-dom";

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
    console.log("handleLogout.bind(this)", this.props);
    Meteor.logout();
    if(this.props.history){
      this.props.history.replace('/signin')
    }
  }

  handleProfile() {
    if(this.props.history){
      this.props.history.replace('/myprofile');
    }
  }
  render () {

    //----------------------------------------------------------------------
    // Index Item

    var index;
    if(get(Meteor, 'settings.public.defaults.sidebar.menuItems.Index')){
      index = <Link key='indexItem'  to={ this.data.indexRoute } >
        <MenuItem id="indexPageItem" className="indexItem" href={ this.data.indexRoute } primaryText='Index' />
      </Link>;
    }
    
    //----------------------------------------------------------------------
    // HealthLog

    var healthlog;
    if(get(Meteor, 'settings.public.defaults.sidebar.menuItems.Healthlog')){
      healthlog = <Link key='vitalsItem' to='/vitals-tracking'>
        <MenuItem primaryText='Healthlog' href='/vitals-tracking' />
      </Link>;
    }

    //----------------------------------------------------------------------
    // GettingStarted

    var gettingStarted = [];
    if(get(Meteor, 'settings.public.defaults.sidebar.menuItems.GettingStarted')){
      gettingStarted.push(<hr key='hrb' />);
      gettingStarted.push(<Link key='gettingStartedItem' to='/welcome/patient'>
        <MenuItem primaryText='Getting Started' href='/welcome/patient' />
      </Link>);
    }
 

    //----------------------------------------------------------------------
    // DataManagement

    var dataManagement = []

    if(get(Meteor, 'settings.public.defaults.sidebar.menuItems.DataManagement')){
      dataManagement.push(<hr key='hrc' />)
      if(!['iPhone'].includes(window.navigator.platform)){
        dataManagement.push(<Link key='dataItem' to='/data-management'>
          <MenuItem primaryText='Data Management' href='/data-management' />
        </Link>);
      }
      if(!['iPhone'].includes(window.navigator.platform)){
        dataManagement.push(<Link key='importData' to='/import-data'>
          <MenuItem primaryText='Import' href='/import-data' />
        </Link>);
      }
      // if(!['iPhone'].includes(window.navigator.platform)){
        dataManagement.push(<Link key='exportData' to='/export-data'>
          <MenuItem primaryText='Export' href='/export-data' />
        </Link>);
      // }
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
        fhirResources.push(<Link key='fhirItem' to='/fhir-resources-index'>
          <MenuItem id="fhirResourcePageItem" primaryText='FHIR Resources' href='/fhir-resources-index' />
      </Link>);      
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

    if(get(Meteor, 'settings.public.defaults.sidebar.menuItems.DynamicModules')){
      dynamicModules.map(function(element, index){ 

        // the excludes array will hide routes
        if(!get(Meteor, 'settings.public.defaults.sidebar.hidden', []).includes(element.to)){
          dynamicElements.push(<Link to={element.to} key={index}>
            <MenuItem primaryText={element.primaryText} href={element.href} />
          </Link>);
          dynamicElements.push(<br key={index + "-br"} />);
        }
      });
      dynamicElements.push(<hr key="dynamic-modules-hr" />);
    }

    var smartOnFhirImports = [];
    // we don't want SMART on FHIR links on iPhone (for now)
    // because they will be accessing records through HealthRecords
    if(Package['symptomatic:smart-on-fhir-client'] && !['iPhone'].includes(window.navigator.platform)){

      smartOnFhirImports.push(<hr key='hr2' />);
      smartOnFhirImports.push(<Link key='importItem' to='/import-chart'>
            <MenuItem primaryText='Import Patient Record' href='/import-chart' />
        </Link>);
      smartOnFhirImports.push(
        <Link key='fastImportItem' to='/fast-import-chart'>
            <MenuItem primaryText='Quick Import' href='/fast-import-chart' />
        </Link>)
    }

    var continuityOfCareElements;
    var supportElements;
    if(Package['symptomatic:continuity-of-care']){
      continuityOfCareElements = <div>
          {/* <Link key='healthcard' to='/healthcard'>
             <MenuItem id="healthcard" primaryText='Health Card' href='/healthcard' />
          </Link>
          <hr key='hr1' /> */}
          <Link key='continuityOfCareItem' to='/continuity-of-care'>
             <MenuItem id="continuityOfCareItem" primaryText='Continuity of Care' href='/continuity-of-care' />
          </Link>
          <Link key='timelineItem' to='/timeline-sidescroll'>
             <MenuItem id="timelineItem" primaryText='Timeline' href='/timeline-sidescroll' />
          </Link>
          <Link key='filtersItem' to='/filters'>
             <MenuItem id="filtersItem" primaryText='Filters' href='/filters' />
          </Link>
          <Link key='observationGraphs' to='/observations-graph'>
             <MenuItem id="observationGraphs" primaryText='Biomarker Trends' href='/observations-graph' />
          </Link>
      </div>
    }


    var landingPageElements;
    if(Package['symptomatic:landing-page']){
      landingPageElements = <div>
          <hr key='hr4' />
          <Link key='welcomeTourItem' to='/welcome/patient-sidescroll'>
            <MenuItem id="welcomeTourItem" primaryText='Getting Started' href='/welcome/patient-sidescroll' />
          </Link>
      </div>
    }

    supportElements = <Link key='Support' to='/support'>
        <MenuItem primaryText='Help & Support' href='/support' />
    </Link>

    return(
      <div id='patientSidebar'>
        <List id='iteratorContainer' style={{paddingLeft: '20px', position: 'static'}}>

          { index }
          { healthlog }         

          { dynamicElements }
            
          { continuityOfCareElements }
          {/* { landingPageElements } */}

          { fhirResources }
          
          { gettingStarted }

          { dataManagement }
          {/* { importDataBtn } */}
          {/* { exportData } */}
          

          { smartOnFhirImports }

          <hr key='hr3' />
          <Link key='themingItem' to='/theming'>
             <MenuItem primaryText='Theming' href='/theming' />
          </Link>

          <Link key='aboutItem' to='/about'>
             <MenuItem primaryText='About' href='/about' />
          </Link>

          { supportElements }

          <Link key='privacyItem' to='/privacy'>
             <MenuItem primaryText='Privacy' href='/privacy' />
          </Link>

          <Link key='termsItem'  to='/terms-and-conditions'>
            <MenuItem primaryText='Terms and Conditions' href='/terms-and-conditions' />
          </Link>

          <Link key='logoutMenuItem' to='/signin'>
             <MenuItem id='logoutMenuItem' className='logoutMenuItem' primaryText='Logout' onClick={this.handleLogout.bind(this) } />
          </Link>
        </List>
      </div>
    );
  }
}
PatientSidebar.propTypes = {};
PatientSidebar.defaultProps = {};
ReactMixin(PatientSidebar.prototype, ReactMeteorData);
export default PatientSidebar;