import React from 'react';
import ReactMixin from 'react-mixin';
import ReactDOM from 'react-dom';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

Session.setDefault('backgroundImagePath', 'Burning.mp4');
Session.setDefault('backgroundColor', "#eeeeee");
Session.setDefault('darkroomEnabled', true);
Session.setDefault('glassBlurEnabled', false);
Session.setDefault('backgroundBlurEnabled', false);


export class GlassApp extends React.Component {
  constructor(props) {
    super(props);
  };
  // getInitialState () {
  //   return {};
  // };
  // getDefaultProps() {
  //   return {};
  // };
  componentDidMount() {
    //console.log("GlassApp initialized...");
    ReactDOM.findDOMNode(this.refs.MyVideo).play();
    //handleLogin({ component: this });
  };
  getMeteorData() {
    let data = {
      app: {
        style: {
          width: "100%",
          height: "100%",
          position: "absolute"
        }
      },
      video: {
        style: {
          position: "fixed",
          width: "100%",
          height: "100%",
          source: "",
          url: "",
          style: {}
        }
      }
    }

    if (Session.get('lastVideoRun')) {
      ReactDOM.findDOMNode(this.refs.MyVideo).play();
    }

    // play a video if no background image or color has been set
    // and we're on a tablet or larger device (no phone)
    if (!Session.get('backgroundImagePath') && !Session.get('backgroundColor') && (Session.get('appWidth') > 768)) {
      data.video.source = Meteor.absoluteUrl() + "Burning.mp4";
      //data.video.url = Session.get('backgroundImagePath');
      data.video.style = {
        position: "fixed",
        top: "50%",
        left: "50%",
        minWidth: "100%",
        minHeight: "100%",
        width: "auto",
        height: "auto",
        zIndex: "0",
        WebkitTransform: "translateX(-50%) translateY(-50%)",
        transform: "translateX(-50%) translateY(-50%)",
        backgroundSize: "cover"
        //background: "url(polina.jpg) no-repeat",
        // backgroundImage: Session.get('backgroundImagePath'),
        // WebkitBackgroundSize: "cover",
        // MozBackgroundSize: "cover",
        // OBackgroundSize: "cover",
        // backgroundSize: "cover"
      }
    }

    data.app.style = {
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: 1,
      background: "inherit",
      "left": "0px",
      cursor: "pointer"
    }
    if (Session.get('backgroundColor')) {
      data.app.style.background = Session.get('backgroundColor');
    }
    if (Session.get('backgroundImagePath')) {
      data.app.style = {
        backgroundImage: "url(" + Session.get('backgroundImagePath') + ")",
        WebkitBackgroundSize: "cover",
        MozBackgroundSize: "cover",
        OBackgroundSize: "cover",
        backgroundSize: "cover"
      }
    }
    data.app.style.width = "100%";
    data.app.style.height = "100%";
    data.app.style.position = "absolute";


    //console.log("backgroundColor", Session.get('backgroundColor'));
    //console.log("backgroundImagePath", Session.get('backgroundImagePath'));

    return data;
  };

  render(){
    return (
      <div>
        <video
          ref="MyVideo"
          style={this.data.video.style}
          autoplay
          loop
        >
        <source src={this.data.video.source} type="video/mp4"></source>
        </video>

        <div data-react-toolbox='app' style={this.data.app.style}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
GlassApp.propTypes = {

};
GlassApp.defaultProps = {

};
ReactMixin(GlassApp.prototype, ReactMeteorData);
