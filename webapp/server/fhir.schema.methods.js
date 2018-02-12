import { FhirApi, FhirApiLegacy } from 'fhir-schemas';
import { get, has } from 'lodash';
import Ajv from 'ajv';


Meteor.methods({
  testFhirSchema: function(){
      console.log('testing fhir schemas...')
  },
  createTestPatient: function(){

    console.log('createTestPatient2');

    var ajv = new Ajv;
    
    // WORKS!  
    //var validate = ajv.addSchema(FhirApi2, "http://hl7.org/fhir/json-schema").getSchema('http://hl7.org/fhir/json-schema#/definitions/Patient');

    // Also works!  
    //var validate = ajv.addSchema(FhirApi2, "FhirApi").getSchema('FhirApi#/definitions/Patient');


    // perfect!
    var validate = ajv.addSchema(FhirApi).getSchema('http://hl7.org/fhir/json-schema/Patient');

    console.log('vaidate', validate)
    
    var newPatient = {
        "resourceType": "Patient",
        "meta": {
            "tag": [
                "test"
            ]
        },        
        "name": [{
            "family": 'Doe',
            "given": ['Jane']
        }],
        "identifier": [{
            "value": '123'
        }]
    };
    
    var isValid = validate(newPatient);
    if(isValid){
        console.log("newPatient is valid...");
    
        // Insert some documents
        Patients.insert(newPatient, function(err, result) {
            console.log("Inserted newPatient into the CurrentPatients collection");
        });
    } else {
        console.log("newPatient isn't valid...");
        console.log(validate.errors);
    }
    
  },  
  foo: function(){
    
  }
})