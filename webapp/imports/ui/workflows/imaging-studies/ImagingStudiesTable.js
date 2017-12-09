import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';
import Toggle from 'material-ui/Toggle';

export default class ImagingStudiesTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      imagingStudies: [],
      displayToggle: false,
      displayDates: false
    }

    if(this.props.displayToggles){
      data.displayToggle = this.props.displayToggles;
    }
    if(this.props.displayDates){
      data.displayDates = this.props.displayDates;
    }
    if(this.props.data){
      data.imagingStudies = this.props.data;
    } else {
      // if(ImagingStudies.find({}, {$sort: {'identifier.type.text': 1}}).count() > 0){
      //   data.imagingStudies = ImagingStudies.find().fetch();
      // }
    }
    //if(process.env.NODE_ENV === "test"){
      console.log("ImagingStudiesTable[data]", data)
    //};
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
  renderDateHeader(displayDates){
    if (displayDates) {
      return (
        <th className='date'>date</th>
      );
    }
  }
  renderDate(displayDates, startedDate ){
    if (displayDates) {
      return (
        <td className='date'>{ moment(startedDate).format('YYYY-MM-DD') }</td>
      );
    }
  }


  rowClick(id){
    Session.set('imagingStudiesUpsert', false);
    Session.set('selectedImmunization', id);
    Session.set('immunizationPageTabIndex', 2);
  };
  render () {
    console.log('this.data', this.data)

      let tableRows = [];
    for (var i = 0; i < this.data.imagingStudies.length; i++) {
      // console.log('this.data.imagingStudies[i]', this.data.imagingStudies[i])
      var newRow = {
        identifier: '',
        started: '',
        barcode: ''
      };
      if (this.data.imagingStudies[i]){

        if(this.data.imagingStudies[i].identifier && this.data.imagingStudies[i].identifier[0]){
          // console.log('this.data.imagingStudies[i].identifier', this.data.imagingStudies[i].identifier)
          newRow.identifier = this.data.imagingStudies[i].identifier[0].value;
        }        
        if(this.data.imagingStudies[i].description){
          // console.log('this.data.imagingStudies[i].description', this.data.imagingStudies[i].description)
          newRow.description = this.data.imagingStudies[i].description;
        }        
        if(this.data.imagingStudies[i].started){
          newRow.started = this.data.imagingStudies[i].started;
        }
        if(this.data.imagingStudies[i]._id){
          newRow.barcode = this.data.imagingStudies[i]._id;
        }
      }

      tableRows.push(
        <tr key={i} className="immunizationRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.imagingStudies[i]._id)} >
          { this.renderToggles(this.data.displayToggle, this.data.imagingStudies[i]) }
          <td className='description'>{ newRow.description }</td>
          <td className='identifier'>{ newRow.identifier }</td>
          { this.renderDate(this.data.displayDates, this.data.imagingStudies[i].started) }
        </tr>
      )
    }

    return(
      <Table id='ImagingStudiesTable' responses hover >
        <thead>
          <tr>
            { this.renderTogglesHeader(this.data.displayToggle) }
            <th className='description'>description</th>
            <th className='identifier'>identifier</th>
            { this.renderDateHeader(this.data.displayDates) }
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}


ReactMixin(ImagingStudiesTable.prototype, ReactMeteorData);
