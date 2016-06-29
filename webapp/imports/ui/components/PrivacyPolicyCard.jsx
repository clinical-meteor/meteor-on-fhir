import React from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';


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
          Privacy policy content...
         </CardText>
      </div>
    );
  }
}
