

// create the object using our BaseModel
Subscription = BaseModel.extend();

//Assign a collection so the object knows how to perform CRUD operations
Subscription.prototype._collection = Subscriptions;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Subscriptions = new Mongo.Collection('Subscriptions');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Subscriptions._transform = function (document) {
  return new Subscription(document);
};


if (Meteor.isClient){
  Meteor.subscribe('Subscriptions');
}

if (Meteor.isServer){
  Meteor.publish('Subscriptions', function (argument){
    if (this.userId) {
      return Subscriptions.find();
    } else {
      return [];
    }
  });
}



SubscriptionSchema = new SimpleSchema({
  'resourceType' : {
    type: String,
    defaultValue: 'Subscription'
  },
  'identifier' : {
    optional: true,
    type: [ IdentifierSchema ]
  }, // Instance id from manufacturer, owner, and others
  'type' : {
    optional: true,
    type: CodeableConceptSchema
  }, // R!  What kind of subscription this is
  'note' : {
    optional: true,
    type: [ AnnotationSchema ]
  }, // Subscription notes and comments
  'status' : {
    optional: true,
    type: Code
  }, // available | not-available | entered-in-error
  'manufacturer' : {
    optional: true,
    type: String
  }, // Name of subscription manufacturer
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
  }, // Date and time of expiry of this subscription (if applicable)
  'udi' : {
    optional: true,
    type: String
  }, // FDA mandated Unique Subscription Identifier
  'lotNumber' : {
    optional: true,
    type: String
  }, // Lot number of manufacture
  'owner' : {
    optional: true,
    type: ReferenceSchema
  }, // (Organization) Organization responsible for subscription
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
  } // Network address to contact subscription
});
Subscriptions.attachSchema(SubscriptionSchema);
