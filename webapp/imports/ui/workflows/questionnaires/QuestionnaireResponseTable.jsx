import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import AppBar from 'react-toolbox/lib/app_bar';
import Button from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Avatar from 'react-toolbox/lib/avatar';

import { Table } from 'react-bootstrap';
import TextField from 'material-ui/TextField';


Session.setDefault('patientSearchFilter', '');
Session.setDefault('selectedQuestionnaireResponseId', '');

export default class QuestionnaireResponseTable extends React.Component {

  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      responses: QuestionnaireResponses.find().map(function(response){
        let result = {
          id: response._id,
          surveyName: '',
          createdAt: '',
          author: '',
          subject: ''
        };
        if (response.identifier && response.identifier && response.identifier.type && response.identifier.type.coding && response.identifier.type.coding[0] && response.identifier.type.coding[0].display ) {
          result.surveyName = response.identifier.type.coding[0].display;
        }
        if (response.author && response.author.display) {
          result.author = response.author.display;
        }
        if (response.subject && response.subject.display) {
          result.subject = response.subject.display;
        }
        return result;
      })
    };

    if (Session.get('darkroomEnabled')) {
      data.style.color = "black";
      data.style.background = "white";
    } else {
      data.style.color = "white";
      data.style.background = "black";
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = "blur(3px)";
      data.style.webkitFilter = "blur(3px)";
    }

    // this could be another mixin
    if (Session.get('backgroundBlurEnabled')) {
      data.style.backdropFilter = "blur(5px)";
    }

    return data;
  }


  rowClick(id){
    // set the user

    // if a selected row is clicked again, unselect it
    if (Session.equals('selectedQuestionnaireResponseId', id)) {
      Session.set("selectedQuestionnaireResponseId", '');
    } else {
      // otherwise, update the select row to whatever was just clicked
      Session.set("selectedQuestionnaireResponseId", id);
    }

  }
  render () {
    let tableRows = [];
    if(process.env.NODE_ENV === "test") console.log("this.data.patients.length", this.data.responses.length);

    for (var i = 0; i < this.data.responses.length; i++) {
      tableRows.push(
        <tr key={i} className="questionnaireResponseRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.responses[i]._id)} >
          <td>{this.data.responses[i].surveyName }</td>
          <td>{this.data.responses[i].author }</td>
          <td>{this.data.responses[i].subject}</td>
          <td>{this.data.responses[i].createdAt}</td>
          <td className="barcode hidden-on-phone">{this.data.responses[i].id}</td>
        </tr>
      );
    }

    return(
      <div>
        <Table responses hover >
          <thead>
            <tr>
              <th>name</th>
              <th>author</th>
              <th>subject</th>
              <th>created at</th>
              <th>id</th>
            </tr>
          </thead>
          <tbody>
            { tableRows }
          </tbody>
        </Table>
      </div>
    );
  }
}


QuestionnaireResponseTable.propTypes = {};
ReactMixin(QuestionnaireResponseTable.prototype, ReactMeteorData);
