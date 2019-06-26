import { CardText, CardTitle } from 'material-ui/Card';
import { Col, Grid, Row } from 'react-bootstrap';
import {blue500, orange500} from 'material-ui/styles/colors';

import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import { GlassCard, VerticalCanvas, Glass } from 'meteor/clinical:glass-ui';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';

import { get } from 'lodash';

const styles = {
  errorStyle: {
    color: blue500
  },
  underlineStyle: {
    borderColor: blue500
  },
  floatingLabelStyle: {
    color: blue500
  },
  floatingLabelFocusStyle: {
    color: blue500
  }
};



// if we find a AboutAppCard card in one of the packages
// we want to override the local version
Object.keys(Package).forEach(function(packageName){
  if(Package[packageName].AboutAppCard){
    AboutAppCard = Package[packageName].AboutAppCard;
  }
});




export class AppInfoPage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    
    let data = {
      environment: '',
      userId: '',
      url: '',
      onlineStatus: get(Meteor.status(), 'status', ''),
      version: get(Meteor, 'settings.public.version.complete', ''),
      branch: get(Meteor, 'settings.public.version.branch', ''),
      commit: get(Meteor, 'settings.public.version.commit', ''),
      environmentData: {
        paddingTop: '0px'
      }
    };    

    if(process.env.NODE_ENV){
      data.environment = process.env.NODE_ENV;
    }
    if(Meteor.userId()){
      data.userId = Meteor.userId();
    }
    if(Meteor.absoluteUrl()){
      data.url = Meteor.absoluteUrl()
    }



    if (Session.get('appWidth') > 768) {
      data.environmentData.paddingTop = '140px';
    }
    return data;
  }
  render(){
    let pageBackground = Glass.getContextImage();

    return(
      <div id="aboutPage" style={pageBackground} >
        <VerticalCanvas >
          <GlassCard id='stickyInfo' height='auto' zDepth={3} >
            <Row style={{maxWidth: '100%'}}>
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
                  <TextField
                    id="appUrl"
                    value={this.data.version}
                    errorText="Version"
                    errorStyle={styles.errorStyle}
                  /><br />
                  <TextField
                    id="appUrl"
                    value={this.data.branch}
                    errorText="Branch"
                    errorStyle={styles.errorStyle}
                  /><br />
                  <TextField
                    id="appUrl"
                    value={this.data.commit}
                    errorText="Commit"
                    errorStyle={styles.errorStyle}
                    style={{fontSize: '80%'}}
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
export default AppInfoPage;