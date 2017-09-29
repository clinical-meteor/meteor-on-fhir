import AvVideoCall from 'material-ui/svg-icons/av/video-call';
import Avatar from 'material-ui/Avatar';
import { Bert } from 'meteor/themeteorchef:bert';
import CommunicationPhone from 'material-ui/svg-icons/communication/phone';
import IconButton from 'material-ui/IconButton';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { removeUserById } from '/imports/api/users/methods';

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
      users: []
    };


    let query = {};
    let options = {};
    // number of items in the table should be set globally
    if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.defaults && Meteor.settings.public.defaults.paginationLimit) {
      options.limit = Meteor.settings.public.defaults.paginationLimit;
    }
    // but can be over-ridden by props being more explicit
    if(this.props.limit){
      options.limit = this.props.limit;      
    }

    data.users = Meteor.users.find(query, options).fetch();

    if (Meteor.user() && Meteor.user().roles && (Meteor.user().roles[0] === 'sysadmin')) {
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

    //console.log("data", data);

    return data;
  }



  renderAdminControls(isAdmin, i) {
    if (isAdmin) {
      return (
        <td>
          <IconButton iconClassName="muidocs-icon-content-clear" onClick={ this.removeUser.bind(this, this.data.users[i]._id) } />
        </td>
      );
    }
  }
  renderAdminHeaders(isAdmin) {
    if (isAdmin) {
      return (
        <th>Remove</th>
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
    console.log('onRowClick', this.props.onClick)
    if(this.props.onClick){
      this.props.onClick(user);
    }
    
  }
  videocallUser(user){
    console.log('videocallUser', user);
  }

  render () {

    let tableRows = [];
    for (var i = 0; i < this.data.users.length; i++) {
      tableRows.push(
      <tr key={i} className='userRow' style={{cursor: "pointer"}} onClick={this.onRowClick.bind(this, this.data.users[i] )} >

        { this.renderRowAvatar(this.data.users[i], this.data.style.avatar) }
        { this.renderDialButton(this.data.users[i]) }

        {/* <td onClick={this.routeToHealthlog.bind(this, this.data.users[i]._id)} style={{cursor: 'pointer'}}>/weblog/{this.data.users[i]._id}</td> */}
        <td>{this.data.users[i].username}</td>
        <td>{this.data.users[i].fullName()}</td>
        <td>{this.data.users[i].emails ? this.data.users[i].emails[0].address : ''}</td>
        { this.renderAdminControls(this.data.state.isAdmin, i) }
      </tr>);
    }


    return(
      <Table responses >
        <thead>
          <tr>
            { this.renderRowAvatarHeader() }
            { this.renderDialButtonHeader() }

            {/* <th>weblog/_id</th> */}
            <th>username</th>
            <th>full name</th>
            <th>email</th>
            { this.renderAdminHeaders(this.data.state.isAdmin) }
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>

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
    browserHistory.push('/weblog/' + userId);
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
