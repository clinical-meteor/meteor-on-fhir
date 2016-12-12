import React from 'react';
import { Card } from 'material-ui/Card';
import { List, ListItem, ListSubHeader, ListDivider } from 'react-toolbox/lib/list';


PatientMiniList = React.createClass({
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
      patients: []
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

    if (Patients && Patients.find().count() > 0) {
      data.patients = Patients.find().map(function(patient){
        let item = {
          avatar: "",
          caption: ""
        };
        if (patient && patient.photo && patient.photo[0] && patient.photo[0].url) {
          item.avatar = patient.photo[0].url;
        }
        if (patient && patient.name && patient.name[0] && patient.name[0].text) {
          item.caption = patient.name[0].text;
        }
        return item;
      });
    }


    return data;
  },
  handleCheckboxChange() {
    this.data.state.checkbox = !this.data.state.checkbox;
  },
  render () {

    let patientListItems = [];
    for (var i=0; i < this.data.patients.length; i++) {
      patientListItems.push(
        <ListItem
          avatar={this.data.patients[i].avatar}
          caption={this.data.patients[i].caption}
          legend='Physician'
          rightIcon='add'
          key={i}
        />);
    }


    return(
     <Card style={this.data.style}>
       <List selectable ripple>
          <ListSubHeader caption='Patients' />
          {patientListItems}
          <ListSubHeader caption='Configuration' />
          <ListDivider />
          <ListItem caption='Foo the publisher' leftIcon='send' />
          <ListItem caption='Faz this publication' leftIcon='delete' />
        </List>

     </Card>
    );
  }
});

export default PatientMiniList;
