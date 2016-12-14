import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { CardTitle } from 'material-ui/Card';
import User  from '/imports/api/User';
import Layout  from '/imports/ui/layouts/Layout';
import NavDrawer  from '/imports/ui/layouts/NavDrawer';
import Panel  from '/imports/ui/layouts/Panel';
import { IndexLinkContainer } from 'react-router-bootstrap';

import { PublicSidebar }  from '/imports/ui/components/PublicSidebar';
import { PatientSidebar }  from '/imports/ui/components/PatientSidebar';
import { PractitionerSidebar }  from '/imports/ui/components/PractitionerSidebar';
import { AdminSidebar }  from '/imports/ui/components/AdminSidebar';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

Session.setDefault('backgroundImagePath', 'url(\"images\/ForestInMist.jpg\")');
Session.setDefault('backgroundColor', '#eeeeee');
Session.setDefault('darkroomEnabled', false);
Session.setDefault('glassBlurEnabled', false);
Session.setDefault('backgroundBlurEnabled', false);

Session.setDefault('drawerActive', false);
Session.setDefault('drawerActive', false);

export class GlassLayout extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {

    var currentUser = new User(Meteor.user());

    let data = {
      state: {
        drawerActive: Session.get('drawerActive'),
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
        avatar: '/noAvatar.png'
      }
    };

    if (Meteor.user()) {
      data.card.title = currentUser.fullName();
      if (Meteor.user().profile) {
        //data.card.subtitle = Meteor.user().profile.birthdate;
        data.card.avatar = Meteor.user().profile.avatar;
        data.card.subtitle = 'Patient';
      }
      if (Meteor.user().roles && (Meteor.user().roles[0] === 'practitioner')) {
        data.card.subtitle = 'Practitioner';
        data.state.isAdmin = false;
      }
      if (Meteor.user().roles && (Meteor.user().roles[0] === 'sysadmin')) {
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
    Meteor.setTimeout(function(){
      Session.toggle('drawerActive');
    }, 200);
  }
  renderSidebar(isAdmin) {
    if (Meteor.user()) {
      if (isAdmin) {
        return <AdminSidebar /> ;
      } else {
        if (Meteor.user() && Meteor.user().roles && Meteor.user().roles[0] && (Meteor.user().roles[0] === 'practitioner')) {
          return <PractitionerSidebar /> ;
        } else {
          return <PatientSidebar /> ;
        }
      }
    } else {
      return <PublicSidebar /> ;
    }
  }
  closeOpenedSidebar(){
    if (Session.equals('drawerActive', true)) {
      Session.set('drawerActive', false);
    }
  }
  render(){

    return (
      <div>
        <Drawer open={this.data.state.drawerActive}
          docked={true}
          onOverlayClick={ this.toggleDrawerActive }
          >

          <IndexLinkContainer id="userIdentification" to='/myprofile' >
             <CardTitle
               avatar={this.data.card.avatar}
               title={this.data.card.title}
               subtitle={this.data.card.subtitle}
               style={{cursor: 'pointer'}}
             />
          </IndexLinkContainer>

           { this.renderSidebar(this.data.state.isAdmin) }
        </Drawer>

        <div>
          <div onClick={this.closeOpenedSidebar} style={{ flex: 1, overflowY: 'auto', width: '100%' }}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}



ReactMixin(GlassLayout.prototype, ReactMeteorData);
