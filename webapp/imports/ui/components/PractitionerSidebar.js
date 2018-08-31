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
    return(
      <div id="practitionerSidebar">
        <List style={{paddingLeft: '20px', position: 'static'}}>

          <LinkContainer to='/'>
            <MenuItem id="indexPageItem" className="indexItem" href='/' primaryText='Index' />
          </LinkContainer>

          <hr />
          <LinkContainer to='/provider-directory'>
             <MenuItem primaryText='Provider Directory' href='/provider-directory' />
          </LinkContainer>

          <LinkContainer to='/careplan-designer'>
             <MenuItem primaryText='Careplan Designer' href='/careplan-designer' />
          </LinkContainer>          

          <hr />
          <LinkContainer to='/fhir-resources-index'>
             <MenuItem id="fhirResourcePageItem" primaryText='FHIR Resources' href='/fhir-resources-index' />
          </LinkContainer>
          <LinkContainer to='/data-management'>
             <MenuItem primaryText='Data Management' href='/theming' />
          </LinkContainer>
          <LinkContainer to='/users'>
             <MenuItem primaryText='Users' href='/users' />
          </LinkContainer>
          <hr />
          <LinkContainer to='/theming'>
             <MenuItem primaryText='Theming' href='/theming' />
          </LinkContainer>

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