

// create the object using our BaseModel
ValueSet = BaseModel.extend();

//Assign a collection so the object knows how to perform CRUD operations
ValueSet.prototype._collection = ValueSets;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
ValueSets = new Mongo.Collection('ValueSets');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
ValueSets._transform = function (document) {
  return new ValueSet(document);
};


if (Meteor.isClient){
  Meteor.subscribe('ValueSets');
}

if (Meteor.isServer){
  Meteor.publish('ValueSets', function (argument){
    if (this.userId) {
      return ValueSets.find();
    } else {
      return [];
    }
  });
}



ValueSetSchema = new SimpleSchema({
  'resourceType' : {
    type: String,
    defaultValue: 'ValueSet'
  },
  'identifier' : {
    optional: true,
    type: [ IdentifierSchema ]
  }, // Instance id from manufacturer, owner, and others
  'type' : {
    optional: true,
    type: CodeableConceptSchema
  }, // R!  What kind of value-set this is
  'note' : {
    optional: true,
    type: [ AnnotationSchema ]
  }, // ValueSet notes and comments
  'status' : {
    optional: true,
    type: Code
  }, // available | not-available | entered-in-error
  'manufacturer' : {
    optional: true,
    type: String
  }, // Name of value-set manufacturer
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
  }, // Date and time of expiry of this value-set (if applicable)
  'udi' : {
    optional: true,
    type: String
  }, // FDA mandated Unique ValueSet Identifier
  'lotNumber' : {
    optional: true,
    type: String
  }, // Lot number of manufacture
  'owner' : {
    optional: true,
    type: ReferenceSchema
  }, // (Organization) Organization responsible for value-set
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
  } // Network address to contact value-set
});
ValueSets.attachSchema(ValueSetSchema);
