import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardText, CardActions } from 'material-ui/Card';

import {Tabs, Tab} from 'material-ui/Tabs';
import { UserTable } from '/imports/ui/workflows/users/UserTable';


let userCardTabbedState = {
  index: 0,
  id: "",
  username: "",
  email: "",
  given: "",
  family: ""
};
Session.setDefault('userCardTabbedState', userCardTabbedState);



export class UsersPage extends React.Component {
  getMeteorData() {
    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      state: userCardTabbedState
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
  }

  handleSaveButton(){

  }

  // this could be a mixin
  handleTabChange(index){
    let state = Session.get('userCardTabbedState');
    state["index"] = index;
    Session.set('userCardTabbedState', state);
  }

  // this could be a mixin
  changeState(field, event, value){
    let state = Session.get('userCardTabbedState');
    state[field] = value;
    Session.set('userCardTabbedState', state);
  }

  render() {
    return (
      <div id="usersPage">
        <VerticalCanvas>
          <GlassCard>

            <Tabs default index={this.data.state.index} onChange={this.handleTabChange}>
             <Tab label='Users' onActive={this.handleActive} style={{backgroundColor: 'white', color: 'black', borderBottom: '1px solid lightgray'}}>
               <UserTable />
             </Tab>
             <Tab label='New' style={{padded: "20px", backgroundColor: 'white', color: 'black', borderBottom: '1px solid lightgray'}}>
               <CardText>
                 <TextField
                   id='userIdInput'
                   ref='id'
                   name='id'
                   type='text'
                   floatingLabelText='id'
                   value={this.data.state.id}
                   onChange={ this.changeState.bind(this, 'id')}
                   /><br/>
                 <TextField
                   id='userUsernameInput'
                   ref='username'
                   name='username'
                   type='text'
                   floatingLabelText='username'
                   value={this.data.state.username}
                   onChange={ this.changeState.bind(this, 'username')}
                   /><br/>
                 <TextField
                   id='userEmailInput'
                   ref='email'
                   name='email'
                   type='text'
                   floatingLabelText='email'
                   value={this.data.state.email}
                   onChange={ this.changeState.bind(this, 'email')}
                   /><br/>
                 <TextField
                   id='userFamilyInput'
                   ref='family'
                   name='family'
                   type='text'
                   floatingLabelText='family'
                   value={this.data.state.family}
                   onChange={ this.changeState.bind(this, 'family')}
                   /><br/>
                 <TextField
                   id='userGivenInput'
                   ref='given'
                   name='given'
                   type='text'
                   floatingLabelText='given'
                   value={this.data.state.given}
                   onChange={ this.changeState.bind(this, 'given')}
                   /><br/>
               </CardText>
               <CardActions>
                 <RaisedButton label="Save" primary={true} onClick={this.handleSaveButton} />
                 <RaisedButton label="Clear" onClick={this.handleCancelButton} />
               </CardActions>
             </Tab>
           </Tabs>

          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}


UsersPage.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(UsersPage.prototype, ReactMeteorData);
