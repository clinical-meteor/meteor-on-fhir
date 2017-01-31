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

var componentConfig = {
  allowedFiletypes: ['.jpg', '.png', '.gif'],
  iconFiletypes: ['.jpg', '.png', '.gif'],
  showFiletypeIcon: false,
  postUrl: '/uploadHandler'
};
var djsConfig = {
  autoProcessQueue: false,
  addRemoveLinks: true
};
var eventHandlers = {
  // This one receives the dropzone object as the first parameter
  // and can be used to additional work with the dropzone.js
  // object
  init: null,
  // All of these receive the event as first parameter:
  drop: function(){
    console.log("Drop!");
  },
  dragstart: null,
  dragend: null,
  dragenter: null,
  dragover: null,
  dragleave: null,
  // All of these receive the file as first parameter:
  addedfile: function () {
    console.log("Let's add a file...");
  },
  removedfile: null,
  thumbnail: null,
  error: null,
  processing: null,
  uploadprogress: null,
  sending: null,
  success: null,
  complete: null,
  canceled: null,
  maxfilesreached: null,
  maxfilesexceeded: null,
  // All of these receive a list of files as first parameter
  // and are only called if the uploadMultiple option
  // in djsConfig is true:
  processingmultiple: null,
  sendingmultiple: null,
  successmultiple: null,
  completemultiple: null,
  canceledmultiple: null,
  // Special Events
  totaluploadprogress: null,
  reset: null,
  queuecomplete: null
};

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
        patients: Patients.find().count(),
        practitioners: Practitioners.find().count(),
        observations: Observations.find().count(),
        devices: Devices.find().count(),
        medications: Medications.find().count(),
        messageHeaders: MessageHeaders.find().count(),
        questionnaires: Questionnaires.find().count(),
        conditions: Conditions.find().count(),
        riskAssessments: RiskAssessments.find().count(),
        zero: 0
      }
    };

    let user = Meteor.user();
    if (user && user.roles) {
      user.roles.forEach(function(role){
        if (role === "sysadmin") {
          data.user.isAdmin = true;
        } else if (role === "practitioner") {
          data.user.isPractitioner = true;
        } else if (role === "patient") {
          data.user.isPatient = true;
        }
      });
    }

    return data;
  }
  render(){
    return(
      <div>
          <Table id="medicationsTable" responses hover >
            <thead>
              <tr>
                <th className="collection">collection</th>
                <th className="count">count</th>
                <th className="init ">init</th>
                <th className="drop">drop</th>
                <th className="export">export</th>
              </tr>
            </thead>
            <tbody>
              <tr className='dataManagementRow' style={{color: 'lightgray'}}>
                <td className="collection">Allergy Intolerance</td>
                <td className="count">{this.data.collections.zero}</td>
                <td className="init" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeAllergyResponses')}>init</td>
                <td className="drop" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropAllergyResponses')}>drop</td>
                <td className="export" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' style={{color: 'lightgray'}}>
                <td className="collection">Appointments</td>
                <td className="count">{this.data.collections.zero}</td>
                <td className="init" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeAppointments')}>init</td>
                <td className="drop" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropAppointments')}>drop</td>
                <td className="export" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' style={{color: 'lightgray'}}>
                <td className="collection">Care Plans</td>
                <td className="count">{this.data.collections.zero}</td>
                <td className="init" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeCarePlan')}>init</td>
                <td className="drop" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropCarePlans')}>drop</td>
                <td className="export" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' style={{color: 'lightgray'}}>
                <td className="collection">Conditions</td>
                <td className="count">{this.data.collections.conditions}</td>
                <td className="init" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeCondition')}>init</td>
                <td className="drop" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropConditions')}>drop</td>
                <td className="export" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' >
                <td className="collection">Devices</td>
                <td className="count">{this.data.collections.devices}</td>
                <td className="init" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeDevice')}>init</td>
                <td className="drop" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropDevices')}>drop</td>
                <td className="export" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' style={{color: 'lightgray'}}>
                <td className="collection">Diagnostic Reports</td>
                <td className="count">{this.data.collections.zero}</td>
                <td className="init" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeDiagnosticReports')}>init</td>
                <td className="drop" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropDiagnosticReports')}>drop</td>
                <td className="export" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' style={{color: 'lightgray'}}>
                <td className="collection">Famly Member Histories</td>
                <td className="count">{this.data.collections.zero}</td>
                <td className="init" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeFamilyMemberHistories')}>init</td>
                <td className="drop" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropFamilyMemberHistories')}>drop</td>
                <td className="export" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' style={{color: 'lightgray'}}>
                <td className="collection">Goals</td>
                <td className="count">{this.data.collections.zero}</td>
                <td className="init" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeGoals')}>init</td>
                <td className="drop" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropGoals')}>drop</td>
                <td className="export" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' style={{color: 'lightgray'}}>
                <td className="collection">Immunizations</td>
                <td className="count">{this.data.collections.zero}</td>
                <td className="init" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeImmunizations')}>init</td>
                <td className="drop" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropImmunizations')}>drop</td>
                <td className="export" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' >
                <td className="collection">Medications</td>
                <td className="count">{this.data.collections.medications}</td>
                <td className="init" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeMedications')}>init</td>
                <td className="drop" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropMedications')}>drop</td>
                <td className="export" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' >
                <td className="collection">Message Headers</td>
                <td className="count">{this.data.collections.messageHeaders}</td>
                <td className="init" style={{cursor: 'pointer', color: 'lightgray'}}>init</td>
                <td className="drop" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropMessageHeaders')}>drop</td>
                <td className="export" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' >
                <td className="collection">Observations</td>
                <td className="count">{this.data.collections.observations}</td>
                <td className="init" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeObservation')}>init</td>
                <td className="drop" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropObservations')}>drop</td>
                <td className="export" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' >
                <td className="collection">Patients</td>
                <td className="count">{this.data.collections.patients}</td>
                <td className="init" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeFamousDeadPeople')}>init</td>
                <td className="drop" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropPatients')}>drop</td>
                <td className="export" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' >
                <td className="collection">Practitioners</td>
                <td className="count">{this.data.collections.practitioners}</td>
                <td className="init" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializePractitioner')}>init</td>
                <td className="drop" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropPractitioners')}>drop</td>
                <td className="export" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' >
                <td className="collection">Procedures</td>
                <td className="count">{this.data.collections.zero}</td>
                <td className="init" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeProcedures')}>init</td>
                <td className="drop" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropProcedures')}>drop</td>
                <td className="export" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' >
                <td className="collection">Questionnaires</td>
                <td className="count">{this.data.collections.questionnaires}</td>
                <td className="init" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeQuestionnaire')}>init</td>
                <td className="drop" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropQuestionnaires')}>drop</td>
                <td className="export" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' >
                <td className="collection">Risk Assessments</td>
                <td className="count">{this.data.collections.riskAssessments}</td>
                <td className="init" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeRiskAssessment')}>init</td>
                <td className="drop" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropRiskAssessments')}>drop</td>
                <td className="export" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
              <tr className='dataManagementRow' style={{color: 'lightgray'}}>
                <td className="collection">Schedules</td>
                <td className="count">{this.data.collections.zero}</td>
                <td className="init" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeSchedules')}>init</td>
                <td className="drop" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropSchedules')}>drop</td>
                <td className="export" style={{cursor: 'pointer', color: 'gray'}}>export</td>
              </tr>
            </tbody>
          </Table>
      </div>
    );
  }

  callMethod(signature){
    console.log("callMethod", signature);

    if (process.env.NODE_ENV === "test") {
      if (confirm('Are you sure?')) {
        Meteor.call(signature);
      }
    } else {
      alert('Alert!  This app is not running in a test environment.  Enable NODE_ENV=test to enable this functionality.')
    }

  }

}


ReactMixin(CollectionManagement.prototype, ReactMeteorData);
