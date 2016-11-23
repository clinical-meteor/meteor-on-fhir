/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
// import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { CarePlans } from 'meteor/clinical:hl7-resource-careplan';
import { cloneCarePlan, removeCarePlan } from './methods.js';
import defaultCarePlan from '/imports/api/careplans/default';

describe('CarePlans methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      // leave the templates only; only delete the patient careplans
      CarePlans.find().forEach(function(carePlan){
        CarePlans.remove({_id: carePlan._id});
      });
    }
  });

  // it('inserts a document into the CarePlans collection', function () {
  //   const { _id } = Factory.create('careplan');
  //
  //   //var careplans = CarePlans.find().fetch();
  //   //console.log("careplans", careplans);
  //   let factoryCarePlan = CarePlans.findOne({_id: _id });
  //   assert.equal(factoryCarePlan.subject.display, 'J. Doe');
  //
  //
  //   let clonedCarePlanId = cloneCarePlan.call({
  //     template: 'alcohol-treatment-template',
  //     subject: {
  //       display: 'Jane Doe',
  //       reference: '54321'
  //     },
  //     description: 'Asthma Treatment Plan'
  //   });
  //
  //   let updatedCarePlan = CarePlans.findOne({_id: clonedCarePlanId });
  //
  //   //console.log("updatedCarePlan", updatedCarePlan);
  //
  //   assert.equal(updatedCarePlan.subject.display, 'Jane Doe');
  //   assert.equal(updatedCarePlan.subject.reference, '54321');
  //   assert.equal(updatedCarePlan.description, 'Asthma Treatment Plan');
  //
  //   assert.ok(updatedCarePlan.period.start);
  //   assert.ok(updatedCarePlan.period.end);
  //
  //   assert.equal(updatedCarePlan.author[0].display, 'Dr. John Mendelson');
  //
  // });

  // it('updates a document in the CarePlans collection', function () {
  //   const { _id } = Factory.create('carePlan');
  //
  //   updateCarePlan.call({
  //     _id,
  //     update: {
  //       version: 2,
  //       publisher: 'Lorem Ipsum...'
  //     }
  //   });
  //
  //   const getCarePlan = CarePlans.findOne(_id);
  //   assert.equal(getCarePlan.publisher, 'Lorem Ipsum...');
  //   assert.equal(getCarePlan.version, 2);
  // });

  it('removes a document from the CarePlans collection', function () {
    const { _id } = Factory.create('careplan');
    removeCarePlan.call({ _id });
    const getCarePlan = CarePlans.findOne(_id);
    assert.equal(getCarePlan, undefined);
  });
});


//-------------------------------------------------------------------------
// Factories

//import { Factory } from 'meteor/dburles:factory';
Factory.define('careplan', CarePlans, {
  resourceType: 'CarePlan',
  template: true,
  identifier: [{
    value: 'alcohol-treatment-template',
    type: {
      text: 'Alcohol Treatment AM Template'
    }
  }],
  subject: {
    display: 'J. Doe',
    reference: 'Patients/' + Random.id()
  },
  status: 'active',
  context: {
    display: '2016-09-20',
    reference: 'Encounters/'  + Random.id()
  },
  period: {
    start: new Date(2016, 9, 20),
    end: new Date(2016, 9, 21)
  },
  author: [{
    display: 'Dr. John Mendelson',
    reference: 'Meteor.users/System'
  }],
  description: 'Alcohol Abuse Disorder Treatment Plan.',
  addresses: [{
    display: 'Alcohol Abuse Disorder',
    reference: 'Conditions/'  + Random.id()
  }],
  relatedPlan: [{
    code: 'fullfills',
    plan: {
      display: 'Daily Medication Template',
      reference: 'CarePlans/'  + Random.id()
    }
  }],
  participant: [{
    role: {
      text: 'Primary Care Physician'
    },
    member: {
      display: 'Dr. John Mendelson',
      reference: 'Practitioners/'  + Random.id()
    }
  }],
  goal: [{
    display: 'Use the breathalyzer once a day.',
    reference: 'Goals/'  + Random.id()
  }, {
    display: 'Use the breathalyzer twice a day.',
    reference: 'Goals/'  + Random.id()
  }, {
    display: 'Take your meds for today.',
    reference: 'Goals/'  + Random.id()
  }, {
    display: 'Take your meds during an entire weekly treatment.',
    reference: 'Goals/'  + Random.id()
  }, {
    display: 'Lower your weekly average alcohol intake compared to your baseline.',
    reference: 'Goals/'  + Random.id()
  }, {
    display: 'Lower your daily cravings for alcohol.',
    reference: 'Goals/'  + Random.id()
  }, {
    display: 'Develop awareness of your drinking behaviors.',
    reference: 'Goals/'  + Random.id()
  }],
  activity: [{
    reference: {
      display: 'AM Breathalyzer Observation',
      reference: 'Observation/'  + Random.id()
    },
    detail: {
      category: {
        text: 'action'
      },
      reasonReference: [{
        display: 'Alcohol Abuse Disorder',
        reference: 'Conditions/'  + Random.id()
      }],
      goal: [{
        display: 'Develop awareness of your drinking behaviors.',
        reference: 'Goals/'  + Random.id()
      }],
      status: 'in-progress',
      prohibited: false,
      scheduledTiming: {
        resoureceType: 'Timing',
        code: {
          text: 'AM'
        }
      },
      performer: [{
        display: 'John Doe',
        reference: 'Patients/'  + Random.id()
      }],
      quantity: {
        value: 1,
        unit: 'exhalations'
      },
      description: 'Check your blood alcohol level in the morning.'
    }
  }, {
    reference: {
      display: 'PM Breathalyzer Observation',
      reference: 'Observation/'  + Random.id()
    },
    detail: {
      category: {
        text: 'action'
      },
      reasonReference: [{
        display: 'Alcohol Abuse Disorder',
        reference: 'Conditions/'  + Random.id()
      }],
      goal: [{
        display: 'Develop awareness of your drinking behaviors.',
        reference: 'Goals/' + Random.id()
      }],
      status: 'in-progress',
      prohibited: false,
      scheduledTiming: {
        resoureceType: 'Timing',
        code: {
          text: 'PM'
        }
      },
      performer: [{
        display: 'J. Doe',
        reference: 'Patients/'  + Random.id()
      }],
      quantity: {
        value: 1,
        unit: 'exhalations'
      },
      description: 'Check your blood alcohol level in the evening.'
    }
  }, {
    reference: {
      display: 'Daily medication adherence photo.',
      reference: 'Adherence/'  + Random.id()
    },
    detail: {
      category: {
        text: 'drug'
      },
      reasonReference: [{
        display: 'Alcohol Abuse Disorder',
        reference: 'Conditions/'  + Random.id()
      }],
      goal: [{
        display: 'Lower your daily cravings for alcohol.',
        reference: 'Goals/'  + Random.id()
      }],
      status: 'in-progress',
      prohibited: false,
      scheduledPeriod: {
        start: new Date(2016, 9, 20),
        end: new Date(2016, 9, 21)
      },
      performer: [{
        display: 'John Doe',
        reference: 'Patients/'  + Random.id()
      }],
      productReference: {
        display: 'Naltrexone',
        reference: 'Medications/'  + Random.id()
      },
      dailyAmount: {
        value: 50,
        unit: 'mg',
        system: 'http://unitsofmeasure.org'
      },
      quantity: {
        value: 1,
        unit: 'tablet'
      },
      description: 'Opiate blocker that turns habit-forming behaviors into habit.'
    }
  }, {
    detail: {
      category: {
        text: 'drug'
      },
      reasonReference: [{
        display: 'Alcohol Abuse Disorder',
        reference: 'Conditions/'  + Random.id()
      }],
      goal: [{
        display: 'Lower your weekly average alcohol intake compared to your baseline.',
        reference: 'Goals/'  + Random.id()
      }],
      status: 'in-progress',
      prohibited: true,
      scheduledPeriod: {
        start: new Date(2016, 9, 20),
        end: new Date(2016, 9, 21)
      },
      performer: [{
        display: 'John Doe',
        reference: 'Patients/'  + Random.id()
      }],
      productReference: {
        display: 'Alcohol',
        reference: 'Medications/'  + Random.id()
      },
      dailyAmount: {
        value: 250,
        comparator: '>',
        unit: 'ml',
        system: 'http://unitsofmeasure.org'
      },
      quantity: {
        value: 20,
        comparator: '>',
        unit: '%',
        system: 'http://unitsofmeasure.org'
      },
      description: 'Begin reducing alcohol consumption by eliminating hard alcohol.'
    }
  }]
});
