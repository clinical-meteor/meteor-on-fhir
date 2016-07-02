import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Card } from 'react-toolbox/lib/card';

export class GlassCard extends React.Component {
  constructor(props) {
    super(props);
  }

  getMeteorData() {

    let data = {
      style: {}
    };

    if (this.props && this.props.style) {
      data.style = this.props.style;
    }

    if (Session.get('globalOpacity')) {
      data.style.opacity = Session.get('globalOpacity');
    }

    if (Session.get('darkroomEnabled')) {
      data.style.color = 'black';
      data.style.background = 'white';
    } else {
      data.style.color = 'white';
      data.style.background = 'black';
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = 'blur(3px)';
      data.style.webkitFilter = 'blur(3px)';
    }

    // this could be another mixin
    if (Session.get('backgroundBlurEnabled')) {
      data.style.backdropFilter = 'blur(5px)';
    }

    return data;
  }

  render(){
    return (
       <Card style={this.data.style}>
        { this.props.children }
       </Card>
    );
  }
}
GlassCard.propTypes = {

};
GlassCard.defaultProps = {

};
ReactMixin(GlassCard.prototype, ReactMeteorData);
