import { IndexLinkContainer } from 'react-router-bootstrap';
import { List, ListItem } from 'react-toolbox/lib/list';
import React from 'react';
import ReactMixin from 'react-mixin';

import { ReactMeteorData } from 'meteor/react-meteor-data';

export class AdminSidebar extends React.Component {
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
      <div id="adminSidebar">
        <List style={{paddingLeft: '20px', position: 'absolute'}}>

          <IndexLinkContainer to='/'>
             <ListItem eventKey={ 4 } caption='Admin Index' href='/' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/dashboard'>
             <ListItem eventKey={ 2 } caption='Dashboard' href='/dashboard' />
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

          <IndexLinkContainer to='/login'>
             <ListItem className='logoutMenuItem' eventKey={ 11 } caption='Logout' href='/login' onClick={this.handleLogout} />
          </IndexLinkContainer>
        </List>
      </div>
    );
  }
}
AdminSidebar.propTypes = {};
AdminSidebar.defaultProps = {};
ReactMixin(AdminSidebar.prototype, ReactMeteorData);
