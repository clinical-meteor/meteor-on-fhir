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



// // Pick up any dynamic routes that are specified in packages, and include them
// var dynamicModules = [];
// Object.keys(Package).forEach(function(packageName){
//   if(Package[packageName].SidebarElements){
//     // we try to build up a route from what's specified in the package
//     Package[packageName].SidebarElements.forEach(function(element){
//       dynamicModules.push(element);      
//     });    
//   }
// });

export class ProfileSidebar extends React.Component {
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
  handlePreferences() {
    browserHistory.push('/preferences');
  }

  render () {

    // var index;
    // if(!get(Meteor, 'settings.public.defaults.sidebar.hideIndex')){
    //   index = <LinkContainer to={ this.data.indexRoute }>
    //     <MenuItem className="indexItem" href={ this.data.indexRoute } primaryText='Index' />
    //   </LinkContainer>;
    // }
    
    // //----------------------------------------------------------------------
    // // Core Modules 

    // var healthlog;

    // if(get(Meteor, 'settings.public.modules.healthlog')){
    //   allergies = <LinkContainer to='/weblog'>
    //     <MenuItem primaryText='Healthlog' href='/weblog' />
    //   </LinkContainer>;
    // }

    // //----------------------------------------------------------------------
    // // Dynamic Modules  

    // var dynamicElements = [];
    // dynamicModules.map(function(element, index){ 

    //   // the excludes array will hide routes
    //   if(!get(Meteor, 'settings.public.defaults.sidebar.hidden', []).includes(element.to)){
    //     dynamicElements.push(<LinkContainer to={element.to} key={index}>
    //       <MenuItem primaryText={element.primaryText} href={element.href} />
    //     </LinkContainer>);
    //   }
    // });

    //console.log('dynamicElements', dynamicElements);

    return(
      <div id='ProfileSidebar'>
        <List style={{paddingLeft: '20px', position: 'static'}}>

          <LinkContainer to='/myprofile'>
             <MenuItem primaryText='Demographics' href='/myprofile' />
          </LinkContainer>

          <LinkContainer to='/password'>
             <MenuItem primaryText='Password' href='/password' />
          </LinkContainer>

          <LinkContainer to='/preferences'>
             <MenuItem id='logoutMenuItem' primaryText='Preferences' href='/preferences' onClick={this.handlePreferences} />
          </LinkContainer>

          <LinkContainer to='/oauth-grants'>
             <MenuItem id='logoutMenuItem' primaryText='Authorization Grants' href='/oauth-grants' onClick={this.handlePreferences} />
          </LinkContainer>          
        </List>
      </div>
    );
  }
}
ProfileSidebar.propTypes = {};
ProfileSidebar.defaultProps = {};
ReactMixin(ProfileSidebar.prototype, ReactMeteorData);
export default ProfileSidebar;