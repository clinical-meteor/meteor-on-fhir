import { CardText, CardTitle } from 'material-ui/Card';

import React from 'react';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';

import { render } from 'react-dom';

import { App } from '/imports/ui/RoutingApp';
// import { App } from '/imports/ui/layouts/App';
import { TimelineSidescrollPage } from '/imports/ui/pages/TimelineSidescrollPage';

import { AboutPage } from '/imports/ui/pages/AboutPage';
import { AdminDashboard } from '/imports/ui/pages/AdminDashboard';
import { AllergyIntolerancesPage } from '/imports/ui/workflows/allergyIntolerances/AllergyIntolerancesPage';
import { AppInfoPage } from '/imports/ui/pages/AppInfoPage';
import { AuditLogPage } from '/imports/ui/pages/AuditLogPage';
import { AuthorizePage } from '/imports/ui/workflows/oauth/AuthorizePage';
import { BodySitesPage } from '/imports/ui/workflows/body-sites/BodySitesPage';
import { CarePlanDesignerPage } from '/imports/ui/workflows/carePlans/CarePlanDesignerPage';
import { CarePlansPage } from '/imports/ui/workflows/carePlans/CarePlansPage';
import { ChecklistsPage } from '/imports/ui/workflows/lists/ChecklistsPage';
// import { ClientConfigurationPage } from '/imports/ui/workflows/oauth/ClientConfigurationPage';
import { ConditionsPage } from '/imports/ui/workflows/conditions/ConditionsPage';
import { ContinuityOfCarePage } from '/imports/ui/pages/ContinuityOfCarePage';
// import { ConversationsPage } from '/imports/ui/pages/ConversationsPage';
import { CornerstonePage } from '/imports/ui/pages/CornerstonePage';
import { DashboardPage } from '/imports/ui/pages/DashboardPage';
import { DataManagementPage } from '/imports/ui/pages/DataManagementPage';
import { DecisionTree } from '/imports/ui/components/DecisionTree';
import { DermatogramsPage } from '/imports/ui/pages/DermatogramsPage';
import { DevicesPage } from '/imports/ui/workflows/devices/DevicesPage';
import { DiagnosticReportsPage } from '/imports/ui/workflows/diagnosticReports/DiagnosticReportsPage';
import DynamicRoutes from '/imports/client/startup/index';
// import { ForumPage } from '/imports/ui/pages/ForumPage';
import { GenomePage } from '/imports/ui/workflows/genome/GenomePage';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { GoalsPage } from '/imports/ui/workflows/goals/GoalsPage';
import { GoogleMapsPage } from '/imports/ui/pages/experimental/GoogleMapsPage';
import { Healthlog } from '/imports/ui/pages/Healthlog';
import { HexGridPage } from '/imports/ui/pages/HexGridPage';
import { ImagingStudiesPage } from '/imports/ui/workflows/imaging-studies/ImagingStudiesPage';
import { ImmunizationsPage } from '/imports/ui/workflows/immunizations/ImmunizationsPage';
import { InboundMessagesPage } from '/imports/ui/pages/InboundMessagesPage';
import { LocationsPage } from '/imports/ui/workflows/locations/LocationsPage';
import { MainIndex } from '/imports/ui/pages/MainIndex';
// import { MathPage } from '/imports/ui/pages/experimental/MathPage';
import { MedicationOrdersPage } from '/imports/ui/workflows/medicationOrders/MedicationOrdersPage';
import { MedicationStatementsPage } from '/imports/ui/workflows/medicationStatements/MedicationStatementsPage';
import { MedicationsPage } from '/imports/ui/workflows/medications/MedicationsPage';
import { MetadataPage } from '/imports/ui/pages/MetadataPage';
import { Meteor } from 'meteor/meteor';
import { MyConditions } from '/imports/ui/workflows/conditions/MyConditions';
import { MyProfilePage } from '/imports/ui/pages/MyProfilePage';
import { NeedToBePractitioner } from '/imports/ui/pages/NeedToBePractitioner';
import { NeedToBeSysadmin } from '/imports/ui/pages/NeedToBeSysadmin';
// // import { NewTopicPage } from '/imports/ui/pages/NewTopicPage';
import { NotFound } from '/imports/ui/pages/NotFound';
import { NotificationsPage } from '/imports/ui/pages/NotificationsPage';
// // import { OAuthScrapYardPage } from '/imports/ui/workflows/oauth/OAuthScrapYardPage';
import { ObservationsPage } from '/imports/ui/workflows/observations/ObservationsPage';
import { OrganizationsPage } from '/imports/ui/workflows/organizations/OrganizationsPage';
import { OutboundHeaderPage } from '/imports/ui/pages/OutboundHeaderPage';
import { PatientsPage } from '/imports/ui/workflows/patients/PatientsPage';
import { PractitionerDashboard } from '/imports/ui/pages/PractitionerDashboard';
import { PractitionersPage } from '/imports/ui/workflows/practitioners/PractitionersPage';
import { PrivacyPage } from '/imports/ui/pages/PrivacyPage';
import { ProceduresPage } from '/imports/ui/workflows/procedures/ProceduresPage';
import { ProviderDirectoryPage } from '/imports/ui/pages/ProviderDirectoryPage';
import { QuestionnaireResponsesPage } from '/imports/ui/workflows/questionnaires/QuestionnaireResponsesPage';
import { QuestionnairesPage } from '/imports/ui/workflows/questionnaires/QuestionnairesPage';
import { RecoverPassword } from '/imports/ui/pages/RecoverPassword';
import { ResetPassword } from '/imports/ui/pages/ResetPassword';
import { RiskAssessmentsPage } from '/imports/ui/workflows/risk-assessments/RiskAssessmentsPage';
import { SciFiPage } from '/imports/ui/pages/SciFiPage';
// // import { ServerConfigurationPage } from '/imports/ui/workflows/oauth/ServerConfigurationPage';
import { Signin } from '/imports/ui/pages/Signin';
import { Signup } from '/imports/ui/pages/Signup';
// // import { SpecificitySensitivityCard } from '/imports/ui/components/SpecificitySensitivityCard';
import { TelemedicinePage } from '/imports/ui/pages/TelemedicinePage';
import { ThemePage } from '/imports/ui/pages/ThemePage';
import { TimelinePage } from '/imports/ui/pages/TimelinePage';
import { UsersPage } from '/imports/ui/pages/UsersPage';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { WelcomePatientPage } from '/imports/ui/pages/WelcomePatientPage';



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
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    if(Meteor.isDesktop){
      replace({
        pathname: '/signin',
        state: { nextPathname: nextState.location.pathname }
      });  
    } else {
      replace({
        pathname: '/landing-page',
        state: { nextPathname: nextState.location.pathname }
      });  
    }
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


              <Route name="sysadmin" path="/sysadmin" component={ AdminDashboard } onEnter={ requreSysadmin } />


              <Route name="practitioner" path="/practitioner" component={ PractitionerDashboard } onEnter={ requireAuth } />
      
      
              <Route name="dashboard" path="/dashboard" component={ DashboardPage } onEnter={ requireAuth } />
              <Route name="theming" path="/theming" component={ ThemePage } onEnter={ requireAuth } />
              <Route name="myprofile" path="/myprofile" component={ MyProfilePage } onEnter={ requireAuth } />
      
              <Route name="practitioners" path="/practitioners" component={ PractitionersPage } />

              <Route name="patients" path="/patients" component={ PatientsPage } onEnter={ requireAuth } />
              <Route name="users" path="/users" component={ UsersPage } onEnter={ requireAuth } />
      
              {/* <Route name="support" path="/support" component={ ForumPage } />
              <Route name="forum" path="/forum" component={ ForumPage } onEnter={ requireAuth } />
      
              <Route name="topicById" path="/topic/:topicId" component={ ConversationsPage } onEnter={ requireAuth } />
              <Route name="newTopic" path="/new/topic" component={ NewTopicPage } onEnter={ requireAuth } /> */}
      
              <Route name="weblog" path="/weblog" component={ Healthlog } />
              <Route name="weblogByUserId" path="/weblog/:userId" component={ Healthlog } />
      
              <Route name="welcomePatient" path="/welcome/patient" component={ WelcomePatientPage } onEnter={ requireAuth }/>
      
              <Route name="needToBeSysadmin" path="/need-to-be-sysadmin" component={ NeedToBeSysadmin } />
              <Route name="needToBePractitioner" path="/need-to-be-practitioner" component={ NeedToBePractitioner }  />
      
              <Route name="hexGrid" path="/hexgrid" component={ HexGridPage } />
              <Route name="appInfo" path="/info" component={ AppInfoPage } />
      
              <Route name="inboundHeader" path="/inbound" component={ InboundMessagesPage } onEnter={ requireAuth } />
              <Route name="outboundHeader" path="/outbound" component={ OutboundHeaderPage }  onEnter={ requireAuth }/>
              <Route name="dataManagement" path="/data-management" component={ DataManagementPage }  onEnter={ requireAuth }/>
      
              <Route name="observation" path="/observations" component={ ObservationsPage }  onEnter={ requireAuth }/>
              {/* <Route name="bodySites" path="/body-sites" component={ BodySitesPage } onEnter={ requireAuth }/> */}
      
              <Route name="medications" path="/medications" component={ MedicationsPage }  onEnter={ requireAuth }/>
              <Route name="checklists" path="/checklists" component={ ChecklistsPage }  onEnter={ requireAuth }/>
              <Route name="imagingStudies" path="/radiology" component={ ImagingStudiesPage }  onEnter={ requireAuth }/>
              <Route name="genome" path="/my-genome" component={ GenomePage }  onEnter={ requireAuth }/>
      
              <Route name="myConditions" path="/my-conditions" component={ MyConditions }  />
      
              <Route name="conditions" path="/conditions" component={ ConditionsPage }  onEnter={ requireAuth }/>
              <Route name="devices" path="/devices" component={ DevicesPage }  onEnter={ requireAuth }/>
              <Route name="telemedicine" path="/videoconferencing" component={ TelemedicinePage }  onEnter={ requireAuth }/>
              <Route name="locations" path="/locations" component={ LocationsPage }  onEnter={ requireAuth }/>
              <Route name="dermatograms" path="/dermatograms" component={ DermatogramsPage }  onEnter={ requireAuth }/>
              <Route name="questionnaires" path="/questionnaires" component={ QuestionnairesPage }  onEnter={ requireAuth }/>
              <Route name="questionnaireResponses" path="/questionnaire-responses" component={ QuestionnaireResponsesPage }  onEnter={ requireAuth }/> */}
              <Route name="riskAssessments" path="/risk-assessments" component={ RiskAssessmentsPage }  onEnter={ requireAuth } />
      
              <Route name="notifications" path="/notifications" component={ NotificationsPage }  onEnter={ requireAuth }/>
      
              {/* <Route name="specificitySensitivityCard" path="/sensitivity" component={ SpecificitySensitivityCard } />
              <Route name="specificitySensitivityCard" path="/specificity" component={ SpecificitySensitivityCard } />
      
              <Route name="auditLogPage" path="/hipaa-log" component={ AuditLogPage } />
              <Route name="metaData" path="/metadata" component={ MetadataPage } />
      
              {/* <Route name="mathPage" path="/math" component={ MathPage } />
              <Route name="decisionTree" path="/decision-tree" component={ DecisionTree } /> */}
      
              <Route name="organizationsPage" path="/organizations" component={ OrganizationsPage } />
      
              {/* <Route name="oAuthScrapYardPage" path="/oauth-ui" component={ OAuthScrapYardPage } />
              <Route name="authorizePage" path="/oauth" component={ AuthorizePage } />      
              <Route name="serverConfigurationPage" path="/oauth-server" component={ ServerConfigurationPage } />
              <Route name="clientConfigurationPage" path="/oauth-client" component={ ClientConfigurationPage } /> */}
      
              <Route name="CornerstonePage" path="/cornerstone" component={ CornerstonePage } />
              <Route name="GoogleMapsPage" path="/maps" component={ GoogleMapsPage } />
      
              <Route name="ProviderDirectoryPage" path="/provider-directory" component={ ProviderDirectoryPage } />
      
              <Route name="SciFiPage" path="/scifi" component={ SciFiPage } />
      
      
              <Route name="procedures" path="/procedures" component={ ProceduresPage }  onEnter={ requireAuth }/>
              <Route name="allergies" path="/allergies" component={ AllergyIntolerancesPage }  onEnter={ requireAuth }/>
              <Route name="immunizations" path="/immunizations" component={ ImmunizationsPage }  onEnter={ requireAuth }/>
          
              <Route name="GoalsPage" path="/goals" component={ GoalsPage }  onEnter={ requireAuth }/>
              <Route name="CarePlansPage" path="/care-plans" component={ CarePlansPage }  onEnter={ requireAuth }/>
              <Route name="CarePlanDesignerPage" path="/careplan-designer" component={ CarePlanDesignerPage }  onEnter={ requireAuth }/>
              <Route name="DiagnosticReportsPage" path="/diagnostic-reports" component={ DiagnosticReportsPage }  onEnter={ requireAuth }/>
              <Route name="MedicationOrdersPage" path="/medication-orders" component={ MedicationOrdersPage }  onEnter={ requireAuth }/>
              <Route name="MedicationStatementsPage" path="/medication-statements" component={ MedicationStatementsPage }  onEnter={ requireAuth }/>
      
              <Route name="ContinuityOfCarePage" path="/continuity-of-care" component={ ContinuityOfCarePage }  onEnter={ requireAuth }/>


              <Route name="TimelinePage" path="/timeline" component={ TimelinePage }  onEnter={ requireAuth }/>
              
              { dynamicRoutes.map(route => <Route name={route.name} path={route.path} component={ route.component } />) }
                    
              <Route name="timeline" path="/timeline-sidescroll" component={ TimelineSidescrollPage }  />

              <Route path="*" component={ NotFound } />              
      </Route>
    </Router>,
    // document.getElementById('react-root')
    document.getElementById('react-root')
  );
});
