import { Devices } from '/imports/api/devices/devices';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertDevice = new ValidatedMethod({
  name: 'devices.insert',
  validate: new SimpleSchema({
    type: { type: String, optional: true },
    identifier: { type: String, optional: true },
    createdAt: { type: Date, optional: true },
    patientId: { type: String, optional: true }
  }).validator(),
  run(deviceFormData) {

    // we convert our form data into a FHIR Device object
    var newDevice = {
      'resourceType' : 'Device',
      'identifier' : [{
        'value': deviceFormData.identifier,
        type: {
          text: 'Serial Number'
        }
      }],
      'type' : {
        text: deviceFormData.type
      },
      'note' : [],
      'status' : 'available',
      'manufacturer' : 'BACtrack',
      'model' : 'Mobile Breathalyzer',
      'version' : 'BT-M5',
      'udi' : 'S8B-BTBLE40',
      'patient' : {
        display:  '',
        reference: ''
      }
    };

    // if we can look up the Patient info; now is the time to perform a JOIN
    // and attach that kind of data
    if (deviceFormData.patientId) {
      let patient = Patients.findOne(deviceFormData.patientId);
      if (patient) {
        newDevice.patient.display = patient.name.text;
        newDevice.patient.display = 'Patients/' + patient._id;
      }
    }

    return Devices.insert(newDevice);
  }
});

export const updateDevice = new ValidatedMethod({
  name: 'devices.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update.type': { type: String, optional: true },
    'update.identifier': { type: String, optional: true }
  }).validator(),
  run({ _id, update }) {
    if(process.env.NODE_ENV === "test") console.log("update", update);


    // TODO: need to confirm that this works
    // should we replace the entire record, or just the changed fields?

    // we convert our form data into a FHIR Device object
    var deviceUpdate = {
      'resourceType' : 'Device',
      'identifier' : [{
        value: update.identifier,
        type: {
          text: 'Serial Number'
        }
      }],
      'type' : {
        text: update.type
      },
      'note' : [],
      'status' : 'available',
      'manufacturer' : 'BACtrack',
      'model' : 'Mobile Breathalyzer',
      'version' : 'BT-M5',
      'udi' : 'S8B-BTBLE40',
      'patient' : {
        display:  '',
        reference: ''
      }
    };

    // if we can look up the Patient info; now is the time to perform a JOIN
    // and attach that kind of data
    if (update.patientId) {
      let patient = Patients.findOne(update.patientId);
      if (patient) {
        deviceUpdate.patient.display = patient.name.text;
        deviceUpdate.patient.display = 'Patients/' + patient._id;
      }
    }

    Devices.update(_id, { $set: deviceUpdate });
  }
});

export const removeDevice = new ValidatedMethod({
  name: 'devices.remove',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    Devices.remove(_id);
  }
});
