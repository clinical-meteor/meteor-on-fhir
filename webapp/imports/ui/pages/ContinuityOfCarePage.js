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

export class ContinuityOfCarePage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {
      style: {},
      ccd: {}
    };

    // if(get(Meteor.user(), 'profile.continuityOfCare')){
    //   data.ccd = get(Meteor.user(), 'profile.continuityOfCare');
    // }

    return data;
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
                    <ImmunizationsTable data={[]} />
                  </CardText>
                  <CardActions>     
                    <FlatButton label='Add' />
                  </CardActions>
                </GlassCard>        
                <Spacer />

                <GlassCard>
                  <CardTitle title="Allergies" />
                  <CardText>
                    <AllergyIntolerancesTable data={[]} />
                  </CardText>
                  <CardActions>       
                    <FlatButton label='Add' />
                  </CardActions>
                </GlassCard>        
                <Spacer />

                <GlassCard>
                  <CardTitle title="Conditions" />
                  <CardText>
                    <ConditionsTable data={[]} />
                  </CardText>
                  <CardActions>       
                    <FlatButton label='Add' />
                  </CardActions>
                </GlassCard>        
                <Spacer />

                <GlassCard>
                  <CardTitle title="Medication Statements" />
                  <CardText>
                    <MedicationStatementsTable data={[]} />
                  </CardText>
                  <CardActions>       
                    <FlatButton label='Add' />
                  </CardActions>
                </GlassCard>        
                <Spacer />

                <GlassCard>
                  <CardTitle title="Procedures" />
                  <CardText>
                    <ProceduresTable data={[]} />
                  </CardText>
                  <CardActions>       
                    <FlatButton label='Add' />
                  </CardActions>
                </GlassCard>        
                <Spacer />

                <GlassCard>
                  <CardTitle title="Diagnostic Reports" />
                  <CardText>
                    <DiagnosticReportsTable data={[]} />
                  </CardText>
                  <CardActions>       
                    <FlatButton label='Add' />
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