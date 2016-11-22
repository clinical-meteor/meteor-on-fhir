
//import { Questionnaires } from '/imports/api/questionnaires/questionnaires';

Meteor.publish('questionnaires', function(){
  return Questionnaires.find()
});

Meteor.methods({
  createQuestionnaire:function(questionnaireObject){
    check(questionnaireObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating Questionnaire...');
      Questionnaires.insert(questionnaireObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Questionnaire created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeQuestionnaire:function(){

    if (Questionnaires.find().count() === 0) {
      console.log('No records found in Questionnaires collection.  Lets create some...');

      var breathalyzerQuestionnaire = {
        resourceType: "Questionnaire",
        identifier: [{
          use: "usual",
          type: {
            text: "GeneralResponse",
            coding: [{
              system: "symptoatic.io",
              version: "1",
              code: "symptomatic",
              display: "Generic Questionnaire",
              userSelected: false
            }]
          }
        }],
        version: "1",
        status: "published",
        date: new Date(),
        publisher: "Symptomatic.io",
        telecom: [],
        subjectType: '',
        group: {
          linkId: '',
          title: "GENERIC QUESTIONAIRE",
          concept: {},
          text: "General Multiple-Chocie Survey",
          required: false,
          repeats: true,
          question: [{
            linkId: "survey-question-2",
            text: "Pick a number between 0 and 10",
            helpText: "Pick a number",
            type: "number",
            required: true,
            repeats: false
          }, {
            linkId: "survey-question-1",
            text: "What is your favorite color?",
            helptext: "foo",
            type: "radio",
            required: true,
            repeats: false,
            options: [
              "Red",
              "Orange",
              "Yellow",
              "Green",
              "Blue",
              "Purple"
            ]
          }] // edit here for new question
        }
      };

      Meteor.call('createQuestionnaire', breathalyzerQuestionnaire);
    } else {
      console.log('Questionnaires already exist.  Skipping.');
    }
  },
  dropQuestionnaires: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping questionnaires... ');
      Questionnaires.find().forEach(function(patient){
        Questionnaires.remove({_id: patient._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }
});
