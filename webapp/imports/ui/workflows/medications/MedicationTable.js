import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Table } from 'react-bootstrap';
import Toggle from 'material-ui/Toggle';

Session.setDefault('selectedMedications', []);

export default class MedicationTable extends React.Component {
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
      questionnaires: Medications.find().map(function(questionnaire){
        let result = {
          _id: '',
          name: '',
          manufacturer: '',
          form: '',
          primaryIngredient: ''
        };

        if (questionnaire._id ) {
          result._id = questionnaire._id;
        }
        if (questionnaire.code && questionnaire.code.text ) {
          result.name = questionnaire.code.text ;
        }
        if (questionnaire.manufacturer && questionnaire.manufacturer.display ) {
          result.manufacturer = questionnaire.manufacturer.display ;
        }
        if (questionnaire.product && questionnaire.product.form && questionnaire.product.form.text ) {
          result.form = questionnaire.product.form.text ;
        }
        if (questionnaire.product && questionnaire.product.ingredient && questionnaire.product.ingredient[0] && questionnaire.product.ingredient[0].item && questionnaire.product.ingredient[0].item.code && questionnaire.product.ingredient[0].item.code.text) {
          result.primaryIngredient = questionnaire.product.ingredient[0].item.code.text;
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
    Session.set('questionnaireUpsert', false);
    Session.set('selectedMedication', id);
    Session.set('questionnairePageTabIndex', 2);
  }
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.questionnaires.length; i++) {
      tableRows.push(
      <tr className='questionnaireRow' ref='med-{i}' key={i} style={{cursor: 'pointer'}} onClick={ this.rowClick.bind('this', this.data.questionnaires[i]._id) }>
        <td className="check">
          <Toggle
            ref='med-{i}'
            style={this.data.style.checkbox}
          />
        </td>
        <td className="questionnaireName hidden-on-phone">{this.data.questionnaires[i].name}</td>
        <td className="manufacturerDisplay hidden-on-phone">{this.data.questionnaires[i].manufacturer}</td>
        <td className="questionnaireForm">{this.data.questionnaires[i].form}</td>
        <td className="activeIngredient">{this.data.questionnaires[i].primaryIngredient}</td>
        <td className="barcode hidden-on-phone">{this.data.questionnaires[i]._id}</td>
      </tr>);
    }


    return(
      <Table id="questionnairesTable" ref='questionnairesTable' responses hover >
        <thead>
          <tr>
            <th className="check">prescribed</th>
            <th className="questionnaireName hidden-on-phone">name</th>
            <th className="manufacturerDisplay hidden-on-phone">manufacturer</th>
            <th className="questionnaireForm">form</th>
            <th className="activeIngredient">active ingredient</th>
            <th className="id hidden-on-phone">questionnaire._id</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}


ReactMixin(MedicationTable.prototype, ReactMeteorData);
