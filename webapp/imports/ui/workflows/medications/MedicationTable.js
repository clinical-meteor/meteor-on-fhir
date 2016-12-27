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
      medications: Medications.find().map(function(medication){
        let result = {
          _id: '',
          name: '',
          manufacturer: '',
          form: '',
          primaryIngredient: ''
        };

        if (medication._id ) {
          result._id = medication._id;
        }
        if (medication.code && medication.code.text ) {
          result.name = medication.code.text ;
        }
        if (medication.manufacturer && medication.manufacturer.display ) {
          result.manufacturer = medication.manufacturer.display ;
        }
        if (medication.product && medication.product.form && medication.product.form.text ) {
          result.form = medication.product.form.text ;
        }
        if (medication.product && medication.product.ingredient && medication.product.ingredient[0] && medication.product.ingredient[0].item && medication.product.ingredient[0].item.code && medication.product.ingredient[0].item.code.text) {
          result.primaryIngredient = medication.product.ingredient[0].item.code.text;
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


  rowClick(id){
    Session.set('medicationUpsert', false);
    Session.set('selectedMedication', id);
    Session.set('medicationPageTabIndex', 2);
  }
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.medications.length; i++) {
      tableRows.push(
      <tr className='medicationRow' ref='med-{i}' key={i} style={{cursor: 'pointer'}} onClick={ this.rowClick.bind('this', this.data.medications[i]._id) }>
        <td className="check">
          <Toggle
            ref='med-{i}'
            style={this.data.style.checkbox}
          />
        </td>
        <td className="medicationName hidden-on-phone">{this.data.medications[i].name}</td>
        <td className="manufacturerDisplay hidden-on-phone">{this.data.medications[i].manufacturer}</td>
        <td className="medicationForm">{this.data.medications[i].form}</td>
        <td className="activeIngredient">{this.data.medications[i].primaryIngredient}</td>
        <td className="barcode hidden-on-phone">{this.data.medications[i]._id}</td>
      </tr>);
    }


    return(
      <Table id="medicationsTable" ref='medicationsTable' responses hover >
        <thead>
          <tr>
            <th className="check">prescribed</th>
            <th className="medicationName hidden-on-phone">name</th>
            <th className="manufacturerDisplay hidden-on-phone">manufacturer</th>
            <th className="medicationForm">form</th>
            <th className="activeIngredient">active ingredient</th>
            <th className="id hidden-on-phone">medication._id</th>
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
