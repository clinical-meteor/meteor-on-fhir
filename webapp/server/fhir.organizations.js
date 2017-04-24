


Meteor.methods({
  createOrganization:function(OrganizationObject){
    check(OrganizationObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating Organization...');
      Organizations.insert(OrganizationObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Organization created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeOrganization:function(OrganizationValue, deviceId){
    check(OrganizationValue, Number);
    check(deviceId, String);

    if (Organizations.find().count() === 0) {
      console.log('No records found in Organizations collection.  Lets create some...');

      var defaultOrganization = {
        resourceType: 'Organization',
        status: 'final',
        category: {
          text: 'Weight'
        },
        effectiveDateTime: new Date(),
        subject: {
          display: 'Jane Doe',
          reference: ''
        },
        performer: {
          display: '',
          reference: ''
        },
        device: {
          display: 'Withings Weight Scale',
          reference: deviceId
        },
        valueQuantity: {
          value: OrganizationValue,
          unit: 'kg',
          system: 'http://unitsofmeasure.org'
        }
      };

      Meteor.call('createOrganization', defaultOrganization);
    } else {
      console.log('Organizations already exist.  Skipping.');
    }
  },
  removeOrganizationById: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Removing Organization... ');
      Organizations.find().forEach(function(Organization){
        Organizations.remove({_id: Organization._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  dropOrganizations: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping Organizations... ');
      Organizations.find().forEach(function(Organization){
        Organizations.remove({_id: Organization._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeBlockchain: function(){
    if(!Organizations.findOne({id: 'stlukes'})){
      Organizations.insert({
        "resourceType": "Organization",
        "id": "stlukes",
        "identifier": [
          {
            "system": "http://hl7.org/fhir/sid/us-npi",
            "value": "1063494177"
          }
        ],
        "name": "Saint Luke''s Hospital of Kansas City",
        "alias": [
          "St. Luke's"
        ]
      });
    }
    if(!Organizations.findOne({id: 'hl7'})){
      Organizations.insert({
        "resourceType": "Organization",
        "id": "hl7",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">\n      Health Level Seven International\n      <br/>\n\t\t\t\t3300 Washtenaw Avenue, Suite 227\n      <br/>\n\t\t\t\tAnn Arbor, MI 48104\n      <br/>\n\t\t\t\tUSA\n      <br/>\n\t\t\t\t(+1) 734-677-7777 (phone)\n      <br/>\n\t\t\t\t(+1) 734-677-6622 (fax)\n      <br/>\n\t\t\t\tE-mail:  \n      <a href=\"mailto:hq@HL7.org\">hq@HL7.org</a>\n    \n    </div>"
        },
        "extension": [
          {
            "url": "http://hl7.org/fhir/StructureDefinition/organization-alias",
            "valueString": "HL7 International"
          }
        ],
        "name": "Health Level Seven International",
        "telecom": [
          {
            "system": "phone",
            "value": "(+1) 734-677-7777"
          },
          {
            "system": "fax",
            "value": "(+1) 734-677-6622"
          },
          {
            "system": "email",
            "value": "hq@HL7.org"
          }
        ],
        "address": [
          {
            "line": [
              "3300 Washtenaw Avenue, Suite 227"
            ],
            "city": "Ann Arbor",
            "state": "MI",
            "postalCode": "48104",
            "country": "USA"
          }
        ],
        "endpoint": {
            "reference": "Endpoint/example"
          }
      })
    }

    if(!Organizations.findOne({id: 'acme-gastroenterology'})){
      Organizations.insert({
        "resourceType": "Organization",
        "id": "acme-gastroenterology",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">\n      \n      <p>Gastroenterology @ Acme Hospital. ph: +1 555 234 3523, email: \n        <a href=\"mailto:gastro@acme.org\">gastro@acme.org</a>\n      </p>\n    \n    </div>"
        },
        "identifier": [
          {
            "system": "http://www.acme.org.au/units",
            "value": "Gastro"
          }
        ],
        "name": "Gastroenterology",
        "telecom": [
          {
            "system": "phone",
            "value": "+1 555 234 3523",
            "use": "mobile"
          },
          {
            "system": "email",
            "value": "gastro@acme.org",
            "use": "work"
          }
        ],
        "partOf": {
          "reference": "Organization/1",
          "display": "ACME Healthcare, Inc"
        }
      });
    }

    if(!Organizations.findOne({id: 'acme-laboratory'})){
      Organizations.insert({
        "resourceType": "Organization",
        "id": "acme-laboratory",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">\n      \n      <p>Clinical Laboratory @ Acme Hospital. ph: +1 555 234 1234, email: \n        <a href=\"mailto:contact@labs.acme.org\">contact@labs.acme.org</a>\n      </p>\n    \n    </div>"
        },
        "identifier": [
          {
            "system": "http://www.acme.org.au/units",
            "value": "ClinLab"
          }
        ],
        "name": "Clinical Lab",
        "telecom": [
          {
            "system": "phone",
            "value": "+1 555 234 1234",
            "use": "work"
          },
          {
            "system": "email",
            "value": "contact@labs.acme.org",
            "use": "work"
          }
        ]
      });
    }

    if(!Organizations.findOne({id: 'insurer'})){
      Organizations.insert({
        "resourceType": "Organization",
        "id": "insurer",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">\n      \n      <p>XYZ Insurance</p>\n    \n    </div>"
        },
        "identifier": [
          {
            "system": "urn:oid:2.16.840.1.113883.3.19.2.3",
            "value": "666666"
          }
        ],
        "name": "XYZ Insurance",
        "alias": [
          "ABC Insurance"
        ]
      });
    }

    if(!Organizations.findOne({id: 'good-health'})){
      Organizations.insert({
        "resourceType": "Organization",
        "id": "good-health",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">\n      \n      <p>Good Health Clinic</p>\n    \n    </div>"
        },
        "identifier": [
          {
            "system": "urn:ietf:rfc:3986",
            "value": "2.16.840.1.113883.19.5"
          }
        ],
        "name": "Good Health Clinic"
      });
    }

     if(!Organizations.findOne({id: 'f001'})){
      Organizations.insert({
        "resourceType": "Organization",
        "id": "f001",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: f001</p><p><b>identifier</b>: 91654 (OFFICIAL), 17-0112278 (USUAL)</p><p><b>type</b>: University Medical Hospital <span>(Details : {urn:oid:2.16.840.1.113883.2.4.15.1060 code 'V6' = 'V6', given as 'University Medical Hospital'}; {http://hl7.org/fhir/organization-type code 'prov' = 'Healthcare Provider', given as 'Healthcare Provider'})</span></p><p><b>name</b>: Burgers University Medical Center</p><p><b>telecom</b>: ph: 022-655 2300(WORK)</p><p><b>address</b>: </p><ul><li>Galapagosweg 91 Den Burg 9105 PZ NLD (WORK)</li><li>PO Box 2311 Den Burg 9100 AA NLD (WORK)</li></ul><blockquote><p><b>contact</b></p><p><b>purpose</b>: Press <span>(Details : {http://hl7.org/fhir/contactentity-type code 'PRESS' = 'Press)</span></p><p><b>telecom</b>: ph: 022-655 2334</p></blockquote><blockquote><p><b>contact</b></p><p><b>purpose</b>: Patient <span>(Details : {http://hl7.org/fhir/contactentity-type code 'PATINF' = 'Patient)</span></p><p><b>telecom</b>: ph: 022-655 2335</p></blockquote></div>"
        },
        "identifier": [
          {
            "use": "official",
            "system": "urn:oid:2.16.528.1",
            "value": "91654"
          },
          {
            "use": "usual",
            "system": "urn:oid:2.16.840.1.113883.2.4.6.1",
            "value": "17-0112278"
          }
        ],
        "type": [
          {
            "coding": [
              {
                "system": "urn:oid:2.16.840.1.113883.2.4.15.1060",
                "code": "V6",
                "display": "University Medical Hospital"
              },
              {
                "system": "http://hl7.org/fhir/organization-type",
                "code": "prov",
                "display": "Healthcare Provider"
              }
            ]
          }
        ],
        "name": "Burgers University Medical Center",
        "telecom": [
          {
            "system": "phone",
            "value": "022-655 2300",
            "use": "work"
          }
        ],
        "address": [
          {
            "use": "work",
            "line": [
              "Galapagosweg 91"
            ],
            "city": "Den Burg",
            "postalCode": "9105 PZ",
            "country": "NLD"
          },
          {
            "use": "work",
            "line": [
              "PO Box 2311"
            ],
            "city": "Den Burg",
            "postalCode": "9100 AA",
            "country": "NLD"
          }
        ],
        "contact": [
          {
            "purpose": {
              "coding": [
                {
                  "system": "http://hl7.org/fhir/contactentity-type",
                  "code": "PRESS"
                }
              ]
            },
            "telecom": [
              {
                "system": "phone",
                "value": "022-655 2334"
              }
            ]
          },
          {
            "purpose": {
              "coding": [
                {
                  "system": "http://hl7.org/fhir/contactentity-type",
                  "code": "PATINF"
                }
              ]
            },
            "telecom": [
              {
                "system": "phone",
                "value": "022-655 2335"
              }
            ]
          }
        ]
      });
    }

    if(!Organizations.findOne({id: 'f002'})){
      Organizations.insert({
        "resourceType": "Organization",
        "id": "f002",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: f002</p><p><b>active</b>: true</p><p><b>type</b>: Hospital Department <span>(Details : {http://hl7.org/fhir/organization-type code 'dept' = 'Hospital Department', given as 'Hospital Department'})</span></p><p><b>name</b>: Burgers UMC Cardiology unit</p><p><b>telecom</b>: ph: 022-655 2320</p><p><b>address</b>: South Wing, floor 2 </p><p><b>partOf</b>: <a>Organization/f001</a></p><h3>Contacts</h3><table><tr><td>-</td><td><b>Purpose</b></td><td><b>Name</b></td><td><b>Telecom</b></td><td><b>Address</b></td></tr><tr><td>*</td><td>Administrative <span>(Details : {http://hl7.org/fhir/contactentity-type code 'ADMIN' = 'Administrative)</span></td><td>mevr. D. de Haan</td><td>ph: 022-655 2321</td><td>South Wing, floor 2 </td></tr></table></div>"
        },
        "active": true,
        "type": [
          {
            "coding": [
              {
                "system": "http://hl7.org/fhir/organization-type",
                "code": "dept",
                "display": "Hospital Department"
              }
            ]
          }
        ],
        "name": "Burgers UMC Cardiology unit",
        "telecom": [
          {
            "system": "phone",
            "value": "022-655 2320"
          }
        ],
        "address": [
          {
            "line": [
              "South Wing, floor 2"
            ]
          }
        ],
        "partOf": {
          "reference": "Organization/f001"
        },
        "contact": [
          {
            "purpose": {
              "coding": [
                {
                  "system": "http://hl7.org/fhir/contactentity-type",
                  "code": "ADMIN"
                }
              ]
            },
            "name": {
              "text": "mevr. D. de Haan"
            },
            "telecom": [
              {
                "system": "phone",
                "value": "022-655 2321"
              },
              {
                "system": "email",
                "value": "cardio@burgersumc.nl"
              },
              {
                "system": "fax",
                "value": "022-655 2322"
              }
            ],
            "address": {
              "line": [
                "South Wing, floor 2"
              ]
            }
          }
        ]
      });
    }

    if(!Organizations.findOne({id: 'f201'})){
      Organizations.insert({
        "resourceType": "Organization",
        "id": "f201",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: f201</p><p><b>identifier</b>: Artis University Medical Center (OFFICIAL)</p><p><b>active</b>: true</p><p><b>type</b>: Academic Medical Center <span>(Details : {SNOMED CT code '405608006' = 'Academic medical centre', given as 'Academic Medical Center'}; {urn:oid:2.16.840.1.113883.2.4.15.1060 code 'V6' = 'V6', given as 'University Medical Hospital'}; {http://hl7.org/fhir/organization-type code 'prov' = 'Healthcare Provider', given as 'Healthcare Provider'})</span></p><p><b>name</b>: Artis University Medical Center (AUMC)</p><p><b>telecom</b>: ph: +31715269111(WORK)</p><p><b>address</b>: Walvisbaai 3 Den Helder 2333ZA NLD (WORK)</p><h3>Contacts</h3><table><tr><td>-</td><td><b>Name</b></td><td><b>Telecom</b></td><td><b>Address</b></td></tr><tr><td>*</td><td>Professor Brand(OFFICIAL)</td><td>ph: +31715269702(WORK)</td><td>Walvisbaai 3 Gebouw 2 Den helder 2333ZA NLD </td></tr></table></div>"
        },
        "identifier": [
          {
            "use": "official",
            "system": "http://www.zorgkaartnederland.nl/",
            "value": "Artis University Medical Center"
          }
        ],
        "active": true,
        "type": [
          {
            "coding": [
              {
                "system": "http://snomed.info/sct",
                "code": "405608006",
                "display": "Academic Medical Center"
              },
              {
                "system": "urn:oid:2.16.840.1.113883.2.4.15.1060",
                "code": "V6",
                "display": "University Medical Hospital"
              },
              {
                "system": "http://hl7.org/fhir/organization-type",
                "code": "prov",
                "display": "Healthcare Provider"
              }
            ]
          }
        ],
        "name": "Artis University Medical Center (AUMC)",
        "telecom": [
          {
            "system": "phone",
            "value": "+31715269111",
            "use": "work"
          }
        ],
        "address": [
          {
            "use": "work",
            "line": [
              "Walvisbaai 3"
            ],
            "city": "Den Helder",
            "postalCode": "2333ZA",
            "country": "NLD"
          }
        ],
        "contact": [
          {
            "name": {
              "use": "official",
              "text": "Professor Brand",
              "family": "Brand",
              "given": [
                "Ronald"
              ],
              "prefix": [
                "Prof.Dr."
              ]
            },
            "telecom": [
              {
                "system": "phone",
                "value": "+31715269702",
                "use": "work"
              }
            ],
            "address": {
              "line": [
                "Walvisbaai 3",
                "Gebouw 2"
              ],
              "city": "Den helder",
              "postalCode": "2333ZA",
              "country": "NLD"
            }
          }
        ]
      });
    }    

    if(!Organizations.findOne({id: 'f203'})){
      Organizations.insert({
        "resourceType": "Organization",
        "id": "f203",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: f203</p><p><b>identifier</b>: Zorginstelling naam = Blijdorp MC (OFFICIAL)</p><p><b>active</b>: true</p><p><b>type</b>: Academic Medical Center <span>(Details : {SNOMED CT code '405608006' = 'Academic medical centre', given as 'Academic Medical Center'}; {http://hl7.org/fhir/organization-type code 'prov' = 'Healthcare Provider)</span></p><p><b>name</b>: Blijdorp Medisch Centrum (BUMC)</p><p><b>telecom</b>: ph: +31107040704(WORK)</p><p><b>address</b>: apenrots 230 Blijdorp 3056BE NLD (WORK)</p></div>"
        },
        "identifier": [
          {
            "use": "official",
            "type": {
              "text": "Zorginstelling naam"
            },
            "system": "http://www.zorgkaartnederland.nl/",
            "value": "Blijdorp MC"
          }
        ],
        "active": true,
        "type": [
          {
            "coding": [
              {
                "system": "http://snomed.info/sct",
                "code": "405608006",
                "display": "Academic Medical Center"
              },
              {
                "system": "http://hl7.org/fhir/organization-type",
                "code": "prov"
              }
            ]
          }
        ],
        "name": "Blijdorp Medisch Centrum (BUMC)",
        "telecom": [
          {
            "system": "phone",
            "value": "+31107040704",
            "use": "work"
          }
        ],
        "address": [
          {
            "use": "work",
            "line": [
              "apenrots 230"
            ],
            "city": "Blijdorp",
            "postalCode": "3056BE",
            "country": "NLD"
          }
        ]
      });
    }    

    if(!Organizations.findOne({id: 'f003'})){
      Organizations.insert({
        "resourceType": "Organization",
        "id": "f003",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: f003</p><p><b>active</b>: true</p><p><b>type</b>: Hospital Department <span>(Details : {http://hl7.org/fhir/organization-type code 'dept' = 'Hospital Department', given as 'Hospital Department'})</span></p><p><b>name</b>: Burgers UMC Ear,Nose,Throat unit</p><p><b>telecom</b>: ph: 022-655 6780</p><p><b>address</b>: West Wing, floor 5 </p><p><b>partOf</b>: <a>Organization/f001</a></p><h3>Contacts</h3><table><tr><td>-</td><td><b>Purpose</b></td><td><b>Name</b></td><td><b>Telecom</b></td><td><b>Address</b></td></tr><tr><td>*</td><td>Administrative <span>(Details : {http://hl7.org/fhir/contactentity-type code 'ADMIN' = 'Administrative)</span></td><td>mr. F. de Hond</td><td>ph: 022-655 7654</td><td>West Wing, floor 5 </td></tr></table></div>"
        },
        "active": true,
        "type": [
          {
            "coding": [
              {
                "system": "http://hl7.org/fhir/organization-type",
                "code": "dept",
                "display": "Hospital Department"
              }
            ]
          }
        ],
        "name": "Burgers UMC Ear,Nose,Throat unit",
        "telecom": [
          {
            "system": "phone",
            "value": "022-655 6780"
          }
        ],
        "address": [
          {
            "line": [
              "West Wing, floor 5"
            ]
          }
        ],
        "partOf": {
          "reference": "Organization/f001"
        },
        "contact": [
          {
            "purpose": {
              "coding": [
                {
                  "system": "http://hl7.org/fhir/contactentity-type",
                  "code": "ADMIN"
                }
              ]
            },
            "name": {
              "text": "mr. F. de Hond"
            },
            "telecom": [
              {
                "system": "phone",
                "value": "022-655 7654"
              },
              {
                "system": "email",
                "value": "KNO@burgersumc.nl"
              },
              {
                "system": "fax",
                "value": "022-655 0998"
              }
            ],
            "address": {
              "line": [
                "West Wing, floor 5"
              ]
            }
          }
        ]
      });
    }    

  }

});
