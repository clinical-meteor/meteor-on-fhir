import { Meteor } from 'meteor/meteor';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Session } from 'meteor/session';

Meteor.startup(function (){
  Session.set('appSurfaceOffset', false);
  Session.set('hasPagePadding', true);
});

export class VerticalCanvas extends React.Component {
  constructor(props) {
    super(props);
  }

  getMeteorData() {
    let data = {
      style: {
        WebkitTransition: 'ease .2s',
        transition: 'ease .2s'
      }
    };




    var canvasWidth;
    if(Session.get('isWideHorizontally')){
      canvasWidth = Session.get('appWidth') - 1;
    } else {
      if (this.props.width) {
        canvasWidth = this.props.width;
      } else {
        canvasWidth = 1024;
      }
    }

    if (Session.get('appWidth') > canvasWidth) {
      data.style.position = 'relative';
      data.style.maxWidth = canvasWidth + 'px';
      data.style.width = '100%';



      if (Session.get('appSurfaceOffset')) {
        // golden ratio
        data.style.left = (Session.get('appWidth') - canvasWidth) * 0.1618;
        data.style.marginRight = '100px';
      } else {
        // centered
        data.style.left = (Session.get('appWidth') - canvasWidth) * 0.5;
      }

    } else {
      data.style.position = 'absolute';
      data.style.width = '100%';
    }

    var paddingTop = 0;
    var paddingBottom = 0;

    if(Session.get('showNavbars')){
      paddingTop = paddingTop + 60;
      paddingBottom = paddingBottom + 60;
    }
    if(!Session.get('showSearchbar')){
      paddingTop = paddingTop + 60;
      paddingBottom = paddingBottom + 60;
    }
    if(!Session.get('mainPanelIsCard')){
      paddingTop = paddingTop + 20;
      paddingBottom = paddingBottom + 20;
    }

    // if (Session.get('hasPagePadding')) {
    //   data.style.paddingTop = 80;
    //   data.style.paddingBottom = 80;
    // } else {
    //   if (Session.get('mainPanelIsCard')) {
    //     data.style.paddingTop = 20;
    //     data.style.paddingBottom = 20;
    //   } else {
    //     data.style.paddingTop = 0;
    //     data.style.paddingBottom = 0;
    //   }
    // }
    data.style.paddingTop = paddingTop + 'px';
    data.style.paddingBottom = paddingBottom + 'px';


    if (Session.get('hasPagePadding')) {
      data.style.paddingLeft = '20px';
      data.style.paddingRight = '20px';
    } else {
      if (Session.get('mainPanelIsCard')) {
        data.style.paddingLeft = '20px';
        data.style.paddingRight = '20px';
      } else {
        data.style.paddingLeft = '0px';
        data.style.paddingRight = '0px';
      }
    }



    data.style.overflowY = 'scroll';
    data.style.WebkitOverflowScrolling = 'touch';
    data.style.WebkitTransform = 'translateZ(0px)';
    data.style.WebkitTransform = 'translate3d(0, 0, 0)';
    data.style.WebkitPerspective = 'translateZ(0px)';

    data.style.height = Session.get('appHeight');

    return data;
  }

  render(){
    return (
      <section className="pageContainer" style={this.data.style}>
          { this.props.children }
      </section>
    );
  }
}


ReactMixin(VerticalCanvas.prototype, ReactMeteorData);
