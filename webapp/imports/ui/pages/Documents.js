import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Row, Col } from 'react-bootstrap';
import DocumentsList from '../containers/documents-list.js';
import { AddDocument } from '/imports/ui/components/AddDocument.js';

import { PageContainer } from '/imports/ui/components/PageContainer';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

export class Documents extends React.Component {
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
      <div id="documentsPage">
        <PageContainer>
          <GlassCard>
            <CardTitle
              title="Documents"
              subtitle="These can be anything you want...."
            />
            <CardText>
              <AddDocument />
              <DocumentsList />
            </CardText>
          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}


Documents.propTypes = {
  hasUser: React.PropTypes.object,
};
ReactMixin(Documents.prototype, ReactMeteorData);
