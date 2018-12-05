cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-wkwebview-engine.ios-wkwebview-exec",
    "file": "plugins/cordova-plugin-wkwebview-engine/src/www/ios/ios-wkwebview-exec.js",
    "pluginId": "cordova-plugin-wkwebview-engine",
    "clobbers": [
      "cordova.exec"
    ]
  },
  {
    "id": "cordova-plugin-meteor-webapp.WebAppLocalServer",
    "file": "plugins/cordova-plugin-meteor-webapp/www/webapp_local_server.js",
    "pluginId": "cordova-plugin-meteor-webapp",
    "merges": [
      "WebAppLocalServer"
    ]
  },
  {
    "id": "cordova-plugin-statusbar.statusbar",
    "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
    "pluginId": "cordova-plugin-statusbar",
    "clobbers": [
      "window.StatusBar"
    ]
  },
  {
    "id": "cordova-plugin-splashscreen.SplashScreen",
    "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
    "pluginId": "cordova-plugin-splashscreen",
    "clobbers": [
      "navigator.splashscreen"
    ]
  },
  {
    "id": "cordova-plugin-inappbrowser.inappbrowser",
    "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
    "pluginId": "cordova-plugin-inappbrowser",
    "clobbers": [
      "cordova.InAppBrowser.open",
      "window.open"
    ]
  },
  {
    "id": "com.telerik.plugins.healthkit.HealthKit",
    "file": "plugins/com.telerik.plugins.healthkit/www/HealthKit.js",
    "pluginId": "com.telerik.plugins.healthkit",
    "clobbers": [
      "window.plugins.healthkit"
    ]
  },
  {
    "id": "cordova-plugin-screen-orientation.screenorientation",
    "file": "plugins/cordova-plugin-screen-orientation/www/screenorientation.js",
    "pluginId": "cordova-plugin-screen-orientation",
    "clobbers": [
      "cordova.plugins.screenorientation"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.2",
  "cordova-plugin-wkwebview-engine": "1.1.3",
  "cordova-plugin-meteor-webapp": "1.6.0",
  "cordova-plugin-statusbar": "2.3.0",
  "cordova-plugin-splashscreen": "4.1.0",
  "cordova-plugin-inappbrowser": "1.7.1",
  "cordova-plugin-crosswalk-webview": "2.2.0",
  "com.telerik.plugins.healthkit": "0.5.6",
  "cordova-plugin-screen-orientation": "3.0.1"
};
// BOTTOM OF METADATA
});