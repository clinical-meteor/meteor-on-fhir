import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import {
  AnnotationSchema,
  IdentifierSchema,
  Code,
  CodeableConceptSchema,
  ReferenceSchema,
  ContactPointSchema
 } from 'meteor/clinical:hl7-resource-datatypes';

export const Devices = new Mongo.Collection('Devices');

Devices.schema = new SimpleSchema({
  'resourceType' : {
    type: String,
    defaultValue: 'Device'
  },
  'identifier' : {
    optional: true,
    type: [ IdentifierSchema ]
  }, // Instance id from manufacturer, owner, and others
  'type' : {
    optional: true,
    type: CodeableConceptSchema
  }, // R!  What kind of device this is
  'note' : {
    optional: true,
    type: [ AnnotationSchema ]
  }, // Device notes and comments
  'status' : {
    optional: true,
    type: Code
  }, // available | not-available | entered-in-error
  'manufacturer' : {
    optional: true,
    type: String
  }, // Name of device manufacturer
  'model' : {
    optional: true,
    type: String
  }, // Model id assigned by the manufacturer
  'version' : {
    optional: true,
    type: String
  }, // Version number (i.e. software)
  'manufactureDate' : {
    optional: true,
    type: Date
  }, // Manufacture date
  'expiry' : {
    optional: true,
    type: Date
  }, // Date and time of expiry of this device (if applicable)
  'udi' : {
    optional: true,
    type: String
  }, // FDA mandated Unique Device Identifier
  'lotNumber' : {
    optional: true,
    type: String
  }, // Lot number of manufacture
  'owner' : {
    optional: true,
    type: ReferenceSchema
  }, // (Organization) Organization responsible for device
  'location' : {
    optional: true,
    type: ReferenceSchema
  }, // (Location)Where the resource is found
  'patient' : {
    optional: true,
    type: ReferenceSchema
  }, // (Patient) If the resource is affixed to a person
  'contact' : {
    optional: true,
    type: [ ContactPointSchema ]
  }, // Details for human/organization for support
  'url' : {
    optional: true,
    type: String
  } // Network address to contact device
});
Devices.attachSchema(Devices.schema);

Factory.define('device', Devices, {
  manufacturer: () => 'lorem ipsum...',
  createdAt: () => new Date()
});
