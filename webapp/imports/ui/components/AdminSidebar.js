import { LinkContainer } from 'react-router-bootstrap';
import { List, ListItem } from 'material-ui/List';
import React from 'react';
import ReactMixin from 'react-mixin';

import { ReactMeteorData } from 'meteor/react-meteor-data';
import MenuItem from '/imports/ui/components/MenuItem';
import { get, orderBy } from 'lodash';

// Pick up any dynamic routes that are specified in packages, and include them
var dynamicAdminModules = [];
Object.keys(Package).forEach(function(packageName){
  if(Package[packageName].AdminSidebarElements){
    // we try to build up a route from what's specified in the package
    Package[packageName].AdminSidebarElements.forEach(function(element){
      dynamicAdminModules.push(element);      
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
    // console.log('dynamicAdminModules', dynamicAdminModules)

    let sortedModules = orderBy(dynamicAdminModules, ['primaryText'], ['asc'])
    // console.log('sortedModules', sortedModules)

    var dynamicElements = [];
    sortedModules.map(function(element, index){ 
      // console.log('element', element)

      // the excludes array will hide routes
      if(!get(Meteor, 'settings.public.defaults.sidebar.adminHidden', []).includes(element.to)){

        dynamicElements.push(<LinkContainer to={get(element, 'to')} key={index}>
          <MenuItem primaryText={get(element, 'primaryText')} href={get(element, 'href')} />
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
          
          <LinkContainer to='/practitioners'>
             <MenuItem primaryText='Practitioners' href='/practitioners' />
          </LinkContainer>

          <hr />

          { dynamicElements }

          <hr />
          <LinkContainer to='/fhir-resources-index'>
             <MenuItem id="fhirResourcePageItem" primaryText='FHIR Resources' href='/fhir-resources-index' />
          </LinkContainer>
          <LinkContainer to='/data-management'>
             <MenuItem primaryText='Data Management' href='/theming' />
          </LinkContainer>
          <hr />

          <LinkContainer to='/theming'>
             <MenuItem primaryText='Theming' href='/theming' />
          </LinkContainer>

          <hr />

          <LinkContainer to='/about'>
             <MenuItem primaryText='About' href='/about' />
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