import { 
  FontIcon, 
  FlatButton, 
  RaisedButtfon, 
  Card, 
  CardActions, 
  CardHeader, 
  CardText, 
  CardTitle, 
  Toggle, 
  Table, 
  TableBody, 
  TableHeader, 
  TableHeaderColumn, 
  TableRow, 
  TableRowColumn, 
  SelectField, 
  TextField,
  MenuItem
} from 'material-ui';
import { Col, Grid, Row } from 'react-bootstrap';
import { Tab, Tabs } from 'material-ui/Tabs';
import { has, get } from 'lodash';

import { Accounts } from 'meteor/accounts-base';

import { FullPageCanvas, VerticalCanvas, GlassCard, Glass, DynamicSpacer } from 'meteor/clinical:glass-ui';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';

// import MenuItem from '/imports/ui/components/MenuItem';


import { browserHistory } from 'react-router';
import { removeUserById } from '/imports/api/users/methods';

import { PatientCard } from 'meteor/clinical:hl7-resource-patient';



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
Session.setDefault('autoPrivacyToggled', true);
Session.setDefault('geomappingDefault', 1)

export class MyProfilePage extends React.Component {
  constructor(props) {
    super(props);
  }

  getMeteorData() {

    let data = {
      style: {
        tab: {
          borderBottom: '1px solid lightgray'
        },
        title: {
          left: '160px'
        },
        avatar: {
          position: 'relative',
          zIndex: 10,
          transition: '1s',
          left: '0px',
          top: '0px',
          width: '100%',
          height: '100%'
        },
        photo: {
          position: 'absolute'         
        },
        synopsis: {
          //position: 'relative',         
          paddingLeft: '160px'
        },
        searchbarInput: Glass.darkroom({
          left: '0px', 
          width: '80%',
          visibility: 'hidden'
        }),
      },
      patient: {},
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
        verifiedEmail: false,
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
      },
      minimongo: {
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
      },
      toggles: {
        autoPrivacyToggled: Session.get('autoPrivacyToggled')
      },
      geojsonUrl: Session.get('geojsonUrl'),
      geomappingDefault: Session.get('geomappingDefault')      
    };

    data.style.tab = Glass.darkroom(data.style.tab);


    if (Session.get('myProfileState')) {
      data.state = Session.get('myProfileState');
    }

    if (Meteor.user()) {
      data.user = {
        _id: Meteor.userId(),
        email: get(Meteor.user(), 'emails[0].address'),
        verifiedEmail: get(Meteor.user(), 'emails[0].verified'),
        avatar: get(Meteor.user(), 'profile.avatar'),
        gender: '',
        birthdate: '',
        zip: '',
        longitude: '',
        latitude: '',
        profileImage: get(Meteor.user(), 'profile.avatar')
      };      

      // if (Meteor.user().profile && Meteor.user().profile.avatar) {
      if(get(Meteor.user(), 'profile.avatar')) {
        data.user.profileImage = get(Meteor.user(), 'profile.avatar');
        data.header.avatar = get(Meteor.user(), 'profile.avatar');
        data.patient.photo = [{url: get(Meteor.user(), 'profile.avatar') }]
      } 
      // else {
      //   data.user.profileImage = 'thumbnail.png';
      //   data.header.avatar = 'thumbnail.png';
      //   data.patient.photo = [{url: 'thumbnail.png' }]
      // }

      // if (Meteor.user() && Meteor.user().profile && Meteor.user().profile.name) {
      if(get(Meteor.user(), 'profile.name')) {
        data.user.given = get(Meteor.user(), 'profile.name.given');
        data.user.family = get(Meteor.user(), 'profile.name.family')
        data.user.fullName = get(Meteor.user(), 'profile.name.given') + ' ' + get(Meteor.user(), 'profile.name.family');
        data.patient.name = [{
          given: [get(Meteor.user(), 'profile.name.given')],
          family: [get(Meteor.user(), 'profile.name.family')],
          text: get(Meteor.user(), 'profile.name.given') + ' ' + get(Meteor.user(), 'profile.name.family')
        }]
      } else {
        data.user.given = '';
        data.user.family = '';
        data.user.fullName = '';
        data.patient.name = [{
          given: [''],
          family: [''],
          text: ''
        }]
      }

      if(get(Meteor.user(), 'profile.gender')) {
        data.user.gender = get(Meteor.user(), 'profile.gender');
        data.patient.gender = get(Meteor.user(), 'profile.gender');
      }

      if(get(Meteor.user(), 'profile.birthDate')) {
        data.user.birthDate = get(Meteor.user(), 'profile.birthDate');
        data.patient.birthDate = get(Meteor.user(), 'profile.birthDate');
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


      // if(get(Meteor.user(), 'profile.continuityOfCare')){
      //   if(get(Meteor.user(), 'profile.continuityOfCare.allergyIntolerances')){
      //     data.ccd.AllergyIntolerances = get(Meteor.user(), 'profile.continuityOfCare.allergyIntolerances').length;
      //   }
      //   if(get(Meteor.user(), 'profile.continuityOfCare.carePlans')){
      //     data.ccd.CarePlans = get(Meteor.user(), 'profile.continuityOfCare.carePlans').length;
      //   }
      //   if(get(Meteor.user(), 'profile.continuityOfCare.conditions')){
      //     data.ccd.Conditions = get(Meteor.user(), 'profile.continuityOfCare.conditions').length;
      //   }

      //   if(get(Meteor.user(), 'profile.continuityOfCare.devices')){
      //     data.ccd.Devices = get(Meteor.user(), 'profile.continuityOfCare.devices').length;
      //   }
      //   if(get(Meteor.user(), 'profile.continuityOfCare.diagnosticReports')){
      //     data.ccd.DiagnosticReports = get(Meteor.user(), 'profile.continuityOfCare.diagnosticReports').length;
      //   }
      //   if(get(Meteor.user(), 'profile.continuityOfCare.goals')){
      //     data.ccd.Goals = get(Meteor.user(), 'profile.continuityOfCare.goals').length;
      //   }

      //   if(get(Meteor.user(), 'profile.continuityOfCare.imagingStudies')){
      //     data.ccd.ImagingStudies = get(Meteor.user(), 'profile.continuityOfCare.imagingStudies').length;
      //   }
      //   if(get(Meteor.user(), 'profile.continuityOfCare.immunizations')){
      //     data.ccd.Immunizations = get(Meteor.user(), 'profile.continuityOfCare.immunizations').length;
      //   }
      //   if(get(Meteor.user(), 'profile.continuityOfCare.locations')){
      //     data.ccd.Locations = get(Meteor.user(), 'profile.continuityOfCare.locations').length;
      //   }

      //   if(get(Meteor.user(), 'profile.continuityOfCare.medications')){
      //     data.ccd.Medications = get(Meteor.user(), 'profile.continuityOfCare.medications').length;
      //   }        
      //   if(get(Meteor.user(), 'profile.continuityOfCare.medicationStatements')){
      //     data.ccd.MedicationStatements = get(Meteor.user(), 'profile.continuityOfCare.medicationStatements').length;
      //   }        
      //   if(get(Meteor.user(), 'profile.continuityOfCare.observations')){
      //     data.ccd.Observations = get(Meteor.user(), 'profile.continuityOfCare.observations').length;
      //   }        

      //   if(get(Meteor.user(), 'profile.continuityOfCare.patients')){
      //     data.ccd.Patients = get(Meteor.user(), 'profile.continuityOfCare.patients').length;
      //   }           
      //   if(get(Meteor.user(), 'profile.continuityOfCare.persons')){
      //     data.ccd.Persons = get(Meteor.user(), 'profile.continuityOfCare.persons').length;
      //   }           
      //   if(get(Meteor.user(), 'profile.continuityOfCare.practitioners')){
      //     data.ccd.Practitioners = get(Meteor.user(), 'profile.continuityOfCare.practitioners').length;
      //   }           
      //   if(get(Meteor.user(), 'profile.continuityOfCare.procedures')){
      //     data.ccd.Procedures = get(Meteor.user(), 'profile.continuityOfCare.procedures').length;
      //   }           
      //   if(get(Meteor.user(), 'profile.continuityOfCare.relatedPersons')){
      //     data.ccd.RelatedPersons = get(Meteor.user(), 'profile.continuityOfCare.relatedPersons').length;
      //   }           
      //   if(get(Meteor.user(), 'profile.continuityOfCare.sequences')){
      //     data.ccd.Sequences = get(Meteor.user(), 'profile.continuityOfCare.sequences').length;
      //   }           
      // }
      
      var resourceTypes = [
        'AllergyIntolerances',
        'CarePlans',
        'Conditions',
        'Devices',
        'DiagnosticReports',
        'Goals',
        'Immunizations',
        'Medications',
        'MedicationOrders',
        'Organizations',
        'Observations',
        'Practitioners',
        'Procedures'
      ];

      resourceTypes.forEach(function(resourceType){
        if(Mongo.Collection.get(resourceType)){
          data.minimongo[resourceType] = Mongo.Collection.get(resourceType).find().count();
        }
      })
    }

    if (Session.get('appWidth') > 768) {
      data.style.photo.height = '160px';
      data.style.photo.width = '160px';
      data.style.photo.left = '0px';
      data.style.photo.top = '74px';
      data.style.photo.position = 'absolute';
      data.style.photo.zIndex = 10;
      data.style.synopsis.marginLeft = '160px;'
      //data.header.photo = null;
    } else {
      //data.style.photo.display = 'none';
      data.style.photo.height = '50px';
      data.style.photo.width = '50px';
      data.style.photo.left = '-50px';
      data.style.photo.top = '15px';
      data.style.title.left = '70px';

      data.style.synopsis.marginLeft = '0px;'
    }

    if(process.env.NODE_ENV === "test") console.log("MyProfilePage[data]" , data);
    return data;
  }

  setGeojsonUrl(event, text){
    console.log('setGeojsonUrl', text);
    Session.set('geojsonUrl', text)
  }
  toggleAutoprivacy(){
    // console.log('toggleAutoprivacy')
    Session.toggle('autoPrivacyToggled');
  }
  handleChangeMappingAlgorithm(event, index, value){
    console.log('handleChangeMappingAlgorithm', event, index, value)
    Session.set('geomappingDefault', value)
  }
  render(){

    var ccdResources = [];

    if(get(this, 'data.ccd.AllergyIntolerances')){
      ccdResources.push(<TableRow key=''>
        <TableRowColumn>{this.data.minimongo.AllergyIntolerances}</TableRowColumn>
        <TableRowColumn>Allergies</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.minimongo.CarePlans')){
      ccdResources.push(<TableRow key='CarePlans'>
        <TableRowColumn>{this.data.minimongo.CarePlans}</TableRowColumn>
        <TableRowColumn>CarePlans</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.minimongo.Conditions')){
      ccdResources.push(<TableRow key='Conditions'>
        <TableRowColumn>{this.data.minimongo.Conditions}</TableRowColumn>
        <TableRowColumn>Conditions</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.minimongo.Devices')){
      ccdResources.push(<TableRow key='Devices'>
        <TableRowColumn>{this.data.minimongo.Devices}</TableRowColumn>
        <TableRowColumn>Devices</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.minimongo.DiagnosticReports')){
      ccdResources.push(<TableRow key='DiagnosticReports'>
        <TableRowColumn>{this.data.minimongo.DiagnosticReports}</TableRowColumn>
        <TableRowColumn>DiagnosticReports</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.minimongo.Goals')){
      ccdResources.push(<TableRow key='Goals'>
        <TableRowColumn>{this.data.minimongo.Goals}</TableRowColumn>
        <TableRowColumn>Goals</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.minimongo.ImagingStudies')){
      ccdResources.push(<TableRow key='ImagingStudies'>
        <TableRowColumn>{this.data.minimongo.ImagingStudies}</TableRowColumn>
        <TableRowColumn>ImagingStudies</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.minimongo.Immunizations')){
      ccdResources.push(<TableRow key='Immunizations'>
        <TableRowColumn>{this.data.minimongo.Immunizations}</TableRowColumn>
        <TableRowColumn>Immunizations</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.minimongo.Locations')){
      ccdResources.push(<TableRow key='Locations'>
        <TableRowColumn>{this.data.minimongo.Locations}</TableRowColumn>
        <TableRowColumn>Locations</TableRowColumn>
      </TableRow>);
    }    
    if(get(this, 'data.minimongo.Medications')){
      ccdResources.push(<TableRow key='Medications'>
        <TableRowColumn>{this.data.minimongo.Medications}</TableRowColumn>
        <TableRowColumn>Medications</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.minimongo.MedicationStatements')){
      ccdResources.push(<TableRow key='MedicationStatements'>
        <TableRowColumn>{this.data.minimongo.MedicationStatements}</TableRowColumn>
        <TableRowColumn>MedicationStatements</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.minimongo.Observations')){
      ccdResources.push(<TableRow key='Observations'>
        <TableRowColumn>{this.data.minimongo.Observations}</TableRowColumn>
        <TableRowColumn>Observations</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.minimongo.Patients')){
      ccdResources.push(<TableRow key='Patients'>
        <TableRowColumn>{this.data.minimongo.Patients}</TableRowColumn>
        <TableRowColumn>Patients</TableRowColumn>
      </TableRow>);
    }
  
    if(get(this, 'data.minimongo.Persons')){
      ccdResources.push(<TableRow key='Persons'>
        <TableRowColumn>{this.data.minimongo.Persons}</TableRowColumn>
        <TableRowColumn>Persons</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.minimongo.Practitioners')){
      ccdResources.push(<TableRow key='Practitioners'>
        <TableRowColumn>{this.data.minimongo.Practitioners}</TableRowColumn>
        <TableRowColumn>Practitioners</TableRowColumn>
      </TableRow>);
    }            
    if(get(this, 'data.minimongo.Procedures')){
      ccdResources.push(<TableRow key='Procedures'>
        <TableRowColumn>{this.data.minimongo.Procedures}</TableRowColumn>
        <TableRowColumn>Procedures</TableRowColumn>
      </TableRow>);
    }    
    if(get(this, 'data.minimongo.RelatedPersons')){
      ccdResources.push(<TableRow key='RelatedPersons'>
        <TableRowColumn>{this.data.minimongo.RelatedPersons}</TableRowColumn>
        <TableRowColumn>RelatedPersons</TableRowColumn>
      </TableRow>);
    }
    if(get(this, 'data.minimongo.Sequences')){
      ccdResources.push(<TableRow key='Sequences'>
        <TableRowColumn>{this.data.minimongo.Sequences}</TableRowColumn>
        <TableRowColumn>Sequences</TableRowColumn>
      </TableRow>);
    }    
    let continuityOfCareCard;

    let exportDataBtn = <FlatButton 
      label='Export' 
      onClick={this.exportData.bind(this)}
    />
    let importDataBtn = <FlatButton 
      label='Import' 
      onClick={this.importData.bind(this)}
    />
    
    //if(ccdResources.length > 0){
      continuityOfCareCard = <div>
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
          <CardActions>
            <FlatButton 
              label='Clear Data' 
              onClick={this.clearLocalCache.bind(this)}
              />
            { exportDataBtn }
            { importDataBtn }
          </CardActions>
        </GlassCard>
        <DynamicSpacer />
      </div>
    //}

    // var consentElement;f
    // //if(Package['clinical:hl7-resource-consent']){
    //   consentElement = <div>
    //     <GlassCard>
    //       <CardTitle title="Consents & Authorizations" subtitle='OAuth tokens, HIPAA consents, Advanced Directives, etc.' />
    //       <CardText>
    //         <ConsentTable
    //           patient="Jane Doe"
    //           simplified={true}
    //           noDataMessage={false}
    //         />
    //       </CardText>
    //       <CardActions>
    //         <FlatButton 
    //           label='Edit' 
    //           onClick={this.editAuthorizations.bind(this)}
    //           />
    //       </CardActions>
    //     </GlassCard>
    //     <DynamicSpacer />
    //   </div>
    // //}

    let geocodingCard;
    if(get(Meteor.user(), 'profile.consents.geocoding.status') === "active"){
      geocodingCard = <div>
        <GlassCard>
          <CardTitle title="Geomapping" style={{float: 'left'}} />
            <CardTitle subtitle={this.data.address.latlng} style={{position: 'relative', right: '0px', top: '0px', float: 'right'}}/>
            <CardText>

            <DynamicSpacer />              
              <SelectField
                floatingLabelText="Default Map"
                value={this.data.geomappingDefault}
                onChange={this.handleChangeMappingAlgorithm}
                floatingLabelFixed={true}     
                fullWidth
              >
                <MenuItem value={0} primaryText="EPA Toxic Inventory" />
                <MenuItem value={1} primaryText="Grocery Stores (2013)" />
                <MenuItem value={2} primaryText="Food Deserts (2013)" />
                <MenuItem value={3} primaryText="None" />
              </SelectField>

              <TextField
                hintText="http://data.cityofchicago.gov/map.geojson"
                onChange={ this.setGeojsonUrl.bind(this)}
                floatingLabelText='Custom Url'
                floatingLabelFixed={true}     
                fullWidth
              />
            </CardText>
            <CardActions>
              <FlatButton 
                label='Map My Address' 
                onClick={this.mapMyAddress.bind(this)}
                />
            </CardActions>
          </GlassCard>
        <DynamicSpacer />
      </div>
    }    

    let verifiedEmailStyle = {
      color: "darkgray"
    }
    if(this.data.user.verifiedEmail){
      verifiedEmailStyle.color = "green"
    }

    return(
      <div id='myProfilePage'>
        <FullPageCanvas style={{paddingBottom: '80px'}}> 
          <Col md={6}>
            <PatientCard
              // fullName={ get(this, 'data.user.fullName', '') }
              // email={ get(this, 'data.user.email', '') }
              // givenName={ get(this, 'data.user.givenName', '') }
              // familyName={ get(this, 'data.user.familyName', '') }
              // birthdate={this.data.user.birthdate}
              // gender={ get(this, 'data.user.gender', '') }
              // avatar={ get(this, 'data.user.avatar', '') }
              overflowY="none"
              patient = { get(this, 'data.patient') }
              updateGivenName={ this.updateGivenName }
              updateFamilyName={ this.updateFamilyName }
              updateBirthdate={ this.updateBirthdate }
              updateGender={ this.updateGender }
              updateAvatar={ this.updateAvatar }
              />

            

            <GlassCard>
              <CardTitle title="Home Address" style={{float: 'left'}} />
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
              </CardActions>
            </GlassCard>
            <DynamicSpacer />

            <GlassCard>
              <CardTitle title="Contact Info" style={{float: 'left'}} />
              <CardText>
                
                <Row>
                  <Col md={12}>
                    <TextField
                      id='primaryAddressInput'
                      ref='primaryAddress'
                      name='primaryAddress'
                      type='text'
                      floatingLabelText='Primary Address'
                      floatingLabelFixed={true}                    
                      value={this.data.user.email}
                      inputStyle={verifiedEmailStyle}
                      fullWidth
                      />
                  </Col>
                </Row>                
              </CardText>
            </GlassCard>
            <DynamicSpacer />

            { geocodingCard }


            { continuityOfCareCard }


            <GlassCard>
              <CardTitle title="Preferences" subtitle='Reset your password.' />
              <CardText>
                <Toggle 
                  label="AutoPrivacy"
                  labelPosition='right'
                  onToggle={this.toggleAutoprivacy.bind(this)} 
                  toggled={ this.data.toggles.autoPrivacyToggled }  
                /><br />
              </CardText>
            </GlassCard>                    
            <DynamicSpacer />



            <GlassCard>
              <CardTitle title="Password Management" subtitle='Reset your password.' />
              <CardText>
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
                  <Row>
                    <Col md={6}>
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
                    </Col>
                    <Col md={6}>
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
                    </Col>
                  </Row>



                  <FlatButton
                    id='changePasswordButton'
                    label='Change Password'
                    onClick={this.changePassword.bind(this)}
                    className="muidocs-icon-action-delete"
                    />
                </div>
              </CardText>
            </GlassCard>                    

            <DynamicSpacer />
            <GlassCard>
              <CardTitle title="Delete User" subtitle='Permanently remove account and data.' />
              <CardText>
                <div id="profileSystemPane" style={{position: "relative"}}>
                  { this.renderConfirmDelete(this.data.state.wantsToDelete) }
                </div>
              </CardText>
            </GlassCard>

            <DynamicSpacer />
            <DynamicSpacer />



          </Col>
        </FullPageCanvas>
      </div>
    );
  }
  imgError() {
    this.refs.avatarImage.src = Meteor.absoluteUrl() + 'noAvatar.png';
  }
  renderConfirmDelete(wantsToDelete){
    return(
      <div>
        <FlatButton id='deleteUserButton' className="muidocs-icon-action-delete" label='Delete User' onClick={this.confirmDelete.bind(this) } />
      </div>
    );
  }
  resetPreferences(){

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

  updateGivenName(event, value) {
    Meteor.users.update({  _id: Meteor.userId()}, {$set:{
      'profile.name[0].given': value
    }});
  }
  updateFamilyName(event, value) {
    Meteor.users.update({  _id: Meteor.userId()}, {$set:{
      'profile.name[0].family': value
    }});
  }

  updateBirthdate(event, value) {
    Meteor.users.update({  _id: Meteor.userId()}, {$set:{
      'profile.birthdate': value
    }});
  }
  updateGender(event, value) {
    Meteor.users.update({  _id: Meteor.userId()}, {$set:{
      'profile.gender': value
    }});
  }

  updateAvatar(event, value) {
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
  editAuthorizations(){
    browserHistory.push('/oauth-grants');
  }
  geocode(){
    console.log('lets try geocoding something...');
    if(get(Meteor.user(), 'profile.locations.home.address')){
      Meteor.call('geocode', get(Meteor.user(), 'profile.locations.home.address'));
    }
  }
  mapMyAddress(){

    switch (Session.get('geomappingDefault')) {
      case 0: // EPA Toxic Inventory
        Session.set('geojsonUrl', Meteor.absoluteUrl() + "packages/symptomatic_geomapping/geodata/illinois-epa-toxic-inventory-sites.geojson");
        break;
      case 1: // Grocers
        Session.set('geojsonUrl', Meteor.absoluteUrl() + "packages/symptomatic_geomapping/geodata/Chicago.Grocers.geojson");
        break;
      case 2: // Food Deserts
        Session.set('geojsonUrl', Meteor.absoluteUrl() + "packages/symptomatic_geomapping/geodata/Chicago.Grocers.geojson");
        break;
      default:
        Session.set('geojsonUrl', '');
        break;
    }

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
  exportData(){
    browserHistory.push('/export-data');
  }
  importData(){
    browserHistory.push('/import-data');
  }
  clearLocalCache(){
    if(confirm("Are you absolutely sure?")){

      var resourceTypes = [
        'AllergyIntolerances',
        'CarePlans',
        'Conditions',
        'Devices',
        'DiagnosticReports',
        'Goals',
        'Immunizations',
        'Medications',
        'MedicationOrders',
        'MedicationStatements',
        'Organizations',
        'Observations',
        'Practitioners',
        'Procedures',
        'RiskAssessments'
      ];

      resourceTypes.forEach(function(resourceType){
        if(Mongo.Collection.get(resourceType)){
          Mongo.Collection.get(resourceType).find().forEach(function(record){
            Mongo.Collection.get(resourceType).remove({_id: record._id})
          })
        }
      })
    }
  }
  confirmDelete() {
    if(confirm("Are you sure you want to delete your entire account?  This decision is permanent and can't be reversed.")){
      let state = Session.get('myProfileState');

      // janky, but it works, i guess
      // if ((state.confirm === Meteor.userId()) || (state.confirm === Meteor.user().emails[0].address)) {
        // if ((state.confirm === Meteor.userId())) {
        //   if(process.env.NODE_ENV === "test") console.log('Confirm _id match.  Removing.');
  
        removeUserById.call({
          _id:  Meteor.userId()
        }, (error, result) => {
          if (error) {
            Bert.alert(error.reason, 'danger');
          } 
          if(result) {
            Bert.alert('User removed!', 'success');
            browserHistory.push('/signin');
          }
        });

      // } else {
      //   console.log('Hmmm...  yeah, lets wait a bit and make sure we have the right user.');
      // }    
    }
  }
  deleteAccount(){
    console.log('deleteAccount')
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
