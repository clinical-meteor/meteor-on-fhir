import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ImageBlurOn from 'material-ui/svg-icons/image/blur-on';
import ImageExposure from 'material-ui/svg-icons/image/exposure';

// import ImageBlurOn from 'react-material-icons/icons/image/blur-on';
// import ImageExposure from 'react-material-icons/icons/image/exposure';

import {Session} from 'meteor/session';

import OpacitySlider from '../components/OpacitySlider';

// footer
import AppBar from 'material-ui/AppBar';
import Glass from '/imports/ui/Glass';

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
      displayThemeNavbar: false
    };

    if (Session.get('showThemingControls')) {
      data.displayThemeNavbar = Session.get('showThemingControls');
      data.westStyle.bottom = '2.4rem';
      //data.eastStyle.bottom = '2.4rem';
    }

    if (!Session.get('showNavbars')) {
      data.footerStyle.bottom = '-100px';
    }



    data.style = Glass.blur(data.style);
    data.footerStyle = Glass.darkroom(data.footerStyle);

    //phone layout
    if (Session.get('appWidth') < 768) {
      data.westStyle.visibility = 'hidden';
      data.eastStyle.visibility = 'hidden';
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
        <div>
          <FloatingActionButton className='blurButton' ref='blurButton' onClick={this.clickOnBlurButton} style={{marginLeft: '40px', height: '56px'}} secondary={true}>
            <ImageBlurOn className='ImageBlurOn' />
          </FloatingActionButton>
          <FloatingActionButton className='darkroomButton' ref='darkroomButton' onClick={this.clickOnDarkroomButton} style={{marginLeft: '20px', height: '56px'}} secondary={true}>
            <ImageExposure className='ImageExposure' />
          </FloatingActionButton>
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

        </div>
      );
    }
  }

  render () {
    return(
      <AppBar
        id='appFooter'
        iconElementLeft={ this.renderWestNavbar(this.data.displayThemeNavbar) }
        iconElementRight={ this.renderEastNavbar(this.data.displayThemeNavbar) }
        style={this.data.footerStyle}
        titleStyle={{color: 'black'}}
      />
   );
  }
}

ReactMixin(Footer.prototype, ReactMeteorData);
