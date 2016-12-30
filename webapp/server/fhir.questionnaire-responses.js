
//import { QuestionnaireResponses } from '/imports/api/questionnaireResponses/questionnaireResponses';

Meteor.publish('questionnaireResponses', function(){
  return QuestionnaireResponses.find()
});

Meteor.methods({
  createQuestionnaireResponse:function(questionnaireResponseObject){
    check(questionnaireResponseObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating QuestionnaireResponse...');
      QuestionnaireResponses.insert(questionnaireResponseObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('QuestionnaireResponse created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeQuestionnaireResponse:function(deviceId){
    check(deviceId, String);

    if (QuestionnaireResponses.find().count() === 0) {
      console.log('No records found in QuestionnaireResponses collection.  Lets create some...');

      var defaultQuestionnaireResponse = {
        resourceType: "QuestionnaireResource",
        identifier: {
          use: "usual",
          type: {
            text: "GeneralResponse",
            coding: [{
              system: "symptoatic.io",
              version: "1",
              code: "symptomatic",
              display: "General Questionnaire Response",
              userSelected: false
            }]
          }
        },
        status: "completed",
        questionnaire: {
          display: "Generic Questionnaire",
          reference: "Questionnaires/GenericQuestionnaire"
        },
        author: {
          display: '',
          reference: ''
        },
        subject: {
          display: '',
          reference: ''
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
          title: "GENERIC QUESTIONAIRE",
          text: "General Multiple-Chocie Survey",
          required: false,
          repeats: true,
          question: [{
            linkId: "survey-question-1",
            text: "Pick a number between 0 and 10",
            answer: [{
              valueInteger: 0,
              valueString: ''
            }]
          }, {
            linkId: "survey-question-2",
            text: "What is your favorite color?",
            answer: [{
              valueString: ''
            }]
          }]
        }
      };

      if (this.userId) {
        let user = Meteor.users.findOne({_id: this.userId});
        if (user && user.profile && user.profile.name && user.profile.name.text) {

          defaultQuestionnaireResponse.subject.display = user.profile.name.text;
          defaultQuestionnaireResponse.subject.reference = 'Meteor.users/' + this.userId;

          defaultQuestionnaireResponse.performer.display = user.profile.name.text;
          defaultQuestionnaireResponse.performer.reference = 'Meteor.users/' + this.userId;
        }
      }

      Meteor.call('createQuestionnaireResponse', defaultQuestionnaireResponse);
    } else {
      console.log('QuestionnaireResponses already exist.  Skipping.');
    }
  },
  dropQuestionnaireResponses: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping questionnaireResponses... ');
      QuestionnaireResponses.find().forEach(function(patient){
        QuestionnaireResponses.remove({_id: patient._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }

});
