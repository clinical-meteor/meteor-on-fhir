
import React  from 'react';
import ReactMixin from 'react-mixin';

import { Meteor } from 'meteor/meteor';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { AuthenticatedNavigation } from '../components/AuthenticatedNavigation';
import { PublicNavigation } from '../components/PublicNavigation';

import AppBar from '/imports/ui/layouts/AppBar';

// header
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import Glass from '/imports/ui/Glass';

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
      data.style.appbar.top = '-6.4em';
    }


    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);

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
      return <AuthenticatedNavigation />;
    } else {
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
