import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from '/imports/ui/layouts/App';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {blue400, blue600} from 'material-ui/styles/colors';

import { withRouter } from "react-router-dom";

// Global Theming 
// This is not user based configs.  This is set at the application level.
// Probably want to connect these values to Meteor.settings.public.theme

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue400,
    primary2Color: blue600,
    pickerHeaderColor: blue600
  }
});


// Application routing history
import { createBrowserHistory } from "history";
const appHistory = createBrowserHistory();


// we need this so that pages and routes know their location and history
const AppWithRouter = withRouter(App);


// and now the application
Meteor.startup(() => {
  ReactDOM.render(
    <BrowserRouter history={appHistory}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <AppWithRouter />
      </MuiThemeProvider>
    </BrowserRouter>,
    document.getElementById('app')
  );
});
