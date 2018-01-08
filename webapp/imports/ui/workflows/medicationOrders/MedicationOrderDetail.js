import { CardActions, CardText } from 'material-ui/Card';

import { Bert } from 'meteor/themeteorchef:bert';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

let defaultMedicationOrder = {
  "resourceType": "MedicationOrder",
  "patient": {
    "reference": "",
    "display": ""
  },
  "asserter": {
    "reference": "",
    "display": ""
  },
  "dateRecorded": "",
  "code": {
    "coding": [
      {
        "system": "http://snomed.info/sct",
        "code": "",
        "display": ""
      }
    ]
  },
  "clinicalStatus": "",
  "verificationStatus": "confirmed",
  "severity": {
    "coding": [
      {
        "system": "http://snomed.info/sct",
        "code": "",
        "display": ""
      }
    ]
  },
  "onsetDateTime": "",
  "evidence": [
    {
      "detail": [
        {
          "reference": "",
          "display": ""
        }
      ]
    }
  ]
};



Session.setDefault('medicationOrderUpsert', false);
Session.setDefault('selectedMedicationOrder', false);


export default class MedicationOrderDetail extends React.Component {
  getMeteorData() {
    let data = {
      medicationOrderId: false,
      medicationOrder: defaultMedicationOrder
    };

    if (Session.get('medicationOrderUpsert')) {
      data.medicationOrder = Session.get('medicationOrderUpsert');
    } else {
      if (Session.get('selectedMedicationOrder')) {
        data.medicationOrderId = Session.get('selectedMedicationOrder');
        console.log("selectedMedicationOrder", Session.get('selectedMedicationOrder'));

        let selectedMedicationOrder = MedicationOrders.findOne({_id: Session.get('selectedMedicationOrder')});
        console.log("selectedMedicationOrder", selectedMedicationOrder);

        if (selectedMedicationOrder) {
          data.medicationOrder = selectedMedicationOrder;
        }
      } else {
        data.medicationOrder = defaultMedicationOrder;
      }

    }

    return data;
  }

  render() {
    return (
      <div id={this.props.id} className="medicationOrderDetail">
        <CardText>
          {/* <TextField
            id='patientDisplayInput'
            ref='patientDisplay'
            name='patientDisplay'
            floatingLabelText='Patient'
            value={this.data.medicationOrder.patient ? this.data.medicationOrder.patient.display : ''}
            onChange={ this.changeState.bind(this, 'patientDisplay')}
            fullWidth
            /><br/>
          <TextField
            id='asserterDisplayInput'
            ref='asserterDisplay'
            name='asserterDisplay'
            floatingLabelText='Asserter'
            value={this.data.medicationOrder.asserter ? this.data.medicationOrder.asserter.display : ''}
            onChange={ this.changeState.bind(this, 'asserterDisplay')}
            fullWidth
            /><br/>
          <TextField
            id='clinicalStatusInput'
            ref='clinicalStatus'
            name='clinicalStatus'
            floatingLabelText='Clinical Status'
            value={this.data.medicationOrder.clinicalStatus ? this.data.medicationOrder.clinicalStatus : ''}
            onChange={ this.changeState.bind(this, 'clinicalStatus')}
            fullWidth
            /><br/>
          <TextField
            id='snomedCodeInput'
            ref='snomedCode'
            name='snomedCode'
            floatingLabelText='SNOMED Code'
            value={this.data.medicationOrder.code.coding[0] ? this.data.medicationOrder.code.coding[0].code : ''}
            onChange={ this.changeState.bind(this, 'snomedCode')}
            fullWidth
            /><br/>
          <TextField
            id='snomedDisplayInput'
            ref='snomedDisplay'
            name='snomedDisplay'
            floatingLabelText='SNOMED Display'
            value={this.data.medicationOrder.code.coding[0] ? this.data.medicationOrder.code.coding[0].display : ''}
            onChange={ this.changeState.bind(this, 'snomedDisplay')}
            fullWidth
            /><br/>
          <TextField
            id='evidenceDisplayInput'
            ref='evidenceDisplay'
            name='evidenceDisplay'
            floatingLabelText='Evidence (Observation)'
            value={this.data.medicationOrder.evidence[0].detail[0] ? this.data.medicationOrder.evidence[0].detail[0].display : ''}
            onChange={ this.changeState.bind(this, 'evidenceDisplay')}
            fullWidth
            /><br/> */}




        </CardText>
        <CardActions>
          { this.determineButtons(this.data.medicationOrderId) }
        </CardActions>
      </div>
    );
  }


  determineButtons(medicationOrderId){
    if (medicationOrderId) {
      return (
        <div>
          <RaisedButton id="saveMedicationOrderButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} style={{marginRight: '20px'}}  />
          <RaisedButton id="deleteMedicationOrderButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveMedicationOrderButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }



  // this could be a mixin
  changeState(field, event, value){
    let medicationOrderUpdate;

    if(process.env.NODE_ENV === "test") console.log("MedicationOrderDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new medicationOrder
    if (Session.get('medicationOrderUpsert')) {
      medicationOrderUpdate = Session.get('medicationOrderUpsert');
    } else {
      medicationOrderUpdate = defaultMedicationOrder;
    }



    // if there's an existing medicationOrder, use them
    if (Session.get('selectedMedicationOrder')) {
      medicationOrderUpdate = this.data.medicationOrder;
    }

    switch (field) {
      case "patientDisplay":
        medicationOrderUpdate.patient.display = value;
        break;
      case "asserterDisplay":
        medicationOrderUpdate.asserter.display = value;
        break;
      case "clinicalStatus":
        medicationOrderUpdate.clinicalStatus = value;
        break;
      case "snomedCode":
        medicationOrderUpdate.code.coding[0].code = value;
        break;
      case "snomedDisplay":
        medicationOrderUpdate.code.coding[0].display = value;
        break;
      case "evidenceDisplay":
        medicationOrderUpdate.evidence[0].detail[0].display = value;
        break;
      default:

    }

    if(process.env.NODE_ENV === "test") console.log("medicationOrderUpdate", medicationOrderUpdate);
    Session.set('medicationOrderUpsert', medicationOrderUpdate);
  }

  handleSaveButton(){
    let medicationOrderUpdate = Session.get('medicationOrderUpsert', medicationOrderUpdate);

    if(process.env.NODE_ENV === "test") console.log("medicationOrderUpdate", medicationOrderUpdate);


    if (Session.get('selectedMedicationOrder')) {
      if(process.env.NODE_ENV === "test") console.log("Updating medicationOrder...");
      delete medicationOrderUpdate._id;

      // not sure why we're having to respecify this; fix for a bug elsewhere
      medicationOrderUpdate.resourceType = 'MedicationOrder';

      MedicationOrders.update(
        {_id: Session.get('selectedMedicationOrder')}, {$set: medicationOrderUpdate }, function(error, result) {
          if (error) {
            console.log("error", error);

            Bert.alert(error.reason, 'danger');
          }
          if (result) {
            HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "MedicationOrders", recordId: Session.get('selectedMedicationOrder')});
            Session.set('medicationOrderPageTabIndex', 1);
            Session.set('selectedMedicationOrder', false);
            Session.set('medicationOrderUpsert', false);
            Bert.alert('MedicationOrder updated!', 'success');
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new medicationOrder", medicationOrderUpdate);

      MedicationOrders.insert(medicationOrderUpdate, function(error, result) {
        if (error) {
          console.log("error", error);
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "MedicationOrders", recordId: result});
          Session.set('medicationOrderPageTabIndex', 1);
          Session.set('selectedMedicationOrder', false);
          Session.set('medicationOrderUpsert', false);
          Bert.alert('MedicationOrder added!', 'success');
        }
      });
    }
  }

  handleCancelButton(){
    Session.set('medicationOrderPageTabIndex', 1);
  }

  handleDeleteButton(){
    MedicationOrder.remove({_id: Session.get('selectedMedicationOrder')}, function(error, result){
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "MedicationOrders", recordId: Session.get('selectedMedicationOrder')});
        Session.set('medicationOrderPageTabIndex', 1);
        Session.set('selectedMedicationOrder', false);
        Session.set('medicationOrderUpsert', false);
        Bert.alert('MedicationOrder removed!', 'success');
      }
    });
  }
}


MedicationOrderDetail.propTypes = {
  hasUser: PropTypes.object
};
ReactMixin(MedicationOrderDetail.prototype, ReactMeteorData);
