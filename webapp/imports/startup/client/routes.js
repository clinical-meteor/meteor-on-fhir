// import { CardText, CardTitle } from 'material-ui/Card';

// import React from 'react';
// import ReactDOM from "react-dom";
// import { browserHistory } from 'react-router';

// import {
//   BrowserRouter,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";


// import { App } from '/imports/ui/layouts/App';

// import { AppInfoPage } from '/imports/ui/pages/AppInfoPage';
// import { MainIndex } from '/imports/ui/pages/MainIndex';
// import { FhirResourcesIndex } from '/imports/ui/pages/FhirResourcesIndex';
// import { Meteor } from 'meteor/meteor';
// import { NotFound } from '/imports/ui/pages/NotFound';
// import { NotificationsPage } from '/imports/ui/pages/NotificationsPage';
// import { PrivacyPage } from '/imports/ui/pages/PrivacyPage';
// import { TermsConditionsPage } from '/imports/ui/pages/TermsConditionsPage';
// import { RecoverPassword } from '/imports/ui/pages/RecoverPassword';
// import { ResetPassword } from '/imports/ui/pages/ResetPassword';
// import { SetPassword } from '/imports/ui/pages/SetPassword';
// import { Signin } from '/imports/ui/pages/Signin';
// import { Signup } from '/imports/ui/pages/Signup';
// import { ThemePage } from '/imports/ui/pages/ThemePage';
// import { UsersPage } from '/imports/ui/pages/UsersPage';
// import { WelcomePatientPage } from '/imports/ui/pages/WelcomePatientPage';
// import { WelcomePractitionerPage } from '/imports/ui/pages/WelcomePractitionerPage';
// import { WelcomeAdminPage } from '/imports/ui/pages/WelcomeAdminPage';
// import { DicomViewerPage } from '/imports/ui/pages/DicomViewerPage';
// import { MyProfilePage } from '/imports/ui/pages/MyProfilePage';
// import { PreferencesPage } from '/imports/ui/pages/PreferencesPage';
// import { PasswordManagementPage } from '/imports/ui/pages/PasswordManagementPage';
// import { AuthorizationGrantsPage } from '/imports/ui/pages/AuthorizationGrantsPage';
// import { MetadataPage } from '/imports/ui/pages/MetadataPage';
// import { ChecklistsPage } from '/imports/ui/workflows/lists/ChecklistsPage';

// import { get } from 'lodash';

// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import {blue400, blue600} from 'material-ui/styles/colors';

// const muiTheme = getMuiTheme({
//   palette: {
//     primary1Color: blue400,
//     primary2Color: blue600,
//     pickerHeaderColor: blue600
//   }
// });


// // Pick up any dynamic routes that are specified in packages, and include them
// var dynamicRoutes = [];
// var privacyRoutes = [];
// Object.keys(Package).forEach(function(packageName){
//   if(Package[packageName].DynamicRoutes){
//     // we try to build up a route from what's specified in the package
//     Package[packageName].DynamicRoutes.forEach(function(route){
//       dynamicRoutes.push(route);      

//       if(route.privacyEnabled){
//         privacyRoutes.push(route.path)
//       }
//     });    
//   }

//   // we can even override entire pages
//   if(Package[packageName].WelcomePatientPage){
//     WelcomePatientPage = Package[packageName].WelcomePatientPage;
//   }
//   if(Package[packageName].WelcomePractitionerPage){
//     WelcomePractitionerPage = Package[packageName].WelcomePractitionerPage;
//   }
//   if(Package[packageName].WelcomeAdminPage){
//     WelcomeAdminPage = Package[packageName].WelcomeAdminPage;
//   }

//   if(Package[packageName].ContinuityOfCarePage){
//     MainIndex = Package[packageName].ContinuityOfCarePage;
//   }
//   if(Package[packageName].WelcomePatientPage){
//     WelcomePatientPage = Package[packageName].WelcomePatientPage;
//   }

// });
// // console.log('dynamicRoutes', dynamicRoutes);

// // we're storing the current route URL in a reactive variable
// // which will be used to update active controls
// // mostly used to toggle header and footer buttons
// Session.setDefault('pathname', window.location.pathname);
// browserHistory.listen(function(event) {
//   Session.set('pathname', event.pathname);

//   if(privacyRoutes.includes(event.pathname)){
//     Session.set('glassBlurEnabled', true)
//   } else {
//     Session.set('glassBlurEnabled', false)
//   }
// });


// // patient authentication function
// const requireAuth = (nextState, replace) => {
//   // do we even need to authorize?
//   if(get(Meteor, 'settings.public.defaults.requireAuthorization')){
//     // yes, this is a restricted page
//     if (!Meteor.loggingIn() && !Meteor.userId()) {
//       // we're in the compiled desktop app that somebody purchased or downloaded
//       // so no need to go to the landing page
//       // lets just take them to the signin page
//       if(Meteor.isDesktop){
//         replace({
//           pathname: '/signin',
//           state: { nextPathname: nextState.location.pathname }
//         });  
//       } else {

//         // we're in the general use case
//         // user is trying to access a route that requires authorization, but isn't signed in
//         // redirect them to the landing page
//         if(get(Meteor, 'settings.public.defaults.landingPage')){
//           replace({
//             pathname: get(Meteor, 'settings.public.defaults.landingPage'),
//             state: { nextPathname: nextState.location.pathname }
//           });    
//         } else {
//           replace({
//             pathname: '/landing-page',
//             state: { nextPathname: nextState.location.pathname }
//           });    
//         }

//       }
//     }

//   } else {
//   // apparently we don't need to authorize;
//   // so lets just continue (i.e. everybody is authorized)
//     if(get(Meteor, 'settings.public.defaults.route')){
//       // hey, a default route is specified
//       // lets go there
//       replace({
//         pathname: get(Meteor, 'settings.public.defaults.route'),
//         state: { nextPathname: nextState.location.pathname }
//       });  
//     }

//     // can't find anywhere else to go to, so lets just go to the root path 
//     // ¯\_(ツ)_/¯
//   }
// };

// // practitioner authentication function
// const requirePractitioner = (nextState, replace) => {
//   if (!Roles.userIsInRole(Meteor.userId(), 'practitioner')) {
//     replace({
//       pathname: '/need-to-be-practitioner',
//       state: { nextPathname: nextState.location.pathname }
//     });
//   }
// };
// // practitioner authentication function
// const requreSysadmin = (nextState, replace) => {
//   if (!Roles.userIsInRole(Meteor.userId(), 'sysadmin')) {
//     replace({
//       pathname: '/need-to-be-sysadmin',
//       state: { nextPathname: nextState.location.pathname }
//     });
//   }
// };

// function LegacyRoutes(){
//   return (
//     <Router history={ browserHistory }>
//       <Route name="fhirResources" path="/fhir-resources-index" component={ FhirResourcesIndex } />

//       <Route name="signin" path="/signin" component={ Signin } />
//       <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
//       <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
//       <Route name="set-password" path="/set-password/:token" component={ SetPassword } />
//       <Route name="signup" path="/signup" component={ Signup } />

//       <Route name="about" path="/about" component={ AppInfoPage } />
//       <Route name="privacy" path="/privacy" component={ PrivacyPage } />
//       <Route name="termsConditions" path="/terms-and-conditions" component={ TermsConditionsPage } />

//       <Route name="theming" path="/theming" component={ ThemePage } onEnter={ requireAuth } />
//       <Route name="myprofile" path="/myprofile" component={ MyProfilePage } onEnter={ requireAuth } />

//       <Route name="users" path="/users" component={ UsersPage } onEnter={ requireAuth } />

//       <Route name="welcomePatient" path="/welcome/patient" component={ WelcomePatientPage } onEnter={ requireAuth }/>
//       <Route name="welcomePractitioner" path="/welcome/practitioner" component={ WelcomePractitionerPage } onEnter={ requireAuth }/>
//       <Route name="welcomeAdmin" path="/welcome/sysadmin" component={ WelcomeAdminPage } onEnter={ requireAuth }/>

//       <Route name="dicomViewer" path="/dicom-viewer" component={ DicomViewerPage }  onEnter={ requireAuth }/>
//       <Route name="checklists" path="/checklists" component={ ChecklistsPage }  onEnter={ requireAuth }/>
//       <Route name="notifications" path="/notifications" component={ NotificationsPage }  onEnter={ requireAuth }/>

//       <Route name="password" path="/password" component={ PasswordManagementPage }  onEnter={ requireAuth }/>
//       <Route name="preferences" path="/preferences" component={ PreferencesPage }  onEnter={ requireAuth }/>
//       <Route name="oauthGrants" path="/oauth-grants" component={ AuthorizationGrantsPage }  onEnter={ requireAuth }/>
//       <Route name="metadataPage" path="/metadata" component={ MetadataPage } />

//       { dynamicRoutes.map(route => <Route 
//         name={route.name} 
//         key={route.name} 
//         path={route.path} 
//         component={ route.component } 
//         onEnter={ route.requireAuth ? requireAuth : null } 
//         />) }
            
//       <Route path="/" component={ MainIndex } onEnter={ requireAuth } />

//       <Route path="*" component={ NotFound } />              
//     </Router>
//   )
// }
// const NewApp = () => (
//   <MuiThemeProvider muiTheme={muiTheme}>
//     <div>
//       <Route path="/metadata" component={MetadataPage} />
//     </div>
//   </MuiThemeProvider>
// );


// Meteor.startup(() => {
//   var roles = get(Meteor.user(), 'roles');
//   if(roles && roles.includes('practitioner')){
//     Session.set('showSearchbar', true)
//   }

//   ReactDOM.render(
//     <BrowserRouter>
//       <MuiThemeProvider muiTheme={muiTheme}>
//         <App />
//       </MuiThemeProvider>
//     </BrowserRouter>,
//     document.getElementById('app')
//   );
// });
