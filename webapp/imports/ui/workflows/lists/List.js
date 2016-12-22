import React from 'react';
import { ListGroup, Alert } from 'react-bootstrap';
import { Orders } from './Orders.js';

export const OrdersList = ({ observations }) => (
  observations.length > 0 ?
    <ListGroup className="observations-list">
      {observations.map((doc) => (
        <Observation key={ doc._id } observation={ doc } />
      ))}
    </ListGroup>
  :
    <Alert bsStyle="warning">No observations yet.</Alert>
);

OrdersList.propTypes = {
  observations: React.PropTypes.array,
};
