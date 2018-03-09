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
