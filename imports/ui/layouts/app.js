import React from 'react';
// import { Grid } from 'react-bootstrap';
// import AppNavigation from '/imports/ui/containers/app-navigation';

import { GlassApp } from '/imports/ui/components/GlassApp';
import { GlassLayout } from '/imports/ui/layouts/GlassLayout';
import { Header } from '/imports/ui/components/Header';
import { Footer } from '/imports/ui/components/Footer';

export class App extends React.Component {
  constructor(props) {
    super(props);
  }

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
