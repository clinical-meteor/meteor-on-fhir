// import React from 'react';
// import ReactMixin from 'react-mixin';
//
// import { GlassCard } from '/imports/ui/components/GlassCard';
// import { ReactMeteorData } from 'meteor/react-meteor-data';
//
// import { CardTitle, CardText, CardActions } from 'material-ui/Card';
// import RaisedButton from 'material-ui/RaisedButton';
//
// import { removeDevice } from '/imports/api/devices/methods.js';
// import { DynamicSpacer } from '/imports/ui/components/DynamicSpacer';
//
// import { Meteor } from 'meteor/meteor';
// import { Bert } from 'meteor/themeteorchef:bert';
//
// export default class DevicesDeck extends React.Component {
//   getMeteorData() {
//
//     // this should all be handled by props
//     // or a mixin!
//     let data = {
//       style: {
//         opacity: Session.get('globalOpacity')
//       },
//       state: {
//         checkbox: false
//       },
//       devices: []
//     };
//
//     if (Session.get('darkroomEnabled')) {
//       data.style.color = 'black';
//       data.style.background = 'white';
//     } else {
//       data.style.color = 'white';
//       data.style.background = 'black';
//     }
//
//     // this could be another mixin
//     if (Session.get('glassBlurEnabled')) {
//       data.style.filter = 'blur(3px)';
//       data.style.webkitFilter = 'blur(3px)';
//     }
//
//     // this could be another mixin
//     if (Session.get('backgroundBlurEnabled')) {
//       data.style.backdropFilter = 'blur(5px)';
//     }
//
//     if (this.props.userId) {
//       if (Devices.find({'createdBy.reference': this.props.userId}).count() > 0) {
//         data.devices = Devices.find({'createdBy.reference': this.props.userId},{sort: {createdAt: -1}}).fetch();
//       }
//     } else {
//       if (Devices.find({'createdBy.reference': Meteor.userId()}).count() > 0) {
//         data.devices = Devices.find({'createdBy.reference': Meteor.userId()},{sort: {createdAt: -1}}).fetch();
//       }
//     }
//
//     //console.log('data.devices', data.devices);
//
//     return data;
//   }
//
//   render () {
//     let self = this;
//
//     if (! this.data.devices || this.data.devices.length==0) {
// 	return (
// 		<div className="devicessDeck">
// 		<CardText>
// 		This patient has no devices.
// 		</CardText>
// 		</div>
// 		);
//     } else {
// 	return(
// 	       <div className='devicesDeck'>
// 		   {this.data.devices.map(function(item, i){
// 			       let createdAt = '';
// 			       let createdBy = '';
// 			       let createdByAvatar = '/thumbnail-blank.png';
//
// 			       if (item.createdAt) {
// 				   createdAt = moment(item.createdAt).format('YYYY, MMMM Do (dddd) hh:mm a');
// 			       }
// 			       if (item.createdBy && item.createdBy.display) {
// 				   createdBy = item.createdBy.display;
// 			       }
// 			       if (item.createdBy && item.createdBy.avatar) {
// 				   createdByAvatar = item.createdBy.avatar;
// 			       }
//
// 			       return (
// 				       <div className='deviceCard' key={i}>
// 				       <GlassCard>
// 				       <CardTitle
// 				       avatar={createdByAvatar}
// 				       title={createdBy}
// 				       subtitle={createdAt}
// 				       />
// 				       <CardText className="deviceName">
// 					   { item.deviceName }
// 				       </CardText>
// 				       <CardText className="deviceProductId">
// 					   { item.deviceProductId }
// 				       </CardText>
// 				       <CardText className="patientId">
// 					   { item.patientId }
// 				       </CardText>
// 					   { self.renderCardActions(i, item) }
// 				       </GlassCard>
// 				       <DynamicSpacer />
// 				       </div>
// 				       );
// 			   })}
// 	      </div>
// 	    );
//     }
//   }
//
//
//   handleDeleteButton(index, device){
//     if(process.env.NODE_ENV === "test") console.log('handleDeleteButton');
//
//     removeDevice.call({
//       _id: device._id
//     }, (error) => {
//       if (error) {
//         Bert.alert(error.reason, 'danger');
//       } else {
//         Bert.alert('Device removed!', 'success');
//       }
//     });
//   }
//
//   renderCardActions(i, item){
//
//     if (item && item.createdBy && item.createdBy.reference) {
//       if (item.createdBy.reference === Meteor.userId()) {
//         return (
//           <CardActions>
//             <RaisedButton className='deleteButton' primary=true} onMouseUp={this.handleDeleteButton.bind(self, i, item)} label='Delete' style={{color: 'lightgray'}} />
//           </CardActions>
//         );
//       }
//     }
//   }
//
// }
//
//
// DevicesDeck.propTypes = {};
// DevicesDeck.defaultProps = {};
// ReactMixin(DevicesDeck.prototype, ReactMeteorData);
