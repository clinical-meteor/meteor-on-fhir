import { CardTitle, CardText } from 'material-ui/Card';
import React from 'react';
import ReactMixin from 'react-mixin';

import { Session } from 'meteor/session';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import Spacer from '/imports/ui/components/Spacer';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

import { browserHistory } from 'react-router';

// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ActionDone from 'material-ui/svg-icons/action/done';
// import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
// import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import MedicationTable from '/imports/ui/workflows/medications/MedicationTable';
import PatientTable from '/imports/ui/workflows/patients/PatientTable';
import ActivitiesTable from '/imports/ui/workflows/carePlans/ActivitiesTable';
import GoalsTable from '/imports/ui/workflows/carePlans/GoalsTable';

import { CarePlans } from 'meteor/clinical:hl7-resource-careplan';
import { authorCarePlan } from '/imports/api/careplans/methods.js';


export class CarePlanDesignerPage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {

    let data = {
      style: {},
      primaryContact: {
        display: ''
      },
      careplan: {
        goal: []
      },
      selectedMeds: []
    };


    // this should all be handled by props
    // or a mixin!
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

    // the following assumes that we only have a single CarePlan record in the database
    if (CarePlans.find({'identifier.value':'alcohol-treatment-template'}).count() > 0) {
      let carePlanTemplate = CarePlans.find({'identifier.value':'alcohol-treatment-template'}).fetch()[0];
      //console.log("carePlanTemplate", carePlanTemplate);

      if (carePlanTemplate ) {
        data.primaryContact = carePlanTemplate.author[0];

        data.careplan = carePlanTemplate;
      }
    }

    //console.log("data", data);


    return data;
  }
  render() {
    let style = {
      inactiveIndexCard: {
        opacity: .5,
        width: '50%',
        display: 'inline-block',
        paddingLeft: '20px',
        paddingRight: '20px'
      },
      indexCard: {
        cursor: 'pointer'
      },
      indexCardPadding: {
        width: '100%',
        display: 'inline-block',
        paddingLeft: '20px',
        paddingRight: '20px',
        position: 'relative'
      }
    };
    return (
      <section id='carePlanPage' style={{paddingTop: "20px"}}>
        <VerticalCanvas>

        <section id="patientSection" style={style.indexCardPadding} >
          <GlassCard style={style.indexCard} >
            <CardTitle
              title='Patient'
              subtitle='Select the patient this care plan will be for.'
            />
            <CardText>
              <PatientTable
                limit={10}
                hideAvatar={true}
                showSearch={true}
              />
            </CardText>
          </GlassCard>
        </section>

        <Spacer />

        <section id="medicationSection" style={style.indexCardPadding} >
          <GlassCard style={style.indexCard} >
            <CardTitle
              title='Medications'
              subtitle='Select the medications the patient will receive.'
            />
            <CardText>
              <MedicationTable />
            </CardText>
          </GlassCard>
        </section>

        <Spacer />

        <section id="activiyiesSection" style={style.indexCardPadding} >
          <GlassCard style={style.indexCard} >
            <CardTitle
              title='Activities'
              subtitle='Select the activities the patient ought to engage in.'
            />
            <CardText>
              <ActivitiesTable />
            </CardText>
          </GlassCard>
        </section>

        <Spacer />

        <section id="goalsSelection" style={style.indexCardPadding} >
          <GlassCard style={style.indexCard} >
            <CardTitle
              title='Goals'
              subtitle='Select the goals for the patient treatment.'
            />
            <CardText>
              <GoalsTable />
            </CardText>
          </GlassCard>
        </section>

        <Spacer />


        <section  style={style.indexCardPadding}>
          <RaisedButton
            id='authorCarePlanButton'
            label="Author CarePlan"
            fullWidth={true}
            onClick={this.authorCarePlan.bind(this)}
          />
        </section>

        </VerticalCanvas>
      </section>
    );
  }
  authorCarePlan(){
    if(process.env.NODE_ENV === "test") console.log("authoring care plan...");

    var currentUser = new User(Meteor.user());

    let careplanData = {
      template: 'alcohol-treatment-template',
      subject: {
        display: Session.get('patientSearchFilter'),
        reference: Session.get('selectedPatientId')
      },
      author: {
        display: currentUser.fullName(),
        reference: Meteor.userId()
      },
      description: 'Alcohol Recovery Treatment Plan',
      medications: Session.get('selectedMedications'),
      goals: Session.get('selectedGoals'),
      deselectedActivities: Session.get('deselectedActivities')
    };

    if(process.env.NODE_ENV === "test") console.log("careplanData", careplanData);


    let newCarePlanId = authorCarePlan.call(careplanData);

    Patients.update({_id: Session.get('selectedPatientId')}, {$set: {
      'carePlanId': newCarePlanId
    }});

    Session.set('selectedMedications', []);
    browserHistory.push('/careplan-history');
  }
}




ReactMixin(CarePlanDesignerPage.prototype, ReactMeteorData);
