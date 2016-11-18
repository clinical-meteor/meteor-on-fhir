import { IndexLinkContainer } from 'react-router-bootstrap';
import { List, ListItem } from 'react-toolbox/lib/list';
import React from 'react';
import ReactMixin from 'react-mixin';

import { ReactMeteorData } from 'meteor/react-meteor-data';

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

  render () {
    return(
      <List style={{paddingLeft: '20px', position: 'absolute'}}>

        <IndexLinkContainer to='/dashboard'>
           <ListItem eventKey={ 2 } caption='Dashboard' href='/dashboard' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/careplan-designer'>
           <ListItem eventKey={ 7 } caption='Careplan Designer' href='/careplan-designer' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/careplan-history'>
           <ListItem eventKey={ 7 } caption='Careplan History' href='/careplan-history' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/patients'>
           <ListItem eventKey={ 7 } caption='Patients' href='/patients' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/practitioners'>
           <ListItem eventKey={ 8 } caption='Practitioners' href='/practitioners' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/medications'>
           <ListItem eventKey={ 6 } caption='Medications' href='/medications' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/users'>
           <ListItem eventKey={ 6 } caption='Users' href='/users' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/about'>
           <ListItem eventKey={ 10 } caption='About' href='/about' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/observation-history'>
           <ListItem eventKey={ 3 } caption='Observation History' href='/observation-history' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/adherence-history'>
           <ListItem eventKey={ 3 } caption='Adherence History' href='/adherence-history' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/questionnaire-responses'>
           <ListItem eventKey={ 3 } caption='Questionnaire Responses' href='/questionnaire-responses' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/goals'>
           <ListItem eventKey={ 11 } caption='Goals' href='/goals' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/devices'>
           <ListItem eventKey={ 11 } caption='Devices' href='/devices' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/theming'>
           <ListItem eventKey={ 9 } caption='Theming' href='/theming' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/weblog'>
           <ListItem eventKey={ 3 } caption='Weblog' href='/weblog' />
        </IndexLinkContainer>

      </List>
    );
  }
}
PractitionerSidebar.propTypes = {};
PractitionerSidebar.defaultProps = {};
ReactMixin(PractitionerSidebar.prototype, ReactMeteorData);
