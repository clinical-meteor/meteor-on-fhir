
import React  from 'react';
import ReactMixin from 'react-mixin';

import { Meteor } from 'meteor/meteor';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { AuthenticatedNavigation } from '../components/AuthenticatedNavigation';
import { PublicNavigation } from '../components/PublicNavigation';

// header
import ActionHome from 'material-ui/svg-icons/action/home';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import FlatButton from 'material-ui/FlatButton';



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
          transition: 'ease .2s'
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


    // this should all be handled by props
    // or a mixin!
    if (Session.get('darkroomEnabled')) {
      data.style.color = 'black !important';
      data.style.background = 'white';
    } else {
      data.style.color = 'white !important';
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


  clickOnBackdropBlurButton(){
    Session.toggle('backgroundBlurEnabled');
  }

  toggleDrawerActive(){
    // this is hacky
    // taping on the Panel should autoclose the sidebar (we may even gray out the panel eventually)
    // and we set a small timeout on the toggleDrawerActive to let closeOpenedSidebar() do it's thing first
    Meteor.setTimeout(function(){
      Session.toggle('drawerActive');
    }, 200);
  }

  renderNavigation(hasUser) {
    if (hasUser) {
      // return <FlatButton label="Authenticated" />;
      return <AuthenticatedNavigation />;
    } else {
      return <FlatButton label="Login" />;
      // return <PublicNavigation />;
    }
  }

  render () {
    return(
      <AppBar
        id='appHeader'
        title={this.data.app.title}
        iconElementLeft={<IconButton className='sidebarToggleButton'><NavigationMenu /></IconButton>}
        onTitleTouchTap={this.toggleDrawerActive}
        onLeftIconButtonTouchTap={this.toggleDrawerActive}
        iconElementRight={ this.renderNavigation(this.data.hasUser) }
        style={this.data.style.appbar}
        titleStyle={this.data.style.title}
      />
    );
  }
}

ReactMixin(Header.prototype, ReactMeteorData);
