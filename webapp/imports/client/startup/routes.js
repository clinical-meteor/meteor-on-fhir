import { IndexRoute, Route, Router, browserHistory } from 'react-router';

import { AboutPage } from '/imports/ui/pages/AboutPage';
import { AdminDashboard } from '/imports/ui/pages/AdminDashboard';
import { App } from '/imports/ui/layouts/App';
import { AppInfoPage } from '/imports/ui/pages/AppInfoPage';
import { AuditLogPage } from '/imports/ui/pages/AuditLogPage';
import { AuthorizePage } from '/imports/ui/workflows/oauth/AuthorizePage';
import { ChecklistsPage } from '/imports/ui/workflows/lists/ChecklistsPage';
import { ClientConfigurationPage } from '/imports/ui/workflows/oauth/ClientConfigurationPage';
import { ConditionsPage } from '/imports/ui/workflows/conditions/ConditionsPage';
import { ConversationsPage } from '/imports/ui/pages/ConversationsPage';
import { CornerstonePage } from '/imports/ui/pages/CornerstonePage';
import { DashboardPage } from '/imports/ui/pages/DashboardPage';
import { DataManagementPage } from '/imports/ui/pages/DataManagementPage';
import { DecisionTree } from '/imports/ui/components/DecisionTree';
import { DermatogramsPage } from '/imports/ui/pages/DermatogramsPage';
import { DevicesPage } from '/imports/ui/workflows/devices/DevicesPage';
import { ForumPage } from '/imports/ui/pages/ForumPage';
import { GenomePage } from '/imports/ui/workflows/genome/GenomePage';
import { GoogleMapsPage } from '/imports/ui/pages/experimental/GoogleMapsPage';
import { Healthlog } from '/imports/ui/pages/Healthlog';
import { HexGridPage } from '/imports/ui/pages/HexGridPage';
import { ImagingStudiesPage } from '/imports/ui/workflows/imaging-studies/ImagingStudiesPage';
import { InboundMessagesPage } from '/imports/ui/pages/InboundMessagesPage';
import { LocationsPage } from '/imports/ui/workflows/locations/LocationsPage';
import { MainIndex } from '/imports/ui/pages/MainIndex';
import { MathPage } from '/imports/ui/pages/experimental/MathPage';
import { MedicationsPage } from '/imports/ui/workflows/medications/MedicationsPage';
import { MetadataPage } from '/imports/ui/pages/MetadataPage';
import { Meteor } from 'meteor/meteor';
import { MyConditions } from '/imports/ui/workflows/conditions/MyConditions';
import { MyProfilePage } from '/imports/ui/pages/MyProfilePage';
import { NeedToBePractitioner } from '/imports/ui/pages/NeedToBePractitioner';
import { NeedToBeSysadmin } from '/imports/ui/pages/NeedToBeSysadmin';
import { NewTopicPage } from '/imports/ui/pages/NewTopicPage';
import { NotFound } from '/imports/ui/pages/NotFound';
import { NotificationsPage } from '/imports/ui/pages/NotificationsPage';
import { OAuthScrapYardPage } from '/imports/ui/workflows/oauth/OAuthScrapYardPage';
import { ObservationsPage } from '/imports/ui/workflows/observations/ObservationsPage';
import { OrganizationsPage } from '/imports/ui/workflows/organizations/OrganizationsPage';
import { OutboundHeaderPage } from '/imports/ui/pages/OutboundHeaderPage';
import { PatientsPage } from '/imports/ui/workflows/patients/PatientsPage';
import { PractitionerDashboard } from '/imports/ui/pages/PractitionerDashboard';
import { PractitionersPage } from '/imports/ui/workflows/practitioners/PractitionersPage';
import { PrivacyPage } from '/imports/ui/pages/PrivacyPage';
import { ProviderDirectoryPage } from '/imports/ui/pages/ProviderDirectoryPage';
import { QuestionnaireResponsesPage } from '/imports/ui/workflows/questionnaires/QuestionnaireResponsesPage';
import { QuestionnairesPage } from '/imports/ui/workflows/questionnaires/QuestionnairesPage';
import React from 'react';
import { RecoverPassword } from '/imports/ui/pages/RecoverPassword';
import { ResetPassword } from '/imports/ui/pages/ResetPassword';
import { RiskAssessmentsPage } from '/imports/ui/workflows/risk-assessments/RiskAssessmentsPage';
import { ServerConfigurationPage } from '/imports/ui/workflows/oauth/ServerConfigurationPage';
import { Signin } from '/imports/ui/pages/Signin';
import { Signup } from '/imports/ui/pages/Signup';
import { SpecificitySensitivityCard } from '/imports/ui/components/SpecificitySensitivityCard';
import { TelemedicinePage } from '/imports/ui/pages/TelemedicinePage';
import { ThemePage } from '/imports/ui/pages/ThemePage';
import { UsersPage } from '/imports/ui/pages/UsersPage';
import { WelcomePatientPage } from '/imports/ui/pages/WelcomePatientPage';
import { render } from 'react-dom';

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
    replace({
      pathname: '/signin',
      state: { nextPathname: nextState.location.pathname }
    });
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

        <Route name="sysadmin" path="/sysadmin" component={ AdminDashboard } onEnter={ requreSysadmin } />
        <Route name="practitioner" path="/practitioner" component={ PractitionerDashboard } onEnter={ requireAuth } />

        <Route name="signin" path="/signin" component={ Signin } />
        <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
        <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
        <Route name="signup" path="/signup" component={ Signup } />

        <Route name="about" path="/about" component={ AboutPage } />
        <Route name="privacy" path="/privacy" component={ PrivacyPage } />

        <Route name="dashboard" path="/dashboard" component={ DashboardPage } onEnter={ requireAuth } />
        <Route name="theming" path="/theming" component={ ThemePage } onEnter={ requireAuth } />
        <Route name="myprofile" path="/myprofile" component={ MyProfilePage } onEnter={ requireAuth } />

        <Route name="practitioners" path="/practitioners" component={ PractitionersPage } />
        <Route name="patients" path="/patients" component={ PatientsPage } onEnter={ requireAuth } />
        <Route name="users" path="/users" component={ UsersPage } onEnter={ requireAuth } />

        <Route name="support" path="/support" component={ ForumPage } />
        <Route name="forum" path="/forum" component={ ForumPage } onEnter={ requireAuth } />

        <Route name="topicById" path="/topic/:topicId" component={ ConversationsPage } onEnter={ requireAuth } />
        <Route name="newTopic" path="/new/topic" component={ NewTopicPage } onEnter={ requireAuth } />

        <Route name="weblog" path="/weblog" component={ Healthlog } />
        <Route name="weblogByUserId" path="/weblog/:userId" component={ Healthlog } />

        <Route name="welcomePatient" path="/welcome/patient" component={ WelcomePatientPage } onEnter={ requireAuth }/>

        <Route name="needToBeSysadmin" path="/need-to-be-sysadmin" component={ NeedToBeSysadmin } />
        <Route name="needToBePractitioner" path="/need-to-be-practitioner" component={ NeedToBePractitioner }  />

        <Route name="hexGrid" path="/hex" component={ HexGridPage } />
        <Route name="appInfo" path="/info" component={ AppInfoPage } />

        <Route name="appInfo" path="/info" component={ AppInfoPage } />

        <Route name="inboundHeader" path="/inbound" component={ InboundMessagesPage } onEnter={ requireAuth } />
        <Route name="outboundHeader" path="/outbound" component={ OutboundHeaderPage }  onEnter={ requireAuth }/>
        <Route name="dataManagement" path="/data-management" component={ DataManagementPage }  onEnter={ requireAuth }/>

        <Route name="observation" path="/observations" component={ ObservationsPage }  onEnter={ requireAuth }/>

        <Route name="medications" path="/medications" component={ MedicationsPage }  onEnter={ requireAuth }/>
        <Route name="checklists" path="/checklists" component={ ChecklistsPage }  onEnter={ requireAuth }/>
        <Route name="imagingStudies" path="/radiology" component={ ImagingStudiesPage }  onEnter={ requireAuth }/>
        <Route name="genome" path="/my-genome" component={ GenomePage }  onEnter={ requireAuth }/>

        <Route name="myConditions" path="/my-conditions" component={ MyConditions }  />

        <Route name="conditions" path="/conditions" component={ ConditionsPage }  onEnter={ requireAuth }/>
        <Route name="devices" path="/devices" component={ DevicesPage }  onEnter={ requireAuth }/>
        <Route name="telemedicine" path="/telemed" component={ TelemedicinePage }  onEnter={ requireAuth }/>
        <Route name="locations" path="/locations" component={ LocationsPage }  onEnter={ requireAuth }/>
        <Route name="dermatograms" path="/dermatograms" component={ DermatogramsPage }  onEnter={ requireAuth }/>
        <Route name="questionnaires" path="/questionnaires" component={ QuestionnairesPage }  onEnter={ requireAuth }/>
        <Route name="questionnaireResponses" path="/questionnaire-responses" component={ QuestionnaireResponsesPage }  onEnter={ requireAuth }/>
        <Route name="riskAssessments" path="/risk-assessments" component={ RiskAssessmentsPage }  onEnter={ requireAuth } />

        <Route name="notifications" path="/notifications" component={ NotificationsPage }  onEnter={ requireAuth }/>

        <Route name="specificitySensitivityCard" path="/sensitivity" component={ SpecificitySensitivityCard } />
        <Route name="specificitySensitivityCard" path="/specificity" component={ SpecificitySensitivityCard } />

        <Route name="auditLogPage" path="/hipaa-log" component={ AuditLogPage } />
        <Route name="metaData" path="/metadata" component={ MetadataPage } />

        <Route name="mathPage" path="/math" component={ MathPage } />
        <Route name="decisionTree" path="/decision-tree" component={ DecisionTree } />

        <Route name="organizationsPage" path="/organizations" component={ OrganizationsPage } />

        <Route name="oAuthScrapYardPage" path="/oauth-ui" component={ OAuthScrapYardPage } />
        <Route name="authorizePage" path="/oauth" component={ AuthorizePage } />

        <Route name="serverConfigurationPage" path="/oauth-server" component={ ServerConfigurationPage } />
        <Route name="clientConfigurationPage" path="/oauth-client" component={ ClientConfigurationPage } />

        <Route name="CornerstonePage" path="/cornerstone" component={ CornerstonePage } />
        <Route name="GoogleMapsPage" path="/maps" component={ GoogleMapsPage } />

        <Route name="ProviderDirectoryPage" path="/provider-directory" component={ ProviderDirectoryPage } />

        <Route path="*" component={ NotFound } />

      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
