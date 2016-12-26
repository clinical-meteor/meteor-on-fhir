import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Table } from 'react-bootstrap';
import Toggle from 'material-ui/Toggle';

Session.setDefault('selectedQuestionnaires', []);

export default class QuestionnaireTable extends React.Component {
  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        block: {
          maxWidth: 250
        },
        checkbox: {
          //marginBottom: 16
        }
      },
      selected: [],
      questionnaireResponses: Questionnaires.find().map(function(questionnaireResponse){
        let result = {
          _id: '',
          name: '',
          manufacturer: '',
          form: '',
          primaryIngredient: ''
        };

        if (questionnaireResponse._id ) {
          result._id = questionnaireResponse._id;
        }
        if (questionnaireResponse.code && questionnaireResponse.code.text ) {
          result.name = questionnaireResponse.code.text ;
        }
        if (questionnaireResponse.manufacturer && questionnaireResponse.manufacturer.display ) {
          result.manufacturer = questionnaireResponse.manufacturer.display ;
        }
        if (questionnaireResponse.product && questionnaireResponse.product.form && questionnaireResponse.product.form.text ) {
          result.form = questionnaireResponse.product.form.text ;
        }
        if (questionnaireResponse.product && questionnaireResponse.product.ingredient && questionnaireResponse.product.ingredient[0] && questionnaireResponse.product.ingredient[0].item && questionnaireResponse.product.ingredient[0].item.code && questionnaireResponse.product.ingredient[0].item.code.text) {
          result.primaryIngredient = questionnaireResponse.product.ingredient[0].item.code.text;
        }

        return result;
      })
    };

    if (Session.get('darkroomEnabled')) {
      data.style.color = 'black';
      data.style.background = 'white';
    } else {
      data.style.color = 'white';
      data.style.background = 'black';
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = 'blur(3px)';
      data.style.webkitFilter = 'blur(3px)';
    }

    // this could be another mixin
    if (Session.get('backgroundBlurEnabled')) {
      data.style.backdropFilter = 'blur(5px)';
    }

    //console.log("data", data);
    return data;
  }
  handleChange(row, key, value) {
    const source = this.state.source;
    source[row][key] = value;
    this.setState({source});
  }

  handleSelect(selected) {
    this.setState({selected});
  }

  rowClick(id){
    Session.set('questionnaireResponseUpsert', false);
    Session.set('selectedQuestionnaire', id);
    Session.set('questionnaireResponsePageTabIndex', 2);
  }
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.questionnaireResponses.length; i++) {
      tableRows.push(
      <tr className='questionnaireResponseRow' ref='med-{i}' key={i} style={{cursor: 'pointer'}} onClick={ this.rowClick.bind('this', this.data.questionnaireResponses[i]._id) }>
        <td className="check">
          <Toggle
            ref='med-{i}'
            style={this.data.style.checkbox}
          />
        </td>
        <td className="questionnaireResponseName hidden-on-phone">{this.data.questionnaireResponses[i].name}</td>
        <td className="manufacturerDisplay hidden-on-phone">{this.data.questionnaireResponses[i].manufacturer}</td>
        <td className="questionnaireResponseForm">{this.data.questionnaireResponses[i].form}</td>
        <td className="activeIngredient">{this.data.questionnaireResponses[i].primaryIngredient}</td>
        <td className="barcode hidden-on-phone">{this.data.questionnaireResponses[i]._id}</td>
      </tr>);
    }


    return(
      <Table id="questionnaireResponsesTable" ref='questionnaireResponsesTable' responses hover >
        <thead>
          <tr>
            <th className="check">prescribed</th>
            <th className="questionnaireResponseName hidden-on-phone">name</th>
            <th className="manufacturerDisplay hidden-on-phone">manufacturer</th>
            <th className="questionnaireResponseForm">form</th>
            <th className="activeIngredient">active ingredient</th>
            <th className="id hidden-on-phone">questionnaireResponse._id</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}


ReactMixin(QuestionnaireTable.prototype, ReactMeteorData);
