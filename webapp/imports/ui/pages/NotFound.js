import { Alert } from 'react-bootstrap';
import { MobilePadding } from '/imports/ui/components/MobilePadding';
import React from 'react';
import { SciFiPage } from '/imports/ui/pages/SciFiPage';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

// import OrbitalGlyph from '/imports/ui/components/OrbitalGlyph';
// <OrbitalGlyph style={{height: "500px"}} />

export const NotFound = () => (
  <div id="notFoundPage">
    <MobilePadding>
      <VerticalCanvas>
        <SciFiPage />
          <h4 style={{textAlign: "center"}}><strong>Error [404]</strong>: { window.location.pathname } does not exist.</h4>
      </VerticalCanvas>
    </MobilePadding>
  </div>
);
