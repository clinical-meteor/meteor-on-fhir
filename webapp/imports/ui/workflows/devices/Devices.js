// import React from 'react';
// import { Row, Col, ListGroupItem, FormControl, Button } from 'react-bootstrap';
// import { Bert } from 'meteor/themeteorchef:bert';
// import { updateDevice, removeDevice } from '../../../api/devices/methods.js';
//
// import { GlassCard } from '/imports/ui/components/GlassCard';
// import { Card, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';
//
//
// const handleUpdateDevice = (deviceId, event) => {
//   const title = event.target.value.trim();
//   if (title !== '' && event.keyCode === 13) {
//     updateDevice.call({
//       _id: deviceId,
//       update: { title }
//     }, (error) => {
//       if (error) {
//         Bert.alert(error.reason, 'danger');
//       } else {
//         Bert.alert('Device updated!', 'success');
//       }
//     });
//   }
// };
//
// const handleRemoveDevice = (documentId, event) => {
//   event.preventDefault();
//   // this should be replaced with a styled solution so for now we will
//   // disable the eslint `no-alert`
//   // eslint-disable-next-line no-alert
//   if (confirm('Are you sure? This is permanent.')) {
//     removeDevice.call({
//       _id: documentId
//     }, (error) => {
//       if (error) {
//         Bert.alert(error.reason, 'danger');
//       } else {
//         Bert.alert('Device removed!', 'success');
//       }
//     });
//   }
// };
//
// export const Device = ({ device }) => (
//   <ListGroupItem key={ device._id }>
//     <Row>
//       <Col xs={ 8 } sm={ 10 }>
//         <FormControl
//           type="text"
//           standalone
//           defaultValue={ device.title }
//           onKeyUp={ handleUpdateDevice.bind(this, device._id) }
//         />
//       </Col>
//       <Col xs={ 4 } sm={ 2 }>
//         <Button
//           bsStyle="danger"
//           className="btn-block"
//           onClick={ handleRemoveDevice.bind(this, device._id) }>
//           Remove
//         </Button>
//       </Col>
//     </Row>
//   </ListGroupItem>
// );
