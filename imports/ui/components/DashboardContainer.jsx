import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';


// let containerStyle = {
//   marginLeft: "6.4rem",
//   marginRight: "6.4rem",
//   marginTop: "6.4rem",
//   marginBottom: "6.4rem",
//   border: "2px solid #ff4081"
// }



// //containerStyle.left = "";
//
// const DashboardContainer = ({children, className, ...other}) => (
//   <section style={containerStyle}>
//     {children}
//   </section>
// );
//
// export default DashboardContainer;

DashboardContainer = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let data = {
      style: {
        position: "absolute",
        width: "400px",
        marginTop: "112px",
        marginBottom: "6.4rem"
      }
    }

    if (Session.get('appWidth') > 768) {
      data.style.left = "3.2rem"
    } else {
      data.style.left = "0px";
      data.style.width = "100%";
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
