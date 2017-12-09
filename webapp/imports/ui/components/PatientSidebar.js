import { List, ListItem } from 'material-ui/List';

import { IndexLinkContainer } from 'react-router-bootstrap';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';

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
    return(
      <div id='patientSidebar'>
        <List style={{paddingLeft: '20px', position: 'static'}}>

          <IndexLinkContainer to='/'>
            <ListItem className="indexItem" href='/' primaryText='Index' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/weblog'>
             <ListItem primaryText='Healthlog' href='/weblog' />
          </IndexLinkContainer>

          {/* <IndexLinkContainer to='/provider-directory'>
             <ListItem primaryText='Provider Directory' href='/provider-directory' />
          </IndexLinkContainer> */}
          
          <hr />


          <IndexLinkContainer to='/alergies'>
             <ListItem primaryText='Allergy Intolerances' href='/weblog' />
          </IndexLinkContainer>
          <IndexLinkContainer to='/care-plans'>
             <ListItem primaryText='Care Plans' href='/weblog' />
          </IndexLinkContainer>
          <IndexLinkContainer to='/conditions'>
             <ListItem primaryText='Conditions' href='/conditions' />
          </IndexLinkContainer>
          <IndexLinkContainer to='/devices'>
             <ListItem primaryText='Devices' href='/devices' />
          </IndexLinkContainer>
          <IndexLinkContainer to='/diagnostic-reports'>
             <ListItem primaryText='Diagnostic Reports' href='/diagnostic-reports' />
          </IndexLinkContainer>
          <IndexLinkContainer to='/goals'>
             <ListItem primaryText='Goals' href='/goals' />
          </IndexLinkContainer>
          <IndexLinkContainer to='/immunizations'>
             <ListItem primaryText='Imunizations' href='/immunizations' />
          </IndexLinkContainer>
          <IndexLinkContainer to='/locations'>
             <ListItem primaryText='Locations' href='/locations' />
          </IndexLinkContainer>
          <IndexLinkContainer to='/organizations'>
             <ListItem primaryText='Organizations' href='/organizations' />
          </IndexLinkContainer>
          <IndexLinkContainer to='/medications'>
             <ListItem primaryText='Medications' href='/medications' />
          </IndexLinkContainer>
          <IndexLinkContainer to='/medication-orders'>
             <ListItem primaryText='Medication Orders' href='/medication-orders' />
          </IndexLinkContainer>
          <IndexLinkContainer to='/medication-statements'>
             <ListItem primaryText='Medication Statements' href='/medication-statements' />
          </IndexLinkContainer>
          <IndexLinkContainer to='/observations'>
             <ListItem primaryText='Observations' href='/observations' />
          </IndexLinkContainer>
          <IndexLinkContainer to='/procedures'>
             <ListItem primaryText='Procedures' href='/procedures' />
          </IndexLinkContainer>
          <IndexLinkContainer to='/risk-assessments'>
             <ListItem primaryText='Risk Assessments' href='/risk-assessments' />
          </IndexLinkContainer>


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
