// import './style';

import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Button from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Table from 'react-toolbox/lib/table';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';

const UserModel = {
  name: {type: String},
  twitter: {type: String},
  birthdate: {type: Date},
  cats: {type: Number},
  dogs: {type: Number},
  active: {type: Boolean}
};

const users = [
  {name: 'Javi Jimenez', twitter: '@soyjavi', birthdate: new Date(1980, 3, 11), cats: 1},
  {name: 'Javi Velasco', twitter: '@javivelasco', birthdate: new Date(1987, 1, 1), dogs: 1, active: true}
];



TodoListCard = React.createClass({
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
      }
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
  },
  handleCheckboxChange() {
    this.data.state.checkbox = !this.data.state.checkbox;
  },
  render () {
    return(
     <Card style={this.data.style}>
       <List selectable ripple>
          <ListSubHeader caption='Task List' />
          <ListCheckbox
            caption='Notify new comics'
            checked={this.data.state.checkbox}
            legend='You will receive a notification when a new one is published'
            onChange={this.handleCheckboxChange}
          />
          <ListCheckbox
            caption='Notify new comics'
            checked={this.data.state.checkbox}
            legend='You will receive a notification when a new one is published'
            onChange={this.handleCheckboxChange}
          />
          <ListCheckbox
            caption='Notify new comics'
            checked={this.data.state.checkbox}
            legend='You will receive a notification when a new one is published'
            onChange={this.handleCheckboxChange}
          />
          <ListDivider />
          <ListItem caption='Remove this list' leftIcon='delete' />
        </List>

     </Card>
    );
  }
});

export default TodoListCard;
