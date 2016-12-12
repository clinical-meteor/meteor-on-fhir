// import './style';

import React from 'react';
import { Card } from 'material-ui/Card';
import { List, ListItem, ListSubHeader, ListDivider } from 'react-toolbox/lib/list';



UserListCard = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      state: {
        checkbox: false
      },
      users: []
    };

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

    if (Meteor && Meteor.users && Meteor.users.find().count() > 0) {
      data.users = Meteor.users.find().fetch();
    }


    return data;
  },
  handleCheckboxChange() {
    this.data.state.checkbox = !this.data.state.checkbox;
  },
  render () {

    let userListItems = [];
    let avatar = "";
    let caption = "";

    for (var i=0; i < this.data.users.length; i++) {
      if (this.data && this.data.users && this.data.users[i]) {
        if (this.data.users[i].photo && this.data.users[i].photo[0]) {
          avatar = this.data.users[i].photo[0].url;
        }
        if (this.data.users[i].name && this.data.users[i].name.text) {
          caption = this.data.users[i].name.text;
        }
      }

      userListItems.push(
        <ListItem
          avatar={avatar}
          caption={caption}
          legend='User'
          rightIcon='star'
          key={i}
        />);
    }


    return(
     <Card style={this.data.style}>
       <List selectable ripple>
          <ListSubHeader caption='System Users' />
          {userListItems}
          <ListSubHeader caption='Configuration' />
          <ListDivider />
          <ListItem caption='View All' leftIcon='send' />
        </List>

     </Card>
    );
  }
});

export default UserListCard;
