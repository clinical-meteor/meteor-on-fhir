import { ReactMeteorData } from 'meteor/react-meteor-data'
import React  from 'react'
import { Row, Col } from 'react-bootstrap'
import ReactMixin  from 'react-mixin'
import Button  from 'react-toolbox/lib/button'
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card'
import Input  from 'react-toolbox/lib/input'
import { Tab, Tabs } from 'react-toolbox/lib/tabs'
import { AddDocument } from '/imports/ui/components/AddDocument.js'
import { GlassCard } from '/imports/ui/components/GlassCard'
import { PageContainer } from '/imports/ui/components/PageContainer'
import DocumentsList  from '../containers/documents-list.js'
import PractitionerDetail  from '../workflows/practitioners/PractitionerDetail'
import PractitionerTable  from '../workflows/practitioners/PractitionerTable'

let defaultState = {
  index: 1,
  id: "",
  username: "",
  email: "",
  given: "",
  family: "",
}
Session.setDefault('practitionerCardState', defaultState);

export class PractitionersPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      state: defaultState
    }

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
        <PageContainer>
          <GlassCard>

            <Tabs id="practitionerTabs" default index={this.data.state.index} onChange={this.handleTabChange}>
              <Tab className="newPractitionerTab" label='New' style={{padded: "20px"}} onActive={ this.onNewTab } >
                <PractitionerDetail />
              </Tab>
              <Tab className="practitionerListTab" label='Practitioners' onActive={this.handleActive}>
                <PractitionerTable />
               </Tab>
               <Tab className="practitionerDetailsTab" label='Detail' style={{padded: "20px"}}>
                <PractitionerDetail />
              </Tab>
            </Tabs>

          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}


PractitionersPage.propTypes = {
  hasUser: React.PropTypes.object,
};
ReactMixin(PractitionersPage.prototype, ReactMeteorData);
