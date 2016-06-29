import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export class GlassTheme extends React.Component {
  constructor(props) {
    super(props);
    this.props.glass = {
      style: {
        position: "absolute",
        width: "768px",
        marginTop: "6.4rem",
        marginBottom: "6.4rem",
        paddingTop: "6.4rem"
      }
    }

    if (Session.get('appWidth') > 768) {
      this.props.glass.style.left = ((Session.get('appWidth') - 768) * 0.5) + "px";
    } else {
      this.props.glass.style.left = "0px";
      this.props.glass.style.width = "100%";
    }
  };

  render(){
    return this.props.children;
  }
}
GlassTheme.propTypes = { };
GlassTheme.defaultProps = { };
ReactMixin(GlassTheme.prototype, ReactMeteorData);
