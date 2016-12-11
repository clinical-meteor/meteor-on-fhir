import React from 'react';
import { ListGroup, Alert } from 'react-bootstrap';
import { Devices } from './Devices.js';

export const DevicesList = ({ devices }) => (
  devices.length > 0 ?
    <ListGroup className="devices-list">
      {devices.map((doc) => (
        <Device key={ doc._id } device={ doc } />
      ))}
    </ListGroup>
  :
    <Alert bsStyle="warning">No devices yet.</Alert>
);

DevicesList.propTypes = {
  devices: React.PropTypes.array
};
