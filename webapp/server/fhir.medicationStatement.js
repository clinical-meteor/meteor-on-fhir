


Meteor.methods({
  createMedicationStatement:function(medicationStatementObject){
    check(medicationStatementObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating MedicationStatement...');
      MedicationStatements.insert(medicationStatementObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('MedicationStatement created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeMedicationStatements:function(){
    console.log('initializeMedicationStatements');
    if (MedicationStatements.find().count() === 0) {
      console.log('No records found in MedicationStatements collection.  Lets create some...');

      var tylenolStatement = {
        "resourceType": "MedicationStatement",
        "id": "example001",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: example001</p><p><b>contained</b>: </p><p><b>identifier</b>: 12345689 (OFFICIAL)</p><p><b>status</b>: active</p><p><b>category</b>: Inpatient <span>(Details : {http://hl7.org/fhir/medication-statement-category code 'inpatient' = 'Inpatient', given as 'Inpatient'})</span></p><p><b>medication</b>: id: med0309; Tylenol PM <span>(Details : {http://hl7.org/fhir/sid/ndc code '50580-506-02' = '50580-506-02', given as 'Tylenol PM'})</span>; isBrand; Film-coated tablet (qualifier value) <span>(Details : {SNOMED CT code '385057009' = 'Film-coated tablet', given as 'Film-coated tablet (qualifier value)'})</span></p><p><b>effective</b>: 23/01/2015</p><p><b>dateAsserted</b>: 22/02/2015</p><p><b>informationSource</b>: <a>Donald Duck</a></p><p><b>subject</b>: <a>Donald Duck</a></p><p><b>derivedFrom</b>: <a>MedicationRequest/medrx002</a></p><p><b>taken</b>: n</p><p><b>reasonCode</b>: Restless Legs <span>(Details : {SNOMED CT code '32914008' = 'Restless legs', given as 'Restless Legs'})</span></p><p><b>note</b>: Patient indicates they miss the occasional dose</p><p><b>dosage</b>: </p></div>"
        },
        "contained": [
          {
            "resourceType": "Medication",
            "id": "med0309",
            "code": {
              "coding": [
                {
                  "system": "http://hl7.org/fhir/sid/ndc",
                  "code": "50580-506-02",
                  "display": "Tylenol PM"
                }
              ]
            },
            "isBrand": true,
            "form": {
              "coding": [
                {
                  "system": "http://snomed.info/sct",
                  "code": "385057009",
                  "display": "Film-coated tablet (qualifier value)"
                }
              ]
            },
            "ingredient": [
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "http://www.nlm.nih.gov/research/umls/rxnorm",
                      "code": "315266",
                      "display": "Acetaminophen 500 MG"
                    }
                  ]
                },
                "amount": {
                  "numerator": {
                    "value": 500,
                    "system": "http://unitsofmeasure.org",
                    "code": "mg"
                  },
                  "denominator": {
                    "value": 1,
                    "system": "http://hl7.org/fhir/v3/orderableDrugForm",
                    "code": "Tab"
                  }
                }
              },
              {
                "itemCodeableConcept": {
                  "coding": [
                    {
                      "system": "http://www.nlm.nih.gov/research/umls/rxnorm",
                      "code": "901813",
                      "display": "Diphenhydramine Hydrochloride 25 mg"
                    }
                  ]
                },
                "amount": {
                  "numerator": {
                    "value": 25,
                    "system": "http://unitsofmeasure.org",
                    "code": "mg"
                  },
                  "denominator": {
                    "value": 1,
                    "system": "http://hl7.org/fhir/v3/orderableDrugForm",
                    "code": "Tab"
                  }
                }
              }
            ],
            "package": {
              "batch": [
                {
                  "lotNumber": "9494788",
                  "expirationDate": "2017-05-22"
                }
              ]
            }
          }
        ],
        "identifier": [
          {
            "use": "official",
            "system": "http://www.bmc.nl/portal/medstatements",
            "value": "12345689"
          }
        ],
        "status": "active",
        "category": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/medication-statement-category",
              "code": "inpatient",
              "display": "Inpatient"
            }
          ]
        },
        "medicationReference": {
          "reference": "#med0309"
        },
        "effectiveDateTime": "2015-01-23",
        "dateAsserted": "2015-02-22",
        "informationSource": {
          "reference": "Patient/pat1",
          "display": "Donald Duck"
        },
        "subject": {
          "reference": "Patient/pat1",
          "display": "Donald Duck"
        },
        "derivedFrom": [
          {
            "reference": "MedicationRequest/medrx002"
          }
        ],
        "taken": "n",
        "reasonCode": [
          {
            "coding": [
              {
                "system": "http://snomed.info/sct",
                "code": "32914008",
                "display": "Restless Legs"
              }
            ]
          }
        ],
        "note": [
          {
            "text": "Patient indicates they miss the occasional dose"
          }
        ],
        "dosage": [
          {
            "sequence": 1,
            "text": "1-2 tablets once daily at bedtime as needed for restless legs",
            "additionalInstruction": [
              {
                "text": "Taking at bedtime"
              }
            ],
            "timing": {
              "repeat": {
                "frequency": 1,
                "period": 1,
                "periodUnit": "d"
              }
            },
            "asNeededCodeableConcept": {
              "coding": [
                {
                  "system": "http://snomed.info/sct",
                  "code": "32914008",
                  "display": "Restless Legs"
                }
              ]
            },
            "route": {
              "coding": [
                {
                  "system": "http://snomed.info/sct",
                  "code": "26643006",
                  "display": "Oral Route"
                }
              ]
            },
            "doseRange": {
              "low": {
                "value": 1,
                "unit": "TAB",
                "system": "http://hl7.org/fhir/v3/orderableDrugForm",
                "code": "TAB"
              },
              "high": {
                "value": 2,
                "unit": "TAB",
                "system": "http://hl7.org/fhir/v3/orderableDrugForm",
                "code": "TAB"
              }
            }
          }
        ]
      };

      Meteor.call('createMedicationStatement', tylenolStatement);




      var AmoxicillinStatement = {
        "resourceType": "MedicationStatement",
        "id": "example004",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: example004</p><p><b>partOf</b>: <a>Observation/blood-pressure</a></p><p><b>status</b>: completed</p><p><b>medication</b>: Amoxicillin (product) <span>(Details : {SNOMED CT code '27658006' = 'p-Hydroxyampicillin', given as 'Amoxicillin (product)'})</span></p><p><b>effective</b>: 23/01/2014</p><p><b>dateAsserted</b>: 22/02/2015</p><p><b>informationSource</b>: <a>Donald Duck</a></p><p><b>subject</b>: <a>Donald Duck</a></p><p><b>taken</b>: y</p><p><b>reasonCode</b>: Otitis Media <span>(Details : {SNOMED CT code '65363002' = 'Otitis media', given as 'Otitis Media'})</span></p><p><b>note</b>: Patient indicates they miss the occasional dose</p><p><b>dosage</b>: </p></div>"
        },
        "partOf": [
          {
            "reference": "Observation/blood-pressure"
          }
        ],
        "status": "completed",
        "medicationCodeableConcept": {
          "coding": [
            {
              "system": "http://snomed.info/sct",
              "code": "27658006",
              "display": "Amoxicillin (product)"
            }
          ]
        },
        "effectiveDateTime": "2014-01-23",
        "dateAsserted": "2015-02-22",
        "informationSource": {
          "reference": "Patient/pat1",
          "display": "Donald Duck"
        },
        "subject": {
          "reference": "Patient/pat1",
          "display": "Donald Duck"
        },
        "taken": "y",
        "reasonCode": [
          {
            "coding": [
              {
                "system": "http://snomed.info/sct",
                "code": "65363002",
                "display": "Otitis Media"
              }
            ]
          }
        ],
        "note": [
          {
            "text": "Patient indicates they miss the occasional dose"
          }
        ],
        "dosage": [
          {
            "text": "one capsule three times daily",
            "timing": {
              "repeat": {
                "frequency": 3,
                "period": 1,
                "periodUnit": "d"
              }
            },
            "asNeededBoolean": false,
            "route": {
              "coding": [
                {
                  "system": "http://snomed.info/sct",
                  "code": "260548002",
                  "display": "Oral"
                }
              ]
            },
            "maxDosePerPeriod": {
              "numerator": {
                "value": 3,
                "unit": "capsules",
                "system": "http://snomed.info/sct",
                "code": "385055001"
              },
              "denominator": {
                "value": 1,
                "system": "http://unitsofmeasure.org",
                "code": "d"
              }
            }
          }
        ]
      };

      Meteor.call('createMedicationStatement', AmoxicillinStatement);
    } else {
      console.log('MedicationStatements already exist.  Skipping.');
    }
  },
  removeMedicationStatementById: function(medicationStatementId){
    check(medicationStatementId, String);
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Removing medicationStatement... ');
      MedicationStatements.remove({_id: medicationStatementId});
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  dropMedicationStatements: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping medicationStatements... ');
      MedicationStatements.remove({});
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }

});
