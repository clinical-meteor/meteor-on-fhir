import { CardText, CardTitle } from 'material-ui/Card';
import { Col, Grid, Row } from 'react-bootstrap';
import {blue500, orange500} from 'material-ui/styles/colors';

import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { GlassCard } from '/imports/ui/components/GlassCard';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

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
      onlineStatus: '',
      environmentData: {
        paddingTop: '0px'
      }
    };
    let meteorStatus = Meteor.status();
    data.onlineStatus = meteorStatus.status;
    
    if (Session.get('appWidth') > 768) {
      data.environmentData.paddingTop = '140px';
    }
    return data;
  }
  render(){
    return(
      <div id="aboutPage">
        <VerticalCanvas >
          <GlassCard height='auto'>
            <Row>
              <Col md={4}>
                <CardText style={this.data.environmentData}>
                  <TextField
                    id="appUserId"
                    value={this.data.userId}
                    errorText="User ID"
                    errorStyle={styles.errorStyle}
                  /><br />
                  <TextField
                    id="appOnlineStatus"
                    value={this.data.onlineStatus}
                    errorText="Connection"
                    errorStyle={styles.errorStyle}
                  /><br />
                  <TextField
                    id="appEnvironment"
                    value={this.data.environment}
                    errorText="Environment"
                    errorStyle={styles.errorStyle}
                  /><br />
                  <TextField
                    id="appUrl"
                    value={this.data.url}
                    errorText="Universal Resource Location"
                    errorStyle={styles.errorStyle}
                  /><br />
                </CardText>
              </Col>
              <Col md={8}>
                <AboutAppCard />
              </Col>
            </Row>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}


ReactMixin(AppInfoPage.prototype, ReactMeteorData);
