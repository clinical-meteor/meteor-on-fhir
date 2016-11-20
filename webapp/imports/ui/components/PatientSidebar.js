import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { List, ListItem } from 'react-toolbox/lib/list';
import React from 'react';
import ReactMixin from 'react-mixin';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import FontAwesome from 'react-fontawesome';
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
    console.log("handleLogout");
    Meteor.logout();
  }

  handleProfile() {
    browserHistory.push('/myprofile');
    // $('body')[0].click();
  }

  render () {
    return(
      <div id='patientSidebar'>
        <List style={{paddingLeft: '20px', position: 'absolute'}}>

          <IndexLinkContainer to='/myprofile'>
            <ListItem className="profileMenuItem" leftIcon='face' eventKey={ 4.1 } href='/myprofile' caption='Profile' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/medications'>
             <ListItem eventKey={ 6 } caption='Medications' href='/medications' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/observation-history'>
             <ListItem eventKey={ 3 } caption='Observation History' href='/observation-history' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/weblog'>
             <ListItem eventKey={ 3 } caption='Weblog' href='/weblog' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/theming'>
             <ListItem eventKey={ 9 } caption='Theming' href='/theming' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/about'>
             <ListItem eventKey={ 10 } caption='About' href='/about' />
          </IndexLinkContainer>

        </List>
      </div>
    );
  }
}
PatientSidebar.propTypes = {};
PatientSidebar.defaultProps = {};
ReactMixin(PatientSidebar.prototype, ReactMeteorData);
