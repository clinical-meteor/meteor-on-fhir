import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import Button from 'react-toolbox/lib/button';
import OpacitySlider from './OpacitySlider';
import {Session} from 'meteor/session';

import style from './appbar';


export class Footer extends React.Component {
  getMeteorData() {
    let data = {
      style: {
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
        height: '6.4rem',
        bottom: '2.4rem'
      },
      eastStyle: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        right: '0px',
        height: '6.4rem',
        padding: '0 2.4rem',
        paddingTop: '1.2rem'
      }
    };

    if (!Session.get('showNavbars')) {
      data.style.bottom = '-100px';
    }

    // this should all be handled by props
    // or a mixin!
    if (Session.get('darkroomEnabled')) {
      data.style.color = 'black';
      data.style.background = 'white';
    } else {
      data.style.color = 'white';
      data.style.background = 'black';
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = 'blur(3px)';
      data.style.webkitFilter = 'blur(3px)';
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

  render () {
    return(
       <footer id='appFooter' className={style.appbar} style={this.data.style}>
        <div className='westFooterElements' style={this.data.westStyle} >
          <Button ref='blurButton' className={style.button} icon='blur_on' floating accent onClick={this.clickOnBlurButton} style={{marginLeft: '40px'}} />
          <Button ref='darkroomButton' className={style.button} icon='exposure' floating accent onClick={this.clickOnDarkroomButton} style={{marginLeft: '20px'}} />
        </div>
        <div className='eastFooterElements' style={this.data.eastStyle} >
         <OpacitySlider />
        </div>
       </footer>
   );
  }
}

Footer.propTypes = {};
Footer.defaultProps = {};
ReactMixin(Footer.prototype, ReactMeteorData);
