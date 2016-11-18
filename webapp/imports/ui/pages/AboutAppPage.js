import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { PageContainer } from '/imports/ui/components/PageContainer';

import { CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';

const styles = {
  errorStyle: {
    color: orange500
  },
  underlineStyle: {
    borderColor: orange500
  },
  floatingLabelStyle: {
    color: orange500
  },
  floatingLabelFocusStyle: {
    color: blue500
  }
};


export default class AboutAppPage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {
      environment: process.env.NODE_ENV,
      userId: Meteor.userId(),
      url: Meteor.absoluteUrl(),
      onlineStatus: Meteor.status().status
    };

    return data;
  }
  render(){
    return(
      <div id="aboutAppPage">

        <PageContainer >
          <GlassCard>
            <CardTitle
              title="About this Application"
            />
            <CardText>              
              Copyright (c) 2016, DxRx Inc.<br />
              All rights reserved.
              </div><br/>
            </CardText>
          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}


ReactMixin(AboutAppPage.prototype, ReactMeteorData);
