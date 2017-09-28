import { Medications } from 'meteor/clinical:hl7-resource-medication';

Meteor.publish('medications', function(){
  return Medications.find();
});

Meteor.methods({
  createMedication:function(medicationObject){
    check(medicationObject, Object);

    if (Medications.find({'code.text': medicationObject.code.text}).count() === 0) {
      Medications.insert(medicationObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Medication created: ' + result);
        }
      });
    }
  },
  initializeMedications:function(){

    if (process.env.Medications) {
      console.log('Lets make sure our Medication inventory is correct...');

      var Claritin = {
        isBrand: false,
        code: {
          text: "Claritin"
        },
        manufacturer: {
          display: '',
          reference: ''
        },
        product: {
          form: {
            text: 'tablet'
          },
          ingredient: [{
            item: {
              resourceType: 'Substance',
              code: {
                text: 'Loratadine'
              },
              description: 'Antihistimine'
            },
            instance: [{
              quantity: '1 tablet'
            }]
          }]
        }
      };
      Meteor.call('createMedication', Claritin);


      var Motrin = {
        "resourceType" : "Medication",
        "code" : {
            "text" : "Motrin"
        },
        "isBrand" : true,
        "manufacturer" : {
            "display" : "Johnson & Johnson"
        },
        "product" : {
            "form" : {
                "text" : "softgel"
            },
            "ingredient" : [ 
                {
                    "item" : {
                        "resourceType" : "Substance",
                        "code" : {
                            "text" : "Ibuprofen"
                        },
                        "description" : "Pain reliever / fever reducer"
                    },
                    "instance" : [ 
                        {
                            "quantity" : "160"
                        }
                    ]
                }
            ]
        },
        "package" : {
            "container" : {
                "text" : "bottle"
            },
            "content" : [ 
                {
                    "amount" : {
                        "value" : 30
                    }
                }
            ]
        }
    };
      Meteor.call('createMedication', Motrin);


      var NyQuill = {
        "code" : {
            "text" : "NyQuill"
        },
        "isBrand" : true,
        "manufacturer" : {
            "display" : "VICKS"
        },
        "product" : {
            "form" : {
                "text" : "liquid"
            },
            "ingredient" : [ 
                {
                    "item" : {
                        "resourceType" : "Substance",
                        "code" : {
                            "text" : "Acetaminophen"
                        },
                        "description" : "Pain reliever/fever reducer."
                    },
                    "instance" : [ 
                        {
                            "quantity" : "650 mg"
                        }
                    ]
                }, 
                {
                    "item" : {
                        "resourceType" : "Substance",
                        "code" : {
                            "text" : "Dextromethorphan HBr"
                        },
                        "description" : "Cough suppressant."
                    },
                    "instance" : [ 
                        {
                            "quantity" : "30 mg"
                        }
                    ]
                }, 
                {
                    "item" : {
                        "resourceType" : "Substance",
                        "code" : {
                            "text" : "Doxylamine succinate"
                        },
                        "description" : "Antihistamine."
                    },
                    "instance" : [ 
                        {
                            "quantity" : "12.5 mg"
                        }
                    ]
                }
            ]
        },
        "package" : {
            "container" : {
                "text" : "vial"
            },
            "content" : [ 
                {
                    "amount" : {
                        "value" : 12,
                        "unit" : "fl oz"
                    }
                }
            ]
        },
        "resourceType" : "Medication"
      };
      Meteor.call('createMedication', NyQuill);

      
      var Zyrtec = {
        "resourceType" : "Medication",
        "code" : {
            "text" : "Zyrtec"
        },
        "isBrand" : true,
        "manufacturer" : {},
        "product" : {
            "form" : {
                "text" : "tablet"
            },
            "ingredient" : [ 
                {
                    "item" : {
                        "resourceType" : "Substance",
                        "code" : {
                            "text" : "Cetinizine HCl"
                        },
                        "description" : "Antihistamine"
                    },
                    "instance" : [ 
                        {
                            "quantity" : "10 mg"
                        }
                    ]
                }
            ]
        },
        "package" : {
            "container" : {
                "text" : "bottle"
            },
            "content" : [ 
                {
                    "amount" : {
                        "value" : 70,
                        "unit" : "tablet"
                    }
                }
            ]
        }
      };
      Meteor.call('createMedication', Zyrtec);



      var MentholatumOintment = {
          "resourceType" : "Medication",
          "code" : {
              "text" : "Mentholatum Ointment"
          },
          "isBrand" : true,
          "manufacturer" : {},
          "product" : {
              "form" : {
                  "text" : "salve"
              },
              "ingredient" : [ 
                  {
                      "item" : {
                          "resourceType" : "Substance",
                          "code" : {
                              "text" : "Camphor"
                          },
                          "description" : "Topical analgesic"
                      },
                      "instance" : [ 
                          {
                              "quantity" : "9%"
                          }
                      ]
                  }, 
                  {
                      "item" : {
                          "resourceType" : "Substance",
                          "code" : {
                              "text" : "Menthol, natural"
                          },
                          "description" : "Topical analgesic"
                      },
                      "instance" : [ 
                          {
                              "quantity" : "1.3%"
                          }
                      ]
                  }
              ]
          },
          "package" : {
              "container" : {
                  "text" : "bottle"
              },
              "content" : [ 
                  {
                      "amount" : {
                          "value" : 1,
                          "unit" : "fl oz"
                      }
                  }
              ]
          }
      };
      Meteor.call('createMedication', MentholatumOintment);



      var HydrogenPeroxide = {
          "resourceType" : "Medication",
          "code" : {
              "text" : "Hydrogen Peroxide"
          },
          "isBrand" : true,
          "manufacturer" : {},
          "product" : {
              "form" : {
                  "text" : "liquid"
              },
              "ingredient" : [ 
                  {
                      "item" : {
                          "resourceType" : "Substance",
                          "code" : {
                              "text" : "Hydrogen peroxide (stabilized)"
                          },
                          "description" : "First aid antiseptic, Oral deriding agent"
                      },
                      "instance" : [ 
                          {
                              "quantity" : "3%"
                          }
                      ]
                  }
              ]
          },
          "package" : {
              "container" : {
                  "text" : "liquid"
              },
              "content" : [ 
                  {
                      "amount" : {
                          "value" : 16,
                          "unit" : "fl oz"
                      }
                  }
              ]
          }
      };
      Meteor.call('createMedication', HydrogenPeroxide);
      

      var TopCare = {
          "resourceType" : "Medication",
          "code" : {
              "text" : "TopCare"
          },
          "isBrand" : true,
          "manufacturer" : {},
          "product" : {
              "form" : {
                  "text" : "gel"
              },
              "ingredient" : [ 
                  {
                      "item" : {
                          "resourceType" : "Substance",
                          "code" : {
                              "text" : "Aloe barbadensis leaf tract"
                          },
                          "description" : "analgesic"
                      },
                      "instance" : [ 
                          {
                              "quantity" : "0.5 oz"
                          }
                      ]
                  }
              ]
          },
          "package" : {
              "container" : {
                  "text" : "bottle"
              },
              "content" : [ 
                  {
                      "amount" : {
                          "value" : 16,
                          "unit" : "fl oz"
                      }
                  }
              ]
          }
      };
      Meteor.call('createMedication', TopCare);


      
      var Albuterol = {
        "resourceType" : "Medication",
        "code" : {
            "text" : "Ventolin"
        },
        "isBrand" : true,
        "manufacturer" : {},
        "product" : {
            "form" : {
                "text" : "inhaler"
            },
            "ingredient" : [ 
                {
                    "item" : {
                        "resourceType" : "Substance",
                        "code" : {
                            "text" : "Albuterol"
                        },
                        "description" : "Bronchodilator"
                    },
                    "instance" : [ 
                        {
                            "quantity" : "2 mg"
                        }
                    ]
                }
            ]
        },
        "package" : {
            "container" : {
                "text" : "inhaler"
            },
            "content" : [ 
                {
                    "amount" : {
                        "value" : 40,
                        "unit" : "Inhaler"
                    }
                }
            ]
        }
      };
      Meteor.call('createMedication', Albuterol);



    } else {
      console.log('Medications already exist.  Skipping.');
    }
  },
  dropMedications: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping medications... ');
      Medications.find().forEach(function(medication){
        Medications.remove({_id: medication._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }
});
