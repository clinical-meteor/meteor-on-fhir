/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { Factory } from 'meteor/dburles:factory';
import { Medications } from 'meteor/clinical:hl7-resource-medication';
import { insertMedication, updateMedication, removeMedication } from './methods.js';

describe('Medications methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      Medications.find().forEach(function(medication){
        Medications.remove({_id: medication._id});
      });
    }
  });

  it('inserts a medication into the Medications collection', function () {

    var dayQuill = {
      resourceType: 'Medication',
      code: {
        text: "DayQuill"
      },
      isBrand: true,
      manufacturer: {
        display: 'VICKS',
        reference: ''
      },
      product: {
        form: {
          text: 'liquid'
        },
        ingredient: [{
          item: {
            // resourceType: 'Substance',
            code: {
              text: 'Acetaminophen'
            },
            description: 'Pain reliever/fever reducer.'
          }
        }]
      }
    };

    let medicationId = insertMedication.call(dayQuill);
    // let medicationId = Medications.insert(dayQuill, function(error){
    //   if (error) {
    //     if(process.env.NODE_ENV === "test") console.log("Medications.insert[error]", error);
    //   }
    // });

    let getMedication = Medications.findOne({_id: medicationId });

    if(process.env.NODE_ENV === "test") console.log("getMedication[insert]", getMedication);


    assert.equal(getMedication.code.text, 'DayQuill');
    assert.equal(getMedication.manufacturer.display, 'VICKS');
    assert.equal(getMedication.product.form.text, 'liquid');
    assert.equal(getMedication.product.ingredient[0].item.code.text, 'Acetaminophen');
    assert.equal(getMedication.product.ingredient[0].item.description, 'Pain reliever/fever reducer.');
  });

  it('updates a medication in the Medications collection', function () {
    const { _id } = Factory.create('medication');


    var getMedication = Medications.findOne(_id);

    assert.ok(getMedication.code.text);
    assert.ok(getMedication.manufacturer.display);
    assert.ok(getMedication.product.form.text);
    assert.ok(getMedication.product.ingredient[0].item.code.text);
    assert.ok(getMedication.product.ingredient[0].item.description);


    var nyQuill = {
      resourceType: 'Medication',
      code: {
        text: "NyQuill"
      },
      isBrand: true,
      manufacturer: {
        display: 'VICKS',
        reference: ''
      },
      product: {
        form: {
          text: 'liquid'
        },
        ingredient: [{
          item: {
            resourceType: 'Substance',
            code: {
              text: 'Acetaminophen'
            },
            description: 'Pain reliever/fever reducer.'
          }
        }]
      }
    };

    updateMedication.call({
      _id,
      medicationUpdate: nyQuill
    });
    // Medications.update(_id, { $set: nyQuill }, function(error){
    //   if (error) {
    //     if(process.env.NODE_ENV === "test") console.log("Medications.update[error]", error);
    //   }
    // });

    getMedication = Medications.findOne(_id);

    if(process.env.NODE_ENV === "test") console.log("getMedication[update]", getMedication);


    assert.equal(getMedication.code.text, 'NyQuill');
    assert.equal(getMedication.manufacturer.display, 'VICKS');
    assert.equal(getMedication.product.form.text, 'liquid');
    assert.equal(getMedication.product.ingredient[0].item.code.text, 'Acetaminophen');
    assert.equal(getMedication.product.ingredient[0].item.description, 'Pain reliever/fever reducer.');
  });

  it('removes a medication from the Medications collection', function () {
    const { _id } = Factory.create('medication');

    removeMedication.call({ _id });
    const getMedication = Medications.findOne(_id);
    assert.equal(getMedication, undefined);
  });
});



//-------------------------------------------------------------------------
// Factories

Factory.define('medication', Medications, {
  resourceType: 'Medication',
  code: {
    text: "Lorem ipsum..."
  },
  isBrand: true,
  manufacturer: {
    display: 'Lorem',
    reference: ''
  },
  product: {
    form: {
      text: 'tablet'
    },
    ingredient: [{
      item: {
        // resourceType: 'Substance',
        code: {
          text: 'Ipsum'
        },
        description: 'Lorem ipsum...'
      }
    }]
  }
});
