import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { CardTitle, CardText, CardHeader } from 'material-ui/Card';
import { Link } from 'react-router';
import { Table } from 'react-bootstrap';

import LinearProgress from 'material-ui/LinearProgress';
import {orange500, blue500} from 'material-ui/styles/colors';


export class AboutAppCard extends React.Component {
  constructor(props) {
    super(props);
  }
getMeteorData() {
  let data = {
    style: {
      page:{
        minHeight: '0px'
      }
    }
  };

  return data;
}

  render(){
    var style = {
      marketingImage: {
        width: '80%',
        position: 'relative',
        left: '10%'
      },
      sectionHeader: {
        borderTop: '1px solid lightgray',
        width: '100%'
      },
      page: {
        minHeight: '1024px'
      }
    };

    return (
      <div>
        <CardTitle
          title="Acknowledgements"
        />
         <CardText>
           <p>This software is the result of a tremendous amount of work from the open source and international standards community.  In particular, we want to acknowledge the following generous sponsors and donors:</p>

           <br />

           <h4>University Support</h4>
           <ul>
             <li>University of Chicago</li>
             <li>University of California - Santa Cruz</li>
             <li>University of Pennsylvania</li>
           </ul>
           <br />

           <h4>Startup Communities</h4>
           <ul>
             <li>Polsky Center for Entrepreneurship</li>
             <li>MATTER@Chicago</li>
           </ul>
           <br />

           <h4>Standards Development Communities</h4>
           <ul>
             <li>Health Level Seven</li>
             <li>World Wide Web Consortium</li>
           </ul>
           <br />

           <h4>Open Source Tech Community</h4>
           <ul>
             <li>The Meteor Development Group</li>
             <li>Meteor Meetup New York</li>
             <li>Circle Continuous Integration</li>
             <li>GitHub Source Control</li>
             <li>The Linux Foundation</li>
             <li>Mongo, Inc</li>
           </ul>

         </CardText>
      </div>
    );
  }
}
ReactMixin(AboutAppCard.prototype, ReactMeteorData);
