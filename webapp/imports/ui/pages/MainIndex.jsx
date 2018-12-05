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
import { browserHistory } from 'react-router';
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
      style: {
        sectionTitle: {
          display: 'inline-block'
        },
        spacer: {
          display: 'block'
        },
        column: {
          paddingLeft: '5px',
          paddingRight: '5px',
          //border: '1px solid orange'
        }
      },
      col: {
        md: 12,
        mdOffset: 0,
        lg: 6,
        lgOffset: 0
      },
      user: {
        isAdmin: false,
        isPractitioner: false,
        isPatient: true
      },
      showUnderConstruction: true,
      showExperimental: true,
      filterMainTiles: Session.get('filterMainTiles'),
      glassBlurEnabled: Session.get('glassBlurEnabled'),
      observationTableHeight: Session.get('appHeight') - 518
    };


    data.style.indexCard = Glass.darkroom(data.style.indexCard);


    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);

    if(process.env.NODE_ENV === "test") console.log("MainIndex[data]", data);
    return data;
  }
  handleKeyPress(e, value) {
    console.log('handleKeyPress', e.key)

    this.setState({
      newTask: this.state.newTask + e.key
    })
    if (e.key === 'Enter') {
      this.handleTouchTap(this.state.newTask);
    }
  }
  handleTouchTap(value){    
    console.log('handleTouchTap', value)

    var listId;
    let selectedChecklist = Lists.findOne({'code.text': 'Scratchpad'});
    console.log('selectedChecklist', selectedChecklist)
    
    if(selectedChecklist){
      listId = selectedChecklist._id;
    } else {
      let newChecklist = {
        "resourceType": "List",
        "code": {
          "text": "Scratchpad"
        },
        "note": "",
        "source": {
          "reference": "System/system"
        },
        "status": "current",
        "date": new Date(),
        "mode": "changes",
        "entry": []
      };
      listId = Lists._collection.insert(newChecklist);     
      Session.set('selectedChecklist', listId) 
    }

    Lists.update({_id: listId}, {$addToSet: {
      'entry': {
        "flag": {
          "text": "Pending",
          "coding": [
            {
              "system": "http://hl7.org/fhir/ValueSet/order-status",
              "code": "pending",
              "display": "Pending"
            }
          ]
        },
        "deleted": false,
        "date": new Date(),
        "item": {
          "display": value
        }
      }
    }})

    this.setState({
      newTask: ''
    })
  }
  render() {
    var self = this;

    var tilesToRender = [];
        
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
          <Col md={healthLogSizing}>
            <VitalMeasurements />
            <DynamicSpacer />

            <GlassCard height={this.data.observationTableHeight}>
              <ObservationsTable 
                showSubjects={false}
                showDevices={false}
              />
            </GlassCard>

          </Col>
          <Col md={4} style={scratchpadVisibility}>
            <GlassCard height='auto'>
              <CardText>
                <TextField
                  type="newTask"
                  name="newTask"
                  floatingLabelText="New Task"
                  onKeyPress={this.handleKeyPress.bind(this)}
                  hintText='...'
                  value={this.state.newTask}
                  floatingLabelFixed={true}
                  fullWidth
                />
              </CardText>
              <Checklist />
            </GlassCard>
          </Col>


        </FullPageCanvas>
      </div>
    );
  }

  renderTile(user, tileConfig){
    if (user.isPatient || user.isPractitioner || user.isAdmin) {
      return (
        <MenuTile          
          id={ tileConfig.id }
          active={ tileConfig.active }
          path={ tileConfig.path }
          icon={ tileConfig.icon }
          iconSize={ 85 }
          title={ tileConfig.title }
          subtitle={ tileConfig.subtitle }
        />

      );
    }
  }
  openLink(url){
    console.log("openLink", url);

    browserHistory.push(url);
  }
}




MainIndex.propTypes = {
  hasUser: PropTypes.object
};
ReactMixin(MainIndex.prototype, ReactMeteorData);