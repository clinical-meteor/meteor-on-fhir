import { Session } from 'meteor/session';
import React  from 'react';
import Slider from 'material-ui/Slider';

Session.setDefault('globalOpacity', 0.95);

OpacitySlider = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      opacity: Session.get('globalOpacity')
    };
  },
  onChange (event, value){
    Session.set('globalOpacity', value);
  },
  render () {
    return(
      <div style={{width: "300px", top: '0px', right: '20px', position: 'absolute'}}>
        <Slider
          min={0}
          max={1}
          step={0.01}
          ref="opacitySlider"
          value={this.data.opacity}
          onChange={this.onChange }
          style={{width: "300px"}}
          />
      </div>
    );
  }
});

export default OpacitySlider;
