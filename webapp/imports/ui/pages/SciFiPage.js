//import './App.css';

import {
  Fade,
  GradientBackground,
  Parallax,
  Rotator,
  Scale,
  TrackingTiltPlane,
  Translate,
  View,
  Zoom,
  utils,
} from 'react-scifi';
import {
  circle14striped,
  circle34,
  colors,
} from '/imports/ui/pages/experimental/Shapes.js';

import { AboutAppCard } from '/imports/ui/components/AboutAppCard';
import {FontAwesome} from 'react-fontawesome';
import { GlassCard } from '/imports/ui/components/GlassCard';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Session } from 'meteor/session';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { browserHistory } from 'react-router';
import color from 'onecolor';

var sharedStyles = {
  tile: {
    opacity: .5
  }
};
const {
  cssVendorPrefix,
} = utils;


export class SciFiPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialMount: false,
      showDemo: false,
      bgEndColor: color(colors.highlight.verydark),
      bgStartColor: color(colors.highlight.dark),
      lightCircle: color(colors.highlight.light),
      mediumCircle: color(colors.highlight.medium),
    };
  }
  getMeteorData() {
    var data = {
      orbital: {
        'top': Session.get('appHeight') - 380,
        'left': Session.get('appWidth') - 380,
        'position': 'absolute',
        'WebkitTransition': 'ease 1s',
        'transition': 'ease 1s'
      }
    };

    if(Session.get('showOrbital')){
      data.orbital.left = Session.get('appWidth') + 380;
    };

    return data;
  }
  componentDidMount() {
    setInterval(() => {
      this.setState(prevState => {
        return {
          bgEndColor: prevState.bgEndColor.hue(0.0005, true),
          bgStartColor: prevState.bgStartColor.hue(0.0005, true),
          lightCircle: prevState.lightCircle.hue(0.0005, true),
          mediumCircle: prevState.mediumCircle.hue(0.0005, true),
        };
      });
    }, 25);

    setTimeout(() => {
      this.showDemo();
    }, 300);
  }

  showDemo() {
    this.setState({
      initialMount: true,
      showDemo: true,
    });
  }

  hideDemo() {
    this.setState({
      showDemo: false,
    });
  }
  
  openLink(url){
    console.log("openLink", url);
    browserHistory.push(url);
  }
  render(){
    const {
      bgStartColor,
      bgEndColor,
      initialMount,
      lightCircle,
      mediumCircle,
      showDemo,
    } = this.state;

    const contentStyle = {
      position: 'absolute',
      width: '360px',
      height: '360px'
    };

    const circlePosition = {
      position: 'absolute',
      top: 0,
      left: 0,
    };

    const reactIsCool = {
      color: lightCircle.hex(),
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      textAlign: 'center',
      fontFamily: 'Monaco, fixed-width',
      fontSize: '40px',
      fontWeight: 'bold',
      cursor: 'pointer',
      ...cssVendorPrefix('userSelect', 'none'),
    };

    return(
        <View 
          id='orbital'
          flex={true}
          onMouseDown={() => { this.hideDemo(); }}
          onMouseUp={() => { this.showDemo(); }}
          onTouchStart={() => { this.hideDemo(); }}
          onTouchEnd={() => { this.showDemo(); }}
          style={this.data.orbital}
          >
          <View flex={true} style={contentStyle}>
            <Fade show={showDemo} flex={true}>
              <Zoom show={showDemo}
                stifness={showDemo ? 160 : 170}
                damping={showDemo ? 13 : 26}>
                <TrackingTiltPlane maxTiltDeg={0}>
                  <Rotator 
                    spinDuration={8000}
                    spinDirection="cw"
                    style={circlePosition}>
                    {circle34(lightCircle.hex())}
                  </Rotator>

                  <Translate z={-100} style={circlePosition}>
                    <Rotator spinDuration={12000}
                      spinDirection="ccw">
                      <Scale scale={1.1}>
                        {circle34(mediumCircle.hex())}
                      </Scale>
                    </Rotator>
                  </Translate>

                  <Rotator spinDuration={5000}
                    spinDirection="ccw"
                    style={circlePosition}>
                    <Scale scale={0.9}>
                      {circle14striped(lightCircle.hex())}
                    </Scale>
                  </Rotator>
                </TrackingTiltPlane>
              </Zoom>
            </Fade>

            <div style={reactIsCool}>
              <TrackingTiltPlane maxTiltDeg={0}>
                <Zoom show={!showDemo && initialMount}
                  stifness={!showDemo ? 150 : 170}
                  damping={!showDemo ? 11 : 26}>
                  <Fade show={!showDemo && initialMount}>
                    <Parallax count={5} distance={-200}>
                      {index => (
                        <View style={{opacity: 1 - index / 5}}
                          flex={true}
                          key={index}>
                          Symptomatic.io
                          2017 Abigail Watson
                        </View>
                      )}
                    </Parallax>
                  </Fade>
                </Zoom>
              </TrackingTiltPlane>
            </div>
          </View>
        </View>      
    );
  }
}
ReactMixin(SciFiPage.prototype, ReactMeteorData);