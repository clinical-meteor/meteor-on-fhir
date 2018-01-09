import { CardActions, CardText } from 'material-ui/Card';

import { Bert } from 'meteor/themeteorchef:bert';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

let defaultCarePlan = {
  "resourceType": "CarePlan",
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



Session.setDefault('carePlanUpsert', false);
Session.setDefault('selectedCarePlan', false);


export default class CarePlanDetail extends React.Component {
  getMeteorData() {
    let data = {
      carePlanId: false,
      carePlan: defaultCarePlan
    };

    if (Session.get('carePlanUpsert')) {
      data.carePlan = Session.get('carePlanUpsert');
    } else {
      if (Session.get('selectedCarePlan')) {
        data.carePlanId = Session.get('selectedCarePlan');
        console.log("selectedCarePlan", Session.get('selectedCarePlan'));

        let selectedCarePlan = CarePlans.findOne({_id: Session.get('selectedCarePlan')});
        console.log("selectedCarePlan", selectedCarePlan);

        if (selectedCarePlan) {
          data.carePlan = selectedCarePlan;
        }
      } else {
        data.carePlan = defaultCarePlan;
      }

    }

    return data;
  }

  render() {
    return (
      <div id={this.props.id} className="carePlanDetail">
        <CardText>





        </CardText>
        <CardActions>
          { this.determineButtons(this.data.carePlanId) }
        </CardActions>
      </div>
    );
  }


  determineButtons(carePlanId){
    if (carePlanId) {
      return (
        <div>
          <RaisedButton id="saveCarePlanButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)}  style={{marginRight: '20px'}}  />
          <RaisedButton id="deleteCarePlanButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveCarePlanButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }



  // this could be a mixin
  changeState(field, event, value){
    let carePlanUpdate;

    if(process.env.NODE_ENV === "test") console.log("CarePlanDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new carePlan
    if (Session.get('carePlanUpsert')) {
      carePlanUpdate = Session.get('carePlanUpsert');
    } else {
      carePlanUpdate = defaultCarePlan;
    }



    // if there's an existing carePlan, use them
    if (Session.get('selectedCarePlan')) {
      carePlanUpdate = this.data.carePlan;
    }

    switch (field) {
      case "patientDisplay":
        carePlanUpdate.patient.display = value;
        break;
      case "asserterDisplay":
        carePlanUpdate.asserter.display = value;
        break;
      case "clinicalStatus":
        carePlanUpdate.clinicalStatus = value;
        break;
      case "snomedCode":
        carePlanUpdate.code.coding[0].code = value;
        break;
      case "snomedDisplay":
        carePlanUpdate.code.coding[0].display = value;
        break;
      case "evidenceDisplay":
        carePlanUpdate.evidence[0].detail[0].display = value;
        break;
      default:

    }

    if(process.env.NODE_ENV === "test") console.log("carePlanUpdate", carePlanUpdate);
    Session.set('carePlanUpsert', carePlanUpdate);
  }

  handleSaveButton(){
    let carePlanUpdate = Session.get('carePlanUpsert', carePlanUpdate);

    if(process.env.NODE_ENV === "test") console.log("carePlanUpdate", carePlanUpdate);


    if (Session.get('selectedCarePlan')) {
      if(process.env.NODE_ENV === "test") console.log("Updating carePlan...");
      delete carePlanUpdate._id;

      // not sure why we're having to respecify this; fix for a bug elsewhere
      carePlanUpdate.resourceType = 'CarePlan';

      CarePlans.update(
        {_id: Session.get('selectedCarePlan')}, {$set: carePlanUpdate }, function(error, result) {
          if (error) {
            console.log("error", error);

            Bert.alert(error.reason, 'danger');
          }
          if (result) {
            HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "CarePlans", recordId: Session.get('selectedCarePlan')});
            Session.set('carePlanPageTabIndex', 1);
            Session.set('selectedCarePlan', false);
            Session.set('carePlanUpsert', false);
            Bert.alert('CarePlan updated!', 'success');
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new carePlan", carePlanUpdate);

      CarePlans.insert(carePlanUpdate, function(error, result) {
        if (error) {
          console.log("error", error);
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "CarePlans", recordId: result});
          Session.set('carePlanPageTabIndex', 1);
          Session.set('selectedCarePlan', false);
          Session.set('carePlanUpsert', false);
          Bert.alert('CarePlan added!', 'success');
        }
      });
    }
  }

  handleCancelButton(){
    Session.set('carePlanPageTabIndex', 1);
  }

  handleDeleteButton(){
    CarePlan.remove({_id: Session.get('selectedCarePlan')}, function(error, result){
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "CarePlans", recordId: Session.get('selectedCarePlan')});
        Session.set('carePlanPageTabIndex', 1);
        Session.set('selectedCarePlan', false);
        Session.set('carePlanUpsert', false);
        Bert.alert('CarePlan removed!', 'success');
      }
    });
  }
}


CarePlanDetail.propTypes = {
  hasUser: PropTypes.object
};
ReactMixin(CarePlanDetail.prototype, ReactMeteorData);
