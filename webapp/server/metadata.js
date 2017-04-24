ConformanceStatement = {
  "resourceType": "CapabilityStatement",
  "url": "http://fhir-server.meteorapp.com/fhir-3.0.0",
  "name": "ProviderDirectory",
  "version": "0.4",
  "status": "draft",
  "experimental": true,
  "publisher": "Pentasyllabic Studios",
  "kind": "capability",
  "date": new Date(),
  "contact": [
    {
      "telecom": [
        {
          "system": "other",
          "value": "http://github.com/clinical-meteor/meteor-on-fhir"
        }
      ]
    }
  ],
  "software": {
    "version" : "clinical:METEOR@1.4.3.2-rc16",
    "name" : "Meteor FHIR Repository",
    "releaseDate" : "2017-01-01"
  },
  "fhirVersion": "3.0.0",
  "acceptUnknown": "no",
  "format": [
    "json"
  ],
  "rest": [{
      "mode": "server",
      "security": {
        "service": [{
          "text": "OAuth"
        }],
        "extension": [{
          "url": "http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris",
          "extension": [{
            "url": "token",
            "valueUri": Meteor.absoluteUrl() + "oauth/token"
          }, {
            "url": "authorize",
            "valueUri": Meteor.absoluteUrl() + "oauth"
          }]
        }]
      },
      "resource": []
  }]
};



if (Meteor.settings.public.modules.fhir.Patients) {
  ConformanceStatement.rest[0].resource.push({
    "type": "Patient",
    "interaction": [{
      "code": "read"
    }, {
      "code": "create"
    }, {
      "code": "update"
    }, {
      "code": "delete"
    }, {
      "code": "history"
    }, {
      "code": "search-type",
      "documentation": "When a client searches patients with no search criteria, they get a list of all patients they have access too. Servers may elect to offer additional search parameters, but this is not required"
    }],
    "searchParam": [
      {
        "name": "_id",
        "type": "token",
        "documentation": "_id parameter always supported."
      },
      {
        "name": "identifier",
        "type": "token",
        "documentation": "this should be the medical record number"
      },
      {
        "name": "name",
        "type": "token"
      },
      {
        "name": "family",
        "type": "token"
      },
      {
        "name": "given",
        "type": "token"
      },
      {
        "name": "gender",
        "type": "token"
      },
      {
        "name": "birthday",
        "type": "token"
      }]
  });
}


if (Meteor.settings.public.modules.fhir.Practitioners) {
  ConformanceStatement.rest[0].resource.push({
    "type": "Practitioner",
    "interaction": [{
      "code": "read"
    }, {
      "code": "create"
    }, {
      "code": "update"
    }, {
      "code": "delete"
    }, {
      "code": "history"
    }, {
      "code": "search-type"
    }],
    "searchParam": [
        {
          "name": "_id",
          "type": "token",
          "documentation": "_id parameter always supported."
        },
        {
          "name": "identifier",
          "type": "token"
        },
        {
          "name": "name",
          "type": "token"
        },
        {
          "name": "family",
          "type": "token"
        },
        {
          "name": "given",
          "type": "token"
        }    
      ]
  });
}

if (Meteor.settings.public.modules.fhir.Observations) {
  ConformanceStatement.rest[0].resource.push({
    "type": "Observation",
    "interaction": [{
      "code": "read"
    }, {
      "code": "search-type",
      "documentation": "When a client searches practitioners with no search criteria, they get a list of all patients they have access too. Servers may elect to offer additional search parameters, but this is not required"
    }]
    // "searchParam": [
    //     {
    //       "name": "_id",
    //       "type": "token",
    //       "documentation": "_id parameter always supported."
    //     },
    //     {
    //       "name": "identifier",
    //       "type": "token"
    //     },
    //     {
    //       "name": "name",
    //       "type": "token"
    //     },
    //     {
    //       "name": "family",
    //       "type": "token"
    //     },
    //     {
    //       "name": "given",
    //       "type": "token"
    //     },
    //     {
    //       "name": "gender",
    //       "type": "token"
    //     },
    //     {
    //       "name": "birthday",
    //       "type": "token"
    //     },
    //
    //   ]
  });
}

if (Meteor.settings.public.modules.fhir.Medications) {
  ConformanceStatement.rest[0].resource.push({
    "type": "Medication",
    "interaction": [{
      "code": "read"
    }, {
      "code": "search-type",
      "documentation": "When a client searches practitioners with no search criteria, they get a list of all patients they have access too. Servers may elect to offer additional search parameters, but this is not required"
    }]
    // "searchParam": [
    //     {
    //       "name": "_id",
    //       "type": "token",
    //       "documentation": "_id parameter always supported."
    //     },
    //     {
    //       "name": "identifier",
    //       "type": "token"
    //     },
    //     {
    //       "name": "name",
    //       "type": "token"
    //     },
    //     {
    //       "name": "family",
    //       "type": "token"
    //     },
    //     {
    //       "name": "given",
    //       "type": "token"
    //     },
    //     {
    //       "name": "gender",
    //       "type": "token"
    //     },
    //     {
    //       "name": "birthday",
    //       "type": "token"
    //     },
    //
    //   ]
  });
}

if (Meteor.settings.public.modules.fhir.Organizations) {
  ConformanceStatement.rest[0].resource.push({
    "type": "Organization",
    "interaction": [{
      "code": "read"
    }, {
      "code": "create"
    }, {
      "code": "update"
    }, {
      "code": "delete"
    }, {
      "code": "history"
    }, {
      "code": "search-type"
    }],
    "searchParam": [
        {
          "name": "_id",
          "type": "token",
          "documentation": "_id parameter always supported."
        },
        {
          "name": "identifier",
          "type": "token"
        },
        {
          "name": "name",
          "type": "token"
        }    
      ]
  });
}


if (Meteor.settings.public.modules.fhir.Locations) {
  ConformanceStatement.rest[0].resource.push({
    "type": "Location",
    "interaction": [{
      "code": "read"
    }, {
      "code": "create"
    }, {
      "code": "update"
    }, {
      "code": "delete"
    }, {
      "code": "history"
    }, {
      "code": "search-type"
    }],
    "searchParam": [
        {
          "name": "_id",
          "type": "token",
          "documentation": "_id parameter always supported."
        },
        {
          "name": "identifier",
          "type": "token"
        },
        {
          "name": "name",
          "type": "token"
        }    
      ]
  });
}

if (Meteor.settings.public.modules.fhir.AuditEvents) {
  ConformanceStatement.rest[0].resource.push({
    "type": "AuditEvent",
    "interaction": [{
      "code": "read"
    }, {
      "code": "create"
    }, {
      "code": "update"
    }, {
      "code": "delete"
    }, {
      "code": "history"
    }, {
      "code": "search-type"
    }],
    "searchParam": [
        {
          "name": "_id",
          "type": "token",
          "documentation": "_id parameter always supported."
        }  
      ]
  });
}



if (Meteor.settings.public.modules.fhir.Devices) {
  ConformanceStatement.rest[0].resource.push({
    "type": "Device",
    "interaction": [{
      "code": "read"
    }, {
      "code": "search-type",
      "documentation": "When a client searches practitioners with no search criteria, they get a list of all patients they have access too. Servers may elect to offer additional search parameters, but this is not required"
    }]
    // "searchParam": [
    //     {
    //       "name": "_id",
    //       "type": "token",
    //       "documentation": "_id parameter always supported."
    //     },
    //     {
    //       "name": "identifier",
    //       "type": "token"
    //     },
    //     {
    //       "name": "name",
    //       "type": "token"
    //     },
    //     {
    //       "name": "family",
    //       "type": "token"
    //     },
    //     {
    //       "name": "given",
    //       "type": "token"
    //     },
    //     {
    //       "name": "gender",
    //       "type": "token"
    //     },
    //     {
    //       "name": "birthday",
    //       "type": "token"
    //     },
    //
    //   ]
  });
}


if (Meteor.settings.public.modules.fhir.RiskAssessments) {
  ConformanceStatement.rest[0].resource.push({
    "type": "RiskAssessment",
    "interaction": [{
      "code": "read"
    }, {
      "code": "search-type",
      "documentation": "When a client searches risk asessments with no search criteria, they get a list of all patients they have access too. Servers may elect to offer additional search parameters, but this is not required"
    }]
    // "searchParam": [
    //     {
    //       "name": "_id",
    //       "type": "token",
    //       "documentation": "_id parameter always supported."
    //     },
    //     {
    //       "name": "identifier",
    //       "type": "token"
    //     },
    //     {
    //       "name": "name",
    //       "type": "token"
    //     },
    //     {
    //       "name": "family",
    //       "type": "token"
    //     },
    //     {
    //       "name": "given",
    //       "type": "token"
    //     },
    //     {
    //       "name": "gender",
    //       "type": "token"
    //     },
    //     {
    //       "name": "birthday",
    //       "type": "token"
    //     },
    //
    //   ]
  });
}




JsonRoutes.add("get", "fhir-3.0.0/metadata", function (req, res, next) {
  console.log('GET /fhir-3.0.0/metadata');

  JsonRoutes.sendResult(res, {
    code: 200,
    data: ConformanceStatement
  });
});

Meteor.methods({
  getMetadata(){
    return ConformanceStatement;
  }
});
