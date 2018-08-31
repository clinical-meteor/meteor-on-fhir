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
                    Check the spelling of the URL.
                  </li>
                </ul>
                <br />
                Othertimes, the settings file might be pointing to the wrong location. 
                <br /><br />
                <ol>
                  <li>
                    Make sure you are using the correct settings file.
                    <pre>meteor --settings /path/to/settings.json</pre>
                  </li>
                  <li>
                    Check the default route in the settings file.
                    <pre>Meteor.settings.public.defaults.route</pre>
                  </li>
                </ol>
                <br />

                <strong>Developer Troubleshooting</strong> <br />
                If you are a developer, your package might not be exporting a route correctly.  
                <br /> <br />
                <ul>
                  <li>
                    Make sure that a <strong>DynamicRoute</strong> is exported from the <strong>index.jsx</strong> file of your custom package.
                  </li>
                  <li>
                    Make sure that your <strong>index.js</strong> is added as the main ES6 module of your package.
                  </li>
                  <li>
                    Make sure that you've added your package to the application.
                  </li>
                </ul>


          </Alert>
        </Grid>

    </VerticalCanvas>
  </div>
);
