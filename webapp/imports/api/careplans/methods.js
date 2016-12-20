//import { CarePlans, FooSchema } from '/imports/api/careplans/careplans';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Random } from 'meteor/random';
import { defaultCarePlan } from '/imports/api/careplans/default';

import { Adherences } from '/imports/api/adherences/adherences';
import { Observations } from '/imports/api/observations/observations';

import { CarePlans } from 'meteor/clinical:hl7-resource-careplan';
import { QuestionnaireResponses } from 'meteor/clinical:hl7-resource-questionnaire-response';

import { insertObservation, updateObservation, removeObservationById } from '/imports/api/observations/methods';




export const cloneCarePlan = new ValidatedMethod({
  name: 'careplans.clone',
  validate: new SimpleSchema({
    'template': {
      type: String,
      optional: true
    },
    'cardName': {
      type: String,
      optional: true
    },
    'subject.display': {
      type: String,
      optional: true
    },
    'subject.reference': {
      type: String,
      optional: true
    },
    'careSessionId': {
      type: String,
      optional: true
    },
    'clientTimestamp': {
      type: Date,
      optional: true
    },
    'bac': {
      type: Number,
      optional: true,
      decimal: true
    },
    'rawBac': {
      type: Number,
      optional: true,
      decimal: true
    },
    'bacTime': {
      type: Date,
      optional: true
    },
    'peakBAC': {
      type: Number,
      optional: true,
      decimal: true
    },
    'timeTilSoberString': {
      type: String,
      optional: true
    },
    'firstDrinkTime': {
      type: Date,
      optional: true
    },
    'lastDrinkTime': {
      type: Date,
      optional: true
    },
    'standardDrinks': {
      type: Number,
      optional: true,
      decimal: true
    },
    'roundedStdDrinks': {
      type: Number,
      optional: true,
      decimal: true
    },
    'estimatedBAC': {
      type: Number,
      optional: true,
      decimal: true
    },
    'numberDrinks': {
      type: Number,
      optional: true,
      decimal: true
    },
    'didDrink': {
      type: Boolean,
      optional: true
    },
    'adherencePicPresent': {
      type: Boolean,
      optional: true
    },
    'didNotTakeMeds': {
      type: Boolean,
      optional: true
    },
    'tookMeds': {
      type: Boolean,
      optional: true
    },
    'adherencePhotoUrl': {
      type: String,
      optional: true
    }
  }).validator(),
  run(carouselDataPayload) {
    console.log("carouselDataPayload", carouselDataPayload);

    var careplans = CarePlans.find({'identifier-value': carouselDataPayload.template}).fetch();



    var lastObservation = Observations.find({'sessionId': carouselDataPayload.session}).fetch();
    var lastQuestionnaireResponse = QuestionnaireResponses.find({'sessionId': carouselDataPayload.session}).fetch();
    var lasAdherencePhoto = Adherences.find({'sessionId': carouselDataPayload.session}).fetch();

    if (lastObservation) {
      console.log("found an observation for this session...");

    }
    if (lastQuestionnaireResponse) {
      console.log("found an questionnaire response for this session...");

    }
    if (lasAdherencePhoto) {
      console.log("found an adherence photo for this session...");

    }



    var newCarePlan;

    // the following is primariy for getting the master template
    if (careplans[0]) {
      newCarePlan = careplans[0];
      delete newCarePlan._id;
    } else {
      // if it's not available, use the hard-coded default
      newCarePlan = defaultCarePlan;
    }

    // if we can find a valid patient careplan template, override all the above

    let patient = Patients.findOne({_id: carouselDataPayload.subject.reference});
    if (patient && patient.carePlanId) {
      newCarePlan = CarePlans.findOne({_id: patient.carePlanId});
    }


    console.log("newCarePlan", newCarePlan);
    console.log("carouselDataPayload", carouselDataPayload);


    newCarePlan.subject.display = carouselDataPayload.subject.display;
    newCarePlan.subject.reference = carouselDataPayload.subject.reference;
    newCarePlan.description = carouselDataPayload.description;
    newCarePlan.template = false;
    newCarePlan.createdAt = new Date();

    CarePlans.insert(newCarePlan, function(error){
      if (error) {
        if(process.env.NODE_ENV === "test") console.log("CarePlans.insert[error]", error);
      }
    });

    // if (carouselDataPayload.bac) {
    //   let newObservation = {
    //     resourceType: 'Observation',
    //     status: 'final',
    //     category: {
    //       text: 'Foo'
    //     },
    //     effectiveDateTime: carouselDataPayload.clientTimestamp,
    //     subject: {
    //       display: carouselDataPayload.subject.display,
    //       reference: carouselDataPayload.subject.reference
    //     },
    //     performer: {
    //       display: carouselDataPayload.subject.display,
    //       reference: carouselDataPayload.subject.reference
    //     },
    //     device: {
    //       display: 'Foo',
    //       reference: ''
    //     },
    //     valueQuantity: {
    //       value: carouselDataPayload.bac,
    //       unit: '%',
    //       system: 'http://unitsofmeasure.org'
    //     }
    //   };
    //
    //   // TODO:  it would be better if ResultInit.js checked the cardName and called
    //   // /imports/api/observations/methods#insertObservation()
    //   Observations.insert(newObservation, function(error){
    //     if (error) {
    //       if(process.env.NODE_ENV === "test") console.log("Observations.insert[error]", error);
    //     }
    //   });
    //
    // }



    // let newAdherenecPhoto = {
    //
    // }
    // Adherences.insert(newAdherenecPhoto, function(error){
    //   if (error) {
    //     if(process.env.NODE_ENV === "test") console.log("Adherences.insert[error]", error);
    //   }
    // });

    let newQuestionnaireResponses = {
      resourceType: "QuestionnaireResource",
      identifier: {
        use: "usual",
        type: {
          text: "FooQuestionnaireResponse",
          coding: [{
            system: "dxrxmedical",
            version: "1",
            code: "dxrx",
            display: "Foo Survey Questionnaire",
            userSelected: false
          }]
        }
      },
      status: "started",
      questionnaire: {
        display: "FooQuestionnaire",
        reference: "Questionnaires/FooQuestionnaire"
      },
      author: {
        display: carouselDataPayload.subject.display,
        reference: carouselDataPayload.subject.reference
      },
      subject: {
        display: carouselDataPayload.subject.display,
        reference: carouselDataPayload.subject.reference
      },
      source: {
        display: '',
        reference: ''
      },
      encounter: {
        display: '',
        reference: ''
      },
      group: {
        linkId: '',
        title: "BREATHALYZER SURVEY",
        text: "Foo Survey",
        required: false,
        repeats: true,
        question: [{
          linkId: "survey-question-1",
          text: "Have you drank today?",
          answer: []
        }, {
          linkId: "survey-question-2",
          text: "When did you take your first drink today?",
          answer: []
        }, {
          linkId: "survey-question-3",
          text: "When did you take your last drink today?",
          answer: []
        }, {
          linkId: "survey-question-4",
          text: "How many drinks did you have today?",
          helpText: "Slide to select number of drinks",
          answer: []
        }, {
          linkId: "survey-question-5",
          text: "What is your estimated blood alcohol level?",
          helpText: "Slide to estimate level",
          answer: []
        }]
      }
    };
    if (carouselDataPayload.didDrink) {
      newQuestionnaireResponses.group.question[0].answer.push({
        valueBoolean: carouselDataPayload.didDrink
      });
    }
    if (carouselDataPayload.firstDrinkTime) {
      newQuestionnaireResponses.group.question[1].answer.push({
        valueString: carouselDataPayload.firstDrinkTime.toString()
      });
    }
    if (carouselDataPayload.lastDrinkTime) {
      newQuestionnaireResponses.group.question[2].answer.push({
        valueString: carouselDataPayload.lastDrinkTime.toString()
      });
    }
    if (carouselDataPayload.numberDrinks) {
      newQuestionnaireResponses.group.question[3].answer.push({
        valueString: carouselDataPayload.numberDrinks
      });
    }
    if (carouselDataPayload.estimatedBAC) {
      newQuestionnaireResponses.group.question[4].answer.push({
        valueString: carouselDataPayload.estimatedBAC
      });
    }


    QuestionnaireResponses.insert(newQuestionnaireResponses, function(error){
      if (error) {
        if(process.env.NODE_ENV === "test") console.log("QuestionnaireResponses.insert[error]", error);
      }
    });

  }
});


export const authorCarePlan = new ValidatedMethod({
  name: 'careplans.author',
  validate: new SimpleSchema({
    'template': {
      type: String,
      optional: true
    },
    'subject.display': {
      type: String,
      optional: true
    },
    'subject.reference': {
      type: String,
      optional: true
    },
    'author.display': {
      type: String,
      optional: true
    },
    'author.reference': {
      type: String,
      optional: true
    },
    'description': {
      type: String,
      optional: true
    },
    'medications': {
      type: [String],
      optional: true
    },
    'deselectedActivities': {
      type: [String],
      optional: true
    },
    'goals': {
      type: [String],
      optional: true
    }
  }).validator(),
  run(careplanData) {
    if(process.env.NODE_ENV === "test") console.log("careplanData", careplanData);

    var careplans = CarePlans.find({'identifier.value': careplanData.template}).fetch();

    var newCarePlan;
    var masterCarePlanTemplate;

    if (careplans[0]) {
      masterCarePlanTemplate = careplans[0];
      delete masterCarePlanTemplate._id;
    } else {
      masterCarePlanTemplate = defaultCarePlan;
    }
    newCarePlan = masterCarePlanTemplate;
    newCarePlan.template = true;
    newCarePlan.createdAt = new Date();
    newCarePlan.description = careplanData.description;

    newCarePlan.subject.display = careplanData.subject.display;
    newCarePlan.subject.reference = 'Patients/' + careplanData.subject.reference;

    newCarePlan.author = [];
    newCarePlan.author.push({
      display: careplanData.author.display,
      reference: 'Practitioners/' + careplanData.author.reference
    });

    newCarePlan.goal = [];
    careplanData.goals.forEach(function(goalId){
      let goal = Goals.findOne(goalId);
      newCarePlan.goal.push({
        display: goal.description,
        reference: goal._id
      });
    });

    careplanData.medications.forEach(function(medicationId){

      let medication = Medications.findOne(medicationId);

      newCarePlan.activity.push({
        reference: {
          display: 'Medication adherence photo - ' + medication.product.ingredient[0].item.code.text,
          reference: 'Medications/' + medicationId
        },
        detail: {
          category: {
            text: 'adherence photo'
          },
          goal: [{
            display: 'Lower your daily cravings for alcohol.',
            reference: 'Goals/'
          }],
          status: 'planned',
          prohibited: false,
          scheduledPeriod: {
            start: new Date(2016, 9, 20),
            end: new Date(2016, 9, 21)
          },
          scheduledTiming: {
            code: {
              text: 'BID'
            }
          },
          performer: [{
            display: careplanData.subject.display,
            reference: 'Patients/' + careplanData.subject.reference
          }],
          productReference: {
            display: medication.product.ingredient[0].item.code.text,
            reference: 'Medications/' + medicationId
          },
          // dailyAmount: {
          //   value: 50,
          //   unit: 'mg',
          //   system: 'http://unitsofmeasure.org'
          // },
          // quantity: {
          //   value: 1,
          //   unit: 'tablet'
          // },
          description: medication.product.ingredient[0].item.description
        }
      });
    });

    if(process.env.NODE_ENV === "test") console.log("newCarePlan", newCarePlan);

    return CarePlans.insert(newCarePlan, function(error){
      if (error) {
        if(process.env.NODE_ENV === "test") console.log("CarePlans.insert[error]", error);
      }
    });

  }
});
// export const updateCarePlan = new ValidatedMethod({
//   name: 'careplans.update',
//   validate: new SimpleSchema({
//     '_id': {
//       type: String
//     },
//     'update.version': {
//       type: Number
//     },
//     'update.publisher': {
//       type: String
//     }
//   }).validator(),
//   run({ _id, update }) {
//
//     // we're going to map the breathalyzer data onto a FHIR CarePlan resource
//     let updatedCarePlan = {
//       resourceType: 'CarePlan',
//       version: update.version,
//       status: "published",
//       date: new Date(),
//       publisher: update.publisher
//     };
//     CarePlans.update(_id, { $set: updatedCarePlan });
//   }
// });

export const removeCarePlan = new ValidatedMethod({
  name: 'careplans.remove',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    CarePlans.remove(_id);
  }
});
