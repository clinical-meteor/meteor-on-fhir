// http://wwww.hl7.org/fhir/comparison-cda.html  
// http://wwww.hl7.org/FHIR/us/ccda/2017Jan  
// http://wwww.hl7.org/FHIR/us/ccda/2017Jan/StructureDefinition-CCDA-on-FHIR-US-Realm-Header.html  
// http://wwww.hl7.org/FHIR/us/ccda/2017Jan/StructureDefinition-CCDA-on-FHIR-Continuity-of-Care-Document.html  
// http://wwww.hl7.org/FHIR/us/ccda/2017Jan/StructureDefinition-CCDA-on-FHIR-Continuity-of-Care-Document-Example.json.html  



import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import { Col, Grid, Row } from 'react-bootstrap';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { get, has } from 'lodash';

import AllergyIntolerancesTable from '/imports/ui/workflows/allergyIntolerances/AllergyIntolerancesTable';
import Avatar from 'material-ui/Avatar';
import ConditionsTable from '/imports/ui/workflows/conditions/ConditionsTable';
import CarePlansTable from '/imports/ui/workflows/carePlans/CarePlansTable';
import DiagnosticReportsTable from '/imports/ui/workflows/diagnosticReports/DiagnosticReportsTable';
import FlatButton from 'material-ui/FlatButton';
import { FullPageCanvas } from '/imports/ui/layouts/FullPageCanvas';
import { VerticalCanvas } from '/imports/ui/layouts/VerticalCanvas';
import { GlassCard } from '/imports/ui/components/GlassCard';
import ImmunizationsTable from '/imports/ui/workflows/immunizations/ImmunizationsTable';
import ImagingStudiesTable from '/imports/ui/workflows/imaging-studies/ImagingStudiesTable';
import MedicationStatementsTable from '/imports/ui/workflows/medicationStatements/MedicationStatementsTable';
import ProceduresTable from '/imports/ui/workflows/procedures/ProceduresTable';
import ObservationsTable from '/imports/ui/workflows/observations/ObservationsTable';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import Spacer from '/imports/ui/components/Spacer';
import { browserHistory } from 'react-router';

export class ContinuityOfCarePage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {
      style: {},
      ccd: {
        immunizations: [],
        allergyIntolerances: [],
        conditions: [],
        medicationStatements: [],
        procedures: [],
        diagnosticReports: [],
      }
    };
    
    if(Meteor.user()){
      if(get(Meteor.user(), 'profile.continuityOfCare.allergyIntolerances')){
        data.ccd.allergyIntolerances = get(Meteor.user(), 'profile.continuityOfCare.allergyIntolerances');
      }
      if(get(Meteor.user(), 'profile.continuityOfCare.carePlans')){
        data.ccd.carePlans = get(Meteor.user(), 'profile.continuityOfCare.carePlans');
      }
      if(get(Meteor.user(), 'profile.continuityOfCare.conditions')){
        data.ccd.conditions = get(Meteor.user(), 'profile.continuityOfCare.conditions');
      }
      if(get(Meteor.user(), 'profile.continuityOfCare.diagnosticReports')){
        data.ccd.diagnosticReports = get(Meteor.user(), 'profile.continuityOfCare.diagnosticReports');
      }
      if(get(Meteor.user(), 'profile.continuityOfCare.imagingStudies')){
        data.ccd.imagingStudies = get(Meteor.user(), 'profile.continuityOfCare.imagingStudies');
      }
      if(get(Meteor.user(), 'profile.continuityOfCare.immunizations')){
        data.ccd.immunizations = get(Meteor.user(), 'profile.continuityOfCare.immunizations');
      }
      if(get(Meteor.user(), 'profile.continuityOfCare.medications')){
        data.ccd.medications = get(Meteor.user(), 'profile.continuityOfCare.medications');
      }
      if(get(Meteor.user(), 'profile.continuityOfCare.medicationStatements')){
        data.ccd.medicationStatements = get(Meteor.user(), 'profile.continuityOfCare.medicationStatements');
      }
      if(get(Meteor.user(), 'profile.continuityOfCare.observations')){
        data.ccd.observations = get(Meteor.user(), 'profile.continuityOfCare.observations');
      }
      if(get(Meteor.user(), 'profile.continuityOfCare.procedures')){
        data.ccd.procedures = get(Meteor.user(), 'profile.continuityOfCare.procedures');
      }
    }

    console.log('ContinuityOfCarePage[data]', data);
    return data;
  }
  openLink(url){
    browserHistory.push(url);
  }  
  render(){
    return(
      <div id="ContinuityOfCarePage">
        <VerticalCanvas >
          <Grid>
            <Row>
              <Col>

              <GlassCard>
                  <CardTitle title="Allergies" />
                  <CardText>
                    <AllergyIntolerancesTable
                      data={ this.data.ccd.allergyIntolerances } 
                      displayDates={true} 
                    />
                </CardText>
                  <CardActions>       
                    <FlatButton label='Add' onClick={ this.openLink.bind(this, '/allergies') } />
                  </CardActions>
                </GlassCard>        
                <Spacer />

                <GlassCard>
                  <CardTitle title="CarePlans" />
                  <CardText>
                    <CarePlansTable
                      data={ this.data.ccd.carePlans } 
                      displayDates={true} 
                    />                  
                  </CardText>
                  <CardActions>       
                    <FlatButton label='Add' onClick={ this.openLink.bind(this, '/care-plans') } />
                  </CardActions>
                </GlassCard>        
                <Spacer />


                <GlassCard>
                  <CardTitle title="Conditions" />
                  <CardText>
                    <ConditionsTable
                      data={ this.data.ccd.conditions } 
                      displayDates={true} 
                    />                  
                  </CardText>
                  <CardActions>       
                    <FlatButton label='Add' onClick={ this.openLink.bind(this, '/conditions') } />
                  </CardActions>
                </GlassCard>        
                <Spacer />                

                <GlassCard>
                  <CardTitle title="Diagnostic Reports" />
                  <CardText>
                    <DiagnosticReportsTable 
                      data={ this.data.ccd.diagnosticReports } 
                      displayDates={true} 
                    />
                    
                  </CardText>
                  <CardActions>       
                  <FlatButton label='Add' onClick={ this.openLink.bind(this, '/diagnostic-reports') } />
                  </CardActions>
                </GlassCard>        
                <Spacer />

                <GlassCard>
                  <CardTitle title="ImagingStudies" />
                  <CardText>
                    <ImagingStudiesTable 
                      data={ this.data.ccd.imagingStudies } 
                      displayDates={true} 
                    />
                  </CardText>
                  {/* <CardActions>     
                    <FlatButton label='Add' onClick={ this.openLink.bind(this, '/imaging-studies') } />
                  </CardActions> */}
                </GlassCard>        
                <Spacer />

                <GlassCard>
                  <CardTitle title="Immunizations" />
                  <CardText>
                    <ImmunizationsTable 
                      data={ this.data.ccd.immunizations } 
                      displayDates={true} 
                    />
                  </CardText>
                  <CardActions>     
                    <FlatButton label='Add' onClick={ this.openLink.bind(this, '/immunizations') } />
                  </CardActions>
                </GlassCard>        
                <Spacer />


                {/* <GlassCard>
                  <CardTitle title="Medications" />
                  <CardText>
                    <MedicationStatementsTable
                      data={ this.data.ccd.medications } 
                      displayDates={true} 
                    />
                    
                  </CardText>
                  <CardActions>       
                    <FlatButton label='Add' onClick={ this.openLink.bind(this, '/medications') } />
                  </CardActions>
                </GlassCard>        
                <Spacer /> */}



                <GlassCard>
                  <CardTitle title="Medication Statements" />
                  <CardText>
                    <MedicationStatementsTable
                      data={ this.data.ccd.medicationStatements } 
                      displayDates={true} 
                    />
                    
                  </CardText>
                  {/* <CardActions>       
                    <FlatButton label='Add' onClick={ this.openLink.bind(this, '/medication-statements') } />
                  </CardActions> */}
                </GlassCard>        
                <Spacer />

                <GlassCard>
                  <CardTitle title="Observations" />
                  <CardText>
                    <ObservationsTable
                      data={ this.data.ccd.observations } 
                      displayDates={true} 
                    />
                    
                  </CardText>
                  {/* <CardActions>       
                    <FlatButton label='Add' onClick={ this.openLink.bind(this, '/observations') } />
                  </CardActions> */}
                </GlassCard>        
                <Spacer />


                <GlassCard>
                  <CardTitle title="Procedures" />
                  <CardText>
                    <ProceduresTable
                      data={ this.data.ccd.procedures } 
                      displayDates={true} 
                    />
                    
                  </CardText>
                  <CardActions>       
                    <FlatButton label='Add' onClick={ this.openLink.bind(this, '/procedures') } />
                  </CardActions>
                </GlassCard>        
                <Spacer />



              </Col>
            </Row>
          </Grid>
        </VerticalCanvas>
      </div>
    );
  }
}
ReactMixin(ContinuityOfCarePage.prototype, ReactMeteorData);