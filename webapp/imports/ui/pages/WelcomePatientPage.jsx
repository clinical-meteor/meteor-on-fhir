import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

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

import { VerticalCanvas, GlassCard, DynamicSpacer } from 'meteor/clinical:glass-ui';
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
        actionButtonLabel = 'Next'
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
  render(){
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return(
      <div id="welcomePatientPage">
        <VerticalCanvas>



          <GlassCard style={{marginBottom: '20px'}} height='auto' >
            <Stepper activeStep={stepIndex} orientation="vertical">
            <Step>
              <StepLabel style={{fontSize: '24px', fontWeight: 200}} >Getting Started</StepLabel>
              <StepContent>
                <p>Welcome to Symptomatic.  Let's begin getting your medical history setup.  Depending on your age and complexity of your medical conditions, this may be as simple as a 10 or 20 minute process, or it may take many weeks as you work with your healthcare providers to get electronic copies of your records.  You can come back to this setup page at any time and resume where you left off.  </p>

                <Alert bsStyle="warning">
                  <b>This software is in BETA and is not in production yet.  Some features have not been implemented yet, and no warrantees are currently being made for it's suitability or fitness for any purpose.</b>
                </Alert>

                {this.renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel style={{fontSize: '24px', fontWeight: 200}} >Review Privacy Policy</StepLabel>
              <StepContent>
                <PrivacyPolicyCard />
                {this.renderStepActions(1)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel style={{fontSize: '24px', fontWeight: 200}} >Review Terms and Conditions</StepLabel>
              <StepContent>
                <TermsConditionsCard />
                {this.renderStepActions(2)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel style={{fontSize: '24px', fontWeight: 200}} >Specify your Name</StepLabel>
              <StepContent>
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
              </StepContent>
            </Step>
            <Step>
              <StepLabel style={{fontSize: '24px', fontWeight: 200}} >Specify your Sex & Gender</StepLabel>
              <StepContent>
                <p>
                  Please specify your legal / administrative gender as it appears on your driver's license or passport. This is optional, and provides opt-in functionality to Symptomatic.  Administrative Gender is distinct from your biological, anatomical, or chromosomal sex.  
                </p>
                  <RaisedButton
                    // href="https://github.com/clinical-meteor/meteor-on-fhir/releases/download/v1.0-prerelease-3/Symptomatic.Desktop-0.9.4.dmg"
                    // target="_blank"
                    label="Male"
                    backgroundColor="gray"
                    labelColor= "#ffffff"
                    color='#ffffff'
                    icon={<FaMars color="#ffffff" />}                  
                    primary={false}
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
                    primary={false}
                    style={{marginRight: '20px'}}
                  />
                  <RaisedButton
                    // href="https://github.com/clinical-meteor/meteor-on-fhir/releases/download/v1.0-prerelease-3/Symptomatic.Desktop-0.9.4.dmg"
                    // target="_blank"
                    label="Female"
                    backgroundColor="gray"
                    labelColor= "#ffffff"
                    color='#ffffff'
                    icon={<FaVenus color="#ffffff" />}                  
                    primary={false}
                    style={{marginRight: '20px'}}
                  />
                  <RaisedButton
                    // href="https://github.com/clinical-meteor/meteor-on-fhir/releases/download/v1.0-prerelease-3/Symptomatic.Desktop-0.9.4.dmg"
                    // target="_blank"
                    label="Unknown"
                    backgroundColor="gray"
                    labelColor= "#ffffff"
                    color='#ffffff'
                    icon={<FaMercury color="#ffffff" />}                  
                    primary={false}
                    style={{marginRight: '20px'}}
                  />
                <DynamicSpacer />

                <p>
                  Please specify your karyotype, if known.  You can generally assume XX or XY based on your administrative gender, but this is not assured!
                </p>

                  <RaisedButton 
                    backgroundColor="gray"
                    labelColor= "#ffffff"
                    color='#ffffff'
                    primary={false}
                    style={{marginRight: '20px'}}
                    label='XY' />
                  <RaisedButton 
                    backgroundColor="gray"
                    labelColor= "#ffffff"
                    color='#ffffff'
                    primary={false}
                    style={{marginRight: '20px'}}
                    label='XX' />
                  <RaisedButton 
                    backgroundColor="gray"
                    labelColor= "#ffffff"
                    color='#ffffff'
                    primary={false}
                    style={{marginRight: '20px'}}                    
                    label='XXY' />
                  <RaisedButton 
                    backgroundColor="gray"
                    labelColor= "#ffffff"
                    color='#ffffff'
                    primary={false}
                    style={{marginRight: '20px'}}                    
                    label='XX/XY' />
                  <RaisedButton 
                    backgroundColor="gray"
                    labelColor= "#ffffff"
                    color='#ffffff'
                    primary={false}
                    style={{marginRight: '20px'}}                    
                    label='XO' /> 
                  <RaisedButton 
                    backgroundColor="gray"
                    labelColor= "#ffffff"
                    color='#ffffff'
                    primary={false}
                    style={{marginRight: '20px'}}                    
                    label='Unknown' />

                <DynamicSpacer />
                <p>
                  Please specify your anatomy.  This is optional, and enables functionality such as.
                </p>
                <RaisedButton 
                    backgroundColor="gray"
                    labelColor= "#ffffff"
                    color='#ffffff'
                    primary={false}
                    style={{marginRight: '20px'}}
                    label='Phallic / Android' />
                  <RaisedButton 
                    backgroundColor="gray"
                    labelColor= "#ffffff"
                    color='#ffffff'
                    primary={false}
                    style={{marginRight: '20px'}}
                    label='Yanic / Gynoid' />
                  <RaisedButton 
                    backgroundColor="gray"
                    labelColor= "#ffffff"
                    color='#ffffff'
                    primary={false}
                    style={{marginRight: '20px'}}
                    label='Prefer Not to Say' />

                <DynamicSpacer />
                {this.renderStepActions(4)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel style={{fontSize: '24px', fontWeight: 200}} >Specify your Race & Ethnicity</StepLabel>
              <StepContent>
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
              </StepContent>
            </Step>
            <Step>
              <StepLabel style={{fontSize: '24px', fontWeight: 200}} >Import a Facebook Profile</StepLabel>
              <StepContent>
                <DynamicSpacer />

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
                    />
                  <DynamicSpacer />

                {this.renderStepActions(6)} 
              </StepContent>
            </Step>
            <Step>
              <StepLabel style={{fontSize: '24px', fontWeight: 200}} >Import a Medical Chart</StepLabel>
              <StepContent>

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
                    label='Epic MyChart' />
                  <RaisedButton 
                    backgroundColor="gray"
                    labelColor= "#ffffff"
                    color='#ffffff'
                    primary={false}
                    style={{marginRight: '20px'}}                    
                    label='Cerner CareAnywhere' />
                  <RaisedButton 
                    backgroundColor="gray"
                    labelColor= "#ffffff"
                    color='#ffffff'
                    primary={false}
                    style={{marginRight: '20px'}}                    
                    label='Allscripts FollowMyHealth' />

                <DynamicSpacer />
                {this.renderStepActions(7)} 
              </StepContent>
            </Step>
            <Step>
              <StepLabel style={{fontSize: '24px', fontWeight: 200}} >Review Your Timeline</StepLabel>
              <StepContent>

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
              </StepContent>
            </Step>
          </Stepper>
          
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}

ReactMixin(WelcomePatientPage.prototype, ReactMeteorData);
export default WelcomePatientPage;
