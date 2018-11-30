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

    var index;
    if(!get(Meteor, 'settings.public.defaults.sidebar.hideIndex')){
      index = <LinkContainer to={ this.data.indexRoute } >
        <MenuItem id="indexPageItem" className="indexItem" href={ this.data.indexRoute } primaryText='Index' />
      </LinkContainer>;
    }
    
    //----------------------------------------------------------------------
    // Core Modules 

    var healthlog;

    if(get(Meteor, 'settings.public.modules.healthlog')){
      healthlog = <LinkContainer to='/vitals-tracking'>
        <MenuItem primaryText='Healthlog' href='/vitals-tracking' />
      </LinkContainer>;
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
      }
    });

    var continuityOfCareElements;
    if(Package['symptomatic:continuity-of-care']){
      continuityOfCareElements = <div>
          <hr />
          <LinkContainer to='/continuity-of-care'>
             <MenuItem id="continuityOfCareItem" primaryText='Continuity of Care' href='/continuity-of-care' />
          </LinkContainer>
          <LinkContainer to='/timeline-sidescroll'>
             <MenuItem id="timelineItem" primaryText='Timeline' href='/timeline-sidescroll' />
          </LinkContainer>
      </div>
    }

    return(
      <div id='patientSidebar'>
        <List style={{paddingLeft: '20px', position: 'static'}}>

         { index }
         { continuityOfCareElements }

          <hr />

          { healthlog }              
          { dynamicElements }


          <hr />
          <LinkContainer to='/fhir-resources-index'>
             <MenuItem id="fhirResourcePageItem" primaryText='FHIR Resources' href='/fhir-resources-index' />
          </LinkContainer>
          <LinkContainer to='/data-management'>
             <MenuItem primaryText='Data Management' href='/data-management' />
          </LinkContainer>
          <hr />
          <LinkContainer to='/welcome/patient'>
             <MenuItem primaryText='Getting Started' href='/welcome/patient' />
          </LinkContainer>
          <LinkContainer to='/import-chart'>
             <MenuItem primaryText='Import Patient Record' href='/import-chart' />
          </LinkContainer>
          <LinkContainer to='/fast-import-chart'>
             <MenuItem primaryText='Quick Import' href='/fast-import-chart' />
          </LinkContainer>
          <hr />
          <LinkContainer to='/theming'>
             <MenuItem primaryText='Theming' href='/theming' />
          </LinkContainer>

          <LinkContainer to='/about'>
             <MenuItem primaryText='About' href='/about' />
          </LinkContainer>

          <LinkContainer to='/privacy'>
             <MenuItem primaryText='Privacy' href='/privacy' />
          </LinkContainer>

          <LinkContainer to='/terms-and-conditions'>
            <MenuItem primaryText='Terms and Conditions' href='/terms-and-conditions' />
          </LinkContainer>

          <LinkContainer to='/signin'>
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