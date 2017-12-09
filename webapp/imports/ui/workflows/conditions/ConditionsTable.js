import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';
import { get, has } from 'lodash';

export default class ConditionsTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      conditions: [],
      displayToggle: false,
      displayDates: false,
      displayPatientName: false,
      displayAsserterName: false,
      displayEvidence: false
    }
    
    if(this.props.displayPatientName){
      data.displayPatientName = this.props.displayPatientName;
    }
    if(this.props.displayAsserterName){
      data.displayAsserterName = this.props.displayAsserterName;
    }
    if(this.props.displayToggles){
      data.displayToggle = this.props.displayToggles;
    }
    if(this.props.displayDates){
      data.displayDates = this.props.displayDates;
    }
    if(this.props.displayEvidence){
      data.displayEvidence = this.props.displayEvidence;
    }

    if(this.props.data){
      data.conditions = this.props.data;
    } else {
      if(Conditions.find().count() > 0){
        data.conditions = Conditions.find().fetch();
      }  
    }

    if(process.env.NODE_ENV === "test") console.log("ConditionsTable[data]", data);
    return data;
  };

  renderTogglesHeader(displayToggle){
    if (displayToggle) {
      return (
        <th className="toggle">toggle</th>
      );
    }
  }
  renderToggles(displayToggle, patientId ){
    if (displayToggle) {
      return (
        <td className="toggle">
            <Toggle
              defaultToggled={true}
              //style={styles.toggle}
            />
          </td>
      );
    }
  }
  renderDateHeader(displayDates, header){
    if (displayDates) {
      return (
        <th className='date'>{header}</th>
      );
    }
  }
  renderStartDate(displayDates, startDate ){
    if (displayDates) {
      return (
        <td className='date'>{ moment(startDate).format('YYYY-MM-DD') }</td>
      );
    }
  }
  renderEndDate(displayDates, endDate ){
    if (displayDates) {
      return (
        <td className='date'>{ moment(endDate).format('YYYY-MM-DD') }</td>
      );
    }
  }


  renderPatientNameHeader(displayPatientName){
    if (displayPatientName) {
      return (
        <th className='patientDisplay'>patient</th>
      );
    }
  }
  renderPatientName(displayPatientName, patientDisplay ){
    if (displayPatientName) {
      return (
        <td className='patientDisplay'>{ patientDisplay }</td>
      );
    }
  }
  renderAsserterNameHeader(displayAsserterName){
    if (displayAsserterName) {
      return (
        <th className='asserterDisplay'>asserter</th>
      );
    }
  }
  renderAsserterName(displayAsserterName, asserterDisplay ){
    if (displayAsserterName) {
      return (
        <td className='asserterDisplay'>{ asserterDisplay }</td>
      );
    }
  }  
  renderEvidenceHeader(displayEvidence){
    if (displayEvidence) {
      return (
        <th className='asserterDisplay'>asserter</th>
      );
    }
  }
  renderEvidence(displayEvidence, evidenceDisplay ){
    if (displayEvidence) {
      return (
        <td className='evidenceDisplay'>{ evidenceDisplay }</td>
      );
    }
  } 


  rowClick(id){
    Session.set('conditionsUpsert', false);
    Session.set('selectedCondition', id);
    Session.set('conditionPageTabIndex', 2);
  };
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.conditions.length; i++) {
      var newRow = {
        identifier: '',        
        patientDisplay: '',
        asserterDisplay: '',
        clinicalStatus: '',
        snomedCode: '',
        snomedDisplay: '',
        evidenceDisplay: '',
        barcode: ''
      };
      if (this.data.conditions[i]){

        if(get(this.data.conditions[i], 'identifier[0].value')){
          newRow.identifier = this.data.conditions[i].identifier[0].value;
        }
        if(this.data.conditions[i].patient){
          newRow.patientDisplay = this.data.conditions[i].patient.display;
        }
        if(this.data.conditions[i].asserter){
          newRow.asserterDisplay = this.data.conditions[i].asserter.display;
        }
        if(this.data.conditions[i].clinicalStatus){
          newRow.clinicalStatus = this.data.conditions[i].clinicalStatus;
        }
        if(this.data.conditions[i].code){
          if(this.data.conditions[i].code.coding && this.data.conditions[i].code.coding[0]){            
            newRow.snomedCode = this.data.conditions[i].code.coding[0].code;
            newRow.snomedDisplay = this.data.conditions[i].code.coding[0].display;
          }
        }
        if(this.data.conditions[i].evidence && this.data.conditions[i].evidence[0]){
          if(this.data.conditions[i].evidence[0].detail && this.data.conditions[i].evidence[0].detail[0]){            
            newRow.evidenceDisplay = this.data.conditions[i].evidence[0].detail[0].display;
          }
        }
        if(this.data.conditions[i]._id){
          newRow.barcode = this.data.conditions[i]._id;
        }        
      }

      tableRows.push(
        <tr key={i} className="conditionRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.conditions[i]._id)} >
          { this.renderToggles(this.data.displayToggle, this.data.conditions[i]) }
          { this.renderPatientName(this.data.displayPatientName, newRow.patientDisplay ) } 
          { this.renderAsserterName(this.data.displayAsserterName, newRow.asserterDisplay ) } 
          <td className='clinicalStatus'>{ newRow.clinicalStatus }</td>
          <td className='identifier'>{ newRow.identifier }</td>
          <td className='snomedCode'>{ newRow.snomedCode }</td>
          <td className='snomedDisplay'>{ newRow.snomedDisplay }</td>
          { this.renderEvidence(this.data.displayEvidence, newRow.evidenceDisplay) }
          { this.renderStartDate(this.data.displayDates, this.data.conditions[i].onsetDateTime) }
          { this.renderEndDate(this.data.displayDates, this.data.conditions[i].abatementDateTime) }
        </tr>
      )
    }

    return(
      <Table id='conditionsTable' responses hover >
        <thead>
          <tr>
            { this.renderTogglesHeader(this.data.displayToggle) }
            { this.renderPatientNameHeader(this.data.displayPatientName) }
            { this.renderAsserterNameHeader(this.data.displayAsserterName) }
            <th className='clinicalStatus'>status</th>
            <th className='identifier'>identifier</th>
            <th className='snomedCode'>code</th>
            <th className='snomedDisplay'>condition</th>
            { this.renderEvidenceHeader(this.data.displayEvidence) }
            { this.renderDateHeader(this.data.displayDates, 'start') }
            { this.renderDateHeader(this.data.displayDates, 'end') }
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}


ReactMixin(ConditionsTable.prototype, ReactMeteorData);
