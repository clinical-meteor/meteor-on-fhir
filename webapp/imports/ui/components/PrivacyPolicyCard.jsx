import React from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';

export class PrivacyPolicyCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div>
        <CardTitle
          title="Privacy Policy"
        />
         <CardText>
            This application manages health data.  
            <br /><br />
            In the United States, this data is is regulated by the Health Insurance Portability and Accountability Act of 1996.
            <br /><br />
            This application is currently configured and intended for patient and research use.  It does not save any Protected Health Information.  In fact, if you refresh the application or logout, you will lose all your data.
            <br /><br />
            This application does allow you the ability to import and export data.  When exporting, it will save data to a plain text file.  
            <br /><br />
            If you are a Physician, Nurse, or Clinician providing healthcare services in exchange for money, you are obligated to make sure the exported data is encrypted when stored.  You have a legal obligation to turn on FileVault, at a very minimum.
            <br /><br />
            We currently do not store Protected Health Information on our servers.
            <br /><br />
            We do store user profile and account information on our application servers.  These accounts may contain demographic information, and certain information such as family relatives and your care circle.  
            <br /><br />
            In the future, we may store Protected Health Information in a Symptomatic service.  However, for the time being, any data stored in our application servers is intended to be synthetic test data or research data.
            <br /><br />
            By using this application, you grant Symptomatic the right to track usage analytics of the application via Google Analytics.              

         </CardText>
      </div>
    );
  }
}
export default PrivacyPolicyCard;