// base layout
import { CardHeader, CardText, CardTitle } from 'material-ui/Card';
import {teal400, teal600} from 'material-ui/styles/colors';
import PropTypes from 'prop-types';

import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import React, { Component } from 'react';

import { Footer } from '/imports/ui/layouts/Footer';
import { GlassApp } from '/imports/ui/layouts/GlassApp';
import { GlassCard, VerticalCanvas, FullPageCanvas } from 'meteor/clinical:glass-ui';
import { Header } from '/imports/ui/layouts/Header';
import { DicomImage } from '/imports/ui/components/DicomImage';
import { SciFiOrbital } from '/imports/ui/components/SciFiOrbital';
import { Session } from 'meteor/session';
import SidebarTray from '/imports/ui/layouts/SidebarTray';

import { get, has } from 'lodash';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
      // muiTheme: getMuiTheme(baseTheme)
      muiTheme: muiTheme
    };
  }
  // componentWillMount() {
  //   injectTapEventPlugin();
  // }
  renderSecondaryPanel(){
    // RADIOLOGY
    if (Meteor.userId() && Session.equals('pathname', '/diagnostic-reports') && get(Meteor.settings, 'public.modules.fhir.DiagnosticReports')) {
      // the user is logged in as a normal user
      return (
        <GlassCard style={this.data.style.card} >
          <DicomImage />
        </GlassCard>
      );

      // Conditions (Zygote)
    } else if (Meteor.userId() && Session.equals('pathname', '/conditions') && get(Meteor, 'settings.public.apps.ZygoteAvatar')) {
      return (
        <GlassCard style={this.data.style.card} height='auto'>
          <CardText>
            <object id="iframe" type="text/html" data='https://www.zygotebody.com/' style={this.data.style.content}>
              <p>unable to load </p>
            </object>
          </CardText>
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
          width: '100%',
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
        data.style.secondary.left = '1280px';
        data.style.secondary.width = (Session.get('appWidth') - (1280 + 80)) + 'px';
        data.style.card.width = '100%';
      } else {
        data.style.secondary.visibility = 'hidden';
        data.style.secondary.left = '4048px';
      }
    } else {
      data.style.secondary.visibility = 'hidden';
      data.style.secondary.left = '4048px';
    }

    if(process.env.NODE_ENV === "development") console.log("App[data]", data);
    return data;
  }

  render(){
    var orbital;
    // if(get(Meteor, 'settings.public.defaults.nfcOrbital')){
    //   orbital = <SciFiPage />;
    // }

    console.log('this.props.location.query', this.props.location.query)
    Session.set('window.location', this.props.location)
    Session.set('ehrLaunchContext', get(this, 'props.location.query.launch'))
  
    return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <GlassApp>
            <SidebarTray>
              {orbital}
              <Header />
                <div id='primaryFlexPanel' className='primaryFlexPanel' >
                  { this.props.children }
                </div>
                <div id='secondaryFlexPanel' className='secondaryFlexPanel' style={this.data.style.secondary}>
                  <FullPageCanvas>
                    { this.renderSecondaryPanel() }
                  </FullPageCanvas>
                </div>
              <Footer />
            </SidebarTray>
          </GlassApp>
        </MuiThemeProvider>
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
// export default App;