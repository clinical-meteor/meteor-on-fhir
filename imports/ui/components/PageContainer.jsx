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
        position: "absolute",
        width: "768px",
        marginTop: "6.4rem",
        marginBottom: "6.4rem",
        paddingTop: "6.4rem"
      }
    }

    if (Session.get('appWidth') > 768) {
      data.style.left = ((Session.get('appWidth') - 768) * 0.5) + "px";
    } else {
      data.style.left = "0px";
      data.style.width = "100%";
    }

    return data;
  };

  render(){
    return (
      <section style={this.data.style}>
        { this.props.children }
      </section>
    )
  }
}
PageContainer.propTypes = {

};
PageContainer.defaultProps = {

};
ReactMixin(PageContainer.prototype, ReactMeteorData);
