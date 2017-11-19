import { CardText, CardTitle } from 'material-ui/Card';

import React from 'react';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';

import { render } from 'react-dom';

import { App } from '/imports/ui/RoutingApp';
import { TimelineSidescrollPage } from '/imports/ui/TimelineSidescrollPage';

// Session.setDefault('pathname', '/');
browserHistory.listen(function(event) {
  //Session.set('pathname', event.pathname);
});

Meteor.startup(() => {

  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute name="index" component={ App } />

        <Route name="timeline" path="/timeline" component={ TimelineSidescrollPage }  />

        <Route path="*" component={ App } />

      </Route>
    </Router>,
    // document.getElementById('react-root')
    document.getElementById('react-root')
  );
});
