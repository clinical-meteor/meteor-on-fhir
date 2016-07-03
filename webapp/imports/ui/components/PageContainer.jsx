import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { createContainer } from 'meteor/react-meteor-data';

import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

Meteor.startup(function (){
  Session.set('appSurfaceOffset', false);
});

export class PageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  getMeteorData() {
    let data = {
      style: {
        // WebkitTransform: 'translate3d(0px,0px,0px)',
        // overflowY: 'scroll',
        // WebkitOverflowScrolling: 'touch',
        WebkitTransition: 'ease .2s',
        transition: 'ease .2s'
      }
    };


    if (Session.get('appWidth') > 1024) {
      data.style.position = 'relative';
      data.style.maxWidth = '1024px';
      data.style.width = '100%';
      if (Session.get('appSurfaceOffset')) {
        data.style.left = (Session.get('appWidth') - 1024) * 0.1618;
        data.style.marginRight = '100px';
      } else {
        data.style.left = (Session.get('appWidth') - 1024) * 0.5;
      }

    } else {
      data.style.position = 'absolute';
      data.style.width = '100%';
    }

    // we should assume card layout by default, meaning there's bit of padding and negative space
    if (Session.get('mainPanelIsCard')) {
      data.style.padding = '20px';
    }

    if (Session.get('hasPagePadding')) {
      data.style.marginTop = '50px';
      data.style.marginBottom = '50px';
    } else {
      data.style.marginTop = '0px';
      data.style.marginBottom = '0px';
    }

    data.style.overflowY = 'scroll';
    data.style.WebkitOverflowScrolling = 'touch';
    data.style.WebkitTransform = 'translateZ(0px)';
    data.style.WebkitTransform = 'translate3d(0, 0, 0)';
    data.style.WebkitPerspective = 'translateZ(0px)';

    return data;
  }

  render(){
    return (
      <section style={this.data.style}>
          { this.props.children }
      </section>
    );
  }
}


PageContainer.propTypes = {};
PageContainer.defaultProps = {};
ReactMixin(PageContainer.prototype, ReactMeteorData);
