// base layout
import { CardHeader, CardText, CardTitle } from 'material-ui/Card';
import {teal400, teal600} from 'material-ui/styles/colors';
import PropTypes from 'prop-types';

import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from 'react';
// import { BrowserRouter} from 'react-router-bootstrap';

import { Footer } from '/imports/ui/layouts/Footer';
import { GlassApp } from '/imports/ui/layouts/GlassApp';
import { GlassCard, VerticalCanvas } from 'meteor/clinical:glass-ui';
import { Header } from '/imports/ui/layouts/Header';
import { Image } from '/imports/ui/components/Image';
import { SciFiOrbital } from '/imports/ui/components/SciFiOrbital';
import { Session } from 'meteor/session';
import SinglePanelLayout from '/imports/ui/layouts/SinglePanelLayout';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { get, has } from 'lodash';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal400,
    primary2Color: teal600,
    pickerHeaderColor: teal400
  }
});

Session.setDefault('iFrameLocation', '');
Meteor.startup(function (){
  if (has(Meteor.settings, 'public.defaults.iFrameUrl')){
    Session.set('iFrameLocation', get(Meteor.settings, 'public.defaults.iFrameUrl'));
  }
  if (has(Meteor.settings, 'public.defaults.iFrameEnabled')){
    Session.set('secondPanelVisible', get(Meteor.settings, 'public.defaults.iFrameEnabled'));
  }
});

export class App extends React.Component {
  constructor(props) {
    super(props);
  }
  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme)
    };
  }
  componentWillMount() {
    injectTapEventPlugin();
  }
  renderSecondaryPanel(){
    // RADIOLOGY
    if (Meteor.userId() && Session.equals('pathname', '/diagnostic-reports') && get(Meteor.settings, 'public.modules.fhir.DiagnosticReports')) {
      // the user is logged in as a normal user
      return (
        <GlassCard style={this.data.style.card} >
          <Image />
        </GlassCard>
      );
      // Website
    } else if (Meteor.userId() && Session.equals('pathname', '/videoconferencing')) {
      return (
        <GlassCard style={this.data.style.card} height='auto'>
          <CardText>
            Video!
          </CardText>
        </GlassCard>
      );


    // Website
    } else if (Meteor.userId() && get(Meteor.settings, 'public.defaults.iFrameUrl')) {
      return (
        <GlassCard style={this.data.style.card} height='auto'>
          <CardText>
            <object id="iframe" type="text/html" data={this.data.browserWindowLocation} style={this.data.style.content}>
              <p>unable to load </p>
            </object>
          </CardText>
        </GlassCard>
      );

    } else {
      // anything else
      return (
        <div></div>
      );

    }
  }
  getMeteorData() {
    let data = {
      style: {
        secondary: {
          position: 'absolute',
          top: ' 0px',
          width: '1024px',
          left: '0',
          transition: '1s'
        },
        card: {
          position: 'relative',
          //minHeight: '768px',
          width: '1024px'
          //height: Session.get('appHeight') - 240 + 'px'
        },
        content: {
          minHeight: '728px',
          width: '970px',
          height: Session.get('appHeight') - 280 + 'px'
        }
      },
      browserWindowLocation: 'https://www.ncbi.nlm.nih.gov'
    };



    if (Session.get('iFrameLocation')) {
      data.browserWindowLocation = Session.get('iFrameLocation');
    }

    if (Session.get('secondPanelVisible')) {
      if (Session.get('appWidth') > 1200) {
        data.style.secondary.visibility = 'visible';
        data.style.secondary.left = '1200px';
      } else {
        data.style.secondary.visibility = 'hidden';
        data.style.secondary.left = '4048px';
      }
    } else {
      data.style.secondary.visibility = 'hidden';
      data.style.secondary.left = '4048px';
    }

    if(process.env.NODE_ENV === "test") console.log("GenomePage[data]", data);
    return data;
  }

  render(){
    var orbital;
    if(Meteor.settings && Meteor.settings.public && Meteor.settings.public.defaults && Meteor.settings.public.defaults.nfcOrbital){
      orbital = <SciFiPage />;
    }
    return (
      // <BrowserRouter>
        <MuiThemeProvider muiTheme={muiTheme}>
          <GlassApp>
            <SinglePanelLayout>
              {orbital}
              <Header />
                <div className='primaryFlexPanel' >
                  { this.props.children }
                </div>
                <div className='secondaryFlexPanel' style={this.data.style.secondary}>
                  <VerticalCanvas>
                    { this.renderSecondaryPanel() }
                  </VerticalCanvas>
                </div>
              <Footer />
            </SinglePanelLayout>
          </GlassApp>
        </MuiThemeProvider>
      // </BrowserRouter>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
};
App.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};
App.defaultProps = {};

ReactMixin(App.prototype, ReactMeteorData);