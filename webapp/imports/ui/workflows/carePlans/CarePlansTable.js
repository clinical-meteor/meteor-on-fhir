import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

// import AppBar from 'react-toolbox/lib/app_bar';
// import Button from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

// import { Meteor } from 'meteor/meteor';
// import { Accounts } from 'meteor/accounts-base';


import { Table } from 'react-bootstrap';


export default class CarePlansTable extends React.Component {

  getMeteorData() {

    // default query is scoped to the logged in user
    let carePlanQuery = {'subject.reference': Meteor.userId()};
    if (Meteor.user() && Meteor.user().roles && Meteor.user().roles[0] && (Meteor.user().roles[0] === "practitioner")) {
      // practitioner query is open ended and returns everybody
      carePlanQuery = {};
    }


    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      careplans: CarePlans.find(carePlanQuery).map(function(plan){
      // careplans: CarePlans.find({'subject.reference': Meteor.userId}).map(function(plan){
        // todo: replace tertiary logic
        let result = {
          _id: plan._id,
          subject: '',
          author: '',
          template: '',
          am: '',
          pm: '',
          activities: '',
          goals: '',
          createdAt: ''
        };

        if (plan.template) {
          result.template = plan.template.toString();
        }
        if (plan.subject && plan.subject.display) {
          result.subject = plan.subject.display;
        }
        if (plan.author && plan.author[0] && plan.author[0].display) {
          result.author = plan.author[0].display;
        }
        if (plan.createdAt) {
          result.createdAt = moment(plan.createdAt).format("YYYY-MM-DD hh:mm a");
        }
        if (plan.activity) {
          result.activities = plan.activity.length;
        }
        if (plan.goal) {
          result.goals = plan.goal.length;
        }

        return result;
      })
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

    if(process.env.NODE_ENV === "test") console.log("data", data);


    return data;
  }

  handleChange(row, key, value) {
    const source = this.state.source;
    source[row][key] = value;
    this.setState({source});
  }

  handleSelect(selected) {
    this.setState({selected});
  }
  getDate(){
    return "YYYY/MM/DD";
  }
  noChange(){
    return "";
  }
  rowClick(id){
    // set the user
    Session.set("selectedCarePlan", id);

    // set which tab is selected
    let state = Session.get('patientCardState');
    state["index"] = 2;
    Session.set('patientCardState', state);
  }
  renderBarcode(i){
    if (this.props.showBarcode) {
      return (
        <td><span className="barcode">{this.data.careplans[i]._id}</span></td>
      );
    }
  }
  renderBarcodeHeader(){
    if (this.props.showBarcode) {
      return (<th>id</th>);
    }
  }
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.careplans.length; i++) {
      tableRows.push(
        <tr key={i} className="patientRow" style={{cursor: "pointer"}} onClick={ this.rowClick.bind('this', this.data.careplans[i]._id)} >

          <td>{this.data.careplans[i].subject }</td>
          <td>{this.data.careplans[i].author }</td>
          <td>{this.data.careplans[i].am}</td>
          <td>{this.data.careplans[i].pm}</td>
          <td>{this.data.careplans[i].activities}</td>
          <td>{this.data.careplans[i].goals}</td>
          <td>{this.data.careplans[i].createdAt }</td>
          <td>{this.data.careplans[i].template}</td>
          {this.renderAvatarHeader}
        </tr>
      );
    }


    return(
      <Table responses hover >
        <thead>
          <tr>
            <th>subject</th>
            <th>author</th>
            <th>am</th>
            <th>pm</th>
            <th>activities</th>
            <th>goals</th>
            <th>created at</th>
            <th>template</th>
            {this.renderBarcodeHeader}
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>

    );
  }
}


CarePlansTable.propTypes = {};
ReactMixin(CarePlansTable.prototype, ReactMeteorData);
