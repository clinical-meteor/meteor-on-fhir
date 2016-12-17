import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { PageContainer } from '/imports/ui/components/PageContainer';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardTitle, CardText } from 'material-ui/Card';

import { Tabs, Tab } from 'material-ui/Tabs';
import PatientDetail from '../workflows/patients/PatientDetail';
import PatientTable from '../workflows/patients/PatientTable';
import TextField from 'material-ui/TextField';

import Glass from '/imports/ui/Glass';

let defaultPatient = {
  index: 2,
  id: '',
  username: '',
  email: '',
  given: '',
  family: '',
  gender: ''
};
Session.setDefault('patientFormData', defaultPatient);
Session.setDefault('patientSearchFilter', '');

export class PatientsPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderRight: 'none'
        }
      },
      patient: defaultPatient,
      patientSearchFilter: ''
    };

    if (Session.get('patientFormData')) {
      data.patient = Session.get('patientFormData');
    }
    if (Session.get('patientSearchFilter')) {
      data.patientSearchFilter = Session.get('patientSearchFilter');
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("PractitionerDashboard[data]", data);
    return data;
  }

  // this could be a mixin
  handleTabChange(index){
    let patient = Session.get('patientFormData');
    patient["index"] = index;
    Session.set('patientFormData', patient);
  }

  // this could be a mixin
  changeState(field, value){
    let patient = Session.get('patientFormData');
    // console.log("this", this);
    // console.log("value", value);

    patient[field] = value;
    Session.set('patientFormData', patient);
  }

  onNewTab(){
    Session.set('selectedPatient', false);
    Session.set('patientDetailState', false);
  }

  render() {
    return (
      <div id="patientsPage">
        <PageContainer>
          <GlassCard>
            <CardTitle
              title="Patients"
            />
            <CardText>
            <Tabs default index={this.data.patient.index} onChange={this.handleTabChange} initialSelectedIndex={1}>
             <Tab className="newPatientTab" label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0}>
               <PatientDetail />
             </Tab>
             <Tab label='Patients' onActive={this.handleActive} style={this.data.style.tab} value={1}>
               <PatientTable showBarcodes={true} />
             </Tab>
             <Tab label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
               <PatientDetail />
             </Tab>
           </Tabs>



            </CardText>
          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}


// PatientsPage.propTypes = {
//   hasUser: React.PropTypes.objects
// };
ReactMixin(PatientsPage.prototype, ReactMeteorData);
