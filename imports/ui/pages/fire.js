import React from 'react';
// import '../../style';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { GlassApp } from '../components/GlassApp';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

import { Session } from 'meteor/session';
import { AboutAppCard } from '../components/AboutAppCard';

Session.setDefault('backgroundImagePath', 'url(\"horses\/2015_race_11.jpg\")');
Session.setDefault('backgroundColor', "#eeeeee");
Session.setDefault('darkroomEnabled', true);
Session.setDefault('glassBlurEnabled', false);
Session.setDefault('backgroundBlurEnabled', false);



export class FireDemo extends React.Component {
  constructor(props) {
    super(props);
  };
  componentDidMount() {
    //console.log("GlassApp initialized...");
  };

  render(){
    return(
      <PageContainer>
        <GlassCard>
          <AboutAppCard />
        </GlassCard>
      </PageContainer>
  );
  }
}

FireDemo.propTypes = {};
FireDemo.defaultProps = {};
// ReactMixin(FireDemo.prototype, ReactMeteorData);
