// https://www.npmjs.com/package/react-dropzone-component
// http://www.dropzonejs.com/


import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import DropzoneComponent from 'react-dropzone-component';

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
    let data = {};
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
        </VerticalCanvas>
      </div>
    );
  }
}


ReactMixin(DataManagementPage.prototype, ReactMeteorData);
