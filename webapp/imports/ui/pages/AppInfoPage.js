import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';


import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

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


export class AppInfoPage extends React.Component {
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
      <div id="aboutPage">
        <VerticalCanvas >
          <GlassCard>
            <CardTitle
              title="App Info"
            />
            <CardText>
              <TextField
                id="appUrl"
                defaultValue={this.data.url}
                errorText="Universal Resource Location"
                errorStyle={styles.errorStyle}
              /><br />
              <TextField
                id="appEnvironment"
                defaultValue={this.data.environment}
                errorText="Environment"
                errorStyle={styles.errorStyle}
              /><br />
              <TextField
                id="appUserId"
                defaultValue={this.data.userId}
                errorText="User ID"
                errorStyle={styles.errorStyle}
              /><br />
              <TextField
                id="appOnlineStatus"
                defaultValue={this.data.onlineStatus}
                errorText="Connection"
                errorStyle={styles.errorStyle}
              /><br />
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}


ReactMixin(AppInfoPage.prototype, ReactMeteorData);
