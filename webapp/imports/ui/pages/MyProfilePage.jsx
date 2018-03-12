import { CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import { Col, Grid, Row } from 'react-bootstrap';
import { Tab, Tabs } from 'material-ui/Tabs';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { has, get } from 'lodash';

import { Accounts } from 'meteor/accounts-base';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import { FontIcon } from 'material-ui/FontIcon';

import { VerticalCanvas, GlassCard, Glass, DynamicSpacer } from 'meteor/clinical:glass-ui';
import { Meteor } from 'meteor/meteor';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';

import { browserHistory } from 'react-router';
import { removeUserById } from '/imports/api/users/methods';

let defaultState = {
  index: 0,
  hasConfirmedDelete: false,
  wantsToDelete: false,
  increment: 0,
  confirm: '',
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
};
Session.setDefault('myProfileState', defaultState);

export class MyProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  getMeteorData() {

    let data = {
      style: {
        //opacity: Session.get('globalOpacity')
        tab: {
          borderBottom: '1px solid lightgray'
        },
        title: {
          left: '0px'
        },
        avatar: {
          position: 'absolute',
          zIndex: 10,
          display: 'inline-flex',
          borderRadius: '50%',
          transition: '1s'
        }
      },
      state: {
        index: 0,
        hasConfirmedDelete: false,
        wantsToDelete: false,
        confirmed: '',
        increment: 0,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      user: {
        _id: '',
        given: '',
        familiy: '',
        email: '',
        avatar: '',
        zip: '',
        longitude: '',
        latitude: '',
        profileImage: 'noAvatar.png',
        birthdate: ''
      },
      header: {
        avatar: 'noAvatar.png'
      }, 
      address: {
        line: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        latitude: '',
        longitude: '',
        latlng: '0.0, 0.0'
      },
      ccd: {
        AllergyIntolerances: 0,
        CarePlans: 0,
        Conditions: 0,
        Devices: 0,
        DiagnosticReports: 0,
        Goals: 0,
        ImagingStudies: 0,
        Immunizations: 0,
        Locations: 0,
        Medications: 0,
        MedicationStatements: 0,
        Observations: 0,
        Patients: 0,
        Persons: 0,
        Practitioners: 0,
        Procedures: 0,
        RelatedPersons: 0,
        Sequences: 0
      }
    };

    data.style.tab = Glass.darkroom(data.style.tab);


    if (Session.get('myProfileState')) {
      data.state = Session.get('myProfileState');
    }

    if (Meteor.user()) {
      data.user = {
        _id: Meteor.userId(),
        email: Meteor.user().emails[0].address,
        avatar: Meteor.user().profile.avatar,
        gender: '',
        birthdate: '',
        zip: '',
        longitude: '',
        latitude: '',
        profileImage: Meteor.user().profile.avatar
      };      

      // if (Meteor.user().profile && Meteor.user().profile.avatar) {
      if(get(Meteor.user(), 'profile.avatar')) {
        data.user.profileImage = Meteor.user().profile.avatar;
        data.header.avatar = Meteor.user().profile.avatar;
      } else {
        data.user.profileImage = 'thumbnail.png';
        data.header.avatar = 'thumbnail.png';
      }

      // if (Meteor.user() && Meteor.user().profile && Meteor.user().profile.name) {
      if(get(Meteor.user(), 'profile.name')) {
        data.user.given = get(Meteor.user(), 'profile.name.given');
        data.user.family = get(Meteor.user(), 'profile.name.family')
        data.user.fullName = get(Meteor.user(), 'profile.name.given') + ' ' + get(Meteor.user(), 'profile.name.family');
      } else {
        data.user.given = '';
        data.user.family = '';
        data.user.fullName = '';
      }

      if(get(Meteor.user(), 'profile.gender')) {
        data.user.gender = get(Meteor.user(), 'profile.gender');
      }

      
      // if(Meteor.user() && Meteor.user().profile && Meteor.user().profile.locations  && Meteor.user().profile.locations.home && Meteor.user().profile.locations.home.address){
      if(get(Meteor.user(), 'profile.locations.home.address')){
        // if(Meteor.user().profile.locations.home.address.line){
        if(get(Meteor.user(), 'profile.locations.home.address.line')){
          // data.address.line = Meteor.user().profile.locations.home.address.line;
          data.address.line = get(Meteor.user(), 'profile.locations.home.address.line');
        }
        // if(Meteor.user().profile.locations.home.address.city){
        if(get(Meteor.user(), 'profile.locations.home.address.city')){
            // data.address.city = Meteor.user().profile.locations.home.address.city;
            data.address.city = get(Meteor.user(), 'profile.locations.home.address.city');
          }
        // if(Meteor.user().profile.locations.home.address.state){
        if(get(Meteor.user(), 'profile.locations.home.address.state')){
            // data.address.state = Meteor.user().profile.locations.home.address.state;
            data.address.state = get(Meteor.user(), 'profile.locations.home.address.state');
          }
        // if(Meteor.user().profile.locations.home.address.postalCode){
        if(get(Meteor.user(), 'profile.locations.home.address.postalCode')){
            // data.address.postalCode = Meteor.user().profile.locations.home.address.postalCode;
            data.address.postalCode = get(Meteor.user(), 'profile.locations.home.address.postalCode');
          }
        // if(Meteor.user().profile.locations.home.address.country){
        if(get(Meteor.user(), 'profile.locations.home.address.country')){
            // data.address.country = Meteor.user().profile.locations.home.address.country;
            data.address.country = get(Meteor.user(), 'profile.locations.home.address.country');
          }
      }

      if(get(Meteor.user(), 'profile.locations.home.position')){
        if(get(Meteor.user(), 'profile.locations.home.position.latitude') && get(Meteor.user(), 'profile.locations.home.position.longitude')){
            data.address.latlng = get(Meteor.user(), 'profile.locations.home.position.latitude') + ', ' + get(Meteor.user(), 'profile.locations.home.position.longitude');
        }        
      }


      if(get(Meteor.user(), 'profile.continuityOfCare')){
        if(get(Meteor.user(), 'profile.continuityOfCare.allergyIntolerances')){
          data.ccd.AllergyIntolerances = get(Meteor.user(), 'profile.continuityOfCare.allergyIntolerances').length;
        }
        if(get(Meteor.user(), 'profile.continuityOfCare.carePlans')){
          data.ccd.CarePlans = get(Meteor.user(), 'profile.continuityOfCare.carePlans').length;
        }
        if(get(Meteor.user(), 'profile.continuityOfCare.conditions')){
          data.ccd.Conditions = get(Meteor.user(), 'profile.continuityOfCare.conditions').length;
        }

        if(get(Meteor.user(), 'profile.continuityOfCare.devices')){
          data.ccd.Devices = get(Meteor.user(), 'profile.continuityOfCare.devices').length;
        }
        if(get(Meteor.user(), 'profile.continuityOfCare.diagnosticReports')){
          data.ccd.DiagnosticReports = get(Meteor.user(), 'profile.continuityOfCare.diagnosticReports').length;
        }
        if(get(Meteor.user(), 'profile.continuityOfCare.goals')){
          data.ccd.Goals = get(Meteor.user(), 'profile.continuityOfCare.goals').length;
        }

        if(get(Meteor.user(), 'profile.continuityOfCare.imagingStudies')){
          data.ccd.ImagingStudies = get(Meteor.user(), 'profile.continuityOfCare.imagingStudies').length;
        }
        if(get(Meteor.user(), 'profile.continuityOfCare.immunizations')){
          data.ccd.Immunizations = get(Meteor.user(), 'profile.continuityOfCare.immunizations').length;
        }
        if(get(Meteor.user(), 'profile.continuityOfCare.locations')){
          data.ccd.Locations = get(Meteor.user(), 'profile.continuityOfCare.locations').length;
        }

        if(get(Meteor.user(), 'profile.continuityOfCare.medications')){
          data.ccd.Medications = get(Meteor.user(), 'profile.continuityOfCare.medications').length;
        }        
        if(get(Meteor.user(), 'profile.continuityOfCare.medicationStatements')){
          data.ccd.MedicationStatements = get(Meteor.user(), 'profile.continuityOfCare.medicationStatements').length;
        }        
        if(get(Meteor.user(), 'profile.continuityOfCare.observations')){
          data.ccd.Observations = get(Meteor.user(), 'profile.continuityOfCare.observations').length;
        }        

        if(get(Meteor.user(), 'profile.continuityOfCare.patients')){
          data.ccd.Patients = get(Meteor.user(), 'profile.continuityOfCare.patients').length;
        }           
        if(get(Meteor.user(), 'profile.continuityOfCare.persons')){
          data.ccd.Persons = get(Meteor.user(), 'profile.continuityOfCare.persons').length;
        }           
        if(get(Meteor.user(), 'profile.continuityOfCare.practitioners')){
          data.ccd.Practitioners = get(Meteor.user(), 'profile.continuityOfCare.practitioners').length;
        }           
        if(get(Meteor.user(), 'profile.continuityOfCare.procedures')){
          data.ccd.Procedures = get(Meteor.user(), 'profile.continuityOfCare.procedures').length;
        }           
        if(get(Meteor.user(), 'profile.continuityOfCare.relatedPersons')){
          data.ccd.RelatedPersons = get(Meteor.user(), 'profile.continuityOfCare.relatedPersons').length;
        }           
        if(get(Meteor.user(), 'profile.continuityOfCare.sequences')){
          data.ccd.Sequences = get(Meteor.user(), 'profile.continuityOfCare.sequences').length;
        }           

      }
    }

    if (Session.get('appWidth') > 768) {
      data.style.avatar.height = '120px';
      data.style.avatar.width = '120px';
      data.style.avatar.left = '-120px';
      data.style.avatar.top = '-20px';
      data.style.avatar.position = 'absolute';
      data.style.avatar.zIndex = 10;
      data.style.title.left = '100px';
      //data.header.avatar = null;
    } else {
      //data.style.avatar.display = 'none';
      data.style.avatar.height = '50px';
      data.style.avatar.width = '50px';
      data.style.avatar.left = '-50px';
      data.style.avatar.top = '15px';
      data.style.title.left = '70px';
    }

    if(process.env.NODE_ENV === "test") console.log("MyProfilePage[data]" , data);
    return data;
  }


  render(){

    var ccdResources = [];

    if(get(this, 'data.ccd.AllergyIntolerances')){
      ccdResources.push(<TableRow key=''>
        <TableRowColumn>{this.data.ccd.AllergyIntolerances}</TableRowColumn>
        <TableRowColumn>Allergies</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.ccd.CarePlans')){
      ccdResources.push(<TableRow key='CarePlans'>
        <TableRowColumn>{this.data.ccd.CarePlans}</TableRowColumn>
        <TableRowColumn>CarePlans</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.ccd.Conditions')){
      ccdResources.push(<TableRow key='Conditions'>
        <TableRowColumn>{this.data.ccd.Conditions}</TableRowColumn>
        <TableRowColumn>Conditions</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.ccd.Devices')){
      ccdResources.push(<TableRow key='Devices'>
        <TableRowColumn>{this.data.ccd.Devices}</TableRowColumn>
        <TableRowColumn>Devices</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.ccd.DiagnosticReports')){
      ccdResources.push(<TableRow key='DiagnosticReports'>
        <TableRowColumn>{this.data.ccd.DiagnosticReports}</TableRowColumn>
        <TableRowColumn>DiagnosticReports</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.ccd.Goals')){
      ccdResources.push(<TableRow key='Goals'>
        <TableRowColumn>{this.data.ccd.Goals}</TableRowColumn>
        <TableRowColumn>Goals</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.ccd.ImagingStudies')){
      ccdResources.push(<TableRow key='ImagingStudies'>
        <TableRowColumn>{this.data.ccd.ImagingStudies}</TableRowColumn>
        <TableRowColumn>ImagingStudies</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.ccd.Immunizations')){
      ccdResources.push(<TableRow key='Immunizations'>
        <TableRowColumn>{this.data.ccd.Immunizations}</TableRowColumn>
        <TableRowColumn>Immunizations</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.ccd.Locations')){
      ccdResources.push(<TableRow key='Locations'>
        <TableRowColumn>{this.data.ccd.Locations}</TableRowColumn>
        <TableRowColumn>Locations</TableRowColumn>
      </TableRow>);
    }    
    if(get(this, 'data.ccd.Medications')){
      ccdResources.push(<TableRow key='Medications'>
        <TableRowColumn>{this.data.ccd.Medications}</TableRowColumn>
        <TableRowColumn>Medications</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.ccd.MedicationStatements')){
      ccdResources.push(<TableRow key='MedicationStatements'>
        <TableRowColumn>{this.data.ccd.MedicationStatements}</TableRowColumn>
        <TableRowColumn>MedicationStatements</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.ccd.Observations')){
      ccdResources.push(<TableRow key='Observations'>
        <TableRowColumn>{this.data.ccd.Observations}</TableRowColumn>
        <TableRowColumn>Observations</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.ccd.Patients')){
      ccdResources.push(<TableRow key='Patients'>
        <TableRowColumn>{this.data.ccd.Patients}</TableRowColumn>
        <TableRowColumn>Patients</TableRowColumn>
      </TableRow>);
    }
  
    if(get(this, 'data.ccd.Persons')){
      ccdResources.push(<TableRow key='Persons'>
        <TableRowColumn>{this.data.ccd.Persons}</TableRowColumn>
        <TableRowColumn>Persons</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.ccd.Practitioners')){
      ccdResources.push(<TableRow key='Practitioners'>
        <TableRowColumn>{this.data.ccd.Practitioners}</TableRowColumn>
        <TableRowColumn>Practitioners</TableRowColumn>
      </TableRow>);
    }            
    if(get(this, 'data.ccd.Procedures')){
      ccdResources.push(<TableRow key='Procedures'>
        <TableRowColumn>{this.data.ccd.Procedures}</TableRowColumn>
        <TableRowColumn>Procedures</TableRowColumn>
      </TableRow>);
    }    
    if(get(this, 'data.ccd.RelatedPersons')){
      ccdResources.push(<TableRow key='RelatedPersons'>
        <TableRowColumn>{this.data.ccd.RelatedPersons}</TableRowColumn>
        <TableRowColumn>RelatedPersons</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.ccd.Sequences')){
      ccdResources.push(<TableRow key='Sequences'>
        <TableRowColumn>{this.data.ccd.Sequences}</TableRowColumn>
        <TableRowColumn>Sequences</TableRowColumn>
      </TableRow>);
    }    
    

    return(
      <div id='myProfilePage'>
        <VerticalCanvas>
          <GlassCard>
              <CardHeader
                title={this.data.user.fullName}
                subtitle={this.data.user.email}
                style={this.data.style.title}
              >
              <img id='avatarImage' ref='avatarImage' src={this.data.user.profileImage} onError={this.imgError.bind(this)} style={this.data.style.avatar} />
              </CardHeader>
            <CardText>
              <Tabs id="profilePageTabs" index={this.data.state.index} onChange={this.handleTabChange} initialSelectedIndex={this.data.state.index} value={this.data.state.index} >

                <Tab className='demographicsTab' label='Demographics' style={this.data.style.tab} value={0} >
                  <div id='profileDemographicsPane' style={{position: 'relative'}}>
                    <Row>
                      <Col md={6}>
                        <TextField
                          id='givenNameInput'
                          ref='given'
                          name='given'
                          type='text'
                          floatingLabelText='given name'
                          value={this.data.user.given}
                          fullWidth
                          /><br/>
                      </Col>
                      <Col md={6}>
                        <TextField
                          id='familyNameInput'
                          ref='family'
                          name='family'
                          type='text'
                          floatingLabelText='family name'
                          value={this.data.user.family}
                          fullWidth
                          /><br/>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <TextField
                          id='birthdateInput'
                          ref='birthdate'
                          name='birthdate'
                          type='date'
                          floatingLabelText='date of birth (yyyy-mm-dd)'
                          floatingLabelFixed={true}
                          value={this.data.user.birthdate}                          
                          onChange={ this.handleChangeBirthdate.bind(this) }
                          fullWidth
                          /><br/>
                      </Col>
                      <Col md={3}>
                        <TextField
                          id='genderInput'
                          ref='gender'
                          name='gender'
                          type='text'
                          floatingLabelText='gender'
                          value={this.data.user.gender}
                          onChange={ this.handleChangeGender.bind(this) }
                          fullWidth
                          /><br/>

                      </Col>
                      <Col md={6}>
                        <TextField
                          id='avatarInput'
                          ref='avatar'
                          name='avatar'
                          type='text'
                          floatingLabelText='avatar'
                          value={this.data.user.avatar}
                          onChange={ this.handleChangeAvatar.bind(this) }
                          fullWidth
                          /><br/>

                      </Col>
                    </Row>
                  </div>
                </Tab>



                <Tab className='passwordTab' label='Password' style={this.data.style.tab} value={2} >
                  <div id='profilePasswordPane' style={{position: 'relative'}} >
                    <TextField
                      id='oldPasswordInput'
                      ref='oldPassword'
                      name='oldPassword'
                      type='text'
                      floatingLabelText='oldPassword'
                      floatingLabelFixed={true}
                      value={this.data.state.oldPassword}
                      onChange={ this.rememberOldPassword.bind(this) }
                      fullWidth
                      /><br/>
                    <TextField
                      id='newPasswordInput'
                      ref='newPassword'
                      name='newPassword'
                      type='text'
                      floatingLabelText='newPassword'
                      floatingLabelFixed={true}
                      value={this.data.state.newPassword}
                      onChange={ this.rememberNewPassword.bind(this) }
                      fullWidth
                      /><br/>
                    <TextField
                      id='confirmPasswordInput'
                      ref='confirmPassword'
                      name='confirmPassword'
                      type='text'
                      floatingLabelText='confirmPassword'
                      floatingLabelFixed={true}
                      value={this.data.state.confirmPassword}
                      onChange={ this.rememberConfirmPassword.bind(this) }
                      fullWidth
                      /><br/>

                    <RaisedButton
                      id='changePasswordButton'
                      label='Change Password'
                      onClick={this.changePassword.bind(this)}
                      className="muidocs-icon-action-delete"
                      primary={true}
                      />
                  </div>
                </Tab>

                <Tab className="systemTab" label='Preferences' style={this.data.style.tab} value={3}>
                  <div id="profileSystemPane" style={{position: "relative"}}>
                    <Table>
                    <TableBody displayRowCheckbox={false} showRowHover={true}>>
                      <TableRow>
                        <TableRowColumn style={{width: '200px'}}>
                          <FlatButton label='Show Navbars' />
                        </TableRowColumn>
                        <TableRowColumn>Display the header and footer navbars.</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>
                          <FlatButton label='Show Search' />
                        </TableRowColumn>
                        <TableRowColumn>Display the search ribbon.</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>
                          <FlatButton label='Autoheight' />
                        </TableRowColumn>
                        <TableRowColumn>Fit to use the available spaec.  Otherwise, use veritical scroll.</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>
                          <FlatButton label='Margins' />
                        </TableRowColumn>
                        <TableRowColumn>Layout with or without border margins.</TableRowColumn>
                      </TableRow>

                      <TableRow>
                        <TableRowColumn>
                          <FlatButton label='Card/Panel' />
                        </TableRowColumn>
                        <TableRowColumn>Card layout or Panel layout</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>
                          <FlatButton label='Secondary' />
                        </TableRowColumn>
                        <TableRowColumn>Display the secondary iframe panel</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>
                          <FlatButton label='Docks' />
                        </TableRowColumn>
                        <TableRowColumn>Display inbox dock</TableRowColumn>
                      </TableRow>
                      <TableRow>
                        <TableRowColumn>
                          <FlatButton label='Narrow Navs' />
                        </TableRowColumn>
                        <TableRowColumn>Use narrow navbars</TableRowColumn>
                      </TableRow>
                    </TableBody>
                    </Table>

                    <br />
                    <br />
                    { this.renderConfirmDelete(this.data.state.wantsToDelete) }
                  </div>
                </Tab>

              </Tabs>

            </CardText>
          </GlassCard>

          <DynamicSpacer />
          <GlassCard>
            <CardTitle title="Home Address" subtitle='last updated: yyyy/mm/dd' style={{float: 'left'}} />
            <CardTitle subtitle={this.data.address.latlng} style={{position: 'relative', right: '0px', top: '0px', float: 'right'}}/>
            <CardText>
              
              <Row>
                <Col md={12}>
                  <TextField
                    id='streetAddressInput'
                    ref='streetAddress'
                    name='streetAddress'
                    type='text'
                    floatingLabelText='Street Address'
                    floatingLabelFixed={true}                    
                    value={this.data.address.line}
                    onChange={ this.changeHomeStreetAddress.bind(this) }
                    fullWidth
                    />
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <TextField
                    id='cityInput'
                    ref='city'
                    name='city'
                    type='text'
                    floatingLabelText='City'
                    floatingLabelFixed={true}
                    value={this.data.address.city}
                    onChange={ this.changeHomeCity.bind(this) }
                    fullWidth
                    />
                </Col>
                <Col md={3}>
                  <TextField
                    id='stateInput'
                    ref='state'
                    name='state'
                    type='text'
                    floatingLabelText='State'
                    floatingLabelFixed={true}
                    value={this.data.address.state}
                    onChange={ this.changeHomeState.bind(this) }
                    fullWidth
                    />
                </Col>
                <Col md={3}>
                  <TextField
                    id='postalCodeInput'
                    ref='postalCode'
                    name='postalCode'
                    type='text'
                    floatingLabelText='Postal Code'
                    floatingLabelFixed={true}
                    value={this.data.address.postalCode}
                    onChange={ this.changeHomeZip.bind(this) }
                    fullWidth
                    />
                </Col>
                <Col md={3}>
                  <TextField
                    id='countryInput'
                    ref='country'
                    name='country'
                    type='text'
                    floatingLabelText='Country'
                    floatingLabelFixed={true}
                    value={this.data.address.country}
                    onChange={ this.changeHomeCountry.bind(this) }
                    fullWidth
                    />
                </Col>
              </Row>
            </CardText>
            <CardActions>
              <FlatButton 
                label='Geocode' 
                onClick={this.geocode.bind(this)}
                />
              <FlatButton 
                label='Map My Address' 
                onClick={this.mapMyAddress.bind(this)}
                />
            </CardActions>
          </GlassCard>



          <DynamicSpacer />
          <GlassCard>
            <CardTitle title="Continuity of Care" subtitle='Healthcare data is attached to your profile via resources.' />
            <CardText>
              <Table  >
                <TableBody displayRowCheckbox={false} showRowHover={false}>
                  <TableRow style={{fontWeight: 'bold'}}>
                    <TableRowColumn style={{width: '20%'}}>Count</TableRowColumn>
                    <TableRowColumn style={{width: '80%'}}>Resource</TableRowColumn>
                  </TableRow>
                  { ccdResources }      
                </TableBody>
              </Table>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
  imgError() {
    this.refs.avatarImage.src = '/noAvatar.png';
  }
  renderConfirmDelete(wantsToDelete){
    if (wantsToDelete) {
      return(
        <div>
          <br />
          <br />
          <TextField
            id='confirmInput'
            ref='confirm'
            name='confirm'
            type='text'
            floatingLabelText='confirm email or _id'
            defaultValue={this.data.user.confirm}
            onChange={this.handleConfirm.bind(this)}
            /><br/><br/>

          <RaisedButton
            id='confirmDeleteUserButton'
            label='Confirm Delete'
            onClick={this.confirmDelete.bind(this) }
            className="muidocs-icon-action-delete"
            primary={true}
            style={{backgroundColor: 'red'}}
            />
        </div>
      );
    } else {
      return(
        <div>
          <Divider />
          <br />
          <RaisedButton id='resetPreferencesButton' label='Reset Preferences' onClick={this.resetPreferences } primary={true} style={{marginRight: '20px'}} />
          <RaisedButton id='deleteUserButton' className="muidocs-icon-action-delete" label='Delete User' onClick={this.handleDelete } primary={true} />
        </div>
      );
    }
  }
  resetPreferences(){
    //alert('reset!')
  }
  rememberOldPassword(event, value){
    let state = Session.get('myProfileState');
    state['oldPassword'] = value;
    Session.set('myProfileState', state);
  }
  rememberNewPassword(event, value){
    let state = Session.get('myProfileState');
    state['newPassword'] = value;
    Session.set('myProfileState', state);
  }
  rememberConfirmPassword(event, value){
    let state = Session.get('myProfileState');
    state['confirmPassword'] = value;
    Session.set('myProfileState', state);
  }
  changeState(field){
    let state = Session.get('myProfileState');
    state[field] = this.refs[field].refs.input.value;
    Session.set('myProfileState', state);
  }
  handleTabChange(index) {
    let state = Session.get('myProfileState');
    state.index = index;
    Session.set('myProfileState', state);
  }


  handleChangeBirthdate(event, value) {
    Meteor.users.update({  _id: Meteor.userId()}, {$set:{
      'profile.birthdate': value
    }});
  }
  handleChangeGender(event, value) {
    Meteor.users.update({  _id: Meteor.userId()}, {$set:{
      'profile.gender': value
    }});
  }

  handleChangeAvatar(event, value) {
    Meteor.users.update({  _id: Meteor.userId()}, {$set:{
      'profile.avatar': value
    }});
  }
  changeHomeStreetAddress(event, value) {
    Meteor.users.update({  _id: Meteor.userId()}, {$set:{
      'profile.locations.home.address.line': value
    }});
  }
  changeHomeCity(event, value) {
    Meteor.users.update({  _id: Meteor.userId()}, {$set:{
      'profile.locations.home.address.city': value
    }});
  }
  changeHomeState(event, value) {
    Meteor.users.update({  _id: Meteor.userId()}, {$set:{
      'profile.locations.home.address.state': value
    }});
  }
  changeHomeZip(event, value) {
    Meteor.users.update({  _id: Meteor.userId()}, {$set:{
      'profile.locations.home.address.postalCode': value
    }});
  }
  changeHomeCountry(event, value) {
    Meteor.users.update({  _id: Meteor.userId()}, {$set:{
      'profile.locations.home.address.country': value
    }});
  }
  geocode(){
    console.log('lets try geocoding something...');
    if(get(Meteor.user(), 'profile.locations.home.address')){
      Meteor.call('geocode', get(Meteor.user(), 'profile.locations.home.address'));
    }
  }
  mapMyAddress(){
    if(get(Meteor.user(), 'profile.locations.home.position.latitude') && get(Meteor.user(), 'profile.locations.home.position.longitude')){
      browserHistory.push('/maps');
    }        
  }
  handleDelete() {
    let state = Session.get('myProfileState');
    state.wantsToDelete = true;
    Session.set('myProfileState', state);
  }
  handleConfirm(event, value) {
    let state = Session.get('myProfileState');
    state.confirm = value;
    Session.set('myProfileState', state);
  }
  confirmDelete() {
    let state = Session.get('myProfileState');

    // janky, but it works, i guess
    if ((state.confirm === Meteor.userId()) || (state.confirm === Meteor.user().emails[0].address)) {
      if(process.env.NODE_ENV === "test") console.log('Confirm _id match.  Removing.');

      removeUserById.call({
        _id:  Meteor.userId()
      }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('User removed!', 'success');
          browserHistory.push('/signin');
        }
      });
    } else {
      console.log('Hmmm...  yeah, lets wait a bit and make sure we have the right user.');
    }
  }
  changePassword() {
    let state = Session.get('myProfileState');
    if (state.newPassword === state.confirmPassword) {
      console.log('Passwords match.  Lets send to the server and make it official.');

      Accounts.changePassword(state.oldPassword, state.newPassword, function(error, result){
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Password changed!', 'success');

          let state = Session.get('myProfileState');
          state.newPassword = '';
          state.oldPassword = '';
          state.confirmPassword = '';
          Session.set('myProfileState', state);
        }
      });

    } else {
      console.log("Passwords don't match.  Please try again.");
      Bert.alert("Passwords don't match.  Please try again.", 'danger');
    }
  }
}



ReactMixin(MyProfilePage.prototype, ReactMeteorData);
