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
  allowedFiletypes: ['.jpg', '.png', '.json', '.23me', '.geojson'],
  iconFiletypes: ['.jpg', '.png', '.json', '.23me', '.geojson'],
  showFiletypeIcon: true,
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
    console.log("Received a file; sending to server.");

    // well, we received a file; lets take a peek inside to figure out what to do with it
    var reader = new FileReader();

    reader.onload = function(e) {

      if(reader.result){
        console.log('reader.result', JSON.parse(reader.result));

        var data = JSON.parse(reader.result);

        // it might just be .geojason
        if(data.type == "FeatureCollection"){
          console.log('Think we found a .geojson file!');          

          Meteor.call("parseGeojson", data, function (error, result){
            if (error){
              console.log("error", error);
            }
            if (result){
              console.log("result", result);
            }
          });
        }


        // wasn't json; so lets open up the file and take a look at the first line
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

export class DataImportPage extends React.Component {
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
      title: "Client Collections",
      upstreamSync: false
    };

    if(Meteor.settings && Meteor.settings.public && Meteor.settings.public.meshNetwork && Meteor.settings.public.meshNetwork.upstreamSync){
      console.log('Meteor.settings.public.meshNetwork.upstreamSync');
      data.upstreamSync = Meteor.settings.public.meshNetwork.upstreamSync;
    }


    let user = Meteor.user();
    if(user){
      if (user.roles) {
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
    }

    console.log('DataImportPage', data);
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

    return(
      <div id="DataImportPage">
        <VerticalCanvas >
          <GlassCard>
            <CardTitle
              title="Data Import"
            />
            <CardText>
              <DropzoneComponent
                config={componentConfig}
                 eventHandlers={eventHandlers}
                 djsConfig={djsConfig}
                 onTouchTap={this.openTutorialOverlay}
              />
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }

  callMethod(signature){
    console.log("callMethod", signature);

    Meteor.call(signature);
  }
}


ReactMixin(DataImportPage.prototype, ReactMeteorData);
