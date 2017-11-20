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

          {/* <div style={{height: '100%', width: '100%', textAlign: 'center'}} onClick={this.scrollToDynamicText }>
            <OrbitalGlyph />
          </div> */}


          <GlassCard id='dynamicText' style={{height: '100%'}} onClick={this.scrollToPremiumModule }>
            <CardText style={{textAlign: 'center'}}>
              <h1><ReactRotatingText items={[
                'Interface Engine', 
                'FHIR relay', 
                'FHIR router',
                'FHIR cache',
                'FHIR database',
                'FHIR datalake',
                'Software as a Service',
                'Cerner App Store',
                'Epic App Orchard',
                'Wordpress Business Model',
                'Interoperability',
                'Health Information Exchange',
                'MACRA compliance',
                'Mesh network',
                'Blockhain',
                'Distributed App',
                'DApp'
                ]} /></h1>

            </CardText>
          </GlassCard>     

          <br />
          <br />


          <GlassCard id='architectureCard' style={{height: '100%'}} onClick={this.scrollToMeaningfulUse }>
            <CardTitle title="Insert Content Here" style={{textAlign: 'center'}} />
            <CardText style={{textAlign: 'center', height: window.innerHeight - 400 }} >
              <Row>
                <Col mdOffset={3} md={6} style={{textAlign: 'center'}} >
                  {/* <img src='/packages/clinical_plugin-default-landing-page/assets/mesh-network.png' style={{width: '100%'}} /> */}
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