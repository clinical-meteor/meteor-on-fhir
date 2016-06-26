import React from 'react';

const Spacer = React.createClass({
  getMeteorData() {
    return {};
  },
  render () {
    let spacerStyle = {
      height: '3.2rem'
    };
    return(
      <div class="spacer" style={spacerStyle}></div>
    );
  }
});
export default Spacer;
