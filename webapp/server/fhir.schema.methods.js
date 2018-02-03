import { FhirApi } from 'fhir-schemas';
import { get, has } from 'lodash';
import Ajv from 'ajv';


Meteor.methods({
  testFhirSchema: function(){
      console.log('testing fhir schemas...')
  },
  createTestPatient: function(){

    var ajv = new Ajv({schemas: FhirApi });
    
    var validate = ajv.getSchema('http://hl7.org/fhir/json-schema/Patient');
    
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
    
  }
})