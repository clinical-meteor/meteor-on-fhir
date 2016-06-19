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
import PatientTable from '../workflows/patients/PatientTable';

import DatePicker from 'react-toolbox/lib/date_picker';


let defaultState = {
  index: 1,
  id: "",
  username: "",
  email: "",
  given: "",
  family: "",
  gender: ""

}
Session.setDefault('patientCardState', defaultState);

export class PatientsPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      state: defaultState
    }

    if (Session.get('patientCardState')) {
      data.state = Session.get('patientCardState');
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

    return data;
  };
  // this could be a mixin
  handleTabChange(index){
    let state = Session.get('patientCardState');
    state["index"] = index;
    Session.set('patientCardState', state);
  };
  // this could be a mixin
  changeState(field, value){
    let state = Session.get('patientCardState');
    console.log("this", this);
    console.log("value", value);

    state[field] = value;
    Session.set('patientCardState', state);
  };
  render() {
    return (
      <div id="documentsPage">
        <PageContainer>
          <GlassCard>
            <CardTitle
              title="Patients"
            />
            <CardText>

            <Tabs default index={this.data.state.index} onChange={this.handleTabChange}>
             <Tab label='Patients' onActive={this.handleActive}>
               <PatientTable />
             </Tab>
             <Tab label='New' style={{padded: "20px"}}>
               <CardText>
                  <Input ref="username" type='text' label='username' name='username' value={this.data.state.username} onChange={ this.changeState.bind(this, 'username')} />
                  <Input ref="email" type='text' label='email' name='email' value={this.data.state.email} onChange={ this.changeState.bind(this, 'email')} />
                  <Input ref="given" type='text' label='given name' name='given' value={this.data.state.given} onChange={ this.changeState.bind(this, 'given')} />
                  <Input ref="family" type='text' label='family name' name='family' value={this.data.state.family} onChange={ this.changeState.bind(this, 'family')} />
                  <Input ref="gender" type='text' label='gender' name='gender' value={this.data.state.family} onChange={ this.changeState.bind(this, 'family')} />
                  <DatePicker ref="birthdate" label='birthdate' name='birthdate' onChange={this.changeState.bind(this, 'birthdate')} value={this.data.state.birthdate} />
               </CardText>
               <CardActions>
                 <Button label="Save" onClick={this.handleSaveButton} />
                 <Button label="Clear" onClick={this.handleCancelButton} />
               </CardActions>
             </Tab>
           </Tabs>



            </CardText>
          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}


PatientsPage.propTypes = {
  hasUser: React.PropTypes.object,
};
ReactMixin(PatientsPage.prototype, ReactMeteorData);
