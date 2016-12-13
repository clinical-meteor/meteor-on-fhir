import { IndexLinkContainer } from 'react-router-bootstrap';
import { List, ListItem } from 'material-ui/List';
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
           <ListItem primaryText='PatientIndex' href='/' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/support'>
           <ListItem primaryText='Support' href='/support' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/about'>
           <ListItem primaryText='About' href='/about' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/privacy'>
           <ListItem primaryText='Privacy Page' href='/privacy' />
        </IndexLinkContainer>

      </List>
    );
  }
}

ReactMixin(PublicSidebar.prototype, ReactMeteorData);
