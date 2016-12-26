// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api

var defaultMedication = {
  resourceType: 'Medication',
  code: {
    text: ""
  },
  isBrand: true,
  manufacturer: {
    display: '',
    reference: ''
  },
  product: {
    form: {
      text: ''
    },
    ingredient: [{
      item: {
        resourceType: 'Substance',
        code: {
          text: ''
        },
        description: ''
      },
      instance: [{
        quantity: ''
      }]
    }]
  },
  package: {
    container: {
      text: 'bottle'
    },
    content: [{
      amount: {
        value: 30,
        unit: ''
      }
    }]
  }
};

module.exports = {
  tags: ['medications', 'Medications', 'crud', 'fhir', 'circle'],
  before: function(client){
    client
      .url("http://localhost:3000").pause(3000)
      .executeAsync(function(){
        Meteor.call('dropMedications');
        Meteor.call('dropTestUsers');
      });
  },
  'Sign up.': function (client) {
    client.resizeWindow(1200, 1024);

    client.page.signupPage()
      .navigate()
      .fillOutSignupPage('Gregory', 'House', 'house@test.org', 'house123', 'hippocrates')
      .saveScreenshot('tests/nightwatch/screenshots/practitioners/A-Signup-Practitioner.png', client)
      .signup()
      .pause(5000, client);

    client
      .verify.elementPresent('#indexPage')
      .verify.containsText('#authenticatedUsername', 'Gregory House')
      .pause(3000);
  },
  'list medications': function (client) {
    client.page
      .indexPage()
      .selectMedicationsTile();

    client.page
      .medicationsPage()
      .verifyElements()
      .verifyEmptyList();
      // .verifyMedicationListCard();
  },
  'create new medication': function (client) {

    client.page
      .medicationsPage()
      .selectNewMedicationTab()
      .verifyNewMedicationCard();

    client.pause(1000).executeAsync(function(){
      Session.set('medicationUpsert', {
        resourceType: 'Medication',
        code: {
          text: ""
        },
        isBrand: true,
        manufacturer: {
          display: '',
          reference: ''
        },
        product: {
          form: {
            text: ''
          },
          ingredient: [{
            item: {
              resourceType: 'Substance',
              code: {
                text: ''
              },
              description: ''
            },
            instance: [{
              quantity: ''
            }]
          }]
        },
        package: {
          container: {
            text: 'bottle'
          },
          content: [{
            amount: {
              value: 30,
              unit: ''
            }
          }]
        }
      });
    });

    client.page
      .medicationsPage()
      .upsertMedication('Ibuprofen', 'Walgreens', 'softgel', 'Ibuprofen', '160', 'Pain reliever / fever reducer', '#newMedication', client)
      .saveScreenshot('tests/nightwatch/screenshots/medications.crud/B-MedicationList.png', client);

    client
      .click('#newMedication #saveMedicationButton').pause(1000);
  },
  'list should contain recently created medication': function (client) {
    client.page
      .medicationsPage()
      .selectListTab()
      .verifyMedicationListCard()
      .listContainsMedication(1, 'Ibuprofen', 'Walgreens', 'softgel', 'Ibuprofen')
      .saveScreenshot('tests/nightwatch/screenshots/medications.crud/B-MedicationList.png', client);
  },
  'medication detail': function (client) {
    client.page
      .medicationsPage()
      .selectMedication(1)
      .verifyMedicationDetails('Ibuprofen', 'Walgreens', 'softgel', 'Ibuprofen', '160', 'Pain reliever / fever reducer')
      .saveScreenshot('tests/nightwatch/screenshots/medications.crud/C-MedicationDetails.png', client);
  },
  'edit medication': function (client) {
    client.executeAsync(function(){
      Session.set('medicationUpsert', {
        resourceType: 'Medication',
        code: {
          text: ""
        },
        isBrand: true,
        manufacturer: {
          display: '',
          reference: ''
        },
        product: {
          form: {
            text: ''
          },
          ingredient: [{
            item: {
              resourceType: 'Substance',
              code: {
                text: ''
              },
              description: ''
            },
            instance: [{
              quantity: ''
            }]
          }]
        },
        package: {
          container: {
            text: 'bottle'
          },
          content: [{
            amount: {
              value: 30,
              unit: ''
            }
          }]
        }
      });
    });

    client.page
      .medicationsPage()
      .upsertMedication('Motrin', 'Johnson & Johnson', 'softgel', 'Ibuprofen', '160', 'Pain reliever / fever reducer', '#medicationDetails', client)
      .saveScreenshot('tests/nightwatch/screenshots/medications.crud/D-EditedMedication.png', client);

    // since we're using the MedicationDetail component twice,
    // there are two #saveMedicationButtons on the page
    // so we need to scope the button accordingly
    client
      .click('#medicationDetails #saveMedicationButton').pause(1000);
  },
  'list edited Medications': function (client) {
    client.page
      .medicationsPage()
      .listContainsMedication(1, 'Motrin', 'Johnson & Johnson', 'softgel', 'Ibuprofen')
      //.pause(40000, client)
      .saveScreenshot('tests/nightwatch/screenshots/medications.crud/E-EditedMedicationList.png', client);
  },

  'fin': function (client) {
    client
      .end();
  }
};
