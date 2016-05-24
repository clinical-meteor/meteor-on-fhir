import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Row, Col } from 'react-bootstrap';
import DocumentsList from '../containers/documents-list.js';
import { AddDocument } from '../components/add-document.js';

import { PageContainer } from '../components/PageContainer';


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
          <Row>
            <Col xs={ 12 }>
              <h4 className="page-header">Documents</h4>
              <AddDocument />
              <DocumentsList />
            </Col>
          </Row>
        </PageContainer>
      </div>
    );
  }
}


Documents.propTypes = {
  hasUser: React.PropTypes.object,
};
ReactMixin(Documents.prototype, ReactMeteorData);
