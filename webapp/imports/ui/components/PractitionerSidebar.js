import { List, ListItem } from 'material-ui/List';
import MenuItem from '/imports/ui/components/MenuItem';

import { LinkContainer } from 'react-router-bootstrap';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';

export class PractitionerSidebar extends React.Component {
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
    Meteor.logout();
  }
  render () {
   
   let smartOnFhir;
   if(Package["symptomatic:smart-on-fhir-client"]){
      smartOnFhir = <LinkContainer to='/import-chart'>
         <MenuItem primaryText='Import Chart' href='/import-chart' />
      </LinkContainer>
   }

   let bluebutton;
   if(Package["symptomatic:bluebutton"]){
      bluebutton = <LinkContainer to='/import-claims'>
         <MenuItem primaryText='Import Claims' href='/import-claims' />
      </LinkContainer>
   }
   
   return(
      <div id="practitionerSidebar">
        <List style={{paddingLeft: '20px', position: 'static'}}>

          {/* <LinkContainer to='/'>
            <MenuItem id="indexPageItem" className="indexItem" href='/' primaryText='Index' />
          </LinkContainer> */}
          <LinkContainer to='/healthcard'>
             <MenuItem primaryText='HealthCard' href='/healthcard' />
          </LinkContainer>
          <LinkContainer to='/bundles'>
             <MenuItem primaryText='Bundles' href='/bundles' />
          </LinkContainer>


          <hr />


          <LinkContainer to='/service-requests'>
             <MenuItem primaryText='Workqueue' href='/service-requests' />
          </LinkContainer>
          <LinkContainer to='/careplan-designer'>
             <MenuItem primaryText='Careplan Designer' href='/careplan-designer' />
          </LinkContainer>          
          <LinkContainer to='/biometrics-dashboard'>
             <MenuItem primaryText='Biometrics Dashboard' href='/biometrics-dashboard' />
          </LinkContainer>
          <LinkContainer to='/claims'>
             <MenuItem primaryText='Claims' href='/claims' />
          </LinkContainer>

          <hr />
          <LinkContainer to='/data-management'>
             <MenuItem primaryText='Data Management' href='/theming' />
          </LinkContainer>

          <LinkContainer to='/fhir-resources-index'>
             <MenuItem id="fhirResourcePageItem" primaryText='FHIR Resources' href='/fhir-resources-index' />
          </LinkContainer>
          <LinkContainer to='/checklists'>
             <MenuItem primaryText='Checklists' href='/checklists' />
          </LinkContainer>

          { smartOnFhir }

          { bluebutton }

          <hr />

          <LinkContainer to='/users'>
             <MenuItem primaryText='Users' href='/users' />
          </LinkContainer>

          <LinkContainer to='/theming'>
             <MenuItem primaryText='Theming' href='/theming' />
          </LinkContainer>

          <hr />

          <LinkContainer to='/signin'>
             <MenuItem className='logoutMenuItem' primaryText='Logout' href='/signin' onClick={this.handleLogout} />
          </LinkContainer>

        </List>

      </div>
    );
  }
}


ReactMixin(PractitionerSidebar.prototype, ReactMeteorData);
export default PractitionerSidebar;