import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { get } from 'lodash';

import { 
  CardActions, 
  CardText, 
  CardTitle,   
  FlatButton,
  Step,
  Stepper,
  StepContent,
  StepLabel,
  RaisedButton,
  TextField,
  Paper
} from 'material-ui';

import { FullPageCanvas, GlassCard, DynamicSpacer } from 'meteor/clinical:glass-ui';
import { browserHistory } from 'react-router';

import { Alert, Grid, Container, Col, Row } from 'react-bootstrap';

import { TermsConditionsCard } from '../components/TermsConditionsCard';
import { PrivacyPolicyCard } from '../components/PrivacyPolicyCard';
import { PrivacyControlsCard } from '../components/PrivacyControlsCard';

import { FaInfoCircle } from 'react-icons/fa';
import { FaMars } from 'react-icons/fa';
import { FaVenus } from 'react-icons/fa';
import { FaMercury } from 'react-icons/fa';
import { FaTransgenderAlt } from 'react-icons/fa';
import { FaTransgender } from 'react-icons/fa';
import { MdImportantDevices } from 'react-icons/md';


import { Image } from 'react-bootstrap';

import { MedicalRecordImporter } from 'meteor/symptomatic:continuity-of-care';


Session.setDefault('genderMaleBtn', false);
Session.setDefault('genderOtherBtn', false);
Session.setDefault('genderFemaleBtn', false);

Session.setDefault('karyotypeXyBtn', false);
Session.setDefault('karyotypeXxBtn', false);
Session.setDefault('karyotypeXoBtn', false);
Session.setDefault('karyotypeXxxyBtn', false);
Session.setDefault('karyotypeXxyBtn', false);
Session.setDefault('karyotypeUnknownBtn', true);

Session.setDefault('anatomyPhallicBtn', false);
Session.setDefault('anatomyYanicBtn', false);
Session.setDefault('anatomyUndisclosedBtn', false);

Session.setDefault('HKCharacteristicTypeIdentifierDateOfBirth', '')


function getOS() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}


export class WelcomePatientPage extends React.Component {
  constructor(props) {
    super(props);
    this. state = {
      finished: false,
      stepIndex: 0
    };
  }
  getMeteorData() {
    let data = {
      style: {},
      buttons: {
        gender: {
          male: Session.get('genderMaleBtn'),          
          other: Session.get('genderOtherBtn'),
          female: Session.get('genderFemaleBtn')
        },
        karyotype: {
          xy: Session.get('karyotypeXyBtn'),
          xx: Session.get('karyotypeXxBtn'),
          xo: Session.get('karyotypeXoBtn'),
          xxy: Session.get('karyotypeXxyBtn'),
          xxxy: Session.get('karyotypeXxxyBtn'),
          unknown: Session.get('karyotypeUnknownBtn')
        },
        anatomy: {
          phallic: Session.get('anatomyPhallicBtn'),
          yanic: Session.get('anatomyYanicBtn'),
          undisclosed: Session.get('anatomyUndisclosedBtn')
        }
      },
      name: {
        family: get(Meteor.user(), 'profile.name.family'),
        given: get(Meteor.user(), 'profile.name.given'),
        text: get(Meteor.user(), 'profile.name.text'),
      },
      dateOfBirth: get(Meteor.user(), 'profile.dateOfBirth', 'unknown'),
      HKCharacteristicTypeIdentifierDateOfBirth: Session.get('HKCharacteristicTypeIdentifierDateOfBirth'),
      HKCharacteristicTypeIdentifierBiologicalSex: Session.get('HKCharacteristicTypeIdentifierBiologicalSex'),
      HKCharacteristicTypeIdentifierBloodType: Session.get('HKCharacteristicTypeIdentifierBloodType'),
      HKCharacteristicTypeIdentifierFitzpatrickSkinType: Session.get('HKCharacteristicTypeIdentifierFitzpatrickSkinType'),
    };
    

    return data;
  }


  handleGo(){
    Meteor.users.update({_id: Meteor.userId()}, {$set: {
      'profile.firstTimeVisit':false
    }});
    browserHistory.push('/');
  }
  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };
  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Select campaign settings...';
      case 1:
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      case 3:
        return 'This is the bit I really care about!';
      case 4:
        return 'This is the bit I really care about!';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }
  renderStepActions(step) {
    const {stepIndex} = this.state;

    let actionButtonLabel;
    switch (stepIndex) {
      case 0:
        actionButtonLabel = 'Click to set up'
        break;
      case 1:
        actionButtonLabel = 'Next'
        break;
      case 2:
        actionButtonLabel = 'Accept'
        break;
      case 3:
        actionButtonLabel = 'Accept'
        break;
      case 4:
        actionButtonLabel = 'Accept'
        break;
      case 5:
        actionButtonLabel = 'Skip'
        break;
      case 6:
        actionButtonLabel = 'Next'
        break;
      case 7:
        actionButtonLabel = 'Next'
        break;
      case 8:
        actionButtonLabel = 'Next'
        break;
      case 9:
        actionButtonLabel = 'Next'
        break;
      case 10:
        actionButtonLabel = 'Next'
        break;    
      case 11:
        actionButtonLabel = 'Finish'
        break;    
      default:
        break;
    }

    return (
      <div style={{margin: '12px 0'}}>
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
          />
        )}
        <RaisedButton
          label={ actionButtonLabel }
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={this.handleNext}
          style={{marginRight: 12}}
        />

      </div>
    );
  }
  onMaleDermatogramClick(){
    console.log('onMaleDermatogramClick')
    Session.set('genderMaleBtn', true)
    Session.set('anatomyPhallicBtn', true)

    Session.set('genderFemaleBtn', false)
    Session.set('anatomyYanicBtn', false)
  }
  onFemaleDermatogramClick(){
    console.log('onFemaleDermatogramClick')
    Session.set('genderFemaleBtn', true)
    Session.set('anatomyYanicBtn', true)

    Session.set('genderMaleBtn', false)
    Session.set('anatomyPhallicBtn', false)
  }
  toggleAnatomyUndisclosed(){
    Session.toggle('anatomyUndisclosedBtn')
  }
  toggleAnatomyYanic(){
    Session.toggle('anatomyYanicBtn')
  }
  toggleAnatomyPhallic(){
    Session.toggle('anatomyPhallicBtn')
  }

  toggleKaryotypeUnknown(){
    Session.set('karyotypeXyBtn', false);
    Session.set('karyotypeXxBtn', false);
    Session.set('karyotypeXoBtn', false);
    Session.set('karyotypeXxxyBtn', false);
    Session.set('karyotypeXxyBtn', false);
    Session.set('karyotypeUnknownBtn', true);
  }
  toggleKaryotypeXx(){
    Session.set('karyotypeXyBtn', false);
    Session.set('karyotypeXxBtn', true);
    Session.set('karyotypeXoBtn', false);
    Session.set('karyotypeXxxyBtn', false);
    Session.set('karyotypeXxyBtn', false);
    Session.set('karyotypeUnknownBtn', false);
  }
  toggleKaryotypeXy(){
    Session.set('karyotypeXyBtn', true);
    Session.set('karyotypeXxBtn', false);
    Session.set('karyotypeXoBtn', false);
    Session.set('karyotypeXxxyBtn', false);
    Session.set('karyotypeXxyBtn', false);
    Session.set('karyotypeUnknownBtn', false);
  }
  toggleKaryotypeXxy(){
    Session.set('karyotypeXyBtn', false);
    Session.set('karyotypeXxBtn', false);
    Session.set('karyotypeXoBtn', false);
    Session.set('karyotypeXxxyBtn', false);
    Session.set('karyotypeXxyBtn', true);
    Session.set('karyotypeUnknownBtn', false);
  }
  toggleKaryotypeXxxy(){
    Session.set('karyotypeXyBtn', false);
    Session.set('karyotypeXxBtn', false);
    Session.set('karyotypeXoBtn', false);
    Session.set('karyotypeXxxyBtn', true);
    Session.set('karyotypeXxyBtn', false);
    Session.set('karyotypeUnknownBtn', false);
  }
  toggleKaryotypeXo(){
    Session.set('karyotypeXyBtn', false);
    Session.set('karyotypeXxBtn', false);
    Session.set('karyotypeXoBtn', true);
    Session.set('karyotypeXxxyBtn', false);
    Session.set('karyotypeXxyBtn', false);
    Session.set('karyotypeUnknownBtn', false);
  }

  toggleFemaleGender(){
    Session.set('genderMaleBtn', false);
    Session.set('genderOtherBtn', false);
    Session.set('genderFemaleBtn', true);
  }
  toggleMaleGender(){
    Session.set('genderMaleBtn', true);
    Session.set('genderOtherBtn', false);
    Session.set('genderFemaleBtn', false);
  }
  toggleOtherGender(){
    Session.set('genderMaleBtn', false);
    Session.set('genderOtherBtn', true);
    Session.set('genderFemaleBtn', false);
  }
  importCoreBiomarkers(){
    console.log('importCoreBiomarkers')
    MedicalRecordImporter.coreBiomarkers();
  }
  mergeIntoSymptomatic(){
    console.log('mergeIntoSymptomatic')
    Meteor.users.update({_id: Meteor.userId()}, {$set: {
      'profile.apple.HKCharacteristicTypeIdentifierDateOfBirth': Session.get('HKCharacteristicTypeIdentifierDateOfBirth'),
      'profile.apple.HKCharacteristicTypeIdentifierBiologicalSex': Session.get('HKCharacteristicTypeIdentifierBiologicalSex'),
      'profile.apple.HKCharacteristicTypeIdentifierBloodType': Session.get('HKCharacteristicTypeIdentifierBloodType'),
      'profile.apple.HKCharacteristicTypeIdentifierFitzpatrickSkinType': Session.get('HKCharacteristicTypeIdentifierFitzpatrickSkinType')
      }})

    console.log('Meteor.user().profile', get(Meteor.user(), 'profile'));
  }
  setFitzpatric(type){
    console.log('setFitzpatric', type)
    Session.set('HKCharacteristicTypeIdentifierFitzpatrickSkinType', type)
  }
  gotoTimeline(){
    browserHistory.push('/timeline-sidescroll');
  }
  render(){
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    var dermatogramRow;
    var fitzpatrickRow;
    var autoImportIntro;

    var platformInfo = getOS();

    var languageInfo = window.navigator.language;
    var vendorInfo = window.navigator.vendor;



    var patientName;
    var patientDob;
    var patientGender;
    var patientBloodType;
    var patientFitzpatrick;


    // demographics scan

    if(['iPhone'].includes(window.navigator.platform)){
      patientName = '';
      patientDob = '';
      patientGender = '';
      patientBloodType = '';
      patientFitzpatrick = '';  
    } else {
      patientName = '';
      patientDob = '';
      patientGender = '';
      patientBloodType = '';
      patientFitzpatrick = '';  
    }






    var messageStyle = {
      textAlign: 'center',
      position: 'relative',
      top: ((Session.get('appHeight') - 128 ) * 0.5 - 180) + 'px'
    }
    var alertStyle = {
      fontSize: '18px',
      fontWeight: 200
    }

    if(['iPhone'].includes(window.navigator.platform)){
      alertStyle.marginBottom = '20px'
    } else {
      alertStyle.minHeight = '240px'
    }

    if(Package['symptomatic:continuity-of-care']){
        var dermatogramStyle = {
          maxHeight: '400px', 
          display: 'inline-block', 
          cursor: 'pointer'
        }
        var dermatogramStyleFemale = dermatogramStyle;
        var dermatogramStyleMale = dermatogramStyle;
        
        var gender = get(Meteor.user(), 'profile.gender');
        if(gender === "male"){
          dermatogramStyleMale.boderBottom = '2px solid cornflowerblue';
        }
        if(gender === "female"){
          dermatogramStyleFemale.boderBottom = '2px solid cornflowerblue';
        }

        if(['iPhone'].includes(window.navigator.platform)){
          dermatogramStyle.maxHeight = '250px';
        }
        dermatogramRow = <Row style={{
          textAlign: 'center',
          position: 'relative',
          top: '0px'
        }}>
          <Col xs={6} md={4} style={{textAlign: 'center'}}>
            <Image responsive src='/packages/symptomatic_continuity-of-care/assets/dermatogram-female-front.png' onClick={this.onFemaleDermatogramClick} style={dermatogramStyleFemale} />   
          </Col>
          <Col xs={6} md={4} mdOffset={4} style={{textAlign: 'center'}}>
            <Image responsive src='/packages/symptomatic_continuity-of-care/assets/dermatogram-male-front.png' onClick={this.onMaleDermatogramClick} style={dermatogramStyleMale} />   
          </Col>
        </Row>
      // }
      







      fitzpatrickRow = <Row style={{
        textAlign: 'center',
        position: 'relative',
        top: ((Session.get('appHeight') - 128 ) * 0.5 - 300) + 'px'
      }}>
        <Col xs={2} style={{textAlign: 'center'}}>
          <Paper 
            onClick={ this.setFitzpatric.bind(this, 'I') }
            style={{
              width: '100%',
              minHeight: '200px',
              backgroundColor: '#F5E4CA'            
            }} />
          <RaisedButton 
            fullWidth
            backgroundColor="gray"
            backgroundColor='#ffffff'
            primary={false}
            style={{marginRight: '20px'}}                    
            label='Type I' />
        </Col>
        <Col xs={2} style={{textAlign: 'center'}}>
          <Paper 
            onClick={ this.setFitzpatric.bind(this, 'II') }
            style={{
              width: '100%',
              minHeight: '200px',
              backgroundColor: '#EABA99'
            }} />
          <RaisedButton 
            fullWidth
            backgroundColor="gray"
            backgroundColor='#ffffff'
            primary={false}
            style={{marginRight: '20px'}}                    
            label='Type II' />
        </Col>
        <Col xs={2} style={{textAlign: 'center'}}>
          <Paper 
            onClick={ this.setFitzpatric.bind(this, 'III') }
            style={{
              width: '100%',
              minHeight: '200px',
              backgroundColor: '#EDBB90'
            }} />
          <RaisedButton 
            fullWidth
            backgroundColor="gray"
            backgroundColor='#ffffff'
            primary={false}
            style={{marginRight: '20px'}}                    
            label='Type III' />
        </Col>
        <Col xs={2} style={{textAlign: 'center'}}>
          <Paper 
            onClick={ this.setFitzpatric.bind(this, 'IV') }
            style={{
              width: '100%',
              minHeight: '200px',
              backgroundColor: '#BC8E6A'
            }} />
          <RaisedButton 
            fullWidth
            backgroundColor="gray"
            backgroundColor='#ffffff'
            primary={false}
            style={{marginRight: '20px'}}                    
            label='Type IV' />
        </Col>
        <Col xs={2} style={{textAlign: 'center'}}>
          <Paper 
            onClick={ this.setFitzpatric.bind(this, 'V') }
            style={{
              width: '100%',
              minHeight: '200px',
              backgroundColor: '#905133'
            }} />
          <RaisedButton 
            fullWidth
            backgroundColor="gray"
            backgroundColor='#ffffff'
            primary={false}
            style={{marginRight: '20px'}}                    
            label='Type V' />
        </Col>
        <Col xs={2} style={{textAlign: 'center'}}>
          <Paper 
            onClick={ this.setFitzpatric.bind(this, 'VI') }
            style={{
              width: '100%',
              minHeight: '200px',
              backgroundColor: '#533F38'
            }} />
          <RaisedButton 
            fullWidth
            backgroundColor="gray"
            backgroundColor='#ffffff'
            primary={false}
            style={{marginRight: '20px'}}                    
            label='Type VI' />
        </Col>
      </Row>




      var karyotypeStyle = {};
      if(['iPhone'].includes(window.navigator.platform)){
        karyotypeStyle.display = "none";
        
        var nameData;
        var dobData
        var sexData;
        var bloodTypeData;
        var fitzpatrickData;


        if(this.data.HKCharacteristicTypeIdentifierDateOfBirth){
          dobData = <div>
              <b >Date of Birth:</b><br />
              { this.data.HKCharacteristicTypeIdentifierDateOfBirth }
              <br /><br />
          </div>
        }
        if(this.data.HKCharacteristicTypeIdentifierBiologicalSex && (this.data.HKCharacteristicTypeIdentifierBiologicalSex !== "unknown")){
          sexData = <div>
            <b >Biological Sex:</b><br />
            { this.data.HKCharacteristicTypeIdentifierBiologicalSex }
              <br /><br />
          </div>          
        }
        if(this.data.HKCharacteristicTypeIdentifierBloodType){
          bloodTypeData = <div>
            <b >Blood Type:</b><br />
            { this.data.HKCharacteristicTypeIdentifierBloodType }
            <br /><br />
          </div>          
        }
        if(this.data.HKCharacteristicTypeIdentifierFitzpatrickSkinType){
          fitzpatrickData = <div>
             <b >Fitzpatrick Type:</b><br />
              { this.data.HKCharacteristicTypeIdentifierFitzpatrickSkinType }
              <br /><br />
          </div>          
        }

        var importIconStyle = {textAlign: 'center'};
        if(['iPhone'].includes(window.navigator.platform)){
          importIconStyle.display = "none";
        }
        autoImportIntro = <div>
          <RaisedButton 
            primary={true}
            style={{marginRight: '20px', fontWeight: 200, width: '100%'}}     
            onClick={ this.importCoreBiomarkers.bind(this) }       
            fullWidth        
            label='Import Health Kit Demographics' />

          <DynamicSpacer />
          <Alert bsStyle="info" style={{fontSize: '18px', fontWeight: 200, marginBottom: '20px', minHeight: '420px'}}>
            <Col sm={3} style={importIconStyle}>
              <MdImportantDevices style={{fontSize: '48px', textAlign: 'center'}} />
            </Col>
            <Col sm={9}>
              { nameData }
              { dobData }
              { sexData }
              { bloodTypeData }
              { fitzpatrickData }
            </Col>
            <DynamicSpacer />
            <DynamicSpacer />
          </Alert>
          <DynamicSpacer />

          <RaisedButton 
            primary={true}
            style={{marginRight: '20px', fontWeight: 200, width: '100%'}}     
            onClick={ this.mergeIntoSymptomatic.bind(this) }       
            fullWidth        
            label='Merge Into Symptomatic' />
        </div>

      } else {
        autoImportIntro = <div>
          <p style={{fontSize: '18px'}}>We just scanned the usual places on this device where medical records are stored, and didn't find any.  Autoimport is not currently available, but that's okay!  We can continue with manual configuration and setup.  </p>
        </div>
      }
    }

    var mainPanel; 
    switch (stepIndex) {
      case 0:
        mainPanel = <div style={{textAlign: 'center', height: '100%'}}>
          <GlassCard height='auto'>
            <Alert bsStyle="warning">
              <b style={{fontSize: '18px', fontWeight: 200, textAlign: 'left'}}>This software is in <b>BETA</b> and is not in production yet.  Some features have not been implemented yet, and no warrantees are being made.  Functionality is currently limited to Apple HealthRecord data.</b>
            </Alert>

            <CardText>
              <div style={messageStyle} >
                <h1 style={{fontSize: '72px', fontWeight: 200}} >Welcome!</h1>
            </div>
            </CardText>
            <div style={{position: 'absolute', right: '0px', bottom: '0px'}}>
              {this.renderStepActions(0)}
            </div>
          </GlassCard>
        </div>
        break;
      case 1:
        mainPanel = <div>
          <GlassCard height='auto'>
            <CardTitle title="Detect Device" style={{textAlign: 'center'}} />
            <CardText>
              <DynamicSpacer  />
              <Grid>
                
                <Row>
                  <Col mdOffset={3} md={6}>
                    <DynamicSpacer />
                    <Alert bsStyle="info" style={alertStyle}>
                      <Col sm={3}>
                        <MdImportantDevices style={{fontSize: '48px', textAlign: 'center'}} />
                      </Col>
                      <Col sm={9}>
                        <b >Operating System:</b><br />
                        { platformInfo }
                        <DynamicSpacer />

                        <b >Language:</b><br />
                        { languageInfo } 
                        <DynamicSpacer />
                        
                        <b >Vendor:</b><br />
                        { vendorInfo }
                        <DynamicSpacer />

                      </Col>
                      <DynamicSpacer />
                      <DynamicSpacer />
                    </Alert>
                    
                  </Col>
                </Row>
              </Grid>
            </CardText>
            <div style={{position: 'absolute', right: '0px', bottom: '0px'}}>
              {this.renderStepActions(1)}
            </div>
          </GlassCard>
        </div>        
        break;
      case 2:
        mainPanel = <div>
          <GlassCard height='auto'>
            <CardText>
              <Grid>
                <PrivacyPolicyCard fontsize='18px' />
              </Grid>
            </CardText>
            <div style={{position: 'absolute', right: '0px', bottom: '0px'}}>
              {this.renderStepActions(2)}
            </div>
          </GlassCard>
        </div>        
        break;
      case 3:
        mainPanel = <div>
          <GlassCard height='auto'>
            <CardText>
              <Grid>
                <PrivacyControlsCard />
              </Grid>
            </CardText>
            <div style={{position: 'absolute', right: '0px', bottom: '0px'}}>
              {this.renderStepActions(3)}
            </div>
          </GlassCard>
        </div>        
        break;
      case 4:
        mainPanel = <div>
          <GlassCard height='auto'>
              <Grid>
                <CardTitle title='Terms and Conditions' subtitle={ moment().format('YYYY MMM DD') }/>
                <CardText>
                  <TermsConditionsCard />
                </CardText>
              </Grid>
            <div style={{position: 'absolute', right: '0px', bottom: '0px'}}>
              {this.renderStepActions(4)}
            </div>
          </GlassCard>
        </div>              
        break;
      case 5:
        mainPanel = <div>
          <GlassCard height='auto'>
            <CardTitle title="Import Demographics" style={{textAlign: 'center'}} />
            <CardText>
              <Grid>
                <Row>
                  <Col mdOffset={3} md={6}>
                    { autoImportIntro }                  
                  </Col>
                </Row>
              </Grid>
            </CardText>
            <div style={{position: 'absolute', right: '0px', bottom: '0px'}}>
              {this.renderStepActions(5)}
            </div>
          </GlassCard>
        </div>              
        break;        
      case 6:
        mainPanel = <div>
          <GlassCard height='auto'>
            <Grid>
              <CardTitle title="Names and Aliases" subtitle="Please enter your full legal name, as it appears on your driver's license or passport." />
              <CardText>
                <Row>
                  <Col md={6} >
                    <TextField
                      id='givenInput'
                      name='givenInput'
                      floatingLabelText="Given"
                      hintText='Jane'
                      value={this.data.name.given}
                      floatingLabelFixed={true}
                      fullWidth
                      style={{marginRight: '20px'}}
                      />
                  </Col>
                  <Col md={6} >
                    <TextField
                      id='familyInput'
                      name='familyInput'
                      floatingLabelText="Family"
                      hintText='Doe'
                      value={this.data.name.family}
                      floatingLabelFixed={true}
                      fullWidth
                      /><br/>
                  </Col>
                </Row>

                <TextField
                  id='nameInput'
                  name='humanNameInput'
                  floatingLabelText="Full Name"
                  hintText='Jane Doe'
                  value={this.data.name.text}
                  floatingLabelFixed={true}
                  fullWidth
                  /><br/>

                <DynamicSpacer />
                <DynamicSpacer />

                <Alert bsStyle="info">
                  <b style={{fontSize: '14px', fontWeight: 200}}>People spell their names differently all over the world.  Sometimes they list their family name last (common in the United States), but sometimes they list it first (Asia).  In some parts of the world, people only receive one name.  And othertimes they receive three or four names with suffixes.</b>
                </Alert>
              </CardText>
              <div style={{position: 'absolute', right: '0px', bottom: '0px', zIndex: 10000}}>
                {this.renderStepActions(6)}
              </div>
            </Grid>
          </GlassCard>
        </div>                
       break;
      case 7:
        mainPanel = <div>
          <GlassCard height='auto'>
            <Grid>
              <CardTitle title="Date of Birth" subtitle="Please enter your birthdate." />
              <CardText>
                <Row>
                  <Col mdOffset={3} md={6} >
                    <TextField
                      id='dateOfBirthInput'
                      name='dateOfBirthInput'
                      floatingLabelText="Date of Birth"
                      hintText='YYYY-MM-DD'
                      value={this.data.dateOfBirth}
                      floatingLabelFixed={true}
                      fullWidth
                      /><br/>
                  </Col>
                </Row>

                <DynamicSpacer />
                <DynamicSpacer />

                {/* <Alert bsStyle="info">
                  <b style={{fontSize: '14px', fontWeight: 200}}>People spell their names differently all over the world.  Sometimes they list their family name last (common in the United States), but sometimes they list it first (Asia).  In some parts of the world, people only receive one name.  And othertimes they receive three or four names with suffixes.</b>
                </Alert> */}
              </CardText>
              <div style={{position: 'absolute', right: '0px', bottom: '0px', zIndex: 10000}}>
                {this.renderStepActions(7)}
              </div>
            </Grid>
          </GlassCard>
        </div>                
        break;

      case 8:
        mainPanel = <div>
          <GlassCard height='auto'>
          <Grid>
            <CardTitle title="Sex and Gender" subtitle='' />
            <DynamicSpacer />
            <CardText>
              { dermatogramRow }
            </CardText>
            <DynamicSpacer />

            <CardTitle title="Administrative Gender" style={{fontSize: '18px',  marginBottom: '0px', padding: '0px'}} />
            <CardText>

              <Row>
                <Col xs={4}>
                  <RaisedButton
                    // href="https://github.com/clinical-meteor/meteor-on-fhir/releases/download/v1.0-prerelease-3/Symptomatic.Desktop-0.9.4.dmg"
                    // target="_blank"
                    label="Female"
                    backgroundColor="gray"
                    labelColor= "#ffffff"
                    color='#ffffff'
                    icon={<FaVenus color="#ffffff" />}                  
                    primary={ get(this, 'data.buttons.gender.female') }
                    onClick= { this.toggleFemaleGender }
                    fullWidth
                    style={{marginRight: '20px'}}
                  />
                </Col>
                <Col xs={4}>
                  <RaisedButton
                    // href="https://github.com/clinical-meteor/meteor-on-fhir/releases/download/v1.0-prerelease-3/Symptomatic.Desktop-0.9.4.dmg"
                    // target="_blank"
                    label="Other"
                    backgroundColor="gray"
                    labelColor= "#ffffff"
                    color='#ffffff'
                    icon={<FaTransgenderAlt color="#ffffff" />}                  
                    primary={ get(this, 'data.buttons.gender.other') }
                    onClick= { this.toggleOtherGender }
                    fullWidth
                    style={{marginRight: '20px'}}
                  />
                </Col>
                <Col xs={4}>
                  <RaisedButton
                    // href="https://github.com/clinical-meteor/meteor-on-fhir/releases/download/v1.0-prerelease-3/Symptomatic.Desktop-0.9.4.dmg"
                    // target="_blank"
                    label="Male"
                    backgroundColor="gray"
                    labelColor= "#ffffff"
                    color='#ffffff'
                    icon={<FaMars color="#ffffff" />}                  
                    primary={ get(this, 'data.buttons.gender.male') }
                    style={{marginRight: '20px'}}
                    fullWidth
                    onClick= { this.toggleMaleGender }
                  />
                </Col>

              </Row>
            </CardText>

            <DynamicSpacer />

            <CardTitle title="Sexual Health" style={{ fontSize: '18px',  marginBottom: '0px', padding: '0px'}} />
            <CardText>
              <Row>
                <Col xs={4}>
                  <RaisedButton 
                    backgroundColor="gray"
                    labelColor= "#ffffff"
                    color='#ffffff'
                    primary={ get(this, 'data.buttons.anatomy.yanic') }
                    style={{marginRight: '20px'}}
                    onClick= { this.toggleAnatomyYanic }
                    fullWidth
                    label='Gynecology' />
                </Col>
                <Col xs={4}>
                  <RaisedButton 
                    backgroundColor="gray"
                    labelColor= "#ffffff"
                    color='#ffffff'
                    primary={ get(this, 'data.buttons.anatomy.undisclosed') }
                    style={{marginRight: '20px'}}
                    onClick= { this.toggleAnatomyUndisclosed }
                    fullWidth
                    label='Androgeny' />
                </Col>
                <Col xs={4}>
                <RaisedButton 
                  backgroundColor="gray"
                  labelColor= "#ffffff"
                  color='#ffffff'
                  primary={ get(this, 'data.buttons.anatomy.phallic') }
                  style={{marginRight: '20px'}}
                  onClick= { this.toggleAnatomyPhallic }
                  fullWidth
                  label='Andrology' />
                </Col>
              </Row>
              </CardText>

              <DynamicSpacer />
              <DynamicSpacer />

              <div style={karyotypeStyle} >
                <CardTitle title="Karyotype / Chromosomes" style={{ fontSize: '18px',  marginBottom: '0px', padding: '0px'}} />
                <CardText>
                  <Row>
                    <RaisedButton 
                      backgroundColor="gray"
                      labelColor= "#ffffff"
                      color='#ffffff'
                      primary={ get(this, 'data.buttons.karyotype.unknown') }
                      style={{marginRight: '20px'}}                    
                      onClick= { this.toggleKaryotypeUnknown }
                      label='Unknown' />
                    <RaisedButton 
                      backgroundColor="gray"
                      labelColor= "#ffffff"
                      color='#ffffff'
                      primary={ get(this, 'data.buttons.karyotype.xx') }
                      style={{marginRight: '20px'}}
                      onClick= { this.toggleKaryotypeXx }
                      label='XX' />
                    <RaisedButton 
                      backgroundColor="gray"
                      labelColor= "#ffffff"
                      color='#ffffff'
                      primary={ get(this, 'data.buttons.karyotype.xy') }
                      style={{marginRight: '20px'}}
                      onClick= { this.toggleKaryotypeXy }
                      label='XY' />
                    <RaisedButton 
                      backgroundColor="gray"
                      labelColor= "#ffffff"
                      color='#ffffff'
                      primary={ get(this, 'data.buttons.karyotype.xxy') }
                      style={{marginRight: '20px'}}                    
                      onClick= { this.toggleKaryotypeXxy }
                      label='XXY' />
                    <RaisedButton 
                      backgroundColor="gray"
                      labelColor= "#ffffff"
                      color='#ffffff'
                      primary={ get(this, 'data.buttons.karyotype.xxxy') }
                      style={{marginRight: '20px'}}                    
                      onClick= { this.toggleKaryotypeXxxy }
                      label='XX/XY' />
                    <RaisedButton 
                      backgroundColor="gray"
                      labelColor= "#ffffff"
                      color='#ffffff'
                      primary={ get(this, 'data.buttons.karyotype.xo') }
                      style={{marginRight: '20px'}}                    
                      onClick= { this.toggleKaryotypeXo }
                      label='XO' /> 
                  </Row>

                  <DynamicSpacer />
                    <p>
                      Please note:  relying on physical anatomy is not a reliable proxy for chromosomal karyotype.  Unless you have had children or had a karyotype test, best practice is to leave this 'unknown'.
                    </p>
                  </CardText>
                </div>

                <DynamicSpacer />

              {/* </Grid> */}

            </Grid>

            <div style={{position: 'absolute', right: '0px', bottom: '0px'}}>
              {this.renderStepActions(8)}
            </div>
          </GlassCard>
        </div>          
        break;
      case 9:
        mainPanel = <div>
          <GlassCard height='auto'>
            <CardTitle title="Dermatology" subtitle='Please specify your skin type (Fitzpatric Scale) and melanin count.  This is optional, and enables some dermatology and cancer screening functionality.' />
            <CardText>

                { fitzpatrickRow }

                <DynamicSpacer />


            </CardText>
            <div style={{position: 'absolute', right: '0px', bottom: '0px'}}>
              {this.renderStepActions(9)}
            </div>
          </GlassCard>
        </div>                
        break;
      case 10:
        mainPanel = <div>
          <GlassCard height='auto'>
            <CardTitle title="Facebook Profile" subtitle="Social determinants of health, mental health, support network, medical history, and more...." />
            <CardText>

              <div style={messageStyle}>
                <p>
                  Your Facebook profile contains a lot of information that may be relevant to your healthcare.  We're primarily interested in gathering a) your care circle that you rely on in emergencies and times of illness, b) mental health conditions that you may have blogged about, and c) any photos of injuries you may have shared.
                </p>
                <RaisedButton 
                  backgroundColor="gray"
                  labelColor= "#ffffff"
                  color='#ffffff'
                  primary={false}
                  style={{marginRight: '20px'}}                    
                  label='Import Facebook Profile' 
                  disabled={true}
                  />
              </div>
              <DynamicSpacer />
            </CardText>
            <div style={{position: 'absolute', right: '0px', bottom: '0px'}}>
              {this.renderStepActions(10)}
            </div>
          </GlassCard>
        </div>          
        break;
      case 11:
        mainPanel = <div>
          <GlassCard height='auto'>
            <CardTitle title="Import Medical Charts" subtitle="Using Fast Healthcare Interoperability Resources." />
            <CardText>
              <DynamicSpacer />

                <div style={messageStyle}>
                  <p>
                    Your medical charts may be spread out through many healthcare systems.  Using industry standard interoperability protocols, we're going to try to fetch those records and consolidate them.
                  </p>

                  {/* <RaisedButton 
                    backgroundColor="gray"
                    labelColor= "#ffffff"
                    color='#ffffff'
                    primary={false}
                    style={{marginRight: '20px'}}                    
                    label='Apple HealthRecord' /> */}
                  <RaisedButton 
                    backgroundColor="gray"
                    labelColor= "#ffffff"
                    color='#ffffff'
                    primary={false}
                    style={{marginRight: '20px'}}                    
                    disabled={true}
                    label='Epic MyChart' />
                  <RaisedButton 
                    backgroundColor="gray"
                    labelColor= "#ffffff"
                    color='#ffffff'
                    primary={false}
                    disabled={true}
                    style={{marginRight: '20px'}}                    
                    label='Cerner CareAnywhere' />
                  <RaisedButton 
                    backgroundColor="gray"
                    labelColor= "#ffffff"
                    color='#ffffff'
                    primary={false}
                    disabled={true}
                    style={{marginRight: '20px'}}                    
                    label='Allscripts FollowMyHealth' />
                </div>
              <DynamicSpacer />
            </CardText>
            <div style={{position: 'absolute', right: '0px', bottom: '0px'}}>
              {this.renderStepActions(11)}
            </div>
          </GlassCard>
        </div>              
        break;
      case 12:
        mainPanel = <div>
            <Row style={{minHeight: '200px'}}>
              <Col md={12} >
                <GlassCard height='auto'>
                  <CardText>                    
                    <div style={messageStyle} >
                        <h1 style={{fontSize: '72px', fontWeight: 200}} >All done!</h1>
                        <RaisedButton label="View Timeline" onClick={ this.gotoTimeline } primary={true} />
                    </div>
                  </CardText>
                </GlassCard>
              </Col>
            </Row>
            <DynamicSpacer />

            {/* <Row>
              <Col md={4} >
                <GlassCard height={ Session.get('appHeight') - 400} >
                  <CardText>A</CardText>
                </GlassCard>
              </Col>
              <Col md={4} >
                <GlassCard height={ Session.get('appHeight') - 400} >
                  <CardText>B</CardText>
                </GlassCard>
              </Col>
              <Col md={4} >
                <GlassCard height={ Session.get('appHeight') - 400} >
                  <CardText>C</CardText>
                </GlassCard>
              </Col>
            </Row> */}
        </div>            
        break;
      default:
        break;
    }

    let stepperStyle = {
      marginBottom: '20px'
    }
    if(['iPhone'].includes(window.navigator.platform)){
      stepperStyle.display = 'none';
    }

    return(
      <div id="welcomePatientPage">
        <FullPageCanvas>
          <Col md={2} >

            <GlassCard style={ stepperStyle } height='auto' >
              <Stepper activeStep={stepIndex} orientation="vertical">
              <Step>
                <StepLabel style={{fontSize: '18px', fontWeight: 200}} >Getting Started</StepLabel>
              </Step>
              <Step>
                <StepLabel style={{fontSize: '18px', fontWeight: 200}} >Device Detection</StepLabel>
              </Step>
              <Step>
                <StepLabel style={{fontSize: '18px', fontWeight: 200}} >Privacy Policy</StepLabel>
              </Step>
              <Step>
                <StepLabel style={{fontSize: '18px', fontWeight: 200}} >Privacy Controls</StepLabel>
              </Step>
              <Step>
                <StepLabel style={{fontSize: '18px', fontWeight: 200}} >Terms and Conditions</StepLabel>
              </Step>
              <Step>
                <StepLabel style={{fontSize: '18px', fontWeight: 200}} >Autoimport Demographics</StepLabel>
              </Step>
              <Step>
                <StepLabel style={{fontSize: '18px', fontWeight: 200}} >Name</StepLabel>
              </Step>
              <Step>
                <StepLabel style={{fontSize: '18px', fontWeight: 200}} >Age</StepLabel>
              </Step>
              <Step>
                <StepLabel style={{fontSize: '18px', fontWeight: 200}} >Sex & Gender</StepLabel>
              </Step>
              <Step>
                <StepLabel style={{fontSize: '18px', fontWeight: 200}} >Dermatology</StepLabel>
              </Step>
              <Step>
                <StepLabel style={{fontSize: '18px', fontWeight: 200}} >Import Facebook Profile</StepLabel>
              </Step>
              <Step>
                <StepLabel style={{fontSize: '18px', fontWeight: 200}} >Import Medical Charts</StepLabel>
              </Step>
              {/* <Step>
                <StepLabel style={{fontSize: '18px', fontWeight: 200}} >Your Timeline</StepLabel>                
              </Step> */}
            </Stepper>

            </GlassCard>
            </Col>
            <Col md={10} style={{marginBottom: '20px'}}>
                { mainPanel }
            </Col>

        </FullPageCanvas>
      </div>
    );
  }
}

ReactMixin(WelcomePatientPage.prototype, ReactMeteorData);
export default WelcomePatientPage;
