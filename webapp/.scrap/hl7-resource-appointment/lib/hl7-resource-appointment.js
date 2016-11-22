
// create the object using our BaseModel
Appointment = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Appointment.prototype._collection = Appointments;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Appointments = new Mongo.Collection('Appointments');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Appointments._transform = function (document) {
  return new Appointment(document);
};


if (Meteor.isClient){
  Meteor.subscribe("Appointments");
}

if (Meteor.isServer){
  Meteor.publish("Appointments", function (argument){
    if (this.userId) {
      return Appointments.find();
    } else {
      return [];
    }
  });
}



AppointmentSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "Appointment"
  },
  "identifier" : {
    optional: true,
    type: [ IdentifierSchema ]
  },
  "status" : {
    optional: true,
    type: String
  },
  "type" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "reason" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "priority" : {
    optional: true,
    type: Number
  },
  "description" : {
    optional: true,
    type: String
  },
  "start" : {
    optional: true,
    type: Date
  },
  "end" : {
    optional: true,
    type: Date
  },
  "minutesDuration" : {
    optional: true,
    type: Number
  },
  "slot" : {
    optional: true,
    type: [ ReferenceSchema ]
  },
  "comment" : {
    optional: true,
    type: String
  },
  "participant.$.type" : {
    optional: true,
    type: [ CodeableConceptSchema ]
  },
  "participant.$.actor" : {
    optional: true,
    type: ReferenceSchema
  },
  "participant.$.required" : {
    optional: true,
    type: String
  },
  "participant.$.status" : {
    optional: true,
    type: String
  }
});

Appointments.attachSchema(AppointmentSchema);
