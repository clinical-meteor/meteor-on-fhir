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
import DiagnosticReportsTable from '/imports/ui/workflows/diagnosticReports/DiagnosticReportsTable';
import FlatButton from 'material-ui/FlatButton';
import { FullPageCanvas } from '/imports/ui/layouts/FullPageCanvas';
import { GlassCard } from '/imports/ui/components/GlassCard';
import ImmunizationsTable from '/imports/ui/workflows/immunizations/ImmunizationsTable';
import MedicationStatementsTable from '/imports/ui/workflows/medicationStatements/MedicationStatementsTable';
import ProceduresTable from '/imports/ui/workflows/procedures/ProceduresTable';
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
      if(get(Meteor.user(), 'profile.continuityOfCare.immunizations')){
        data.ccd.immunizations = get(Meteor.user(), 'profile.continuityOfCare.immunizations');
      }
      if(get(Meteor.user(), 'profile.continuityOfCare.allergyIntolerances')){
        data.ccd.allergyIntolerances = get(Meteor.user(), 'profile.continuityOfCare.allergyIntolerances');
      }
      if(get(Meteor.user(), 'profile.continuityOfCare.conditions')){
        data.ccd.conditions = get(Meteor.user(), 'profile.continuityOfCare.conditions');
      }
      if(get(Meteor.user(), 'profile.continuityOfCare.medicationStatements')){
        data.ccd.medicationStatements = get(Meteor.user(), 'profile.continuityOfCare.medicationStatements');
      }
      if(get(Meteor.user(), 'profile.continuityOfCare.procedures')){
        data.ccd.procedures = get(Meteor.user(), 'profile.continuityOfCare.procedures');
      }
      if(get(Meteor.user(), 'profile.continuityOfCare.diagnosticReports')){
        data.ccd.diagnosticReports = get(Meteor.user(), 'profile.continuityOfCare.diagnosticReports');
      }
    }


    return data;
  }
  openLink(url){
    browserHistory.push(url);
  }  
  render(){
    return(
      <div id="ContinuityOfCarePage">
        <FullPageCanvas >
          <Grid>
            <Row>
              <Col>
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
                  <CardTitle title="Medication Statements" />
                  <CardText>
                    <MedicationStatementsTable
                      data={ this.data.ccd.medicationStatements } 
                      displayDates={true} 
                    />
                    
                  </CardText>
                  <CardActions>       
                    <FlatButton label='Add' onClick={ this.openLink.bind(this, '/medication-statements') } />
                  </CardActions>
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


              </Col>
            </Row>
          </Grid>
        </FullPageCanvas>
      </div>
    );
  }
}
ReactMixin(ContinuityOfCarePage.prototype, ReactMeteorData);