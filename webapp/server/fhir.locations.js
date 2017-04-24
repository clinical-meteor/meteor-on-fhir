


Meteor.methods({
  createLocation:function(locationObject){
    check(locationObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating Location...');
      Locations.insert(locationObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Location created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },  
  removeLocationById: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Removing Location... ');
      Locations.find().forEach(function(location){
        Locations.remove({_id: location._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  dropLocations: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping Locations... ');
      Locations.find().forEach(function(location){
        Locations.remove({_id: location._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeLocations:function(){
    console.log('-----------------------------------------');
    console.log('Initializing Locations... ');
    

    if (!Locations.findOne({id: '1'})) {
      Meteor.call('createLocation', {
        "resourceType": "Location",
        "id": "1",
        "extension": [
          {
            "url": "http://hl7.org/fhir/StructureDefinition/location-alias",
            "valueString": "Burgers University Medical Center, South Wing, second floor"
          },
          {
            "url": "http://hl7.org/fhir/StructureDefinition/location-alias",
            "valueString": "BU MC, SW, F2"
          }
        ],
        "identifier": [
          {
            "value": "B1-S.F2"
          }
        ],
        "status": "active",
        "name": "South Wing, second floor",
        "description": "Second floor of the Old South Wing, formerly in use by Psychiatry",
        "mode": "instance",
        "telecom": [
          {
            "system": "phone",
            "value": "2328",
            "use": "work"
          },
          {
            "system": "fax",
            "value": "2329",
            "use": "work"
          },
          {
            "system": "email",
            "value": "second wing admissions"
          },
          {
            "system": "url",
            "value": "http://sampleorg.com/southwing",
            "use": "work"
          }
        ],
        "address": {
          "use": "work",
          "line": [
            "Galapagosweg 91, Building A"
          ],
          "city": "Den Burg",
          "postalCode": "9105 PZ",
          "country": "NLD"
        },
        "physicalType": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/location-physical-type",
              "code": "wi",
              "display": "Wing"
            }
          ]
        },
        "position": {
          "longitude": -83.6945691,
          "latitude": 42.25475478,
          "altitude": 0
        },
        "managingOrganization": {
          "reference": "Organization/f001"
        },
        "endpoint": [
          {
            "reference": "Endpoint/example"
          }
        ]
      }, function(error, result){
        if(error) console.log(error);
      });
    }

    if (!Locations.findOne({id: '2'})) {
      Meteor.call('createLocation', {
        "resourceType": "Location",
        "id": "2",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">Burgers UMC, South Wing, second floor, Neuro Radiology Operation Room 1</div>"
        },
        "identifier": [
          {
            "value": "B1-S.F2.1.00"
          }
        ],
        "status": "suspended",
        "operationalStatus": {
          "system": "http://hl7.org/fhir/v2/0116",
          "code": "H",
          "display": "Housekeeping"
        },
        "name": "South Wing Neuro OR 1",
        "alias": [
          "South Wing OR 5",
          "Main Wing OR 2"
        ],
        "description": "Old South Wing, Neuro Radiology Operation Room 1 on second floor",
        "mode": "instance",
        "type": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/v3/RoleCode",
              "code": "RNEU",
              "display": "Neuroradiology unit"
            }
          ]
        },
        "telecom": [
          {
            "system": "phone",
            "value": "2329"
          }
        ],
        "physicalType": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/location-physical-type",
              "code": "ro",
              "display": "Room"
            }
          ]
        },
        "managingOrganization": {
          "reference": "Organization/f001"
        },
        "partOf": {
          "reference": "Location/1"
        }
      }, function(error, result){
        if(error) console.log(error);
      });
    }
    if (!Locations.findOne({id: 'amb'})) {
      Meteor.call('createLocation', {
        "resourceType": "Location",
        "id": "amb",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">Mobile Clinic</div>"
        },
        "status": "active",
        "name": "BUMC Ambulance",
        "description": "Ambulance provided by Burgers University Medical Center",
        "mode": "kind",
        "type": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/v3/RoleCode",
              "code": "AMB",
              "display": "Ambulance"
            }
          ]
        },
        "telecom": [
          {
            "system": "phone",
            "value": "2329",
            "use": "mobile"
          }
        ],
        "physicalType": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/location-physical-type",
              "code": "ve",
              "display": "Vehicle"
            }
          ]
        },
        "managingOrganization": {
          "reference": "Organization/f001"
        }
      }, function(error, result){
        if(error) console.log(error);
      });
    }
    if (!Locations.findOne({id: 'ph'})) {
      Meteor.call('createLocation', {
        "resourceType": "Location",
        "id": "ph",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">Patient's Home</div>"
        },
        "status": "active",
        "name": "Patient's Home",
        "description": "Patient's Home",
        "mode": "kind",
        "type": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/v3/RoleCode",
              "code": "PTRES",
              "display": "Patient's Residence"
            }
          ]
        },
        "physicalType": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/location-physical-type",
              "code": "ho",
              "display": "House"
            }
          ]
        },
        "managingOrganization": {
          "reference": "Organization/f001"
        }
      }, function(error, result){
        if(error) console.log(error);
      });
    }
    if (!Locations.findOne({id: 'ukp'})) {
      Meteor.call('createLocation', {
        "resourceType": "Location",
        "id": "ukp",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">UK Pharmacies</div>"
        },
        "status": "active",
        "name": "UK Pharmacies",
        "description": "All Pharmacies in the United Kingdom covered by the National Pharmacy Association",
        "mode": "kind",
        "type": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/v3/RoleCode",
              "code": "PHARM",
              "display": "Pharmacy"
            }
          ]
        },
        "physicalType": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/location-physical-type",
              "code": "jdn",
              "display": "Jurisdiction"
            }
          ]
        }
      }, function(error, result){
        if(error) console.log(error);
      });
    }
    if (!Locations.findOne({id: 'hl7'})) {
      Meteor.call('createLocation', {
        "resourceType": "Location",
        "id": "hl7",
        "text": {
          "status": "generated",
          "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">\n      Health Level Seven International<br/>\n\t\t\t\t3300 Washtenaw Avenue, Suite 227<br/>\n\t\t\t\tAnn Arbor, MI 48104<br/>\n\t\t\t\tUSA<br/>\n\t\t\t\t(+1) 734-677-7777 (phone)<br/>\n\t\t\t\t(+1) 734-677-6622 (fax)<br/>\n\t\t\t\tE-mail:  <a href=\"mailto:hq@HL7.org\">hq@HL7.org</a>\n    </div>"
        },
        "status": "active",
        "name": "Health Level Seven International",
        "description": "HL7 Headquarters",
        "mode": "instance",
        "type": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/v3/RoleCode",
              "code": "SLEEP",
              "display": "Sleep disorders unit"
            }
          ]
        },
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
        "address": {
          "line": [
            "3300 Washtenaw Avenue, Suite 227"
          ],
          "city": "Ann Arbor",
          "state": "MI",
          "postalCode": "48104",
          "country": "USA"
        },
        "physicalType": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/location-physical-type",
              "code": "bu",
              "display": "Building"
            }
          ]
        },
        "position": {
          "longitude": 42.256500,
          "latitude": -83.694710
        }
      }, function(error, result){
        if(error) console.log(error);
      });
    }





    // if (!Locations.findOne({id: "3ad0687e-f477-468c-afd5-fcc2bf897819"})) {
    //   Meteor.call('createLocation', {
    //     "resourceType": "Bundle",
    //     "id": "3ad0687e-f477-468c-afd5-fcc2bf897819",
    //     "type": "collection",
    //     "entry": [
    //       {
    //         "fullUrl": "http://hl7.org/fhir/Location/2",
    //         "resource": {
    //           "resourceType": "Location",
    //           "id": "2",
    //           "text": {
    //             "status": "generated",
    //             "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">USS Enterprise</div>"
    //           },
    //           "status": "active",
    //           "name": "USSS Enterprise-D",
    //           "mode": "instance"
    //         }
    //       },
    //       {
    //         "fullUrl": "http://hl7.org/fhir/Location/3",
    //         "resource": {
    //           "resourceType": "Location",
    //           "id": "3",
    //           "text": {
    //             "status": "generated",
    //             "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\">USSS Enterprise-D Sickbay</div>"
    //           },
    //           "status": "active",
    //           "name": "USSS Enterprise-D Sickbay",
    //           "mode": "instance",
    //           "partOf": {
    //             "reference": "Location/2",
    //             "display": "USS Enterprise"
    //           }
    //         }
    //       }
    //     ]
    //   }, function(error, result){
    //     if(error) console.log(error);
    //   });
    // }

if (!Locations.findOne({id: 'hl7-amherst'})) {
      Meteor.call('createLocation', {
        "resourceType": "Location",
        "id": "hl7-amherst",
        "status": "active",
        "name": "Health Level Seven International - Amherst",
        "description": "HL7 Office",
        "mode": "instance",
        "address": {
          "city": "Amherst",
          "state": "MA",
          "postalCode": "01002",
          "country": "USA"
        },
        "physicalType": {
          "coding": [
            {
              "system": "http://hl7.org/fhir/location-physical-type",
              "code": "bu",
              "display": "Building"
            }
          ]
        }
      }, function(error, result){
        if(error) console.log(error);
      });
    }

  }
});
