import { IndexLinkContainer } from 'react-router-bootstrap';
import { List, ListItem } from 'material-ui/List';
import React from 'react';
import ReactMixin from 'react-mixin';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { ReactMeteorData } from 'meteor/react-meteor-data';

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
    Meteor.logout();
  }

  handleProfile() {
    browserHistory.push('/myprofile');
  }

  render () {
    return(
      <div id='patientSidebar'>
        <List style={{paddingLeft: '20px', position: 'absolute'}}>

          <IndexLinkContainer to='/'>
            <ListItem className="indexItem" href='/' primaryText='Index' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/myprofile'>
            <ListItem className="profileMenuItem" href='/myprofile' primaryText='Profile' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/medications'>
             <ListItem primaryText='Medications' href='/medications' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/observation-history'>
             <ListItem primaryText='Observation History' href='/observation-history' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/weblog'>
             <ListItem primaryText='Weblog' href='/weblog' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/theming'>
             <ListItem primaryText='Theming' href='/theming' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/about'>
             <ListItem primaryText='About' href='/about' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/login'>
             <ListItem className='logoutMenuItem' primaryText='Logout' href='/login' onClick={this.handleLogout} />
          </IndexLinkContainer>
        </List>
      </div>
    );
  }
}
PatientSidebar.propTypes = {};
PatientSidebar.defaultProps = {};
ReactMixin(PatientSidebar.prototype, ReactMeteorData);
