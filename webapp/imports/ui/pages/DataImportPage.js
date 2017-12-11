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

import { parseString } from 'xml2js';

var componentConfig = {
  allowedFiletypes: ['.json', '.ccd', '.jpg', '.png', '.23me', '.geojson'],
  iconFiletypes: ['.json', '.xml', '.ccd', '.23me', '.geojson',  '.png',  '.jpg','.dicom'],
  showFiletypeIcon: true,
  postUrl: '/uploadHandler'
};
var djsConfig = {
  autoProcessQueue: false,
  addRemoveLinks: true,
  dictDefaultMessage: 'Drop a file to begin import (or click to select a file).  '
};
var eventHandlers = {
  // This one receives the dropzone object as the first parameter
  // and can be used to additional work with the dropzone.js
  // object
  init: null,
  // All of these receive the event as first parameter:
  drop: function(input){
    console.log("Drop!", input);
  },
  dragstart: null,
  dragend: null,
  dragenter: null,
  dragover: null,
  dragleave: null,
  // All of these receive the file as first parameter:
  addedfile: function (file) {
    console.log("Received a file; sending to server.", file);

    // we're going to need the extention to figure out what kind of file parsing we're going to do
    var extension = file.name.split('.').pop().toLowerCase();
    console.log('Extension: ', extension);
    Session.set('fileExtension', extension);

    // we received a file; lets take a peek inside to figure out what to do with it
    var reader = new FileReader();

    reader.onload = function(e) {

      if(reader.result){
        process.env.TRACE && console.log('reader.result', reader.result);

        var data;

        if(extension == "xml"){
          console.log('Found an .xml file; loading...');
    
          parseString(reader.result, function (err, result) {
            console.log('managed to parse xml...')
            console.dir(result);       
            Session.set('dataContent', result);    
          });

        } else if(extension == "json"){
          console.log('Found an .json file; loading...');

          Session.set('dataContent', JSON.parse(reader.result));    
          
        } else if(extension == "geojson"){
          if(data.type == "FeatureCollection"){
            console.log('Found an .geojson file; loading...');
  
            Meteor.call("parseGeojson", data, function (error, result){
              if (error){
                console.log("error", error);
              }
              if (result){
                console.log("result", result);
              }
            });
          }
        } else if(extension == "23andme"){
          if(data.type == "FeatureCollection"){
            console.log('Found an .23andme file; loading...');
            
            Meteor.call("parseGenome", reader.result, function (error, result){
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
    }

    // do we encounter a file that needs special file reading access???
    if(extension == ".2fa"){
      console.log('Abort!  Found a raw genome sequence; too big to load via the user interface.');
    } else {
      // otherwise, we assume it's some sort of text file
      reader.readAsText(file);      
    }
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

Session.setDefault('fileExtension', '');
Session.setDefault('dataContent', '');

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
      upstreamSync: false,
      preview: {
        fileExtension: Session.get('fileExtension'),
        maxHeight: (Session.get('appHeight') - 520 ) + 'px',
        data: ''
      }
    };

    if(Meteor.settings && Meteor.settings.public && Meteor.settings.public.meshNetwork && Meteor.settings.public.meshNetwork.upstreamSync){
      console.log('Meteor.settings.public.meshNetwork.upstreamSync');
      data.upstreamSync = Meteor.settings.public.meshNetwork.upstreamSync;
    }

    if(['xml', 'json'].includes(Session.get('fileExtension'))){
      data.preview.data = JSON.stringify(Session.get('dataContent'), null, 2);
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
   
  changeInput(variable, event, value){
    Session.set(variable, value);
  }  
  importFile(variable, event, value){
    if(this.data.preview.fileExtension === 'xml'){
      alert("We haven't implemented .xml parsing yet.  Contact sales@symptomatic.io if you'd like to sponsor this work.  Otherwise, download the source code and implement a parser in DataImportPage.js")      
    }
    if(this.data.preview.fileExtension === 'json'){
      var dataContent = Session.get('dataContent');
      if(dataContent.allergyIntolerances){
        Meteor.users.update({_id: Meteor.userId()}, {$set: {
          'profile.continuityOfCare.allergyIntolerances': dataContent.allergyIntolerances
        }});        
      }
      if(dataContent.carePlans){
        Meteor.users.update({_id: Meteor.userId()}, {$set: {
          'profile.continuityOfCare.carePlans': dataContent.carePlans
        }});        
      }
      if(dataContent.conditions){
        Meteor.users.update({_id: Meteor.userId()}, {$set: {
          'profile.continuityOfCare.conditions': dataContent.conditions
        }});        
      }    
      if(dataContent.immunizations){
        Meteor.users.update({_id: Meteor.userId()}, {$set: {
          'profile.continuityOfCare.immunizations': dataContent.immunizations
        }});        
      }            
      if(dataContent.medicationStatements){
        Meteor.users.update({_id: Meteor.userId()}, {$set: {
          'profile.continuityOfCare.medicationStatements': dataContent.medicationStatements
        }});        
      }   
      if(dataContent.observations){
        Meteor.users.update({_id: Meteor.userId()}, {$set: {
          'profile.continuityOfCare.observations': dataContent.observations
        }});        
      }         
      if(dataContent.procedures){
        Meteor.users.update({_id: Meteor.userId()}, {$set: {
          'profile.continuityOfCare.procedures': dataContent.procedures
        }});        
      }        
    }
  }
  render(){
    return(
      <div id="DataImportPage">
        <VerticalCanvas >
          <GlassCard height='auto' >
            <CardTitle
              title="Data Import"
            />
            <CardText>
              <DropzoneComponent
                config={componentConfig}
                 eventHandlers={eventHandlers}
                 djsConfig={djsConfig}
                 //onTouchTap={this.openTutorialOverlay}
              />
              <pre style={{width: '100%', position: 'relative', marginTop: '40px', maxHeight: this.data.preview.maxHeight}}>
                { this.data.preview.data }
              </pre>              
            </CardText>
            <CardActions>
            <FlatButton 
                label='Import' 
                onClick={this.importFile.bind(this)}
                />
            </CardActions>
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
