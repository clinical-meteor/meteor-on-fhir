import React from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';

export class DefaultPrivacyPolicyCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div>
        {/* <CardTitle
          title="Privacy Policy"
        /> */}
         <CardText>
          <p>Symptomatic Timeline is an application is provided by Symptomatic, LLC, an Illinois company based out of the Polsky Center for Entrepreneurship (University of Chicago), and MATTER.health, a Chicago area health incubator.</p>

          <p>This app was initially produced by volunteers and the open source community.  Subsequent development was provided by consulting fees, and the app is now funded by purchases, subscriptions, and donations.  </p>

          <p>Symptomatic Timeline is designed to not store protected health information (PHI) on our servers, which greatly reduces the risk of HIPAA breaches.  That being said, we have implemented policies, procedures, audit trails, and encryption to be HIPAA compliant, as some of our other applications require this level of regulatory oversight.  We are happy and willing to sign business associate agreements (BAA) with covered entities that require them. </p>

          <p>Generally speaking, this app does not store protected health information, although it does store some user account information, and administrative data such as HIPAA audit log and consent authorizations.  This app allows you to export and save your health data to your local device; so after using this app, you may chose to store data on your local device; in which case, protecting your health information and privacy will be your responsibility.</p>

          <p>Symptomatic Timeline does not relay or route protected health information to other servers or devices.  Some tracking information about application usage is sent to Google Analytics to help us understand usage patterns and improve the product.  This app also generates aggregate and generalized data using de-identified data.  The user may also choose to geocode their home address, which involves sending anonymized address to Google geocoding servers.</p>

          <p>Users specifically approve each time their protected health information is accessed.  This app allows users to obtain a complete record of the data that it has stored about them.</p>

          <p>This app allows users to delete all of the data that it has stored about them.</p>

          <p>In summary, this data fetches protected health information directly from FHIR compliant servers to the user’s web browser, displays it in a timeline, and then allows users to export/download the result.  The app does not directly store user PHI on our servers.</p>
         </CardText>
      </div>
    );
  }
}
export default DefaultPrivacyPolicyCard;