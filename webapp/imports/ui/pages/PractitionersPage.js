import { ReactMeteorData } from 'meteor/react-meteor-data';
import React  from 'react';
import ReactMixin  from 'react-mixin';
import { Tabs, Tab } from 'material-ui/Tabs';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import PractitionerDetail  from '/imports/ui/workflows/practitioners/PractitionerDetail';
import PractitionerTable  from '/imports/ui/workflows/practitioners/PractitionerTable';

let defaultState = {
  index: 1,
  id: "",
  username: "",
  email: "",
  given: "",
  family: ""
};
Session.setDefault('practitionerCardState', defaultState);

export class PractitionersPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      state: defaultState
    };

    if (Session.get('practitionerCardState')) {
      data.state = Session.get('practitionerCardState');
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
  };

  // this could be a mixin
  handleTabChange(index){
    let state = Session.get('practitionerCardState');
    state["index"] = index;
    Session.set('practitionerCardState', state);
  };

  // this could be a mixin
  changeState(field, value){
    let state = Session.get('practitionerCardState');
    state[field] = value;
    Session.set('practitionerCardState', state);
  };

  // this could be a mixin
  onNewTab(){
    console.log("onNewTab");

    Session.set('selectedPractitioner', false);
    Session.set('practitionerDetailState', false);
  };

  render() {
    return (
      <div id="practitionersPage">
        <VerticalCanvas>
          <GlassCard>

            <Tabs id="practitionerTabs" default index={this.data.state.index} onChange={this.handleTabChange}>
              <Tab className="newPractitionerTab" label='New' style={{padded: "20px", backgroundColor: 'white', color: 'black', borderBottom: '1px solid lightgray'}} onActive={ this.onNewTab } >
                <PractitionerDetail />
              </Tab>
              <Tab className="practitionerListTab" label='Practitioners' onActive={this.handleActive} style={{backgroundColor: 'white', color: 'black', borderBottom: '1px solid lightgray'}}>
                <PractitionerTable />
               </Tab>
               <Tab className="practitionerDetailsTab" label='Detail' style={{padded: "20px", backgroundColor: 'white', color: 'black', borderBottom: '1px solid lightgray'}}>
                <PractitionerDetail />
              </Tab>
            </Tabs>

          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}


PractitionersPage.propTypes = {
  hasUser: React.PropTypes.object,
};
ReactMixin(PractitionersPage.prototype, ReactMeteorData);
