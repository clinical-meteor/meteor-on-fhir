import { CardActions, CardText } from 'material-ui/Card';

import { Bert } from 'meteor/themeteorchef:bert';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

let defaultMedication = {
  resourceType: 'Medication',
  code: {
    text: ""
  },
  isBrand: true,
  manufacturer: {
    display: '',
    reference: ''
  },
  product: {
    form: {
      text: 'tablet'
    },
    ingredient: [{
      item: {
        resourceType: 'Substance',
        code: {
          text: ''
        },
        description: ''
      },
      instance: [{
        quantity: ''
      }]
    }]
  },
  package: {
    container: {
      text: 'bottle'
    },
    content: [{
      amount: {
        value: 30,
        unit: 'tablet'
      }
    }]
  }
};

Session.setDefault('medicationUpsert', false);
Session.setDefault('selectedMedication', false);


export default class MedicationDetail extends React.Component {
  getMeteorData() {
    let data = {
      medicationId: false,
      medication: defaultMedication
    };

    if (Session.get('medicationUpsert')) {
      data.medication = Session.get('medicationUpsert');
    } else {
      if (Session.get('selectedMedication')) {
        data.medicationId = Session.get('selectedMedication');
        console.log("selectedMedication", Session.get('selectedMedication'));

        let selectedMedication = Medications.findOne({_id: Session.get('selectedMedication')});
        console.log("selectedMedication", selectedMedication);

        if (selectedMedication) {
          data.medication = selectedMedication;
        }
      } else {
        data.medication = defaultMedication;
      }

    }

    return data;
  }


  // this could be a mixin
  changeState(field, event, value){
    let medicationUpdate;

    if(process.env.NODE_ENV === "test") console.log("MedicationDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new medication
    if (Session.get('medicationUpsert')) {
      medicationUpdate = Session.get('medicationUpsert');
    } else {
      medicationUpdate = defaultMedication;
    }



    // if there's an existing medication, use them
    if (Session.get('selectedMedication')) {
      medicationUpdate = this.data.medication;
    }

    switch (field) {
      case "medicationName":
        medicationUpdate.code.text = value;
        break;
      case "manufacturerDisplay":
        medicationUpdate.manufacturer.display = value;
        break;
      case "medicationForm":
        medicationUpdate.product.form.text = value;
        break;
      case "activeIngredient":
        medicationUpdate.product.ingredient[0].item.code.text = value;
        break;
      case "activeIngredientQuantity":
        medicationUpdate.product.ingredient[0].instance[0].quantity = value;
        break;
      case "activeIngredientDescription":
        medicationUpdate.product.ingredient[0].item.description = value;
        break;
      default:

    }


    // medicationUpdate[field] = value;
    if(process.env.NODE_ENV === "test") console.log("medicationUpdate", medicationUpdate);

    Session.set('medicationUpsert', medicationUpdate);
  }
  openTab(index){
    // set which tab is selected
    let state = Session.get('medicationCardState');
    state["index"] = index;
    Session.set('medicationCardState', state);
  }


  render() {
    return (
      <div id={this.props.id} className="medicationDetail">
        <CardText>
          <TextField
            id='medicationNameInput'
            ref='medicationName'
            name='medicationName'
            floatingLabelText='Medication Name'
            value={this.data.medication.code.text}
            onChange={ this.changeState.bind(this, 'medicationName')}
            fullWidth
            /><br/>
          <TextField
            id='manufacturerDisplayInput'
            ref='manufacturerDisplay'
            name='manufacturerDisplay'
            floatingLabelText='Manufacturer'
            value={this.data.medication.manufacturer.display ? this.data.medication.manufacturer.display : ''}
            onChange={ this.changeState.bind(this, 'manufacturerDisplay')}
            fullWidth
            /><br/>
          <TextField
            id='medicationFormInput'
            ref='medicationForm'
            name='medicationForm'
            floatingLabelText='Substance Form'
            value={this.data.medication.product.form.text}
            onChange={ this.changeState.bind(this, 'medicationForm')}
            fullWidth
            /><br/>
          <TextField
            id='activeIngredientInput'
            ref='activeIngredient'
            name='activeIngredient'
            floatingLabelText='Active Ingredient'
            value={this.data.medication.product.ingredient[0].item.code.text}
            onChange={ this.changeState.bind(this, 'activeIngredient')}
            fullWidth
            /><br/>
          <TextField
            id='activeIngredientQuantityInput'
            ref='activeIngredientQuantity'
            name='activeIngredientQuantity'
            floatingLabelText='Quantity'
            value={this.data.medication.product.ingredient[0].instance[0].quantity}
            onChange={ this.changeState.bind(this, 'activeIngredientQuantity')}
            fullWidth
            /><br/>
          <TextField
            id='activeIngredientDescriptionInput'
            ref='activeIngredientDescription'
            name='activeIngredientDescription'
            floatingLabelText='Active Ingredient Description'
            value={this.data.medication.product.ingredient[0].item.description}
            onChange={ this.changeState.bind(this, 'activeIngredientDescription')}
            fullWidth
            /><br/>
        </CardText>
        <CardActions>
          { this.determineButtons(this.data.medicationId) }
        </CardActions>
      </div>
    );
  }


  determineButtons(medicationId){
    if (medicationId) {
      return (
        <div>
          <RaisedButton id="saveMedicationButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} style={{marginRight: '20px'}}  />
          <RaisedButton id="deleteMedicationButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveMedicationButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }


  // this could be a mixin
  handleSaveButton(){
    let medicationUpdate = Session.get('medicationUpsert', medicationUpdate);

    if(process.env.NODE_ENV === "test") console.log("medicationUpdate", medicationUpdate);


    if (Session.get('selectedMedication')) {
      if(process.env.NODE_ENV === "test") console.log("update practioner");
      delete medicationUpdate._id;

      Medications.update(
        {_id: Session.get('selectedMedication')}, {$set: medicationUpdate }, function(error, result) {
          if (error) {
            console.log("error", error);
            Bert.alert(error.reason, 'danger');
          }
          if (result) {
            HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Medications", recordId: Session.get('selectedMedication')});
            Session.set('medicationPageTabIndex', 1);
            Session.set('selectedMedication', false);
            Session.set('medicationUpsert', false);
            Bert.alert('Medication updated!', 'success');
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new medication", medicationUpdate);

      Medications.insert(medicationUpdate, function(error, result) {
        if (error) {
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Medications", recordId: result});
          Session.set('medicationPageTabIndex', 1);
          Session.set('selectedMedication', false);
          Session.set('medicationUpsert', false);
          Bert.alert('Medication added!', 'success');
        }
      });
    }
  }

  // this could be a mixin
  handleCancelButton(){
    Session.set('medicationPageTabIndex', 1);
  }

  handleDeleteButton(){
    removeMedicationById.call(
      {_id: Session.get('selectedMedication')}, (error, result) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Medications", recordId: Session.get('selectedMedication')});
        Session.set('medicationPageTabIndex', 1);
        Session.set('selectedMedication', false);
        Session.set('medicationUpsert', false);
        Bert.alert('Medication deleted!', 'success');
      }
    });
  }
}


MedicationDetail.propTypes = {
  hasUser: PropTypes.object
};
ReactMixin(MedicationDetail.prototype, ReactMeteorData);
