// https://material.io/icons/
// https://andy-pro.github.io/icon-viewer/

import { Alert, Grid, Container, Col, Row } from 'react-bootstrap';

import { CardTitle, Card, CardText, CardActions, TextField } from 'material-ui';
import { Glass, GlassCard, FullPageCanvas, DynamicSpacer } from 'meteor/clinical:glass-ui';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { has, get } from 'lodash';
import PropTypes from 'prop-types';

import { MenuTile } from '/imports/ui/components/MenuTile';

import { ObservationsTable } from 'meteor/clinical:hl7-resource-observation';
import { Checklist } from '/imports/ui/workflows/lists/Checklist';



import { VitalMeasurements } from 'meteor/clinical:hl7-resource-observation';




Session.setDefault('filterMainTiles', false);
Session.setDefault('selectedChecklist', false)
export class MainIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTask: '',
      newChecklistTitle: ''
    }
  }
  getMeteorData() {
    let data = {
      style: {},
      user: {
        isAdmin: false,
        isPractitioner: false,
        isPatient: true
      }
    };

    data.style.indexCard = Glass.darkroom(data.style.indexCard);
    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);

    // if(process.env.NODE_ENV === "test") console.log("MainIndex[data]", data);
    return data;
  }


  render() {
    var self = this;
        
    var scratchpadVisibility = {};
    var healthLogSizing = 4
    if(['iPad', 'iPhone', 'iPod'].includes(window.navigator.platform)){
      scratchpadVisibility.display = 'none';
      healthLogSizing = 12;
    } else {
      healthLogSizing = 4;
    }

    return (
      <div id='indexPage'>
        <FullPageCanvas>
          

        </FullPageCanvas>
      </div>
    );
  }
}


MainIndex.propTypes = {};
ReactMixin(MainIndex.prototype, ReactMeteorData);

export default MainIndex;