// base layout
import { CardHeader, CardText, CardTitle } from 'material-ui/Card';
import {blue400, blue600} from 'material-ui/styles/colors';
import PropTypes from 'prop-types';

import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import React, { Component } from 'react';

import ReactDOM from "react-dom";
import { browserHistory } from 'react-router';

import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";

import { Footer } from '/imports/ui/layouts/Footer';
import { GlassApp } from '/imports/ui/layouts/GlassApp';
import { GlassCard, VerticalCanvas, FullPageCanvas } from 'meteor/clinical:glass-ui';
import { Header } from '/imports/ui/layouts/Header';
import { DicomImage } from '/imports/ui/components/DicomImage';
import { SciFiOrbital } from '/imports/ui/components/SciFiOrbital';
import SidebarTray from '/imports/ui/layouts/SidebarTray';
import FlatButton from 'material-ui/FlatButton';

import { SecurityDialog } from './SecurityDialog';
import { PatientSearchDialog } from './PatientSearchDialog';

import { Session } from 'meteor/session';

import { get, has } from 'lodash';

// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Helmet} from "react-helmet";

import { AppInfoPage } from '/imports/ui/pages/AppInfoPage';
import { AuthorizationGrantsPage } from '/imports/ui/pages/AuthorizationGrantsPage';
import { ChecklistsPage } from '/imports/ui/workflows/lists/ChecklistsPage';
import { DicomViewerPage } from '/imports/ui/pages/DicomViewerPage';
import { FhirResourcesIndex } from '/imports/ui/pages/FhirResourcesIndex';
import { MainIndex } from '/imports/ui/pages/MainIndex';
import { MyProfilePage } from '/imports/ui/pages/MyProfilePage';
import { MetadataPage } from '/imports/ui/pages/MetadataPage';
import { NotFound } from '/imports/ui/pages/NotFound';
import { NotificationsPage } from '/imports/ui/pages/NotificationsPage';
import { PasswordManagementPage } from '/imports/ui/pages/PasswordManagementPage';
import { PreferencesPage } from '/imports/ui/pages/PreferencesPage';
import { PrivacyPage } from '/imports/ui/pages/PrivacyPage';
import { RecoverPassword } from '/imports/ui/pages/RecoverPassword';
import { ResetPassword } from '/imports/ui/pages/ResetPassword';
import { SetPassword } from '/imports/ui/pages/SetPassword';
import { Signin } from '/imports/ui/pages/Signin';
import { Signup } from '/imports/ui/pages/Signup';
import { TermsConditionsPage } from '/imports/ui/pages/TermsConditionsPage';
import { ThemePage } from '/imports/ui/pages/ThemePage';
import { UsersPage } from '/imports/ui/pages/UsersPage';
import { WelcomePatientPage } from '/imports/ui/pages/WelcomePatientPage';
import { WelcomePractitionerPage } from '/imports/ui/pages/WelcomePractitionerPage';
import { WelcomeAdminPage } from '/imports/ui/pages/WelcomeAdminPage';


// const muiTheme = getMuiTheme({
//   palette: {
//     primary1Color: blue400,
//     primary2Color: blue600,
//     pickerHeaderColor: blue600
//   }
// });



// Pick up any dynamic routes that are specified in packages, and include them
var dynamicRoutes = [];
var privacyRoutes = [];
Object.keys(Package).forEach(function(packageName){
  if(Package[packageName].DynamicRoutes){
    // we try to build up a route from what's specified in the package
    Package[packageName].DynamicRoutes.forEach(function(route){
      dynamicRoutes.push(route);      

      if(route.privacyEnabled){
        privacyRoutes.push(route.path)
      }
    });    
  }

  // we can even override entire pages
  if(Package[packageName].WelcomePatientPage){
    WelcomePatientPage = Package[packageName].WelcomePatientPage;
  }
  if(Package[packageName].WelcomePractitionerPage){
    WelcomePractitionerPage = Package[packageName].WelcomePractitionerPage;
  }
  if(Package[packageName].WelcomeAdminPage){
    WelcomeAdminPage = Package[packageName].WelcomeAdminPage;
  }

  if(Package[packageName].ContinuityOfCarePage){
    MainIndex = Package[packageName].ContinuityOfCarePage;
  }
  if(Package[packageName].WelcomePatientPage){
    WelcomePatientPage = Package[packageName].WelcomePatientPage;
  }

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


// here we set an iFrame for secondary websites
Session.setDefault('iFrameLocation', '');
Meteor.startup(function (){
  if(get(Meteor.user(), 'profile.consents.patientEducationReferences.status') === "active"){
    if (has(Meteor.settings, 'public.defaults.iFrameUrl')){
      Session.set('iFrameLocation', get(Meteor.settings, 'public.defaults.iFrameUrl'));
    }
    if (has(Meteor.settings, 'public.defaults.iFrameEnabled')){
      Session.set('secondPanelVisible', get(Meteor.settings, 'public.defaults.iFrameEnabled'));
    }  
  } else {
    // no consent to fetch patient materials
    // setting the iframe to nothing
    Session.set('iFrameLocation', '');
  }
});



export class App extends React.Component {
  constructor(props) {
    super(props);
  }
  // getChildContext() {
  //   return {
  //     // muiTheme: getMuiTheme(baseTheme)
  //     muiTheme: muiTheme
  //   };
  // }
  // componentWillMount() {
  //   injectTapEventPlugin();
  // }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      // this.onRouteChanged();
      // console.log('componentDidUpdate', this.props.location, prevProps.location)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      // navigated!
      // console.log('componentWillReceiveProps', this.props.location, nextProps.location)
      Session.set('pathname', nextProps.location.pathname)
    }
  }
  renderSecondaryPanel(){
    // RADIOLOGY
    if (Meteor.userId() && Session.equals('pathname', '/diagnostic-reports') && get(Meteor.settings, 'public.modules.fhir.DiagnosticReports')) {
      // the user is logged in as a normal user
      return (
        <GlassCard style={this.data.style.card} >
          <DicomImage />
        </GlassCard>
      );

      // Conditions (Zygote)
    } else if (Meteor.userId() && Session.equals('pathname', '/conditions') && get(Meteor, 'settings.public.apps.ZygoteAvatar')) {
      return (
        <GlassCard style={this.data.style.card} height='auto'>
          <CardText>
            <object id="iframe" type="text/html" data='https://www.zygotebody.com/' style={this.data.style.content}>
              <p>unable to load </p>
            </object>
          </CardText>
        </GlassCard>
      );

      // Videoconferencing / Telemedicine
    } else if (Meteor.userId() && Session.equals('pathname', '/videoconferencing')) {
      return (
        <GlassCard style={this.data.style.card} height='auto'>
          <CardText>
            Video!
          </CardText>
        </GlassCard>
      );

    // Website
    } else if (Meteor.userId() && get(Meteor.settings, 'public.defaults.iFrameEnabled') && get(Meteor.settings, 'public.defaults.iFrameUrl')) {
      return (
        <GlassCard style={this.data.style.card} height='auto'>
          <CardText>
            <object id="iframe" type="text/html" data={this.data.browserWindowLocation} style={this.data.style.content}>
              <p>unable to load </p>
            </object>
          </CardText>
        </GlassCard>
      );

    } else {
      // anything else
      return (
        <div></div>
      );

    }
  }
  getMeteorData() {
    let data = {
      style: {
        secondary: {
          position: 'absolute',
          top: ' 0px',
          width: '1024px',
          left: '0',
          transition: '1s'
        },
        card: {
          position: 'relative',
          width: '1024px'
          //minHeight: '768px',
          //height: Session.get('appHeight') - 240 + 'px'
        },
        content: {
          minHeight: '728px',
          width: '100%',
          height: Session.get('appHeight') - 280 + 'px'
        }
      },
      browserWindowLocation: 'https://www.ncbi.nlm.nih.gov',
      securityDialog: {
        open: Session.get('securityDialogOpen'),
        resourceType: Session.get('securityDialogResourceType'),
        resourceId: Session.get('securityDialogResourceId'),
        resourceJson: JSON.stringify(Session.get('securityDialogResourceJson'), null, 2)
      }
    };


    if (Session.get('iFrameLocation')) {
      data.browserWindowLocation = Session.get('iFrameLocation');
    }

    if (Session.get('secondPanelVisible')) {
      if (Session.get('appWidth') > 1200) {
        data.style.secondary.visibility = 'visible';
        data.style.secondary.left = '1280px';
        data.style.secondary.width = (Session.get('appWidth') - (1280 + 80)) + 'px';
        data.style.card.width = '100%';
      } else {
        data.style.secondary.visibility = 'hidden';
        data.style.secondary.left = '4048px';
      }
    } else {
      data.style.secondary.visibility = 'hidden';
      data.style.secondary.left = '4048px';
    }

    if(process.env.NODE_ENV === "test") console.log("App[data]", data);
    return data;
  }
  handleCloseSecurityDialog(){
    Session.set('securityDialogOpen', false);
  }
  handleTextareaUpdate(){

  }
  render(){
    var orbital;
    // if(get(Meteor, 'settings.public.defaults.nfcOrbital')){
    //   orbital = <SciFiPage />;
    // }

    // console.log('this.props.location.query', this.props.location.query)
    console.log('App.this.props', this.props);

    Session.set('window.location', this.props.location)
    Session.set('ehrLaunchContext', get(this, 'props.location.query.launch'))

    let socialmedia = {
      title: get(Meteor, 'settings.public.socialmedia.title', ''),
      type: get(Meteor, 'settings.public.socialmedia.type', ''),
      url: get(Meteor, 'settings.public.socialmedia.url', ''),
      image: get(Meteor, 'settings.public.socialmedia.image', ''),
      description: get(Meteor, 'settings.public.socialmedia.description', ''),
      site_name: get(Meteor, 'settings.public.socialmedia.site_name', ''),
  }

  let helmet;
  if(get(Meteor, 'settings.public.socialmedia')){
    helmet = <Helmet>
      <meta charSet="utf-8" />
      <title>{socialmedia.title}</title>
      <link rel="canonical" href={socialmedia.url} />

      <meta property="og:title" content={socialmedia.title} />
      <meta property="og:type" content={socialmedia.type} />
      <meta property="og:url" content={socialmedia.url} />
      <meta property="og:image" content={socialmedia.image} />
      <meta property="og:description" content={socialmedia.description} />
      <meta property="og:site_name" content={socialmedia.site_name} />
      
    </Helmet>
  }

    return (
          <GlassApp>
            { helmet }
            <SidebarTray history={this.props.history} location={this.props.location} >
              {orbital}
              <Header history={this.props.history} location={this.props.location} />
              <div id='primaryFlexPanel' className='primaryFlexPanel' >
                <Switch>
                  <Route name="fhirResources" path="/fhir-resources-index" component={ FhirResourcesIndex } />

                  <Route name="signin" path="/signin" component={ Signin } />
                  <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
                  <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
                  <Route name="set-password" path="/set-password/:token" component={ SetPassword } />
                  <Route name="signup" path="/signup" component={ Signup } />

                  <Route name="about" path="/about" component={ AppInfoPage } />
                  <Route name="privacy" path="/privacy" component={ PrivacyPage } />
                  <Route name="termsConditions" path="/terms-and-conditions" component={ TermsConditionsPage } />

                  <Route name="theming" path="/theming" component={ ThemePage } onEnter={ requireAuth } />
                  <Route name="myprofile" path="/myprofile" component={ MyProfilePage } onEnter={ requireAuth } />

                  <Route name="users" path="/users" component={ UsersPage } onEnter={ requireAuth } />

                  <Route name="welcomePatient" path="/welcome/patient" component={ WelcomePatientPage } onEnter={ requireAuth }/>
                  <Route name="welcomePractitioner" path="/welcome/practitioner" component={ WelcomePractitionerPage } onEnter={ requireAuth }/>
                  <Route name="welcomeAdmin" path="/welcome/sysadmin" component={ WelcomeAdminPage } onEnter={ requireAuth }/>

                  <Route name="dicomViewer" path="/dicom-viewer" component={ DicomViewerPage }  onEnter={ requireAuth }/>
                  <Route name="checklists" path="/checklists" component={ ChecklistsPage }  onEnter={ requireAuth }/>
                  <Route name="notifications" path="/notifications" component={ NotificationsPage }  onEnter={ requireAuth }/>

                  <Route name="password" path="/password" component={ PasswordManagementPage }  onEnter={ requireAuth }/>
                  <Route name="preferences" path="/preferences" component={ PreferencesPage }  onEnter={ requireAuth }/>
                  <Route name="oauthGrants" path="/oauth-grants" component={ AuthorizationGrantsPage }  onEnter={ requireAuth }/>
                  <Route name="metadataPage" path="/metadata" component={ MetadataPage } />


                  { dynamicRoutes.map(route => <Route 
                    name={route.name} 
                    key={route.name} 
                    path={route.path} 
                    component={ route.component } 
                    onEnter={ route.requireAuth ? requireAuth : null } 
                  />) }

                  <Route path="/" component={ MainIndex } onEnter={ requireAuth } />

                  <Route path="*" component={ NotFound } />              
                  </Switch>
                </div>
                <div id='secondaryFlexPanel' className='secondaryFlexPanel' style={this.data.style.secondary}>
                  <FullPageCanvas>
                    { this.renderSecondaryPanel() }
                  </FullPageCanvas>
                </div>
              <Footer />
            </SidebarTray>
            <SecurityDialog />
            <PatientSearchDialog />
          </GlassApp>
    );
  }
}

App.propTypes = {};
App.defaultProps = {};

ReactMixin(App.prototype, ReactMeteorData);
export default App;