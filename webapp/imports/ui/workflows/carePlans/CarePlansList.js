import React from 'react';
import { ListGroup, Alert } from 'react-bootstrap';
import { CarePlans } from './CarePlans.js';
import PropTypes from 'prop-types';

export const CarePlansList = ({ carePlan }) => (
  carePlan.length > 0 ?
    <ListGroup className="carePlan-list">
      {carePlan.map((doc) => (
        <CarePlan key={ doc._id } careplan={ doc } />
      ))}
    </ListGroup>
  :
    <Alert bsStyle="warning">No carePlan yet.</Alert>
);

CarePlansList.propTypes = {
  carePlan: PropTypes.array,
};
