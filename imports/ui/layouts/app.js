import React from 'react';
import { Grid } from 'react-bootstrap';
import AppNavigation from '../containers/app-navigation';

import { GlassApp } from '../components/GlassApp';
import { GlassLayout } from '../components/GlassLayout';
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
        <GlassLayout>
          <Header />
            { this.props.children }
          <Footer />
        </GlassLayout>
      </GlassApp>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired
};
App.defaultProps = {};
