//==================================================================================================
//HL7-v2.x PID to FHIR Resource Patient
//https://www.hl7.org/fhir/patient-mappings.html#v2

var date = msg['PID']['PID.7']['PID.7.1'].toString();

var Patient = {};

Patient.resourceType = "Patient";
Patient.gender = msg['PID']['PID.8']['PID.8.1'].toString();
Patient.birthDate = date.substr(0,4) + "-" + date.substr(4,2) + "-" + date.substr(6,2);
Patient.identifier = [{
     "use": "usual",
     "type": {
       "coding": [
         {
           "system": "http://hl7.org/fhir/v2/0203",
           "code": "MR"
         }
       ]
     },
     "value": msg['PID']['PID.3']['PID.3.1'].toString()
   }];



var humanName = {
	family: [msg['PID']['PID.5']['PID.5.1'].toString()],
	given: [msg['PID']['PID.5']['PID.5.2'].toString()],
	text: msg['PID']['PID.5']['PID.5.2'].toString() + ' ' + msg['PID']['PID.5']['PID.5.1'].toString()
};
Patient.name = [humanName];

//Patient.address = msg['PID']['PID.11']['PID.11.1'].toString();

//Patient.contact = msg['NK1']
//Patient.contact.relationship = msg['NK1']['NK1.7']['NK1.7.1']
//Patient.contact.name = msg['NK1']['NK1.2']['NK1.2.1']
//Patient.contact.telecom


//==================================================================================================
//HL7-v2.x MSH segment to Resource messageHeader
var messageHeader = {};

messageHeader.resourceType = "MessageHeader";
messageHeader.source = {
	name: msg['MSH']['MSH.3']['MSH.3.1'].toString()
}
messageHeader.destination = [{
	name: 'Meteor App'
}]
messageHeader.data = [Patient];

msg = JSON.stringify(messageHeader);
