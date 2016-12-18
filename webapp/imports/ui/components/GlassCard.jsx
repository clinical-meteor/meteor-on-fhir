import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Card } from 'material-ui/Card';

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

    // GlassFactory.addOpacity(data.style);
    if (Session.get('globalOpacity')) {
      data.style.opacity = Session.get('globalOpacity');
    }

    // GlassFactory.addDarkroom(data.style);
    if (Session.get('darkroomEnabled')) {
      data.style.color = 'black';
      data.style.background = 'white';
    } else {
      data.style.color = 'white';
      data.style.background = 'black';
    }

    // GlassFactory.addBlur(data.style);
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = 'blur(3px)';
      data.style.webkitFilter = 'blur(3px)';
    }

    // GlassFactory.addBackgroundBlur(data.style);
    if (Session.get('backgroundBlurEnabled')) {
      data.style.backdropFilter = 'blur(5px)';
    }

    // GlassFactory.addStyling(data);

    return data;
  }

  render(){
    return (
       <Card id={this.props.id} style={this.data.style}>
        { this.props.children }
       </Card>
    );
  }
}

ReactMixin(GlassCard.prototype, ReactMeteorData);
