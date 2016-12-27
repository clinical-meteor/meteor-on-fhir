// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api



module.exports = {
  tags: ['devices', 'Devices', 'crud', 'fhir', 'circle'],
  before: function(client){
    client
      .url("http://localhost:3000").pause(3000)
      .executeAsync(function(){
        Meteor.call('dropDevices');
        Meteor.call('dropTestUsers');
      });
  },
  'Sign up.': function (client) {
    client.resizeWindow(1200, 1024);

    client.page.signupPage()
      .navigate()
      .fillOutSignupPage('Gregory', 'House', 'house@test.org', 'house123', 'hippocrates')
      .saveScreenshot('tests/nightwatch/screenshots/practitioners/A-Signup-Practitioner.png', client)
      .signup()
      .pause(5000, client);

    client
      .verify.elementPresent('#indexPage')
      .verify.containsText('#authenticatedUsername', 'Gregory House')
      .pause(3000);
  },
  'list devices': function (client) {
    client.page
      .indexPage()
      .selectDevicesTile();

    client.page
      .devicesPage()
      .verifyElements()
      .verifyEmptyList();
  },
  'create new device': function (client) {

    client.page
      .devicesPage()
      .selectNewDeviceTab()
      .verifyNewDeviceCard();

    client.pause(1000).executeAsync(function(){
      Session.set('deviceUpsert', {
        "resourceType": "Device",
        "identifier": [{
          "type": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/identifier-type",
                "code": "SNO"
              }
            ],
            "text": "Serial Number"
          },
          "value": ""
        }],
        "type": {
          "text": ""
        },
        "status": "available",
        "manufacturer": "",
        "model": "",
        "lotNumber": "",
        "contact": [
          {
            "system": "phone",
            "value": ""
          }
        ]
      });

    client.page
      .devicesPage()
      .upsertDevice('MRI', 'Philips', 'Gyroscan', '22456', '#newDevice', client)
      .saveScreenshot('tests/nightwatch/screenshots/devices.crud/B-DeviceList.png', client);

    client
      .click('#newDevice #saveDeviceButton').pause(1000);
  },
  'list should contain recently created device': function (client) {
    client.page
      .devicesPage()
      .selectListTab()
      .verifyDeviceListCard()
      .listContainsDevice(1, 'MRI', 'Philips', 'Gyroscan', '22456')
      .saveScreenshot('tests/nightwatch/screenshots/devices.crud/B-DeviceList.png', client);
  },
  'device detail': function (client) {
    client.page
      .devicesPage()
      .selectDevice(1)
      .verifyDeviceDetails('MRI', 'Philips', 'Gyroscan', '22456')
      .saveScreenshot('tests/nightwatch/screenshots/devices.crud/C-DeviceDetails.png', client);
  },
  'edit device': function (client) {
    client.executeAsync(function(){
      Session.set('deviceUpsert', {
        "resourceType": "Device",
        "identifier": [{
          "type": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/identifier-type",
                "code": "SNO"
              }
            ],
            "text": "Serial Number"
          },
          "value": ""
        }],
        "type": {
          "text": ""
        },
        "status": "available",
        "manufacturer": "",
        "model": "",
        "lotNumber": "",
        "contact": [
          {
            "system": "phone",
            "value": ""
          }
        ]
      });

    client.page
      .devicesPage()
      .upsertDevice('3T MRI', 'Philips Medical', 'Gyroscan Intera', '22456', '#deviceDetails', client)
      .saveScreenshot('tests/nightwatch/screenshots/devices.crud/D-EditedDevice.png', client);

    // since we're using the DeviceDetail component twice,
    // there are two #saveDeviceButtons on the page
    // so we need to scope the button accordingly
    client
      .click('#deviceDetails #saveDeviceButton').pause(1000);
  },
  'list edited Devices': function (client) {
    client.page
      .devicesPage()
      .listContainsDevice(1, '3T MRI', 'Philips Medical', 'Gyroscan Intera', '22456')
      //.pause(40000, client)
      .saveScreenshot('tests/nightwatch/screenshots/devices.crud/E-EditedDeviceList.png', client);
  },

  'fin': function (client) {
    client
      .end();
  }
};
