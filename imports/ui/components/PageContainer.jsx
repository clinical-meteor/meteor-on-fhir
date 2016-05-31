import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { createContainer } from 'meteor/react-meteor-data';


export class PageContainer extends React.Component {
  //mixins: [ReactMeteorData],
  constructor(props) {
    super(props);
  };
  //   return {};
  // };
  // getDefaultProps() {
  //   return {};
  // };
  componentDidMount() {
    //handleLogin({ component: this });
  };
  getMeteorData() {
    let data = {
      style: {
        width: "768px",
        marginTop: "6.4rem",
        marginBottom: "6.4rem",
        paddingTop: "6.4rem"
      }
    }

    //console.log("appWidth", Session.get('appWidth'));

    if (Session.get('appWidth') > 768) {
      data.style.position = "relative";
      data.style.marginLeft = "auto";
      data.style.marginRight = "auto";
      // data.style.left = "0px";
      // data.style.width = "100%";
    } else {
      data.style.position = "absolute";
      data.style.margin = "0px";
      // data.style.left = ((Session.get('appWidth') - 768) * 0.5) + "px";
    }

    //phone layout
    if (Session.get('appWidth') < 768) {
      data.style.width = "100%";
      data.style.paddingLeft = "20px";
      data.style.paddingRight = "20px";
    }

    return data;
  };

  render(){
    return (
      <section style={this.data.style}>
        <div style={{position: "static"}}>
          { this.props.children }
        </div>
      </section>
    )
  }
}
PageContainer.propTypes = {

};
PageContainer.defaultProps = {

};
ReactMixin(PageContainer.prototype, ReactMeteorData);
