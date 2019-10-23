import { AdminSidebar }  from '/imports/ui/components/AdminSidebar';
import { CardHeader, Drawer } from 'material-ui';
// import { Link, LinkContainer } from 'react-router-bootstrap';
import { Link } from "react-router-dom";


import { Meteor } from 'meteor/meteor';
import { ProfileSidebar }  from '/imports/ui/components/ProfileSidebar';
import { PatientSidebar }  from '/imports/ui/components/PatientSidebar';
import { PractitionerSidebar }  from '/imports/ui/components/PractitionerSidebar';
import { PublicSidebar }  from '/imports/ui/components/PublicSidebar';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import { Session } from 'meteor/session';
import User from 'meteor/clinical:user-model';
import MenuItem from '/imports/ui/components/MenuItem';
import MenuPatientSummary from '/imports/ui/components/MenuPatientSummary';

import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import { has, get } from 'lodash';

Object.keys(Package).forEach(function(packageName){
  // we can even override entire pages
  if(Package[packageName].PractitionerSidebar){
    PractitionerSidebar = Package[packageName].PractitionerSidebar;
  }
});



Session.setDefault('backgroundImagePath', 'url(\"images\/ForestInMist.jpg\")');
Session.setDefault('backgroundColor', '#eeeeee');
Session.setDefault('darkroomEnabled', false);
Session.setDefault('glassBlurEnabled', false);
Session.setDefault('backgroundBlurEnabled', false);

Session.setDefault('drawerActive', false);
Session.setDefault('drawerActive', false);


export class SidebarTray extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: false,
      left: false,
      bottom: false,
      right: false,
    };
  }
  getMeteorData() {

    // var currentUser = new User(Meteor.user());
    var currentUser = Meteor.user();

    let data = {
      state: {
        drawerActive: Session.get('drawerActive'),
        dockedSidebar: false,
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
      },
      isAdmin: false
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

    if(get(Meteor, 'settings.public.defaults.sidebar.docked')){
      data.state.dockedSidebar = get(Meteor, 'settings.public.defaults.sidebar.docked');
    }

    return data;
  }
  toggleDrawerActive(){
    Meteor.setTimeout(function(){
      Session.toggle('drawerActive');
    }, 200);
    // this.setState({
    //   [side]: open,
    // });
  }
  toggleDrawer = (side, isOpen) => () => {
    Session.set('drawerActive', isOpen)
    // this.setState({
    //   left: !this.state.left
    // });
  };
  renderSidebar(isAdmin) {
    
    if (Meteor.user()) {
      if (isAdmin) {
        return <AdminSidebar /> ;
      } else {
        if (get(Meteor.user(), 'roles[0]') === 'practitioner') {
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
    //Sidebar.close();
    if (Session.equals('drawerActive', true)) {
      Session.set('drawerActive', false);
    }
  }
  render(){

    return (
      <div id='SidebarTray'>

        <SwipeableDrawer
          open={this.data.state.drawerActive}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >



          {/* <Drawer
            open={this.data.state.drawerActive}
            docked={this.data.state.dockedSidebar}
            onRequestChange={ this.closeOpenedSidebar }
            > */}

            <div onClick={ this.closeOpenedSidebar }>

                <Link id="userIdentification" to='/myprofile' >
                  <MenuPatientSummary>
                    <CardHeader
                      id='patientSummaryCard'
                      title={this.data.card.title}
                      subtitle={this.data.card.subtitle}
                      style={{cursor: 'pointer'}}
                    />
                  </MenuPatientSummary>
                </Link>

                { this.renderSidebar(this.data.state.isAdmin) }

            </div>
          {/* </Drawer> */}
        </SwipeableDrawer>

        <div id='mainPanel'>
          <div onClick={this.closeOpenedSidebar} style={{ flex: 1, overflowY: 'auto', width: '100%' }}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

ReactMixin(SidebarTray.prototype, ReactMeteorData);
export default SidebarTray;