import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import AppBar from 'react-toolbox/lib/app_bar';
import Button from 'react-toolbox/lib/button';
import Link from 'react-toolbox/lib/link';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

const dummyText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';



export class GlassCard extends React.Component {
  constructor(props) {
    super(props);
  };

  getMeteorData() {

    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      }
    }

    if (Session.get('darkroomEnabled')) {
      data.style.color = "black";
      data.style.background = "white";
    } else {
      data.style.color = "white";
      data.style.background = "black";
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = "blur(3px)";
      data.style.webkitFilter = "blur(3px)";
    }

    // this could be another mixin
    if (Session.get('backgroundBlurEnabled')) {
      data.style.backdropFilter = "blur(5px)";
    }

    return data;
  };

  render(){
    return (
       <Card style={this.data.style}>
        { this.props.children }
       </Card>
    )
  }
}
GlassCard.propTypes = {

};
GlassCard.defaultProps = {

};
ReactMixin(GlassCard.prototype, ReactMeteorData);
