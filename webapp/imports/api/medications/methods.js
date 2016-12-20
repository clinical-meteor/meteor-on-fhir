// import { Medications, FooSchema } from '/imports/api/medications/medications';
import { Medications, MedicationSchema } from 'meteor/clinical:hl7-resource-medication';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertMedication = new ValidatedMethod({
  name: 'medications.insert',
  // validate: null,
  validate: MedicationSchema.validator(),
  run(medication) {
    if(process.env.NODE_ENV === "test") console.log("medication", medication);


    return Medications.insert(medication, function(error){
      if (error) {
        if(process.env.NODE_ENV === "test") console.log("Medications.insert[error]", error);
      }
    });
  }
});

export const updateMedication = new ValidatedMethod({
  name: 'medications.update',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    medicationUpdate: {
      type: MedicationSchema,
      optional: true,
      blackbox: true
    }
  }).validator(),
  run({ _id, medicationUpdate }) {

    if(process.env.NODE_ENV === "test") console.log("medicationUpdate", medicationUpdate);


    // we're going to map the breathalyzer data onto a FHIR Medication resource
    let updatedMedication = {
      resourceType: 'Medication',
      code: {
        text: medicationUpdate.code.text
      },
      isBrand: true,
      manufacturer: {
        display: medicationUpdate.manufacturer.display,
        reference: ''
      },
      product: {
        form: {
          text: medicationUpdate.product.form.text
        },
        ingredient: medicationUpdate.product.ingredient
      }
    };
    Medications.update(_id, { $set: updatedMedication }, function(error){
      if (error) {
        if(process.env.NODE_ENV === "test") console.log("Medications.update[error]", error);
      }
    });
  }
});

export const removeMedication = new ValidatedMethod({
  name: 'medications.remove',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    Medications.remove(_id);
  }
});
