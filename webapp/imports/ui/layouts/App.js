import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

// base layout
import { GlassApp } from '/imports/ui/layouts/GlassApp';
import { GlassLayout } from '/imports/ui/layouts/GlassLayout';
import { Header } from '/imports/ui/layouts/Header';
import { Footer } from '/imports/ui/layouts/Footer';

// Material UI Theming
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {teal400,teal600} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardTitle, CardText } from 'material-ui/Card';


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal400,
    primary2Color: teal600,
    pickerHeaderColor: teal400
  }
});

Session.setDefault('iFrameLocation', 'https://www.ncbi.nlm.nih.gov');

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
          minHeight: '768px',
          width: '1024px',
          height: Session.get('appHeight') - 240 + 'px'
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

    if (Session.get('appWidth') > 1200) {
      data.style.secondary.visibility = 'visible';
      data.style.secondary.left = '1024px';
    } else {
      data.style.secondary.visibility = 'hidden';
      data.style.secondary.left = '10000px';
    }

    if(process.env.NODE_ENV === "test") console.log("GenomePage[data]", data);
    return data;
  }

  render(){
    return (
     <MuiThemeProvider muiTheme={muiTheme}>
      <GlassApp>
        <GlassLayout>
          <Header />
            <div className='primaryFlexPanel' >
              { this.props.children }
            </div>
            <div className='secondaryFlexPanel' style={this.data.style.secondary}>
              <VerticalCanvas>
                <GlassCard style={this.data.style.card}>
                  <CardText>
                    <object id="iframe" type="text/html" data={this.data.browserWindowLocation} style={this.data.style.content}>
                      <p>unable to load content</p>
                    </object>
                  </CardText>
                </GlassCard>
              </VerticalCanvas>
            </div>
          <Footer />
        </GlassLayout>
      </GlassApp>
     </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired
};
App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};
App.defaultProps = {};

ReactMixin(App.prototype, ReactMeteorData);
