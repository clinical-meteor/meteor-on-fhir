import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';

import { PageContainer } from '/imports/ui/components/PageContainer';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardText, CardActions } from 'material-ui/Card';

import {Tab, Tabs} from 'react-toolbox/lib/tabs';
import { UserTable } from '../workflows/users/UserTable';


let defaultState = {
  index: 0,
  id: "",
  username: "",
  email: "",
  given: "",
  family: ""
};
Session.setDefault('userCardTabbedState', defaultState);



export class UsersPage extends React.Component {
  getMeteorData() {
    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      state: defaultState
    };

    if (Session.get('userCardTabbedState')) {
      data.state = Session.get('userCardTabbedState');
    }

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
    let state = Session.get('userCardTabbedState');
    state["index"] = index;
    Session.set('userCardTabbedState', state);
  };
  // this could be a mixin
  changeState(field){
    let state = Session.get('myProfileState');
    state[field] = this.refs[field].refs.input.value;
    Session.set('myProfileState', state);
  };

  render() {
    return (
      <div id="usersPage">
        <PageContainer>
          <GlassCard>

            <Tabs default index={this.data.state.index} onChange={this.handleTabChange}>
             <Tab label='Users' onActive={this.handleActive}>
               <UserTable />
             </Tab>
             <Tab label='New' style={{padded: "20px"}}>
               <CardText>
                  <Input disabled type='text' label='id' name='id' value={this.data.state.id} onChange={ this.changeState.bind(this, 'id')} />
                  <Input type='text' label='username' name='username' value={this.data.state.username} onChange={ this.changeState.bind(this, 'username')} />
                  <Input type='text' label='email' name='email' value={this.data.state.email} onChange={ this.changeState.bind(this, 'email')} />
                  <Input type='text' label='given name' name='given' value={this.data.state.given} onChange={ this.changeState.bind(this, 'given')} />
                  <Input type='text' label='family name' name='family' value={this.data.state.family} onChange={ this.changeState.bind(this, 'family')} />
               </CardText>
               <CardActions>
                 <Button label="Save" onClick={this.handleSaveButton} />
                 <Button label="Clear" onClick={this.handleCancelButton} />
               </CardActions>
             </Tab>
           </Tabs>

          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}


UsersPage.propTypes = {
  hasUser: React.PropTypes.object,
};
ReactMixin(UsersPage.prototype, ReactMeteorData);
