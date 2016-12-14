import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ImageBlurOn from 'material-ui/svg-icons/image/blur-on';
import ImageExposure from 'material-ui/svg-icons/image/exposure';

import OpacitySlider from './OpacitySlider';
import {Session} from 'meteor/session';

import style from './appbar';

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

    // this should all be handled by props
    // or a mixin!
    if (Session.get('darkroomEnabled')) {
      data.footerStyle.color = 'black';
      data.footerStyle.background = 'white';
    } else {
      data.footerStyle.color = 'white';
      data.footerStyle.background = 'black';
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.footerStyle.filter = 'blur(3px)';
      data.footerStyle.webkitFilter = 'blur(3px)';
    }

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
          <FloatingActionButton ref='blurButton' onClick={this.clickOnBlurButton} style={{marginLeft: '40px', height: '56px'}} secondary={true}>
            <ImageBlurOn style={{color: 'white'}} />
          </FloatingActionButton>
          <FloatingActionButton ref='darkroomButton' onClick={this.clickOnDarkroomButton} style={{marginLeft: '20px', height: '56px'}} secondary={true}>
            <ImageExposure style={{color: 'white'}} />
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
       <footer id='appFooter' className={style.appbar} style={this.data.footerStyle}>
        <div className='westFooterElements' style={this.data.westStyle} >
          { this.renderWestNavbar(this.data.displayThemeNavbar) }
        </div>
        <div className='eastFooterElements' style={this.data.eastStyle} >
          { this.renderEastNavbar(this.data.displayThemeNavbar) }
        </div>
       </footer>
   );
  }
}

Footer.propTypes = {};
Footer.defaultProps = {};
ReactMixin(Footer.prototype, ReactMeteorData);
