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

export class DataManagementPage extends React.Component {
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
        questionnaires: Questionnaires.find().count(),
        conditions: Conditions.find().count()
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
      <div id="dataManagementPage">
        <VerticalCanvas >
          <GlassCard>
            <CardTitle
              title="Data Management"
            />
            <CardText>
              <DropzoneComponent
                config={componentConfig}
                 eventHandlers={eventHandlers}
                 djsConfig={djsConfig}
              />

            </CardText>
          </GlassCard>

          {this.renderAdminTiles(this.data.user)}

        </VerticalCanvas>
      </div>
    );
  }

  callMethod(signature){
    console.log("callMethod", signature);

    Meteor.call(signature);
  }

    renderAdminTiles(user){
      if (user.isAdmin || user.isPractitioner) {
        return (
          <div>
            <Spacer />
            <GlassCard>
              <CardTitle
                title="Collections"
              />
              <CardText>
              <Table id="medicationsTable" responses hover >
                <thead>
                  <tr>
                    <th className="collection">collection</th>
                    <th className="medicationName">count</th>
                    <th className="manufacturerDisplay ">init</th>
                    <th className="medicationForm">drop</th>
                    <th className="activeIngredient">export</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='dataManagementRow' >
                    <td className="collection">Conditions</td>
                    <td className="medicationName">{this.data.collections.conditions}</td>
                    <td className="manufacturerDisplay" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeCondition')}>init</td>
                    <td className="medicationForm" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropConditions')}>drop</td>
                    <td className="activeIngredient" style={{cursor: 'pointer', color: 'gray'}}>export</td>
                  </tr>
                  <tr className='dataManagementRow' >
                    <td className="collection">Devices</td>
                    <td className="medicationName">{this.data.collections.devices}</td>
                    <td className="manufacturerDisplay" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeDevice')}>init</td>
                    <td className="medicationForm" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropDevices')}>drop</td>
                    <td className="activeIngredient" style={{cursor: 'pointer', color: 'gray'}}>export</td>
                  </tr>
                  <tr className='dataManagementRow' >
                    <td className="collection">Medications</td>
                    <td className="medicationName">{this.data.collections.medications}</td>
                    <td className="manufacturerDisplay" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeMedications')}>init</td>
                    <td className="medicationForm" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropMedications')}>drop</td>
                    <td className="activeIngredient" style={{cursor: 'pointer', color: 'gray'}}>export</td>
                  </tr>
                  <tr className='dataManagementRow' >
                    <td className="collection">Observations</td>
                    <td className="medicationName">{this.data.collections.observations}</td>
                    <td className="manufacturerDisplay" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeObservation')}>init</td>
                    <td className="medicationForm" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropObservations')}>drop</td>
                    <td className="activeIngredient" style={{cursor: 'pointer', color: 'gray'}}>export</td>
                  </tr>
                  <tr className='dataManagementRow' >
                    <td className="collection">Patients</td>
                    <td className="medicationName">{this.data.collections.patients}</td>
                    <td className="manufacturerDisplay" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializePatient')}>init</td>
                    <td className="medicationForm" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropTestPatients')}>drop</td>
                    <td className="activeIngredient" style={{cursor: 'pointer', color: 'gray'}}>export</td>
                  </tr>
                  <tr className='dataManagementRow' >
                    <td className="collection">Practitioners</td>
                    <td className="medicationName">{this.data.collections.practitioners}</td>
                    <td className="manufacturerDisplay" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializePractitioner')}>init</td>
                    <td className="medicationForm" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropPractitioners')}>drop</td>
                    <td className="activeIngredient" style={{cursor: 'pointer', color: 'gray'}}>export</td>
                  </tr>
                  <tr className='dataManagementRow' >
                    <td className="collection">Questionnaires</td>
                    <td className="medicationName">{this.data.collections.questionnaires}</td>
                    <td className="manufacturerDisplay" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'initializeQuestionnaire')}>init</td>
                    <td className="medicationForm" style={{cursor: 'pointer'}} onClick={this.callMethod.bind(this, 'dropQuestionnaires')}>drop</td>
                    <td className="activeIngredient" style={{cursor: 'pointer', color: 'gray'}}>export</td>
                  </tr>
                </tbody>
              </Table>


              </CardText>
            </GlassCard>

          </div>
        );
      }
    }
}


ReactMixin(DataManagementPage.prototype, ReactMeteorData);
