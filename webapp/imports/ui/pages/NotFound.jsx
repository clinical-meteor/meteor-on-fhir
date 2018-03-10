import { Alert } from 'react-bootstrap';
import React from 'react';
import { SciFiOrbital } from '/imports/ui/components/SciFiOrbital';
import { VerticalCanvas } from 'meteor/clinical:glass-ui';

export const NotFound = () => (
  <div id="notFoundPage">
    <VerticalCanvas>
        {/* <SciFiOrbital /> */}
        <h4 style={{textAlign: "center"}}><strong>Error [404]</strong>: { window.location.pathname } does not exist.</h4>
    </VerticalCanvas>
  </div>
);
