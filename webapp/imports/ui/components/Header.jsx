import IconButton from 'react-toolbox/lib/button';
import React  from 'react';
import ReactMixin from 'react-mixin';

import { Meteor } from 'meteor/meteor';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { AuthenticatedNavigation } from './AuthenticatedNavigation';
import { PublicNavigation } from './PublicNavigation';
import style from './appbar';


export class Header extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        position: 'fixed',
        top: '0px',
        width: '100%',
        display: 'flex',
        // height: '6.4rem',
        alignItems: 'center',
        padding: '0 2.4rem',
        opacity: Session.get('globalOpacity'),
        WebkitTransition: 'ease .2s',
        transition: 'ease .2s',
        zIndex: 100
      },
      westStyle: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        left: '0px'
      },
      eastStyle: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        right: '0px',
        height: '6.4rem',
        paddingLeft: '1.2rem',
        paddingRight: '1.2rem',
        paddingTop: '0.6rem'
      },
      app: {
        title: ''
      }
    };

    if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.title) {
      data.app.title = Meteor.settings.public.title;
    }

    if (!Session.get('showNavbars')) {
      data.style.top = '-60px';
      // data.style.top = '-6.4rem';
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

    if (Meteor.user()) {
      data.hasUser = true;
    } else {
      data.hasUser = false;
    }

    return data;
  }

  toggleSidebar() {
    Session.toggle('sidebarPinned');
  }

  clickOnBackdropBlurButton(){
    Session.toggle('backgroundBlurEnabled');
  }

  toggleDrawerActive(){
    // this is hacky
    // taping on the Panel should autoclose the sidebar (we may even gray out the panel eventually)
    // and we set a small timeout on the toggleDrawerActive to let closeOpenedSidebar() do it's thing first
    Meteor.setTimeout(function(){
      Session.toggle('drawerPinned');
    }, 200);
  }

  renderNavigation(hasUser) {
    if (hasUser) {
      return <AuthenticatedNavigation />;
    } else {
      return <PublicNavigation />;
    }
  }

  render () {
    return(
      <header className={style.appbar} flat style={this.data.style}>
        <IconButton id='sidebarToggleButton' icon='menu' floating accent onClick={ this.toggleDrawerActive } style={{zIndex:10000}}/>
        <h1 className={style.title} style={{paddingLeft: '20px'}}>
          {this.data.app.title}
        </h1>
        <div className="eastHeaderElements" style={this.data.eastStyle} >
          { this.renderNavigation(this.data.hasUser) }
        </div>
      </header>
    );
  }
}

Header.propTypes = {

};
Header.defaultProps = {

};
ReactMixin(Header.prototype, ReactMeteorData);
