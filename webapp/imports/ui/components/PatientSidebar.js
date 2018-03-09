import { List, ListItem } from 'material-ui/List';

import { IndexLinkContainer } from 'react-router-bootstrap';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';

import { get } from 'lodash';



// Pick up any dynamic routes that are specified in packages, and include them
var dynamicModules = [];
Object.keys(Package).forEach(function(packageName){
  if(Package[packageName].SidebarElements){
    // we try to build up a route from what's specified in the package
    Package[packageName].SidebarElements.forEach(function(element){
      dynamicModules.push(element);      
    });    
  }
});

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
      },
      indexRoute: '/'
    };

    // but normally we just use the default route specified in settings.json
    if(get(Meteor, 'settings.public.defaults.route')){
      data.indexRoute = get(Meteor, 'settings.public.defaults.route', '/');
    } 

    return data;
  }

  handleLogout() {
    console.log("handleLogout");
    Meteor.logout();
  }

  handleProfile() {
    browserHistory.push('/myprofile');
  }

  render () {

    var index;
    if(!get(Meteor, 'settings.public.defaults.sidebar.hideIndex')){
      index = <IndexLinkContainer to={ this.data.indexRoute }>
        <ListItem className="indexItem" href={ this.data.indexRoute } primaryText='Index' />
      </IndexLinkContainer>;
    }
    
    //----------------------------------------------------------------------
    // Core Modules 

    var healthlog;

    if(get(Meteor, 'settings.public.modules.healthlog')){
      allergies = <IndexLinkContainer to='/weblog'>
        <ListItem primaryText='Healthlog' href='/weblog' />
      </IndexLinkContainer>;
    }

    //----------------------------------------------------------------------
    // Dynamic Modules  

    var dynamicElements = [];
    dynamicModules.map(function(element, index){ 

      // the excludes array will hide routes
      if(!get(Meteor, 'settings.public.defaults.sidebar.hidden', []).includes(element.to)){
        dynamicElements.push(<IndexLinkContainer to={element.to} key={index}>
          <ListItem primaryText={element.primaryText} href={element.href} />
        </IndexLinkContainer>);
      }
    });

    console.log('dynamicElements', dynamicElements);

    return(
      <div id='patientSidebar'>
        <List style={{paddingLeft: '20px', position: 'static'}}>

         { index }

          <hr />

          { healthlog }              
          { dynamicElements }

          <hr />


          <IndexLinkContainer to='/theming'>
             <ListItem primaryText='Theming' href='/theming' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/about'>
             <ListItem primaryText='About' href='/about' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/signin'>
             <ListItem className='logoutMenuItem' primaryText='Logout' href='/signin' onClick={this.handleLogout} />
          </IndexLinkContainer>
        </List>
      </div>
    );
  }
}
PatientSidebar.propTypes = {};
PatientSidebar.defaultProps = {};
ReactMixin(PatientSidebar.prototype, ReactMeteorData);
