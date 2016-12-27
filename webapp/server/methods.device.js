// import { Devices } from '/imports/api/devices/devices';
//
// Meteor.publish('devices', function(){
//   return Devices.find();
// });

Meteor.methods({
  createDevice:function(deviceObject){
    check(deviceObject, Object);

    if (process.env.NODE_ENV === 'test') {
      console.log('Creating Device...');
      Devices.insert(deviceObject, function(error, result){
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log('Device created: ' + result);
        }
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  },
  initializeDevice:function(){

    if (process.env.INITIALIZE) {

      if (Devices.find().count() === 0) {
        console.log('No records found in Devices collection.  Lets create some...');

        var defaultDevice = {
          'resourceType' : 'Device',
          'identifier' : [{
            'value': 'Withings-XXXXX',
            type: {
              text: 'Serial Number'
            }
          }],
          'type' : {
            text: 'Scale'
          },
          'note' : [],
          'status' : 'available',
          'manufacturer' : 'Withings',
          'model' : 'Wireless Scale',
          'version' : 'WS-30',
          'udi' : '7657048'
        };

        Meteor.call('createDevice', defaultDevice);

        var canonicalExample = {
          "resourceType": "Device",
          "id": "example",
          "text": {
            "fhir_comments": [
              "  text>\n    <status value=\"generated\"/>\n    <div xmlns=\"http://www.w3.org/1999/xhtml\">\n      <p>example</p>\n    </div>\n  </text  "
            ],
            "status": "generated",
            "div": "<div><p><b>Generated Narrative with Details</b></p><p><b>id</b>: example</p><p><b>identifier</b>: 345675, Serial Number = AMID-342135-8464</p><p><b>type</b>: ECG <span>(Details : {SNOMED CT code '86184003' = '86184003', given as 'Electrocardiographic monitor and recorder'})</span></p><p><b>note</b>: QA Checked</p><p><b>status</b>: available</p><p><b>manufacturer</b>: Acme Devices, Inc</p><p><b>model</b>: AB 45-J</p><p><b>lotNumber</b>: 43453424</p><p><b>contact</b>: ph: ext 4352</p></div>"
          },
          "identifier": [
            {
              "system": "http://goodcare.org/devices/id",
              "value": "345675"
            },
            {
              "type": {
                "coding": [
                  {
                    "system": "http://hl7.org/fhir/identifier-type",
                    "code": "SNO"
                  }
                ],
                "text": "Serial Number"
              },
              "value": "AMID-342135-8464"
            }
          ],
          "type": {
            "coding": [
              {
                "system": "http://snomed.info/sct",
                "code": "86184003",
                "display": "Electrocardiographic monitor and recorder"
              }
            ],
            "text": "ECG"
          },
          "note": [
            {
              "authorReference": {
                "reference": "Practitioner/xcda-author"
              },
              "time": "2015-06-28T14:03:32+10:00",
              "text": "QA Checked"
            }
          ],
          "status": "available",
          "manufacturer": "Acme Devices, Inc",
          "model": "AB 45-J",
          "lotNumber": "43453424",
          "contact": [
            {
              "system": "phone",
              "value": "ext 4352"
            }
          ]
        };
        Meteor.call('createDevice', canonicalExample);

      } else {
        console.log('Devices already exist.  Skipping.');
      }
    }      
  },
  dropDevices: function(){
    if (process.env.NODE_ENV === 'test') {
      console.log('-----------------------------------------');
      console.log('Dropping devices... ');
      Devices.find().forEach(function(device){
        Devices.remove({_id: device._id});
      });
    } else {
      console.log('This command can only be run in a test environment.');
      console.log('Try setting NODE_ENV=test');
    }
  }
});
