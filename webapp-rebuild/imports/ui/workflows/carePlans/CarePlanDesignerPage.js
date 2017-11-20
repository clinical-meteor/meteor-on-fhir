import { Card, CardHeader, CardText, CardTitle } from 'material-ui/Card';

import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import ActivitiesTable from '/imports/ui/workflows/carePlans/ActivitiesTable';
import { CarePlans } from 'meteor/clinical:hl7-resource-careplan';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { GlassCard } from '/imports/ui/components/GlassCard';
import GoalsTable from '/imports/ui/workflows/carePlans/GoalsTable';
import MedicationTable from '/imports/ui/workflows/medications/MedicationTable';
import PatientTable from '/imports/ui/workflows/patients/PatientTable';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Session } from 'meteor/session';
import Spacer from '/imports/ui/components/Spacer';
import TextField from 'material-ui/TextField';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { browserHistory } from 'react-router';

Session.setDefault('patientDialogOpen', false);
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
      selectedMeds: [],
      patientDialog: {
        open: Session.get('patientDialogOpen'),
        patient: {
          display: '',
          reference: ''
        }
      }
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

    return data;
  }
  changeInput(variable, event, value){
    Session.set(variable, value);
  }  
  handleOpenPatients(){
    Session.set('patientDialogOpen', true);
  }  
  handleClosePatients(){
    Session.set('patientDialogOpen', false);
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
    const patientActions = [
      <FlatButton
        label="Clear"
        primary={true}
        onTouchTap={this.handleClosePatients}
      />,
      <FlatButton
        label="Select"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClosePatients}
      />
    ];
    return (
      <section id='carePlanPage' style={{paddingTop: "20px", position: 'absolute'}}>
        <VerticalCanvas >

          <section id="patientSection" style={style.indexCardPadding} >
            {/* <GlassCard style={style.indexCard} >
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
            </GlassCard> */}


            <GlassCard>
              <CardTitle
                title="Patient Pick List"
              />
              <CardText>

                <TextField
                  hintText="Jane Doe"
                  errorText="Patient Search"
                  onChange={this.changeInput.bind(this, 'description')}
                  value={this.data.patientDialog.patient.display}
                  fullWidth>
                    <FlatButton
                      label="Patients"
                      className="patientsButton"
                      primary={true}
                      onTouchTap={this.handleOpenPatients}
                      icon={ <AccountCircle /> }
                      style={{textAlign: 'right', cursor: 'pointer'}}
                    />
                  </TextField>

                <Dialog
                  title="Patient Search"
                  actions={patientActions}
                  modal={false}
                  open={this.data.patientDialog.open}
                  onRequestClose={this.handleClosePatients}
                >
                  <CardText style={{overflowY: "auto"}}>
                  <TextField
                    hintText="Jane Doe"
                    errorText="Patient Search"
                    onChange={this.changeInput.bind(this, 'description')}
                    value={this.data.patientDialog.patient.display}
                    fullWidth />
                    <PatientTable />
                  </CardText>
                </Dialog>
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
              //onClick={this.authorCarePlan.bind(this)}
              style={{marginBottom: '60px'}}
            />
          </section>

        </VerticalCanvas>
      </section>
    );
  }
  // authorCarePlan(){
  //   if(process.env.NODE_ENV === "test") console.log("authoring care plan...");

  //   var currentUser = new User(Meteor.user());

  //   let careplanData = {
  //     template: 'alcohol-treatment-template',
  //     subject: {
  //       display: Session.get('patientSearchFilter'),
  //       reference: Session.get('selectedPatientId')
  //     },
  //     author: {
  //       display: currentUser.fullName(),
  //       reference: Meteor.userId()
  //     },
  //     description: 'Alcohol Recovery Treatment Plan',
  //     medications: Session.get('selectedMedications'),
  //     goals: Session.get('selectedGoals'),
  //     deselectedActivities: Session.get('deselectedActivities')
  //   };

  //   if(process.env.NODE_ENV === "test") console.log("careplanData", careplanData);


  //   let newCarePlanId = authorCarePlan.call(careplanData);

  //   Patients.update({_id: Session.get('selectedPatientId')}, {$set: {
  //     'carePlanId': newCarePlanId
  //   }});

  //   Session.set('selectedMedications', []);
  //   browserHistory.push('/careplan-history');
  // }
}




ReactMixin(CarePlanDesignerPage.prototype, ReactMeteorData);
