import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {Tab, Tabs} from 'react-toolbox/lib/tabs';
import UserTable from './UserTable';
import PatientTable from './PatientTable';
// import './style';


const dummyText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';



let defaultState = {
  index: 1,
  name: "",
  description: "",
  address: "",
  city: "",
  zip: ""
}
Session.setDefault('tabbedCardState', defaultState);



TabbedCard = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      state: defaultState
    }

    if (Session.get('tabbedCardState')) {
      data.state = Session.get('tabbedCardState');
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
  handleTabChange(index){
    let state = Session.get('tabbedCardState');
    state["index"] = index;
    Session.set('tabbedCardState', state);

    //this.setState({index});
  },
  handleSaveButton(){
    console.log("handleSaveButton");

  },
  handleCancelButton(){
    console.log("handleCancelButton");

  },
  render () {
    //console.log("TabbedCard[this.data]", this.data);

    return(
     <Card style={this.data.style}>
       <Tabs default index={this.data.state.index} onChange={this.handleTabChange}>
        <Tab label='Data Input' style={{padded: "20px"}}>
          <Input type='text' label='Name' name='name' value={this.data.state.name} />
          <Input type='text' label='Description' name='description' value={this.data.state.description} />
          <Input type='text' label='Address' name='address' value={this.data.state.address} />
          <Input type='text' label='City' name='city' value={this.data.state.city} />
          <Input type='text' label='Zip' name='zip' value={this.data.state.zip} />
          <CardActions>
            <Button label="Save" onClick={this.handleSaveButton} />
            <Button label="Clear" onClick={this.handleCancelButton} />
          </CardActions>
        </Tab>
        <Tab label='Users' onActive={this.handleActive}>
          <UserTable />
        </Tab>
        <Tab label='Patients'>
          <PatientTable />
        </Tab>
      </Tabs>

     </Card>
    );
  }
});

export default TabbedCard;
