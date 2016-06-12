import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { GlassApp } from '../components/GlassApp';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

import Button from 'react-toolbox/lib/button';
import { Image } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Thumbnail } from 'react-bootstrap';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';
import Input from 'react-toolbox/lib/input';

let defaultState = {
  index: 0
}
Session.setDefault('tabbedCardState', defaultState);

export class MyProfilePage extends React.Component {
  constructor(props) {
    super(props);
  };

  handleTabChange(index) {
    var state = Session.get('tabbedCardState');
    state.index = index;
    Session.set('tabbedCardState', state);
  };

  handleActive() {
    console.log('Special one activated');
  };
  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      state: defaultState,
      user: {
        given: "",
        familiy: "",
        email: "",
        avatar: "",
        zip: "",
        longitude: "",
        latitude: "",
        profileImage: "thumbnail.png",
        birthdate: ""
      }
    }

    if (Session.get('tabbedCardState')) {
      data.state = Session.get('tabbedCardState');
    }

    if (Meteor.user()) {
      data.user = {
        email: Meteor.user().emails[0].address,
        avatar: Meteor.user().profile.avatar,
        zip: "",
        longitude: "",
        latitude: "",
        profileImage: Meteor.user().profile.avatar
      }

      if (Meteor.user() && Meteor.user().profile && Meteor.user().profile.name) {
        data.user.given = Meteor.user().profile.name.given;
        data.user.family = Meteor.user().profile.name.family;
        data.user.fullName = Meteor.user().profile.name.given + " " + Meteor.user().profile.name.family;
      } else {
        data.user.given = "";
        data.user.family = "";
        data.user.fullName = "";
      }
    }

    console.log("data", data);

    return data;
  };


  render(){
    return(
      <div id="aboutPage">
        <PageContainer>
          <GlassCard>
            <hr />
            <Grid>
              <Col xs={6} md={4} lg={2}>
                <Image src={this.data.user.profileImage} responsive style={{width: "100%"}}/>
              </Col>
              <Col xs={12} md={8} lg={10}>
                <CardTitle
                  title={this.data.user.fullName}
                  subtitle={this.data.user.email}
                />
                <Tabs index={this.data.state.index} onChange={this.handleTabChange}>

                  <Tab label='Demographics' onActive={this.handleActive}>
                    <div style={{position: "relative"}}>
                      <Input type='text' label='given name' name='given' style={this.data.style} value={this.data.user.given} />
                      <Input type='text' label='family name' name='family' style={this.data.style} value={this.data.user.family} />
                      <Input type='text' label='date of birth (yyyy-mm-dd)' name='birthdate' style={this.data.style} value={this.data.user.birthdate} />
                    </div>
                  </Tab>
                  <Tab label='Medical History'>
                    <div style={{position: "relative"}}>
                    </div>

                  </Tab>
                  <Tab label='System'>
                    <div style={{position: "relative"}}>
                      <Input type='text' label='email' name='email' style={this.data.style} value={this.data.user.email} />
                      <Input type='text' label='avatar' name='avatar/patch' style={this.data.style} value={this.data.user.avatar} />
                    </div>

                  </Tab>
                  <Tab label='Environmental'>
                    <div style={{position: "relative"}}>
                      <Input type='text' label='zip code' name='zip code' style={this.data.style} value={this.data.user.zip} />
                      <Input type='text' label='latitude' name='latitude' style={this.data.style} value={this.data.user.latitude} />
                      <Input type='text' label='longitude' name='longitude' style={this.data.style} value={this.data.user.longitude} />
                    </div>

                  </Tab>
                </Tabs>
              </Col>
            </Grid>
            <Spacer />


          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}


MyProfilePage.propTypes = {};
MyProfilePage.defaultProps = {};
ReactMixin(MyProfilePage.prototype, ReactMeteorData);
