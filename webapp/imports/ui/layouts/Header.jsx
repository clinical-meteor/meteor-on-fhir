import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import ActionReorder from 'material-ui/svg-icons/action/reorder';
import AppBar from '/imports/ui/layouts/AppBar';

import { AuthenticatedNavigation } from '../components/AuthenticatedNavigation';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Glass } from 'meteor/clinical:glass-ui';

// header
import { FlatButton, TextField } from 'material-ui';
import { Meteor } from 'meteor/meteor';
import { PublicNavigation } from '../components/PublicNavigation';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { Col, Grid, Row } from 'react-bootstrap';

import { get } from 'lodash';
import { FaMars, FaVenus, FaMercury, FaTransgender  } from 'react-icons/fa';

import { Patient } from 'meteor/clinical:hl7-resource-patient';

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

Session.setDefault('mapName', false)
Session.setDefault('searchbarWidth', '100%')

export class Header extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        searchbar: {},
        searchbarInput: Glass.darkroom({
          left: '0px', 
          width: '100%',
          fontWeight: '150%',
          visibility: 'hidden'
        }),
        appbar: {
          position: 'fixed',
          top: '0px',
          width: '100%',
          opacity: Session.get('globalOpacity'),
          WebkitTransition: 'ease .2s',
          transition: 'ease .2s',
          background: 'white',
          paddingLeft: '0px',
          height: '65px'
        },
        title: Glass.darkroom({
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          top: '0px',
          cursor: 'pointer',
          marginLeft: '70px',
          position: 'absolute'
        })
      },
      app: {
        title: ''
      },
      isLogged: false,
      selectedPatient: false,
      query: {}
    };

    if(Session.equals('searchbarWidth', '100%')){
      data.style.searchbar = Glass.darkroom({
        position: 'fixed',
        top: '0px',
        width: '100%',
        opacity: Session.get('globalOpacity'),
        WebkitTransition: 'ease .2s',
        transition: 'ease .2s',
        borderWidth: '3px 0px 0px 2px',
        height: '220px',
        zIndex: 1000,
        borderBottom: '1px solid lightgray'
      }) 
    } else {
      data.style.searchbar = Glass.darkroom({
        position: 'fixed',
        top: '0px',
        width: Session.get('searchbarWidth'),
        opacity: Session.get('globalOpacity'),
        WebkitTransition: 'ease .2s',
        transition: 'ease .2s',
        borderWidth: '3px 0px 0px 2px',
        borderBottomRightRadius: '65px',
        transformOrigin: 'right bottom',
        paddingRight: '200px',
        height: '220px',
        zIndex: 1000,
        borderBottom: '1px solid lightgray'
      }) 
    }

    if(Session.get('selectedPatientId')){
      data.query._id = Session.get('selectedPatientId');
      data.selectedPatientId = Session.get('selectedPatientId');
      data.selectedPatient = Patients.findOne(data.query);
    } 

    if(Session.get('showSearchbar')){
      data.style.searchbar.height = '220px';
      data.style.searchbar.display = 'flex';
      data.style.searchbarInput.visibility = 'visible';

      if(Session.get('selectedPatientId')){
        data.style.searchbar.height = '220px';
      }
    } else {
      data.style.searchbar.height = 0;      
      data.style.searchbar.display = 'none';
      data.style.searchbarInput.visibility = 'hidden';
    }
    if(Session.get('showNavbars')){
      data.style.searchbar.top = '66px';      
    } else {
      data.style.searchbar.top = '0px';
    }

    if (get(Meteor, 'settings.public.title')) {
      data.app.title = get(Meteor, 'settings.public.title');
    }

    if(Session.get('mapName')){
      data.app.title = data.app.title + ' - ' + Session.get('mapName');
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

    console.log('Header.data', data)

    return data;
  }
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
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
    }, 300);
  }

  renderNavigation(hasUser) {
    if(get(Meteor, 'settings.public.home.showRegistration')){
      if(!['signup', 'signin', '/signup', '/signin'].includes(location.pathname)){
        if (hasUser) {
          return <AuthenticatedNavigation />;
        } else {
          return <PublicNavigation />;
        }    
      }
    }
  }

  goHome(){
    console.log('this.props.history', this.props.history);

    if(this.props.history){
      // not every wants the hexgrid menu, so we make sure it's configurable in the Meteor.settings file
      if(get(Meteor, 'settings.public.defaults.route')){

        // get the default route
        let defaultRoute = get(Meteor, 'settings.public.defaults.route', '/')
        
        // if there are user role specific default routes defined in our settings file
        // send the user to the role specific route
      
        if (Roles.userIsInRole(Meteor.userId(), 'patient')) {
          this.props.history.push(get(Meteor, 'settings.public.defaults.routes.patientHomePage', defaultRoute))
        } else if (Roles.userIsInRole(Meteor.userId(), 'practitioner')) {
          this.props.history.push(get(Meteor, 'settings.public.defaults.routes.practitionerHomePage', defaultRoute))
        } else if (Roles.userIsInRole(Meteor.userId(), 'sysadmin')) {
          this.props.history.push(get(Meteor, 'settings.public.defaults.routes.adminHomePage', defaultRoute))
        } else {

          // otherwise, just send them to the default route
          this.props.history.push(defaultRoute);
        }
      } else {
        this.props.history.push('/');      
      }
    }
  }
  setGeojsonUrl(event, text){
    console.log('setGeojsonUrl', text);

    Session.set('geojsonUrl', text)
  }
  setPatientSearch(event, text){
    console.log('setPatientSearch', text);

    Session.set('patientSearch', text);

    browserHistory.push('/patients')
  }
  mapMyAddress(){
    if(get(Meteor.user(), 'profile.locations.home.position.latitude') && get(Meteor.user(), 'profile.locations.home.position.longitude')){
      if(this.props.history){
        this.props.history.push('/maps');
      }
    }        
  }
  menuIconClicked(event, text){
    console.log('menuIconClicked', event, text)

    Session.set('drawerActive', true)

    // alert('foo!')

    // if(Session.get('drawerActive')){
    //   Session.set('drawerActive', false)
    // } else {
    //   Session.set('drawerActive', true)
    // }
  }
  render () {

    console.log('Header.this.props', this.props)

    var menuIcon;
    if(get(Meteor, 'settings.public.defaults.header.menuIcon')){
      menuIcon = <img 
        id='sidebarToggleButton'
        name='sidebarToggleButton'
        src={ get(Meteor, 'settings.public.defaults.header.menuIcon') } 
        onClick={ this.toggleDrawerActive }
        style={{
          position: 'absolute',
          top: '8px',
          left: '10px',
          cursor: 'pointer',
          zIndex: 1000
      }}/>
    } else {
      menuIcon = <ActionReorder 
          id='sidebarToggleButton'
          name='sidebarToggleButton'
          style={{marginTop: '20px', marginLeft: '25px', marginRight: '10px', left: '0px', position: 'absolute', cursor: 'pointer'}}
          onClick={this.toggleDrawerActive}
        />
    }

    let demographicsBar;
    if(get(this, 'data.selectedPatient')){
      

      let activePatient = new Patient(this.data.selectedPatient);
      let patientDisplay = activePatient.display();

      let genderIcon = "";
      let genderStyle = {
        verticalAlign: 'bottom'
      }
      switch (get(activePatient, 'gender', '')) {
        case 'male':
          // genderIcon = <FaMars style={genderStyle} />;
          genderIcon = "♂";
          break;
        case 'female':
          // genderIcon = <FaVenus style={genderStyle} />;
          genderIcon = "♀";
          break;
        case 'other':
          // genderIcon =  <FaMercury style={genderStyle} />;
          genderIcon = "☿"
          break;    
        default:
          break;
      }

      let birthdateInfo = "";
      if(get(activePatient, 'birthDate')){
        birthdateInfo = moment().diff(moment(get(activePatient, 'birthDate', '')).format("YYYY-MM-DD"), 'years') + "yr"
      }

      demographicsBar = <div id='patientDemographicsBar' style={{color: '#000000', width: '100%'}}>        
        <h2 style={{fontWeight: 200, paddingLeft: '40px'}}>{patientDisplay}
          <span style={{fontWeight: 200, color: 'gray', fontSize: '80%', paddingLeft: '20px'}}>
            {birthdateInfo} {genderIcon}          
          </span>        
        </h2>
        <Row style={{paddingLeft: '40px'}}>
          <Col md={6}>
            <TextField
              hintText="Referring Physician"
              fullWidth
            />
            <TextField
              hintText="Referring Clinic"
              fullWidth
            />
            <TextField
              hintText="Parent/Guardian"
              fullWidth
            />
          </Col>
          <Col md={6}>
            <TextField
              hintText="Speciality"
              fullWidth
            />
            <TextField
              hintText="Date of Last Exam"
              fullWidth
            />
            <TextField
              hintText="Relationship"
              fullWidth
            />
          </Col>
        </Row>
      </div>
    } else {
      demographicsBar = <div id='patientSearchBar' style={{width: '100%', paddingLeft: '40px', paddingRight: '40px', paddingTop: '60px', height: '220px'}}>
          <TextField
          hintText="Patient Name"
          style={this.data.style.searchbarInput}
          fullWidth
        />
        <FlatButton 
          label='Search' 
          onClick={ this.setPatientSearch.bind(this)}
          fullWidth
        />
        {/* <FlatButton 
          label='Search' 
          onClick={this.mapMyAddress.bind(this)}
          /> */}
      </div>
    }

    return(
      <div>
        <AppBar
          id="appHeader"
          title={this.data.app.title}
          onTitleTouchTap={this.goHome.bind(this)}
          iconStyleLeft={this.data.style.title}
          iconElementRight={ this.renderNavigation(this.data.hasUser) }
          style={this.data.style.appbar}
          titleStyle={this.data.style.title}
        >
          { menuIcon }
        </AppBar>

        <div id="appSearchBar" style={this.data.style.searchbar} >
          {demographicsBar}
        </div>
          
      </div>
    );
  }
}
Header.childContextTypes = {
  muiTheme: PropTypes.object
};

ReactMixin(Header.prototype, ReactMeteorData);
export default Header;
