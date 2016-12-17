import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { PageContainer } from '/imports/ui/components/PageContainer';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardTitle, CardText } from 'material-ui/Card';

import { Tabs, Tab } from 'material-ui/Tabs';
import PatientDetail from '../workflows/patients/PatientDetail';
import PatientTable from '../workflows/patients/PatientTable';

import Glass from '/imports/ui/Glass';

let defaultState = {
  index: 2,
  id: "",
  username: "",
  email: "",
  given: "",
  family: "",
  gender: ""
};
Session.setDefault('patientCardState', defaultState);

export class PatientsPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderLeft: 'none'
        }
      },
      state: defaultState
    };

    if (Session.get('patientCardState')) {
      data.state = Session.get('patientCardState');
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("PractitionerDashboard[data]", data);
    return data;
  }

  // this could be a mixin
  handleTabChange(index){
    let state = Session.get('patientCardState');
    state["index"] = index;
    Session.set('patientCardState', state);
  }

  // this could be a mixin
  changeState(field, value){
    let state = Session.get('patientCardState');
    // console.log("this", this);
    // console.log("value", value);

    state[field] = value;
    Session.set('patientCardState', state);
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

            <Tabs default index={this.data.state.index} onChange={this.handleTabChange} initialSelectedIndex={1}>
             <Tab className="newPatientTab" label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0}>
               <PatientDetail />
             </Tab>
             <Tab label='Patients' onActive={this.handleActive} style={this.data.style.tab} value={1}>
               <PatientTable />
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
