import React from 'react';
import { ListGroup, Alert } from 'react-bootstrap';
import { Observations } from './Observations.js';
import PropTypes from 'prop-types';

export const ObservationsList = ({ observations }) => (
  observations.length > 0 ?
    <ListGroup className="observations-list">
      {observations.map((doc) => (
        <Observation key={ doc._id } observation={ doc } />
      ))}
    </ListGroup>
  :
    <Alert bsStyle="warning">No observations yet.</Alert>
);

ObservationsList.propTypes = {
  observations: PropTypes.array,
};
