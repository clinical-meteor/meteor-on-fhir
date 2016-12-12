import React from 'react';
import ReactMixin from 'react-mixin';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { CardTitle, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import { Observations } from '/imports/api/observations/observations.js';
import { removeObservation } from '/imports/api/observations/methods.js';
import { DynamicSpacer } from '/imports/ui/components/DynamicSpacer';

import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

export default class ObservationsDeck extends React.Component {
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
      observations: []
    };

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

    if (this.props.userId) {
      if (Observations.find({'patientId.reference': this.props.userId}).count() > 0) {
        data.observations = Observations.find({'patientId.reference': this.props.userId},{sort: {createdAt: -1}}).fetch();
      }
    } else {
      if (Observations.find({'patientId.reference': Meteor.userId()}).count() > 0) {
        data.observations = Observations.find({'patientId.reference': Meteor.userId()},{sort: {createdAt: -1}}).fetch();
      }
    }

    //console.log('data.observations', data.observations);

    return data;
  }

  render () {
    let self = this;
    if (! this.data.observations || this.data.observations.length==0) {
      return (
        <div className="observatonsDeck">
          <CardText>
            This patient has no observations.
          </CardText>
        </div>
      );
    } else {
      return(
        <div className='observationsDeck'>
        {this.data.observations.map(function(item, i){
          let createdAt = '';
          let patientId = '';
          let patientIdAvatar = '/thumbnail-blank.png';

          if (item.createdAt) {
            createdAt = moment(item.createdAt).format('YYYY, MMMM Do (dddd) hh:mm a');
          }
          if (item.patientId && item.patientId.display) {
            patientId = item.patientId.display;
          }
          if (item.patientId && item.patientId.avatar) {
            patientIdAvatar = item.patientId.avatar;
          }
          return (
            <div className='observationCard' key={i}>
            <GlassCard>
            <CardTitle
              avatar={patientIdAvatar}
              title={patientId}
              subtitle={createdAt}
              />
              <CardText className="observationValue">
                { item.observationValue }
              </CardText>
              { self.renderCardActions(i, item) }
              </GlassCard>
              <DynamicSpacer />
            </div>
          );
        })}
        </div>
      );
    }
  }

  handleDeleteButton(index, observation){
    if(process.env.NODE_ENV === "test") console.log('handleDeleteButton');

    removeObservation.call({
      _id: observation._id
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Observation removed!', 'success');
      }
    });
  }

  renderCardActions(i, item){
    if (item && item.patientId && item.patientId.reference) {
      if (item.patientId.reference === Meteor.userId()) {
        return (
          <CardActions>
            <RaisedButton className='deleteButton' primary={true} onMouseUp={this.handleDeleteButton.bind(self, i, item)} label='Delete' style={{color: 'lightgray'}} />
          </CardActions>
        );
      }
    }
  }

}


ObservationsDeck.propTypes = {};
ObservationsDeck.defaultProps = {};
ReactMixin(ObservationsDeck.prototype, ReactMeteorData);
