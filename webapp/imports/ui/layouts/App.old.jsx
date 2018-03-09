// base layout
import { VerticalCanvas, GlassCard } from 'meteor/clinical:glass-ui';
import { CardHeader, CardText, CardTitle } from 'material-ui/Card';
import {teal400, teal600} from 'material-ui/styles/colors';
import PropTypes from 'prop-types';

import { Footer } from '/imports/ui/layouts/Footer';
import { GlassApp } from '/imports/ui/layouts/GlassApp';
import { Header } from '/imports/ui/layouts/Header';
import { Image } from '/imports/ui/components/Image';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import { SciFiOrbital } from '/imports/ui/components/SciFiOrbital';
import { Session } from 'meteor/session';
import { SinglePanelLayout } from '/imports/ui/layouts/SinglePanelLayout';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import { Meteor } from 'meteor/meteor';

import { get, has } from 'lodash';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal400,
    primary2Color: teal600,
    pickerHeaderColor: teal400
  }
});

Session.setDefault('iFrameLocation', '');
Session.setDefault('catchDialogOpen', false);

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
          width: '1024px'
        },
        content: {
          minHeight: '728px',
          width: '970px',
          height: Session.get('appHeight') - 280 + 'px'
        }
      },
      browserWindowLocation: 'https://www.ncbi.nlm.nih.gov', 
      catchDialog: {
        open: false,
        patient: {
          display: '',
          reference: ''
        }
      },
      user: Meteor.user()
    };

    if(Session.get('catchDialogOpen')){
      data.catchDialog.open = Session.get('catchDialogOpen');
    }
    

    if (Session.get('iFrameLocation')) {
      data.browserWindowLocation = Session.get('iFrameLocation');
    }

    if (Session.get('secondPanelVisible')) {
      if (Session.get('appWidth') > 1200) {
        data.style.secondary.visibility = 'visible';
        data.style.secondary.left = '1024px';
      } else {
        data.style.secondary.visibility = 'hidden';
        data.style.secondary.left = '4048px';
      }
    } else {
      data.style.secondary.visibility = 'hidden';
      data.style.secondary.left = '4048px';
    }

    if(process.env.NODE_ENV === "test") console.log("App[data]", data);
    return data;
  }
  handleCloseCatch(){
    Session.set('catchDialogOpen', false);
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
  render(){
    var orbital;
    if(get(Meteor, 'settings.public.defaults.nfcOrbital')){
      orbital = <SciFiPage />;
    }
    const catchActions = [
      <FlatButton
        label="Accept"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleCloseCatch}
      />,
      <FlatButton
        label="Dismiss"
        primary={true}
        onTouchTap={this.handleCloseCatch}
      />
    ];


    return (
     <MuiThemeProvider muiTheme={muiTheme}>
      <GlassApp>
        <SinglePanelLayout>
          {orbital}
          <Header />
            <div className='primaryFlexPanel' >
              {/* { this.props.children } */}

              {/* <RouteTransition                  
                  pathname={this.props.location.pathname}
                  atEnter={pop.atEnter}
                  atLeave={pop.atLeave}
                  atActive={pop.atActive}
                  className="transition-wrapper"
                > */}
                  {this.props.children}
                {/* </RouteTransition> */}

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