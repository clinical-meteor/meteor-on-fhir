import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { insertPost } from '/imports/api/posts/methods';
import { GlassCard } from '/imports/ui/components/GlassCard';

import RaisedButton from 'material-ui/RaisedButton';

import { Meteor } from 'meteor/meteor';

import { Row, Col, ListGroupItem, FormControl, Button } from 'react-bootstrap';


Session.setDefault('weblogPostContent', '');
export class VitalMeasurements extends React.Component {
  getMeteorData() {
    let data = {
      style: {},
      state: {
        weblogPostContent: '',
        pulse: '',
        temperature: '',
        respiration: '',
        bloodPressure: ''
      }
    };

    if (Session.get('weblogPostContent')) {
      data.state.weblogPostContent = Session.get('weblogPostContent');
    }

    return data;
  }
  render(){
    return (
      <GlassCard id="addPostCard">
        <CardText>
          <Row>
            <Col xs={6}>
              <TextField
                id='puleInput'
                ref='pulse'
                name='pulse'
                floatingLabelText="Pulse (bmp)"
                value={this.data.state.pulse}
                onChange={this.changePost.bind(this)}
                fullWidth
                /><br/>
              <TextField
                id='temperatureInput'
                ref='temperature'
                name='temperature'
                floatingLabelText="Temperature (f/c)"
                value={this.data.state.temperature}
                onChange={this.changePost.bind(this)}
                fullWidth
                /><br/>
            </Col>
            <Col xs={6}>
              <TextField
                id='respirationRate'
                ref='respiration'
                name='respiration'
                floatingLabelText="Respiration (bpm)"
                value={this.data.state.respiration}
                onChange={this.changePost.bind(this)}
                fullWidth
                /><br/>
              <TextField
                id='bloodPressureInput'
                ref='bloodPressure'
                name='bloodPressure'
                floatingLabelText="Blood Pressure (s/d))"
                value={this.data.state.bloodPressure}
                onChange={this.changePost.bind(this)}
                fullWidth
                /><br/>
            </Col>
          </Row>
          <TextField
            id='weblogPostInput'
            ref='weblogPostContent'
            name='weblogPostContent'
            floatingLabelText="New clinical impression..."
            value={this.data.state.weblogPostContent}
            onChange={this.changePost.bind(this)}
            multiLine={true}
            rows={5}
            fullWidth
            /><br/>

          <RaisedButton id="addObservationButton" onMouseUp={ this.handleInsertPost.bind(this) } primary={true} label='New Observation' />
        </CardText>
      </GlassCard>
    );
  }
  handleInsertPost(){
    let newPost = {
      title: Session.get('weblogPostContent'),
      createdAt: new Date(),
      createdBy: {
        display: Meteor.user().fullName(),
        reference: Meteor.userId()
      }
    };
    if (Meteor.user().profile && Meteor.user().profile.avatar) {
      newPost.createdBy.avatar = Meteor.user().profile.avatar;
    }

    insertPost.call(newPost, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Post added!', 'success');
        Session.set('weblogPostContent', false);
      }
    });
  }

  changePost(event, value){
    Session.set('weblogPostContent', value);
  }
}



ReactMixin(VitalMeasurements.prototype, ReactMeteorData);
