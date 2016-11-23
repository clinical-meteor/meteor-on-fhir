import React from 'react';
import { Alert } from 'react-bootstrap';

import { PageContainer } from '/imports/ui/components/PageContainer';
import { MobilePadding } from '/imports/ui/components/MobilePadding';

export const NotFound = () => (
  <div id="notFoundPage">
    <MobilePadding>
      <PageContainer>
          <h4 style={{textAlign: "center"}}><strong>Error [404]</strong>: { window.location.pathname } does not exist.</h4>
      </PageContainer>
    </MobilePadding>
  </div>
);
