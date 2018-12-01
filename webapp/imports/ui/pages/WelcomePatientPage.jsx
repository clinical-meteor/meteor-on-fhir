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
  TextField
} from 'material-ui';

import { FullPageCanvas, GlassCard, DynamicSpacer } from 'meteor/clinical:glass-ui';
import { browserHistory } from 'react-router';

import { Alert, Grid, Container, Col, Row } from 'react-bootstrap';

import { TermsConditionsCard } from '../components/TermsConditionsCard';
import { PrivacyPolicyCard } from '../components/PrivacyPolicyCard';

import { FaInfoCircle } from 'react-icons/fa';
import { FaMars } from 'react-icons/fa';
import { FaVenus } from 'react-icons/fa';
import { FaMercury } from 'react-icons/fa';
import { FaTransgenderAlt } from 'react-icons/fa';
import { FaTransgender } from 'react-icons/fa';

import { Image } from 'react-bootstrap';


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
        given: get(Meteor.user(), 'profile.name.given')
      }
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
        actionButtonLabel = 'Next'
        break;
      case 1:
        actionButtonLabel = 'Accept'
        break;
      case 2:
        actionButtonLabel = 'Accept'
        break;
      case 3:
        actionButtonLabel = 'Next'
        break;
      case 4:
        actionButtonLabel = 'Next'
        break;
      case 5:
        actionButtonLabel = 'Next'
        break;
      case 6:
        actionButtonLabel = 'Next'
        break;
      case 7:
        actionButtonLabel = 'Next'
        break;
      case 8:
        actionButtonLabel = 'Finish'
        break;    
      default:
        break;
    }

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={ actionButtonLabel }
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
          />
        )}
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
  toggleAnatomyPhalic(){
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
  render(){
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    var dermatogramRow;
    if(Package['symptomatic:continuity-of-care']){
      dermatogramRow = <Row>
        <Col md={6} style={{textAlign: 'center'}}>
          <Image responsive src='/packages/symptomatic_continuity-of-care/assets/dermatogram-female-front.png' onClick={this.onFemaleDermatogramClick} style={{maxHeight: '400px', display: 'inline-block', cursor: 'pointer'}} />   
        </Col>
        <Col md={6} style={{textAlign: 'center'}}>
          <Image responsive src='/packages/symptomatic_continuity-of-care/assets/dermatogram-male-front.png' onClick={this.onMaleDermatogramClick} style={{maxHeight: '400px', display: 'inline-block', cursor: 'pointer'}} />   
        </Col>
      </Row>

    }

    var mainPanel; 
    switch (stepIndex) {
      case 0:
        mainPanel = <div>
          <Alert bsStyle="warning">
            <b style={{fontSize: '14px', fontWeight: 200}}>This software is in <b>BETA</b> and is not in production yet.  Some features have not been implemented yet, and no warrantees are being made.  Functionality is currently limited to Apple HealthRecord data.</b>
          </Alert>

          <CardText>
            <h1 style={{fontSize: '72px', fontWeight: 200}} >Welcome!</h1>
            <DynamicSpacer />
            <p style={{fontSize: '28px'}}>Let's begin getting your medical history setup.  Depending on your age and complexity of your medical conditions, this may be as simple as a 10 or 20 minute process.  Or it may take many weeks as you work with your healthcare providers to get electronic copies of your records.  </p>

            <DynamicSpacer />
            <p style={{fontSize: '28px'}}>You can come back to this setup page at any time and resume where you left off.  </p>

            {this.renderStepActions(0)}
          </CardText>
        </div>
        break;
      case 1:
        mainPanel = <div>
          <CardText>
            <PrivacyPolicyCard />
            {this.renderStepActions(1)}
          </CardText>
        </div>        
        break;
      case 2:
        mainPanel = <div>
          <CardTitle title="Terms and Conditions" />
          <CardText>
            <TermsConditionsCard />
            {this.renderStepActions(2)}
          </CardText>
        </div>              
        break;
      case 3:
        mainPanel = <div>
          <CardTitle title="Names and Aliases" />
          <CardText>
            <Grid>
              <p>
                When you registered your username and password, you provided the following given and family name.  
              </p>
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

              <TextField
                id='familyInput'
                name='familyInput'
                floatingLabelText="Family"
                hintText='Doe'
                value={this.data.name.family}
                floatingLabelFixed={true}
                fullWidth
                /><br/>
              <DynamicSpacer />
              <p>
                Please enter your full legal name, as it appears on your driver's license or passport.  We will parse out given and family names, and allow you to specify nicknames and aliases.
              </p>
              <TextField
                id='nameInput'
                name='humanNameInput'
                floatingLabelText="Full Name"
                hintText='Jane Doe'
                floatingLabelFixed={true}
                fullWidth
                /><br/>

              <p>
                <FaInfoCircle /> People spell their names differently all over the world.  Sometimes they list their family name last (common in the United States), but sometimes they list it first (Asia).  In some parts of the world, people only receive one name.  And othertimes they receive three or four names with suffixes.  
              </p>
              {this.renderStepActions(3)}
            </Grid>
          </CardText>
        </div>                
        break;
      case 4:
        mainPanel = <div>
          <CardTitle title="Sex and Gender" />
          <CardText>
            {/* <Grid> */}
              <p>
                For the vast majority of people, sex and gender is determined at birth, and is simply a matter of being male or female.                  
              </p>
              <DynamicSpacer />
              { dermatogramRow }
              <DynamicSpacer />
              <p>
                Sometimes sex and gender can get complicated.  If your legal or administrative gender differs from your birth sex, please list what appears on your driver's license or passport.  
              </p>

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
                  style={{marginRight: '20px'}}
                />
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
                  style={{marginRight: '20px'}}
                />
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
                  onClick= { this.toggleMaleGender }
                />
                {/* <RaisedButton
                  // href="https://github.com/clinical-meteor/meteor-on-fhir/releases/download/v1.0-prerelease-3/Symptomatic.Desktop-0.9.4.dmg"
                  // target="_blank"
                  label="Unknown"
                  backgroundColor="gray"
                  labelColor= "#ffffff"
                  color='#ffffff'
                  icon={<FaMercury color="#ffffff" />}                  
                  primary={false}
                  style={{marginRight: '20px'}}
                /> */}

              <DynamicSpacer />
              <p>
                Please specify your anatomy.  This is completely optional, and you can use Symptomatic without specifying.   If you chose to specify, it will enables functionality such as maternity tracking and breast cancer screening or prostate cancer screening.
              </p>

                <RaisedButton 
                  backgroundColor="gray"
                  labelColor= "#ffffff"
                  color='#ffffff'
                  primary={ get(this, 'data.buttons.anatomy.yanic') }
                  style={{marginRight: '20px'}}
                  onClick= { this.toggleAnatomyYanic }
                  label='Yanic ' />
                <RaisedButton 
                  backgroundColor="gray"
                  labelColor= "#ffffff"
                  color='#ffffff'
                  primary={ get(this, 'data.buttons.anatomy.phallic') }
                  style={{marginRight: '20px'}}
                  onClick= { this.toggleAnatomyPhallic }
                  label='Phallic ' />
                <RaisedButton 
                  backgroundColor="gray"
                  labelColor= "#ffffff"
                  color='#ffffff'
                  primary={ get(this, 'data.buttons.anatomy.undisclosed') }
                  style={{marginRight: '20px'}}
                  onClick= { this.toggleAnatomyUndisclosed }
                  label='Prefer Not to Say' />



              <DynamicSpacer />



              <p>
                Please specify your karyotype, if known.  Relying on your anatomy is not a reliable proxy for chromosomal karyotype (for example, androgen insensitivity syndrome).  Unless you have had children or had a karyotype test, it's best to leave this 'unknown'.
              </p>
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



              <DynamicSpacer />
              {this.renderStepActions(4)}

            {/* </Grid> */}
          </CardText>
        </div>          
        break;
      case 5:
        mainPanel = <div>
          <CardTitle title="Dermatology" />
          <CardText>
            <DynamicSpacer />
              <p>
                Please specify your skin type (Fitzpatric Scale) and melanin count.  This is optional, and enables some dermatology and cancer screening functionality.   
              </p>

                <RaisedButton 
                  backgroundColor="gray"
                  labelColor= "#ffffff"
                  color='#ffffff'
                  primary={false}
                  style={{marginRight: '20px'}}                    
                  label='Type I' />
                <RaisedButton 
                  backgroundColor="gray"
                  labelColor= "#ffffff"
                  color='#ffffff'
                  primary={false}
                  style={{marginRight: '20px'}}                    
                  label='Type II' />
                <RaisedButton 
                  backgroundColor="gray"
                  labelColor= "#ffffff"
                  color='#ffffff'
                  primary={false}
                  style={{marginRight: '20px'}}                    
                  label='Type III' />
                <RaisedButton 
                  backgroundColor="gray"
                  labelColor= "#ffffff"
                  color='#ffffff'
                  primary={false}
                  style={{marginRight: '20px'}}                    
                  label='Type IV' />
                <RaisedButton 
                  backgroundColor="gray"
                  labelColor= "#ffffff"
                  color='#ffffff'
                  primary={false}
                  style={{marginRight: '20px'}}                    
                  label='Type V' />
                <RaisedButton 
                  backgroundColor="gray"
                  labelColor= "#ffffff"
                  color='#ffffff'
                  primary={false}
                  style={{marginRight: '20px'}}                    
                  label='Type VI' />

              <DynamicSpacer />
              {this.renderStepActions(5)}

          </CardText>
        </div>                
        break;
      case 6:
        mainPanel = <div>
          <Alert bsStyle="warning">
            <b style={{fontSize: '14px', fontWeight: 200}}>This software is in <b>BETA</b> and is not in production yet.  Some features have not been implemented yet, and no warrantees are being made.  Functionality is currently limited to Apple HealthRecord data.</b>
          </Alert>
          <DynamicSpacer />

          <CardTitle title="Facebook Profile" />
          <CardText>

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
            <DynamicSpacer />

            {this.renderStepActions(6)} 

          </CardText>


        </div>          
        break;
      case 7:
        mainPanel = <div>
          <CardText>
            <DynamicSpacer />
              <p>
                Your medical charts may be spread out through many healthcare systems.  Using industry standard interoperability protocols, we're going to try to fetch those records and consolidate them.
              </p>

              <RaisedButton 
                backgroundColor="gray"
                labelColor= "#ffffff"
                color='#ffffff'
                primary={false}
                style={{marginRight: '20px'}}                    
                label='Apple HealthRecord' />
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

            <DynamicSpacer />
            {this.renderStepActions(7)} 

          </CardText>
        </div>              
        break;
      case 8:
        mainPanel = <div>
          <CardText>
            <RaisedButton 
              backgroundColor="gray"
              labelColor= "#ffffff"
              color='#ffffff'
              primary={false}
              style={{marginRight: '20px'}}                    
              label='Continuity of Care Document' />
            <RaisedButton 
              backgroundColor="gray"
              labelColor= "#ffffff"
              color='#ffffff'
              primary={false}
              style={{marginRight: '20px'}}                    
              label='MyTimeline' />

            <DynamicSpacer />
            {this.renderStepActions(8)} 
          </CardText>
        </div>            
        break;
      case 9:
        mainPanel = <div>

        </div>              
        break;    
      default:
        break;
    }
    return(
      <div id="welcomePatientPage">
        <FullPageCanvas>
          <Col md={2} >

            <GlassCard style={{marginBottom: '20px'}} height='auto' >
              <Stepper activeStep={stepIndex} orientation="vertical">
              <Step>
                <StepLabel style={{fontSize: '18px', fontWeight: 200}} >Getting Started</StepLabel>
              </Step>
              <Step>
                <StepLabel style={{fontSize: '18px', fontWeight: 200}} >Privacy Policy</StepLabel>
              </Step>
              <Step>
                <StepLabel style={{fontSize: '18px', fontWeight: 200}} >Terms and Conditions</StepLabel>
              </Step>
              <Step>
                <StepLabel style={{fontSize: '18px', fontWeight: 200}} >Name</StepLabel>
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
              <Step>
                <StepLabel style={{fontSize: '18px', fontWeight: 200}} >Your Timeline</StepLabel>                
              </Step>
            </Stepper>

            </GlassCard>
            </Col>
            <Col md={10} style={{marginBottom: '20px'}}>
              <GlassCard height='auto'>
                { mainPanel }
              </GlassCard>
            </Col>

        </FullPageCanvas>
      </div>
    );
  }
}

ReactMixin(WelcomePatientPage.prototype, ReactMeteorData);
export default WelcomePatientPage;
