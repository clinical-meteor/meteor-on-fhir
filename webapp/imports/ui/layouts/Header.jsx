
import React  from 'react';
import ReactMixin from 'react-mixin';

import { Meteor } from 'meteor/meteor';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { AuthenticatedNavigation } from '../components/AuthenticatedNavigation';
import { PublicNavigation } from '../components/PublicNavigation';

import AppBar from '/imports/ui/layouts/AppBar';

// header
import ActionHome from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import FlatButton from 'material-ui/FlatButton';



Sidebar = {
  lastUpdate: new Date(),
  toggle: function(){
    let currentUpdate = new Date();
    let timeDiff = currentUpdate - this.lastUpdate;
    if (timeDiff > 1000) {
      Session.toggle('drawerActive');
      console.log("timeDiff", timeDiff);
    }

    this.lastUpdate = currentUpdate;
  }
}

export class Header extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        appbar: {
          position: 'fixed',
          top: '0px',
          width: '100%',
          opacity: Session.get('globalOpacity'),
          WebkitTransition: 'ease .2s',
          transition: 'ease .2s',
          background: 'white'
        },
        title: {
          color: 'black',
          cursor: 'pointer'
        }
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
      },
      isLogged: false
    };

    if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.title) {
      data.app.title = Meteor.settings.public.title;
    }

    if (Meteor.userId()) {
      data.isLoggedIn = true;
    }

    if (!Session.get('showNavbars')) {
      data.style.top = '-60px';
    }


    // // this should all be handled by props
    // // or a mixin!
    // if (Session.get('darkroomEnabled')) {
    //   data.style.appbar.color = 'black !important';
    //   data.style.appbar.background = 'white';
    // } else {
    //   data.style.appbar.color = 'white !important';
    //   data.style.appbar.background = 'black';
    // }

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


  clickOnBackdropBlurButton(){
    Session.toggle('backgroundBlurEnabled');
  }

  toggleDrawerActive(){
    console.log("toggleDrawerActive");
    //Session.toggle('drawerActive');

    // this is hacky
    // taping on the Panel should autoclose the sidebar (we may even gray out the panel eventually)
    // and we set a small timeout on the toggleDrawerActive to let closeOpenedSidebar() do it's thing first
    Meteor.setTimeout(function(){
      //Sidebar.toggle();
      if (Session.equals('drawerActive', false)) {
        Session.set('drawerActive', true);
      }
    }, 200);
  }

  renderNavigation(hasUser) {
    if (hasUser) {
      // return <FlatButton label="Authenticated" />;
      return <AuthenticatedNavigation />;
    } else {
      // return(
      //   <div id="publicNavigation">
      //     <FlatButton id='loginLink' label="Login" style={this.data.style.title} href='/login' />
      //     <FlatButton id='signupLink' label="Register" style={this.data.style.title} href='/signup' />
      //   </div>
      // );
      return <PublicNavigation />;
    }
  }

  render () {
    return(
      <AppBar
        id="appHeader"
        title={this.data.app.title}
        iconElementLeft={<IconButton><NavigationClose style={this.data.style.title} /></IconButton>}
        onTitleTouchTap={this.toggleDrawerActive}
        iconStyleLeft={this.data.style.title}
        iconElementRight={ this.renderNavigation(this.data.hasUser) }
        style={this.data.style.appbar}
        titleStyle={this.data.style.title}
        titleId='sidebarToggleButton'
      />
    );
  }
}

ReactMixin(Header.prototype, ReactMeteorData);
