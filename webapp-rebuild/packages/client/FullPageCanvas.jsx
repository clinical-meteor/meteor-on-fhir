import { Meteor } from 'meteor/meteor';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Session } from 'meteor/session';

export class FullPageCanvas extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    Session.set('appSurfaceOffset', false);
    Session.set('hasPagePadding', true);
  }
  getMeteorData() {
    let data = {
      style: {
        WebkitTransition: 'ease .2s',
        transition: 'ease .2s'
      }
    };


    var canvasWidth = Session.get('appWidth') - 1;
    
    // but if we're passed in a width via a prop, then overide
    if (this.props.width) {
      if(this.props.width == 'wide'){
        canvasWidth = Session.get('appWidth') - 1;
      } else {
        canvasWidth = this.props.width;
      }
    }


    if (Session.get('appWidth') > canvasWidth) {
      data.style.position = 'relative';
      data.style.maxWidth = canvasWidth + 'px';
      data.style.width = '100%';
      data.style.left = 0;
      
    } else {
      data.style.position = 'absolute';
      data.style.width = '100%';
    }

    var paddingTop = 0;
    var paddingBottom = 0;

    if(Session.get('showNavbars')){
      paddingTop = paddingTop + 64;
      paddingBottom = paddingBottom + 64;
    }
    if(Session.get('showSearchbar')){
      paddingTop = paddingTop + 60;
    }
    if(Session.get('mainPanelIsCard')){
      paddingTop = paddingTop + 20;
    }

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
      <section className="pageContainer verticalContainer" style={this.data.style}>
          { this.props.children }
      </section>
    );
  }
}


ReactMixin(FullPageCanvas.prototype, ReactMeteorData);
