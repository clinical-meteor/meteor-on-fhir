import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';

import { Table } from 'react-bootstrap';


export default class RiskAssessmentsTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      riskAssessments: RiskAssessments.find().fetch()
    }


    if(process.env.NODE_ENV === "test") console.log("data", data);
    return data;
  };


  rowClick(id){
    Session.set('riskAssessmentsUpsert', false);
    Session.set('selectedRiskAssessment', id);
    Session.set('riskAssessmentPageTabIndex', 2);
  };
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.riskAssessments.length; i++) {
      tableRows.push(
        <tr key={i} className="riskAssessmentRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.riskAssessments[i]._id)} >

          <td className='subjectDisplay'>{this.data.riskAssessments[i].subject.display }</td>
          <td className='conditionDisplay'>{this.data.riskAssessments[i].condition.display }</td>
          <td className='performerDisplay'>{this.data.riskAssessments[i].performer.display }</td>
          <td className='predictionOutcome'>{this.data.riskAssessments[i].prediction[0] ? this.data.riskAssessments[i].prediction[0].outcome.text :  '' }</td>
          <td className='probabilityDecimal'>{this.data.riskAssessments[i].prediction[0] ? this.data.riskAssessments[i].prediction[0].probabilityDecimal :  '' }</td>
          <td><span className="barcode">{ this.data.riskAssessments[i]._id }</span></td>
        </tr>
      )
    }

    return(
      <Table id='riskAssessmentsTable' responses hover >
        <thead>
          <tr>
            <th className='subjectDisplay'>subject</th>
            <th className='conditionDisplay'>condition</th>
            <th className='performerDisplay'>performer</th>
            <th className='predictionOutcome'>outcome</th>
            <th className='probabilityDecimal'>probability</th>
            <th>_id</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}


ReactMixin(RiskAssessmentsTable.prototype, ReactMeteorData);
