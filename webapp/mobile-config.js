/* globals App */
/* eslint-disable quote-props */

App.info({
  id: 'io.symptomatic.phr',
  name: 'Symptomatic',
  description: 'HealthRecord Timeline Viewer',
  author: 'Abigail Watson',
  email: 'abigail@symptomatic.io',
  website: 'https://www.symptomatic.io',
  version: '0.7.6'
});

App.icons({
  // iOS
  'app_store': 'resources/icons/icon-1024.png',
  'iphone_2x': 'resources/icons/Icon-60@2x.png',
  'iphone_3x': 'resources/icons/Icon-180.png',
  'ipad_2x': 'resources/icons/Icon-76@2x.png',
  'ipad_pro': 'resources/icons/Icon-167.png',

  'ios_settings_2x': 'resources/icons/Icon-58.png',
  'ios_settings_3x': 'resources/icons/Icon-87.png',
  'ios_spotlight_2x': 'resources/icons/Icon-80.png',
  'ios_spotlight_3x': 'resources/icons/Icon-120.png',
  'ios_notifications_2x': 'resources/icons/Icon-40.png',
  'ios_notifications_3x': 'resources/icons/Icon-60.png',
  
  'ipad': 'resources/icons/Icon-76.png',

  'ios_settings': 'resources/icons/Icon-29.png',
  'ios_spotlight': 'resources/icons/Icon-40.png',
  'ios_notifications': 'resources/icons/Icon-20.png',
   
  'iphone_legacy': 'resources/icons/Icon-57.png',
  'iphone_legacy_2x': 'resources/icons/Icon-114.png',
  'ipad_spotlight_legacy': 'resources/icons/Icon-50.png',
  'ipad_spotlight_legacy_2x': 'resources/icons/Icon-100.png',
  'ipad_app_legacy': 'resources/icons/Icon-72.png',
  'ipad_app_legacy_2x': 'resources/icons/Icon-144.png'

  // Android
  //'android_ldpi': 'resources/icons/icon-36x36.png',
  //'android_mdpi': 'resources/icons/icon-48x48.png',
  //'android_hdpi': 'resources/icons/icon-72x72.png',
  //'android_xhdpi': 'resources/icons/icon-96x96.png',
});

App.launchScreens({
  // iOS
  'iphone': 'resources/splash/splash-320x480.png',
  'iphone_2x': 'resources/splash/splash-320x480@2x.png',
  'iphone5': 'resources/splash/splash-320x568@2x.png',
  'ipad_portrait': 'resources/splash/splash-768x1024.png',
  'ipad_portrait_2x': 'resources/splash/splash-768x1024@2x.png',
  'ipad_landscape': 'resources/splash/splash-1024x768.png',
  'ipad_landscape_2x': 'resources/splash/splash-1024x768@2x.png',

  // Android
  //'android_ldpi_portrait': 'resources/splash/splash-200x320.png',
  //'android_ldpi_landscape': 'resources/splash/splash-320x200.png',
  //'android_mdpi_portrait': 'resources/splash/splash-320x480.png',
  //'android_mdpi_landscape': 'resources/splash/splash-480x320.png',
  //'android_hdpi_portrait': 'resources/splash/splash-480x800.png',
  //'android_hdpi_landscape': 'resources/splash/splash-800x480.png',
  //'android_xhdpi_portrait': 'resources/splash/splash-720x1280.png',
  //'android_xhdpi_landscape': 'resources/splash/splash-1280x720.png'
});

// Set PhoneGap/Cordova preferences
App.setPreference('StatusBarBackgroundColor', '#000000');
App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');
App.setPreference('DisallowOverscroll', 'true');

// Set PhoneGap/Cordova access rules
App.accessRule('http://localhost', { type: 'navigation' } );
App.accessRule('http://localhost:3000', { type: 'navigation' } );
App.accessRule('http://www.symptomatic.io', { type: 'navigation' } );
App.accessRule('https://www.symptomatic.io', { type: 'navigation' } );
App.accessRule('http://symptomatic.io', { type: 'navigation' } );
App.accessRule('https://symptomatic.io', { type: 'navigation' } );
App.accessRule('http://fhir-timeline.meteorapp.com', { type: 'navigation' } );

App.setPreference("BackupWebStorage", "local");
// // Pass preferences for a particular PhoneGap/Cordova plugin
// App.configurePlugin('com.phonegap.plugins.facebookconnect', {
//   APP_ID: '1234567890',
//   API_KEY: 'supersecretapikey'
// });

// App.appendToConfig(`
//   <edit-config target="NSHealthClinicalHealthRecordsShareUsageDescription" file="*-Info.plist" mode="merge">
//     <string>App needs read access</string>
//   </edit-config>
// `);
// App.appendToConfig(`
//   <edit-config target="NSHealthUpdateUsageDescription" file="*-Info.plist" mode="merge">
//     <string>App needs read write</string>
//   </edit-config>
// `);
// App.appendToConfig(`
//   <edit-config target="NSHealthShareUsageDescription" file="*-Info.plist" mode="merge">
//     <string>App needs read access</string>
//   </edit-config>
// `);

// App.configurePlugin('com.telerik.plugins.healthkit', {
//   'config-file': {
//     target: '*-Info.plist', 
//     parent: 'NSHealthClinicalHealthRecordsShareUsageDescription'
//   },
//   'string': {
//     text: 'App needs read access'
//   }
// });
// App.configurePlugin('com.telerik.plugins.healthkit', {
//   'config-file': {
//     target: '*-Info.plist', 
//     parent: 'NSHealthShareUsageDescription',
//     string: {
//       text: 'App needs read access'
//     }
//   }
// });
// App.configurePlugin('com.telerik.plugins.healthkit', {
//   'config-file': {
//     target: '*-Info.plist', 
//     parent: 'NSHealthUpdateUsageDescription',
//     string: {
//       text: 'App needs write access'
//     }
//   }
// });

// App.configurePlugin('com.telerik.plugins.healthkit', {
//   'edit-config': {
//     file: '*-Info.plist', 
//     mode: 'merge', 
//     target: 'NSHealthClinicalHealthRecordsShareUsageDescription'
//   },
//   'string': {
//     text: 'App needs read access'
//   }
// });

App.configurePlugin('com.telerik.plugins.healthkit', {
  HEALTH_READ_PERMISSION: 'App needs read access',
  HEALTH_WRITE_PERMISSION: 'App needs write access',
  CLINICAL_READ_PERMISSION: 'App needs read access'
});

// App.appendToConfig(`
//   <splash src="../../../app/path/to/Default@2x~universal~anyany.png" />
//   <splash src="../../../app/path/to/Default@3x~universal~anyany.png" />
// `);


// XML Tags for info.plist
App.appendToConfig('<allow-navigation href="https://www.wikipedia.com/" />')


App.appendToConfig(`<config-file parent="NSHealthClinicalHealthRecordsShareUsageDescription" target="*-Info.plist">
<string>App needs read access</string>
</config-file>`)