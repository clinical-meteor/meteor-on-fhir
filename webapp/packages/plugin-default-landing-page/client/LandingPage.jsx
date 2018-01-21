import { Card, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import { Col, Grid, Row } from 'react-bootstrap';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import Avatar from 'material-ui/Avatar';
import { FullPageCanvas } from './FullPageCanvas';
import GlassCard from './GlassCard';
import OrbitalGlyph from '../components/orbital/OrbitalGlyph';
import React from 'react';
import ReactRotatingText from 'react-rotating-text';
import scrolltoElement from 'scrollto-element';

var height = window.innerHeight;

export class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      description: ''
    };    
  }
  isSelected(index){
    return this.state.selected.indexOf(index) !== -1;
  }
  handleRowSelection(selectedRows){
    this.state.selected = selectedRows;
    console.log('this.state', this.state)
  }
  scrollToDynamicText(){
    scrolltoElement({
      element: document.querySelector('#dynamicText'),
      offset: -100, // default is 0 
      bezier: [0.19, 1, 0.22, 1], // default is [0.19, 1, 0.22, 1] 
      duration: 1000, // default is 100 
      then () {
        console.log('Finished~')
      }
    });    
  }
  scrollToCore(){
    scrolltoElement({
      element: document.querySelector('#coreModule'),
      offset: -100, // default is 0 
      bezier: [0.19, 1, 0.22, 1], // default is [0.19, 1, 0.22, 1] 
      duration: 1000, // default is 100 
      then () {
        console.log('Finished~')
      }
    });    
  }
  scrollToArchitectureCard(){    
    scrolltoElement({
      element: document.querySelector('#architectureCard'),
      offset: -100, // default is 0 
      bezier: [0.19, 1, 0.22, 1], // default is [0.19, 1, 0.22, 1] 
      duration: 1000, // default is 100 
      then () {
        console.log('Finished~')
      }
    });
  }
  scrollToMeaningfulUse(){
    scrolltoElement({
      element: document.querySelector('#meaningfulUseCard'),
      offset: -100, // default is 0 
      bezier: [0.19, 1, 0.22, 1], // default is [0.19, 1, 0.22, 1] 
      duration: 1000, // default is 100 
      then () {
        console.log('Finished~')
      }
    });    
  }
  scrollToPremiumModule(){
    scrolltoElement({
      element: document.querySelector('#premiumModulesCard'),
      offset: -100, // default is 0 
      bezier: [0.19, 1, 0.22, 1], // default is [0.19, 1, 0.22, 1] 
      duration: 1000, // default is 100 
      then () {
        console.log('Finished~')
      }
    });    
    
  }
  render(){
    return(
      <div id="LandingPage" >
        <FullPageCanvas width='wide' >

          <GlassCard id='architectureCard' style={{height: '100%'}} onClick={this.scrollToMeaningfulUse }>
            <CardTitle title="Getting Started" subtitle="Welcome to Meteor on FHIR.  This is the default landing page.  Please read through the following materials to get started." style={{textAlign: 'center'}} />
            <CardText style={{textAlign: 'center', height: window.innerHeight - 260 }} >
              <Row>
                <Col mdOffset={3} md={6} style={{textAlign: 'center'}} >
                    <ul style={{textAlign: 'left'}}>
                      <li>Read the <a href="https://github.com/clinical-meteor/meteor-on-fhir">Meteor on FHIR README</a>.</li>
                      <li>Read through the <a href="https://github.com/clinical-meteor/software-development-kit/blob/master/documentation/getting.started.md">Clinical Meteor Quickstart to set up your development environment.</a> </li>
                      <li>Familiarize yourself with the <a href="https://guide.meteor.com/">Meteor Guide</a> to get started with developing Meteor.</li>
                      <li>Reference the <a href="https://github.com/clinical-meteor/software-development-kit">Software Development Kit as needed.</a> </li>
                      <li>Update the <a href="https://github.com/clinical-meteor/meteor-on-fhir/blob/development/webapp/packages/plugin-default-landing-page/client/FullPageCanvas.jsx">Landing Page</a> and replace with your custom content.</li>
                      <li>Copy and modify the <a href="https://github.com/clinical-meteor/meteor-on-fhir/tree/development/webapp/packages/plugin-default-landing-page">Default Landing Page Plugin</a> to create your first plugin.</li>                      
                    </ul>
                </Col>
              </Row>
            </CardText>
          </GlassCard>
          
          <br />
          <br />
          <br />
          <br />
          
        </FullPageCanvas>
      </div>
    );
  }
}
export default LandingPage;