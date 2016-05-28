import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData, createContainer } from 'meteor/react-meteor-data';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { GlassApp } from '../components/GlassApp';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';


import DashboardContainer from '../components/DashboardContainer';

import PhoneColumn from '../layouts/PhoneColumn';
import LandscapePanel from '../layouts/LandscapePanel';
import ThirdPanel from '../layouts/ThirdPanel';
import FourthPanel from '../layouts/FourthPanel';


import PractitionerMiniListCard from '../components/PractitionerMiniListCard';
import UserListCard from '../components/UserListCard';
import {GenericFormCard} from '../components/GenericFormCard';
import TabbedCard from '../components/TabbedCard';

import TodoListCard from '../components/TodoListCard';
import LayoutControlsCard from '../components/LayoutControlsCard';

import { AboutAppCard } from '../components/AboutAppCard';
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
  };
  componentDidMount() {
    //console.log("GlassApp initialized...");
  };
  getMeteorData() {

    let data = {
      style: {
        position: "absolute",
        width: "400px",
        marginTop: "3.2rem",
        marginBottom: "6.4rem"
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
    }

    // if (Session.get('appWidth') > 768) {
    //   data.style.left = "3.2rem"
    // } else {
    //   data.style.left = "0px";
    //   data.style.width = "100%";
    // }

    return data;
  };
  render(){
    return(
      <div id="dashboardPage" style={this.props.style}>
        <DashboardContainer>
          <PhoneColumn style={{width: '350px', position: "absolute"}}>
            <AboutAppCard  />
            <Spacer />
            <TodoListCard />
          </PhoneColumn>
          <LandscapePanel>
            <GlassCard>
              <ReactHighcharts title="Welcome back, Srinivas & Prasuna" config = {this.data.config}></ReactHighcharts>
            </GlassCard>
            <Spacer />
            <TabbedCard />
          </LandscapePanel>
          <ThirdPanel>
          </ThirdPanel>
          <FourthPanel>
            <GenericFormCard />
            <Spacer />
            <PractitionerMiniListCard />
          </FourthPanel>
        </DashboardContainer>
      </div>
    );
  }
}

DashboardPage.propTypes = {};
DashboardPage.defaultProps = {};
ReactMixin(DashboardPage.prototype, ReactMeteorData);
