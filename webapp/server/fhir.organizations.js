
if(Package['clinical:hl7-resource-organization']){
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
    removeOrganizationById: function(organizationId){
      check(organizationId, String);
      Organizations.remove({_id: organizationId});
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
    syncOrganizations: function(){
      if(Meteor.settings && Meteor.settings.public && Meteor.settings.public.meshNetwork && Meteor.settings.public.meshNetwork.upstreamSync){
        console.log('-----------------------------------------');
        console.log('Syncing organizations... ');
        var queryString = Meteor.settings.public.meshNetwork.upstreamSync + "/Organization";
        console.log(queryString);
        
        var result =  HTTP.get(queryString);
  
        var bundle = JSON.parse(result.content);
  
        console.log('result', bundle);
        bundle.entry.forEach(function(record){
          console.log('record', record);
          if(record.resource.resourceType === "Organization"){
            if(!Organizations.findOne({name:record.resource.name})){
              Organizations.insert(record.resource);
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
    initializeOrganizations:function(){
      console.log('-----------------------------------------');
      console.log('Initializing Organizations... ');
      
  
      if (!Organizations.findOne({id: '1'})) {
        Meteor.call('createOrganization', {
          "resourceType": "Organization",
          "id": "1",
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
          "address": [{
            "use": "work",
            "line": [
              "Galapagosweg 91, Building A"
            ],
            "city": "Den Burg",
            "postalCode": "9105 PZ",
            "country": "NLD"
          }],
          "physicalType": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/location-physical-type",
                "code": "wi",
                "display": "Wing"
              }
            ]
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
  
      if (!Organizations.findOne({id: '2'})) {
        Meteor.call('createOrganization', {
          "resourceType": "Organization",
          "id": "2",
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
          "type": [{
            "coding": [
              {
                "system": "http://hl7.org/fhir/v3/RoleCode",
                "code": "RNEU",
                "display": "Neuroradiology unit"
              }
            ]
          }],
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
      if (!Organizations.findOne({id: 'amb'})) {
        Meteor.call('createOrganization', {
          "resourceType": "Organization",
          "id": "amb",
          "status": "active",
          "name": "BUMC Ambulance",
          "description": "Ambulance provided by Burgers University Medical Center",
          "mode": "kind",
          "type": [{
            "coding": [
              {
                "system": "http://hl7.org/fhir/v3/RoleCode",
                "code": "AMB",
                "display": "Ambulance"
              }
            ]
          }],
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
      if (!Organizations.findOne({id: 'ph'})) {
        Meteor.call('createOrganization', {
          "resourceType": "Organization",
          "id": "ph",
          "status": "active",
          "name": "Patient's Home",
          "description": "Patient's Home",
          "mode": "kind",
          "type": [{
            "coding": [
              {
                "system": "http://hl7.org/fhir/v3/RoleCode",
                "code": "PTRES",
                "display": "Patient's Residence"
              }
            ]
          }],
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
      if (!Organizations.findOne({id: 'ukp'})) {
        Meteor.call('createOrganization', {
          "resourceType": "Organization",
          "id": "ukp",
          "status": "active",
          "name": "UK Pharmacies",
          "description": "All Pharmacies in the United Kingdom covered by the National Pharmacy Association",
          "mode": "kind",
          "type": [{
            "coding": [
              {
                "system": "http://hl7.org/fhir/v3/RoleCode",
                "code": "PHARM",
                "display": "Pharmacy"
              }
            ]
          }],
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
      if (!Organizations.findOne({id: 'hl7'})) {
        Meteor.call('createOrganization', {
          "resourceType": "Organization",
          "id": "hl7",
          "status": "active",
          "name": "Health Level Seven International",
          "description": "HL7 Headquarters",
          "mode": "instance",
          "type": [{
            "coding": [
              {
                "system": "http://hl7.org/fhir/v3/RoleCode",
                "code": "SLEEP",
                "display": "Sleep disorders unit"
              }
            ]
          }],
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
          "address": [{
            "line": [
              "3300 Washtenaw Avenue, Suite 227"
            ],
            "city": "Ann Arbor",
            "state": "MI",
            "postalCode": "48104",
            "country": "USA"
          }],
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
  
      if (!Organizations.findOne({id: 'hl7-amherst'})) {
        Meteor.call('createOrganization', {
          "resourceType": "Organization",
          "id": "hl7-amherst",
          "status": "active",
          "name": "Health Level Seven International - Amherst",
          "description": "HL7 Office",
          "mode": "instance",
          "address": [{
            "city": "Amherst",
            "state": "MA",
            "postalCode": "01002",
            "country": "USA"
          }],
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
  
    },
    createOrgManifest: function(){
      // Organizations.find().forEach(function(doc){
      //   delete doc._document;
      //   console.log('doc', JSON.stringify(doc))
      //   return doc;
      // }, {transform: false})
      console.log('createOrgManifest', JSON.stringify(Organizations.find().fetch()), null, 2);
  
      return Organizations.find().fetch();
    }
  });
    
}


