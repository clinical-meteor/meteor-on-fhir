import React from 'react';
import ReactMixin from 'react-mixin';

import { ReactMeteorData } from 'meteor/react-meteor-data';
import Spacer from '/imports/ui/components/Spacer';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

import { Topics } from '/imports/api/topics/topics';
import { Posts } from '/imports/api/posts/posts';

import { Meteor } from 'meteor/meteor';

const ReactHighcharts = require('react-highcharts');

import { Statistics } from '/imports/api/statistics/statistics';

import { CollectionManagement } from '/imports/ui/components/CollectionManagement';
import { CardTitle, CardText } from 'material-ui/Card';


const config = {
  chart: {
    // backgroundColor: {
    //   linearGradient: [0, 0, 0, 400],
    //   stops: [ [0, 'rgb(248, 248, 248)'],
    //   [1, 'rgb(255, 255, 255)'] ]
    // }
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  series: [{
    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
    // data: Statistics.find().map(function(datum){
    //   return datum.usersCount;
    // })
  }]
};

export class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
  }

  getMeteorData() {

    let data = {
      style: {
        summaryCards: {
          display: 'inline-block'
        }
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
          title: {
            text: 'History'
          }
          // backgroundColor: {
          //   linearGradient: [0, 0, 0, 400],
          //   stops: [ [0, 'rgb(248, 248, 248)'],
          //   [1, 'rgb(255, 255, 255)'] ]
          // }
        },
        xAxis: {
          // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          categories: Statistics.find().map(function(datum){
            return moment(datum.date).format('MMM DD');
          })
        },
        // series: [{
        //   data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
        // }]
        series: [{
          name: 'Users',
          data: Statistics.find().map(function(datum){
            return datum.usersCount;
          })
        }, {
          name: 'Posts',
          data: Statistics.find().map(function(datum){
            return datum.postsCount;
          })
        }, {
          name: 'Topics',
          data: Statistics.find().map(function(datum){
            return datum.topicsCount;
          })
        }, {
          name: 'Patients',
          data: Statistics.find().map(function(datum){
            return datum.patientsCount;
          })
        }, {
          name: 'Practitioners',
          data: Statistics.find().map(function(datum){
            return datum.practitionersCount;
          })
        }]
      }
    };

    data.state.usersCount = Meteor.users.find().count();
    data.state.patientsCount = Patients.find().count();
    data.state.practitionersCount = Practitioners.find().count();
    data.state.postsCount = Posts.find().count();
    data.state.topicsCount = Topics.find().count();

    if (Session.get('appWidth') < 1024) {
      data.style.summaryCards.display = 'none';
    }

    return data;
  }

  render(){
    return(
      <div id='dashboardPage'>
        <VerticalCanvas>
            <Spacer />
            <div style={this.data.style.summaryCards }>
              <GlassCard style={{width: '164px', marginRight: '40px', display: 'inline-block'}}>
                <h2 style={{marginLeft: '10px'}}>{this.data.state.usersCount}</h2>
                <h4 style={{marginLeft: '10px', color: 'gray'}}>Users</h4>
              </GlassCard>
              <GlassCard style={{width: '164px', marginRight: '40px', display: 'inline-block'}}>
                <h2 style={{marginLeft: '10px'}}>{this.data.state.postsCount}</h2>
                <h4 style={{marginLeft: '10px', color: 'gray'}}>Posts</h4>
              </GlassCard>
              <GlassCard style={{width: '164px', marginRight: '40px', display: 'inline-block'}}>
                <h2 style={{marginLeft: '10px'}}>{this.data.state.topicsCount}</h2>
                <h4 style={{marginLeft: '10px', color: 'gray'}}>Topics</h4>
              </GlassCard>
              <GlassCard style={{width: '164px', marginRight: '40px', display: 'inline-block'}}>
                <h2 style={{marginLeft: '10px'}}>{this.data.state.patientsCount}</h2>
                <h4 style={{marginLeft: '10px', color: 'gray'}}>Patients</h4>
              </GlassCard>
              <GlassCard style={{width: '164px', display: 'inline-block'}}>
                <h2 style={{marginLeft: '10px'}}>{this.data.state.practitionersCount}</h2>
                <h4 style={{marginLeft: '10px', color: 'gray'}}>Practitioners</h4>
              </GlassCard>
              <Spacer />
            </div>

            <GlassCard>
              <ReactHighcharts title='Welcome back' config = {this.data.config}></ReactHighcharts>
            </GlassCard>

            <Spacer />

            <GlassCard>
              <CardText>
                <CollectionManagement />
              </CardText>
            </GlassCard>

        </VerticalCanvas>
      </div>
    );
  }
}

ReactMixin(DashboardPage.prototype, ReactMeteorData);
