// base layout
import { CardHeader, CardText, CardTitle, TextField, DatePicker, FlatButton } from 'material-ui';
import PropTypes from 'prop-types';

import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import React, { Component } from 'react';

import { Session } from 'meteor/session';
import Dialog from 'material-ui/Dialog';
import { Container, Col, Row } from 'react-bootstrap';

import { get, has } from 'lodash';
import Interweave from 'interweave';



Session.setDefault('patientSearchDialogOpen', false);
Session.setDefault('patientSearchDialogResourceId', '');

export class PatientSearchDialog extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {
    let data = {
      patientSearchDialog: {
        open: Session.get('patientSearchDialogOpen'),
        resourceType: Session.get('patientSearchDialogResourceType'),
        resourceId: Session.get('patientSearchDialogResourceId')
      },
      fields: {
        mongoId: '',
        id: '',
        narrative: '',
        versionId: '',
        lastUpdated: '',
        sourceUrl: '',
        securityTags: [],
        extensions: [],
        tags: [],
        profiles: []
      }
    };


    // console.log("PatientSearchDialog[data]", data);
    return data;
  }
  handleClosePatientSearchDialog(){
    Session.set('patientSearchDialogOpen', false);
  }
  toggleRawDataDisplay(){
    Session.toggle('patientSearchDialogDisplayRawJson');
  }
  handleTextareaUpdate(){

  }
  changeEndSearchWindow(foo, date){
    console.log('changeEndSearchWindow', date)
    if(date){
      Session.set('end_date', moment(date).format('YYYY-MM-DD'));
    }
  }
  changeStartSearchWindow(foo, date){
    console.log('changeStartSearchWindow', date)
    if(date){
      Session.set('start_date', moment(date).format('YYYY-MM-DD'));
    }
  }
  changeBirthDate(foo, date){
    console.log('changeStartSearchWindow', date)
    if(date){
      Session.set('birth_date', moment(date).format('YYYY-MM-DD'));
    }
  }
  render(){

    let dialogSectionStyle = {
      minHeight: '80px'
    }
    
    const patientSearchActions = [
      <FlatButton
        label="Search"
        primary={true}
        onClick={this.toggleRawDataDisplay}
        style={{float: 'left'}}
      />,
      <FlatButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClosePatientSearchDialog}
      />
    ];

    let cardTitle = "Patient Search";

    return (
      <Dialog
        actions={patientSearchActions}
        modal={false}
        open={this.data.patientSearchDialog.open}
        onRequestClose={this.handleClosePatientSearchDialog}
        style={{minHeight: '560px'}}
      >
      <Row id='patientSearch' style={{height: '80px', position: 'absolute', width: '100%'}}>
        <CardTitle
          title="Search"
        />
        <CardTitle
          title={get(this, 'data.fields.mongoId')}
          style={{right: '10px', position: 'absolute', top: '0px'}}
          className="barcode"
        />    
      </Row>
      <Row>
        <DatePicker defaultDate={ new Date("2018", "07", "01") } hintText="Start" mode="landscape" className='start_date' name='start_date' style={{width: '200px', marginRight: '80px', float: 'left'}} onChange={this.changeStartSearchWindow.bind(this)} />
        <DatePicker defaultDate={ new Date("2018", "07", "01") } hintText="End" mode="landscape" className='end_date' name='end_date' style={{width: '200px', marginRight: '80px', float: 'left'}} onChange={this.changeEndSearchWindow.bind(this)} />
      </Row>
      <Row>
        <CardText style={{overflowY: "auto", marginTop: '60px'}}>
          <TextField label="Patient Name" fullWidth />
          <TextField label="Medical Record Number" fullWidth />
          <DatePicker defaultDate={ new Date("2018", "07", "01") } hintText="End" mode="landscape" className='end_date' name='end_date' style={{width: '200px', marginRight: '80px', float: 'left'}} onChange={this.changeBirthDate.bind(this)} />
        </CardText>
      </Row>
      </Dialog>
    );
  }
}

ReactMixin(PatientSearchDialog.prototype, ReactMeteorData);
export default PatientSearchDialog;