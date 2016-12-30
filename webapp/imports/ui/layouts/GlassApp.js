import React from 'react';
import ReactMixin from 'react-mixin';
import ReactDOM from 'react-dom';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

Session.setDefault('backgroundImagePath', 'Flames.mp4');
Session.setDefault('backgroundColor', '#eeeeee');
Session.setDefault('darkroomEnabled', true);
Session.setDefault('glassBlurEnabled', false);
Session.setDefault('backgroundBlurEnabled', false);

Session.setDefault('showVideoBackground', false);


export class GlassApp extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (this.refs.BackgroundVideo) {
      ReactDOM.findDOMNode(this.refs.BackgroundVideo).play();
    }
  }

  getMeteorData() {
    let data = {
      app: {
        style: {
          width: '100%',
          height: '100%',
          position: 'fixed'
        },
        showVideoBackground: false
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

    if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.theme && Meteor.settings.public.theme.showVideoBackground) {
      data.app.showVideoBackground = Meteor.settings.public.theme.showVideoBackground;
    }

    if (Meteor.user()) {
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
        }

        // if (!Meteor.user().profile.theme.backgroundColor && !Meteor.user().profile.theme.backgroundImagePath && (Session.get('appWidth') > 768)) {
        //   data.video.source = Meteor.absoluteUrl() + 'Flames.mp4';
        // }
      } else {
        // user does not have a theme set
        this.useGlobalDefaultBackground(data.app.style);
      }
    } else {
      // user is not logged in
      this.useGlobalDefaultBackground(data.app.style);
    }

    data.app.style.width = '100%';
    data.app.style.height = '100%';
    data.app.style.position = 'fixed';

    if(process.env.NODE_ENV === "test") console.log("GlassApp[data]" , data);
    if(process.env.NODE_ENV === "test") console.log("Meteor.settings" , Meteor.settings);

    return data;
  }

  useGlobalDefaultBackground(style){
    if (Meteor.settings.public.theme.backgroundImagePath) {
      style.backgroundImage = 'url(' + Meteor.settings.public.theme.backgroundImagePath + ')';
    } else {
      style.backgroundImage = 'none';
    }
    style.WebkitBackgroundSize = 'cover';
    style.MozBackgroundSize = 'cover';
    style.OBackgroundSize = 'cover';
    style.backgroundSize = 'cover';

    return style;
  }
  renderBackground(showVideoBackground){
    if (showVideoBackground) {
      let videoSrc = '/VideoBackgrounds/Circulation.mp4';
      if (Meteor.settings.public.theme.defaultVideo) {
        videoSrc = Meteor.settings.public.theme.defaultVideo;
      }
      return(
        <video
          ref='BackgroundVideo'
          style={this.data.video.style}
          poster=''
          autoPlay
          loop
        >
          <source src={videoSrc} type='video/mp4'></source>
        </video>
      );
    } else {
      return(
        <div id='backgroundLayer' style={this.data.app.style}></div>
      );
    }
  }

  render(){
    return (
      <div id="glassApp">
        {this.renderBackground(this.data.app.showVideoBackground)}

        <div style={this.data.app.style}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

ReactMixin(GlassApp.prototype, ReactMeteorData);
