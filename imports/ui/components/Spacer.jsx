import React from 'react';

Spacer = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {};
  },
  render () {
    let spacerStyle = {
      height: "3.2rem"
    }
    return(
      <div class="spacer" style={spacerStyle}></div>
    );
  }
});

export default Spacer;
