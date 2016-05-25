import React from 'react';

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

export class MyProfilePage extends React.Component {
  constructor(props) {
    super(props);
  };

  render(){
    return(
      <div id="aboutPage">
        <PageContainer>
          <GlassCard>
            <CardTitle
              title="Profile"
              subtitle="Subtitle here"
            />
            <hr />
            <Grid>
              <Col xs={6} md={4} lg={3}>
                <Image src="thumbnail.png" responsive />
              </Col>
              <Col xs={12} md={8} lg={9}>
              </Col>
            </Grid>
            <Spacer />



            <CardActions>
              <Button label="Images" />
              <Button label="Color" />
            </CardActions>
          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}
