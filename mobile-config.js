App.info({
  id: 'io.sympatomatic.demo',
  name: 'FHIR Demo',
  description: 'A HIPAA and FDA compliant checklist app built in Meteor that supports HL7 FHIR.',
  author: 'Symptomatic.io',
  email: 'pentasyllabic.studios@gmail.com',
  website: 'http://fire-demo.meteorapp.com',
  version: '0.1.0'
});

App.icons({
  // iOS
  //'iphone': 'resources/icons/icon-60x60.png',
  'iphone_2x': 'resources/icons/icon-60x60@2x.png',
  'ipad': 'resources/icons/icon-72x72.png',
  'ipad_2x': 'resources/icons/icon-72x72@2x.png'

  // Android
  //'android_ldpi': 'resources/icons/icon-36x36.png',
  //'android_mdpi': 'resources/icons/icon-48x48.png',
  //'android_hdpi': 'resources/icons/icon-72x72.png',
  //'android_xhdpi': 'resources/icons/icon-96x96.png'
});

App.launchScreens({
  // iOS
  //'iphone': 'resources/splash/splash-320x480.png',
  'iphone_2x': 'resources/splash/splash-320x480@2x.png',
  'iphone5': 'resources/splash/splash-320x568@2x.png',
  'ipad_portrait': 'resources/splash/splash-768x1024.png',
  'ipad_portrait_2x': 'resources/splash/splash-768x1024@2x.png',
  'ipad_landscape': 'resources/splash/splash-1024x768.png',
  'ipad_landscape_2x': 'resources/splash/splash-1024x768@2x.png',

  // Android
  //'android_ldpi_portrait': 'resources/splash/splash-200x320.png',
  //'android_ldpi_landscape': 'resources/splash/splash-320x200.png',
  'android_mdpi_portrait': 'resources/splash/splash-320x480.png',
  'android_mdpi_landscape': 'resources/splash/splash-480x320.png',
  'android_hdpi_portrait': 'resources/splash/splash-480x800.png',
  'android_hdpi_landscape': 'resources/splash/splash-800x480.png',
  'android_xhdpi_portrait': 'resources/splash/splash-720x1280.png',
  'android_xhdpi_landscape': 'resources/splash/splash-1280x720.png'
});


// Set PhoneGap/Cordova preferences
App.setPreference('StatusBarBackgroundColor', '#000000');
App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');

// Set PhoneGap/Cordova access rules
App.accessRule('http://localhost', { type: 'navigation' } );
App.accessRule('http://localhost:3000', { type: 'navigation' } );
App.accessRule('http://checklist.symptomatic.io', { type: 'navigation' } );
App.accessRule('http://checklist-manifesto.meteorapp.com', { type: 'navigation' } );

App.setPreference("BackupWebStorage", "local");
// // Pass preferences for a particular PhoneGap/Cordova plugin
// App.configurePlugin('com.phonegap.plugins.facebookconnect', {
//   APP_ID: '1234567890',
//   API_KEY: 'supersecretapikey'
// });
