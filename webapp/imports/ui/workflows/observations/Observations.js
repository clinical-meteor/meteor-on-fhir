import React from 'react';
import { Row, Col, ListGroupItem, FormControl, Button } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { updateObservation, removeObservation } from '../../../api/observations/methods.js';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';


const handleUpdateObservation = (observationId, event) => {
  const title = event.target.value.trim();
  if (title !== '' && event.keyCode === 13) {
    updateObservation.call({
      _id: observationId,
      update: { title }
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Observation updated!', 'success');
      }
    });
  }
};

const handleRemoveObservation = (documentId, event) => {
  event.preventDefault();
  // this should be replaced with a styled solution so for now we will
  // disable the eslint `no-alert`
  // eslint-disable-next-line no-alert
  if (confirm('Are you sure? This is permanent.')) {
    removeObservation.call({
      _id: documentId
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Observation removed!', 'success');
      }
    });
  }
};

export const Observation = ({ observation }) => (
  <ListGroupItem key={ observation._id }>
    <Row>
      <Col xs={ 2 } sm={ 1 }>
        <FormControl
          type="text"
          standalone
          defaultValue={ observation.observationType }
          onKeyUp={ handleUpdateObservation.bind(this, observation._id) }
        />
      </Col>
      <Col xs={ 2 } sm={ 1 }>
        <FormControl
          type="text"
          standalone
          defaultValue={ observation.observationValue }
          onKeyUp={ handleUpdateObservation.bind(this, observation._id) }
        />
      </Col>
      <Col xs={ 2 } sm={ 1 }>
        <FormControl
          type="text"
          standalone
          defaultValue={ observation.createdAt }
          onKeyUp={ handleUpdateObservation.bind(this, observation._id) }
        />
      </Col>
      <Col xs={ 2 } sm={ 1 }>
        <FormControl
          type="text"
          standalone
          defaultValue={ observation.patientId }
          onKeyUp={ handleUpdateObservation.bind(this, observation._id) }
        />
      </Col>
      <Col xs={ 3 } sm={ 2 }>
        <Button
          bsStyle="danger"
          className="btn-block"
          onClick={ handleRemoveObservation.bind(this, observation._id) }>
          Remove
        </Button>
      </Col>
    </Row>
  </ListGroupItem>
);
