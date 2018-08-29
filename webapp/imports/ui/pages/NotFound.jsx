import { Alert, Grid } from 'react-bootstrap';
import React from 'react';
import { VerticalCanvas } from 'meteor/clinical:glass-ui';

import { get } from 'lodash';
import { Meteor } from 'meteor/meteor';


export const NotFound = () => (
  <div id="notFoundPage">
    <VerticalCanvas>
        <h4 style={{textAlign: "center"}}><strong>Error [404]</strong>: { window.location.pathname } does not exist.</h4>
        <br />

        <Grid>
          <Alert bsStyle="warning">
            <strong>General Troubleshooting</strong> <br />
            Sometimes you simply request a URL that doesn't exist.
            <br /> <br />
            <ul>
              <li>
                1.  Check the spelling of the URL.
              </li>
            </ul>
            <br /><br />

            <strong>Developer Troubleshooting</strong> <br />
            Othertimes, the URL should be there, but something isn't working correctly.  
            <br /> <br />
            <ul>
              <li>
                1.  Make sure that a <strong>DynamicRoute</strong> is exported from the <strong>index.jsx</strong> file of your custom package.
              </li>
              <li>
                2.  Make sure that your <strong>index.js</strong> is added as the main ES6 module of your package.
              </li>
              <li>
                3.  Make sure that you've added your package to the application.
              </li>
            </ul>
          </Alert>
        </Grid>

    </VerticalCanvas>
  </div>
);
