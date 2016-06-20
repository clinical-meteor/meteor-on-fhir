import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';

import { Row, Col } from 'react-bootstrap';
import DocumentsList from '../containers/documents-list.js';
import { AddDocument } from '../components/AddDocument.js';

import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';


import {Tab, Tabs} from 'react-toolbox/lib/tabs';
import PractitionerTable from '../workflows/practitioners/PractitionerTable';
import PractitionerDetail from '../workflows/practitioners/PractitionerDetail';

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
      <div id="documentsPage">
        <PageContainer>
          <GlassCard>

            <Tabs default index={this.data.state.index} onChange={this.handleTabChange}>
             <Tab className="newPractitionerTab" label='New' style={{padded: "20px"}} onActive={ this.onNewTab } >
               <PractitionerDetail />
             </Tab>
             <Tab label='Practitioners' onActive={this.handleActive}>
               <PractitionerTable />
             </Tab>
             <Tab label='Detail' style={{padded: "20px"}}>
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
