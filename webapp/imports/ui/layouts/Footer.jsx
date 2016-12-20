import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ImageBlurOn from 'material-ui/svg-icons/image/blur-on';
import ImageExposure from 'material-ui/svg-icons/image/exposure';
import FlatButton from 'material-ui/FlatButton';

import {Session} from 'meteor/session';

import OpacitySlider from '../components/OpacitySlider';

// footer
import AppBar from 'material-ui/AppBar';
import Glass from '/imports/ui/Glass';
import { browserHistory } from 'react-router';
import { ToolbarTitle } from 'material-ui/Toolbar';

Session.setDefault('showThemingControls', false);

export class Footer extends React.Component {
  getMeteorData() {
    let data = {
      footerStyle: {
        position: 'fixed',
        bottom: '0px',
        width: '100%',
        height: '6.4rem',
        alignItems: 'center',
        WebkitTransition: 'ease .2s',
        transition: 'ease .2s',
        margin: '0px',
        opacity: Session.get('globalOpacity')
      },
      westStyle: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        left: '0px',
        height: '6.4rem'
      },
      eastStyle: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        right: '0px',
        height: '6.4rem',
        padding: '0 2.4rem',
        paddingTop: '1.2rem'
      },
      displayThemeNavbar: false,
      status: ''
    };

    if (Meteor.status) {
      data.status = Meteor.status().status;
    }

    if (Session.get('showThemingControls')) {
      data.displayThemeNavbar = Session.get('showThemingControls');
      data.westStyle.bottom = '2.4rem';
    }

    data.style = Glass.blur(data.style);
    data.footerStyle = Glass.darkroom(data.footerStyle);

    //phone layout
    if (Session.get('appWidth') < 768) {
      data.westStyle.visibility = 'hidden';
      data.eastStyle.visibility = 'hidden';
    }

    if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.defaults && Meteor.settings.public.defaults.disableFooter) {
      //console.log("Meteor.settings.defaults.disableFooter");

      data.footerStyle.display = 'none !important';
      data.footerStyle.visibility = 'hidden !important';
    } else {
      if (!Session.get('showNavbars')) {
        data.footerStyle.bottom = '-100px';
      }
    }

    return data;
  }

  clickOnDarkroomButton(){
    Session.toggle('darkroomEnabled');
  }

  clickOnBlurButton(){
    Session.toggle('glassBlurEnabled');
  }


  renderWestNavbar(displayThemeNavbar){
    if (displayThemeNavbar) {
      // the user has pressed ctrl-cmd-t and is looking at theming controls
      return (
        <div style={{marginTop: '-8px'}}>
          <FlatButton label='privacy screen' className='blurButton' ref='blurButton' onClick={this.clickOnBlurButton} style={{marginLeft: '40px'}} ></FlatButton>
          <FlatButton label='darkroom' className='darkroomButton' ref='darkroomButton' onClick={this.clickOnDarkroomButton} style={{marginLeft: '20px'}} ></FlatButton>
        </div>
      );
    } else {

      if (Meteor.userId() && (Session.equals('pathname', '/'))) {
        // the user is logged in as a normal user
        return (
          <div></div>
        );
      } else {
        // anything else
        return (
          <div></div>
        );

      }
    }
  }
  renderEastNavbar(displayThemeNavbar){
    if (displayThemeNavbar) {
      return (
        <OpacitySlider />
      );
    } else {
      return (
        <div>
          <ToolbarTitle
            id='authenticatedUsername'
            text={this.data.status}
            style={{fontSize: '18px', top: '-4px', cursor: 'pointer'}}
            onTouchTap={this.openInfo }
          />
        </div>
      );
    }
  }
  openInfo(){
    browserHistory.push('/info');
  }
  render () {
    return(
      <div id='appFooter' style={this.data.footerStyle}>
        <AppBar
          iconElementLeft={ this.renderWestNavbar(this.data.displayThemeNavbar) }
          iconElementRight={ this.renderEastNavbar(this.data.displayThemeNavbar) }
          style={this.data.footerStyle}
          titleStyle={{color: 'black'}}
        />
      </div>
   );
  }
}

ReactMixin(Footer.prototype, ReactMeteorData);
