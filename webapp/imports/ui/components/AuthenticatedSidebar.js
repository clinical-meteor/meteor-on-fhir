import { IndexLinkContainer } from 'react-router-bootstrap';
import { List, ListItem } from 'react-toolbox/lib/list';
import React from 'react';
import ReactMixin from 'react-mixin';

import { ReactMeteorData } from 'meteor/react-meteor-data';

export class AuthenticatedSidebar extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        position: 'fixed',
        top: '0px',
        width: '100%',
        display: 'flex',
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

  render () {
    return(
      <List style={{paddingLeft: '20px', position: 'absolute'}}>

        <IndexLinkContainer to='/dashboard'>
           <ListItem eventKey={ 2 } caption='Dashboard' href='/dashboard' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/weblog'>
           <ListItem eventKey={ 3 } caption='Weblog' href='/weblog' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/forum'>
           <ListItem eventKey={ 3 } caption='Forum' href='/forum' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/'>
           <ListItem eventKey={ 4 } caption='PatientIndex' href='/' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/users'>
           <ListItem eventKey={ 6 } caption='Users' href='/users' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/patients'>
           <ListItem eventKey={ 7 } caption='Patients' href='/patients' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/practitioners'>
           <ListItem eventKey={ 8 } caption='Practitioners' href='/practitioners' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/theming'>
           <ListItem eventKey={ 9 } caption='Theming' href='/theming' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/about'>
           <ListItem eventKey={ 10 } caption='About' href='/about' />
        </IndexLinkContainer>

      </List>
    );
  }
}
AuthenticatedSidebar.propTypes = {};
AuthenticatedSidebar.defaultProps = {};
ReactMixin(AuthenticatedSidebar.prototype, ReactMeteorData);
