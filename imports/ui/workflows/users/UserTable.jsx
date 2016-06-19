// import './style';

import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Button from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Table } from 'react-bootstrap';

// const UserModel = {
//   name: {type: String},
//   username: {type: String},
//   _id: {type: String},
//   address: {type: String}
// };





UserTable = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      users: Meteor.users.find().fetch(),
      source: Meteor.users.find().map(function(user){
        return {
          _id: user._id,
          username: user.username,
          name: user.profile.name.text,
          address: user.emails ? user.emails[0].address : ""
        }
      })
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

    //console.log("data", data);

    return data;
  },
  handleChange(row, key, value) {
    const source = this.state.source;
    source[row][key] = value;
    this.setState({source});
  },

  handleSelect(selected) {
    this.setState({selected});
  },
  getDate(){
    return "YYYY/MM/DD"
  },
  noChange(){
    return "";
  },
  render () {

    let tableRows = [];
    for (var i = 0; i < this.data.users.length; i++) {
      tableRows.push(<tr key={i}>
        <td class="barcode">{this.data.users[i]._id}</td>
        <td>{this.data.users[i].username}</td>
        <td>{this.data.users[i].fullName()}</td>
        <td>{this.data.users[i].emails ? this.data.users[i].emails[0].address : ""}</td>
        <td><i class="fa fa-star"></i></td>
        <td><i class="fa fa-remove"></i></td>
      </tr>)
    }


    return(
      <Table responses >
        <thead>
          <tr>
            <th>_id</th>
            <th>username</th>
            <th>full name</th>
            <th>email</th>
            <th>star</th>
            <th>remove</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>

    );
  }
});

export default UserTable;
