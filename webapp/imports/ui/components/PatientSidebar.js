import { List, ListItem } from 'material-ui/List';
import MenuItem from '/imports/ui/components/MenuItem';

import { LinkContainer } from 'react-router-bootstrap';
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
      indexRoute: '/',
      isLoggedIn: false
    };

    if(Meteor.userId()){
      data.isLoggedIn = true;
    }

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
    var healthlog;
    var dynamicElements = [];

    if(this.data.isLoggedIn){
      if(!get(Meteor, 'settings.public.defaults.sidebar.hideIndex')){
        index = <LinkContainer to={ this.data.indexRoute } >
          <MenuItem id="indexPageItem" className="indexItem" href={ this.data.indexRoute } primaryText='Index' />
        </LinkContainer>;
        // index = <LinkContainer to='/'>
        //   <MenuItem className="indexItem" href='/' primaryText='Index' />
        // </LinkContainer>;
      }
      
      //----------------------------------------------------------------------
      // Core Modules 

      if(get(Meteor, 'settings.public.modules.healthlog')){
        healthlog = <LinkContainer to='/weblog'>
          <MenuItem primaryText='Healthlog' href='/weblog' />
        </LinkContainer>;
      }

      //----------------------------------------------------------------------
      // Dynamic Modules  

      dynamicModules.map(function(element, index){ 

        // the excludes array will hide routes
        if(!get(Meteor, 'settings.public.defaults.sidebar.hidden', []).includes(element.to)){
          dynamicElements.push(<LinkContainer to={element.to} key={index}>
            <MenuItem primaryText={element.primaryText} href={element.href} />
          </LinkContainer>);
        }
      });
    }

    return(
      <div id='patientSidebar'>
        <List style={{paddingLeft: '20px', position: 'static'}}>

         { index }

          {/* <LinkContainer to='/'>
            <MenuItem id="indexPageItem" className="indexItem" href='/' primaryText='Index' />
          </LinkContainer> */}

          <hr />

          { healthlog }              
          { dynamicElements }

          <hr />
          <LinkContainer to='/data-management'>
             <MenuItem primaryText='Data Management' href='/theming' />
          </LinkContainer>
          <hr />
          <LinkContainer to='/theming'>
             <MenuItem primaryText='Theming' href='/theming' />
          </LinkContainer>

          <LinkContainer to='/tutorial-board'>
             <MenuItem primaryText='Tutorial Board' href='/tutorial-board' />
          </LinkContainer>

          <LinkContainer to='/privacy'>
             <MenuItem primaryText='Privacy Policy' href='/privacy' />
          </LinkContainer>

          <LinkContainer to='/about'>
             <MenuItem primaryText='About' href='/about' />
          </LinkContainer>

          <LinkContainer to='/signin'>
             <MenuItem id='logoutMenuItem' className='logoutMenuItem' primaryText='Logout' href='/signin' onClick={this.handleLogout} />
          </LinkContainer>
        </List>
      </div>
    );
  }
}
PatientSidebar.propTypes = {};
PatientSidebar.defaultProps = {};
ReactMixin(PatientSidebar.prototype, ReactMeteorData);
export default PatientSidebar;