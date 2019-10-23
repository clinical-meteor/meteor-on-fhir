import { List, ListItem } from 'material-ui/List';
import MenuItem from '/imports/ui/components/MenuItem';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';

import { Link } from "react-router-dom";

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
      smartOnFhir = <Link to='/import-chart'>
         <MenuItem primaryText='Import Chart' href='/import-chart' />
      </Link>
   }

   let bluebutton;
   if(Package["symptomatic:bluebutton"]){
      bluebutton = <Link to='/import-claims'>
         <MenuItem primaryText='Import Claims' href='/import-claims' />
      </Link>
   }

   let symptomaticPicker;
   if(Package['symptomatic:dashboard']){
      symptomaticPicker = <LinkContainer to='/symptom-picker'>
         <MenuItem primaryText='Symptom Picker' href='/symptom-picker' />
      </LinkContainer>
   }

    return(
      <div id="practitionerSidebar">
        <List style={{paddingLeft: '20px', position: 'static'}}>

          {/* <Link to='/'>
            <MenuItem id="indexPageItem" className="indexItem" href='/' primaryText='Index' />
          </Link> */}
          <Link to='/healthcard'>
             <MenuItem primaryText='HealthCard' href='/healthcard' />
          </Link>
          <Link to='/bundles'>
             <MenuItem primaryText='Bundles' href='/bundles' />
          </Link>


          <hr />


          <Link to='/service-requests'>
             <MenuItem primaryText='Workqueue' href='/service-requests' />
          </Link>
          <Link to='/careplan-designer'>
          </Link>
          <Link to='/patients'>
             <MenuItem primaryText='Patient Directory' href='/patients' />
          </Link>
          <Link to='/careplan-designer'>
             <MenuItem primaryText='Careplan Designer' href='/careplan-designer' />
          </Link>          
          <Link to='/biometrics-dashboard'>
             <MenuItem primaryText='Biometrics Dashboard' href='/biometrics-dashboard' />
          </Link>
          <Link to='/claims'>
             <MenuItem primaryText='Claims' href='/claims' />
          </Link>

          {symptomaticPicker}

          <hr />
          <Link to='/data-management'>
             <MenuItem primaryText='Data Management' href='/theming' />
          </Link>

          <Link to='/fhir-resources-index'>
             <MenuItem id="fhirResourcePageItem" primaryText='FHIR Resources' href='/fhir-resources-index' />
          </Link>
          <Link to='/checklists'>
             <MenuItem primaryText='Checklists' href='/checklists' />
          </Link>

          { smartOnFhir }

          { bluebutton }

          <hr />

          <Link to='/users'>
             <MenuItem primaryText='Users' href='/users' />
          </Link>

          <Link to='/theming'>
             <MenuItem primaryText='Theming' href='/theming' />
          </Link>

          <hr />

          <Link to='/signin'>
             <MenuItem className='logoutMenuItem' primaryText='Logout' href='/signin' onClick={this.handleLogout} />
          </Link>

        </List>

      </div>
    );
  }
}


ReactMixin(PractitionerSidebar.prototype, ReactMeteorData);
export default PractitionerSidebar;