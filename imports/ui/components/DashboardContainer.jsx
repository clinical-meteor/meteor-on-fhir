import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';



DashboardContainer = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let data = {
      style: {
        position: "absolute",
        width: "400px",
        marginLeft: "112px",
        marginTop: "112px",
        marginBottom: "6.4rem"
      }
    }

    return data;
  },
  render(){
    return (
      <section style={this.data.style}>
        {this.props.children}
      </section>
    )
  }
});

export default DashboardContainer;
