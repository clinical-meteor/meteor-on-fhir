import React from 'react';
import ReactMixin from 'react-mixin';

import { ReactMeteorData } from 'meteor/react-meteor-data';
import Spacer from '/imports/ui/components/Spacer';

import { AboutAppCard } from '../components/AboutAppCard';
//import {GenericFormCard} from '../components/GenericFormCard';
import { GlassCard } from '../components/GlassCard';
import DashboardContainer from '../components/DashboardContainer';
import FourthPanel from '../layouts/FourthPanel';
import LandscapePanel from '../layouts/LandscapePanel';
import PhoneColumn from '../layouts/PhoneColumn';
import TabbedCard from '../components/TabbedCard';
import ThirdPanel from '../layouts/ThirdPanel';

import { Topics } from '/imports/api/topics/topics';
import { Posts } from '/imports/api/posts/posts';
// import { Practitioners } from '/imports/api/practitioners/practitioners';
// import { Patients } from '/imports/api/patients/patients';


const ReactHighcharts = require('react-highcharts');



const config = {
  chart: {
    backgroundColor: {
      linearGradient: [0, 0, 0, 400],
      stops: [ [0, 'rgb(248, 248, 248)'],
      [1, 'rgb(255, 255, 255)'] ]
    }
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  series: [{
    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
  }]
};

export class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   //console.log("GlassApp initialized...");
  // }

  getMeteorData() {

    let data = {
      style: {
        position: 'absolute',
        width: '400px',
        marginTop: '3.2rem',
        marginBottom: '6.4rem'
      },
      state: {
        usersCount: 0,
        postsCount: 0,
        topicsCount: 0,
        patientsCount: 0,
        practitionersCount: 0
      },
      config: {
        chart: {
          backgroundColor: {
            linearGradient: [0, 0, 0, 400],
            stops: [ [0, 'rgb(248, 248, 248)'],
            [1, 'rgb(255, 255, 255)'] ]
          }
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        series: [{
          data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
        }]
      }
    };

    data.state.usersCount = Meteor.users.find().count()
    data.state.patientsCount = Patients.find().count()
    data.state.practitionersCount = Practitioners.find().count()
    data.state.postsCount = Posts.find().count()
    data.state.topicsCount = Topics.find().count()

    return data;
  }

  render(){
    return(
      <div id='dashboardPage' style={this.data.style}>
        <DashboardContainer>
          <PhoneColumn style={{width: '350px', position: 'absolute'}}>
            <AboutAppCard  />
          </PhoneColumn>
          <LandscapePanel>
            <GlassCard>
              <ReactHighcharts title='Welcome back' config = {this.data.config}></ReactHighcharts>
            </GlassCard>
          </LandscapePanel>
          <ThirdPanel>
          </ThirdPanel>
          <FourthPanel>
            <GlassCard >
              <h2 style={{marginLeft: '10px'}}>{this.data.state.usersCount}</h2>
              <h4 style={{marginLeft: '10px', color: 'gray'}}>Users</h4>
            </GlassCard>
            <Spacer />
            <GlassCard >
              <h2 style={{marginLeft: '10px'}}>{this.data.state.patientsCount}</h2>
              <h4 style={{marginLeft: '10px', color: 'gray'}}>Patients</h4>
            </GlassCard>
            <Spacer />
            <GlassCard >
              <h2 style={{marginLeft: '10px'}}>{this.data.state.practitionersCount}</h2>
              <h4 style={{marginLeft: '10px', color: 'gray'}}>Practitioners</h4>
            </GlassCard>
            <Spacer />
            <GlassCard >
              <h2 style={{marginLeft: '10px'}}>{this.data.state.postsCount}</h2>
              <h4 style={{marginLeft: '10px', color: 'gray'}}>Posts</h4>
            </GlassCard>
            <Spacer />
            <GlassCard >
              <h2 style={{marginLeft: '10px'}}>{this.data.state.topicsCount}</h2>
              <h4 style={{marginLeft: '10px', color: 'gray'}}>Topics</h4>
            </GlassCard>
          </FourthPanel>
        </DashboardContainer>
      </div>
    );
  }
}

DashboardPage.propTypes = {};
DashboardPage.defaultProps = {};
ReactMixin(DashboardPage.prototype, ReactMeteorData);
