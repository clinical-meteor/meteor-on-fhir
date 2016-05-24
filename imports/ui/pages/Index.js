import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Jumbotron } from 'react-bootstrap';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';



export class Index extends React.Component {
  constructor(props) {
    super(props);
  };
  getMeteorData() {
    let data = {
      style: {}
    }

    // this should all be handled by props
    // or a mixin!
    if (Session.get('darkroomEnabled')) {
      data.style.color = "black";
      data.style.background = "white";
    } else {
      data.style.color = "white";
      data.style.background = "black";
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = "blur(3px)";
      data.style.webkitFilter = "blur(3px)";
    }

    return data;
  }
  render() {
    return (
      <div id="indexPage">
        <PageContainer>
          <GlassCard>
            <CardTitle
              title="Base"
              subtitle="A starting point for Meteor applications."
            />
            <CardText>
              <p><a className="btn btn-success" href="https://themeteorchef.com/base" role="button">Read the Documentation</a></p>
              <p style={ { fontSize: '16px', color: '#aaa' } }>Currently at v4.1.0</p>
            </CardText>
          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}



Index.propTypes = {
  hasUser: React.PropTypes.object,
};
ReactMixin(Index.prototype, ReactMeteorData);
