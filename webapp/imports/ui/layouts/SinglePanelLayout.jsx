import { AdminSidebar }  from '/imports/ui/components/AdminSidebar';
import { CardHeader, Drawer } from 'material-ui';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Meteor } from 'meteor/meteor';
import { PatientSidebar }  from '/imports/ui/components/PatientSidebar';
import { PractitionerSidebar }  from '/imports/ui/components/PractitionerSidebar';
import { PublicSidebar }  from '/imports/ui/components/PublicSidebar';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import { Session } from 'meteor/session';
import User from '/imports/api/User';
import MenuItem from '/imports/ui/components/MenuItem';
import MenuPatientSummary from '/imports/ui/components/MenuPatientSummary';

import { has, get } from 'lodash';

Session.setDefault('backgroundImagePath', 'url(\"images\/ForestInMist.jpg\")');
Session.setDefault('backgroundColor', '#eeeeee');
Session.setDefault('darkroomEnabled', false);
Session.setDefault('glassBlurEnabled', false);
Session.setDefault('backgroundBlurEnabled', false);

Session.setDefault('drawerActive', false);
Session.setDefault('drawerActive', false);


export class SinglePanelLayout extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {

    var currentUser = new User(Meteor.user());

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
  }
  renderSidebar(isAdmin) {
    if (Meteor.user()) {
      if (isAdmin) {
        // return <AdminSidebar /> ;
      } else {
        if (get(Meteor.user(), 'roles[0]') === 'practitioner') {
          // return <PractitionerSidebar /> ;
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
      <div id='SinglePanelLayout'>
        <Drawer
          open={this.data.state.drawerActive}
          docked={this.data.state.dockedSidebar}
          onRequestChange={ this.closeOpenedSidebar }
          >

          <div onClick={ this.closeOpenedSidebar }>

              <IndexLinkContainer id="userIdentification" to='/myprofile' >
                 <MenuPatientSummary>
                  <CardHeader
                    id='patientSummaryCard'
                    title={this.data.card.title}
                    subtitle={this.data.card.subtitle}
                    style={{cursor: 'pointer'}}
                  />
                </MenuPatientSummary>
              </IndexLinkContainer>

              { this.renderSidebar(this.data.state.isAdmin) }

          </div>
        </Drawer>

        <div id='mainPanel'>
          <div onClick={this.closeOpenedSidebar} style={{ flex: 1, overflowY: 'auto', width: '100%' }}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

ReactMixin(SinglePanelLayout.prototype, ReactMeteorData);
export default SinglePanelLayout;