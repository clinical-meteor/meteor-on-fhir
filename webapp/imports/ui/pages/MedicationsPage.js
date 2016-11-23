import { ReactMeteorData } from 'meteor/react-meteor-data';
import React  from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactMixin  from 'react-mixin';
import Button  from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Input  from 'react-toolbox/lib/input';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';
import { AddDocument } from '/imports/ui/components/AddDocument.js';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { PageContainer } from '/imports/ui/components/PageContainer';
import DocumentsList  from '../containers/documents-list.js';

import MedicationDetail from '../workflows/medications/MedicationDetail';
import MedicationTable from '../workflows/medications/MedicationTable';

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
        <PageContainer>
          <GlassCard>

            <Tabs id="medicationTabs" default index={this.data.state.index} onChange={this.handleTabChange}>
              <Tab className="newMedicationTab" label='New' style={{padded: "20px"}} onActive={ this.onNewTab } >
                <MedicationDetail />
              </Tab>
              <Tab className="medicationListTab" label='Medications' onActive={this.handleActive}>
                <MedicationTable />
               </Tab>
               <Tab className="medicationDetailsTab" label='Detail' style={{padded: "20px"}}>
                <MedicationDetail />
              </Tab>
            </Tabs>

          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}


MedicationsPage.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(MedicationsPage.prototype, ReactMeteorData);
