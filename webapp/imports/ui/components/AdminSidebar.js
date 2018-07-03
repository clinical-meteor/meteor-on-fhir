import { LinkContainer } from 'react-router-bootstrap';
import { List, ListItem } from 'material-ui/List';
import React from 'react';
import ReactMixin from 'react-mixin';

import { ReactMeteorData } from 'meteor/react-meteor-data';
import MenuItem from '/imports/ui/components/MenuItem';
import { get } from 'lodash';

// Pick up any dynamic routes that are specified in packages, and include them
var dynamicModules = [];
Object.keys(Package).forEach(function(packageName){
  if(Package[packageName].AdminSidebarElements){
    // we try to build up a route from what's specified in the package
    Package[packageName].AdminSidebarElements.forEach(function(element){
      dynamicModules.push(element);      
    });    
  }
});

export class AdminSidebar extends React.Component {
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
  handleLogout() {
    Meteor.logout();
  }

  render () {

    //----------------------------------------------------------------------
    // Dynamic Modules  

    var dynamicElements = [];
    dynamicModules.map(function(element, index){ 

      // the excludes array will hide routes
      if(!get(Meteor, 'settings.public.defaults.sidebar.hidden', []).includes(element.to)){
        dynamicElements.push(<LinkContainer to={element.to} key={index}>
          <MenuItem primaryText={element.primaryText} href={element.href} />
        </LinkContainer>);
      }
    });

    return(
      <div id="adminSidebar">
        <List style={{paddingLeft: '20px', position: 'static', width: '100%'}}>

          <LinkContainer to='/'>
             <MenuItem primaryText='Admin Index' href='/' />
          </LinkContainer>

          <LinkContainer to='/users'>
             <MenuItem primaryText='Users' href='/users' />
          </LinkContainer>

          <hr />

          { dynamicElements }

          <hr />

          <LinkContainer to='/theming'>
             <MenuItem primaryText='Theming' href='/theming' />
          </LinkContainer>

          <hr />

          <LinkContainer to='/info'>
             <MenuItem primaryText='Info' href='/info' />
          </LinkContainer>

          <LinkContainer to='/info'>
             <MenuItem primaryText='Info' href='/info' />
          </LinkContainer>

          <LinkContainer to='/metadata'>
             <MenuItem primaryText='Metadata' href='/metadata' />
          </LinkContainer>

          <LinkContainer to='/signin'>
             <MenuItem className='logoutMenuItem' primaryText='Logout' href='/signin' onClick={this.handleLogout} />
          </LinkContainer>
        </List>
      </div>
    );
  }
}
AdminSidebar.propTypes = {};
AdminSidebar.defaultProps = {};
ReactMixin(AdminSidebar.prototype, ReactMeteorData);

export default AdminSidebar;