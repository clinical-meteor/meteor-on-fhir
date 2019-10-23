// import { Link } from 'react-router-bootstrap';

import { Link } from "react-router-dom";

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

        dynamicElements.push(<Link to={get(element, 'to')} key={index}>
          <MenuItem primaryText={get(element, 'primaryText')} href={get(element, 'href')} />
        </Link>);
      }           
    });

    return(
      <div id="adminSidebar">
        <List style={{paddingLeft: '20px', position: 'static', width: '100%'}}>

          <Link to='/'>
             <MenuItem primaryText='Admin Index' href='/' />
          </Link>

          <Link to='/users'>
             <MenuItem primaryText='Users' href='/users' />
          </Link>
          
          <Link to='/practitioners'>
             <MenuItem primaryText='Practitioners' href='/practitioners' />
          </Link>

          <hr />

          { dynamicElements }

          <hr />
          <Link to='/fhir-resources-index'>
             <MenuItem id="fhirResourcePageItem" primaryText='FHIR Resources' href='/fhir-resources-index' />
          </Link>
          <Link to='/data-management'>
             <MenuItem primaryText='Data Management' href='/theming' />
          </Link>
          <hr />

          <Link to='/theming'>
             <MenuItem primaryText='Theming' href='/theming' />
          </Link>

          <hr />

          <Link to='/about'>
             <MenuItem primaryText='About' href='/about' />
          </Link>

          <Link to='/metadata'>
             <MenuItem primaryText='Metadata' href='/metadata' />
          </Link>

          <Link to='/signin'>
             <MenuItem className='logoutMenuItem' primaryText='Logout' href='/signin' onClick={this.handleLogout} />
          </Link>
        </List>
      </div>
    );
  }
}
AdminSidebar.propTypes = {};
AdminSidebar.defaultProps = {};
ReactMixin(AdminSidebar.prototype, ReactMeteorData);

export default AdminSidebar;