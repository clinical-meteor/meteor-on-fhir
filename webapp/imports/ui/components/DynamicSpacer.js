import React  from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Session } from 'meteor/session';

export class DynamicSpacer extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        // height: '0rem',
        height: '1px',
        'WebkitTransition': 'ease .2s',
        'transition': 'ease .2s'
      }
    };

    if (Session.get('hasPageVerticalPadding')) {
      data.style.height = '3.2rem';
    }

    return data;
  }

  render () {
    return(
      <div className="spacer" style={this.data.style}></div>
    );
  }
}


DynamicSpacer.propTypes = {};
ReactMixin(DynamicSpacer.prototype, ReactMeteorData);
