import React  from 'react';
import ReactMixin  from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { Tabs, Tab } from 'material-ui/Tabs';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardTitle, CardText } from 'material-ui/Card';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

import MedicationDetail from '/imports/ui/workflows/medications/MedicationDetail';
import MedicationTable from '/imports/ui/workflows/medications/MedicationTable';
import { Meteor } from 'meteor/meteor';
import Glass from '/imports/ui/Glass';

Session.setDefault('medicationPageTabIndex', 1); Session.setDefault('medicationSearchFilter', ''); Session.setDefault('selectedMedication', false);


export class MedicationsPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderRight: 'none'
        }
      },
      state: {
        isLoggedIn: false
      },
      tabIndex: Session.get('medicationPageTabIndex'),
      medicationSearchFilter: Session.get('medicationSearchFilter'),
      currentMedication: Session.get('selectedMedication')
    };

    if (Meteor.user()) {
      data.state.isLoggedIn = true;
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("MedicationsPage[data]", data);
    return data;
  }

  // this could be a mixin
  handleTabChange(index){
    Session.set('medicationPageTabIndex', index); }

  // this could be a mixin
  onNewTab(){
    console.log("onNewTab; we should clear things...");

    Session.set('selectedMedication', false);
    Session.set('medicationDetailState', { resourceType: 'Medication',
      status: 'preliminary',
      category: {
        text: ''
      },
      effectiveDateTime: '',
      subject: {
        display: '',
        reference: ''
      },
      performer: {
        display: '',
        reference: ''
      },
      device: {
        display: '',
        reference: ''
      },
      valueQuantity: {
        value: '',
        unit: '',
        system: 'http://unitsofmeasure.org'
      }
    });
  }

  render() {
    return (
      <div id="medicationsPage"> <VerticalCanvas>
          <GlassCard>
            <CardTitle
              title="Medications"
            />
            <CardText>
              <Tabs id="medicationsPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}> <Tab className="newMedicationTab" label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0} >
                  <MedicationDetail id='newMedication' />
                </Tab>
                <Tab className="medicationListTab" label='Medications' onActive={this.handleActive} style={this.data.style.tab} value={1}> <MedicationTable />
                 </Tab>
                 <Tab className="medicationDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}> <MedicationDetail id='medicationDetails' /> </Tab>
              </Tabs>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}



ReactMixin(MedicationsPage.prototype, ReactMeteorData);
