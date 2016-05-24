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
          title="Fast Healthcare Interoperability Resources (FHIR) Server"
        />
         <CardText>
         This mash-up app demonstrates using Meteor and React together to display Kentucky Derby data stored in HL7 FHIR format.  It's a utility app, and is intended as a stepping stone to other apps, such as Veterinary Social Network and Exacta Calculator. <br/><br/><hr/>
         <bold>Conformance Statement</bold><br />
         This app uses the following FHIR resources:  Group, Patient, RelatedPerson, Organization, Medication
         </CardText>
      </div>
    )
  }
}
