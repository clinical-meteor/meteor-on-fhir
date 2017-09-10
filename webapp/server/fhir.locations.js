


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
  removeLocationById: function(locationId){
    check(locationId, String);
    Locations.remove({_id: locationId});
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
  syncLocations: function(){
    if(Meteor.settings && Meteor.settings.public && Meteor.settings.public.meshNetwork && Meteor.settings.public.meshNetwork.upstreamSync){
      console.log('-----------------------------------------');
      console.log('Syncing Locations... ');
      var queryString = Meteor.settings.public.meshNetwork.upstreamSync + "/Location";
      console.log(queryString);
      
      var result =  HTTP.get(queryString);

      var bundle = JSON.parse(result.content);

      console.log('result', bundle);
      bundle.entry.forEach(function(record){
        console.log('record', record);
        if(record.resource.resourceType === "Location"){
          if(!Locations.findOne({name:record.resource.name})){
            Locations.insert(record.resource);
          }
        }
      });
      Meteor.call('generateDailyStat');
      return true;
    }else {
    console.log('-----------------------------------------');
    console.log('Syncing disabled... ');      
    }

  }, 

  // These are Chicago area hospitals
  initializeHospitals: function(){

    var hospitals = [{
          name: "Childrens Memorial Hospital",
          lat: 41.9247546,
          lng: -87.6472764
        }, {
          name: "Bernard Mitchell Hospital",
          lat: 41.7892007,
          lng: -87.6044935
        }, {
          name: "Bethesda Hospital",
          lat: 42.0189199,
          lng: 41.8736438
        }, {
          name: "Gottlieb Memorial Hospital",
          lat: 41.9114198,
          lng: -87.843672
        }, {
          name: "Holy Cross Hospital",
          lat: 41.7694777,
          lng: -87.6922738
        }, {
          name: "Lakeside Veterans Administration ",
          lat: 41.8944773,
          lng: -87.6189413
        }, { 
          name: "Little Company of Mary Hospital",
          lat: 41.7219779,
          lng: -87.6914393  
        }, { 
          name: "Methodist Hospital",
          lat: 41.9728097,
          lng: -87.6708897
        }, { 
          name: "Northwestern Memorial Hospital",
          lat: 41.8955885,
          lng: -87.6208858     
        }, { 
          name: "Oak Forest Hospital",
          lat: 41.5983672,
          lng: -87.732549     
        }, { 
          name: "Saint Francis Hospital",
          lat: 41.6580896,
          lng:  -87.6781042       
        }, { 
          name: "Sacred Heart Hospital",
          lat: 41.8905879,
          lng: -87.7081111       
        }, { 
          name: "Roseland Community Hospital",
          lat: 41.6922565,
          lng: -87.6253253
        }, { 
          name: "South Shore Hospital",
          lat: 41.7494792,
          lng:  -87.5692135     
        }, { 
          name: "Hartgrove Hospital",
          lat: 41.8905878,
          lng: -87.7203337
        }, { 
          name: "Glenbrook Hospital",
          lat: 42.0925276,
          lng: -87.852566  
        }, { 
          name: "Garfield Park Hospital",
          lat: 41.8814211,
          lng: -87.7220001 
        }, { 
          name: "Mercy",
          lat: 41.8469777,
          lng: -87.6211623     
        }, { 
          name: "Kindred Chicago Hospital",
          lat: 41.9400318,
          lng:  -87.7292243 
        }, { 
          name: "Norwegian - American Hospital",
          lat:  41.9005879,
          lng:  -87.7000555   
        }, { 
          name: "Oak Park Hospital",
          lat: 41.8786426,
          lng: -87.8031141   
        }, { 
          name: "Passavant Hospital",
          lat: 41.8953107,
          lng:  -87.6197747  
        }, { 
          name: "Reese Hospital",
          lat: 41.8397557,
          lng: -87.6131063 
        }, { 
          name: "Ronald McDonald Childrens Hospital ",
          lat: 41.8605869,
          lng: -87.8350591
        }, { 
          name: "Saint Anthony Hospital",
          lat:  41.8553104,
          lng:  -87.697832    
        }, { 
          name: "Shriners Hospital",
          lat: 41.9197536,
          lng: -87.7933926     
        }];

        hospitals.forEach(function(hospital){
          if(!Locations.findOne({name: hospital.name})){
            var newLocation = {
              name: hospital.name,
              position: {
                latitude: hospital.lat,
                longitude: hospital.lng,
                altitude: 594
              }
            }
            Locations.insert(newLocation);
          }
        });

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
