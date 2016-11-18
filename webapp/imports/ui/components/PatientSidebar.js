import { LinkContainer } from 'react-router-bootstrap';
import { List, ListItem } from 'react-toolbox/lib/list';
import React from 'react';
import ReactMixin from 'react-mixin';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import FontAwesome from 'react-fontawesome';
import { Session } from 'meteor/session';
import { logMeOut } from './LogMeOut';

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
    console.log("handleLogout");
    logMeOut();
  }

  handleProfile() {
    browserHistory.push('/myprofile');
    // $('body')[0].click();
  }

  render () {
    return(
      <div id='patientSidebarMenu'>
        <List style={{paddingLeft: '20px', position: 'absolute'}}>

          <LinkContainer to='/myprofile'>
          <ListItem className="profileMenuItem" leftIcon='face' eventKey={ 4.1 } href='/myprofile' caption='Profile' />
          </LinkContainer>

          <LinkContainer to='/about'>
             <ListItem eventKey={ 4.3 } leftIcon='info' caption='About' href='/about' />
          </LinkContainer>

          <LinkContainer to='/login' >
            <ListItem className="logoutMenuItem" leftIcon='power_settings_new' eventKey={ 4.5 } caption='Logout' onClick={ this.handleLogout } />
          </LinkContainer>

        </List>
      </div>
    );
  }
}
PatientSidebar.propTypes = {};
PatientSidebar.defaultProps = {};
ReactMixin(PatientSidebar.prototype, ReactMeteorData);
