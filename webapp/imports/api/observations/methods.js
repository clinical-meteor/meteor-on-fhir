// import { Observations } from '/imports/api/observations/observations';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const createObservation = new ValidatedMethod({
  name: 'observations.insert',
  validate: ObservationSchema.validator(),
  run(observationData) {

    console.log("createObservation", observationData);


    return Observations.insert(newObservation, function(error){
      if (error) {
        if(process.env.NODE_ENV === "test") console.log("Observations.insert[error]", error);
      }
    });
  }
});

export const updateObservation = new ValidatedMethod({
  name: 'observations.update',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
  }).validator(),
  run({ _id, breathalyzerUpdate }) {

    // we're going to map the breathalyzer data onto a FHIR Observation resource
    let updatedObservation = {
      resourceType: 'Observation',
      status: 'final',
      category: {
        text: ''
      },
      effectiveDateTime: new Date(),
      subject: {
        display: '',
        reference: ''
      },
      performer: {
        display: '',
        reference: ''
      },
      device: {
        display: '',
        reference: ''
      },
      valueQuantity: {
        value: '',
        unit: '%',
        system: 'http://unitsofmeasure.org'
      }
    };
    Observations.update(_id, { $set: updatedObservation });
  }
});

export const removeObservation = new ValidatedMethod({
  name: 'observations.remove',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    Observations.remove(_id);
  }
});
