// base layout
import { CardHeader, CardText, CardTitle } from 'material-ui/Card';
import {teal400, teal600} from 'material-ui/styles/colors';
import PropTypes from 'prop-types';

import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';


export class App extends React.Component {
  constructor(props) {
    super(props);
  }
  // getChildContext() {
  //   return {
  //     muiTheme: getMuiTheme(baseTheme)
  //   };
  // }
  componentWillMount() {
  }

  getMeteorData() {
    return {};
  }

  render(){
    return (
      <div className='primaryFlexPanel' >
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
};
// App.childContextTypes = {
//   muiTheme: PropTypes.object.isRequired
// };
App.defaultProps = {};

ReactMixin(App.prototype, ReactMeteorData);