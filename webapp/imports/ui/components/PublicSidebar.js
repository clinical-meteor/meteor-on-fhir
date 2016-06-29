import { IndexLinkContainer } from 'react-router-bootstrap';
import { List, ListItem } from 'react-toolbox/lib/list';
import React from 'react';
import ReactMixin from 'react-mixin';

import { ReactMeteorData } from 'meteor/react-meteor-data';

export class PublicSidebar extends React.Component {
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

  render () {
    return(
      <List style={{paddingLeft: '20px', position: 'absolute'}}>
        <IndexLinkContainer to='/'>
           <ListItem eventKey={ 4 } caption='Index' href='/' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/dashboard'>
           <ListItem eventKey={ 1 } caption='Dashboard' href='/dashboard' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/weblog'>
           <ListItem eventKey={ 2 } caption='Weblog' href='/weblog' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/support'>
           <ListItem eventKey={ 3 } caption='Support' href='/support' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/patients'>
           <ListItem eventKey={ 7 } caption='Patients' href='/patients' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/practitioners'>
           <ListItem eventKey={ 8 } caption='Practitioners' href='/practitioners' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/about'>
           <ListItem eventKey={ 10 } caption='About' href='/about' />
        </IndexLinkContainer>

      </List>
    );
  }
}
PublicSidebar.propTypes = {};
PublicSidebar.defaultProps = {};
ReactMixin(PublicSidebar.prototype, ReactMeteorData);
