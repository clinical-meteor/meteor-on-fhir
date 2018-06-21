import { CardText, CardTitle } from 'material-ui/Card';

import React from 'react';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';

import { render } from 'react-dom';

import { App } from '/imports/ui/layouts/App';

import { AboutPage } from '/imports/ui/pages/AboutPage';
import { AppInfoPage } from '/imports/ui/pages/AppInfoPage';
import { MainIndex } from '/imports/ui/pages/MainIndex';
import { Meteor } from 'meteor/meteor';
import { NotFound } from '/imports/ui/pages/NotFound';
import { NotificationsPage } from '/imports/ui/pages/NotificationsPage';
import { PrivacyPage } from '/imports/ui/pages/PrivacyPage';
import { RecoverPassword } from '/imports/ui/pages/RecoverPassword';
import { ResetPassword } from '/imports/ui/pages/ResetPassword';
import { Signin } from '/imports/ui/pages/Signin';
import { Signup } from '/imports/ui/pages/Signup';
import { ThemePage } from '/imports/ui/pages/ThemePage';
import { UsersPage } from '/imports/ui/pages/UsersPage';
import { VerticalCanvas } from 'meteor/clinical:glass-ui';
import { WelcomePatientPage } from '/imports/ui/pages/WelcomePatientPage';
import { MyProfilePage } from '/imports/ui/pages/MyProfilePage';

import { ChecklistsPage } from '/imports/ui/workflows/lists/ChecklistsPage';
import { get } from 'lodash';

// Pick up any dynamic routes that are specified in packages, and include them
var dynamicRoutes = [];
Object.keys(Package).forEach(function(packageName){
  if(Package[packageName].DynamicRoutes){
    // we try to build up a route from what's specified in the package
    Package[packageName].DynamicRoutes.forEach(function(route){
      dynamicRoutes.push(route);      
    });    
  }
});

// we're storing the current route URL in a reactive variable
// which will be used to update active controls
// mostly used to toggle header and footer buttons
Session.setDefault('pathname', '/');
browserHistory.listen(function(event) {
  Session.set('pathname', event.pathname);
});


// patient authentication function
const requireAuth = (nextState, replace) => {
  // do we even need to authorize?
  if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
    // yes, this is a restricted page
    if (!Meteor.loggingIn() && !Meteor.userId()) {
      // we're in the compiled desktop app that somebody purchased or downloaded
      // so no need to go to the landing page
      // lets just take them to the signin page
      if(Meteor.isDesktop){
        replace({
          pathname: '/signin',
          state: { nextPathname: nextState.location.pathname }
        });  
      } else {

        // we're in the general use case
        // user is trying to access a route that requires authorization, but isn't signed in
        // redirect them to the landing page
        if(get(Meteor, 'settings.public.defaults.landingPage')){
          replace({
            pathname: get(Meteor, 'settings.public.defaults.landingPage'),
            state: { nextPathname: nextState.location.pathname }
          });    
        } else {
          replace({
            pathname: '/landing-page',
            state: { nextPathname: nextState.location.pathname }
          });    
        }

      }
    }

  } else {
  // apparently we don't need to authorize;
  // so lets just continue (i.e. everybody is authorized)
    if(get(Meteor, 'settings.public.defaults.route')){
      // hey, a default route is specified
      // lets go there
      replace({
        pathname: get(Meteor, 'settings.public.defaults.route'),
        state: { nextPathname: nextState.location.pathname }
      });  
    }

    // can't find anywhere else to go to, so lets just go to the root path 
    // ¯\_(ツ)_/¯
  }
};

// practitioner authentication function
const requirePractitioner = (nextState, replace) => {
  if (!Roles.userIsInRole(Meteor.userId(), 'practitioner')) {
    replace({
      pathname: '/need-to-be-practitioner',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};
// practitioner authentication function
const requreSysadmin = (nextState, replace) => {
  if (!Roles.userIsInRole(Meteor.userId(), 'sysadmin')) {
    replace({
      pathname: '/need-to-be-sysadmin',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
      <IndexRoute name="index" component={ MainIndex } onEnter={ requireAuth } />

        <Route name="signin" path="/signin" component={ Signin } />
        <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
        <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
        <Route name="signup" path="/signup" component={ Signup } />

        <Route name="about" path="/about" component={ AboutPage } />
        <Route name="privacy" path="/privacy" component={ PrivacyPage } />
        <Route name="theming" path="/theming" component={ ThemePage } onEnter={ requireAuth } />
        <Route name="myprofile" path="/myprofile" component={ MyProfilePage } onEnter={ requireAuth } />

        <Route name="users" path="/users" component={ UsersPage } onEnter={ requireAuth } />

        <Route name="welcomePatient" path="/welcome/patient" component={ WelcomePatientPage } onEnter={ requireAuth }/>

        <Route name="appInfo" path="/info" component={ AppInfoPage } />

        <Route name="checklists" path="/checklists" component={ ChecklistsPage }  onEnter={ requireAuth }/>
        <Route name="notifications" path="/notifications" component={ NotificationsPage }  onEnter={ requireAuth }/>
        
        { dynamicRoutes.map(route => <Route name={route.name} key={route.name} path={route.path} component={ route.component } />) }
              
        <Route path="*" component={ NotFound } />              
      </Route>
    </Router>,
    document.getElementById('app')
  );
});
