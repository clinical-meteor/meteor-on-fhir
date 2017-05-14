// https://www.npmjs.com/package/react-dropzone-component
// http://www.dropzonejs.com/

import { CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import {blue500, orange500} from 'material-ui/styles/colors';
import {blue600, gray600, green600, orange600, red600, yellow600} from 'material-ui/styles/colors';

import ActionAlarm from 'material-ui/svg-icons/action/alarm';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import { CollectionManagement } from '/imports/ui/components/CollectionManagement';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import DropzoneComponent from 'react-dropzone-component';
import FlatButton from 'material-ui/FlatButton';
import { GeneticAlgorithms } from '/imports/api/genotype/GeneticAlgorithms';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Session } from 'meteor/session';
import Spacer from '/imports/ui/components/Spacer';
import { Statistics } from '/imports/api/statistics/statistics';
import { Table } from 'react-bootstrap';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

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
  addedfile: function (file) {
    console.log("Received a file; sending server.");

    // well, we received a file; lets take a peek inside to figure out what to do with it
    var reader = new FileReader();

    reader.onload = function(e) {
      fileContent = reader.result;
      fileContentArray = fileContent.split('\n');

      // hey, the first line mentions 23andMe; lets assume that it's a patient's raw data
      // and send it to the server for processing
      if (fileContentArray[0].includes("23andMe")) {
        console.log("This appears to be a 23andMe datafile!");

        Meteor.call("parseGenome", fileContent, function (error, result){
          if (error){
            console.log("error", error);
          }
          if (result){
            console.log("result", result);
          }
        });

      }
    }
    reader.readAsText(file);
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

Session.setDefault('showServerCounts', false);
Session.setDefault('patientDialogOpen', false);
Session.setDefault('open', false);

export class DataManagementPage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {
      dialog: {
        open: Session.get('open')
      },      
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
      },
      title: "Client Collections",
      upstreamSync: false
    };

    if(Meteor.settings && Meteor.settings.public && Meteor.settings.public.meshNetwork && Meteor.settings.public.meshNetwork.upstreamSync){
      console.log('Meteor.settings.public.meshNetwork.upstreamSync');
      data.upstreamSync = Meteor.settings.public.meshNetwork.upstreamSync;
    }


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

    console.log('DataManagementPage', data);
    return data;
  }
  openTutorialOverlay(){
    Session.set('patientDialogOpen', true);
  }
  handleOpen(){
    Session.set('open', true);
  }
  handleClose(){
    Session.set('open', false);
  }    
  changeInput(variable, event, value){
    Session.set(variable, value);
  }  
  render(){
    const actions = [
      <FlatButton
        label="Contact 911"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Medical Chart"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Location"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Acknowledge"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ];
    const patientActions = [
      <FlatButton
        label="Clear"
        primary={true}
        onTouchTap={this.handleClosePatients}
      />,
      <FlatButton
        label="Select"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClosePatients}
      />
    ];

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
                 onTouchTap={this.openTutorialOverlay}
              />

              <Dialog
                icon={ <ActionAndroid /> }
                actions={actions}
                modal={false}
                open={this.data.dialog.open}
                onRequestClose={this.handleClose}
              >
                <CardHeader
                  title='Vital Signs Alert'
                  subtitle="Jane Doe / F / 45 years"
                  avatar={<ActionFavoriteBorder style={{height: '64px', width: '64px', color: red600}}/>}
                  titleStyle={{fontSize: '120%', color: red600}}
                  subtitleStyle={{fontSize: '120%'}}
                />

                <Divider style={{marginTop: '10px', marginBottom: '10px'}}/>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget ornare ipsum. Quisque id varius neque. Proin sit amet justo vitae quam iaculis euismod. Aenean ut congue tellus, at rutrum augue. Vivamus interdum, turpis ac ullamcorper pulvinar, dolor ante placerat enim, non tincidunt metus justo quis sapien. Ut eu odio ornare, varius urna sed, interdum diam. Duis luctus, odio eget pellentesque bibendum, elit magna euismod neque, a mattis sem augue ut erat.

              </Dialog>

            </CardText>
          </GlassCard>

          {this.renderAdminTiles(this.data.user, this.data.upstreamSync)}

        </VerticalCanvas>
      </div>
    );
  }

  callMethod(signature){
    console.log("callMethod", signature);

    Meteor.call(signature);
  }

    renderAdminTiles(user, upstreamSync){
      var upstreamSyncCard;
      if(upstreamSync){
        upstreamSyncCard = <div>
          <Spacer />
            <GlassCard>
              <CardTitle
                title="Upstream Sync"
                subtitle={upstreamSync}
              />
            </GlassCard>
        </div>;
      }

      if (user.isAdmin || user.isPractitioner || user.isPatient) {
        return (
          <div>
            {upstreamSyncCard}
            
            <Spacer />
            <GlassCard>
              <CardTitle
                title="Datalake"
              />
              <CardText>
                <CollectionManagement />

              </CardText>
            </GlassCard>

          </div>
        );
      }
    }
}


ReactMixin(DataManagementPage.prototype, ReactMeteorData);
