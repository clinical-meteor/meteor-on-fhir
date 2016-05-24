import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Button from 'react-toolbox/lib/button';
import Slider from 'react-toolbox/lib/slider';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

Session.setDefault('globalOpacity', 0.95);

OpacitySlider = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      opacity: Session.get('globalOpacity')
    };
  },
  onChange (value){
    //console.log('OpacitySlider changed...', value)
    Session.set('globalOpacity', value);
  },
  render () {
    return(
      <div style={{width: "300px"}}>
        <Slider min={0} max={1} step={0.01} ref="opacitySlider" editable value={this.data.opacity} onChange={this.onChange} style={{width: "300px"}} />
      </div>
    );
  }
});

export default OpacitySlider;
