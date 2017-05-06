import { Card } from 'material-ui/Card';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Session } from 'meteor/session';

export class GlassCard extends React.Component {
  constructor(props) {
    super(props);
  }

  getMeteorData() {

    let data = {
      style: {
        overflowY: 'scroll'
      }
    };

    if (this.props && this.props.style) {
      data.style = this.props.style;
    }

    // GlassFactory.addOpacity(data.style);
    if (Session.get('globalOpacity')) {
      data.style.opacity = Session.get('globalOpacity');
    }

    // GlassFactory.addDarkroom(data.style);
    if (Session.get('darkroomEnabled')) {
      data.style.color = 'black';
      data.style.background = 'white';
    } else {
      data.style.color = 'white';
      data.style.background = 'black';
    }

    // GlassFactory.addBlur(data.style);
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = 'blur(3px)';
      data.style.webkitFilter = 'blur(3px)';
    }

    // GlassFactory.addBackgroundBlur(data.style);
    if (Session.get('backgroundBlurEnabled')) {
      data.style.backdropFilter = 'blur(5px)';
    }


    // this could be a mixin/extracted to a helper function
    // Glass.autoHeight()
    if (this.props.height === "auto") {
      console.log("is autoheight");

      var autoHeight = Session.get('appHeight');

      if(Session.get('showNavbars')){
        autoHeight = autoHeight - 128;
      }
      if(!Session.get('showSearchbar')){
        autoHeight = autoHeight - 64;
      }
      if(!Session.get('mainPanelIsCard')){
        autoHeight = autoHeight - 40;
      }

      // if (Session.get('hasPagePadding')) {
      //   data.style.height = Session.get('appHeight') - 160 + 'px';
      // } else {
      //   if (Session.get('mainPanelIsCard')) {
      //     data.style.height = Session.get('appHeight') - 40 + 'px';
      //   } else {
      //     data.style.height = Session.get('appHeight') + 'px';
      //   }
      // }
      data.style.height = autoHeight + 'px';
    }


    if (this.props.width) {
      data.style.width = this.props.width;
    }
    // GlassFactory.addStyling(data);

    return data;
  }

  render(){
    return (
       <Card id={this.props.id} style={this.data.style}>
        { this.props.children }
       </Card>
    );
  }
}

ReactMixin(GlassCard.prototype, ReactMeteorData);
