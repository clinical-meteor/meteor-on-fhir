import React from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';


export class AboutAppCard extends React.Component {
  constructor(props) {
    super(props);
  };

  render(){
    return (
      <div>
        <CardTitle
          avatar="https://media.licdn.com/mpr/mpr/shrink_100_100/AAEAAQAAAAAAAAKeAAAAJDJkM2RmNTMzLWI4OGUtNDZmOC1iNTliLWYwOTc1ZWM0YmIyZg.jpg"
          title="Abigail Watson"
          subtitle="Artistic License 2.0"
        />
        <CardTitle
          title="Fast Healthcare Interoperability Resources (FHIR) Demo"
        />
         <CardText>
         This reference app demonstrates using Meteor and FHIR together to create a personal health record. <br/><br/><hr/>

         <b>Open Source Projects</b><br />
         Meteor<br />
         React<br />
         Material UI<br />
         FHIR <br />
         Cornerstone <br />
         Cordova <br />

         <br /><br />
         <b>FHIR Conformance Statement</b><br />
         This app uses the following FHIR resources:  Patient, Practitioner, Medication, Observation, ClinicalImpression
         </CardText>
      </div>
    )
  }
}
