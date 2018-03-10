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
          title="About"
        />
         <CardText>

         </CardText>
      </div>
    );
  }
}
ReactMixin(AboutAppCard.prototype, ReactMeteorData);
