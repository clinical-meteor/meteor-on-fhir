import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';


export class MobilePadding extends React.Component {
  constructor(props) {
    super(props);
  };

  getMeteorData() {
    let data = {
      style: {}
    }

    //phone layout
    if (Session.get('appWidth') <= 1536) {
      data.style.width = (Session.get('appWidth') - 40 )+ "px";
      data.style.marginLeft = "20px";
      data.style.marginRight = "20px";
      data.style.position = "absolute";
    }

    return data;
  };

  render(){
    return (
      <div className="mobilePadding" style={this.data.style}>
        { this.props.children }
      </div>
    )
  }
}

MobilePadding.propTypes = {};
MobilePadding.defaultProps = {};
ReactMixin(MobilePadding.prototype, ReactMeteorData);
