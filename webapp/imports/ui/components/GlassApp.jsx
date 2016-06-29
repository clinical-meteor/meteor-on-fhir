import React from 'react';
import ReactMixin from 'react-mixin';
import ReactDOM from 'react-dom';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

Session.setDefault('backgroundImagePath', 'Burning.mp4');
Session.setDefault('backgroundColor', '#eeeeee');
Session.setDefault('darkroomEnabled', true);
Session.setDefault('glassBlurEnabled', false);
Session.setDefault('backgroundBlurEnabled', false);


export class GlassApp extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.BackgroundVideo).play();
  }

  getMeteorData() {
    let data = {
      app: {
        style: {
          width: '100%',
          height: '100%',
          position: 'absolute',
          background: 'inherit'
        }
      },
      video: {
        style: {
          position: 'fixed',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          zIndex: '0',
          WebkitTransform: 'translateX(-50%) translateY(-50%)',
          transform: 'translateX(-50%) translateY(-50%)'
        }
      }
    };

    if (Session.get('lastVideoRun')) {
      ReactDOM.findDOMNode(this.refs.BackgroundVideo).play();
    }

    data.app.style = {
      zIndex: 1,
      cursor: 'pointer'
    };

    // play a video if no background image or color has been set
    // and we're on a tablet or larger device (no phone)
    if (Meteor.user() && Meteor.user().profile && Meteor.user().profile.theme) {

      if (Meteor.user().profile.theme.backgroundColor) {
        data.app.style.background = Meteor.user().profile.theme.backgroundColor;
      } else {
        data.app.style.background = 'inherit';
      }

      if (Meteor.user().profile.theme.backgroundImagePath) {
        data.app.style = {
          backgroundImage: 'url(' + Meteor.user().profile.theme.backgroundImagePath + ')',
          WebkitBackgroundSize: 'cover',
          MozBackgroundSize: 'cover',
          OBackgroundSize: 'cover',
          backgroundSize: 'cover'
        };
      } else {
        backgroundImage: 'none';
      }

      if (!Meteor.user().profile.theme.backgroundColor && !Meteor.user().profile.theme.backgroundImagePath && (Session.get('appWidth') > 768)) {
        data.video.source = Meteor.absoluteUrl() + 'Burning.mp4';
      }
    }

    data.app.style.width = '100%';
    data.app.style.height = '100%';
    data.app.style.position = 'absolute';

    return data;
  }

  render(){
    // let videoSrc = '/VideoBackgrounds/11763620.mp4';
    let videoSrc = '/VideoBackgrounds/Burning.mp4';
    return (
      <div>
        <video
          ref='BackgroundVideo'
          style={this.data.video.style}
          poster=''
          autoplay
          loop
        >
        <source src={videoSrc} type='video/mp4'></source>
        </video>

        <div data-react-toolbox='app' style={this.data.app.style}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
GlassApp.propTypes = {

};
GlassApp.defaultProps = {

};
ReactMixin(GlassApp.prototype, ReactMeteorData);
