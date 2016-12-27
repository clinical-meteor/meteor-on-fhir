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
    } else {
      console.log('Devices already exist.  Skipping.');
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
