import React from 'react';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { GlassApp } from '../components/GlassApp';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

import { AboutAppCard } from '../components/AboutAppCard';


export class AboutPage extends React.Component {
  constructor(props) {
    super(props);
  };

  render(){
    return(
      <div id="aboutPage">
        <PageContainer>
          <GlassCard>
            <AboutAppCard />
          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}
