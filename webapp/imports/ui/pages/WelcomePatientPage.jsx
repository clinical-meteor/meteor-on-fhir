import { 
  CardActions, 
  CardText, 
  CardTitle,   
  FlatButton,
  Step,
  Stepper,
  StepContent,
  StepLabel,
  RaisedButton
} from 'material-ui';

import { Alert } from 'react-bootstrap';
import React from 'react';

import { VerticalCanvas, GlassCard } from 'meteor/clinical:glass-ui';
import { browserHistory } from 'react-router';

import { TermsConditionsCard } from '../components/TermsConditionsCard';
import { DefaultPrivacyPolicyCard } from '../components/PrivacyPolicyCard';

export class WelcomePatientPage extends React.Component {
  constructor(props) {
    super(props);
    this. state = {
      finished: false,
      stepIndex: 0
    };
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
                <DefaultPrivacyPolicyCard />
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
                  Try out different ad text to see what brings in the most customers,
                  and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if
                  they're running and how to resolve approval issues.
                </p>
                {this.renderStepActions(3)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel style={{fontSize: '24px', fontWeight: 200}} >Specify your Sex & Gender</StepLabel>
              <StepContent>
                <p>
                  Try out different ad text to see what brings in the most customers,
                  and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if
                  they're running and how to resolve approval issues.
                </p>
                {this.renderStepActions(4)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel style={{fontSize: '24px', fontWeight: 200}} >Specify your Race & Ethnicity</StepLabel>
              <StepContent>
                <p>
                  Try out different ad text to see what brings in the most customers,
                  and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if
                  they're running and how to resolve approval issues.
                </p>
                {this.renderStepActions(5)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel style={{fontSize: '24px', fontWeight: 200}} >Import a Facebook Profile</StepLabel>
              <StepContent>
                {/* <p>
                  Try out different ad text to see what brings in the most customers,
                  and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if
                  they're running and how to resolve approval issues.
                </p>*/}
                {this.renderStepActions(6)} 
              </StepContent>
            </Step>
            <Step>
              <StepLabel style={{fontSize: '24px', fontWeight: 200}} >Import a Medical Chart</StepLabel>
              <StepContent>
                {/* <p>
                  Try out different ad text to see what brings in the most customers,
                  and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if
                  they're running and how to resolve approval issues.
                </p>*/}
                {this.renderStepActions(7)} 
              </StepContent>
            </Step>
            <Step>
              <StepLabel style={{fontSize: '24px', fontWeight: 200}} >Review Your Timeline</StepLabel>
              <StepContent>
                {/* <p>
                  Try out different ad text to see what brings in the most customers,
                  and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if
                  they're running and how to resolve approval issues.
                </p>*/}
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
export default WelcomePatientPage;
