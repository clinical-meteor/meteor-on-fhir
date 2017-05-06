import { List, ListItem } from 'material-ui/List';

import { IndexLinkContainer } from 'react-router-bootstrap';
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

          <IndexLinkContainer to='/'>
             <ListItem primaryText='Index' href='/' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/provider-directory'>
             <ListItem primaryText='Provider Directory' href='/provider-directory' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/dashboard'>
             <ListItem primaryText='Dashboard' href='/dashboard' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/patients'>
             <ListItem primaryText='Patients' href='/patients' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/practitioners'>
             <ListItem primaryText='Practitioners' href='/practitioners' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/medications'>
             <ListItem primaryText='Medications' href='/medications' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/users'>
             <ListItem primaryText='Users' href='/users' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/signin'>
             <ListItem className='logoutMenuItem' primaryText='Logout' href='/signin' onClick={this.handleLogout} />
          </IndexLinkContainer>

        </List>

      </div>
    );
  }
}


ReactMixin(PractitionerSidebar.prototype, ReactMeteorData);
