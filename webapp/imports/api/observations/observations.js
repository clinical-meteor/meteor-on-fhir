import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import {
  IdentifierSchema,
  Code,
  CodeableConceptSchema,
  ReferenceSchema,
  PeriodSchema,
  QuantitySchema,
  RangeSchema,
  RatioSchema,
  AttachmentSchema,
  SampledDataSchema
 } from 'meteor/clinical:hl7-resource-datatypes';


export const BreathalyzerSchema = new SimpleSchema({
  observationType: {
    type: String,
    label: 'The type of observation.'
  },
  observationValue: {
    type: Number,
    label: 'The value of the observation.',
    decimal: true
  },
  observationUnits: {
    type: String,
    label: 'The units of the observation.'
  },
  observationStatus: {
    type: String,
    label: 'The status of the observation.'
  },
  observationSource: {
    type: String,
    label: 'The source of the observation.'
  },
  createdAt: {
    type: Date,
    label: 'Date of the observation.'
  },
  createdBy: {
    type: String,
    label: 'Creator of the observation.'
  },
  patientId: {
    type: String,
    label: 'Patient ID of the observation.'
  }
});

export const Observations = new Mongo.Collection('Observations');
Observations.schema = new SimpleSchema({
  'resourceType' : {
    type: String,
    defaultValue: 'Observation'
  },
  'identifier' : {
    optional: true,
    type: [IdentifierSchema]
  }, // Id for external references to this report
  'status' : {
    optional: true,
    type: Code
  }, // R!  registered | partial | final | corrected | appended | cancelled | entered-in-error
  'category' : {
    optional: true,
    type: CodeableConceptSchema
  }, // Service category
  'code' : {
    optional: true,
    type: CodeableConceptSchema
  }, // R!  Name/Code for this diagnostic report
  'subject' : {
    optional: true,
    type: ReferenceSchema
  }, // R!  The subject of the report, usually, but not always, the patient
  'encounter' : {
    optional: true,
    type: ReferenceSchema
  }, // Health care event when test ordered
  'effectiveDateTime' : {
    optional: true,
    type: Date
  },
  'effectivePeriod' : {
    optional: true,
    type: PeriodSchema
  },
  'issued' : {
    optional: true,
    type: Date
  }, // R!  DateTime this version was released
  'performer' : {
    optional: true,
    type: ReferenceSchema
  }, // R!  Responsible Diagnostic Service

  'valueQuantity' : {
    optional: true,
    type: QuantitySchema
  },
  'valueCodeableConcept' : {
    optional: true,
    type: CodeableConceptSchema
  },
  'valueString' : {
    optional: true,
    type: String
  },
  'valueRange' : {
    optional: true,
    type: RangeSchema
  },
  'valueRatio' : {
    optional: true,
    type: RatioSchema
  },
  'valueSampledData' : {
    optional: true,
    type: SampledDataSchema
  },
  'valueAttachment' : {
    optional: true,
    type: AttachmentSchema
  },
  'valueTime' : {
    optional: true,
    type: Date
  },
  'valueDateTime' : {
    optional: true,
    type: Date
  },
  'valuePeriod' : {
    optional: true,
    type: PeriodSchema
  },
  'dataAbsentReason' : {
    optional: true,
    type: CodeableConceptSchema
  }, // C? Why the result is missing
  'interpretation' : {
    optional: true,
    type: CodeableConceptSchema
  }, // High, low, normal, etc.
  'comments' : {
    optional: true,
    type: String
  }, // Comments about result
  'bodySite' : {
    optional: true,
    type: CodeableConceptSchema
  }, // Observed body part
  'method' : {
    optional: true,
    type: CodeableConceptSchema
  }, // How it was done
  'specimen' : {
    optional: true,
    type: ReferenceSchema
  }, // Specimen used for this observation
  'device' : {
    optional: true,
    type: ReferenceSchema
  }, // (Measurement) Device

  'referenceRange.$.low' : {
    optional: true,
    type: QuantitySchema
  }, // C? Low Range, if relevant
  'referenceRange.$.high' : {
    optional: true,
    type: QuantitySchema
  }, // C? High Range, if relevant
  'referenceRange.$.meaning' : {
    optional: true,
    type: CodeableConceptSchema
  }, // Indicates the meaning/use of this range of this range
  'referenceRange.$.age' : {
    optional: true,
    type: RangeSchema
  }, // Applicable age range, if relevant
  'referenceRange.$.text' : {
    optional: true,
    type: String
  }, // Text based reference range in an observation

  'related.$.type' : {
    optional: true,
    type: Code
  }, // has-member | derived-from | sequel-to | replaces | qualified-by | interfered-by
  'related.$.target' : {
    optional: true,
    type: ReferenceSchema
  }, // R!  Resource that is related to this one

  'component.$.code' : {
    optional: true,
    type: CodeableConceptSchema
  }, // C? R!  Type of component observation (code / type)
  'component.$.valueQuantity' : {
    optional: true,
    type: QuantitySchema
  },
  'component.$.valueCodeableConcept' : {
    optional: true,
    type: CodeableConceptSchema
  },
  'component.$.valueString' : {
    optional: true,
    type: String
  },
  'component.$.valueRange' : {
    optional: true,
    type: RangeSchema
  },
  'component.$.valueRatio' : {
    optional: true,
    type: RatioSchema
  },
  'component.$.valueSampledData' : {
    optional: true,
    type: SampledDataSchema
  },
  'component.$.valueAttachment' : {
    optional: true,
    type: AttachmentSchema
  },
  'component.$.valueTime' : {
    optional: true,
    type: Date
  },
  'component.$.valueDateTime' : {
    optional: true,
    type: Date
  },
  'component.$.valuePeriod' : {
    optional: true,
    type: PeriodSchema
  },
  'component.$.dataAbsentReason' : {
    optional: true,
    type: CodeableConceptSchema
  }

});

Observations.attachSchema(Observations.schema);

Factory.define('observation', Observations, {
  resourceType: 'Obesrvation',
  comments: 'lorem ipsum...',
  category: {
    text: 'Test'
  },
  valueQuantity: {
    value: 0
  }
});
