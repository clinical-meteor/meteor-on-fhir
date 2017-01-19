

// create the object using our BaseModel
TestScript = BaseModel.extend();

//Assign a collection so the object knows how to perform CRUD operations
TestScript.prototype._collection = TestScripts;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
TestScripts = new Mongo.Collection('TestScripts');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
TestScripts._transform = function (document) {
  return new TestScript(document);
};


if (Meteor.isClient){
  Meteor.subscribe('TestScripts');
}

if (Meteor.isServer){
  Meteor.publish('TestScripts', function (argument){
    if (this.userId) {
      return TestScripts.find();
    } else {
      return [];
    }
  });
}



TestScriptSchema = new SimpleSchema({
  'resourceType' : {
    type: String,
    defaultValue: 'TestScript'
  },
  'identifier' : {
    optional: true,
    type: [ IdentifierSchema ]
  }, // Instance id from manufacturer, owner, and others
  'type' : {
    optional: true,
    type: CodeableConceptSchema
  }, // R!  What kind of test-script this is
  'note' : {
    optional: true,
    type: [ AnnotationSchema ]
  }, // TestScript notes and comments
  'status' : {
    optional: true,
    type: Code
  }, // available | not-available | entered-in-error
  'manufacturer' : {
    optional: true,
    type: String
  }, // Name of test-script manufacturer
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
  }, // Date and time of expiry of this test-script (if applicable)
  'udi' : {
    optional: true,
    type: String
  }, // FDA mandated Unique TestScript Identifier
  'lotNumber' : {
    optional: true,
    type: String
  }, // Lot number of manufacture
  'owner' : {
    optional: true,
    type: ReferenceSchema
  }, // (Organization) Organization responsible for test-script
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
  } // Network address to contact test-script
});
TestScripts.attachSchema(TestScriptSchema);
