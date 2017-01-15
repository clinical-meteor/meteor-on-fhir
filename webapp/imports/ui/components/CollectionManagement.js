// https://www.npmjs.com/package/react-dropzone-component
// http://www.dropzonejs.com/


import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import DropzoneComponent from 'react-dropzone-component';
import { Table } from 'react-bootstrap';
import Spacer from '/imports/ui/components/Spacer';
import { CardTitle, CardText } from 'material-ui/Card';
import { Statistics } from '/imports/api/statistics/statistics';


export class CollectionManagement extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {
      user: {
        isAdmin: false
      },
      collections: {
        client: {
          patients: Patients.find().count(),
          practitioners: Practitioners.find().count(),
          observations: Observations.find().count(),
          devices: Devices.find().count(),
          medications: Medications.find().count(),
          questionnaires: Questionnaires.find().count(),
          conditions: Conditions.find().count(),
          genotype: MyGenotype.find().count(),
          zero: 0
        },
        server: {
          patients: 0,
          practitioners: 0,
          observations: 0,
          devices: 0,
          medications: 0,
          questionnaires: 0,
          conditions: 0,
          genotype: 0,
          zero: 0
        }
      }
    };


    var stats = Statistics.find({}, {limit: 1, sort: {date: -1}}).fetch();
    if (stats && stats[0]) {
      data.collections.server = stats[0].counts;
    }

    if(process.env.NODE_ENV === "test") console.log("CollectionManagement[data]", data);
    return data;
  }
  render(){
    return(
      <div>
          <Table id="medicationsTable" responses hover >
            <thead>
              <tr>
                <th className="collection">collection</th>
                <th className="medicationName">client</th>
                <th className="medicationName">server</th>
                <th className="manufacturerDisplay ">init</th>
                <th className="medicationForm">drop</th>
                <th className="activeIngredient">export</th>
              </tr>
            </thead>
            <tbody>
              <tr className='dataManagementRow' style={{color: 'lightgray'}}>
                <td className="collection">Allergy Intolerance</td>
                <td className="medicationName">{this.data.collections.client.zero}</td>
                <td className="medicationName">{this.data.collections.client.zero}</td>
                <td className="manufacturerDisplay" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeAllergyResponses')}>init</td>
                <td className="medicationForm" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropAllergyResponses')}>drop</td>
                <td className="activeIngredient" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' style={{color: 'lightgray'}}>
                <td className="collection">Appointments</td>
                <td className="medicationName">{this.data.collections.client.zero}</td>
                <td className="medicationName">{this.data.collections.client.zero}</td>
                <td className="manufacturerDisplay" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeAppointments')}>init</td>
                <td className="medicationForm" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropAppointments')}>drop</td>
                <td className="activeIngredient" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' style={{color: 'lightgray'}}>
                <td className="collection">Care Plans</td>
                <td className="medicationName">{this.data.collections.client.zero}</td>
                <td className="medicationName">{this.data.collections.client.zero}</td>
                <td className="manufacturerDisplay" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeCarePlan')}>init</td>
                <td className="medicationForm" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropCarePlans')}>drop</td>
                <td className="activeIngredient" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' style={{color: 'lightgray'}}>
                <td className="collection">Conditions</td>
                <td className="medicationName">{this.data.collections.client.conditions}</td>
                <td className="medicationName">{this.data.collections.server.conditions}</td>
                <td className="manufacturerDisplay" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeCondition')}>init</td>
                <td className="medicationForm" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropConditions')}>drop</td>
                <td className="activeIngredient" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' >
                <td className="collection">Devices</td>
                <td className="medicationName">{this.data.collections.client.devices}</td>
                <td className="medicationName">{this.data.collections.server.devices}</td>
                <td className="manufacturerDisplay" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeDevice')}>init</td>
                <td className="medicationForm" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropDevices')}>drop</td>
                <td className="activeIngredient" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' style={{color: 'lightgray'}}>
                <td className="collection">Diagnostic Reports</td>
                <td className="medicationName">{this.data.collections.client.zero}</td>
                <td className="medicationName">{this.data.collections.client.zero}</td>
                <td className="manufacturerDisplay" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeDiagnosticReports')}>init</td>
                <td className="medicationForm" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropDiagnosticReports')}>drop</td>
                <td className="activeIngredient" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' style={{color: 'lightgray'}}>
                <td className="collection">Famly Member Histories</td>
                <td className="medicationName">{this.data.collections.client.zero}</td>
                <td className="medicationName">{this.data.collections.client.zero}</td>
                <td className="manufacturerDisplay" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeFamilyMemberHistories')}>init</td>
                <td className="medicationForm" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropFamilyMemberHistories')}>drop</td>
                <td className="activeIngredient" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' style={{color: 'lightgray'}}>
                <td className="collection">Goals</td>
                <td className="medicationName">{this.data.collections.client.zero}</td>
                <td className="medicationName">{this.data.collections.client.zero}</td>
                <td className="manufacturerDisplay" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeGoals')}>init</td>
                <td className="medicationForm" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropGoals')}>drop</td>
                <td className="activeIngredient" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' style={{color: 'lightgray'}}>
                <td className="collection">Immunizations</td>
                <td className="medicationName">{this.data.collections.client.zero}</td>
                <td className="medicationName">{this.data.collections.client.zero}</td>
                <td className="manufacturerDisplay" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeImmunizations')}>init</td>
                <td className="medicationForm" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropImmunizations')}>drop</td>
                <td className="activeIngredient" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' >
                <td className="collection">Medications</td>
                <td className="medicationName">{this.data.collections.client.medications}</td>
                <td className="medicationName">{this.data.collections.server.medications}</td>
                <td className="manufacturerDisplay" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeMedications')}>init</td>
                <td className="medicationForm" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropMedications')}>drop</td>
                <td className="activeIngredient" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' >
                <td className="collection">My Genome</td>
                <td className="medicationName">{this.data.collections.client.genotype}</td>
                <td className="medicationName">{this.data.collections.server.genotype}</td>
                <td className="manufacturerDisplay" style={{cursor: 'pointer', color: 'lightgray'}} >init</td>
                <td className="medicationForm" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropGenome')}>drop</td>
                <td className="activeIngredient" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' >
                <td className="collection">Observations</td>
                <td className="medicationName">{this.data.collections.client.observations}</td>
                <td className="medicationName">{this.data.collections.server.observations}</td>
                <td className="manufacturerDisplay" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeObservation')}>init</td>
                <td className="medicationForm" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropObservations')}>drop</td>
                <td className="activeIngredient" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' >
                <td className="collection">Patients</td>
                <td className="medicationName">{this.data.collections.client.patients}</td>
                <td className="medicationName">{this.data.collections.server.patients}</td>
                <td className="manufacturerDisplay" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializePatient')}>init</td>
                <td className="medicationForm" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropTestPatients')}>drop</td>
                <td className="activeIngredient" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' >
                <td className="collection">Practitioners</td>
                <td className="medicationName">{this.data.collections.client.practitioners}</td>
                <td className="medicationName">{this.data.collections.server.practitioners}</td>
                <td className="manufacturerDisplay" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializePractitioner')}>init</td>
                <td className="medicationForm" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropPractitioners')}>drop</td>
                <td className="activeIngredient" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' >
                <td className="collection">Procedures</td>
                <td className="medicationName">{this.data.collections.client.zero}</td>
                <td className="medicationName">{this.data.collections.client.zero}</td>
                <td className="manufacturerDisplay" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeProcedures')}>init</td>
                <td className="medicationForm" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropProcedures')}>drop</td>
                <td className="activeIngredient" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' >
                <td className="collection">Questionnaires</td>
                <td className="medicationName">{this.data.collections.client.questionnaires}</td>
                <td className="medicationName">{this.data.collections.server.questionnaires}</td>
                <td className="manufacturerDisplay" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeQuestionnaire')}>init</td>
                <td className="medicationForm" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropQuestionnaires')}>drop</td>
                <td className="activeIngredient" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>              
            </tbody>
          </Table>
      </div>
    );
  }

  callMethod(signature){
    console.log("callMethod", signature);

    Meteor.call(signature);
  }

}


ReactMixin(CollectionManagement.prototype, ReactMeteorData);
