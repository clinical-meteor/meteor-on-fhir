
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertPractitioner = new ValidatedMethod({
  name: 'practitioners.insert',
  validate: new SimpleSchema({
    'name': { type: String, optional: true  },
    'telecomValue': { type: String, optional: true  },
    'telecomUse': { type: String, optional: true  },
    'qualificationId': { type: String, optional: true  },
    'qualificationStart': { type: String, optional: true  },
    'qualificationEnd': { type: String, optional: true  },
    'issuer': { type: String, optional: true  }
  }).validator(),
  run(document) {
    console.log("insertPractitioner");
    console.log("document", document);

    // temporary; until we figure out FormHelpers?
    // document = FormHelpers.convertBirthdateToValidDate(document);
    delete document.qualificationStart;
    delete document.qualificationEnd;

    let newPractitioner = {
      name: {
        text: ""
      },
      telecom: [{
        system: 'phone',
        value: '',
        use: 'primary',
        rank: '1'
      }],
      qualification: [{
        identifier: [{
          use: 'certficate',
          value: '',
          period: {
            start: null,
            end: null
          }
        }],
        issuer: {
          display: "",
          reference: ""
        }
      }]
    };
    if (document.name) {
      newPractitioner.name.text = document.name;
    }

    if (document.telecomValue) {
      newPractitioner.telecom[0].value = document.telecomValue;
    }
    if (document.telecomUse) {
      newPractitioner.telecom[0].use = document.telecomUse;
    }
    if (document.qualificationId) {
      newPractitioner.qualification[0].identifier[0].value = document.qualificationId;
    }
    if (document.issuer) {
      newPractitioner.qualification[0].issuer.display = document.issuer;
    }
    if (document.qualificationStart) {
      newPractitioner.telecom[0].identifier[0].period.start = document.qualificationStart;
    }
    if (document.qualificationEnd) {
      newPractitioner.telecom[0].identifier[0].period.end = document.qualificationEnd;
    }
    if (process.env.NODE_ENV === "test") {
      newPractitioner.test = true;
    } else {
      newPractitioner.test = false;
    }

    console.log("newPractitioner", newPractitioner);


    // now that's all done, we can insert the document
    return Practitioners.insert(newPractitioner);
  }
});

export const updatePractitioner = new ValidatedMethod({
  name: 'practitioners.update',
  validate: new SimpleSchema({
    '_id': { type: String },
    'update': { type: Object, blackbox: true, optional: true}
  }).validator(),
  run({ _id, update }) {
    console.log("updatePractitioner");
    console.log("_id", _id);
    console.log("update", update);

    let practitioner = Practitioners.findOne({_id: _id});

    delete practitioner._id;
    delete practitioner._document;
    delete practitioner._super_;
    delete practitioner._collection;

    if (update.name) {
      practitioner.name.text = update.name;
    }
    if (update.telecomValue) {
      practitioner.telecom[0].value = update.telecomValue;
    }
    if (update.telecomUse) {
      practitioner.telecom[0].use = update.telecomUse;
    }
    if (update.qualificationId) {
      practitioner.qualification[0].identifier[0].value = update.qualificationId;
    }
    if (update.issuer) {
      practitioner.qualification[0].issuer.display = update.issuer;
    }
    if (update.qualificationStart) {
      practitioner.qualification[0].identifier[0].period.start = moment(update.qualificationStart).toDate();
    }
    if (update.qualificationEnd) {
      practitioner.qualification[0].identifier[0].period.end = moment(update.qualificationEnd).toDate();
    }


    console.log("diffedPractitioner", practitioner);
    return Practitioners.update(_id, { $set: practitioner }, function(error){
      if (error) {
        console.log("error", error);
      }
    });
  }
});

export const removePractitionerById = new ValidatedMethod({
  name: 'practitioners.removeById',
  validate:  new SimpleSchema({
    '_id': { type: String }
  }).validator(),
  run({ _id }) {
    console.log("Removing user " + _id);
    Practitioners.remove({_id: _id});
  }
});
