import React from 'react';
import { Grid } from 'react-bootstrap';
import AppNavigation from '../containers/app-navigation';

import { GlassApp } from '../components/GlassApp';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export class App extends React.Component {
  constructor(props) {
    super(props);
  };
  componentDidMount() {
    //console.log("GlassApp initialized...");
  };

  render(){
    return (
      <GlassApp>
        <Header />
        <Grid>
          { this.props.children }
        </Grid>
        <Footer />
      </GlassApp>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired
};
App.defaultProps = {};
