import AvVideoCall from 'material-ui/svg-icons/av/video-call';
import Avatar from 'material-ui/Avatar';
import { Bert } from 'meteor/clinical:alert';
import CommunicationPhone from 'material-ui/svg-icons/communication/phone';
import IconButton from 'material-ui/IconButton';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';
import { removeUserById } from '/imports/api/users/methods';
import { get } from 'lodash';
import { CardHeader, CardText, CardTitle } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import Swipeable from 'react-swipeable';
import FlatButton from 'material-ui/FlatButton';

const sampleNotifications = [{
  primaryText:"Record copied",
  secondaryText:"Jan 20, 2014",                
  icon: 'ContentCopy',
  color: 'green600'
},
{
  primaryText:"Medication warning",
  secondaryText:"Jan 10, 2014",             
  icon: 'Warning',
  color: 'yellow600'
},
{
  primaryText:"New clinical note",
  secondaryText:"Jan 10, 2014",             
  icon: 'AddCircleOutline',
  color: 'green600'
},
{
  primaryText:"Archive export",
  secondaryText:"Jan 10, 2014",             
  icon: 'Archive',
  color: 'green600'
},
{
  primaryText:"Unencrypted email",
  secondaryText:"Jan 10, 2014",             
  icon: 'Mail',
  color: 'orange600'
},              
{
  primaryText:"Record copied",
  secondaryText:"Jan 10, 2014",             
  icon: 'ContentPaste',
  color: 'green600'
},              
{
  primaryText:"Record removed",
  secondaryText:"Jan 10, 2014",             
  icon: 'RemoveCircleOutline',
  color: 'green600'
},      
{
  primaryText: "Report!",
  secondaryText: "Jan 10, 2014",             
  icon: 'Report',
  color: 'red600'
},
{
  primaryText: "Report!",
  secondaryText: "Jan 10, 2014",             
  icon: 'Flag',
  color: 'orange600'
},
{
  primaryText: "Blocked!",
  secondaryText: "Jan 10, 2014",             
  icon: 'Block',
  color: 'red600'
},
{
  primaryText: "Unarchive",
  secondaryText: "Jan 10, 2014",             
  icon: 'Unarchive',
  color: 'green600'
}];

Session.setDefault('transferPatientDialogOpen', false);
Session.setDefault('outgoingPatient', {
  display: '', 
  reference: ''        
});
Session.setDefault('receivingUser', {
  display: '', 
  reference: ''        
});

export class UserTable extends React.Component {
  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      state: {
        isAdmin: false
      },
      selected: [],
      users: [],
      outgoingPatient: Session.get('outgoingPatient'),
      receivingUser: Session.get('receivingUser'),
      dialogOpen: Session.get('transferPatientDialogOpen')
    };


    let query = {};
    let options = {
      sort: {
        'profile.name.text': 1
      }
    };
    // number of items in the table should be set globally
    if (get(Meteor, 'settings.public.defaults.paginationLimit')) {
      options.limit = get(Meteor, 'settings.public.defaults.paginationLimit')
    }
    // but can be over-ridden by props being more explicit
    if(this.props.limit){
      options.limit = this.props.limit;      
    }

    data.users = Meteor.users.find(query, options).fetch();

    if (get(Meteor.user(), 'roles[0]') === 'sysadmin') {
      data.state.isAdmin = true;
    }

    if (Session.get('darkroomEnabled')) {
      data.style.color = 'black';
      data.style.background = 'white';
    } else {
      data.style.color = 'white';
      data.style.background = 'black';
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = 'blur(3px)';
      data.style.webkitFilter = 'blur(3px)';
    }

    // this could be another mixin
    if (Session.get('backgroundBlurEnabled')) {
      data.style.backdropFilter = 'blur(5px)';
    }

    return data;
  }
  handleCloseCatch(){
    Session.set('transferPatientDialogOpen', false);
  }  
  swiping(e, deltaX, deltaY, absX, absY, velocity) {
    //console.log("You're Swiping...", e, deltaX, deltaY, absX, absY, velocity)
    //alert("You're Swiping...", e, deltaX, deltaY, absX, absY, velocity)
  }
 
  swipingLeft(e, absX) {
    console.log("You're Swiping to the Left...", e, absX)
    //alert("You're Swiping to the Left...", e, absX)
  }
 
  swiped(e, deltaX, deltaY, isFlick, velocity) {
    console.log("You Swiped...", e, deltaX, deltaY, isFlick, velocity)
  }
  confirmTransfer(){
    console.log("confirmTransfer");

    var outgoingPatient = Session.get('outgoingPatient');
    var receivingUser = Session.get('receivingUser');

    Meteor.call('transferPatient', 
      outgoingPatient,
      receivingUser
    );
    Session.set('transferPatientDialogOpen', false);
  }
  swipedUp(e, deltaY, isFlick) {
    //alert("You Swiped Up...", e, deltaY, isFlick)
    console.log("You Swiped Up...", e, deltaY, isFlick)
    //this.transferPatient();

    var outgoingPatient = Session.get('outgoingPatient');
    var receivingUser = Session.get('receivingUser');

    Meteor.call('transferPatient', 
      outgoingPatient,
      receivingUser
    );
    Session.set('transferPatientDialogOpen', false);

  }
  renderAdminControls(isAdmin, i) {
    if (isAdmin) {
      return (
        <td>
          <FlatButton
            label="Remove"
            primary={true}
            onClick={ this.removeUser.bind(this, this.data.users[i]._id) }
          />
        </td>
      );
    }
  }
  renderAdminHeaders(isAdmin) {
    if (isAdmin) {
      return (
        <th>remove</th>
      );
    }
  }

  renderRowAvatarHeader(){
    if (Meteor.settings.public.defaults.avatars && !(this.props.avatars == false)) {
      return (
        <th className='avatar'>photo</th>
      );
    }
  }
  renderRowAvatar(user, avatarStyle){
    if (Meteor.settings.public.defaults.avatars && !(this.props.avatars == false)) {
      return (
        <td className='avatar'>
          {/* <img src={user.photo} style={avatarStyle}/> */}
          <Avatar src={user.profile ? user.profile.avatar : '/thumbnail-blank.png' } style={avatarStyle}/>
        </td>
      );
    }
  }


  renderDialButtonHeader(){
    if (Meteor.settings.public.defaults.avatars) {
      return (
        <th className='dial'>dial</th>
      );
    }
  }
  renderDialButton(user){
    if (Meteor.settings.public.defaults.avatars) {
      return (
        <td className='dial'>
          <CommunicationPhone onClick={this.videocallUser.bind(this, user) } style={{color: 'green'}} />
        </td>
      );
    }
  }

  onRowClick(user){
    //console.log('onRowClick', this.props.onClick)
    console.log('onRowClick.user', user)
    if(this.props.onClick){
      this.props.onClick(user);
    }
    Session.set('selectedUser', user._id)
    
  }
  videocallUser(user){
    console.log('videocallUser', user);
    Meteor.call('sendInboxMessage', user._id);
  }
  notifyUser(user){
    console.log('notifyUser', user);    
    Meteor.call('sendNotificationToUser', 
      Random.choice(sampleNotifications).primaryText,
      Random.choice(sampleNotifications).secondaryText,
      user._id    
    );
  }
  transferPatient(receivingUser){
    console.log('transferPatient()');    
    console.log('receivingUser', receivingUser);    
    Session.set('transferPatientDialogOpen', true);

    var user = new User(receivingUser);

    var user = {
      reference: receivingUser._id,
      display: user.fullName()
    }

    Session.set('receivingUser', user)

    var selectedPatient = Session.get('selectedPatient');
    console.log('selectedPatient', selectedPatient);   

    var patient = Patients.findOne({_id: Session.get('selectedPatient')});


    var patient = {
      reference: patient._id,
      display: patient.displayName()
    }
    Session.set('outgoingPatient', patient);

  }
  render () {

    let tableRows = [];
    for (var i = 0; i < this.data.users.length; i++) {
      tableRows.push(
      <tr key={i} className='userRow' style={{cursor: "pointer"}} onClick={this.onRowClick.bind(this, this.data.users[i] )} >

        { this.renderRowAvatar(this.data.users[i], this.data.style.avatar) }
        { this.renderDialButton(this.data.users[i]) }

        {/* <td onClick={this.routeToHealthlog.bind(this, this.data.users[i]._id)} style={{cursor: 'pointer'}}>/weblog/{this.data.users[i]._id}</td> */}
        {/* <td>{this.data.users[i].username}</td> */}
        <td>{this.data.users[i].fullName()}</td>
        <td>{this.data.users[i].defaultEmail()}</td>
        <td className='dial' style={{ cursor: 'pointer'}}>
          <FlatButton
            label="Notify"
            primary={true}
            onClick={ this.notifyUser.bind(this, this.data.users[i]) }
          />
          
        </td>
        <td className='transfer' style={{width: '180px', cursor: 'pointer'}}>
          <FlatButton
            label="Transfer"
            primary={true}
            onClick={ this.transferPatient.bind(this, this.data.users[i]) }
          />
          
        </td>
        { this.renderAdminControls(this.data.state.isAdmin, i) }
      </tr>);
    }

    const catchActions = [
      <FlatButton
        label="Confirm"
        primary={true}
        keyboardFocused={true}
        onClick={this.confirmTransfer}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCloseCatch}
      />
    ];

    return(
      <CardText>
        <Table >
          <thead>
            <tr>
              { this.renderRowAvatarHeader() }
              { this.renderDialButtonHeader() }

              {/* <th>weblog/_id</th> */}
              {/* <th>username</th> */}
              <th>full name</th>
              <th>email</th>
              <th>notify</th>
              <th>transfer current patient</th>
              { this.renderAdminHeaders(this.data.state.isAdmin) }
            </tr>
          </thead>
          <tbody>
            { tableRows }
          </tbody>
        </Table>
        <Dialog
            //title="Patient Transfer"
            actions={catchActions}
            modal={false}
            open={this.data.dialogOpen}
            onRequestClose={this.handleCloseCatch}
          >
          <Swipeable
              onSwiping={this.swiping}
              onSwipingLeft={this.swipingLeft}
              onSwiped={this.swiped}
              onSwipedUp={this.swipedUp} 
            >
              <CardText>
                <h6 style={{color: 'gray'}}>Receiving Practitioner</h6>
                <h2>{ get(this, 'data.receivingUser.display') }</h2>
                <h4 className='barcode'>{ get(this, 'data.receivingUser.reference') }</h4>
                <br/>
                <br/>
                <br/>
                <h6 style={{color: 'gray'}}>Patient to Transfer</h6>
                <h2>{ get(this, 'data.outgoingPatient.display') }</h2>
                <h4 className='barcode'>{ get(this, 'data.outgoingPatient.reference') }</h4>
              </CardText>
            </Swipeable>
          </Dialog>
      </CardText>

    );
  }

  handleChange(row, key, value) {
    const source = this.state.source;
    source[row][key] = value;
    this.setState({source});
  }

  handleSelect(selected) {
    this.setState({selected});
  }
  routeToHealthlog(userId){
    if(this.props.history){
      this.props.history.push('/weblog/' + userId);
    }
  }

  removeUser(userId, event){
    event.preventDefault();
    console.log("removeUser", userId);

    removeUserById.call({
      _id: userId
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('User removed!', 'success');
      }
    });
  }
}

ReactMixin(UserTable.prototype, ReactMeteorData);
