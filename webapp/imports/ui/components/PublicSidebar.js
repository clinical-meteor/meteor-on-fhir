import { List, ListItem } from 'material-ui/List';

import { IndexLinkContainer } from 'react-router-bootstrap';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';

import { get } from 'lodash';

// Pick up any dynamic routes that are specified in packages, and include them
var publicModules = [];
Object.keys(Package).forEach(function(packageName){
  if(Package[packageName].SidebarElements){
    // we try to build up a route from what's specified in the package
    Package[packageName].SidebarElements.forEach(function(element){
      publicModules.push(element);      
    });    
  }
});

//console.log('publicModules', publicModules)


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

    var index;
    // if(get(Meteor, 'settings.public.defaults.sidebar.showIndex')){
    //   index = <IndexLinkContainer to='/signup'>
    //     <ListItem primaryText='Register' href='/signup' />
    //    </IndexLinkContainer>
    // }

    //----------------------------------------------------------------------
    // Public Modules  

    var publicElements = [];
    publicModules.map(function(element, index){ 

      // the excludes array will hide routes
      if(!get(Meteor, 'settings.public.defaults.sidebar.hidden', []).includes(element.to)){
        publicElements.push(<IndexLinkContainer to={element.to} key={index}>
          <ListItem primaryText={element.primaryText} href={element.href} />
        </IndexLinkContainer>);
      }
    });

    var registrationLinks;
    if(get(Meteor, 'settings.public.home.showRegistration')){
      registrationLinks = <div>
        <IndexLinkContainer to='/signin'>
           <ListItem primaryText='Sign In' href='/signin' />
        </IndexLinkContainer>

        <IndexLinkContainer to='/signup'>
           <ListItem primaryText='Register' href='/signup' />
        </IndexLinkContainer>
      </div>
    }
    return(
      <List style={{paddingLeft: '20px', position: 'static'}}>

        { index }
        { publicElements }
        { registrationLinks }

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
