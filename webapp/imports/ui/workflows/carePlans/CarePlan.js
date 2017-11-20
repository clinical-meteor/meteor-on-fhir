import React from 'react';
import { Row, Col, ListGroupItem, FormControl, Button } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { updateCarePlan, removeCarePlan } from '../../../api/careplans/methods.js';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';


const handleUpdateCarePlan = (carePlanId, event) => {
  const title = event.target.value.trim();
  if (title !== '' && event.keyCode === 13) {
    updateCarePlan.call({
      _id: carePlanId,
      update: { title }
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('CarePlan updated!', 'success');
      }
    });
  }
};

const handleRemoveCarePlan = (documentId, event) => {
  event.preventDefault();
  // this should be replaced with a styled solution so for now we will
  // disable the eslint `no-alert`
  // eslint-disable-next-line no-alert
  if (confirm('Are you sure? This is permanent.')) {
    removeCarePlan.call({
      _id: documentId
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('CarePlan removed!', 'success');
      }
    });
  }
};

export const CarePlan = ({ carePlan }) => (
  <ListGroupItem key={ carePlan._id }>
    <Row>
      <Col xs={ 2 } sm={ 1 }>
        <FormControl
          type="text"
          standalone
          defaultValue={ carePlan.carePlanType }
          onKeyUp={ handleUpdateCarePlan.bind(this, carePlan._id) }
        />
      </Col>
      <Col xs={ 2 } sm={ 1 }>
        <FormControl
          type="text"
          standalone
          defaultValue={ carePlan.carePlanValue }
          onKeyUp={ handleUpdateCarePlan.bind(this, carePlan._id) }
        />
      </Col>
      <Col xs={ 2 } sm={ 1 }>
        <FormControl
          type="text"
          standalone
          defaultValue={ carePlan.createdAt }
          onKeyUp={ handleUpdateCarePlan.bind(this, carePlan._id) }
        />
      </Col>
      <Col xs={ 2 } sm={ 1 }>
        <FormControl
          type="text"
          standalone
          defaultValue={ carePlan.patientId }
          onKeyUp={ handleUpdateCarePlan.bind(this, carePlan._id) }
        />
      </Col>
      <Col xs={ 3 } sm={ 2 }>
        <Button
          bsStyle="danger"
          className="btn-block"
          onClick={ handleRemoveCarePlan.bind(this, carePlan._id) }>
          Remove
        </Button>
      </Col>
    </Row>
  </ListGroupItem>
);
