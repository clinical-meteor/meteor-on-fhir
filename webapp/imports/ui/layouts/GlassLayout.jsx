import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import IconButton  from 'react-toolbox/lib/button';
import { CardTitle } from 'react-toolbox/lib/card';
import User  from '/imports/api/User';
import Layout  from '/imports/ui/layouts/Layout';
import NavDrawer  from '/imports/ui/layouts/NavDrawer';
import Panel  from '/imports/ui/layouts/Panel';
import Sidebar  from '/imports/ui/layouts/Sidebar';
import { IndexLinkContainer } from 'react-router-bootstrap';

import { PublicSidebar }  from '/imports/ui/components/PublicSidebar';
import { AuthenticatedSidebar }  from '/imports/ui/components/AuthenticatedSidebar';
import { AdminSidebar }  from '/imports/ui/components/AdminSidebar';

Session.setDefault('backgroundImagePath', 'url(\"images\/ForestInMist.jpg\")');
Session.setDefault('backgroundColor', '#eeeeee');
Session.setDefault('darkroomEnabled', false);
Session.setDefault('glassBlurEnabled', false);
Session.setDefault('backgroundBlurEnabled', false);

Session.setDefault('drawerActive', false);
Session.setDefault('drawerPinned', false);
Session.setDefault('sidebarPinned', false);

export class GlassLayout extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {

    var currentUser = new User(Meteor.user());
    //console.log('currentUser', currentUser);
    //console.log('currentUser.fullName()', currentUser.fullName());

    let data = {
      state: {
        drawerActive: Session.get('drawerActive'),
        drawerPinned: Session.get('drawerPinned'),
        sidebarPinned: Session.get('sidebarPinned'),
        isAdmin: false
      },
      style: {
        'width': '100%',
        'height': '100%',
        'position': 'absolute',
        'backgroundSize': 'cover',
        'WebkitBackgroundSize': 'cover',
        'MozBackgroundSize': 'cover',
        'OBackgroundSize': 'cover'
      },
      card: {
        title: 'Please log in',
        subtitle: 'Basic User',
        avatar: 'https://placeimg.com/80/80/animals'
      }
    };

    if (Meteor.user()) {
      data.card.title = currentUser.fullName();
      if (Meteor.user().profile) {
        data.card.subtitle = Meteor.user().profile.birthdate;
        data.card.avatar = Meteor.user().profile.avatar;
        data.card.subtitle = 'Basic User';
      }
      if (Meteor.user().roles && (Meteor.user().roles[0] === 'admin')) {
        data.card.subtitle = 'Admin';
        data.state.isAdmin = true;
      }
    }

    if (Session.get('backgroundColor')) {
      data.style.background = Session.get('backgroundColor');
    }

    if (Session.get('backgroundImagePath')) {
      data.style.WebkitBackgroundSize = 'cover';
      data.style.MozBackgroundSize = 'cover';
      data.style.OBackgroundSize = 'cover';
      data.style.backgroundSize = 'cover';
      data.style.backgroundImagePath = Session.get('backgroundImagePath');
    }

    return data;
  }
  toggleDrawerActive(){
    Session.toggle('drawerPinned');
  }
  toggleSidebar() {
    Session.toggle('sidebarPinned');
  }
  renderSidebar(isAdmin) {
    if (Meteor.user()) {
      if (isAdmin) {
        return <AdminSidebar /> ;
      } else {
        return <AuthenticatedSidebar /> ;
      }
    } else {
      return <PublicSidebar /> ;
    }
  }
  render(){

    return (
      <Layout>
        <NavDrawer active={this.data.state.drawerActive}
          pinned={this.data.state.drawerPinned} permanentAt='xxxl'
          onOverlayClick={ this.toggleDrawerActive }
          >

          <IndexLinkContainer to='/myprofile' >
             <CardTitle
               avatar={this.data.card.avatar}
               title={this.data.card.title}
               subtitle={this.data.card.subtitle}
             />
          </IndexLinkContainer>

           { this.renderSidebar(this.data.state.isAdmin) }
        </NavDrawer>

        <Panel pinned={this.data.state.drawerPinned} >
          <div style={{ flex: 1, overflowY: 'auto', width: '100%' }}>
            {this.props.children}
          </div>
        </Panel>
        <Sidebar pinned={ this.data.state.sidebarPinned } width={ 5 }>
          <div><IconButton icon='close' onClick={ this.toggleSidebar }/></div>
          <div style={{ flex: 1 }}>
            <p>Supplemental content goes here.</p>
          </div>
        </Sidebar>
      </Layout>
    );
  }
}



GlassLayout.propTypes = {};
GlassLayout.defaultProps = {};
ReactMixin(GlassLayout.prototype, ReactMeteorData);
