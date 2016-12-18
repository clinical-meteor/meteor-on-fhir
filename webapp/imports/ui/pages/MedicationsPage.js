import { ReactMeteorData } from 'meteor/react-meteor-data';
import React  from 'react';
import ReactMixin  from 'react-mixin';
import {Tabs, Tab} from 'material-ui/Tabs';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

import MedicationDetail from '/imports/ui/workflows/medications/MedicationDetail';
import MedicationTable from '/imports/ui/workflows/medications/MedicationTable';

let defaultState = {
  index: 1,
  id: "",
  username: "",
  email: "",
  given: "",
  family: ""
};

Session.setDefault('medicationCardState', defaultState);

export class MedicationsPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      state: defaultState
    };

    if (Session.get('medicationCardState')) {
      data.state = Session.get('medicationCardState');
    }

    // this should all be handled by props
    // or a mixin!
    if (Session.get('darkroomEnabled')) {
      data.style.color = "black";
      data.style.background = "white";
    } else {
      data.style.color = "white";
      data.style.background = "black";
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = "blur(3px)";
      data.style.webkitFilter = "blur(3px)";
    }

    // this could be another mixin
    if (Session.get('backgroundBlurEnabled')) {
      data.style.backdropFilter = "blur(5px)";
    }

    return data;
  }

  // this could be a mixin
  handleTabChange(index){
    let state = Session.get('medicationCardState');
    state["index"] = index;
    Session.set('medicationCardState', state);
  }

  // this could be a mixin
  changeState(field, value){
    let state = Session.get('medicationCardState');
    state[field] = value;
    Session.set('medicationCardState', state);
  }

  // this could be a mixin
  onNewTab(){
    if(process.env.NODE_ENV === "test") console.log("onNewTab");

    Session.set('selectedMedication', false);
    Session.set('medicationDetailState', false);
  }

  render() {
    return (
      <div id="medicationsPage">
        <VerticalCanvas>
          <GlassCard>

            <Tabs id="medicationTabs" default index={this.data.state.index} onChange={this.handleTabChange}>
              <Tab className="newMedicationTab" label='New' style={{padded: "20px", backgroundColor: 'white', color: 'black', borderBottom: '1px solid lightgray'}} onActive={ this.onNewTab } >
                <MedicationDetail />
              </Tab>
              <Tab className="medicationListTab" label='Medications' onActive={this.handleActive} style={{backgroundColor: 'white', color: 'black', borderBottom: '1px solid lightgray'}}>
                <MedicationTable />
               </Tab>
               <Tab className="medicationDetailsTab" label='Detail' style={{padded: "20px", backgroundColor: 'white', color: 'black', borderBottom: '1px solid lightgray'}}>
                <MedicationDetail />
              </Tab>
            </Tabs>

          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}


MedicationsPage.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(MedicationsPage.prototype, ReactMeteorData);
