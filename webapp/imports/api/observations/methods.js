import { Observations, BreathalyzerSchema } from '/imports/api/observations/observations';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const newBreathalyzerObservation = new ValidatedMethod({
  name: 'observations.insert',
  validate: new SimpleSchema({
    value: {
      optional: true,
      type: Number,
      decimal: true
    },
    status: {
      optional: true,
      type: String
    },
    device: {
      optional: true,
      type: String
    },
    effectiveDateTime: {
      optional: true,
      type: Date
    },
    'subject.reference': {
      type: String,
      optional: true
    },
    'subject.display': {
      type: String,
      optional: true
    },
    'performer.reference': {
      type: String,
      optional: true
    },
    'performer.display': {
      type: String,
      optional: true
    }
  }).validator(),
  run(breathalyzerData) {

    // we're going to map the breathalyzer data onto a FHIR Observation resource
    let newObservation = {
      resourceType: 'Observation',
      status: 'final',
      category: {
        text: 'Breathalyzer'
      },
      effectiveDateTime: null,
      subject: {
        display: '',
        reference: ''
      },
      performer: {
        display: '',
        reference: ''
      },
      device: {
        display: 'Breathalyzer',
        reference: ''
      },
      valueQuantity: {
        value: 0,
        unit: '%',
        system: 'http://unitsofmeasure.org'
      }
    };

    if (breathalyzerData.effectiveDateTime) {
      newObservation.effectiveDateTime = breathalyzerData.effectiveDateTime;
    }
    if (breathalyzerData.subject && breathalyzerData.subject.display) {
      newObservation.subject.display = breathalyzerData.subject.display;
    }
    if (breathalyzerData.subject && breathalyzerData.subject.reference) {
      newObservation.subject.reference = breathalyzerData.subject.reference;
    }
    if (breathalyzerData.performer && breathalyzerData.performer.display) {
      newObservation.performer.display = breathalyzerData.performer.display;
    }
    if (breathalyzerData.performer && breathalyzerData.performer.reference) {
      newObservation.performer.reference = breathalyzerData.performer.reference;
    }
    if (breathalyzerData.value) {
      newObservation.valueQuantity.value = breathalyzerData.value;
    }
    // if (breathalyzerData && breathalyzerData.observationValue) {
    //   newObservation.valueQuantity.value = breathalyzerData.observationValue;
    // }
    // if (breathalyzerData && breathalyzerData.observationType) {
    //   newObservation.category.text = breathalyzerData.observationType;
    // }

    //Observations.schema.validate(newObservation);

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
    'breathalyzerUpdate.observationType': { type: String, optional: true },
    'breathalyzerUpdate.observationValue': { type: Number, optional: true, decimal: true },
    'breathalyzerUpdate.observationUnits': { type: String, optional: true },
    'breathalyzerUpdate.observationStatus': { type: String, optional: true },
    'breathalyzerUpdate.observationSource': { type: String, optional: true },
    'breathalyzerUpdate.patientId': { type: String, optional: true }
  }).validator(),
  run({ _id, breathalyzerUpdate }) {

    // we're going to map the breathalyzer data onto a FHIR Observation resource
    let updatedObservation = {
      resourceType: 'Observation',
      status: 'final',
      category: {
        text: breathalyzerUpdate.observationType
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
        display: 'Breathalyzer',
        reference: ''
      },
      valueQuantity: {
        value: breathalyzerUpdate.observationValue,
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
